
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [loading, setLoading] = useState(false);
const [progress, setProgress] = useState(0);

 useEffect(() => {

  const loaderShown = localStorage.getItem("mvnl-loader-shown");

  // Already shown before → don't show again
  if (loaderShown === "true") {
    setLoading(false);
    return;
  }

  // First visit
  setLoading(true);

  let value = 0;

  const timer = setInterval(() => {

    value += Math.floor(Math.random() * 4) + 2;

    if (value >= 100) {

      value = 100;

      clearInterval(timer);

      setProgress(100);

      setTimeout(() => {

        // Remember loader has been completed
        localStorage.setItem("mvnl-loader-shown", "true");

        setLoading(false);

      }, 900);

    } else {

      setProgress(value);

    }

  }, 75);

  return () => clearInterval(timer);

}, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: "-100%",
          }}
          transition={{
            duration: 1,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="
            fixed
            inset-0
            z-[99999]
            overflow-hidden
            bg-modura-primary-dark
            text-white
          "
        >
          {/* =====================================================
              AMBIENT LIGHT
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: [0.04, 0.16, 0.08],
              scale: [0.5, 1, 1.15],
            }}
            transition={{
              duration: 3,
              ease: "easeOut",
            }}
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[42%]
              h-[600px]
              w-[600px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-modura-secondary
              blur-[150px]
            "
          />

          {/* =====================================================
              TOP BRAND
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
              absolute
              left-7
              top-7
              z-50
              font-body
              text-[9px]
              uppercase
              tracking-[5px]
              text-white/40
            "
          >
            MVNL ENGINEERING
          </motion.div>

          {/* =====================================================
              TOP STATUS
          ===================================================== */}

          <div
            className="
              absolute
              right-7
              top-7
              z-50
              flex
              items-center
              gap-3
              font-body
              text-[8px]
              uppercase
              tracking-[3px]
              text-white/35
            "
          >
            <motion.span
              animate={{
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-modura-secondary
              "
            />

            PROJECT INITIALIZING
          </div>

          {/* =====================================================
              LEFT ARCHITECTURAL MEASURE
          ===================================================== */}

          <div
            className="
              absolute
              left-8
              top-1/2
              z-20
              hidden
              -translate-y-1/2
              lg:block
            "
          >
            <div
              className="
                flex
                h-[170px]
                items-center
                gap-3
              "
            >
              <div
                className="
                  h-full
                  w-px
                  bg-white/10
                "
              />

              <div
                className="
                  flex
                  h-full
                  flex-col
                  justify-between
                  font-body
                  text-[7px]
                  tracking-[2px]
                  text-white/25
                "
              >
                <span>300</span>
                <span>200</span>
                <span>100</span>
                <span>000</span>
              </div>
            </div>

            <p
              className="
                mt-4
                writing-mode
                font-body
                text-[7px]
                uppercase
                tracking-[3px]
                text-modura-secondary/60
              "
            >
              Elevation
            </p>
          </div>

          {/* =====================================================
              RIGHT ARCHITECTURAL MEASURE
          ===================================================== */}

          <div
            className="
              absolute
              right-8
              top-1/2
              z-20
              hidden
              -translate-y-1/2
              lg:block
            "
          >
            <div
              className="
                flex
                h-[170px]
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-full
                  flex-col
                  justify-between
                  text-right
                  font-body
                  text-[7px]
                  tracking-[2px]
                  text-white/25
                "
              >
                <span>A-01</span>
                <span>A-02</span>
                <span>A-03</span>
                <span>A-04</span>
              </div>

              <div
                className="
                  h-full
                  w-px
                  bg-white/10
                "
              />
            </div>
          </div>

          {/* =====================================================
              CITY
          ===================================================== */}

          <div
            className="
              absolute
              bottom-[120px]
              left-1/2
              flex
              h-[410px]
              w-[900px]
              max-w-[92vw]
              -translate-x-1/2
              items-end
              justify-center
              gap-[3px]
            "
          >
            <LoaderBuilding
              width="70px"
              height="125px"
              delay={0.1}
              windows={6}
            />

            <LoaderBuilding
              width="90px"
              height="180px"
              delay={0.25}
              windows={10}
            />

            <LoaderBuilding
              width="105px"
              height="245px"
              delay={0.4}
              windows={14}
            />

            <LoaderBuilding
              width="125px"
              height="315px"
              delay={0.55}
              windows={18}
              main
            />

            <LoaderBuilding
              width="110px"
              height="260px"
              delay={0.7}
              windows={15}
            />

            <LoaderBuilding
              width="92px"
              height="195px"
              delay={0.85}
              windows={10}
            />

            <LoaderBuilding
              width="72px"
              height="135px"
              delay={1}
              windows={6}
            />
          </div>

          {/* =====================================================
              GROUND
          ===================================================== */}

          <motion.div
            initial={{
              scaleX: 0,
            }}
            animate={{
              scaleX: 1,
            }}
            transition={{
              delay: 0.3,
              duration: 1.3,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="
              absolute
              bottom-[119px]
              left-1/2
              h-[2px]
              w-[900px]
              max-w-[92vw]
              -translate-x-1/2
              origin-center
              bg-modura-secondary
            "
          />

          {/* =====================================================
              CENTER MVNL BRAND
          ===================================================== */}

          <div
            className="
              absolute
              left-1/2
              top-[38%]
              z-40
              -translate-x-1/2
              -translate-y-1/2
              text-center
            "
          >
            {/* Architectural symbol */}

            <motion.div
              initial={{
                opacity: 0,
                scaleY: 0,
              }}
              animate={{
                opacity: 1,
                scaleY: 1,
              }}
              transition={{
                delay: 1.25,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                mx-auto
                mb-3
                h-[58px]
                w-[125px]
              "
            >
              {/* Building blocks */}

              <div
                className="
                  absolute
                  bottom-0
                  left-[40px]
                  h-[55px]
                  w-[42px]
                  bg-gradient-to-t
                  from-modura-secondary-dark
                  via-modura-secondary
                  to-modura-secondary-light
                "
              />

              <div
                className="
                  absolute
                  bottom-0
                  left-[57px]
                  h-[58px]
                  w-[22px]
                  bg-modura-secondary-light
                "
              />

              <div
                className="
                  absolute
                  bottom-0
                  right-[17px]
                  h-[40px]
                  w-[28px]
                  bg-gradient-to-t
                  from-modura-secondary-dark
                  to-modura-secondary
                "
              />

              <div
                className="
                  absolute
                  bottom-0
                  left-[15px]
                  h-[27px]
                  w-[25px]
                  bg-modura-secondary-dark
                "
              />

              {/* Vertical architectural strips */}

              {[0, 1, 2, 3].map((item) => (
                <motion.span
                  key={item}
                  initial={{
                    height: 0,
                  }}
                  animate={{
                    height: 43 - item * 4,
                  }}
                  transition={{
                    delay: 1.45 + item * 0.08,
                    duration: 0.35,
                  }}
                  className="
                    absolute
                    bottom-0
                    w-[3px]
                    bg-[#ffd166]
                  "
                  style={{
                    left: `${44 + item * 8}px`,
                  }}
                />
              ))}

              {/* Building cut */}

              <div
                className="
                  absolute
                  bottom-0
                  left-[70px]
                  h-[32px]
                  w-[9px]
                  bg-modura-primary-dark
                "
              />
            </motion.div>

            {/* MVNL */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                letterSpacing: "0.35em",
              }}
              animate={{
                opacity: 1,
                y: 0,
                letterSpacing: "-0.045em",
              }}
              transition={{
                delay: 1.75,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                font-body
                text-[54px]
                font-black
                leading-none
                text-white
                sm:text-[68px]
              "
            >
              MVNL
            </motion.div>

            {/* ENGINEERING */}

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 2.05,
                duration: 0.7,
              }}
              className="
                mt-1
                flex
                items-center
                justify-center
                gap-3
              "
            >
              <span
                className="
                  h-[2px]
                  w-6
                  bg-modura-secondary
                "
              />

              <span
                className="
                  font-body
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.55em]
                  text-white/90
                "
              >
                ENGINEERING
              </span>

              <span
                className="
                  h-[2px]
                  w-6
                  bg-modura-secondary
                "
              />
            </motion.div>

            {/* Tagline */}

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 2.3,
              }}
              className="
                mt-4
                font-body
                text-[7px]
                uppercase
                tracking-[4px]
                text-white/35
              "
            >
              PLAN • DESIGN • ENGINEER • BUILD
            </motion.p>
          </div>

          {/* =====================================================
              CRANE LEFT
          ===================================================== */}

          <LoaderCrane
            left="6%"
            right="auto"
            delay={1}
            reverse={false}
          />

          {/* =====================================================
              CRANE RIGHT
          ===================================================== */}

          <LoaderCrane
            left="auto"
            right="6%"
            delay={1.3}
            reverse
          />

          {/* =====================================================
              ORANGE SCAN
          ===================================================== */}

          <motion.div
            animate={{
              y: ["-10vh", "110vh"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              pointer-events-none
              absolute
              left-0
              right-0
              top-0
              z-[60]
              h-px
              bg-gradient-to-r
              from-transparent
              via-modura-secondary
              to-transparent
              opacity-70
            "
          />

     
        </motion.div>
      )}
    </AnimatePresence>
  );
}


/* =============================================================
   BUILDING
============================================================= */

function LoaderBuilding({
  width,
  height,
  delay,
  windows,
  main = false,
}: {
  width: string;
  height: string;
  delay: number;
  windows: number;
  main?: boolean;
}) {
  const columns = main ? 3 : 2;
  const rows = Math.ceil(windows / columns);

  return (
    <motion.div
      initial={{
        height: 0,
        opacity: 0,
      }}
      animate={{
        height,
        opacity: 1,
      }}
      transition={{
        delay,
        duration: 1.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        width,
      }}
      className="
        relative
        shrink-0
        overflow-hidden
        border-x
        border-t
        border-white/10
        bg-[#101010]
      "
    >
      {/* Top beam */}

      <motion.div
        initial={{
          scaleX: 0,
        }}
        animate={{
          scaleX: 1,
        }}
        transition={{
          delay: delay + 0.75,
          duration: 0.5,
        }}
        className="
          absolute
          left-0
          right-0
          top-0
          h-[2px]
          origin-left
          bg-modura-secondary
        "
      />

      {/* Structural beams */}

      <div
        className="
          absolute
          bottom-0
          left-1/2
          top-0
          w-px
          bg-white/[0.05]
        "
      />

      {main && (
        <>
          <div
            className="
              absolute
              bottom-0
              left-[28%]
              top-0
              w-px
              bg-white/[0.06]
            "
          />

          <div
            className="
              absolute
              bottom-0
              right-[28%]
              top-0
              w-px
              bg-white/[0.06]
            "
          />
        </>
      )}

      {/* Windows */}

      <div
        className="
          absolute
          inset-x-3
          bottom-4
          top-6
          grid
          gap-2
        "
        style={{
          gridTemplateColumns: `repeat(${columns},1fr)`,
          gridTemplateRows: `repeat(${rows},1fr)`,
        }}
      >
        {Array.from({
          length: windows,
        }).map((_, index) => (
          <motion.span
            key={index}
            initial={{
              opacity: 0,
              scale: 0.4,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay:
                delay +
                0.75 +
                index * 0.05,
              duration: 0.22,
            }}
            className="
              border
              border-modura-secondary/20
              bg-modura-secondary/[0.08]
            "
          />
        ))}
      </div>

      {/* Main building glow */}

      {main && (
        <motion.div
          animate={{
            opacity: [0.05, 0.18, 0.05],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="
            absolute
            inset-0
            bg-modura-secondary/[0.08]
          "
        />
      )}
    </motion.div>
  );
}


/* =============================================================
   CRANE
============================================================= */

function LoaderCrane({
  left,
  right,
  delay,
  reverse,
}: {
  left: string;
  right: string;
  delay: number;
  reverse: boolean;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay,
        duration: 0.8,
      }}
      style={{
        left,
        right,
      }}
      className="
        absolute
        bottom-[210px]
        z-30
        hidden
        h-[220px]
        w-[150px]
        lg:block
      "
    >
      {/* Mast */}

      <div
        className={`
          absolute
          bottom-0
          h-full
          w-[2px]
          bg-modura-secondary/70
          ${reverse ? "right-5" : "left-5"}
        `}
      />

      {/* Boom */}

      <div
        className={`
          absolute
          top-0
          h-[2px]
          w-[145px]
          bg-modura-secondary
          ${reverse ? "right-5" : "left-5"}
        `}
      />

      {/* Diagonal */}

      <div
        className={`
          absolute
          top-0
          h-[205px]
          w-px
          origin-top
          rotate-[32deg]
          bg-modura-secondary/35
          ${reverse ? "right-5" : "left-5"}
        `}
      />

      {/* Hook */}

      <motion.div
        animate={{
          x: reverse
            ? [0, -45, 0]
            : [0, 45, 0],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-0
          h-[95px]
          w-px
          bg-white/20
        "
      >
        <div
          className="
            absolute
            bottom-0
            -left-3
            h-5
            w-7
            border
            border-modura-secondary
            bg-modura-secondary/10
          "
        />
      </motion.div>
    </motion.div>
  );
}