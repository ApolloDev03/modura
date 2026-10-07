"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Compass } from "lucide-react";

import breadcrumbBg from "../app/(website)/assets/images/Breadcrumb.jpeg";

interface BreadcrumbProps {
  title: string;
  parent?: string;
  parentHref?: string;
}

export default function Breadcrumb({
  title,
  parent,
  parentHref = "#",
}: BreadcrumbProps) {
  return (
    <section
      className="
        relative
        min-h-[360px]
        overflow-hidden
        bg-white
      "
    >
      {/* ================================================
          BACKGROUND IMAGE
      ================================================= */}

      <div className="absolute inset-0">

        <Image
          src={breadcrumbBg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="
            object-cover
            object-center
          "
        />

   

      </div>


  


      {/* ================================================
          MAIN CONTENT
      ================================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[360px]
          max-w-7xl
          items-center
          px-6
          py-16
          lg:px-10
        "
      >

        <div className="w-full">

          {/* Small Label */}

          <div
            className="
              flex
              items-center
              gap-4
              font-body
              text-[10px]
              font-bold
              uppercase
              tracking-[4px]
              text-modura-secondary
            "
          >

            <span
              className="
                h-[2px]
                w-14
                bg-modura-secondary
              "
            />

            <span>
              Architecture / Engineering
            </span>

          </div>


          {/* ==========================================
              TITLE
          ========================================== */}

          <h1
            className="
              mt-6
              max-w-3xl
              font-heading
              text-5xl
              font-semibold
              leading-[0.88]
              text-modura-primary
              sm:text-6xl
              lg:text-8xl
            "
          >
            {title}
          </h1>


          {/* ==========================================
              CUSTOM BREADCRUMB
          ========================================== */}

          <div
            className="
              mt-8
              flex
              flex-wrap
              items-center
            "
          >

            {/* HOME */}
<Link
  href="/"
  className="
    home-breadcrumb group
    relative
    flex
    h-11
    items-center
    overflow-hidden
    bg-modura-primary
    px-7
    font-body
    text-[11px]
    font-semibold
    uppercase
    tracking-[2px]
    text-white
    clip-breadcrumb-home
  "
>
  {/* Architectural hover frame */}

  <span
    className="
      pointer-events-none
      absolute
      inset-[4px]
      z-0
      border
      border-white/20
      opacity-0
      transition-all
      duration-500
      group-hover:inset-[7px]
      group-hover:opacity-100
    "
  />

  {/* Left orange marker */}

  <span
    className="
      absolute
      left-0
      top-0
      z-10
      h-full
      w-[3px]
      origin-bottom
      scale-y-0
      bg-modura-secondary
      transition-transform
      duration-500
      ease-out
      group-hover:scale-y-100
    "
  />

  {/* Home text */}

  <span
    className="
      relative
      z-20
      transition-all
      duration-500
      font-semibold
      text-lg
      font-heading
      group-hover:-translate-x-2
      group-hover:text-modura-secondary
    "
  >
    Home
  </span>


  {/* Small blueprint arrow */}

  <span
    className="
      relative
      z-20
      ml-3
      flex
      h-6
      w-6
      items-center
      justify-center
      border
      border-white/30
      transition-all
      duration-500
      group-hover:translate-x-2
      group-hover:border-modura-secondary
      group-hover:bg-modura-secondary
      group-hover:text-white
    "
  >
    <ChevronRight
      size={13}
      strokeWidth={1.5}
    />
  </span>


  {/* Top measuring line */}

  <span
    className="
      absolute
      right-5
      top-0
      z-20
      h-[2px]
      w-0
      bg-modura-secondary
      transition-all
      duration-500
      group-hover:w-10
    "
  />

</Link>


            {/* Arrow Block */}

            <div
              className="
                flex
                h-11
                w-10
                items-center
                justify-center
                bg-modura-secondary
                text-white
                clip-breadcrumb-arrow
              "
            >
              <ChevronRight
                size={15}
                strokeWidth={1.5}
              />
            </div>


            {/* Parent */}

            {parent && (
              <>
                <Link
                  href={parentHref}
                  className="
                    flex
                    h-11
                    items-center
                    bg-white
                    px-5
                    font-heading
                    text-lg
                    font-semibold
                    uppercase
                    tracking-[2px]
                    text-modura-gray-600
                    shadow-sm
                    transition-all
                    duration-300
                    hover:text-modura-secondary
                    clip-breadcrumb-parent
                  "
                >
                  {parent}
                </Link>

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    font-semibold
                    
                    bg-modura-gray-200
                    text-modura-secondary
                    clip-breadcrumb-arrow
                  "
                >
                  <ChevronRight
                    size={18}
                    strokeWidth={1.5}
                  />
                </div>
              </>
            )}


            {/* Current */}

            <div
              className="
                flex
                h-11
                items-center
                bg-modura-secondary
                px-6
             font-heading
                    text-lg
                font-bold
                uppercase
                tracking-[2px]
                text-white
                shadow-sm
                clip-breadcrumb-current
              "
            >
              {title}
            </div>

          </div>


          {/* ==========================================
              UNIQUE ARCHITECTURAL MARKER
          ========================================== */}

          <div
            className="
              mt-9
              flex
              items-center
              gap-3
            "
          >

            {/* Compass */}

            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                bg-modura-primary
                text-white
                clip-breadcrumb-icon
              "
            >
              <Compass
                size={15}
                strokeWidth={1.5}
              />
            </div>


            {/* Steps */}

            <div
              className="
                h-[2px]
                w-10
                bg-modura-primary/20
              "
            />

            <div
              className="
                h-[6px]
                w-5
                bg-modura-secondary
              "
            />

            <div
              className="
                h-[2px]
                w-14
                bg-modura-secondary
              "
            />

            <div
              className="
                h-[6px]
                w-3
                bg-modura-primary
              "
            />

            <span
              className="
                ml-2
                font-body
                text-[10px]
                font-semibold
                uppercase
                tracking-[3px]
                text-modura-black
              "
            >
              Built With Precision
            </span>

          </div>

        </div>


     

      </div>


    </section>
  );
}