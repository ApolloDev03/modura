// "use client";

// import { useParams } from "next/navigation";

// import { useEffect, useLayoutEffect, useRef, useState } from "react";

// import { motion, AnimatePresence } from "framer-motion";

// import {

//   Check,

//   Minus,

//   Plus,

// } from "lucide-react";







// import { ArrowRight, DraftingCompass } from "lucide-react";

// import gsap from "gsap";

// import { ScrollTrigger } from "gsap/ScrollTrigger";








// import Link from "next/link";

// import AnimatedButton from "@/components/AnimatedButton";

// import Breadcrumb from "@/components/Breadcrumb";
// import { apiUrl } from "../../config";
// import axios from "axios";





// gsap.registerPlugin(ScrollTrigger);







// // TYPES

// // ============================================================



// type FAQ = {
//   id?: number;
//   question: string;
//   answer: string;
// };

// type SoftwareBlog = {
//   id: number;
//   title: string;
//   slug: string;
//   image?: string;
//   imageUrl?: string;
//   description:string;
//   publishedAt?: string;
// };

// type SoftwareData = {
//   id: number;
//   title: string;
//   category: string;
//   shortDescription: string;
//   longDescription: string;
//   image: string;
//   overview: string[];
//   approach: string[];
//   applications: string[];
//   workflow: string[];
//   faqs: FAQ[];
//   blogs: SoftwareBlog[];
// };



// const getAssetUrl = (value?: string) => {
//   if (!value) return "";
//   if (/^https?:\/\//i.test(value)) return value;
//   return `${apiUrl}${value.startsWith("/") ? "" : "/"}${value}`;
// };

// const stripHtml = (value = "") =>
//   value
//     .replace(/<br\s*\/?>(?!$)/gi, "\n")
//     .replace(/<\/p>/gi, "\n")
//     .replace(/<\/li>/gi, "\n")
//     .replace(/<[^>]*>/g, "")
//     .replace(/&nbsp;/gi, " ")
//     .replace(/&amp;/gi, "&")
//     .replace(/&quot;/gi, '"')
//     .replace(/&#39;/gi, "'")
//     .replace(/\s+\n/g, "\n")
//     .replace(/\n\s+/g, "\n")
//     .replace(/\n{3,}/g, "\n\n")
//     .trim();

// const parseSoftwareContent = (longDescription = "") => {
//   const paragraphs = Array.from(longDescription.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi))
//     .map((match) => stripHtml(match[1]))
//     .filter(Boolean);

//   const applications = Array.from(longDescription.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi))
//     .map((match) => stripHtml(match[1]))
//     .filter(Boolean);

//   const cleanParagraphs = paragraphs.length
//     ? paragraphs
//     : stripHtml(longDescription).split(/\n{2,}/).map((item) => item.trim()).filter(Boolean);

//   const overview = cleanParagraphs.slice(0, 3);
//   const approach = cleanParagraphs.slice(1, 4);
//   const fallbackItems = cleanParagraphs.slice(0, 6);

//   return {
//     overview: overview.length ? overview : [""],
//     approach: approach.length ? approach : overview,
//     applications: applications.length ? applications : fallbackItems,
//     workflow: applications.length ? applications : fallbackItems,
//   };
// };

// const normalizeSoftware = (data: any): SoftwareData => {
//   const content = parseSoftwareContent(data?.longDescription || "");

//   return {
//     id: Number(data?.id || 0),
//     title: data?.name || "Software Expertise",
//     category: data?.category || "SOFTWARE EXPERTISE",
//     shortDescription: data?.shortDescription || "",
//     longDescription: data?.longDescription || "",
//     image: getAssetUrl(data?.imageUrl || data?.image),
//     overview: content.overview,
//     approach: content.approach,
//     applications: content.applications,
//     workflow: content.workflow,
//     faqs: Array.isArray(data?.faqs) ? data.faqs : [],
//     blogs: Array.isArray(data?.blogs) ? data.blogs : [],
//   };
// };


// // PAGE

// // ============================================================



// export default function SoftwareDetailPage() {

//   const params = useParams();

//   const slug =
//     typeof params.slug === "string"
//       ? params.slug.toLowerCase()
//       : "";

//   const [software, setSoftware] = useState<SoftwareData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [activeFaq, setActiveFaq] = useState<number | null>(null);
//   const sectionRef = useRef<HTMLDivElement | null>(null);

// useEffect(() => {
//   if (!slug) return;

//   const fetchSoftwareDetail = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await axios.post(
//         `${apiUrl}/softwareDetail`,
//         { slug },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//         }
//       );

//       const result = response.data;

//       if (!result?.success || !result?.data) {
//         throw new Error(
//           result?.message || "Software details not found."
//         );
//       }

//       setSoftware(normalizeSoftware(result.data));
//     } catch (err: any) {
//       console.error("Software Detail API Error:", err);

//       setSoftware(null);

//       setError(
//         err?.response?.data?.message ||
//         err?.message ||
//         "Unable to load software details."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchSoftwareDetail();
// }, [slug]);

//   useLayoutEffect(() => {





//       const ctx = gsap.context(() => {





//          gsap.from(".blog-card",

//             {

//                opacity: 0,

//                y: 70,

//                duration: 1,

//                ease: "power3.out",

//                stagger: 0.2,



//                scrollTrigger: {

//                   trigger: sectionRef.current,

//                   start: "top 75%",

//                   once: true

//                }



//             });





//       }, sectionRef);







//       return () => ctx.revert();

//    }, [software]);

//   if (loading) {
//     return (
//       <main className="w-full min-h-screen bg-white text-modura-primary">
//         <div className="flex min-h-screen items-center justify-center font-body text-sm text-modura-gray-500">
//           Loading...
//         </div>
//       </main>
//     );
//   }

//   if (!software) {
//     return (
//       <main className="w-full min-h-screen bg-white text-modura-primary">
//         <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
//           <h1 className="font-heading text-3xl font-bold text-modura-primary">Software Not Found</h1>
//           <p className="mt-3 max-w-xl font-body text-sm leading-7 text-modura-gray-600">
//             {error || "We could not load the requested software details."}
//           </p>
//         </div>
//       </main>
//     );
//   }

// const truncateText = (text: string = "", maxLength = 80) => {
//   if (!text) return "";

//   const cleanText = text
//     // HTML tags remove
//     .replace(/<[^>]*>/g, " ")

//     // HTML entities
//     .replace(/&nbsp;/gi, " ")
//     .replace(/&amp;/gi, "&")
//     .replace(/&quot;/gi, '"')
//     .replace(/&#39;/gi, "'")

//     // New lines / tabs / multiple spaces → single space
//     .replace(/\s+/g, " ")

//     // Starting and ending spaces remove
//     .trim();

//   return cleanText.length > maxLength
//     ? `${cleanText.substring(0, maxLength).trim()}...`
//     : cleanText;
// };

//   return (

//     <main className="w-full bg-white text-modura-primary">



//       {/* ======================================================

//           BREADCRUMB

//           Immediately after existing header

//       \====================================================== */}

//       <Breadcrumb title={software.title} />


//       {/* ======================================================

//           HERO

//       \====================================================== */}



//       <section className="bg-white">



//         <div

//           className="

//           mx-auto

//             max-w-full

//             px-5

//             py-12

//             lg:px-14

//             sm:py-16

//           "

//         >



//           <div

//             className="

//               grid

//               items-center

//               gap-8

//               lg:grid-cols-[1.05fr_0.95fr]

//               lg:gap-14

//             "

//           >



//             {/* IMAGE */}



//             <motion.div

//               initial={{

//                 opacity: 0,

//                 x: -25,

//               }}

//               animate={{

//                 opacity: 1,

//                 x: 0,

//               }}

//               transition={{

//                 duration: 0.65,

//                 ease: "easeOut",

//               }}

//               className="

//                 relative

//                 overflow-hidden

//               "

//             >



//               <img

//                 src={software.image}

//                 alt={software.title}

//                 className="

//                   block

//                   h-[270px]

//                   w-full

//                   object-cover

//                   sm:h-[350px]

//                   lg:h-[450px]

//                 "

//               />



//             </motion.div>





//             {/* TITLE */}



//             <motion.div

//               initial={{

//                 opacity: 0,

//                 x: 25,

//               }}

//               animate={{

//                 opacity: 1,

//                 x: 0,

//               }}

//               transition={{

//                 delay: 0.1,

//                 duration: 0.65,

//                 ease: "easeOut",

//               }}

//             >



//               <div className="flex items-center gap-3">



//                 <span

//                   className="

//                     h-[2px]

//                     w-9

//                     bg-modura-secondary

//                   "

//                 />



//                 <span

//                   className="

//                     font-body

//                     text-[10px]

//                     font-bold

//                     uppercase

//                     tracking-[0.25em]

//                     text-modura-secondary

//                   "

//                 >

//                   {software.category}

//                 </span>



//               </div>





//               <h1

//                 className="

//                   mt-5

//                   font-heading

//                   text-[46px]

//                   font-bold

//                   leading-[0.95]

//                   tracking-tight

//                   text-modura-primary

//                   sm:text-[60px]

//                   lg:text-[72px]

//                 "

//               >

//                 {software.title}

//               </h1>





//               <p

//                 className="

//                   mt-6

//                   max-w-[620px]

//                   font-body

//                   text-[15px]

//                   leading-8

//                   text-modura-gray-600

//                   sm:text-[17px]

//                 "

//               >

//                 {software.shortDescription}

//               </p>



//             </motion.div>



//           </div>



//         </div>



//       </section>





//       {/* ======================================================

//           OVERVIEW

//       \====================================================== */}



//       <section className="bg-modura-off-white">



//         <div

//           className="

//              mx-auto

//             max-w-full

//             px-5

//             py-12

//             lg:px-14

//             sm:py-16

//           "

//         >



//           <SectionHeading

//             label="Overview"

//             title="About"

//             accent={software.title}

//           />





//           <div className="mt-7 max-w-[1000px] space-y-5">



//             {software.overview.map(

//               (paragraph, index) => (

//                 <motion.p

//                   key={index}

//                   initial={{

//                     opacity: 0,

//                     y: 10,

//                   }}

//                   whileInView={{

//                     opacity: 1,

//                     y: 0,

//                   }}

//                   viewport={{

//                     once: true,

//                     amount: 0.2,

//                   }}

//                   transition={{

//                     duration: 0.45,

//                     delay: index * 0.04,

//                   }}

//                   className="

//                     font-body

//                     text-[14px]

//                     leading-8

//                     text-modura-gray-600

//                     sm:text-[15px]

//                     sm:leading-[2]

//                   "

//                 >

//                   {paragraph}

//                 </motion.p>

//               )

//             )}



//           </div>



//         </div>



//       </section>





//       {/* ======================================================

//           OUR APPROACH

//       \====================================================== */}



//       <section className="bg-white">



//         <div

//           className="

//            mx-auto

//             max-w-full

//             px-5

//             py-12

//             lg:px-14

//             sm:py-16

//           "

//         >



//           <SectionHeading

//             label="Our Approach"

//             title="How We Use"

//             accent={software.title}

//           />





//           <div className="mt-7 max-w-[1000px] space-y-5">



//             {software.approach.map(

//               (paragraph, index) => (

//                 <p

//                   key={index}

//                   className="

//                     font-body

//                     text-[14px]

//                     leading-8

//                     text-modura-gray-600

//                     sm:text-[15px]

//                     sm:leading-[2]

//                   "

//                 >

//                   {paragraph}

//                 </p>

//               )

//             )}



//           </div>



//         </div>



//       </section>





//       {/* ======================================================

//           COMMON APPLICATIONS

//       \====================================================== */}



//       <section className="bg-modura-off-white">



//         <div

//           className="

//             mx-auto

//             max-w-full

//             px-5

//             py-12

//             lg:px-14

//             sm:py-16

//           "

//         >



//           <SectionHeading

//             label="Common Applications"

//             title="Where"

//             accent={`${software.title} Is Used`}

//           />





//           <p

//             className="

//               mt-7

//               max-w-[950px]

//               font-body

//               text-[14px]

//               leading-8

//               text-modura-gray-600

//               sm:text-[15px]

//             "

//           >

//             Our expertise can be applied across different project

//             types and documentation requirements. Depending on

//             the project scope, the software can support design,

//             coordination, drafting, detailing and construction

//             documentation.

//           </p>





//           <div

//             className="

//               mt-8

//               grid

//               gap-x-10

//               sm:grid-cols-2

//             "

//           >



//             {software.applications.map((item) => (

//               <div

//                 key={item}

//                 className="

//                   flex

//                   items-center

//                   gap-4

//                   border-b

//                   border-modura-gray-200

//                   py-4

//                 "

//               >



//                 <span

//                   className="

//                     flex

//                     h-8

//                     w-8

//                     shrink-0

//                     items-center

//                     justify-center

//                     bg-modura-secondary

//                     text-white

//                   "

//                 >

//                   <Check

//                     size={14}

//                     strokeWidth={2}

//                   />

//                 </span>



//                 <span

//                   className="

//                     font-body

//                     text-[14px]

//                     text-modura-gray-600

//                     sm:text-[15px]

//                   "

//                 >

//                   {item}

//                 </span>



//               </div>

//             ))}



//           </div>



//         </div>



//       </section>





//       {/* ======================================================

//           WORKFLOW

//       \====================================================== */}



//       <section className="bg-white">



//         <div

//           className="

//             mx-auto

//             max-w-full

//             px-5

//             py-12

//             lg:px-14

//             sm:py-16

//           "

//         >



//           <SectionHeading

//             label="Project Workflow"

//             title="Our"

//             accent="Process"

//           />





//           <p

//             className="

//               mt-7

//               max-w-[900px]

//               font-body

//               text-[14px]

//               leading-8

//               text-modura-gray-600

//               sm:text-[15px]

//             "

//           >

//             Every project is handled through a structured workflow

//             designed to keep documentation clear, coordinated and

//             aligned with the required project standards.

//           </p>





//           <div className="mt-8">



//             {software.workflow.map((step) => (

//               <div

//                 key={step}

//                 className="

//                   flex

//                   items-center

//                   gap-5

//                   border-t

//                   border-modura-gray-200

//                   py-5

//                   last:border-b

//                 "

//               >



//                 <span

//                   className="

//                     flex

//                     h-9

//                     w-9

//                     shrink-0

//                     items-center

//                     justify-center

//                     border

//                     border-modura-secondary

//                     text-modura-secondary

//                   "

//                 >

//                   <Check

//                     size={16}

//                     strokeWidth={1.8}

//                   />

//                 </span>



//                 <span

//                   className="

//                     font-body

//                     text-[14px]

//                     text-modura-gray-600

//                     sm:text-[15px]

//                   "

//                 >

//                   {step}

//                 </span>



//               </div>

//             ))}



//           </div>



//         </div>



//       </section>





//       {/* ======================================================

//           FAQ

//       \====================================================== */}



//       <section className="bg-modura-off-white">



//         <div

//           className="

//             mx-auto

//             max-w-[1100px]

//             px-5

//             py-12

//             sm:py-16

//           "

//         >



//           <SectionHeading

//             label="FAQ"

//             title="Frequently Asked"

//             accent="Questions"

//           />





//           <div

//             className="

//               mt-8

//               border-t

//               border-modura-gray-300

//             "

//           >



//             {software.faqs.map(

//               (faq, index) => {



//                 const open =

//                   activeFaq === index;



//                 return (

//                   <div

//                     key={faq.question}

//                     className="

//                       border-b

//                       border-modura-gray-300

//                     "

//                   >



//                     <button

//                       type="button"

//                       onClick={() =>

//                         setActiveFaq(

//                           open ? null : index

//                         )

//                       }

//                       className="

//                         flex

//                         w-full

//                         items-center

//                         gap-5

//                         py-6

//                         text-left

//                       "

//                     >



//                       {/* FAQ ICON */}



//                       <span

//                         className={`

//                           flex

//                           h-9

//                           w-9

//                           shrink-0

//                           items-center

//                           justify-center

//                           border

//                           transition-all

//                           duration-300

//                           ${

//                             open

//                               ? "border-modura-secondary bg-modura-secondary text-white"

//                               : "border-modura-gray-300 text-modura-secondary"

//                           }

//                         `}

//                       >

//                         {open ? (

//                           <Minus

//                             size={16}

//                             strokeWidth={1.8}

//                           />

//                         ) : (

//                           <Plus

//                             size={16}

//                             strokeWidth={1.8}

//                           />

//                         )}

//                       </span>





//                       {/* QUESTION */}



//                       <span

//                         className={`

//                           flex-1

//                           font-heading

//                           text-[16px]

//                           font-bold

//                           transition-colors

//                           duration-300

//                           sm:text-[19px]

//                           ${

//                             open

//                               ? "text-modura-secondary"

//                               : "text-modura-primary"

//                           }

//                         `}

//                       >

//                         {faq.question}

//                       </span>



//                     </button>





//                     {/* ANSWER */}



//                     <AnimatePresence

//                       initial={false}

//                     >



//                       {open && (

//                         <motion.div

//                           initial={{

//                             height: 0,

//                             opacity: 0,

//                           }}

//                           animate={{

//                             height: "auto",

//                             opacity: 1,

//                           }}

//                           exit={{

//                             height: 0,

//                             opacity: 0,

//                           }}

//                           transition={{

//                             duration: 0.3,

//                             ease: "easeInOut",

//                           }}

//                         >



//                           <div

//                             className="

//                               pb-7

//                               pl-14

//                               pr-5

//                               sm:pl-14

//                               sm:pr-10

//                             "

//                           >



//                             <p

//                               className="

//                                 max-w-[850px]

//                                 border-l

//                                 border-modura-secondary

//                                 pl-5

//                                 font-body

//                                 text-[13px]

//                                 leading-7

//                                 text-modura-gray-600

//                                 sm:text-[14px]

//                                 sm:leading-8

//                               "

//                             >

//                               {faq.answer}

//                             </p>



//                           </div>



//                         </motion.div>

//                       )}



//                     </AnimatePresence>



//                   </div>

//                 );

//               }

//             )}



//           </div>



//         </div>



//       </section>



//     <section



//          ref={sectionRef}



//          className="

// relative

// overflow-hidden

// bg-modura-off-white

// py-16

// "



//       >





//          <div



//             className="

// relative

// z-10

// max-w-7xl

// mx-auto

// px-6

// "



//          >









//             {/* HEADER */}



//             <div

//                className="

// text-center

// mb-14

// "



//             >





//                <div className="

// flex

// items-center

// gap-3

// font-body

// justify-center

// font-bold

// text-xs

// uppercase

// tracking-[5px]

// text-modura-secondary

// ">





//                   <DraftingCompass

//                      size={20}

//                      strokeWidth={1.5}

//                      className="

// text-modura-secondary

// "

//                   />





//                   <span>

//                      OUR BLOG

//                   </span>





//                </div>







//                <h2

//                   className="

// mt-4

// font-heading

// text-5xl

// lg:text-6xl

// font-semibold

// text-modura-primary

// "

//                >



//                   Engineering

//                   <span

//                      className="

// text-modura-secondary ml-2

// "

//                   >

//                      Insights

//                   </span>





//                </h2>







//             </div>







//             {/* BLOG GRID */}





//             <div



//                className="

// grid

// md:grid-cols-2

// lg:grid-cols-3

// gap-8

// "



//             >


//                {

//                   software.blogs.map((blog, index) => (


//                      <motion.article


//                         key={index}
//            whileHover={{

//                            y: -12

//                         }}





//                         transition={{

//                            duration: .35

//                         }}







//                         className="

// blog-card

// bg-white

// shadow-xl

// overflow-hidden

// blog-card-shape

// h-[500px]

// "



//                      >


//                         {/* IMAGE */}



//                         <Link

//                            href="blogDetail">



//                            <div



//                               className="

// relative

// h-[230px]

// overflow-hidden

// blog-image-shape

// "



//                            >





//                               <img
//                                 src={getAssetUrl(blog.imageUrl || blog.image)}
//                                 alt={blog.title}
//                                 className="

// object-cover

// transition-transform

// duration-700

// group-hover:scale-110

// "
//                              />


//                            </div>





//                            {/* CONTENT */}





//                            <div



//                               className="

// px-8

// py-5

// "



//                            >





//                               {/* DATE */}



//                               <div

//                                  className="

// mb-2

// font-heading

// text-modura-black

// font-bold

// text-lg

// tracking-wide

// "

//                               >



//                                  {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }) : ""}



//                               </div>

//                               <h3



//                                  className="

// font-heading

// text-[20px]

// font-semibold

// leading-tight

// text-modura-secondary

// "



//                               >



//                                  {blog.title}



//                               </h3>


//   <p
//     className="
//       mt-2
//       font-body
//       text-sm
//       leading-7
//       text-modura-black
//     "
//   >
//     {truncateText(
//       blog.description  || "",
//       80
//     )}
//   </p>





//                               <button

//                                  className="

// group

// relative

// mt-3

// flex

// h-[58px]

// w-[200px]

// items-center

// justify-between

// overflow-hidden

// bg-modura-white

// px-7

// font-body

// font-semibold

// text-modura-primary

// clip-read-btn

// transition-all

// duration-500

// border-2

// border-modura-secondary



// "

//                               >





//                                  {/* Hover Layer */}



//                                  <span

//                                     className="

// absolute

// inset-0

// bg-modura-secondary

// translate-y-full

// transition-transform

// duration-500

// ease-out

// group-hover:translate-y-0



// "

//                                  />







//                                  {/* Text */}



//                                  <span

//                                     className="

// relative

// z-10

// transition-all

// duration-500

// group-hover:tracking-wider

// "

//                                  >

//                                     Read More

//                                  </span>











//                                  {/* Arrow */}



//                                  <span

//                                     className="

// relative

// z-10

// flex

// h-10

// w-12

// items-center

// justify-center

// bg-modura-secondary

// text-modura-primary

// clip-arrow-box

// transition-all

// duration-500

// group-hover:rotate-12

// group-hover:translate-x-1

// group-hover:bg-modura-primary

// group-hover:text-white

// "

//                                  >



//                                     <ArrowRight

//                                        size={18}

//                                        className="

// transition-transform

// duration-500

// group-hover:translate-x-1

// "

//                                     />



//                                  </span>







//                               </button>



//                            </div>

//                         </Link>

















//                      </motion.article>







//                   ))

//                }









//             </div>





//          </div>







//       </section>

//       {/* ======================================================

//           START YOUR PROJECT CTA

//       \====================================================== */}



//       <section className="bg-modura-light">



//         <div

//           className="

//             mx-auto

//             flex

//             max-w-full

//             flex-col

//             gap-7

//             px-5

//             py-12

//             sm:px-14

//             sm:py-14

//             md:flex-row

//             md:items-center

//             md:justify-between

//             lg:py-10

//           "

//         >



//           <div className="max-w-[700px]">



//             <span

//               className="

//                 font-body

//                 text-[10px]

//                 font-bold

//                 uppercase

//                 tracking-[0.25em]

//                 text-modura-secondary

//               "

//             >

//               Let's Work Together

//             </span>





//             <h2

//               className="

//                 mt-3

//                 font-heading

//                 text-[34px]

//                 font-bold

//                 leading-tight

//                 text-modura-primary

//                 sm:text-[46px]

//               "

//             >

//               Start Your Project{" "}

//               <span className="text-modura-secondary">

//                 With Us

//               </span>

//             </h2>





//             <p

//               className="

//                 mt-3

//                 max-w-[620px]

//                 font-body

//                 text-[13px]

//                 leading-7

//                 text-modura-gray-600

//                 sm:text-[14px]

//               "

//             >

//               Have a project that requires reliable{" "}

//               {software.title} expertise? Let's discuss

//               your requirements and find the right technical

//               approach for your project.

//             </p>



//           </div>





//           <div className="shrink-0">



//             <AnimatedButton

//               href="/inquiry"

//               title="Get In Touch"

//             />



//           </div>



//         </div>



//       </section>



//     </main>

//   );

// }





// // ============================================================

// // SECTION HEADING

// // ============================================================



// function SectionHeading({

//   label,

//   title,

//   accent,

// }: {

//   label: string;

//   title: string;

//   accent: string;

// }) {

//   return (

//     <div>



//       <div className="flex items-center gap-3">



//         <span

//           className="

//             h-[2px]

//             w-9

//             bg-modura-secondary

//           "

//         />



//         <span

//           className="

//             font-body

//             text-[10px]

//             font-bold

//             uppercase

//             tracking-[0.25em]

//             text-modura-secondary

//           "

//         >

//           {label}

//         </span>



//       </div>





//       <h2

//         className="

//           mt-3

//           font-heading

//           text-[36px]

//           font-bold

//           leading-tight

//           text-modura-primary

//           sm:text-[48px]

//         "

//       >

//         {title}{" "}



//         <span className="text-modura-secondary">

//           {accent}

//         </span>

//       </h2>



//     </div>

//   );

// }

"use client";

import { useParams } from "next/navigation";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {

  Check,

  Minus,

  Plus,

} from "lucide-react";

import { ArrowRight, DraftingCompass } from "lucide-react";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import Link from "next/link";

import AnimatedButton from "@/components/AnimatedButton";

import Breadcrumb from "@/components/Breadcrumb";

import { apiUrl } from "../../config";

import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

// TYPES

// ============================================================

type FAQ = {

  id?: number;

  question: string;

  answer: string;

};

type SoftwareBlog = {

  id: number;

  title: string;

  slug: string;

  image?: string;

  imageUrl?: string;

  description:string;

  publishedAt?: string;

};

type SoftwareData = {

  id: number;

  title: string;

  category: string;

  shortDescription: string;

  longDescription: string;

  image: string;

  overview: string[];

  approach: string[];

  applications: string[];

  workflow: string[];

  faqs: FAQ[];

  blogs: SoftwareBlog[];

};

const getAssetUrl = (value?: string) => {

  if (!value) return "";

  if (/^https?:\/\//i.test(value)) return value;

  return `${apiUrl}${value.startsWith("/") ? "" : "/"}${value}`;

};

const stripHtml = (value = "") =>

  value

    .replace(/<br\s*\/?>(?!$)/gi, "\n")

    .replace(/<\/p>/gi, "\n")

    .replace(/<\/li>/gi, "\n")

    .replace(/<[^>]*>/g, "")

    .replace(/&nbsp;/gi, " ")

    .replace(/&amp;/gi, "&")

    .replace(/&quot;/gi, '"')

    .replace(/&#39;/gi, "'")

    .replace(/\s+\n/g, "\n")

    .replace(/\n\s+/g, "\n")

    .replace(/\n{3,}/g, "\n\n")

    .trim();

const parseSoftwareContent = (longDescription = "") => {

  const paragraphs = Array.from(longDescription.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi))

    .map((match) => stripHtml(match[1]))

    .filter(Boolean);

  const applications = Array.from(longDescription.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi))

    .map((match) => stripHtml(match[1]))

    .filter(Boolean);

  const cleanParagraphs = paragraphs.length

    ? paragraphs

    : stripHtml(longDescription).split(/\n{2,}/).map((item) => item.trim()).filter(Boolean);

  const overview = cleanParagraphs.slice(0, 3);

  const approach = cleanParagraphs.slice(1, 4);

  const fallbackItems = cleanParagraphs.slice(0, 6);

  return {

    overview: overview.length ? overview : [""],

    approach: approach.length ? approach : overview,

    applications: applications.length ? applications : fallbackItems,

    workflow: applications.length ? applications : fallbackItems,

  };

};

const normalizeSoftware = (data: any): SoftwareData => {

  const content = parseSoftwareContent(data?.longDescription || "");

  return {

    id: Number(data?.id || 0),

    title: data?.name || "Software Expertise",

    category: data?.category || "SOFTWARE EXPERTISE",

    shortDescription: data?.shortDescription || "",

    longDescription: data?.longDescription || "",

    image: getAssetUrl(data?.imageUrl || data?.image),

    overview: content.overview,

    approach: content.approach,

    applications: content.applications,

    workflow: content.workflow,

    faqs: Array.isArray(data?.faqs) ? data.faqs : [],

    blogs: Array.isArray(data?.blogs) ? data.blogs : [],

  };

};

// PAGE

// ============================================================

export default function SoftwareDetailPage() {

  const params = useParams();

  const slug =

    typeof params.slug === "string"

      ? params.slug.toLowerCase()

      : "";

  const [software, setSoftware] = useState<SoftwareData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {

  if (!slug) return;

  const fetchSoftwareDetail = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await axios.post(

        `${apiUrl}/softwareDetail`,

        { slug },

        {

          headers: {

            "Content-Type": "application/json",

            Accept: "application/json",

          },

        }

      );

      const result = response.data;

      if (!result?.success || !result?.data) {

        throw new Error(

          result?.message || "Software details not found."

        );

      }

      setSoftware(normalizeSoftware(result.data));

    } catch (err: any) {

      console.error("Software Detail API Error:", err);

      setSoftware(null);

      setError(

        err?.response?.data?.message ||

        err?.message ||

        "Unable to load software details."

      );

    } finally {

      setLoading(false);

    }

  };

  fetchSoftwareDetail();

}, [slug]);

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

   }, [software]);

  if (loading) {

    return (

      <main className="w-full min-h-screen bg-white text-modura-primary">

        <div className="flex min-h-screen items-center justify-center font-body text-sm text-modura-gray-500">

          Loading...

        </div>

      </main>

    );

  }

  if (!software) {

    return (

      <main className="w-full min-h-screen bg-white text-modura-primary">

        <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">

          <h1 className="font-heading text-3xl font-bold text-modura-primary">Software Not Found</h1>

          <p className="mt-3 max-w-xl font-body text-sm leading-7 text-modura-gray-600">

            {error || "We could not load the requested software details."}

          </p>

        </div>

      </main>

    );

  }

const truncateText = (text: string = "", maxLength = 80) => {

  if (!text) return "";

  const cleanText = text

    // HTML tags remove

    .replace(/<[^>]*>/g, " ")

    // HTML entities

    .replace(/&nbsp;/gi, " ")

    .replace(/&amp;/gi, "&")

    .replace(/&quot;/gi, '"')

    .replace(/&#39;/gi, "'")

    // New lines / tabs / multiple spaces → single space

    .replace(/\s+/g, " ")

    // Starting and ending spaces remove

    .trim();

  return cleanText.length > maxLength

    ? `${cleanText.substring(0, maxLength).trim()}...`

    : cleanText;

};

  return (

    <main className="w-full overflow-x-clip bg-white text-modura-primary">

      {/* ======================================================

          BREADCRUMB

          Immediately after existing header

      \\====================================================== */}

      <Breadcrumb title={software.title} />

      {/* ======================================================

          HERO

      \\====================================================== */}

      <section className="bg-white">

        <div

          className="

          mx-auto

            max-w-full

            px-4

            md:px-6

            lg:px-10

            2xl:px-16

            py-8

            sm:py-10

          "

        >

          <div

            className="

              grid

              items-center

              gap-5 md:gap-8

              lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]

              lg:gap-10

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

                  text-[clamp(32px,7vw,46px)]

                  font-bold

                  leading-[0.95]

                  tracking-tight

                  text-modura-primary

                  sm:text-[60px]

                  lg:text-[clamp(48px,5vw,72px)]

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

                  leading-7

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

      \\====================================================== */}

      <section className="bg-modura-off-white">

        <div

          className="

             mx-auto

            max-w-full

            px-4

            md:px-6

            lg:px-10

            2xl:px-16

            py-8

            sm:py-10

          "

        >

          <SectionHeading

            label="Overview"

            title="About"

            accent={software.title}

          />

          <div className="mt-5 max-w-[1000px] space-y-3">

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

                    leading-7

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

      \\====================================================== */}

      <section className="bg-white">

        <div

          className="

           mx-auto

            max-w-full

            px-4

            md:px-6

            lg:px-10

            2xl:px-16

            py-8

            sm:py-10

          "

        >

          <SectionHeading

            label="Our Approach"

            title="How We Use"

            accent={software.title}

          />

          <div className="mt-5 max-w-[1000px] space-y-3">

            {software.approach.map(

              (paragraph, index) => (

                <p

                  key={index}

                  className="

                    font-body

                    text-[14px]

                    leading-7

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

      \\====================================================== */}

      <section className="bg-modura-off-white">

        <div

          className="

            mx-auto

            max-w-full

            px-4

            md:px-6

            lg:px-10

            2xl:px-16

            py-8

            sm:py-10

          "

        >

          <SectionHeading

            label="Common Applications"

            title="Where"

            accent={`${software.title} Is Used`}

          />

          <p

            className="

              mt-5

              max-w-[950px]

              font-body

              text-[14px]

              leading-7

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

              mt-5 md:mt-6

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

      \\====================================================== */}

      <section className="bg-white">

        <div

          className="

            mx-auto

            max-w-full

            px-4

            md:px-6

            lg:px-10

            2xl:px-16

            py-8

            sm:py-10

          "

        >

          <SectionHeading

            label="Project Workflow"

            title="Our"

            accent="Process"

          />

          <p

            className="

              mt-5

              max-w-[900px]

              font-body

              text-[14px]

              leading-7

              text-modura-gray-600

              sm:text-[15px]

            "

          >

            Every project is handled through a structured workflow

            designed to keep documentation clear, coordinated and

            aligned with the required project standards.

          </p>

          <div className="mt-5 md:mt-6">

            {software.workflow.map((step) => (

              <div

                key={step}

                className="

                  flex

                  items-center

                  gap-5

                  border-t

                  border-modura-gray-200

                  py-4

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

      \\====================================================== */}

      <section className="bg-modura-off-white">

        <div

          className="

            mx-auto

            max-w-full

            px-4

            md:px-6

            lg:px-10

            2xl:px-16

            py-8

            sm:py-10

          "

        >

          <SectionHeading

            label="FAQ"

            title="Frequently Asked"

            accent="Questions"

          />

          <div

            className="

              mt-5 md:mt-6

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

                        py-4

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

                                sm:leading-7

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

py-8 md:py-10

"

      >

         <div

            className="

relative

z-10

max-w-full
mx-auto
px-4
md:px-6
lg:px-10
2xl:px-16

"

         >

            {/* HEADER */}

            <div

               className="

text-center

mb-8 md:mb-10

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

text-3xl sm:text-4xl lg:text-5xl

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

gap-5 md:gap-8

"

            >

               {

                  software.blogs.map((blog, index) => (

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

min-h-[400px] h-auto

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

                              <img

                                src={getAssetUrl(blog.imageUrl || blog.image)}

                                alt={blog.title}

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

px-4 sm:px-6 lg:px-8

py-4

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

                                 {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }) : ""}

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

      mt-2

      font-body

      text-sm

      leading-7

      text-modura-black

    "

  >

    {truncateText(

      blog.description  || "",

      80

    )}

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

      \\====================================================== */}

      <section className="bg-modura-light">

        <div

          className="

            mx-auto

            flex

            max-w-full

            flex-col

            gap-7

            px-4

            py-8

            md:px-6

           lg:px-10

           2xl:px-16

            sm:py-10

            md:flex-row

            md:items-center

            md:justify-between

            lg:py-10

          "

        >

          <div className="min-w-0 max-w-[700px]">

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

              Let's Work Together

            </span>

            <h2

              className="

                mt-3

                font-heading

                text-[34px]

                font-bold

                leading-tight

                text-modura-primary

                sm:text-[clamp(32px,7vw,46px)]

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

              {software.title} expertise? Let's discuss

              your requirements and find the right technical

              approach for your project.

            </p>

          </div>

          <div className="shrink-0 self-start md:self-center">

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

          text-[clamp(30px,6vw,36px)]

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