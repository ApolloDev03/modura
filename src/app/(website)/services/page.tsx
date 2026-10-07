"use client";

import {ArrowRight, DraftingCompass } from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import service_img from "../assets/images/why-us2.jpeg"
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import blog1 from "../assets/images/blog1.jpeg";
import blog2 from "../assets/images/blog2.jpeg";
import blog3 from "../assets/images/blog3.jpeg";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";


gsap.registerPlugin(ScrollTrigger);



const blogs = [

   {
      date: {
         day: "24",
         month: "JUN",
         year: "2026"
      },
      title: "How BIM Is Transforming Modern Construction",
      desc: "Discover how BIM technology improves coordination, accuracy and project delivery across complex construction projects.",
      image: blog1.src
   },


   {
      date: {
         day: "18",
         month: "MAY",
         year: "2026"
      },
      title: "Future Trends In Project Management",
      desc: "Exploring innovative approaches and digital tools that are shaping the future of engineering industry.",
      image: blog2.src
   },


   {
      date: {
         day: "12",
         month: "APR",
         year: "2026"
      },
      title: "Sustainable Engineering For Future Infrastructure",
      desc: "Learn how sustainable design and engineering solutions are building greener infrastructure.",
      image: blog3.src
   }

];




const service = {
  title: "Architecture Design",

  shortDescription:
    "Thoughtful architectural design solutions that balance functionality, aesthetics, technical requirements and long-term project performance.",

  image: service_img.src,

  content: `
    <p>
      Our architectural design approach combines
      <strong>creative thinking with practical planning</strong>
      to develop spaces that are functional, efficient and visually refined.
      Every project is carefully studied to understand its requirements,
      site conditions and overall objectives before moving into detailed
      design development.
    </p>

    <h2>Designing Spaces With Purpose</h2>

    <p>
      We believe successful architecture is not only about appearance.
      It is about creating spaces that respond to the people who use them,
      the environment in which they exist and the technical requirements
      that make them achievable.
    </p>


    <h3>From Concept to Detailed Design</h3>

    <p>
      From initial concepts and planning through detailed architectural
      documentation, our team focuses on creating coordinated solutions
      that can be effectively developed and executed. Design decisions
      are considered with attention to usability, spatial relationships,
      materials, constructability and project requirements.
    </p>

    <p>
      Depending on the scope of the project, architectural documentation
      can support different stages of development and coordination.
      Our focus remains on producing information that is clear, practical
      and aligned with the overall design intent.
    </p>

    <h3>What We Focus On</h3>

    <ul>
      <li>Functional and efficient space planning</li>
      <li>Clear architectural design development</li>
      <li>Detailed project documentation</li>
      <li>Coordination with project requirements</li>
      <li>Practical and constructible design solutions</li>
      <li>Consistent architectural design intent</li>
    </ul>

    <h2>Clear Documentation & Coordination</h2>

    <p>
      We also emphasize clear documentation and coordination throughout
      the design process. This helps maintain consistency between
      architectural intent and the technical requirements of the project
      while supporting smoother communication between consultants,
      contractors and stakeholders.
    </p>

    <p>
      The objective is to create a design process where every stage is
      understandable, coordinated and ready to move forward with greater
      confidence.
    </p>

    <div class="content-quote">
      <span>DESIGN PRINCIPLE</span>

      <p>
        Good architecture brings together
        <strong>function, form and technical clarity</strong>
        without compromising the practical needs of the project.
      </p>
    </div>

    <h3>Built Around Your Project Requirements</h3>

    <p>
      Every project has its own priorities, constraints and objectives.
      Our approach therefore remains flexible while maintaining a strong
      focus on design clarity, documentation quality and coordination.
      This allows the architectural solution to develop naturally around
      the requirements of each project.
    </p>

    <p>
      By combining design thinking with technical understanding, we aim
      to create architectural information that supports both the creative
      vision and the practical execution of the project.
    </p>
  `,

  faqs: [
    {
      question: "What does your architectural design service include?",
      answer:
        "Our architectural design service can cover concept development, space planning, design development, architectural drawings and detailed documentation based on the requirements of the project.",
    },
    {
      question: "Can you work with existing project drawings?",
      answer:
        "Yes. Existing drawings, layouts and project documentation can be reviewed and developed further according to the scope and requirements of the project.",
    },
    {
      question: "Do you provide detailed architectural documentation?",
      answer:
        "Yes. Documentation can be prepared according to project requirements, including relevant plans, elevations, sections and architectural details.",
    },
    {
      question: "How is the design process started?",
      answer:
        "The process generally begins by understanding the project scope, available information, design requirements and expected deliverables before developing the appropriate design direction.",
    },
    {
      question:
        "Can architectural work be coordinated with other disciplines?",
      answer:
        "Yes. Architectural information can be coordinated with structural, MEP and other project requirements to help maintain consistency across the overall documentation.",
    },
  ],
};

export default function ServiceDetailPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);



   useLayoutEffect(() => {


      const ctx = gsap.context(() => {


         gsap.from(".blog-card",
            {
               opacity: 0,
               y: 70,
               duration: 1,
               ease: "power3.out",
               stagger: 0.2,

               scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 75%",
                  once: true
               }

            });


      }, sectionRef);



      return () => ctx.revert();



   }, []);

  return (
    <main className="min-h-screen bg-modura-off-white">
        <Breadcrumb title="Service" />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="bg-white">

        <div
          className="
            mx-auto
            max-w-[1440px]
            px-5
            pb-14
            pt-8
            sm:px-8
            sm:pb-20
            sm:pt-12
            lg:px-12
            lg:pb-24
            lg:pt-16
          "
        >

        

          {/* TITLE */}

          <div
            className="
              grid
              gap-10
              lg:grid-cols-[0.85fr_1.15fr]
              lg:items-end
              lg:gap-16
            "
          >

            <div>

              <div className="flex items-center gap-3">

                <span
                  className="
                    h-[2px]
                    w-10
                    bg-modura-secondary
                  "
                />

                <span
                  className="
                    font-body
                    text-[13px]
                    font-bold
                    uppercase
                    tracking-[0.3em]
                    text-modura-secondary
                  "
                >
                  Service
                </span>

              </div>

              <h1
                className="
                  mt-6
                  font-heading
                  text-[52px]
                  font-bold
                  leading-[0.84]
                  tracking-[-0.055em]
                  text-modura-primary
                  sm:text-[76px]
                  lg:text-[100px]
                "
              >
                Architecture
                <span className="block text-modura-secondary">
                  Design
                </span>
              </h1>

            </div>


            <p
              className="
                max-w-[580px]
                font-body
                text-base
                leading-8
                text-modura-gray-600
                lg:pb-2
                lg:text-lg
              "
            >
              {service.shortDescription}
            </p>

          </div>


          {/* IMAGE */}

          <div
            className="
              relative
              mt-12
              aspect-[16/7]
              overflow-hidden
              bg-modura-light
              sm:mt-16
            "
          >

            <Image
              src={service.image}
              alt={service.title}
              fill
              priority
              sizes="100vw"
              className="
                object-cover
                transition-transform
                duration-[1400ms]
                hover:scale-[1.025]
              "
            />

            <div
              className="
                absolute
                bottom-0
                left-0
                h-1
                w-36
                bg-modura-secondary
              "
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          FULL WIDTH CONTENT
      ===================================================== */}

      <section className="bg-modura-off-white">

        <div
          className="
            mx-auto
            max-w-[1280px]
            px-5
            py-16
            sm:px-8
            sm:py-16
            lg:px-10
          "
        >

          {/* CONTENT INTRO */}

          <div
            className="
              mb-14
              grid
              gap-8
              border-b
              border-modura-gray-300
              pb-10
              lg:grid-cols-[1fr_0.65fr]
              lg:items-end
            "
          >

            <div>

              <span
                className="
                  font-body
                  text-[13px]
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-modura-secondary
                "
              >
                Service Overview
              </span>

              <h2
                className="
                  mt-5
                  max-w-[800px]
                  font-heading
                  text-4xl
                  font-bold
                  leading-[0.95]
                  tracking-[-0.04em]
                  text-modura-primary
                  sm:text-5xl
                "
              >
                Thoughtful design.
                <span className="text-modura-secondary">
                  {" "}Practical execution.
                </span>
              </h2>

            </div>

            <p
              className="
                max-w-[400px]
                font-body
                text-sm
                leading-7
                text-modura-gray-500
              "
            >
              A complete approach to architectural
              planning, documentation and project
              coordination.
            </p>

          </div>


          {/* RICH CONTENT */}

          <article
            className="service-content"
            dangerouslySetInnerHTML={{
              __html: service.content,
            }}
          />

        </div>

      </section>


      {/* =====================================================
          FAQ
      ===================================================== */}


<section className="bg-modura-off-white">

  <div
    className="
      mx-auto
      max-w-5xl
            px-5
      sm:px-8
      lg:px-10
    "
  >

    {/* ================================================
        HEADER
    ================================================= */}

    <div
      className="
        mb-10
        flex
        flex-col
        gap-5
        md:flex-row
        md:items-end
        md:justify-center
      "
    >

      <div>

       <div className="flex items-center justify-center gap-3">

  <span
    className="
      flex
      h-6
      w-6
      shrink-0
      items-center
      justify-center
      text-modura-secondary
    "
  >
    <DraftingCompass
      size={19}
      strokeWidth={1.5}
    />
  </span>

  <span
    className="
      font-body
      text-[12px]
      font-bold
      uppercase
      tracking-[0.3em]
      text-modura-secondary
    "
  >
    FAQ
  </span>

</div>

        <h2
          className="
            mt-5
            font-heading
            text-4xl
            font-bold
            leading-[0.92]
            tracking-[-0.045em]
            text-modura-primary
            sm:text-5xl
            lg:text-6xl
          "
        >
          Questions
          <span className="text-modura-secondary">
            {" "}explained.
          </span>
        </h2>

      </div>


    

    </div>


    {/* ================================================
        FAQ LIST
    ================================================= */}

    <div
      className="
        overflow-hidden
        border-t
        border-modura-primary
        bg-white
      "
    >

      {service.faqs.map((faq, index) => {

        const active = activeFaq === index;

        return (
          <div
            key={faq.question}
            className={`
              relative
              border-b
              border-modura-gray-200
              transition-all
              duration-500
              ${
                active
                  ? "bg-modura-light"
                  : "bg-white"
              }
            `}
          >

            {/* ACTIVE SIDE ACCENT */}

            <span
              className={`
                absolute
                left-0
                top-0
                h-full
                bg-modura-secondary
                transition-all
                duration-500
                ${
                  active
                    ? "w-[3px]"
                    : "w-0"
                }
              `}
            />


            {/* QUESTION */}

            <button
              type="button"
              onClick={() =>
                setActiveFaq(
                  active ? null : index
                )
              }
              className="
                group
                flex
                min-h-[72px]
                w-full
                items-center
                gap-5
                px-5
                py-4
                text-left
                sm:min-h-[78px]
                sm:px-8
              "
            >

              {/* CUSTOM MARKER */}

              <span
                className={`
                  relative
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  border
                  transition-all
                  duration-500
                  ${
                    active
                      ? "rotate-45 border-modura-secondary bg-modura-secondary"
                      : "border-modura-gray-300 bg-white group-hover:border-modura-secondary"
                  }
                `}
              >

                <span
                  className={`
                    absolute
                    h-px
                    w-3
                    ${
                      active
                        ? "bg-white"
                        : "bg-modura-primary"
                    }
                  `}
                />

                <span
                  className={`
                    absolute
                    h-3
                    w-px
                    transition-transform
                    duration-300
                    ${
                      active
                        ? "scale-y-0 bg-white"
                        : "bg-modura-primary"
                    }
                  `}
                />

              </span>


              {/* QUESTION TEXT */}

              <span
                className={`
                  flex-1
                  font-heading
                  text-[15px]
                  font-semibold
                  leading-6
                  transition-all
                  duration-300
                  sm:text-[17px]
                  ${
                    active
                      ? "translate-x-1 text-modura-primary"
                      : "text-modura-gray-700 group-hover:translate-x-1 group-hover:text-modura-primary"
                  }
                `}
              >
                {faq.question}
              </span>


              {/* SMALL LABEL */}

              <span
                className={`
                  hidden
                  font-body
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  transition-colors
                  duration-300
                  sm:block
                  ${
                    active
                      ? "text-modura-secondary"
                      : "text-modura-gray-300"
                  }
                `}
              >
                {active
                  ? "Opened"
                  : "View"}
              </span>

            </button>


            {/* ========================================
                ANSWER
            ======================================== */}

            <div
              className={`
                grid
                transition-all
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                ${
                  active
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }
              `}
            >

              <div className="overflow-hidden">

                <div
                  className="
                    flex
                    gap-5
                    px-5
                    pb-6
                    pl-[60px]
                    sm:px-8
                    sm:pb-7
                    sm:pl-[76px]
                  "
                >

                  {/* ANSWER LABEL */}

                  <div
                    className="
                      hidden
                      w-[55px]
                      shrink-0
                      pt-1
                      sm:block
                    "
                  >

                    <span
                      className="
                        font-body
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-modura-secondary
                      "
                    >
                      Answer
                    </span>

                  </div>


                  {/* ANSWER TEXT */}

                  <div
                    className="
                      max-w-[760px]
                      border-l
                      border-modura-secondary
                      pl-5
                    "
                  >

                    <p
                      className="
                        font-body
                        text-[13px]
                        leading-6
                        text-modura-gray-600
                        sm:text-sm
                        sm:leading-7
                      "
                    >
                      {faq.answer}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>
        );
      })}

    </div>


  </div>

</section>
   <section

         ref={sectionRef}

         className="
relative
overflow-hidden
bg-modura-off-white
py-16
"

      >


         <div

            className="
relative
z-10
max-w-7xl
mx-auto
px-6
"

         >




            {/* HEADER */}

            <div
               className="
text-center
mb-14
"

            >


               <div className="
flex
items-center
gap-3
font-body
justify-center
font-bold
text-xs
uppercase
tracking-[5px]
text-modura-secondary
">


                  <DraftingCompass
                     size={20}
                     strokeWidth={1.5}
                     className="
text-modura-secondary
"
                  />


                  <span>
                     OUR BLOG
                  </span>


               </div>



               <h2
                  className="
mt-4
font-heading
text-5xl
lg:text-6xl
font-semibold
text-modura-primary
"
               >

                  Engineering
                  <span
                     className="
text-modura-secondary ml-2
"
                  >
                     Insights
                  </span>


               </h2>



            </div>



            {/* BLOG GRID */}


            <div

               className="
grid
md:grid-cols-2
lg:grid-cols-3
gap-8
"

            >




               {
                  blogs.map((blog, index) => (



                     <motion.article


                        key={index}


                        whileHover={{
                           y: -12
                        }}


                        transition={{
                           duration: .35
                        }}



                        className="
blog-card
bg-white
shadow-xl
overflow-hidden
blog-card-shape
h-[500px]
"

                     >





                        {/* IMAGE */}

                        <Link
                           href="blogDetail">

                           <div

                              className="
relative
h-[230px]
overflow-hidden
blog-image-shape
"

                           >


                              <Image

                                 src={blog.image}

                                 alt={blog.title}

                                 fill

                                 sizes="400px"

                                 className="
object-cover
transition-transform
duration-700
group-hover:scale-110
"

                              />



                           </div>


                           {/* CONTENT */}


                           <div

                              className="
px-8
py-5
"

                           >


                              {/* DATE */}

                              <div
                                 className="
mb-2
font-heading
text-modura-black
font-bold
text-lg
tracking-wide
"
                              >

                                 {blog.date.day} {blog.date.month} {blog.date.year}

                              </div>
                              <h3

                                 className="
font-heading
text-[20px]
font-semibold
leading-tight
text-modura-secondary
"

                              >

                                 {blog.title}

                              </h3>



                              <p

                                 className="
font-body
text-sm
leading-7
text-modura-black
"

                              >

                                 {blog.desc}

                              </p>

                              <button
                                 className="
group
relative
mt-3
flex
h-[58px]
w-[200px]
items-center
justify-between
overflow-hidden
bg-modura-white
px-7
font-body
font-semibold
text-modura-primary
clip-read-btn
transition-all
duration-500
border-2
border-modura-secondary

"
                              >


                                 {/* Hover Layer */}

                                 <span
                                    className="
absolute
inset-0
bg-modura-secondary
translate-y-full
transition-transform
duration-500
ease-out
group-hover:translate-y-0

"
                                 />



                                 {/* Text */}

                                 <span
                                    className="
relative
z-10
transition-all
duration-500
group-hover:tracking-wider
"
                                 >
                                    Read More
                                 </span>





                                 {/* Arrow */}

                                 <span
                                    className="
relative
z-10
flex
h-10
w-12
items-center
justify-center
bg-modura-secondary
text-modura-primary
clip-arrow-box
transition-all
duration-500
group-hover:rotate-12
group-hover:translate-x-1
group-hover:bg-modura-primary
group-hover:text-white
"
                                 >

                                    <ArrowRight
                                       size={18}
                                       className="
transition-transform
duration-500
group-hover:translate-x-1
"
                                    />

                                 </span>



                              </button>

                           </div>
                        </Link>








                     </motion.article>



                  ))
               }




            </div>


         </div>



      </section>
    </main>
  );
}