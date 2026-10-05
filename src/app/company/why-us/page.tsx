"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  BarChart3,
  Handshake,
  Layers3,
  ShieldCheck,
  Users,
  MonitorCog,
  DraftingCompass,
} from "lucide-react";
import img1 from "../../assets/images/why-us1.png";
import img2 from "../../assets/images/why-us2.jpeg";
import img3 from "../../assets/images/why-us3.jpeg";
import img4 from "../../assets/images/why-us4.jpeg";
import img5 from "../../assets/images/why-us5.jpeg";
import img6 from "../../assets/images/why-us6.jpeg";
import Breadcrumb from "@/app/components/Breadcrumb";


gsap.registerPlugin(ScrollTrigger);

const advantages = [
  {
    title: "Technical Expertise",
    text: "Our experienced engineering team combines technical knowledge with practical project understanding to deliver accurate, dependable and project-ready solutions.",
    icon: Users,
    image: img1.src,
  },

  {
    title: "Advanced Technology",
    text: "We use modern engineering tools, digital workflows and BIM-driven processes to improve coordination, accuracy and overall project efficiency.",
    icon: MonitorCog,
    image: img2.src,
  },

  {
    title: "Integrated Approach",
    text: "Architecture, structural engineering, BIM and project management are brought together through one coordinated approach for seamless project delivery.",
    icon: Layers3,
    image: img3.src,
  },

  {
    title: "Cost Effective Solutions",
    text: "We focus on delivering high-quality engineering services with practical solutions that help clients manage project costs without compromising quality.",
    icon: BarChart3,
    image: img4.src,
  },

  {
    title: "Reliable Delivery",
    text: "A structured workflow and strong project coordination help us maintain consistency, meet deadlines and deliver dependable engineering outcomes.",
    icon: ShieldCheck,
    image: img5.src,
  },

  {
    title: "Client Focused",
    text: "We work closely with our clients to understand their requirements and develop solutions that align with their goals, timelines and project needs.",
    icon: Handshake,
    image: img6.src,
  },
];
export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement | null>(null);

 useEffect(() => {
  const ctx = gsap.context(() => {

    /* =========================================
       TOP CONTENT
    ========================================= */

    gsap.fromTo(
      ".why-top-content",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".why-top-content",
          start: "top 85%",
          once: true,
        },
      }
    );


    /* =========================================
       CARDS
    ========================================= */

    gsap.set(".why-card", {
      opacity: 0,
      y: 60,
    });


    ScrollTrigger.batch(".why-card", {
      start: "top 90%",

      once: true,

      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          overwrite: true,
        });
      },
    });


    /* =========================================
       BOTTOM
    ========================================= */

    gsap.fromTo(
      ".why-bottom",
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".why-bottom",
          start: "top 90%",
          once: true,
        },
      }
    );


    /* Refresh after images/layout are ready */

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

  }, sectionRef);


  return () => {
    ctx.revert();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };

}, []);

  return (
    <>
    <Breadcrumb title="Why Choose Us" />
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-white
        py-16
      "
    >

      {/* =====================================================
          BACKGROUND ARCHITECTURAL ELEMENTS
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          h-[620px]
          w-[42%]
          overflow-hidden
        "
      >

        {/* Building outline */}

        <div
          className="
            absolute
            right-[-80px]
            top-[-100px]
            h-[480px]
            w-[480px]
            rotate-45
            border
            border-modura-gray-200
            opacity-40
          "
        />

        <div
          className="
            absolute
            right-[40px]
            top-[80px]
            h-[280px]
            w-[280px]
            rotate-45
            border
            border-modura-secondary
            opacity-10
          "
        />

        {/* Orange geometric plane */}

        <div
          className="
            absolute
            right-[40px]
            top-0
            h-[120px]
            w-[180px]
            bg-modura-secondary
            opacity-[0.08]
            clip-why-orange
          "
        />

      </div>


      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">


        {/* =====================================================
            TOP CONTENT
        ===================================================== */}

        <div
          className="
            why-top-content
            grid
            items-end
            gap-12
            lg:grid-cols-12
          "
        >

          {/* LEFT */}

          <div className="lg:col-span-6">

            {/* Eyebrow */}

            <div
              className="
                flex
                items-center
                gap-3
                font-body
                text-[10px]
                font-bold
                uppercase
                tracking-[4px]
                text-modura-secondary
              "
            >

              <span className="h-[2px] w-10 bg-modura-secondary" />

              <span>
                Why Us
              </span>

            </div>


            {/* Heading */}

            <h2
              className="
                mt-6
                max-w-2xl
                font-heading
                text-[58px]
                font-semibold
                uppercase
                leading-[0.82]
                tracking-tight
                text-modura-primary
                sm:text-[75px]
                lg:text-[94px]
              "
            >
              Why Choose

              <br />

              <span className="text-modura-secondary">
                MVNL
              </span>

              {" "}Engineering?
            </h2>


            {/* Small statement */}

            <div className="mt-7 flex items-center gap-4">

              <span className="h-[1px] w-14 bg-modura-primary" />

              <span
                className="
                  font-body
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[3px]
                  text-modura-gray-400
                "
              >
                Built on expertise • Driven by trust
              </span>

            </div>

          </div>


          {/* RIGHT */}

          <div className="lg:col-span-6 lg:pb-1">

            <div className="max-w-xl">

              <div
                className="
                  mb-6
                  flex
                  items-center
                  gap-4
                "
              >

                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    bg-modura-primary
                    text-white
                    clip-why-icon
                  "
                >
                  <DraftingCompass
                    size={22}
                    strokeWidth={1.5}
                  />
                </div>


                <div>

                  <p
                    className="
                      font-heading
                      text-xl
                      font-semibold
                      uppercase
                      text-modura-primary
                    "
                  >
                    Our Advantage
                  </p>

                  <p
                    className="
                      font-body
                      text-[12px]
                      uppercase
                      tracking-[3px]
                      text-modura-black
                    "
                  >
                    Engineering Excellence
                  </p>

                </div>

              </div>


              <p
                className="
                  font-body
                  text-sm
                  leading-7
                  text-modura-gray-600
                  sm:text-[15px]
                "
              >
                In a market where price volatility and inflation
                threaten profit margins, MVNL Engineering stands
                as your strategic partner for success. Our dynamic
                approach, coupled with our expertise in BIM,
                structural, and civil engineering, turns your
                vision into reality. By outsourcing part of your
                work to us, you can effectively navigate these
                economic challenges, ensuring your projects excel
                while keeping costs under control.
              </p>


              {/* CTA */}

              <button
                type="button"
                className="
                  group
                  relative
                  mt-7
                  flex
                  h-12
                  items-center
                  gap-5
                  overflow-hidden
                  bg-modura-primary
                  px-6
                  font-body
                  text-xs
                  font-semibold
                  text-white
                  clip-why-button
                "
              >

                <span
                  className="
                    absolute
                    inset-0
                    origin-left
                    scale-x-0
                    bg-modura-secondary
                    transition-transform
                    duration-500
                    group-hover:scale-x-100
                  "
                />

                <span className="relative z-10">
                  Get a free consultation
                </span>

                <span
                  className="
                    relative
                    z-10
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    border
                    border-white/30
                    transition-all
                    duration-500
                    group-hover:rotate-45
                  "
                >
                  <ArrowUpRight
                    size={15}
                    className="
                      transition-transform
                      duration-500
                      group-hover:-rotate-45
                    "
                  />
                </span>

              </button>

            </div>

          </div>

        </div>


        {/* =====================================================
            ADVANTAGE CARDS
        ===================================================== */}

        <div
          className="
            why-cards-grid
            mt-16
            grid
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >

          {advantages.map((item,index) => {

            const Icon = item.icon;

            return (
              <article
                key={index}
                className="
                  why-card
                  group
                  relative
                  min-h-[300px]
                  overflow-hidden
                  border
                  border-modura-gray-200
                  bg-white
                  p-7
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                
                "
              >

                {/* =================================================
                    CARD IMAGE
                ================================================= */}

                <div
                  className="
                    absolute
                    right-0
                    top-0
                    h-[145px]
                    w-[48%]
                    overflow-hidden
                    opacity-90
                    clip-why-image
                  "
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >

                  {/* White overlay */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-white/20
                      transition-all
                      duration-500
                      group-hover:bg-modura-secondary/10
                    "
                  />

                </div>


                {/* Orange geometric image frame */}

                <div
                  className="
                    absolute
                    right-[39%]
                    top-[55px]
                    h-[90px]
                    w-[65px]
                    rotate-45
                    border
                    border-modura-secondary
                    opacity-40
                    transition-all
                    duration-500
                    group-hover:scale-110
                    group-hover:opacity-70
                  "
                />


                {/* Icon */}

                <div
                  className="
                    relative
                    z-10
                    mt-14
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    bg-modura-primary
                    text-white
                    transition-all
                    duration-500
                    group-hover:bg-modura-secondary
                    clip-why-icon
                  "
                >
                  <Icon
                    size={21}
                    strokeWidth={1.5}
                  />
                </div>


                {/* Content */}

                <div className="relative z-10 mt-7 pr-2">

                  <h3
                    className="
                      font-heading
                      text-3xl
                      font-semibold
                      uppercase
                      leading-none
                      text-modura-primary
                      transition-colors
                      duration-500
                      group-hover:text-modura-secondary
                    "
                  >
                    {item.title}
                  </h3>


                  <p
                    className="
                      mt-4
                      font-body
                      text-[13px]
                      leading-6
                      text-modura-gray-600
                    "
                  >
                    {item.text}
                  </p>

                </div>

              </article>
            );
          })}

        </div>


     

      </div>

    </section>
    </>
  );
}