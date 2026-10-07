"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Minus,
  Plus,
} from "lucide-react";


import autocadImage from "../assets/images/infrastructure.jpeg";

import { ArrowRight, DraftingCompass } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import blog1 from "../assets/images/blog1.jpeg";
import blog2 from "../assets/images/blog2.jpeg";
import blog3 from "../assets/images/blog3.jpeg";
import Link from "next/link";
import AnimatedButton from "@/components/AnimatedButton";
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


// ============================================================
// TYPES
// ============================================================

type FAQ = {
  question: string;
  answer: string;
};

type SoftwareData = {
  title: string;
  category: string;
  shortDescription: string;

  image: string;

  overview: string[];
  approach: string[];
  applications: string[];
  workflow: string[];

  faqs: FAQ[];
};


// ============================================================
// SOFTWARE DATA
// ============================================================

const softwareData: Record<string, SoftwareData> = {
  autocad: {
    title: "AutoCAD",

    category: "CAD DRAFTING",

   shortDescription:
  "Accurate 2D drafting and detailed technical documentation for architectural, structural, mechanical and construction projects. We develop clear, organised and construction-ready CAD drawings from design concepts, sketches, PDFs and existing drawings, while maintaining precision, consistency and project-specific drafting standards throughout the documentation process.",
    image: autocadImage.src,

    overview: [
      "AutoCAD is one of the most widely used and trusted software platforms for 2D drafting and technical documentation across the architecture, engineering and construction industry.",

      "Our team uses AutoCAD to create accurate, organised and construction-ready drawings for a wide range of project requirements. From initial design information to detailed documentation, every drawing is developed with attention to accuracy, consistency and clarity.",

      "Our AutoCAD drafting capabilities support architectural, structural, mechanical and infrastructure projects. We work with client drawings, sketches, PDFs and existing CAD files to create or update detailed technical documentation.",

      "The objective is to provide drawings that are easy to understand, properly organised and suitable for coordination, review, construction and further project development.",
    ],

    approach: [
      "We follow a structured and detail-oriented approach when working on AutoCAD projects. Before starting the drafting process, we review the available project information, drawing standards and specific client requirements.",

      "The drawing workflow is then organised around project priorities, ensuring that dimensions, annotations, layers, line work and documentation are maintained consistently throughout the project.",

      "Our team also focuses on maintaining clean and well-structured CAD files so that drawings remain practical for future revisions, coordination and project documentation.",
    ],

    applications: [
      "Residential building projects",
      "Commercial buildings and complexes",
      "Industrial facilities",
      "Institutional projects",
      "Infrastructure developments",
      "Architectural documentation",
      "Structural drafting",
      "Mechanical drafting",
      "Shop and fabrication drawings",
      "Construction documentation",
    ],

    workflow: [
      "Project information and reference drawing review",
      "Initial drawing setup and drafting standards",
      "Detailed 2D drafting and documentation",
      "Drawing coordination and internal checking",
      "Client review and required revisions",
      "Final drawing preparation and delivery",
    ],

    faqs: [
      {
        question:
          "What types of projects do you handle using AutoCAD?",
        answer:
          "We support architectural, structural, mechanical, infrastructure and construction-related projects using AutoCAD. The drafting workflow can be adapted according to the project scope, documentation requirements and client standards.",
      },
      {
        question:
          "Can you work with existing or old CAD drawings?",
        answer:
          "Yes. Existing CAD files can be reviewed, updated, cleaned and modified according to the current project requirements. We can also work with older drawings when revisions or additional documentation are required.",
      },
      {
        question:
          "Can you convert PDF drawings into AutoCAD?",
        answer:
          "Yes. PDF drawings, scanned drawings and other available references can be used to recreate editable CAD documentation. The level of detail can be adjusted according to the project requirements.",
      },
      {
        question:
          "Do you provide architectural drafting services?",
        answer:
          "Yes. Architectural drafting can include floor plans, elevations, sections, layouts, detailed drawings and other project-specific documentation required for design development and construction.",
      },
      {
        question:
          "Do you provide structural drafting and detailing?",
        answer:
          "Yes. Structural drafting requirements can be supported through detailed plans, layouts, sections, reinforcement-related documentation and other project-specific drawings.",
      },
      {
        question:
          "Do you provide shop and fabrication drawings?",
        answer:
          "Yes. Shop and fabrication drawings can be developed according to the available engineering information, project standards and fabrication requirements.",
      },
      {
        question:
          "Can you follow our company CAD standards?",
        answer:
          "Yes. We can follow client-specific layer structures, title blocks, naming conventions, drawing standards, annotation styles and documentation requirements.",
      },
      {
        question:
          "Can you handle revisions after client review?",
        answer:
          "Yes. Project revisions can be incorporated based on client comments, updated design information and coordination requirements.",
      },
    ],
  },


  // ==========================================================
  // REVIT
  // ==========================================================

  revit: {
    title: "Autodesk Revit",

    category: "BIM & COORDINATION",

    shortDescription:
      "Intelligent BIM modelling and coordinated documentation for architectural, structural and MEP projects.",

    image: autocadImage.src,

    overview: [
      "Autodesk Revit provides a BIM-based environment for creating intelligent building models and coordinated project documentation.",

      "Our team uses Revit to develop architectural, structural and MEP models while maintaining consistency between the model and associated project drawings.",

      "The BIM workflow helps improve coordination between different disciplines and provides structured project information throughout the documentation process.",

      "Our approach focuses on developing organised models that support design coordination, documentation and project execution.",
    ],

    approach: [
      "We begin by reviewing project drawings, modelling requirements, project standards and available reference information.",

      "The model is then developed according to the required level of detail and project-specific BIM standards.",

      "Throughout the process, we maintain model consistency and coordinate the required information between different project disciplines.",
    ],

    applications: [
      "Architectural BIM modelling",
      "Structural BIM modelling",
      "MEP modelling",
      "Construction documentation",
      "BIM coordination",
      "3D building modelling",
      "Model-based documentation",
      "Project coordination",
    ],

    workflow: [
      "Project information review",
      "BIM standards and model setup",
      "Model development",
      "Discipline coordination",
      "Documentation generation",
      "Review and revisions",
      "Final BIM delivery",
    ],

    faqs: [
      {
        question: "What Revit services do you provide?",
        answer:
          "We support architectural, structural and MEP modelling along with coordinated BIM documentation and project-specific modelling requirements.",
      },
      {
        question:
          "Can you create a Revit model from CAD drawings?",
        answer:
          "Yes. Existing CAD drawings, PDFs and other project references can be used as inputs for developing Revit models.",
      },
      {
        question:
          "Do you support multidisciplinary BIM coordination?",
        answer:
          "Yes. Architectural, structural and MEP models can be coordinated according to the requirements of the project.",
      },
      {
        question:
          "Can you follow project BIM standards?",
        answer:
          "Yes. Project-specific naming conventions, modelling standards, levels of development and documentation requirements can be followed.",
      },
    ],
  },


  // ==========================================================
  // TEKLA
  // ==========================================================

  tekla: {
    title: "Tekla Structures",

    category: "STRUCTURAL DETAILING",

    shortDescription:
      "Detailed structural modelling and fabrication-ready documentation for steel and complex structural projects.",

    image: autocadImage.src,

    overview: [
      "Tekla Structures is used for highly detailed structural modelling and steel detailing workflows.",

      "Our team can develop detailed structural models and associated documentation based on engineering drawings, project information and client requirements.",

      "The workflow focuses on accuracy, constructability and clear documentation for fabrication and construction activities.",
    ],

    approach: [
      "We review engineering information and project requirements before developing the structural model.",

      "The model is developed with attention to structural members, connections, dimensions and project-specific detailing requirements.",

      "Final documentation is reviewed to ensure consistency between the model and required drawings.",
    ],

    applications: [
      "Structural steel modelling",
      "Steel detailing",
      "Fabrication drawings",
      "Shop drawings",
      "Connection detailing",
      "Construction documentation",
    ],

    workflow: [
      "Engineering drawing review",
      "Model setup",
      "Structural modelling",
      "Connection detailing",
      "Drawing generation",
      "Quality review",
      "Final documentation",
    ],

    faqs: [
      {
        question:
          "What type of structures can you detail in Tekla?",
        answer:
          "We can support structural steel and other detailed structural modelling requirements based on the available engineering information.",
      },
      {
        question:
          "Do you provide fabrication drawings?",
        answer:
          "Yes. Fabrication and shop drawing documentation can be developed according to project and fabrication requirements.",
      },
      {
        question:
          "Can you work from engineering drawings?",
        answer:
          "Yes. Engineering drawings and project documentation can be used as the primary reference for modelling and detailing.",
      },
    ],
  },
};


// ============================================================
// PAGE
// ============================================================

export default function SoftwareDetailPage() {
  const params = useParams();

  const slug =
    typeof params.slug === "string"
      ? params.slug.toLowerCase()
      : "autocad";

  const software =
    softwareData[slug] ?? softwareData.autocad;

  const [activeFaq, setActiveFaq] =
    useState<number | null>(null);
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
    <main className="w-full bg-white text-modura-primary">

      {/* ======================================================
          BREADCRUMB
          Immediately after existing header
      ====================================================== */}

      <Breadcrumb title={software.title} />


      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="bg-white">

        <div
          className="
          mx-auto
            max-w-full
            px-5
            py-12
            lg:px-14
            sm:py-16
          "
        >

          <div
            className="
              grid
              items-center
              gap-8
              lg:grid-cols-[1.05fr_0.95fr]
              lg:gap-14
            "
          >

            {/* IMAGE */}

            <motion.div
              initial={{
                opacity: 0,
                x: -25,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.65,
                ease: "easeOut",
              }}
              className="
                relative
                overflow-hidden
              "
            >

              <img
                src={software.image}
                alt={software.title}
                className="
                  block
                  h-[270px]
                  w-full
                  object-cover
                  sm:h-[350px]
                  lg:h-[450px]
                "
              />

            </motion.div>


            {/* TITLE */}

            <motion.div
              initial={{
                opacity: 0,
                x: 25,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.1,
                duration: 0.65,
                ease: "easeOut",
              }}
            >

              <div className="flex items-center gap-3">

                <span
                  className="
                    h-[2px]
                    w-9
                    bg-modura-secondary
                  "
                />

                <span
                  className="
                    font-body
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-modura-secondary
                  "
                >
                  {software.category}
                </span>

              </div>


              <h1
                className="
                  mt-5
                  font-heading
                  text-[46px]
                  font-bold
                  leading-[0.95]
                  tracking-tight
                  text-modura-primary
                  sm:text-[60px]
                  lg:text-[72px]
                "
              >
                {software.title}
              </h1>


              <p
                className="
                  mt-6
                  max-w-[620px]
                  font-body
                  text-[15px]
                  leading-8
                  text-modura-gray-600
                  sm:text-[17px]
                "
              >
                {software.shortDescription}
              </p>

            </motion.div>

          </div>

        </div>

      </section>


      {/* ======================================================
          OVERVIEW
      ====================================================== */}

      <section className="bg-modura-off-white">

        <div
          className="
             mx-auto
            max-w-full
            px-5
            py-12
            lg:px-14
            sm:py-16
          "
        >

          <SectionHeading
            label="Overview"
            title="About"
            accent={software.title}
          />


          <div className="mt-7 max-w-[1000px] space-y-5">

            {software.overview.map(
              (paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.04,
                  }}
                  className="
                    font-body
                    text-[14px]
                    leading-8
                    text-modura-gray-600
                    sm:text-[15px]
                    sm:leading-[2]
                  "
                >
                  {paragraph}
                </motion.p>
              )
            )}

          </div>

        </div>

      </section>


      {/* ======================================================
          OUR APPROACH
      ====================================================== */}

      <section className="bg-white">

        <div
          className="
           mx-auto
            max-w-full
            px-5
            py-12
            lg:px-14
            sm:py-16
          "
        >

          <SectionHeading
            label="Our Approach"
            title="How We Use"
            accent={software.title}
          />


          <div className="mt-7 max-w-[1000px] space-y-5">

            {software.approach.map(
              (paragraph, index) => (
                <p
                  key={index}
                  className="
                    font-body
                    text-[14px]
                    leading-8
                    text-modura-gray-600
                    sm:text-[15px]
                    sm:leading-[2]
                  "
                >
                  {paragraph}
                </p>
              )
            )}

          </div>

        </div>

      </section>


      {/* ======================================================
          COMMON APPLICATIONS
      ====================================================== */}

      <section className="bg-modura-off-white">

        <div
          className="
            mx-auto
            max-w-full
            px-5
            py-12
            lg:px-14
            sm:py-16
          "
        >

          <SectionHeading
            label="Common Applications"
            title="Where"
            accent={`${software.title} Is Used`}
          />


          <p
            className="
              mt-7
              max-w-[950px]
              font-body
              text-[14px]
              leading-8
              text-modura-gray-600
              sm:text-[15px]
            "
          >
            Our expertise can be applied across different project
            types and documentation requirements. Depending on
            the project scope, the software can support design,
            coordination, drafting, detailing and construction
            documentation.
          </p>


          <div
            className="
              mt-8
              grid
              gap-x-10
              sm:grid-cols-2
            "
          >

            {software.applications.map((item) => (
              <div
                key={item}
                className="
                  flex
                  items-center
                  gap-4
                  border-b
                  border-modura-gray-200
                  py-4
                "
              >

                <span
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    bg-modura-secondary
                    text-white
                  "
                >
                  <Check
                    size={14}
                    strokeWidth={2}
                  />
                </span>

                <span
                  className="
                    font-body
                    text-[14px]
                    text-modura-gray-600
                    sm:text-[15px]
                  "
                >
                  {item}
                </span>

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* ======================================================
          WORKFLOW
      ====================================================== */}

      <section className="bg-white">

        <div
          className="
            mx-auto
            max-w-full
            px-5
            py-12
            lg:px-14
            sm:py-16
          "
        >

          <SectionHeading
            label="Project Workflow"
            title="Our"
            accent="Process"
          />


          <p
            className="
              mt-7
              max-w-[900px]
              font-body
              text-[14px]
              leading-8
              text-modura-gray-600
              sm:text-[15px]
            "
          >
            Every project is handled through a structured workflow
            designed to keep documentation clear, coordinated and
            aligned with the required project standards.
          </p>


          <div className="mt-8">

            {software.workflow.map((step) => (
              <div
                key={step}
                className="
                  flex
                  items-center
                  gap-5
                  border-t
                  border-modura-gray-200
                  py-5
                  last:border-b
                "
              >

                <span
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    border
                    border-modura-secondary
                    text-modura-secondary
                  "
                >
                  <Check
                    size={16}
                    strokeWidth={1.8}
                  />
                </span>

                <span
                  className="
                    font-body
                    text-[14px]
                    text-modura-gray-600
                    sm:text-[15px]
                  "
                >
                  {step}
                </span>

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* ======================================================
          FAQ
      ====================================================== */}

      <section className="bg-modura-off-white">

        <div
          className="
            mx-auto
            max-w-[1100px]
            px-5
            py-12
            sm:py-16
          "
        >

          <SectionHeading
            label="FAQ"
            title="Frequently Asked"
            accent="Questions"
          />


          <div
            className="
              mt-8
              border-t
              border-modura-gray-300
            "
          >

            {software.faqs.map(
              (faq, index) => {

                const open =
                  activeFaq === index;

                return (
                  <div
                    key={faq.question}
                    className="
                      border-b
                      border-modura-gray-300
                    "
                  >

                    <button
                      type="button"
                      onClick={() =>
                        setActiveFaq(
                          open ? null : index
                        )
                      }
                      className="
                        flex
                        w-full
                        items-center
                        gap-5
                        py-6
                        text-left
                      "
                    >

                      {/* FAQ ICON */}

                      <span
                        className={`
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          border
                          transition-all
                          duration-300
                          ${
                            open
                              ? "border-modura-secondary bg-modura-secondary text-white"
                              : "border-modura-gray-300 text-modura-secondary"
                          }
                        `}
                      >
                        {open ? (
                          <Minus
                            size={16}
                            strokeWidth={1.8}
                          />
                        ) : (
                          <Plus
                            size={16}
                            strokeWidth={1.8}
                          />
                        )}
                      </span>


                      {/* QUESTION */}

                      <span
                        className={`
                          flex-1
                          font-heading
                          text-[16px]
                          font-bold
                          transition-colors
                          duration-300
                          sm:text-[19px]
                          ${
                            open
                              ? "text-modura-secondary"
                              : "text-modura-primary"
                          }
                        `}
                      >
                        {faq.question}
                      </span>

                    </button>


                    {/* ANSWER */}

                    <AnimatePresence
                      initial={false}
                    >

                      {open && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                          }}
                        >

                          <div
                            className="
                              pb-7
                              pl-14
                              pr-5
                              sm:pl-14
                              sm:pr-10
                            "
                          >

                            <p
                              className="
                                max-w-[850px]
                                border-l
                                border-modura-secondary
                                pl-5
                                font-body
                                text-[13px]
                                leading-7
                                text-modura-gray-600
                                sm:text-[14px]
                                sm:leading-8
                              "
                            >
                              {faq.answer}
                            </p>

                          </div>

                        </motion.div>
                      )}

                    </AnimatePresence>

                  </div>
                );
              }
            )}

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
      {/* ======================================================
          START YOUR PROJECT CTA
      ====================================================== */}

      <section className="bg-modura-light">

        <div
          className="
            mx-auto
            flex
            max-w-full
            flex-col
            gap-7
            px-5
            py-12
            sm:px-14
            sm:py-14
            md:flex-row
            md:items-center
            md:justify-between
            lg:py-10
          "
        >

          <div className="max-w-[700px]">

            <span
              className="
                font-body
                text-[10px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-modura-secondary
              "
            >
              Let&apos;s Work Together
            </span>


            <h2
              className="
                mt-3
                font-heading
                text-[34px]
                font-bold
                leading-tight
                text-modura-primary
                sm:text-[46px]
              "
            >
              Start Your Project{" "}
              <span className="text-modura-secondary">
                With Us
              </span>
            </h2>


            <p
              className="
                mt-3
                max-w-[620px]
                font-body
                text-[13px]
                leading-7
                text-modura-gray-600
                sm:text-[14px]
              "
            >
              Have a project that requires reliable{" "}
              {software.title} expertise? Let&apos;s discuss
              your requirements and find the right technical
              approach for your project.
            </p>

          </div>


          <div className="shrink-0">

            <AnimatedButton
              href="/inquiry"
              title="Get In Touch"
            />

          </div>

        </div>

      </section>
      

    </main>
  );
}


// ============================================================
// SECTION HEADING
// ============================================================

function SectionHeading({
  label,
  title,
  accent,
}: {
  label: string;
  title: string;
  accent: string;
}) {
  return (
    <div>

      <div className="flex items-center gap-3">

        <span
          className="
            h-[2px]
            w-9
            bg-modura-secondary
          "
        />

        <span
          className="
            font-body
            text-[10px]
            font-bold
            uppercase
            tracking-[0.25em]
            text-modura-secondary
          "
        >
          {label}
        </span>

      </div>


      <h2
        className="
          mt-3
          font-heading
          text-[36px]
          font-bold
          leading-tight
          text-modura-primary
          sm:text-[48px]
        "
      >
        {title}{" "}

        <span className="text-modura-secondary">
          {accent}
        </span>
      </h2>

    </div>
  );
}