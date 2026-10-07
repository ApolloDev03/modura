"use client";

import { useState } from "react";
import {
  ChevronDown,
  RefreshCw,
  Send,
} from "lucide-react";

import Breadcrumb from "../components/Breadcrumb";
import AnimatedButton from "@/app/components/AnimatedButton";

type DropdownProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  required?: boolean;
};

export default function InquiryPage() {
  const [projectType, setProjectType] = useState("");
  const [country, setCountry] = useState("");

  const [captcha, setCaptcha] = useState({
    num1: 7,
    num2: 4,
  });

  const [captchaAnswer, setCaptchaAnswer] = useState("");

  const generateCaptcha = () => {
    setCaptcha({
      num1: Math.floor(Math.random() * 9) + 1,
      num2: Math.floor(Math.random() * 9) + 1,
    });

    setCaptchaAnswer("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const correctAnswer = captcha.num1 + captcha.num2;

    if (Number(captchaAnswer) !== correctAnswer) {
      alert("Please enter the correct CAPTCHA.");
      generateCaptcha();
      return;
    }

    // API integration can be added here.
    alert("Inquiry submitted successfully.");
  };

  return (
    <>
      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <Breadcrumb title="Inquiry" />


      {/* =====================================================
          INQUIRY FORM
      ===================================================== */}

      <main className="bg-modura-off-white py-14 md:py-20">

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">

          <form
            onSubmit={handleSubmit}
            className="
              overflow-hidden
              bg-white
              shadow-[0_15px_60px_rgba(6,19,34,0.07)]
            "
          >

            {/* =================================================
                FORM HEADER
            ================================================= */}

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
                  md:text-5xl
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
                PERSONAL INFORMATION
            ================================================= */}

            <div
              className="
                px-6
                py-8
                md:px-10
                md:py-10
                lg:px-12
              "
            >

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
                  placeholder="Enter your name"
                  required
                />

                <FormField
                  label="Company"
                  placeholder="Enter company name"
                />

                <FormField
                  label="Email Address"
                  placeholder="Enter your email address"
                  type="email"
                  required
                />

                <FormField
                  label="Phone"
                  placeholder="Enter your phone number"
                  type="tel"
                  required
                />

                <FormField
                  label="City / Address"
                  placeholder="Enter city or address"
                />

                <FormField
                  label="State / Province"
                  placeholder="Enter state / province"
                />


                {/* CUSTOM PROJECT DROPDOWN */}

                <CustomDropdown
                  label="Nature of Project"
                  value={projectType}
                  onChange={setProjectType}
                  required
                  options={[
                    "Architecture",
                    "BIM Solutions",
                    "Structural Engineering",
                    "Project Management",
                    "Steel Detailing",
                    "Shop Drawing",
                    "Other",
                  ]}
                />


                {/* CUSTOM COUNTRY DROPDOWN */}

                <CustomDropdown
                  label="Country"
                  value={country}
                  onChange={setCountry}
                  required
                  options={[
                    "India",
                    "United States",
                    "United Kingdom",
                    "Canada",
                    "Australia",
                    "United Arab Emirates",
                    "Other",
                  ]}
                />

              </div>


              {/* =================================================
                  PROJECT DESCRIPTION
              ================================================= */}

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
                  rows={7}
                  placeholder="Tell us about your project, requirements, scope, timeline..."
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
              ================================================= */}

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
                  placeholder="Enter details"
                />

                <FormField
                  label="Hangout"
                  placeholder="Enter details"
                />

                <FormField
                  label="Other"
                  placeholder="Enter details"
                />

              </div>


              {/* =================================================
                  CAPTCHA
              ================================================= */}

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

                  {/* CAPTCHA BOX */}

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
                      +
                    </span>

                    {captcha.num2}

                    <span className="mx-3 text-white/50">
                      =
                    </span>

                  </div>


                  {/* ANSWER */}

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
              ================================================= */}

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
                  "
                >

                  <span>
                    Submit Inquiry
                  </span>

                  <Send
                    size={18}
                    strokeWidth={1.5}
                    className="
                      transition-transform
                      duration-500
                      group-hover:translate-x-1
                    "
                  />

                </button>

              </div>

            </div>

          </form>

        </div>

      </main>
    </>
  );
}


/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
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
        name={label.toLowerCase().replace(/\s+/g, "_")}
        placeholder={placeholder}
        required={required}
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


/* =========================================================
   CUSTOM DROPDOWN
========================================================= */

function CustomDropdown({
  label,
  value,
  options,
  onChange,
  required = false,
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

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


      {/* SELECT BUTTON */}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`
          flex
          h-14
          w-full
          items-center
          justify-between
          border
          bg-modura-off-white
          px-5
          text-left
          font-body
          text-base
          outline-none
          transition-all
          duration-300
          ${
            open
              ? "border-modura-secondary bg-white"
              : "border-modura-gray-200"
          }
        `}
      >

        <span
          className={
            value
              ? "text-modura-primary"
              : "text-modura-gray-400"
          }
        >
          {value || `Select ${label.toLowerCase()}`}
        </span>


        <ChevronDown
          size={18}
          strokeWidth={1.5}
          className={`
            text-modura-secondary
            transition-transform
            duration-300
            ${open ? "rotate-180" : ""}
          `}
        />

      </button>


      {/* DROPDOWN */}

      {open && (
        <div
          className="
            absolute
            left-0
            right-0
            top-full
            z-50
            mt-1
            overflow-hidden
            border
            border-modura-gray-200
            bg-white
            shadow-[0_15px_40px_rgba(6,19,34,0.12)]
          "
        >

          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className="
                flex
                w-full
                items-center
                border-b
                border-modura-gray-100
                px-5
                py-4
                text-left
                font-body
                text-sm
                text-modura-primary
                transition-all
                duration-200
                last:border-b-0
                hover:bg-modura-off-white
                hover:pl-7
                hover:text-modura-secondary
              "
            >

              <span
                className="
                  mr-3
                  h-1.5
                  w-1.5
                  bg-modura-secondary
                "
              />

              {option}

            </button>
          ))}

        </div>
      )}

    </div>
  );
}