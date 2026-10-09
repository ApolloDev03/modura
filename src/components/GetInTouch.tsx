"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";

import { useRouter } from "next/navigation";

import {
  X,
  User,
  Mail,
  Phone,
  Layers,
  MessageSquare,
  ArrowRight,
  ChevronDown,
  Check,
  ArrowUpRight,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { apiUrl } from "@/app/(website)/config";
import { FaWhatsapp } from "react-icons/fa6";

interface FormDataType {
  name: string;
  email: string;
  phone: string;
  natureOfProject: string;
  projectDetails: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  natureOfProject?: string;
  projectDetails?: string;
}

interface ToastState {
  type: "success" | "error";
  message: string;
}

export default function GetInTouch() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);

  const [service, setService] = useState("");

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState<ToastState | null>(null);

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    phone: "",
    natureOfProject: "",
    projectDetails: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const services = [
    "Architecture Design",
    "BIM Solutions",
    "Structural Engineering",
    "Project Management",
    "Interior Design",
    "Engineering Consultancy",
  ];

  /*
  |--------------------------------------------------------------------------
  | LOCK BODY SCROLL
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setServiceOpen(false);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /*
  |--------------------------------------------------------------------------
  | ESCAPE TO CLOSE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | TOAST
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | INPUT CHANGE
  |--------------------------------------------------------------------------
  */

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  /*
  |--------------------------------------------------------------------------
  | VALIDATION
  |--------------------------------------------------------------------------
  */

  const validateForm = () => {
    const newErrors: FormErrors = {};

    // NAME
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Please enter a valid name.";
    }

    // EMAIL
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    // PHONE
    const phoneDigits =
      formData.phone.replace(/\D/g, "");

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (
      phoneDigits.length < 7 ||
      phoneDigits.length > 15
    ) {
      newErrors.phone =
        "Please enter a valid phone number.";
    }

    // NATURE OF PROJECT
    if (!formData.natureOfProject.trim()) {
      newErrors.natureOfProject =
        "Nature of project is required.";
    } else if (
      formData.natureOfProject.trim().length < 3
    ) {
      newErrors.natureOfProject =
        "Please enter a valid project type.";
    }

    // PROJECT DETAILS
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

  /*
  |--------------------------------------------------------------------------
  | SUBMIT
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
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

            companyName: "",

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

      // SUCCESS
      setOpen(false);

      setFormData({
        name: "",
        email: "",
        phone: "",
        natureOfProject: "",
        projectDetails: "",
      });

      setErrors({});
      setService("");

      router.push("/thank-you");

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
    <>
      {/* =========================================================
          TOAST
      ========================================================= */}

      {toast && (
        <div
          className="
            fixed
            right-5
            top-5
            z-[9999]
            w-[calc(100%-40px)]
            max-w-[420px]
          "
        >
          <div
            className={`
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
                  <Check size={21} />
                ) : (
                  <X size={21} />
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
                className="text-modura-gray-400 hover:text-modura-primary"
              >
                <X size={16} />
              </button>

            </div>
          </div>
        </div>
      )}


{/* UNIQUE WHATSAPP FLOATING BUTTON */}

<a
  href="https://api.whatsapp.com/send/?phone=%2B919879860886&text&type=phone_number&app_absent=0"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chat with MVNL Engineering on WhatsApp"
  title="Chat on WhatsApp"
  className="
  group
  fixed
  bottom-[105px]
  right-4
  z-[999]
  block
  h-[58px]
  w-[58px]
  overflow-hidden
  bg-modura-primary
  text-white
  shadow-xl
  transition-all
  duration-500
  sm:bottom-[112px]
  sm:right-6
  sm:h-[64px]
  sm:w-[64px]
  md:hover:w-[245px]
  clip-whatsapp
"
>
  {/* Architectural corner detail */}
  <span
    className="
      pointer-events-none
      absolute
      right-0
      top-0
      h-[18px]
      w-[18px]
      bg-modura-secondary
      transition-all
      duration-500
      group-hover:h-[4px]
      group-hover:w-full
    "
  />

  {/* Blueprint frame */}
  <span
    className="
      pointer-events-none
      absolute
      inset-[5px]
      border
      border-white/15
    "
  />

  {/* Fine technical lines */}
  <span
    className="
      pointer-events-none
      absolute
      inset-y-3
      left-[29px]
      w-px
      bg-white/10
      sm:left-[32px]
    "
  />

  {/* WhatsApp icon */}
  <span
    className="
      absolute
      left-[9px]
      top-1/2
      z-10
      flex
      h-10
      w-10
      -translate-y-1/2
      items-center
      justify-center
      border
      border-[#25D366]
      bg-[#25D366]/10
      text-[#25D366]
      transition-all
      duration-500
      group-hover:bg-[#25D366]
      group-hover:text-white
      sm:left-[11px]
      sm:h-[42px]
      sm:w-[42px]
    "
  >
    <FaWhatsapp size={24} />
  </span>

  {/* Expanded label */}
  <span
    className="
      pointer-events-none
      absolute
      left-[69px]
      top-1/2
      hidden
      -translate-y-1/2
      translate-x-4
      items-center
      gap-2
      whitespace-nowrap
      opacity-0
      transition-all
      duration-500
      group-hover:translate-x-0
      group-hover:opacity-100
      md:flex
    "
  >
    <span className="flex flex-col gap-0.5">
      <span
        className="
          font-body
          text-[9px]
          font-semibold
          uppercase
          tracking-[2px]
          text-[#25D366]
        "
      >
        Direct Support
      </span>

      <span
        className="
          font-heading
          text-[13px]
          font-bold
          uppercase
          tracking-[0.8px]
          text-white
        "
      >
        Chat on WhatsApp
      </span>
    </span>

    <ArrowUpRight
      size={17}
      className="text-modura-secondary"
    />
  </span>

  {/* Bottom measuring line */}
  <span
    className="
      pointer-events-none
      absolute
      bottom-0
      left-0
      h-[2px]
      w-0
      bg-[#25D366]
      transition-all
      duration-500
      group-hover:w-full
    "
  />
</a>

      {/* =========================================================
          FLOATING BUTTON
      ========================================================= */}

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open Get In Touch Form"
        className="
          fixed
          right-6
          bottom-8
          z-[999]
          group
        "
      >
        <div
          className="
            relative
            h-[64px]
            w-[64px]
            overflow-hidden
            bg-modura-primary
            shadow-xl
            transition-all
            duration-700
            group-hover:w-[210px]
            cta-blueprint
          "
        >

          <div
            className="
              absolute
              right-0
              top-0
              h-[30px]
              w-[30px]
              bg-modura-secondary
              transition-all
              duration-700
              group-hover:h-[4px]
              group-hover:w-full
            "
          />

          <div
            className="
              absolute
              inset-3
              border
              border-white/10
            "
          >
            <div
              className="
                absolute
                left-1/2
                top-0
                h-full
                border-l
                border-white/10
              "
            />
          </div>

          <div
            className="
              absolute
              left-3
              top-1/2
              flex
              h-9
              w-9
              -translate-y-1/2
              items-center
              justify-center
              border
              border-modura-secondary
              text-xl
              text-modura-secondary
              transition-all
              duration-500
              group-hover:bg-modura-secondary
              group-hover:text-white
            "
          >
            +
          </div>

          <div
            className="
              absolute
              left-16
              top-1/2
              -translate-y-1/2
              translate-x-5
              text-white
              opacity-0
              transition-all
              duration-700
              group-hover:translate-x-0
              group-hover:opacity-100
            "
          >
            <p className="whitespace-nowrap font-heading text-sm tracking-[2px]">
              GET IN TOUCH
            </p>
          </div>

        </div>
      </button>

      {/* =========================================================
          FORM
      ========================================================= */}

      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setOpen(false)}
              className="
                fixed
                inset-0
                z-[1000]
                bg-black/60
                backdrop-blur-sm
              "
            />

            {/* DRAWER */}

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                fixed
                left-0
                top-0
                z-[1001]
                h-screen
                w-full
                overflow-y-auto
                bg-modura-primary
                text-white
                shadow-2xl
                sm:w-[460px]
                lg:w-[500px]
                scrollbar-hide
                clip-form
              "
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div
                className="
                  min-h-full
                  px-7
                  py-8
                  sm:px-9
                  sm:py-10
                "
              >

                {/* TOP */}

                <div className="flex items-start justify-between gap-5">

                  <div>

                    <p
                      className="
                        font-body
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-[5px]
                        text-modura-secondary
                      "
                    >
                      START PROJECT
                    </p>

                    <h2
                      className="
                        mt-4
                        font-heading
                        text-4xl
                        font-semibold
                        leading-[0.95]
                        text-white
                        sm:text-5xl
                      "
                    >
                      Let's Create
                      <br />
                      Something
                      <br />
                      <span className="text-modura-secondary">
                        Remarkable
                      </span>
                    </h2>

                  </div>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close form"
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      border
                      border-white/20
                      text-white
                      transition-all
                      duration-300
                      hover:rotate-90
                      hover:border-modura-secondary
                      hover:bg-modura-secondary
                    "
                  >
                    <X size={19} />
                  </button>

                </div>

                {/* DESCRIPTION */}

                <p
                  className="
                    mt-6
                    max-w-[390px]
                    font-body
                    text-sm
                    leading-6
                    text-modura-gray-400
                  "
                >
                  Share your project requirements and our
                  engineering team will get back to you.
                </p>

                {/* FORM */}

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="mt-9 space-y-6"
                >

                  {/* NAME */}

                  <Input
                    icon={<User size={18} />}
                    label="NAME"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                  />

                  {/* EMAIL */}

                  <Input
                    icon={<Mail size={18} />}
                    label="EMAIL"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                  />

                  {/* PHONE */}

                  <Input
                    icon={<Phone size={18} />}
                    label="PHONE"
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                  />

                  {/* NATURE OF PROJECT */}

                  <Input
                    icon={<Layers size={18} />}
                    label="NATURE OF PROJECT"
                    name="natureOfProject"
                    placeholder="e.g. Residential Architectural Drafting"
                    value={formData.natureOfProject}
                    onChange={handleChange}
                    error={errors.natureOfProject}
                  />

                  {/* SERVICE */}

                  <div className="relative">

                    <p
                      className="
                        mb-2
                        font-body
                        text-[10px]
                        uppercase
                        tracking-[2px]
                        text-modura-gray-400
                      "
                    >
                      SERVICE
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setServiceOpen(!serviceOpen)
                      }
                      className="
                        group
                        flex
                        w-full
                        items-center
                        justify-between
                        gap-4
                        border-b
                        border-white/20
                        pb-4
                        text-left
                        font-body
                        text-sm
                        text-gray-300
                        transition-all
                        duration-300
                        hover:border-modura-secondary
                      "
                    >

                      <span className="flex items-center gap-3">

                        <Layers
                          size={18}
                          className="text-modura-secondary"
                        />

                        <span>
                          {service || "Select Service"}
                        </span>

                      </span>

                      <ChevronDown
                        size={17}
                        className={`
                          text-modura-secondary
                          transition-transform
                          duration-300
                          ${
                            serviceOpen
                              ? "rotate-180"
                              : ""
                          }
                        `}
                      />

                    </button>

                    <AnimatePresence>
                      {serviceOpen && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: -8,
                            scale: 0.98,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            y: -8,
                            scale: 0.98,
                          }}
                          className="
                            absolute
                            left-0
                            right-0
                            top-[72px]
                            z-50
                            overflow-hidden
                            border
                            border-modura-border
                            bg-white
                            shadow-2xl
                          "
                        >
                          {services.map((item) => (
                            <button
                              type="button"
                              key={item}
                              onClick={() => {
                                setService(item);
                                setServiceOpen(false);

                                setFormData((prev) => ({
                                  ...prev,
                                  natureOfProject: item,
                                }));

                                setErrors((prev) => ({
                                  ...prev,
                                  natureOfProject: "",
                                }));
                              }}
                              className="
                                group/item
                                flex
                                w-full
                                items-center
                                gap-3
                                px-5
                                py-3.5
                                text-left
                                font-body
                                text-sm
                                text-modura-primary
                                transition-all
                                duration-300
                                hover:bg-modura-secondary
                                hover:text-white
                              "
                            >
                              <span
                                className="
                                  h-1.5
                                  w-1.5
                                  bg-modura-secondary
                                  group-hover/item:bg-white
                                "
                              />

                              {item}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>

                  {/* PROJECT DETAILS */}

                  <div>

                    <p
                      className="
                        mb-2
                        font-body
                        text-[10px]
                        uppercase
                        tracking-[2px]
                        text-modura-gray-400
                      "
                    >
                      PROJECT DETAILS
                    </p>

                    <div
                      className="
                        flex
                        items-start
                        gap-3
                        border-b
                        border-white/20
                        pb-4
                        transition
                        focus-within:border-modura-secondary
                      "
                    >

                      <MessageSquare
                        size={18}
                        className="
                          mt-1
                          shrink-0
                          text-modura-secondary
                        "
                      />

                      <textarea
                        name="projectDetails"
                        value={formData.projectDetails}
                        onChange={handleChange}
                        placeholder="Tell us about your project"
                        maxLength={2000}
                        className="
                          h-24
                          w-full
                          resize-none
                          bg-transparent
                          font-body
                          text-sm
                          text-white
                          outline-none
                          placeholder:text-modura-gray-500
                        "
                      />

                    </div>

                    <div className="mt-1 flex justify-between">

                      {errors.projectDetails ? (
                        <p className="font-body text-xs text-red-400">
                          {errors.projectDetails}
                        </p>
                      ) : (
                        <span />
                      )}

                      <span className="font-body text-[9px] text-modura-gray-500">
                        {formData.projectDetails.length}/2000
                      </span>

                    </div>

                  </div>

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      group
                      relative
                      mt-2
                      flex
                      h-[48px]
                      w-[185px]
                      items-center
                      justify-center
                      gap-3
                      overflow-hidden
                      bg-modura-secondary
                      font-body
                      text-[12px]
                      font-bold
                      tracking-[2px]
                      text-white
                      transition-all
                      duration-300
                      hover:w-[200px]
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >

                    <span
                      className="
                        absolute
                        inset-0
                        translate-x-[-105%]
                        bg-modura-primary
                        transition-transform
                        duration-500
                        group-hover:translate-x-0
                      "
                    />

                    <span className="relative z-10">
                      {loading
                        ? "SENDING..."
                        : "SEND INQUIRY"}
                    </span>

                    {!loading && (
                      <span
                        className="
                          relative
                          z-10
                          flex
                          h-7
                          w-8
                          items-center
                          justify-center
                          bg-white
                          text-modura-primary
                          transition-all
                          duration-500
                          group-hover:translate-x-2
                          group-hover:bg-modura-secondary
                          group-hover:text-white
                        "
                      >
                        <ArrowRight size={15} />
                      </span>
                    )}

                  </button>

                </form>

              </div>

            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/*
|--------------------------------------------------------------------------
| INPUT COMPONENT
|--------------------------------------------------------------------------
*/

function Input({
  icon,
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
}: {
  icon: ReactNode;
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div>

      <p
        className="
          mb-2
          font-body
          text-[10px]
          uppercase
          tracking-[2px]
          text-modura-gray-400
        "
      >
        {label}
      </p>

      <div
        className={`
          group
          flex
          items-center
          gap-3
          border-b
          pb-4
          transition-all
          duration-300
          focus-within:border-modura-secondary
          ${
            error
              ? "border-red-400"
              : "border-white/20"
          }
        `}
      >

        <span
          className="
            shrink-0
            text-modura-gray-400
            transition-colors
            duration-300
            group-focus-within:text-modura-secondary
          "
        >
          {icon}
        </span>

        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="
            w-full
            bg-transparent
            font-body
            text-sm
            text-white
            outline-none
            placeholder:text-modura-gray-500
          "
        />

      </div>

      {error && (
        <p className="mt-2 font-body text-xs text-red-400">
          {error}
        </p>
      )}

    </div>
  );
}
