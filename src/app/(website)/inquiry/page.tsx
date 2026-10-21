"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  RefreshCw,
  Send,
  X,
  AlertCircle,
} from "lucide-react";
import Breadcrumb from "../../../components/Breadcrumb";
import axios from "axios";
import { apiUrl } from "../config";
// ============================================================
// API PAYLOAD TYPE
// ============================================================
type ProjectInquiryPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  natureOfProject: string;
  description: string;
  teams: string;
  hangout: string;
  other: string;
};
// ============================================================
// PAGE
// ============================================================
export default function InquiryPage() {
  const router = useRouter();
  // ==========================================================
  // CAPTCHA
  // ==========================================================
  const [captcha, setCaptcha] = useState({
    num1: 7,
    num2: 4,
  });
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  // ==========================================================
  // SUBMIT STATE
  // ==========================================================
  const [isSubmitting, setIsSubmitting] = useState(false);
  // ==========================================================
  // GENERATE CAPTCHA
  // ==========================================================
  const generateCaptcha = () => {
    setCaptcha({
      num1: Math.floor(Math.random() * 9) + 1,
      num2: Math.floor(Math.random() * 9) + 1,
    });
    setCaptchaAnswer("");
  };
  // ==========================================================
  // FORM SUBMIT
  // ==========================================================
  const [toast, setToast] = useState("");
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 5000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setToast("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const get = (field: string) => String(formData.get(field) || "").trim();
    const name = get("name");
    const company = get("company");
    const email = get("email");
    const phone = get("phone");
    const city = get("city");
    const state = get("state");
    const country = get("country");
    const natureOfProject = get("natureOfProject");
    const description = get("description");
    const teams = get("teams");
    const hangout = get("hangout");
    const other = get("other");

    const fail = (message: string, field?: string) => {
      setToast(message);
      if (field) {
        const input = Array.from(form.elements).find(
          (el) => el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement
            ? el.name === field
            : false
        ) as HTMLInputElement | HTMLTextAreaElement | undefined;
        input?.focus();
      }
    };

    if (name.length < 2 || name.length > 50) return fail("Name must be between 2 and 50 characters.", "name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 100)
      return fail("Please enter a valid email address (max 100 characters).", "email");
    if (!/^\d{10}$/.test(phone))
      return fail("Phone number must contain exactly 10 digits.", "phone");
    if (natureOfProject.length < 3 || natureOfProject.length > 100)
      return fail("Nature of Project must be between 3 and 100 characters.", "natureOfProject");
    if (country.length < 2 || country.length > 60)
      return fail("Country must be between 2 and 60 characters.", "country");
    if (description.length < 10 || description.length > 2000)
      return fail("Project description must be between 10 and 2000 characters.", "description");

    const optional: Array<[string, string, number]> = [
      ["company", company, 100], ["city", city, 100], ["state", state, 100],
      ["teams", teams, 100], ["hangout", hangout, 100], ["other", other, 300],
    ];
    for (const [key, value, max] of optional) {
      if (value.length > max) return fail(`${key} must not exceed ${max} characters.`, key);
    }
    if (!captchaAnswer.trim() || !/^\d+$/.test(captchaAnswer) || Number(captchaAnswer) !== captcha.num1 + captcha.num2) {
      fail("Please enter the correct CAPTCHA answer.", "captchaAnswer");
      generateCaptcha();
      return;
    }

    const payload: ProjectInquiryPayload = {
      name, company, email, phone, city, state, country,
      natureOfProject, description, teams, hangout, other,
    };
    try {
      setIsSubmitting(true);
      const response = await axios.post(`${apiUrl}/projectInquiry`, payload, {
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        timeout: 60000,
      });
      if (response.data?.success === true) {
        router.push("/thank-you/inquiry");
        return;
      }
      fail(response.data?.message || "Unable to submit inquiry. Please try again.");
    } catch (error: unknown) {
      fail(
        axios.isAxiosError(error)
          ? error.response?.data?.message || "Unable to submit inquiry. Please try again."
          : "Something went wrong while submitting your inquiry."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  // ==========================================================
  // UI
  // ==========================================================
  return (
    <>
      {toast && (
        <div role="alert" aria-live="assertive" className="fixed right-4 top-4 z-[9999] flex max-w-[calc(100vw-2rem)] items-start gap-3 border-l-4 border-red-500 bg-white px-5 py-4 shadow-[0_15px_50px_rgba(0,0,0,.18)] sm:w-[420px]">
          <AlertCircle size={22} className="shrink-0 text-red-500" />
          <p className="flex-1 font-body text-sm leading-6 text-modura-primary">{toast}</p>
          <button type="button" onClick={() => setToast("")} aria-label="Dismiss error" className="text-gray-500 hover:text-red-500"><X size={18} /></button>
        </div>
      )}
      {/* =====================================================
          BREADCRUMB
      \===================================================== */}
      <Breadcrumb title="Inquiry" />
      {/* =====================================================
          MAIN
      \===================================================== */}
      <main className="bg-modura-off-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="
              overflow-hidden
              bg-white
              shadow-[0_15px_60px_rgba(6,19,34,0.07)]
            "
          >
            {/* =================================================
                HEADER
            \================================================= */}
            <div
              className="
                border-b
                border-modura-gray-200
                px-6
                py-8
                md:px-10
                lg:px-12
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                  font-body
                  text-xs
                  font-bold
                  uppercase
                  tracking-[4px]
                  text-modura-secondary
                "
              >
                <Send
                  size={18}
                  strokeWidth={1.5}
                />
                <span>
                  Project Inquiry
                </span>
              </div>
              <h1
                className="
                  mt-4
                  font-heading
                  text-4xl
                  font-semibold
                  uppercase
                  leading-none
                  text-modura-primary
                  lg:text-3xl
                "
              >
                Tell Us About Your Project
              </h1>
              <p
                className="
                  mt-4
                  font-body
                  text-sm
                  text-modura-gray-500
                "
              >
                * Indicates required fields
              </p>
            </div>
            {/* =================================================
                FORM
            \================================================= */}
            <div
              className="
                px-6
                py-8
                md:px-10
                md:py-10
                lg:px-12
              "
            >
              {/* =================================================
                  BASIC INFORMATION
              \================================================= */}
              <div
                className="
                  grid
                  gap-x-8
                  gap-y-7
                  md:grid-cols-2
                "
              >
                <FormField
                  label="Name"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
                <FormField
                  label="Company"
                  name="company"
                  placeholder="Enter company name"
                />
                <FormField
                  label="Email Address"
                  name="email"
                  placeholder="Enter your email address"
                  type="email"
                  required
                />
                <FormField
                  label="Phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  type="tel"
                  required
                />
                <FormField
                  label="City / Address"
                  name="city"
                  placeholder="Enter city or address"
                />
                <FormField
                  label="State / Province"
                  name="state"
                  placeholder="Enter state / province"
                />
                {/* NATURE OF PROJECT */}
                <FormField
                  label="Nature of Project"
                  name="natureOfProject"
                  placeholder="Enter nature of project"
                  required
                />
                {/* COUNTRY */}
                <FormField
                  label="Country"
                  name="country"
                  placeholder="Enter country"
                  required
                />
              </div>
              {/* =================================================
                  DESCRIPTION
              \================================================= */}
              <div className="mt-9">
                <label
                  className="
                    mb-3
                    block
                    font-body
                    text-sm
                    font-medium
                    text-modura-gray-600
                  "
                >
                  Description of your project
                  <span className="ml-1 text-modura-secondary">
                    *
                  </span>
                </label>
                <textarea
                  name="description"
                  required
                  maxLength={2000}
                  rows={7}
                  placeholder="
                    Tell us about your project, requirements, scope, timeline...
                  "
                  className="
                    w-full
                    resize-none
                    border
                    border-modura-gray-200
                    bg-modura-off-white
                    px-5
                    py-4
                    font-body
                    text-base
                    leading-7
                    text-modura-primary
                    outline-none
                    transition-all
                    duration-300
                    placeholder:text-modura-gray-400
                    focus:border-modura-secondary
                    focus:bg-white
                  "
                />
              </div>
              {/* =================================================
                  ADDITIONAL INFORMATION
              \================================================= */}
              <div
                className="
                  mt-9
                  grid
                  gap-7
                  md:grid-cols-3
                "
              >
                <FormField
                  label="Teams"
                  name="teams"
                  placeholder="Enter teams"
                />
                <FormField
                  label="Hangout"
                  name="hangout"
                  placeholder="Enter hangout / meeting option"
                />
                <FormField
                  label="Other"
                  name="other"
                  placeholder="Enter other information"
                />
              </div>
              {/* =================================================
                  CAPTCHA
              \================================================= */}
              <div className="mt-10">
                <label
                  className="
                    mb-3
                    block
                    font-body
                    text-sm
                    font-medium
                    text-modura-gray-600
                  "
                >
                  Security Verification
                  <span className="ml-1 text-modura-secondary">
                    *
                  </span>
                </label>
                <div
                  className="
                    flex
                    w-full
                    flex-col
                    gap-3
                    sm:flex-row
                    sm:items-center
                  "
                >
                  {/* CAPTCHA */}
                  <div
                    className="
                      flex
                      h-14
                      items-center
                      justify-center
                      border
                      border-modura-gray-200
                      bg-modura-primary
                      px-6
                      font-heading
                      text-xl
                      font-semibold
                      tracking-[3px]
                      text-white
                    "
                  >
                    {captcha.num1}
                    <span className="mx-3 text-modura-secondary">
                      \+
                    </span>
                    {captcha.num2}
                    <span className="mx-3 text-white/50">
                      \=
                    </span>
                  </div>
                  {/* CAPTCHA INPUT */}
                  <input
                    type="number"
                    value={captchaAnswer}
                    onChange={(e) =>
                      setCaptchaAnswer(e.target.value)
                    }
                    required
                    placeholder="Enter answer"
                    className="
                      h-14
                      w-full
                      border
                      border-modura-gray-200
                      bg-modura-off-white
                      px-5
                      font-body
                      text-base
                      text-modura-primary
                      outline-none
                      transition-all
                      duration-300
                      placeholder:text-modura-gray-400
                      focus:border-modura-secondary
                      focus:bg-white
                      sm:max-w-xs
                    "
                  />
                  {/* REFRESH */}
                  <button
                    type="button"
                    onClick={generateCaptcha}
                    aria-label="Refresh CAPTCHA"
                    className="
                      flex
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                      border
                      border-modura-secondary
                      text-modura-secondary
                      transition-all
                      duration-300
                      hover:bg-modura-secondary
                      hover:text-white
                    "
                  >
                    <RefreshCw
                      size={18}
                      strokeWidth={1.5}
                    />
                  </button>
                </div>
              </div>
              {/* =================================================
                  SUBMIT
              \================================================= */}
              <div
                className="
                  mt-10
                  flex
                  flex-col
                  gap-6
                  border-t
                  border-modura-gray-200
                  pt-8
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <p
                  className="
                    max-w-md
                    font-body
                    text-sm
                    leading-6
                    text-modura-gray-500
                  "
                >
                  Please make sure all required information
                  is filled in before submitting your inquiry.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    group
                    relative
                    flex
                    h-14
                    min-w-[190px]
                    items-center
                    justify-between
                    overflow-hidden
                    bg-modura-primary
                    px-7
                    font-body
                    text-sm
                    font-semibold
                    uppercase
                    tracking-[2px]
                    text-white
                    transition-all
                    duration-500
                    hover:bg-modura-secondary
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  <span>
                    {isSubmitting
                      ? "Submitting..."
                      : "Submit Inquiry"}
                  </span>
                  {isSubmitting ? (
                    <RefreshCw
                      size={18}
                      strokeWidth={1.5}
                      className="animate-spin"
                    />
                  ) : (
                    <Send
                      size={18}
                      strokeWidth={1.5}
                      className="
                        transition-transform
                        duration-500
                        group-hover:translate-x-1
                      "
                    />
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
// ============================================================
// FORM FIELD COMPONENT
// ============================================================
function FormField({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        className="
          mb-3
          block
          font-body
          text-sm
          font-medium
          text-modura-gray-600
        "
      >
        {label}
        {required && (
          <span className="ml-1 text-modura-secondary">
            *
          </span>
        )}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        inputMode={name === "phone" ? "numeric" : undefined}
        maxLength={name === "phone" ? 10 : name === "name" ? 50 : name === "email" ? 100 : name === "other" ? 300 : 100}
        pattern={name === "phone" ? "[0-9]{10}" : undefined}
        onInput={name === "phone" ? (event) => {
          const input = event.currentTarget;
          input.value = input.value.replace(/\D/g, "").slice(0, 10);
        } : undefined}
        className="
          h-14
          w-full
          border
          border-modura-gray-200
          bg-modura-off-white
          px-5
          font-body
          text-base
          text-modura-primary
          outline-none
          transition-all
          duration-300
          placeholder:text-modura-gray-400
          focus:border-modura-secondary
          focus:bg-white
        "
      />
    </div>
  );
}