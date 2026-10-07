"use client";

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  X,
  User,
  Mail,
  Phone,
  Layers,
  MessageSquare,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";



export default function GetInTouch() {

  const [open, setOpen] = useState(false);

  const [serviceOpen, setServiceOpen] = useState(false);

  const [service, setService] = useState("Select Service");



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


    window.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };

  }, []);




  return (

    <>

      {/* =========================================================
          FLOATING GET IN TOUCH BUTTON
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
            bg-modura-primary
            overflow-hidden
            transition-all
            duration-700
            group-hover:w-[210px]
            shadow-xl
            cta-blueprint
          "

        >

          {/* Orange Corner */}

          <div

            className="
              absolute
              right-0
              top-0
              w-[30px]
              h-[30px]
              bg-modura-secondary
              transition-all
              duration-700
              group-hover:w-full
              group-hover:h-[4px]
            "

          />



          {/* Minimal Blueprint Line */}

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



          {/* Plus Icon */}

          <div

            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              w-9
              h-9
              border
              border-modura-secondary
              text-modura-secondary
              flex
              items-center
              justify-center
              text-xl
              font-body
              transition-all
              duration-500
              group-hover:bg-modura-secondary
              group-hover:text-white
            "

          >

            +

          </div>



          {/* Button Text */}

          <div

            className="
              absolute
              left-16
              top-1/2
              -translate-y-1/2
              text-white
              opacity-0
              translate-x-5
              transition-all
              duration-700
              group-hover:opacity-100
              group-hover:translate-x-0
            "

          >

            <p

              className="
                font-heading
                tracking-[2px]
                text-sm
                whitespace-nowrap
              "

            >

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

            {/* =====================================================
                BACKDROP
            ===================================================== */}

            <motion.div

              initial={{
                opacity: 0,
              }}

              animate={{
                opacity: 1,
              }}

              exit={{
                opacity: 0,
              }}

              transition={{
                duration: 0.35,
              }}

              onClick={() => setOpen(false)}

              className="
                fixed
                inset-0
                z-[1000]
                bg-black/60
                backdrop-blur-sm
              "

            />





            {/* =====================================================
                LEFT DRAWER
            ===================================================== */}

            <motion.aside

              initial={{
                x: "-100%",
              }}

              animate={{
                x: 0,
              }}

              exit={{
                x: "-100%",
              }}

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
                sm:w-[460px]
                lg:w-[500px]
                bg-modura-primary
                text-white
                shadow-2xl
                overflow-y-auto
                scrollbar-hide
                clip-form
              "

              onClick={(event) => {
                event.stopPropagation();
              }}

            >

              {/* =================================================
                  INNER CONTENT
              ================================================= */}

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

                <div

                  className="
                    flex
                    items-start
                    justify-between
                    gap-5
                  "

                >

                  <div>

                    <p

                      className="
                        font-body
                        text-modura-secondary
                        uppercase
                        tracking-[5px]
                        text-[11px]
                        font-semibold
                      "

                    >

                      START PROJECT

                    </p>



                    <h2

                      className="
                        mt-4
                        font-heading
                        text-4xl
                        sm:text-5xl
                        leading-[0.95]
                        font-semibold
                        text-white
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



                  {/* CLOSE */}

                  <button

                    type="button"

                    onClick={() => setOpen(false)}

                    aria-label="Close form"

                    className="
                      shrink-0
                      w-10
                      h-10
                      border
                      border-white/20
                      text-white
                      flex
                      items-center
                      justify-center
                      transition-all
                      duration-300
                      hover:bg-modura-secondary
                      hover:border-modura-secondary
                      hover:rotate-90
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





                {/* =================================================
                    FORM
                ================================================= */}

                <div

                  className="
                    mt-9
                    space-y-6
                  "

                >



                  {/* NAME */}

                  <Input

                    icon={<User size={18} />}

                    label="NAME"

                    placeholder="Your Name"

                  />



                  {/* EMAIL */}

                  <Input

                    icon={<Mail size={18} />}

                    label="EMAIL"

                    placeholder="Email Address"

                  />



                  {/* PHONE */}

                  <Input

                    icon={<Phone size={18} />}

                    label="PHONE"

                    placeholder="Phone Number"

                  />





                  {/* =================================================
                      CUSTOM SERVICE DROPDOWN
                  ================================================= */}

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
                        w-full
                        flex
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

                      <span

                        className="
                          flex
                          items-center
                          gap-3
                        "

                      >

                        <Layers

                          size={18}

                          className="
                            text-modura-secondary
                          "

                        />

                        <span>

                          {service}

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





                    {/* DROPDOWN */}

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

                          transition={{
                            duration: 0.2,
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

                          {services.map(
                            (item, index) => (

                              <button

                                type="button"

                                key={item}

                                onClick={() => {

                                  setService(item);

                                  setServiceOpen(false);

                                }}

                                className="
                                  group/item
                                  w-full
                                  flex
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
                                    transition-all
                                    group-hover/item:bg-white
                                  "

                                />

                                {item}

                              </button>

                            )
                          )}

                        </motion.div>

                      )}

                    </AnimatePresence>

                  </div>





                  {/* =================================================
                      PROJECT DETAILS
                  ================================================= */}

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

                        placeholder="Tell us about your project"

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

                  </div>





                  {/* =================================================
                      SUBMIT
                  ================================================= */}

                  <button
  type="button"
  className="
    group
    relative
    mt-2
    h-[48px]
    w-[185px]
    overflow-hidden
    bg-modura-secondary
    font-body
    text-[12px]
    font-bold
    tracking-[2px]
    text-white
    clip-submit
    transition-all
    duration-300
    hover:w-[200px]
  "
>
  {/* DARK HOVER PANEL */}
  <span
    className="
      absolute
      inset-0
      translate-x-[-105%]
      bg-modura-primary
      transition-transform
      duration-500
      ease-[cubic-bezier(.77,0,.18,1)]
      group-hover:translate-x-0
    "
  />

  {/* CONTENT */}
  <span
    className="
      relative
      z-10
      flex
      h-full
      items-center
      justify-center
      gap-3
      transition-all
      duration-500
    "
  >
    <span className="transition-all duration-500 group-hover:tracking-[3px]">
      SEND INQUIRY
    </span>

    {/* CUSTOM ARROW */}
    <span
      className="
        relative
        flex
        h-7
        w-8
        items-center
        justify-center
        bg-white
        text-modura-primary
        clip-submit-arrow
        transition-all
        duration-500
        group-hover:translate-x-2
        group-hover:bg-modura-secondary
        group-hover:text-white
      "
    >
      <ArrowRight
        size={15}
        strokeWidth={2}
        className="
          transition-transform
          duration-500
          group-hover:translate-x-1
        "
      />
    </span>
  </span>
</button>


                </div>



              </div>

            </motion.aside>

          </>

        )}

      </AnimatePresence>

    </>

  );

}






/* =============================================================
   INPUT COMPONENT
============================================================= */

function Input({

  icon,
  label,
  placeholder,

}: {

  icon: ReactNode;

  label: string;

  placeholder: string;

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

        className="
          group
          flex
          items-center
          gap-3
          border-b
          border-white/20
          pb-4
          transition-all
          duration-300
          focus-within:border-modura-secondary
        "

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

          type="text"

          placeholder={placeholder}

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

    </div>

  );

}