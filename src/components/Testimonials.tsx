"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import { DraftingCompass } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  clientName: string;
  designation: string;
  company: string;
  rating: number;
  testimonial: string;
  photo: string;
  videoUrl: string | null;
  status: boolean;
  photoUrl: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({
  testimonials,
}: TestimonialsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-content",
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".testimonial-slider",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        overflow-hidden
        bg-white
        py-12
        sm:py-16
        lg:py-20
      "
    >
      <div
        className="
            mx-auto
    grid
    w-full
    max-w-full
    grid-cols-1
    items-center
    gap-10
    px-4
    md:px-6
    lg:grid-cols-2
    lg:gap-12
    lg:px-10
    xl:gap-16
    2xl:px-16
        "
      >
        {/* =========================================
            LEFT CONTENT
        ========================================= */}

        <div className="testimonial-content min-w-0">
          {/* LABEL */}

          <div
            className="
              flex
              items-center
              gap-2.5
              font-body
              text-[10px]
              font-bold
              uppercase
              tracking-[2px]
              text-modura-secondary
              sm:gap-3
              sm:text-xs
              sm:tracking-[4px]
              lg:tracking-[5px]
            "
          >
            <DraftingCompass
              size={20}
              strokeWidth={1.5}
              className="shrink-0 text-modura-secondary"
            />

            <span>Testimonials</span>
          </div>

          {/* HEADING */}

          <h2
            className="
              mt-4
              max-w-xl
              break-words
              font-heading
              text-[36px]
              font-semibold
              leading-[1.05]
              text-modura-primary
              min-[400px]:text-[42px]
              sm:text-5xl
              lg:text-[52px]
              xl:text-6xl
            "
          >
            Trusted By

            <span className="ml-2 text-modura-secondary">
              Industry Leaders
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mt-5
              max-w-md
              font-body
              text-sm
              leading-7
              text-modura-gray-600
              sm:mt-6
              sm:text-base
              sm:leading-8
            "
          >
            Our commitment to precision,
            innovation and quality has helped
            us build long-term partnerships
            worldwide.
          </p>
        </div>

        {/* =========================================
            RIGHT TESTIMONIAL SLIDER
        ========================================= */}

        <div className="testimonial-slider w-full min-w-0">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            spaceBetween={16}
            loop={testimonials.length > 1}
            watchOverflow
            observer
            observeParents
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={900}
            className="w-full"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id} className="!h-auto">
                <div
                  className="
                    testimonial-card
                    relative
                    flex
                    h-full
                    min-h-[280px]
                    min-w-0
                    flex-col
                    overflow-hidden
                    border
                    border-modura-gray-200
                    bg-modura-off-white
                    p-5
                    pb-0
                    sm:min-h-[310px]
                    sm:p-7
                    sm:pb-0
                    lg:p-8
                    lg:pb-0
                    xl:p-10
                    xl:pb-0
                  "
                >
                  {/* QUOTE */}

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      right-4
                      top-2
                      font-heading
                      text-6xl
                      leading-none
                      text-modura-secondary/20
                      sm:right-7
                      sm:top-4
                      sm:text-8xl
                    "
                  >
                    &ldquo;
                  </div>

                  {/* TESTIMONIAL TEXT */}

                  <p
                    className="
                      relative
                      z-10
                      whitespace-normal
                      break-words
                      font-body
                      text-sm
                      leading-7
                      text-modura-gray-600
                      sm:text-base
                      sm:leading-8
                      xl:text-lg
                    "
                  >
                    {item.testimonial}
                  </p>

                  {/* CLIENT DETAILS */}

                  <div
                    className="
                      relative
                      z-10
                      mt-7
                      flex
                      min-w-0
                      items-center
                      gap-3
                      sm:mt-8
                      sm:gap-5
                    "
                  >
                    {/* CLIENT PHOTO */}

                    <div
                      className="
                        relative
                        h-12
                        w-12
                        shrink-0
                        overflow-hidden
                        rounded-full
                        border-2
                        border-modura-secondary
                        sm:h-16
                        sm:w-16
                      "
                    >
                      {item.photoUrl || item.photo ? (
                        <Image
                          src={item.photoUrl || item.photo}
                          alt={item.clientName}
                          fill
                          unoptimized
                          sizes="64px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-modura-primary font-heading text-xl font-semibold text-white">
                          {item.clientName?.charAt(0)?.toUpperCase() || "M"}
                        </div>
                      )}
                    </div>

                    {/* NAME AND DESIGNATION */}

                    <div className="min-w-0 flex-1">
                      <h4
                        className="
                          break-words
                          font-heading
                          text-lg
                          font-semibold
                          leading-tight
                          text-modura-primary
                          sm:text-xl
                          xl:text-2xl
                        "
                      >
                        {item.clientName}
                      </h4>

                      <p
                        className="
                          mt-1
                          break-words
                          font-body
                          text-[10px]
                          uppercase
                          leading-5
                          tracking-[1px]
                          text-modura-secondary
                          sm:text-xs
                          sm:tracking-[2px]
                        "
                      >
                        {item.designation}
                      </p>
                    </div>
                  </div>

                  {/* COMPANY BADGE */}

                  <div className="mt-auto flex justify-end pt-6">
                    {item.company && (
                      <div
                        className="
                          max-w-full
                          break-words
                          bg-modura-primary
                          px-4
                          py-3
                          text-right
                          font-body
                          text-[10px]
                          uppercase
                          leading-5
                          tracking-[1px]
                          text-white
                          sm:px-6
                          sm:text-xs
                          sm:tracking-[2px]
                        "
                      >
                        {item.company}
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
