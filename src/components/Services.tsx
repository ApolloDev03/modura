"use client";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import AnimatedButton from "./AnimatedButton";
import { DraftingCompass } from "lucide-react";

const services = [
  {
    title: "Architecture Design",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
  },
  {
    title: "BIM Solutions",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
  },
  {
    title: "Structural Engineering",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
  },
  {
    title: "Project Management",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
  },
  {
    title: "Steel Detailing",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&q=80",
  },
  {
    title: "Shop Drawing",
    image:
      "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=1200&q=80",
  },
];

export default function Services() {
  return (
    <section
      className="
        overflow-hidden
        bg-modura-off-white
        py-16
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-6
          lg:px-10
        "
      >
        {/* Heading */}

        <div
          className="
            mb-12
            flex
            items-end
            justify-between
            gap-5
          "
        >
          <div>
            <div
              className="
                flex
                items-center
                gap-3
                font-body
                text-xs
                font-semibold
                uppercase
                tracking-[5px]
                text-modura-secondary
              "
            >
              <DraftingCompass
                size={20}
                strokeWidth={1.5}
                className="text-modura-secondary"
              />

              <span>Our Expertise</span>
            </div>

            <h2
              className="
                mt-4
                font-heading
                text-5xl
                font-semibold
                text-modura-primary
                lg:text-6xl
              "
            >
              <span>Our</span>

              <span
                className="
                  ml-2
                  text-modura-secondary
                "
              >
                Services
              </span>
            </h2>
          </div>

          {/* Button */}

          <div className="hero-button w-fit">
            <AnimatedButton
              href="/services"
              title="View All Services"
            />
          </div>
        </div>

        {/* Slider */}

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          speed={900}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {services.map((item, index) => (
            <SwiperSlide key={index}>

              {/* SERVICE LINK */}

              <Link
                href="/services"
                className="
                  block
                  cursor-pointer
                  no-underline
                "
              >
                <div
                  className="
                    service-card
                    group
                    relative
                    h-[360px]
                    overflow-hidden
                    transition-all
                    duration-700
                    hover:-translate-y-3
                  "
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="
                      object-cover
                      transition-transform
                      duration-[1200ms]
                      ease-out
                      group-hover:scale-110
                    "
                  />

                  {/* Overlay */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-modura-primary/90
                      via-modura-primary/20
                      to-transparent
                      transition
                      duration-700
                      group-hover:from-modura-primary
                    "
                  />

                  {/* Title */}

                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      p-7
                      transition-all
                      duration-700
                      group-hover:-translate-y-2
                    "
                  >
                    <h3
                      className="
                        font-heading
                        text-2xl
                        text-white
                      "
                    >
                      {item.title}
                    </h3>

                    <div
                      className="
                        mt-3
                        h-[2px]
                        w-10
                        bg-modura-secondary
                        transition-all
                        duration-500
                        group-hover:w-20
                      "
                    />
                  </div>
                </div>
              </Link>

            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}