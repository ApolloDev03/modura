"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, DraftingCompass } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import blog1 from "../app/(website)/assets/images/blog1.jpeg";
import blog2 from "../app/(website)/assets/images/blog2.jpeg";
import blog3 from "../app/(website)/assets/images/blog3.jpeg";
import Link from "next/link";


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





export default function BlogSection() {


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


   )

}