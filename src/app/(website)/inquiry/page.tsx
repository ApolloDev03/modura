"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  RefreshCw,
  Send,
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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // --------------------------------------------------------
    // CAPTCHA VALIDATION
    // --------------------------------------------------------

    const correctAnswer =
      captcha.num1 + captcha.num2;

    if (Number(captchaAnswer) !== correctAnswer) {
      alert("Please enter the correct CAPTCHA.");
      generateCaptcha();
      return;
    }


    // --------------------------------------------------------
    // GET FORM DATA
    // --------------------------------------------------------

    const form = e.currentTarget;

    const formData = new FormData(form);


    const name = String(
      formData.get("name") || ""
    ).trim();

    const company = String(
      formData.get("company") || ""
    ).trim();

    const email = String(
      formData.get("email") || ""
    ).trim();

    const phone = String(
      formData.get("phone") || ""
    ).trim();

    const city = String(
      formData.get("city") || ""
    ).trim();

    const state = String(
      formData.get("state") || ""
    ).trim();

    const country = String(
      formData.get("country") || ""
    ).trim();

    const natureOfProject = String(
      formData.get("natureOfProject") || ""
    ).trim();

    const description = String(
      formData.get("description") || ""
    ).trim();

    const teams = String(
      formData.get("teams") || ""
    ).trim();

    const hangout = String(
      formData.get("hangout") || ""
    ).trim();

    const other = String(
      formData.get("other") || ""
    ).trim();


    // ========================================================
    // REQUIRED VALIDATION
    // ========================================================

    if (!name) {
      alert("Please enter your name.");
      return;
    }

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    if (!phone) {
      alert("Please enter your phone number.");
      return;
    }

    if (!natureOfProject) {
      alert("Please enter the nature of project.");
      return;
    }

    if (!country) {
      alert("Please enter the country.");
      return;
    }

    if (!description) {
      alert("Please enter your project description.");
      return;
    }


    // ========================================================
    // EMAIL VALIDATION
    // ========================================================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }


    // ========================================================
    // PHONE VALIDATION
    // ========================================================

    const phoneDigits =
      phone.replace(/\D/g, "");

    if (phoneDigits.length < 7) {
      alert("Please enter a valid phone number.");
      return;
    }


    // ========================================================
    // API PAYLOAD
    // ========================================================

    const payload: ProjectInquiryPayload = {
      name,
      company,
      email,
      phone,
      city,
      state,
      country,
      natureOfProject,
      description,
      teams,
      hangout,
      other,
    };


    console.log(
      "Project Inquiry Payload:",
      payload
    );


    // ========================================================
    // API CALL
    // ========================================================

   try {
  setIsSubmitting(true);

  const response = await axios.post(
      `${apiUrl}/projectInquiry`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 60000,
    }
  );

  console.log(
    "Project Inquiry API Response:",
    response.data
  );

  if (response.data?.success === true) {
    router.push("/thank-you/inquiry");
    return;
  }

  alert(
    response.data?.message ||
      "Unable to submit inquiry. Please try again."
  );

} catch (error: unknown) {

  console.error(
    "Project Inquiry API Error:",
    error
  );

  if (axios.isAxiosError(error)) {
    alert(
      error.response?.data?.message ||
        "Unable to submit inquiry. Please try again."
    );
  } else {
    alert(
      "Something went wrong while submitting your inquiry."
    );
  }

} finally {
  setIsSubmitting(false);
} 
  };


  // ==========================================================
  // UI
  // ==========================================================

  return (
    <>
      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <Breadcrumb title="Inquiry" />


      {/* =====================================================
          MAIN
      ===================================================== */}

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
                FORM
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

              {/* =================================================
                  BASIC INFORMATION
              ================================================= */}

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
                      +
                    </span>

                    {captcha.num2}

                    <span className="mx-3 text-white/50">
                      =
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