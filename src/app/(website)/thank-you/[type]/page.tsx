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
        flex
        min-h-[calc(100svh-110px)]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-modura-off-white
        px-4
        py-10
        sm:min-h-[calc(100svh-90px)]
        sm:px-6
        sm:py-14
        lg:px-10
      "
    >
      {/* SUBTLE BACKGROUND */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(ellipse_at_center,rgba(89,106,121,0.07)_0%,transparent_65%)]
        "
      />

      {/* CONTENT */}

      <section
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-[850px]
          flex-col
          items-center
          justify-center
          text-center
        "
      >
        {/* ANIMATED SVG */}

        <div
          className="
            w-full
            max-w-[350px]
            min-[400px]:max-w-[390px]
            sm:max-w-[560px]
            md:max-w-[650px]
            lg:max-w-[700px]
          "
        >
          <svg
            viewBox="0 0 760 350"
            preserveAspectRatio="xMidYMid meet"
            className="block h-auto w-full"
            role="img"
            aria-label={`${content.title} ${content.subtitle}`}
          >
            {/* THANK */}

            <motion.text
              x="380"
              y="140"
              textAnchor="middle"
              className="font-heading"
              style={{
                fontSize: "148px",
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
                  duration: 1.9,
                  ease: "easeInOut",
                },
              }}
            >
              {content.title}
            </motion.text>

            {/* SECOND LINE */}

            <motion.text
              x="380"
              y="270"
              textAnchor="middle"
              textLength={
                type === "apply" ? 680 : undefined
              }
              lengthAdjust="spacingAndGlyphs"
              className="font-heading"
              style={{
                fontSize: "112px",
                fontStyle: "italic",
                fontWeight: 900,
                fontFamily: "var(--font-heading)",
                letterSpacing: "-3px",
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
                  delay: 1.7,
                  duration: 0.1,
                },
                strokeDashoffset: {
                  delay: 1.7,
                  duration: 1.8,
                  ease: "easeInOut",
                },
              }}
            >
              {content.subtitle}
            </motion.text>

            {/* MAIN UNDERLINE */}

            <motion.path
              d="
                M 205 305
                C 275 320,
                  350 322,
                  425 312
                C 500 302,
                  565 300,
                  635 310
              "
              fill="none"
              stroke="var(--modura-secondary)"
              strokeWidth="2"
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
                delay: 3.4,
                duration: 0.8,
                ease: "easeInOut",
              }}
            />

            {/* SECOND UNDERLINE */}

            <motion.path
              d="
                M 305 327
                C 360 333,
                  420 333,
                  485 325
              "
              fill="none"
              stroke="var(--modura-primary)"
              strokeWidth="1"
              strokeLinecap="round"
              initial={{
                pathLength: 0,
                opacity: 0,
              }}
              animate={{
                pathLength: 1,
                opacity: 0.4,
              }}
              transition={{
                delay: 3.7,
                duration: 0.7,
                ease: "easeInOut",
              }}
            />
          </svg>
        </div>

        {/* MESSAGE */}

        <motion.p
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 4.1,
            duration: 0.6,
            ease: "easeOut",
          }}
          className="
            mt-5
            max-w-[560px]
            px-2
            font-body
            text-[13px]
            font-normal
            leading-6
            tracking-[0.01em]
            text-modura-gray-600
            sm:mt-6
            sm:text-[15px]
            sm:leading-7
            md:text-base
          "
        >
          {content.message}
        </motion.p>

        {/* BUTTON */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 4.35,
            duration: 0.6,
            ease: "easeOut",
          }}
          className="
            mt-7
            flex
            items-center
            justify-center
            sm:mt-8
          "
        >
          <AnimatedButton
            href="/"
            title="Back To Home"
          />
        </motion.div>
      </section>
    </main>
  );
}
