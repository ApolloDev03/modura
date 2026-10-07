"use client";

import { useState } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const projectTypes = [
  "Architecture Design",
  "BIM Solutions",
  "Structural Engineering",
  "Project Management",
  "Steel Detailing",
  "Shop Drawing",
  "Other",
];

export default function ContactPage() {
  const [projectType, setProjectType] = useState("");
  const [captcha, setCaptcha] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captcha) {
      alert("Please verify that you are not a robot.");
      return;
    }

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-modura-off-white">
 <Breadcrumb title="Contact" />
 
      {/* =====================================================
          CONTACT + FORM
      ===================================================== */}

      <section className="relative overflow-hidden bg-modura-off-white py-14 lg:py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <div className="grid overflow-hidden bg-white shadow-[0_20px_60px_rgba(6,19,34,0.08)] lg:grid-cols-[340px_1fr]">


            {/* =================================================
                LEFT CONTACT PANEL
            ================================================= */}

            <aside className="relative overflow-hidden bg-modura-primary p-8 text-white lg:p-10">

              {/* Decorative */}

              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full border border-white/10" />
              <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full border border-modura-secondary/20" />

              <div className="relative z-10">

                <div className="mb-10">

                  <span className="font-body text-[10px] font-bold uppercase tracking-[4px] text-modura-secondary">
                    Contact Information
                  </span>

                  <h2 className="mt-4 font-heading text-4xl font-semibold uppercase leading-none">
                    Talk To
                    <span className="block text-modura-secondary">
                      Our Team
                    </span>
                  </h2>

                </div>


                {/* Office */}

                <ContactItem
                  number="01"
                  icon={<MapPin size={20} strokeWidth={1.7} />}
                  label="Our Office"
                  title="Ahmedabad"
                  description="Gujarat, India"
                />


                {/* Email */}

                <ContactItem
                  number="02"
                  icon={<Mail size={20} strokeWidth={1.7} />}
                  label="Email Us"
                  title="info@modura.com"
                  description="Send us your project requirements"
                />


                {/* Phone */}

                <ContactItem
                  number="03"
                  icon={<Phone size={20} strokeWidth={1.7} />}
                  label="Call Us"
                  title="+91 00000 00000"
                  description="Available during working hours"
                />


                {/* Working Hours */}

                <ContactItem
                  number="04"
                  icon={<Clock3 size={20} strokeWidth={1.7} />}
                  label="Working Hours"
                  title="Monday – Saturday"
                  description="9:30 AM – 6:30 PM"
                  last
                />

              </div>

            </aside>


            {/* =================================================
                FORM
            ================================================= */}

            <div className="p-7 sm:p-10 lg:p-12">


              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* ROW 1 */}

                <div className="grid gap-6 md:grid-cols-2">

                  <InputField
                    label="Name"
                    name="name"
                    placeholder="Enter your full name"
                    required
                  />

                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                  />

                </div>


                {/* ROW 2 */}

                <div className="grid gap-6 md:grid-cols-2">

                  <InputField
                    label="Company Name"
                    name="company"
                    placeholder="Enter your company name"
                  />

                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="+91 00000 00000"
                    required
                  />

                </div>


                {/* PROJECT TYPE */}

                <div>

                  <label className="mb-2 block font-body text-xs font-semibold uppercase tracking-[1px] text-modura-gray-600">
                    Nature of Project
                  </label>

                  <div className="relative">

                    <select
                      value={projectType}
                      onChange={(e) =>
                        setProjectType(e.target.value)
                      }
                      required
                      className="
                        h-14
                        w-full
                        appearance-none
                        border
                        border-modura-gray-200
                        bg-modura-off-white
                        px-5
                        font-body
                        text-sm
                        text-modura-primary
                        outline-none
                        transition-all
                        focus:border-modura-secondary
                        focus:bg-white
                      "
                    >

                      <option value="">
                        Select project type
                      </option>

                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}

                    </select>

                    <ChevronDown
                      size={18}
                      className="
                        pointer-events-none
                        absolute
                        right-5
                        top-1/2
                        -translate-y-1/2
                        text-modura-secondary
                      "
                    />

                  </div>

                </div>


                {/* MESSAGE */}

                <div>

                  <label className="mb-2 block font-body text-xs font-semibold uppercase tracking-[1px] text-modura-gray-600">
                    Project Details
                    <span className="ml-1 text-modura-secondary">
                      *
                    </span>
                  </label>

                  <textarea
                    name="message"
                    required
                    rows={6}
                    placeholder="Please describe your project, requirements or scope of work..."
                    className="
                      w-full
                      resize-none
                      border
                      border-modura-gray-200
                      bg-modura-off-white
                      p-5
                      font-body
                      text-sm
                      leading-6
                      text-modura-primary
                      outline-none
                      transition-all
                      placeholder:text-modura-gray-400
                      focus:border-modura-secondary
                      focus:bg-white
                    "
                  />

                </div>


               {/* =================================================
    CAPTCHA + SUBMIT
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

  {/* ================= CAPTCHA ================= */}

  <div
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
      sm:w-[310px]
    "
  >

    <button
      type="button"
      onClick={() => setCaptcha(!captcha)}
      className="
        flex
        items-center
        gap-3
        text-left
        outline-none
      "
    >

      {/* Checkbox */}

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


      {/* Text */}

      <span className="font-body text-xs font-medium text-modura-primary">
        I&apos;m not a robot
      </span>

    </button>


    {/* CAPTCHA Branding */}

    <div className="flex flex-col items-center justify-center">

      <div className="flex h-7 w-7 items-center justify-center border border-modura-gray-200 bg-white">
        <Check
          size={13}
          className={
            captcha
              ? "text-modura-secondary"
              : "text-modura-gray-300"
          }
        />
      </div>

      <span className="mt-1 font-body text-[7px] uppercase tracking-[1px] text-modura-gray-400">
        CAPTCHA
      </span>

    </div>

  </div>


  {/* ================= SUBMIT BUTTON ================= */}

  <button
    type="submit"
    disabled={!captcha}
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
        captcha
          ? "cursor-pointer bg-modura-primary text-white hover:bg-modura-secondary"
          : "cursor-not-allowed bg-modura-gray-200 text-modura-gray-400"
      }
    `}
  >

    {/* Hover background */}

    {captcha && (
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


    {/* Text */}

    <span className="relative z-10">
      {submitted ? "Inquiry Sent" : "Send Inquiry"}
    </span>


    {/* Arrow */}

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
          captcha
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

          <div className="relative h-[420px] overflow-hidden lg:h-[500px]">

            <iframe
              title="Modura Ahmedabad Location"
              src="https://www.google.com/maps?q=Ahmedabad,Gujarat,India&output=embed"
              className="absolute inset-0 h-full w-full border-0 grayscale-[15%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Map Overlay */}

            <div className="pointer-events-none absolute inset-0 bg-modura-primary/5" />

          </div>


          {/* LOCATION */}

          <div className="relative flex items-center overflow-hidden px-8 py-14 text-white sm:px-12 lg:px-14">

            <div className="absolute right-0 top-0 h-full w-px bg-white/10" />

            <div className="relative z-10">

              <div className="flex items-center gap-3">

                <span className="font-body text-[10px] font-bold uppercase tracking-[4px] text-modura-secondary">
                  Our Location
                </span>

              </div>

              <h2 className="mt-5 font-heading text-5xl font-semibold uppercase leading-[0.85] sm:text-6xl">

                Ahmedabad

                <span className="mt-2 block text-modura-secondary">
                  India
                </span>

              </h2>

              <div className="my-7 h-px w-full bg-white/10" />

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-modura-secondary text-modura-primary">

                  <MapPin size={21} />

                </div>

                <div>

                  <p className="font-body text-sm leading-6 text-white/80">
                    Ahmedabad,
                    <br />
                    Gujarat, India
                  </p>

                </div>

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
  number,
  icon,
  label,
  title,
  description,
  last = false,
}: {
  number: string;
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
        py-6
        ${
          !last
            ? "border-b border-white/10"
            : ""
        }
      `}
    >

      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-modura-secondary/50 text-modura-secondary">
        {icon}
      </div>

      <div className="min-w-0">

        <div className="mb-1 flex items-center gap-2">

          <span className="font-heading text-[10px] font-semibold text-white/30">
            {number}
          </span>

          <span className="font-body text-[9px] font-bold uppercase tracking-[2px] text-modura-secondary">
            {label}
          </span>

        </div>

        <p className="font-body text-sm font-semibold text-white">
          {title}
        </p>

        <p className="mt-1 font-body text-[11px] leading-5 text-white/50">
          {description}
        </p>

      </div>

    </div>
  );
}


/* ============================================================
   INPUT
============================================================ */

function InputField({
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

      <label className="mb-2 block font-body text-xs font-semibold uppercase tracking-[1px] text-modura-gray-600">

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
        required={required}
        className="
          h-14
          w-full
          border
          border-modura-gray-200
          bg-modura-off-white
          px-5
          font-body
          text-sm
          text-modura-primary
          outline-none
          transition-all
          placeholder:text-modura-gray-400
          focus:border-modura-secondary
          focus:bg-white
        "
      />

    </div>
  );
}