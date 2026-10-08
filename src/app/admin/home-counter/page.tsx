"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";

import api, {
  errorMessage,
  fieldErrors,
} from "@/lib/api";

import { formatDate } from "@/lib/utils";
import PageHeader from "@/components/admin/PageHeader";
import Loader from "@/components/admin/Loader";

/**
 * v3 – Home Counter:
 * One fixed record (no add / delete).
 * Values are shown on the website home page.
 */

interface CounterData {
  projectCompleted: string;
  happyClient: string;
  qualifiedEngineers: string;
  yearsExperience: string;
  countriesServed: string;
}

interface CounterApiRow {
  projectCompleted?: number | string | null;
  happyClient?: number | string | null;
  qualifiedEngineers?: number | string | null;
  yearsExperience?: number | string | null;
  countriesServed?: number | string | null;
  updatedAt?: string | null;
}

interface ApiResponse<T> {
  success?: boolean;
  message: string;
  data: T;
}

type FieldKey = keyof CounterData;

type FieldErrors = Partial<Record<FieldKey, string>>;

const FIELDS: Array<[FieldKey, string]> = [
  ["projectCompleted", "Project Completed"],
  ["happyClient", "Happy Clients"],
  ["qualifiedEngineers", "Qualified Engineers"],
  ["yearsExperience", "Years Experience"],
  ["countriesServed", "Countries Served"],
];

export default function HomeCounterPage() {
  const [values, setValues] = useState<CounterData | null>(null);

  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const [errors, setErrors] = useState<FieldErrors>({});

  const [saving, setSaving] = useState(false);

  /*
   * Apply API data to form state
   */
  const apply = (row: CounterApiRow): void => {
    const nextValues = {} as CounterData;

    FIELDS.forEach(([key]) => {
      nextValues[key] = String(row[key] ?? 0);
    });

    setValues(nextValues);
    setUpdatedAt(row.updatedAt ?? null);
  };

  /*
   * Load home counter
   */
  useEffect(() => {
    const loadCounter = async (): Promise<void> => {
      try {
        const { data } =
          await api.get<ApiResponse<CounterApiRow>>(
            "/admin/home-counter"
          );

        apply(data.data);
      } catch (err: unknown) {
        toast.error(
          errorMessage(
            err,
            "Failed to load home counter"
          )
        );
      }
    };

    loadCounter();
  }, []);

  /*
   * Submit
   */
  const onSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!values) {
      return;
    }

    const errs: FieldErrors = {};

    for (const [key, label] of FIELDS) {
      const value = String(values[key] ?? "").trim();

      if (value === "") {
        errs[key] = `${label} is required`;
      } else if (!/^\d+$/.test(value)) {
        errs[key] =
          `${label} must be a whole number (0 or more)`;
      }
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSaving(true);

    try {
      const { data } =
        await api.put<ApiResponse<CounterApiRow>>(
          "/admin/home-counter",
          values
        );

      apply(data.data);

      setErrors({});

      toast.success(data.message);
    } catch (err: unknown) {
      setErrors(fieldErrors(err) as FieldErrors);

      toast.error(
        errorMessage(err)
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * Input change
   */
  const handleChange =
    (key: FieldKey) =>
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value;

      setValues((current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          [key]: value,
        };
      });

      setErrors((current) => ({
        ...current,
        [key]: undefined,
      }));
    };

  return (
    <>
      <PageHeader title="Home Counter" />

      {!values ? (
        <div className="card">
          <Loader />
        </div>
      ) : (
        <form
          className="card"
          onSubmit={onSubmit}
          noValidate
        >
          <p
            className="hint"
            style={{ marginBottom: 14 }}
          >
            These numbers are shown in the counter
            section of the website home page. Update
            them any time.
          </p>

          <div className="grid2">
            {FIELDS.map(([key, label]) => (
              <div key={key}>
                <label>
                  {label}

                  <span className="req">
                    *
                  </span>
                </label>

                <input
                  type="number"
                  min={0}
                  step={1}
                  inputMode="numeric"
                  value={values[key]}
                  className={
                    errors[key]
                      ? "invalid"
                      : ""
                  }
                  onChange={handleChange(key)}
                />

                {errors[key] && (
                  <div className="err">
                    {errors[key]}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="form-actions">
            {updatedAt && (
              <span
                className="hint"
                style={{
                  marginRight: "auto",
                  alignSelf: "center",
                }}
              >
                Last updated:{" "}
                {formatDate(updatedAt, true)}
              </span>
            )}

            <button
              type="submit"
              className="btn-p"
              disabled={saving}
            >
              {saving ? "Saving..." : "Update"}
            </button>
          </div>
        </form>
      )}
    </>
  );
}