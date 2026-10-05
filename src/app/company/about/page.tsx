"use client"
import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  DraftingCompass,
} from "lucide-react";

import about_building from "../../assets/images/about-building.jpeg";
import blueprint from "../../assets/images/blueprint.jpeg";
import Breadcrumb from "../../components/Breadcrumb";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
export default function About() {
const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".vision-mission-item", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

return (
<>
<Breadcrumb title="About Us" />
<section className="relative overflow-hidden bg-white py-16">



<div className="
mx-auto
max-w-7xl
px-6
lg:px-10
">


<div className="
grid
items-center
gap-12
lg:grid-cols-2
">





{/* LEFT */}

<div className="
relative
h-[500px]
">



{/* Main Image */}

<div className="
absolute
left-16
top-0
h-[390px]
w-[450px]
overflow-hidden
clip-main
">


<Image

src={about_building}

alt="building"

fill

className="
object-cover
"

/>


</div>





{/* Blueprint */}

<div className="
absolute
bottom-5
left-5
h-[170px]
w-[220px]
overflow-hidden
border-8
border-white
shadow-xl
clip-blueprint
">


<Image

src={blueprint}

alt="blueprint"

fill

className="object-cover"

/>


</div>





</div>







{/* RIGHT */}


<div>


<div className="
flex
items-center
gap-3
uppercase
tracking-[5px]
text-xs
font-bold
text-modura-secondary
mb-4
">
<DraftingCompass
size={24}
className="
text-modura-secondary
"
/>

About Us

</div>





<h2 className="
mt-4
font-heading
text-5xl
lg:text-6xl
font-semibold
text-modura-primary
">


Building Tomorrow

<br/>

<span className="
text-modura-secondary
">

Through Smart Design

</span>


</h2>






<p className="
mt-6
max-w-xl
leading-8
font-body
text-modura-gray-600
">


MODURA Design Group is a multidisciplinary
architecture and engineering consultancy
delivering innovative solutions across
Architecture, BIM, Structural Design and
Project Management.


<br/><br/>


We combine creativity, technology and
technical expertise to create functional,
sustainable and future-ready spaces.


</p>




</div>


</div>


</div>


</section>

   <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-white
        pb-16
      "
    >
      {/* Background architectural details */}

      <div className="pointer-events-none absolute right-0 top-0 h-full w-[35%] opacity-[0.035]">
        <div
          className="
            absolute
            right-[-120px]
            top-20
            h-[400px]
            w-[400px]
            rotate-45
            border
            border-modura-primary
          "
        />

        <div
          className="
            absolute
            right-[-30px]
            top-48
            h-[260px]
            w-[260px]
            rotate-45
            border
            border-modura-secondary
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* =========================
            SECTION HEADING
        ========================== */}

        <div className="mb-14">

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
            <span className="h-[2px] w-12 bg-modura-secondary" />

            <span>
              Our Direction
            </span>
          </div>

          <h2
            className="
              mt-5
              font-heading
              text-5xl
              font-semibold
              leading-[0.9]
              text-modura-primary
              sm:text-6xl
              lg:text-7xl
            "
          >
            Vision
            <span className="text-modura-secondary">
              {" "} & Mission
            </span>
          </h2>

        </div>


        {/* =========================
            VISION + MISSION
        ========================== */}

        <div
          className="
            grid
            gap-8
            lg:grid-cols-2
          "
        >

          {/* =========================
              VISION
          ========================== */}

          <div
            className="
              vision-mission-item
              group
              relative
              min-h-[390px]
              overflow-hidden
              bg-modura-off-white
              clip-vm-card
            "
          >

          


            {/* Watermark */}

            <span
              className="
                pointer-events-none
                absolute
                bottom-[-60px]
                right-[-5px]
                font-heading
                text-[250px]
                font-bold
                leading-none
                text-modura-primary/[0.025]
                transition-all
                duration-700
                group-hover:text-modura-secondary/[0.07]
              "
            >
              V
            </span>


            {/* Orange vertical accent */}

            <div
              className="
                absolute
                left-0
                top-0
                h-full
                w-1
                bg-modura-secondary
                transition-all
                duration-500
                group-hover:w-2
              "
            />


            <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-10 lg:p-12">

              <div>

                {/* Label */}

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

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      bg-modura-primary
                      text-white
                      clip-vm-icon
                    "
                  >
                    <Sparkles size={14} />
                  </span>

                  <span>
                    Our Vision
                  </span>

                </div>


                <h3
                  className="
                    mt-7
                    max-w-md
                    font-heading
                    text-4xl
                    font-semibold
                    leading-[0.95]
                    text-modura-primary
                    sm:text-5xl
                  "
                >
                  Engineering
                  <span className="text-modura-secondary">
                    {" "}Beyond
                  </span>
                  <br />
                  Boundaries
                </h3>


                <p
                  className="
                    mt-6
                    max-w-xl
                    font-body
                    text-sm
                    leading-7
                    text-modura-gray-600
                  "
                >
                  Our vision is to continually push the
                  boundaries of engineering by embracing
                  new technologies and sustainable,
                  cost-effective solutions. We strive to be
                  leaders in the industry, offering
                  high-quality outsourcing services that help
                  our clients achieve their goals while
                  staying within budget.
                </p>

              </div>


              {/* Bottom */}

              <div className="mt-8 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <span
                    className="
                      h-[2px]
                      w-10
                      bg-modura-secondary
                      transition-all
                      duration-500
                      group-hover:w-16
                    "
                  />

                  <span
                    className="
                      font-body
                      text-[9px]
                      uppercase
                      tracking-[3px]
                      text-modura-gray-400
                    "
                  >
                    Direction 01
                  </span>

                </div>


                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    border
                    border-modura-primary/15
                    text-modura-primary
                    transition-all
                    duration-500
                    group-hover:rotate-45
                    group-hover:border-modura-secondary
                    group-hover:bg-modura-secondary
                    group-hover:text-white
                    clip-vm-arrow
                  "
                >
                  <ArrowUpRight
                    size={17}
                    className="
                      transition-transform
                      duration-500
                      group-hover:-rotate-45
                    "
                  />
                </div>

              </div>

            </div>
          </div>


          {/* =========================
              MISSION
          ========================== */}

          <div
            className="
              vision-mission-item
              group
              relative
              min-h-[390px]
              overflow-hidden
              bg-modura-primary
              text-white
              clip-vm-card-reverse
            "
          >

          


            {/* Watermark */}

            <span
              className="
                pointer-events-none
                absolute
                bottom-[-60px]
                right-[-10px]
                font-heading
                text-[250px]
                font-bold
                leading-none
                text-white/[0.035]
                transition-all
                duration-700
                group-hover:text-modura-secondary/[0.09]
              "
            >
              M
            </span>


            {/* Orange accent */}

            <div
              className="
                absolute
                right-0
                top-0
                h-full
                w-1
                bg-modura-secondary
                transition-all
                duration-500
                group-hover:w-2
              "
            />


            <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-10 lg:p-12">

              <div>

                {/* Label */}

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

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      bg-modura-secondary
                      text-white
                      clip-vm-icon
                    "
                  >
                    <Sparkles size={14} />
                  </span>

                  <span>
                    Our Mission
                  </span>

                </div>


                <h3
                  className="
                    mt-7
                    max-w-md
                    font-heading
                    text-4xl
                    font-semibold
                    leading-[0.95]
                    text-white
                    sm:text-5xl
                  "
                >
                  Creating
                  <span className="text-modura-secondary">
                    {" "}Value
                  </span>
                  <br />
                  Through Expertise
                </h3>


                <p
                  className="
                    mt-6
                    max-w-xl
                    font-body
                    text-sm
                    leading-7
                    text-white/65
                  "
                >
                  At MVNL Engineering, our mission is to
                  build strong, integrated partnerships with
                  our clients, working as a seamless extension
                  of their teams. We deliver high-quality,
                  cost-effective structural, architectural,
                  civil engineering, and BIM drafting services
                  that meet timelines and budget needs.
                </p>

              </div>


              {/* Bottom */}

              <div className="mt-8 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <span
                    className="
                      h-[2px]
                      w-10
                      bg-modura-secondary
                      transition-all
                      duration-500
                      group-hover:w-16
                    "
                  />

                  <span
                    className="
                      font-body
                      text-[9px]
                      uppercase
                      tracking-[3px]
                      text-white/40
                    "
                  >
                    Direction 02
                  </span>

                </div>


                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    border
                    border-white/20
                    text-white
                    transition-all
                    duration-500
                    group-hover:rotate-45
                    group-hover:border-modura-secondary
                    group-hover:bg-modura-secondary
                    clip-vm-arrow
                  "
                >
                  <ArrowUpRight
                    size={17}
                    className="
                      transition-transform
                      duration-500
                      group-hover:-rotate-45
                    "
                  />
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
</>

)

}