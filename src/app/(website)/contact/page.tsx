"use client";

import { useState } from "react";
import { LiaLinkedin } from "react-icons/lia";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa6";

import {

  ArrowRight,

  Check,

  Clock3,

  Mail,

  MapPin,

  Phone,

  Send,

  X,

} from "lucide-react";

import Breadcrumb from "@/components/Breadcrumb";

import { apiUrl } from "../config";

import { useRouter } from "next/navigation";

interface ToastState {

  type: "success" | "error";

  message: string;

}

interface FormDataType {

  name: string;

  email: string;

  companyName: string;

  phone: string;

  natureOfProject: string;

  projectDetails: string;

}

export default function ContactPage() {

   const router = useRouter();

  const [captcha, setCaptcha] = useState(false);

  const [loading, setLoading] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [toast, setToast] = useState<ToastState | null>(null);

  const [formData, setFormData] = useState<FormDataType>({

    name: "",

    email: "",

    companyName: "",

    phone: "",

    natureOfProject: "",

    projectDetails: "",

  });

  const [errors, setErrors] = useState<

    Partial<Record<keyof FormDataType, string>>

  >({});

  /* =========================================================

     TOAST

  ========================================================= */

  const showToast = (

    type: "success" | "error",

    message: string

  ) => {

    setToast({

      type,

      message,

    });

    setTimeout(() => {

      setToast(null);

    }, 4500);

  };

  /* =========================================================

     INPUT CHANGE

  ========================================================= */

  const handleChange = (

    e: React.ChangeEvent<

      HTMLInputElement | HTMLTextAreaElement

    >

  ) => {

    const { name, value } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]: value,

    }));

    setErrors((prev) => ({

      ...prev,

      [name]: "",

    }));

  };

  /* =========================================================

     VALIDATION

  ========================================================= */

  const validateForm = () => {

    const newErrors: Partial<

      Record<keyof FormDataType, string>

    > = {};

    /* NAME */

    if (!formData.name.trim()) {

      newErrors.name = "Name is required.";

    } else if (formData.name.trim().length < 2) {

      newErrors.name = "Please enter a valid name.";

    }

    /* EMAIL */

    const emailRegex =

      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!formData.email.trim()) {

      newErrors.email = "Email address is required.";

    } else if (!emailRegex.test(formData.email.trim())) {

      newErrors.email = "Please enter a valid email address.";

    }

    /* COMPANY */

    if (!formData.companyName.trim()) {

      newErrors.companyName =

        "Company name is required.";

    } else if (

      formData.companyName.trim().length < 2

    ) {

      newErrors.companyName =

        "Please enter a valid company name.";

    }

    /* PHONE */

    const phoneDigits =

      formData.phone.replace(/\D/g, "");

    if (!formData.phone.trim()) {

      newErrors.phone =

        "Phone number is required.";

    } else if (

      phoneDigits.length < 7 ||

      phoneDigits.length > 15

    ) {

      newErrors.phone =

        "Please enter a valid phone number.";

    }

    /* NATURE OF PROJECT */

    if (!formData.natureOfProject.trim()) {

      newErrors.natureOfProject =

        "Nature of project is required.";

    } else if (

      formData.natureOfProject.trim().length < 3

    ) {

      newErrors.natureOfProject =

        "Please enter a valid project type.";

    }

    /* PROJECT DETAILS */

    if (!formData.projectDetails.trim()) {

      newErrors.projectDetails =

        "Project details are required.";

    } else if (

      formData.projectDetails.trim().length < 10

    ) {

      newErrors.projectDetails =

        "Please provide more details about your project.";

    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  /* =========================================================

     SUBMIT

  ========================================================= */

  const handleSubmit = async (

    e: React.FormEvent<HTMLFormElement>

  ) => {

    e.preventDefault();

    setToast(null);

    const valid = validateForm();

    if (!valid) {

      showToast(

        "error",

        "Please check the highlighted fields."

      );

      return;

    }

    if (!captcha) {

      showToast(

        "error",

        "Please verify that you are not a robot."

      );

      return;

    }

    try {

      setLoading(true);

      const response = await fetch(

        `${apiUrl}/contactInquiry`,

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify({

            name: formData.name.trim(),

            email: formData.email.trim(),

            companyName:

              formData.companyName.trim(),

            phone: formData.phone.trim(),

            natureOfProject:

              formData.natureOfProject.trim(),

            projectDetails:

              formData.projectDetails.trim(),

          }),

        }

      );

      const result = await response.json();

      if (!response.ok || !result.success) {

        throw new Error(

          result?.message ||

            "Unable to send your inquiry."

        );

      }

      /* SUCCESS */

        router.push("/thank-you/inqueriy");

      setSubmitted(true);

      showToast(

        "success",

        result?.message ||

          "Thank you for contacting us! We will get back to you soon."

      );

      setFormData({

        name: "",

        email: "",

        companyName: "",

        phone: "",

        natureOfProject: "",

        projectDetails: "",

      });

      setErrors({});

      setCaptcha(false);

      setTimeout(() => {

        setSubmitted(false);

      }, 4000);

    } catch (error) {

      console.error(

        "Contact Inquiry Error:",

        error

      );

      showToast(

        "error",

        error instanceof Error

          ? error.message

          : "Something went wrong. Please try again."

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <main className="min-h-screen bg-modura-off-white">

      {/* =====================================================

          TOAST

      ===================================================== */}

      {toast && (

        <div

          className="

            fixed

            right-5

            top-5

            z-[9999]

            w-[calc(100%-40px)]

            max-w-[420px]

            animate-[slideIn_.35s_ease-out]

          "

        >

          <div

            className={`

              relative

              overflow-hidden

              border

              bg-white

              p-5

              shadow-[0_20px_60px_rgba(6,19,34,0.18)]

              ${

                toast.type === "success"

                  ? "border-emerald-200"

                  : "border-red-200"

              }

            `}

          >

            <div className="flex items-start gap-4">

              <div

                className={`

                  flex

                  h-11

                  w-11

                  shrink-0

                  items-center

                  justify-center

                  ${

                    toast.type === "success"

                      ? "bg-emerald-100 text-emerald-600"

                      : "bg-red-100 text-red-600"

                  }

                `}

              >

                {toast.type === "success" ? (

                  <Check

                    size={21}

                    strokeWidth={3}

                  />

                ) : (

                  <X

                    size={21}

                    strokeWidth={2.5}

                  />

                )}

              </div>

              <div className="min-w-0 flex-1">

                <p

                  className={`

                    font-body

                    text-[10px]

                    font-bold

                    uppercase

                    tracking-[3px]

                    ${

                      toast.type === "success"

                        ? "text-emerald-600"

                        : "text-red-600"

                    }

                  `}

                >

                  {toast.type === "success"

                    ? "Thank You"

                    : "Something Went Wrong"}

                </p>

                <p className="mt-1 font-body text-sm leading-6 text-modura-primary">

                  {toast.message}

                </p>

              </div>

              <button

                type="button"

                onClick={() => setToast(null)}

                className="

                  text-modura-gray-400

                  transition

                  hover:text-modura-primary

                "

              >

                <X size={16} />

              </button>

            </div>

            <div

              className={`

                absolute

                bottom-0

                left-0

                h-[3px]

                ${

                  toast.type === "success"

                    ? "bg-emerald-500"

                    : "bg-red-500"

                }

                animate-[toastProgress_4.5s_linear]

              `}

            />

          </div>

        </div>

      )}

      {/* =====================================================

          BREADCRUMB

      ===================================================== */}

      <Breadcrumb title="Contact" />

      {/* =====================================================

          CONTACT SECTION

      ===================================================== */}

      <section

        className="

          relative

          overflow-hidden

          bg-modura-off-white

          py-14

          lg:py-20

        "

      >

        {/* Background Architecture Lines */}

        <div className="pointer-events-none absolute inset-0 opacity-40">

          <div

            className="

              absolute

              right-[12%]

              top-0

              h-full

              w-px

              bg-modura-primary/5

            "

          />

          <div

            className="

              absolute

              right-[30%]

              top-0

              h-full

              w-px

              bg-modura-primary/5

            "

          />

          <div

            className="

              absolute

              left-0

              top-[35%]

              h-px

              w-full

              bg-modura-primary/5

            "

          />

          <div

            className="

              absolute

              left-0

              top-[70%]

              h-px

              w-full

              bg-modura-primary/5

            "

          />

        </div>

        <div className="relative z-10 mx-auto w-full max-w-full px-4 md:px-6 lg:px-10 2xl:px-16">

          <div

            className="

              overflow-hidden

              bg-white

              shadow-[0_25px_80px_rgba(6,19,34,0.10)]

              lg:grid

              lg:grid-cols-[minmax(300px,350px)_minmax(0,1fr)]

            "

          >

            {/* =================================================

                LEFT CONTACT INFORMATION

            ================================================= */}

            <aside

              className="

                relative

                overflow-hidden

                bg-modura-primary

                p-8

                text-white

                lg:p-10

              "

            >

              {/* Decorative */}

              <div

                className="

                  absolute

                  -right-24

                  -top-24

                  h-64

                  w-64

                  rounded-full

                  border

                  border-white/10

                "

              />

              <div

                className="

                  absolute

                  -bottom-32

                  -left-32

                  h-80

                  w-80

                  rounded-full

                  border

                  border-modura-secondary/20

                "

              />

              <div className="relative z-10">

                <div className="mb-8">

                  <div className="flex items-center gap-3">

                    <span className="h-px w-8 bg-modura-secondary" />

                    <span

                      className="

                        font-body

                        text-[10px]

                        font-bold

                        uppercase

                        tracking-[4px]

                        text-modura-secondary

                      "

                    >

                      Contact Information

                    </span>

                  </div>

                  <h2

                    className="

                      mt-5

                      font-heading

                      text-4xl

                      font-semibold

                      uppercase

                      leading-[0.9]

                    "

                  >

                    Talk To

                    <span className="block text-modura-secondary">

                      Our Team

                    </span>

                  </h2>

                  <p

                    className="

                      mt-5

                      max-w-[250px]

                      font-body

                      text-sm

                      leading-6

                      text-white/55

                    "

                  >

                    Tell us about your project and

                    our team will help you find the

                    right engineering solution.

                  </p>

                </div>

                <ContactItem

                  icon={

                    <MapPin

                      size={19}

                      strokeWidth={1.7}

                    />

                  }

                  label="Our Office"

                  title="World Trade Tower"

                  description="Behind Skoda Showroom, Off SG Highway, Makarba, Ahmedabad, Gujarat 380051"

                />

                <ContactItem

                  icon={

                    <Mail

                      size={19}

                      strokeWidth={1.7}

                    />

                  }

                  label="Email Us"

                  title="info@mvnengineering.com"

                  description="Send us your project requirements"

                />

                <ContactItem

                  icon={

                    <Phone

                      size={19}

                      strokeWidth={1.7}

                    />

                  }

                  label="Call Us"

                  title="+91 9879860886"

                  description="Available during working hours"

                />

                <ContactItem

                  icon={

                    <Clock3

                      size={19}

                      strokeWidth={1.7}

                    />

                  }

                  label="Working Hours"

                  title="Monday – Saturday"

                  description="9:30 AM – 6:30 PM"

                  last

                />

                {/* SOCIAL LINKS */}
                <div className="mt-7 border-t border-white/10 pt-6">
                  <p className="mb-4 font-body text-[10px] font-bold uppercase tracking-[3px] text-modura-secondary">
                    Connect With Us
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="https://www.linkedin.com/company/91120919/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="MVNL Engineering on LinkedIn"
                      className="flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors hover:border-modura-secondary hover:bg-modura-secondary"
                    >
                      <LiaLinkedin size={22} />
                    </a>
                    <a
                      href="https://www.facebook.com/mvnlengineering/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="MVNL Engineering on Facebook"
                      className="flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors hover:border-modura-secondary hover:bg-modura-secondary"
                    >
                      <FaFacebookF size={17} />
                    </a>
                    <a
                      href="https://api.whatsapp.com/send/?phone=%2B919879860886&text&type=phone_number&app_absent=0"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="MVNL Engineering on WhatsApp"
                      className="flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors hover:border-[#25D366] hover:bg-[#25D366]"
                    >
                      <FaWhatsapp size={21} />
                    </a>
                  </div>
                </div>

              </div>

            </aside>

            {/* =================================================

                FORM

            ================================================= */}

            <div className="min-w-0 p-5 sm:p-8 lg:p-10 xl:p-12">

              {/* FORM HEADING */}

              <div className="mb-10">

                <div className="flex items-center gap-3">

                  <span

                    className="

                      flex

                      h-10

                      w-10

                      items-center

                      justify-center

                      bg-modura-secondary

                      text-modura-primary

                    "

                  >

                    <Send

                      size={17}

                      strokeWidth={1.8}

                    />

                  </span>

                  <div>

                    <span

                      className="

                        font-body

                        text-[10px]

                        font-bold

                        uppercase

                        tracking-[3px]

                        text-modura-secondary

                      "

                    >

                      Project Inquiry

                    </span>

                    <h3

                      className="

                        mt-1

                        font-heading

                        text-3xl

                        font-semibold

                        uppercase

                        text-modura-primary

                      "

                    >

                      Start A Conversation

                    </h3>

                  </div>

                </div>

                <p

                  className="

                    mt-5

                    max-w-2xl

                    font-body

                    text-sm

                    leading-7

                    text-modura-gray-500

                  "

                >

                  Share your project requirements with

                  us. All fields are required so our team

                  can understand your requirements clearly.

                </p>

              </div>

              <form

                onSubmit={handleSubmit}

                noValidate

                className="space-y-6"

              >

                {/* =================================================

                    ROW 1

                ================================================= */}

                <div className="grid gap-6 md:grid-cols-2">

                  <InputField

                    label="Name"

                    name="name"

                    placeholder="Enter your full name"

                    value={formData.name}

                    onChange={handleChange}

                    error={errors.name}

                    required

                  />

                  <InputField

                    label="Email Address"

                    name="email"

                    type="email"

                    placeholder="Enter your email address"

                    value={formData.email}

                    onChange={handleChange}

                    error={errors.email}

                    required

                  />

                </div>

                {/* =================================================

                    ROW 2

                ================================================= */}

                <div className="grid gap-6 md:grid-cols-2">

                  <InputField

                    label="Company Name"

                    name="companyName"

                    placeholder="Enter your company name"

                    value={formData.companyName}

                    onChange={handleChange}

                    error={errors.companyName}

                    required

                  />

                  <InputField

                    label="Phone Number"

                    name="phone"

                    type="tel"

                    placeholder="+91 9879860886"

                    value={formData.phone}

                    onChange={handleChange}

                    error={errors.phone}

                    required

                  />

                </div>

                {/* =================================================

                    NATURE OF PROJECT

                ================================================= */}

                <InputField

                  label="Nature of Project"

                  name="natureOfProject"

                  placeholder="e.g. Residential Architectural Drafting"

                  value={formData.natureOfProject}

                  onChange={handleChange}

                  error={errors.natureOfProject}

                  required

                />

                {/* =================================================

                    PROJECT DETAILS

                ================================================= */}

                <div>

                  <label

                    className="

                      mb-2

                      flex

                      items-center

                      justify-between

                      font-body

                      text-xs

                      font-semibold

                      uppercase

                      tracking-[1px]

                      text-modura-gray-600

                    "

                  >

                    <span>

                      Project Details

                      <span className="ml-1 text-modura-secondary">

                        *

                      </span>

                    </span>

                    <span className="text-[9px] font-normal tracking-[1px] text-modura-gray-400">

                      {formData.projectDetails.length} / 2000

                    </span>

                  </label>

                  <textarea

                    name="projectDetails"

                    required

                    rows={7}

                    maxLength={2000}

                    value={formData.projectDetails}

                    onChange={handleChange}

                    placeholder="Please describe your project, requirements or scope of work..."

                    className={`

                      w-full

                      resize-none

                      border

                      bg-modura-off-white

                      p-5

                      font-body

                      text-sm

                      leading-7

                      text-modura-primary

                      outline-none

                      transition-all

                      placeholder:text-modura-gray-400

                      focus:bg-white

                      ${

                        errors.projectDetails

                          ? "border-red-400"

                          : "border-modura-gray-200 focus:border-modura-secondary"

                      }

                    `}

                  />

                  {errors.projectDetails && (

                    <p className="mt-2 font-body text-xs text-red-500">

                      {errors.projectDetails}

                    </p>

                  )}

                </div>

                {/* =================================================

                    CAPTCHA + BUTTON

                ================================================= */}

                <div

                  className="

                    flex

                    flex-col

                    gap-5

                    border-t

                    border-modura-gray-200

                    pt-6

                    sm:flex-row

                    sm:items-center

                    sm:justify-between

                  "

                >

                  {/* CAPTCHA */}

                  <button

                    type="button"

                    onClick={() =>

                      setCaptcha((prev) => !prev)

                    }

                    className="

                      flex

                      min-h-[64px]

                      w-full

                      items-center

                      justify-between

                      border

                      border-modura-gray-200

                      bg-modura-off-white

                      px-4

                      py-3

                      text-left

                      outline-none

                      transition-all

                      hover:border-modura-secondary

                      sm:w-[310px]

                    "

                  >

                    <div className="flex items-center gap-3">

                      <span

                        className={`

                          flex

                          h-7

                          w-7

                          shrink-0

                          items-center

                          justify-center

                          border

                          transition-all

                          duration-300

                          ${

                            captcha

                              ? "border-modura-secondary bg-modura-secondary"

                              : "border-modura-gray-300 bg-white"

                          }

                        `}

                      >

                        {captcha && (

                          <Check

                            size={17}

                            strokeWidth={3}

                            className="text-white"

                          />

                        )}

                      </span>

                      <span

                        className="

                          font-body

                          text-xs

                          font-medium

                          text-modura-primary

                        "

                      >

                        I'm not a robot

                      </span>

                    </div>

                    <div className="flex flex-col items-center">

                      <div

                        className="

                          flex

                          h-7

                          w-7

                          items-center

                          justify-center

                          border

                          border-modura-gray-200

                          bg-white

                        "

                      >

                        <Check

                          size={13}

                          className={

                            captcha

                              ? "text-modura-secondary"

                              : "text-modura-gray-300"

                          }

                        />

                      </div>

                      <span

                        className="

                          mt-1

                          font-body

                          text-[7px]

                          uppercase

                          tracking-[1px]

                          text-modura-gray-400

                        "

                      >

                        CAPTCHA

                      </span>

                    </div>

                  </button>

                  {/* SUBMIT */}

                  <button

                    type="submit"

                    disabled={loading}

                    className={`

                      group

                      relative

                      flex

                      h-14

                      w-full

                      items-center

                      justify-between

                      overflow-hidden

                      px-7

                      font-body

                      text-xs

                      font-bold

                      uppercase

                      tracking-[2.5px]

                      transition-all

                      duration-500

                      sm:w-[230px]

                      ${

                        captcha && !loading

                          ? "cursor-pointer bg-modura-primary text-white hover:bg-modura-secondary"

                          : "cursor-not-allowed bg-modura-gray-200 text-modura-gray-400"

                      }

                    `}

                  >

                    {captcha && !loading && (

                      <span

                        className="

                          absolute

                          inset-0

                          translate-x-[-100%]

                          bg-modura-secondary

                          transition-transform

                          duration-500

                          group-hover:translate-x-0

                        "

                      />

                    )}

                    <span className="relative z-10">

                      {submitted

                        ? "Thank You"

                        : loading

                          ? "Sending..."

                          : "Send Inquiry"}

                    </span>

                    <span

                      className={`

                        relative

                        z-10

                        flex

                        h-9

                        w-9

                        items-center

                        justify-center

                        transition-all

                        duration-500

                        ${

                          captcha && !loading

                            ? "bg-modura-secondary text-modura-primary group-hover:bg-modura-primary group-hover:text-white"

                            : "bg-modura-gray-300 text-modura-gray-400"

                        }

                      `}

                    >

                      <ArrowRight

                        size={17}

                        className="

                          transition-transform

                          duration-500

                          group-hover:translate-x-1

                        "

                      />

                    </span>

                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================

          MAP

      ===================================================== */}

      <section className="relative bg-modura-primary">

        <div className="grid lg:grid-cols-[1.5fr_.7fr]">

          {/* MAP */}

          <div

            className="

              relative

              h-[400px]

              overflow-hidden

              lg:h-[500px]

            "

          >

            <iframe

              title="World Trade Tower, Ahmedabad Location"

              src="https://www.google.com/maps?q=World%20Trade%20Tower%2C%20Behind%20Skoda%20Showroom%2C%20Makarba%2C%20Ahmedabad%2C%20Gujarat%20380051&output=embed"

              className="

                absolute

                inset-0

                h-full

                w-full

                border-0

                grayscale-[15%]

              "

              loading="lazy"

              referrerPolicy="no-referrer-when-downgrade"

            />

            <div

              className="

                pointer-events-none

                absolute

                inset-0

                bg-modura-primary/5

              "

            />

          </div>

          {/* LOCATION */}

          <div

            className="

              relative

              flex

              items-center

              overflow-hidden

              px-8

              py-14

              text-white

              sm:px-12

              lg:px-14

            "

          >

            <div

              className="

                absolute

                right-0

                top-0

                h-full

                w-px

                bg-white/10

              "

            />

            <div className="relative z-10">

              <span

                className="

                  font-body

                  text-[10px]

                  font-bold

                  uppercase

                  tracking-[4px]

                  text-modura-secondary

                "

              >

                Our Location

              </span>

              <h2

                className="

                  mt-5

                  font-heading

                  text-5xl

                  font-semibold

                  uppercase

                  leading-[0.85]

                  sm:text-6xl

                "

              >

                Ahmedabad

                <span className="mt-2 block text-modura-secondary">

                  India

                </span>

              </h2>

              <div className="my-7 h-px w-full bg-white/10" />

              <div className="flex items-start gap-4">

                <div

                  className="

                    flex

                    h-12

                    w-12

                    shrink-0

                    items-center

                    justify-center

                    bg-modura-secondary

                    text-modura-primary

                  "

                >

                  <MapPin size={21} />

                </div>

                <p

                  className="

                    font-body

                    text-sm

                    leading-6

                    text-white/80

                  "

                >

                  World Trade Tower,

                  <br />

                  Behind Skoda Showroom, Off SG Highway,

                  <br />

                  Makarba, Ahmedabad, Gujarat 380051

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}

/* ============================================================

   CONTACT ITEM

============================================================ */

function ContactItem({

  icon,

  label,

  title,

  description,

  last = false,

}: {

  icon: React.ReactNode;

  label: string;

  title: string;

  description: string;

  last?: boolean;

}) {

  return (

    <div

      className={`

        relative

        flex

        gap-4

        py-5

        ${

          !last

            ? "border-b border-white/10"

            : ""

        }

      `}

    >

      <div

        className="

          flex

          h-11

          w-11

          shrink-0

          items-center

          justify-center

          border

          border-modura-secondary/50

          text-modura-secondary

        "

      >

        {icon}

      </div>

      <div className="min-w-0">

        <div className="mb-1 flex items-center gap-2">

          <span

            className="

              font-body

              text-[13px]

              font-bold

              uppercase

              tracking-[2px]

              text-modura-secondary

            "

          >

            {label}

          </span>

        </div>

        <p

          className="

            break-words

            font-body

            text-md

            font-semibold

            text-white

          "

        >

          {title}

        </p>

        <p

          className="

            mt-1

            font-body

            text-[12px]

            leading-5

            text-white

          "

        >

          {description}

        </p>

      </div>

    </div>

  );

}

/* ============================================================

   INPUT FIELD

============================================================ */

function InputField({

  label,

  name,

  placeholder,

  value,

  onChange,

  error,

  type = "text",

  required = false,

}: {

  label: string;

  name: string;

  placeholder: string;

  value: string;

  onChange: (

    e: React.ChangeEvent<HTMLInputElement>

  ) => void;

  error?: string;

  type?: string;

  required?: boolean;

}) {

  return (

    <div>

      <label

        className="

          mb-2

          block

          font-body

          text-xs

          font-semibold

          uppercase

          tracking-[1px]

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

        name={name}

        type={type}

        placeholder={placeholder}

        value={value}

        onChange={onChange}

        required={required}

        className={`

          h-14

          w-full

          border

          bg-modura-off-white

          px-5

          font-body

          text-sm

          text-modura-primary

          outline-none

          transition-all

          placeholder:text-modura-gray-400

          focus:bg-white

          ${

            error

              ? "border-red-400 focus:border-red-500"

              : "border-modura-gray-200 focus:border-modura-secondary"

          }

        `}

      />

      {error && (

        <p className="mt-2 font-body text-xs text-red-500">

          {error}

        </p>

      )}

    </div>

  );

}