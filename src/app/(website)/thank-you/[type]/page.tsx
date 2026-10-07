"use client";

import AnimatedButton from "@/components/AnimatedButton";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

const thankYouContent = {
  inquiry: {
    title: "Thank",
    subtitle: "for Inquiry",
    message:
      "Thank you for your inquiry. We will get back to you shortly.",
  },

  apply: {
    title: "Thank",
    subtitle: "for Applying",
    message:
      "Thank you for applying. Our team will review your application shortly.",
  },
};

export default function ThankYouPage() {
  const params = useParams();

  const type =
    typeof params.type === "string"
      ? params.type.toLowerCase()
      : "inquiry";

  const content =
    thankYouContent[type as keyof typeof thankYouContent] ??
    thankYouContent.inquiry;

  return (
    <main
      className="
        relative
        h-[calc(100svh-80px)]
        min-h-0
        w-full
        overflow-hidden
        bg-modura-off-white
      "
    >
      {/* Background */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,rgba(89,106,121,0.05),transparent_45%)]
        "
      />

      {/* Main */}
      <section
        className="
          relative
          flex
          h-full
          w-full
          items-start
          justify-center
          overflow-hidden
        "
      >
        <div
          className="
            flex
            w-full
            max-w-[900px]
            flex-col
            items-center
            justify-start
            px-5
            text-center
            pt-0
          "
        >

          {/* =================================================
              THANK YOU ANIMATION
          ================================================= */}

          <div
            className="
              w-full
              max-w-[700px]
              shrink-0
            "
          >
            <svg
              viewBox="0 0 760 455"
              preserveAspectRatio="xMidYMid meet"
              className="
                block
                h-auto
                w-full
                overflow-visible
              "
            >

              {/* THANK */}

              <motion.text
                x="380"
                y="175"
                textAnchor="middle"
                className="font-heading italic"
                style={{
                  fontSize: "165px",
                  fontStyle: "italic",
                  fontWeight: 900,
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "-4px",
                }}
                fill="none"
                stroke="var(--modura-secondary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1800"
                initial={{
                  strokeDashoffset: 1800,
                  opacity: 0,
                }}
                animate={{
                  strokeDashoffset: 0,
                  opacity: 1,
                }}
                transition={{
                  opacity: {
                    duration: 0.1,
                  },
                  strokeDashoffset: {
                    duration: 4,
                    ease: "easeInOut",
                  },
                }}
              >
                {content.title}
              </motion.text>


              {/* FOR INQUIRY / FOR APPLYING */}

              <motion.text
                x="380"
                y="320"
                textAnchor="middle"
                className="font-heading italic"
                style={{
                  fontSize: "140px",
                  fontStyle: "italic",
                  fontWeight: 900,
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "-4px",
                }}
                fill="none"
                stroke="var(--modura-secondary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1800"
                initial={{
                  strokeDashoffset: 1800,
                  opacity: 0,
                }}
                animate={{
                  strokeDashoffset: 0,
                  opacity: 1,
                }}
                transition={{
                  opacity: {
                    delay: 3.5,
                    duration: 0.1,
                  },
                  strokeDashoffset: {
                    delay: 3.5,
                    duration: 3.5,
                    ease: "easeInOut",
                  },
                }}
              >
                {content.subtitle}
              </motion.text>


              {/* MAIN LINE */}

              <motion.path
                d="
                  M 205 355
                  C 275 371,
                    350 374,
                    425 365
                  C 500 356,
                    565 350,
                    635 362
                "
                fill="none"
                stroke="var(--modura-secondary)"
                strokeWidth="1.8"
                strokeLinecap="round"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                animate={{
                  pathLength: 1,
                  opacity: 0.9,
                }}
                transition={{
                  delay: 6.7,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              />


              {/* SECOND LINE */}

              <motion.path
                d="
                  M 305 377
                  C 360 383,
                    420 383,
                    485 376
                "
                fill="none"
                stroke="var(--modura-primary)"
                strokeWidth="0.8"
                strokeLinecap="round"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                animate={{
                  pathLength: 1,
                  opacity: 0.35,
                }}
                transition={{
                  delay: 7.1,
                  duration: 1,
                  ease: "easeInOut",
                }}
              />

            </svg>
          </div>


          {/* =================================================
              MESSAGE
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 7.8,
              duration: 0.8,
            }}
            className="
              -mt-16
              max-w-[600px]
              px-4
              font-body
              text-[11px]
              leading-5
              tracking-wide
              text-modura-gray-600
              sm:-mt-7
              sm:text-sm
            "
          >
            {content.message}
          </motion.div>


          {/* =================================================
              BUTTON
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 8.1,
              duration: 0.8,
            }}
            className="
              mt-4
              shrink-0
            "
          >
            <AnimatedButton
              href="/"
              title="Back To Home"
            />
          </motion.div>

        </div>
      </section>
    </main>
  );
}