"use client";
import Image from "next/image";
import Breadcrumb from "@/app/components/Breadcrumb";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  Plus, CircleHelp,
   Building2,
  Compass,
    Award,
  BadgeCheck,
  RefreshCw,
  Check,
  Target,
    Quote,
  Star,
  X,
  BriefcaseBusiness,
  Sparkles,
  ArrowRight,
} from "lucide-react";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
};
import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import {
  Autoplay,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

gsap.registerPlugin(ScrollTrigger);

import about_building from "../assets/images/about-building.jpeg";
import blueprint from "../assets/images/blueprint.jpeg";
import { motion } from "framer-motion";
import our_team from "../assets/images/our_team.jpeg";
import img1 from "../assets/images/why-us1.png";
import img2 from "../assets/images/why-us2.jpeg";
import img3 from "../assets/images/why-us3.jpeg";
import img4 from "../assets/images/why-us4.jpeg";
import img5 from "../assets/images/why-us5.jpeg";
import img6 from "../assets/images/why-us6.jpeg";

import blog1 from "../assets/images/blog1.jpeg";
import blog2 from "../assets/images/blog2.jpeg";
import blog3 from "../assets/images/blog3.jpeg";
import AnimatedButton from "../components/AnimatedButton";
import Link from "next/link";
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


const directors = [
  {
    name: "Dipak Bhavsar",
    role: "CEO",
    image: our_team.src,
    bio: "Leading the organization with a strong focus on strategic growth, engineering excellence and long-term client relationships.",
  },
  {
    name: "M V Rupesh",
    role: "COO",
    image: our_team.src,
    bio: "Focused on operational excellence, project coordination and building efficient processes that support successful project delivery.",
  },
  {
    name: "Nayan Panchal",
    role: "CTO",
    image: our_team.src,
    bio: "Driving technology, engineering workflows and innovative solutions to improve project quality, efficiency and delivery.",
  },
];


const engineers = [
  {
    name: "Trilochan. S Dholakia",
    role: "Sr. Design Manager (Structure)",
    image: our_team.src,
    bio: "Experienced in structural design and project coordination, with a strong focus on accurate and practical engineering solutions.",
  },
  {
    name: "Hardik G. Upadhyay",
    role: "Project Leader",
    image: our_team.src,
    bio: "Responsible for project leadership, coordination and ensuring engineering deliverables meet project requirements and timelines.",
  },
  {
    name: "Sunil Patel",
    role: "Sr. Project Coordinator",
    image: our_team.src,
    bio: "Coordinates project activities and supports teams in maintaining smooth communication, quality and timely delivery.",
  },
  {
    name: "Janak Thakor",
    role: "Sr. Project Leader",
    image: our_team.src,
    bio: "Leads project execution with a focus on technical coordination, team collaboration and dependable project outcomes.",
  },
];


const bde = [
  {
    name: "Divya Rajgor",
    role: "Sr. Business Development Specialist",
    image: our_team.src,
    bio: "Focused on business development, client relationships and identifying opportunities that create long-term value for the organization.",
  },
  {
    name: "Krunal Rathod",
    role: "Business Development Specialist",
    image: our_team.src,
    bio: "Works closely with clients and project teams to understand requirements and develop strong business relationships.",
  },
];


const testimonials = [
  {
    name: "David Anderson",
    role: "Project Director",
    company: "Global Construction Ltd.",
    initials: "DA",
    text:
      "MODURA delivered exceptional architectural and engineering solutions with outstanding precision and professionalism. Their team understood our requirements and consistently delivered beyond expectations.",
  },

  {
    name: "Sophia Williams",
    role: "CEO",
    company: "Urban Developers",
    initials: "SW",
    text:
      "Their BIM coordination and project management approach helped us achieve better efficiency and quality. The entire team was responsive, technically strong and easy to work with.",
  },

  {
    name: "Michael Brown",
    role: "Managing Partner",
    company: "BuildTech International",
    initials: "MB",
    text:
      "A reliable design partner who understands complex projects and delivers innovative solutions. MODURA has become an important extension of our engineering team.",
  },

  {
    name: "James Wilson",
    role: "Development Manager",
    company: "Prime Infrastructure",
    initials: "JW",
    text:
      "The attention to detail and technical expertise demonstrated by the MODURA team made a significant difference to our project delivery.",
  },
];


const faqs = [
  {
    question: "What services does MVNL Engineering provide?",
    answer:
      "We provide architecture, BIM, structural engineering, project management and related engineering solutions.",
  },
  {
    question: "Do you work on international projects?",
    answer:
      "Our multidisciplinary workflow is designed to support projects across different markets and project requirements.",
  },
  {
    question: "Can you support an existing project team?",
    answer:
      "Yes. Our engineering and BIM capabilities can work as an extension of an existing project team.",
  },
  {
    question: "How can I start a project with MVNL Engineering?",
    answer:
      "You can contact our team through the inquiry form and share your project requirements.",
  },
];

const blogs = [

{
date:{
day:"24",
month:"JUN",
year:"2026"
},
title:"How BIM Is Transforming Modern Construction",
desc:"Discover how BIM technology improves coordination, accuracy and project delivery across complex construction projects.",
image:blog1.src
},


{
date:{
day:"18",
month:"MAY",
year:"2026"
},
title:"Future Trends In Project Management",
desc:"Exploring innovative approaches and digital tools that are shaping the future of engineering industry.",
image:blog2.src
},


{
date:{
day:"12",
month:"APR",
year:"2026"
},
title:"Sustainable Engineering For Future Infrastructure",
desc:"Learn how sustainable design and engineering solutions are building greener infrastructure.",
image:blog3.src
}

];
export default function CompanyPage() {
      const sectionRef = useRef<HTMLElement | null>(null);
       const [active, setActive] = useState<number | null>(0);
    
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

     const [selectedMember, setSelectedMember] =
        useState<TeamMember | null>(null);

const qualityPoints = [
  {
    title: "Quality First",
    description:
      "We maintain high standards of accuracy, consistency and reliability throughout every project.",
    icon: ShieldCheck,
  },
  {
    title: "Precision in Delivery",
    description:
      "Every drawing, model and engineering deliverable is carefully reviewed before reaching our clients.",
    icon: Target,
  },
  {
    title: "Skilled Professionals",
    description:
      "Our experienced team combines technical knowledge with practical project understanding.",
    icon: Users,
  },
  {
    title: "Continuous Improvement",
    description:
      "We continuously improve our processes, technology and workflows to deliver better results.",
    icon: RefreshCw,
  },
];



const certifications = [
  {
    title: "Quality Management",
    description:
      "Our quality management standards ensure accuracy, consistency and reliable project delivery.",
    icon: ShieldCheck,
  },
  {
    title: "Engineering Standards",
    description:
      "We follow recognized engineering standards to deliver safe, efficient and high-quality solutions.",
    icon: Award,
  },
  {
    title: "Professional Excellence",
    description:
      "Our professional approach reflects technical expertise, continuous improvement and excellence.",
    icon: BadgeCheck,
  },
];

 const sectiontestimonialRef = useRef<HTMLDivElement>(null);


  useEffect(() => {

    const ctx = gsap.context(() => {

      gsap.from(".testimonial-label", {
        opacity: 0,
        y: 25,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectiontestimonialRef.current,
          start: "top 80%",
        },
      });


      gsap.from(".testimonial-heading", {
        opacity: 0,
        x: -60,
        duration: 1,
        scrollTrigger: {
          trigger: sectiontestimonialRef.current,
          start: "top 75%",
        },
      });


      gsap.from(".testimonial-side-card", {
        opacity: 0,
        y: 50,
        duration: 0.9,
        scrollTrigger: {
          trigger: sectiontestimonialRef.current,
          start: "top 70%",
        },
      });

    }, sectiontestimonialRef);


    return () => ctx.revert();

  }, []);


  const sectionblogRef = useRef<HTMLDivElement | null>(null);
  
  
  
  useLayoutEffect(()=>{
  
  
  const ctx = gsap.context(()=>{
  
  
  gsap.from(".blog-card",
  {
  opacity:0,
  y:70,
  duration:1,
  ease:"power3.out",
  stagger:0.2,
  
  scrollTrigger:{
  trigger:sectionblogRef.current,
  start:"top 75%",
  once:true
  }
  
  });
  
  
  },sectionblogRef);
  
  
  
  return()=>ctx.revert();
  
  
  
  },[]);

  return (
    <main className="min-h-screen bg-white">

      <Breadcrumb title="Company" />

      {/* =========================================
          ABOUT
      ========================================= */}

    <section id="about" className="relative overflow-hidden bg-white pt-16">
    
    
    
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
    
    <div className="mt-9 grid gap-4 sm:grid-cols-2">

              <Feature
                icon={Building2}
                title="Architecture"
              />

              <Feature
                icon={Layers3}
                title="Engineering"
              />

            </div>
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
        py-16
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
      {/* =========================================
          WHY CHOOSE US
      ========================================= */}

    <section
       id="why-us"
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-white
        pb-16
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


      {/* =========================================
          OUR TEAM
      ========================================= */}

    <section id="team" className="relative overflow-hidden bg-white pb-16">
   
           <div className="mx-auto max-w-7xl px-6 lg:px-10">
   
   
             {/* ==================================================
                 INTRO
             ================================================== */}
   
             <div className="grid items-end gap-10 lg:grid-cols-[1fr_0.8fr]">
   
               <div>
   
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
   
                   <Users
                     size={18}
                     strokeWidth={1.5}
                   />
   
                   Our People
   
                 </div>
   
   
                 <h2
                   className="
                     mt-5
                     font-heading
                     text-5xl
                     font-semibold
                     uppercase
                     leading-[0.88]
                     text-modura-primary
                     md:text-6xl
                     lg:text-7xl
                   "
                 >
                   People Behind
   
                   <br />
   
                   <span className="text-modura-secondary">
                     Precision
                   </span>
                 </h2>
   
               </div>
   
   
               <div className="lg:pb-2">
   
                 <div className="border-l-2 border-modura-secondary pl-6">
   
                   <p
                     className="
                       max-w-md
                       font-body
                       text-sm
                       leading-7
                       text-modura-gray-600
                     "
                   >
                     Our strength lies in our people. Engineers,
                     designers, coordinators and business
                     professionals work together to create
                     reliable and innovative solutions.
                   </p>
   
                 </div>
   
               </div>
   
             </div>
   
   
             {/* ==================================================
                 DIRECTORS
             ================================================== */}
   
             <TeamGroup
               title="About the Directors"
               members={directors}
               onViewBio={setSelectedMember}
             />
   
   
             {/* ==================================================
                 ENGINEERS
             ================================================== */}
   
             <TeamGroup
               title="Meet the Engineers"
               members={engineers}
               onViewBio={setSelectedMember}
             />
   
   
             {/* ==================================================
                 BDE
             ================================================== */}
   
             <TeamGroup
               title="Meet the BDE"
               members={bde}
               onViewBio={setSelectedMember}
             />
   
           </div>
   
         </section>
   
   
         {/* ======================================================
             BIO MODAL
         ====================================================== */}
   
         {selectedMember && (
   
           <div
             className="
               fixed
               inset-0
               z-[9999]
               flex
               items-center
               justify-center
               bg-modura-primary/70
               px-4
               py-8
               backdrop-blur-md
             "
             onClick={() => setSelectedMember(null)}
           >
   
             <div
               className="
                 relative
                 w-full
                 max-w-4xl
                 overflow-hidden
                 bg-white
                 shadow-2xl
               "
               onClick={(e) => e.stopPropagation()}
             >
   
   
               {/* TOP ORANGE LINE */}
   
               <div className="h-1 w-full bg-modura-secondary" />
   
   
               {/* CLOSE */}
   
               <button
                 type="button"
                 onClick={() => setSelectedMember(null)}
                 aria-label="Close biography"
                 className="
                   absolute
                   right-5
                   top-5
                   z-10
                   flex
                   h-10
                   w-10
                   items-center
                   justify-center
                   bg-modura-primary
                   text-white
                   transition-all
                   duration-300
                   hover:bg-modura-secondary
                 "
               >
                 <X size={19} />
               </button>
   
   
               {/* ==================================================
                   MODAL CONTENT
               ================================================== */}
   
               <div className="grid md:grid-cols-[0.85fr_1.15fr]">
   
   
                 {/* IMAGE */}
   
                 <div className="relative min-h-[360px] bg-modura-light md:min-h-[500px]">
   
                   <Image
                     src={selectedMember.image}
                     alt={selectedMember.name}
                     fill
                     className="object-cover"
                   />
   
   
                   {/* IMAGE OVERLAY */}
   
                   <div
                     className="
                       absolute
                       inset-0
                       bg-gradient-to-t
                       from-modura-primary/80
                       via-transparent
                       to-transparent
                     "
                   />
   
   
                   {/* ROLE */}
   
                   <div className="absolute bottom-7 left-7">
   
                     <div
                       className="
                         mb-2
                         flex
                         items-center
                         gap-2
                         font-body
                         text-[10px]
                         font-bold
                         uppercase
                         tracking-[3px]
                         text-white
                       "
                     >
                       <BriefcaseBusiness size={13} />
   
                       Modura Team
                     </div>
   
   
                     <p
                       className="
                         max-w-xs
                         font-body
                         text-lg
                         font-semibold
                         uppercase
                         tracking-[1px]
                         text-white
                       "
                     >
                       {selectedMember.role}
                     </p>
   
                   </div>
   
                 </div>
   
   
                 {/* CONTENT */}
   
                 <div className="relative flex flex-col justify-center p-8 md:p-12 lg:p-14">
   
   
                   {/* SMALL LABEL */}
   
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
   
                     <span className="h-[2px] w-8 bg-modura-secondary" />
   
                     Team Profile
   
                   </div>
   
   
                   {/* NAME */}
   
                   <h3
                     className="
                       mt-5
                       max-w-xl
                       font-heading
                       text-4xl
                       font-semibold
                       uppercase
                       leading-[0.95]
                       text-modura-primary
                       md:text-5xl
                     "
                   >
                     {selectedMember.name}
                   </h3>
   
   
                   {/* DESIGNATION */}
   
                   <p
                     className="
                       mt-4
                       font-body
                       text-xs
                       font-bold
                       uppercase
                       tracking-[2px]
                       text-modura-secondary
                     "
                   >
                     {selectedMember.role}
                   </p>
   
   
                   {/* DIVIDER */}
   
                   <div className="my-7 h-px w-full bg-modura-gray-200" />
   
   
                   {/* BIO */}
   
                   <p
                     className="
                       max-w-xl
                       font-body
                       text-sm
                       leading-8
                       text-modura-gray-600
                     "
                   >
                     {selectedMember.bio}
                   </p>
   
   
                   {/* BOTTOM */}
   
                   <div
                     className="
                       mt-8
                       flex
                       items-center
                       gap-3
                       border-t
                       border-modura-gray-200
                       pt-5
                     "
                   >
   
                     <span className="h-[3px] w-10 bg-modura-secondary" />
   
                     <span
                       className="
                         font-body
                         text-[9px]
                         font-bold
                         uppercase
                         tracking-[3px]
                         text-modura-gray-400
                       "
                     >
                       Engineering With Precision
                     </span>
   
                   </div>
   
                 </div>
   
               </div>
   
   
               {/* BOTTOM ORANGE BAR */}
   
               <div className="h-[3px] w-full bg-modura-secondary" />
   
             </div>
   
           </div>
   
         )}
   
      {/* =========================================
          QUALITY POLICY
      ========================================= */}

     <section  id="certifications" className="relative overflow-hidden bg-white pb-16">

      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* =========================
            HEADER
        ========================== */}

     <div className="mx-auto  text-center">

  <div className="flex items-center justify-center gap-3">

    <span className="h-[2px] w-10 bg-modura-secondary" />

    <span
      className="
        font-body
        text-[11px]
        font-bold
        uppercase
        tracking-[4px]
        text-modura-secondary
      "
    >
      Our Commitment
    </span>

    <span className="h-[2px] w-10 bg-modura-secondary" />

  </div>


  <h2
    className="
      mt-5
      font-heading
      text-5xl
      font-semibold
      uppercase
      leading-[0.95]
      text-modura-primary
      md:text-6xl
      lg:text-7xl
    "
  >
    Quality
    <span className="ml-2 text-modura-secondary">
      Policy
    </span>
  </h2>


  <p
    className="
      mx-auto
      mt-6
      max-w-5xl
      font-body
      text-sm
      leading-7
      text-modura-gray-600
    "
  >
    We are committed to maintaining high standards of
    quality, accuracy and reliability throughout every
    stage of our projects. Our approach combines
    experienced professionals, disciplined processes
    and continuous improvement.
  </p>

</div>

        {/* =========================
            VERTICAL CARDS
        ========================== */}

        <div
          className="
            mt-16
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          {qualityPoints.map((item, index) => {

            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  group
                  relative
                  flex
                  min-h-[250px]
                  flex-col
                  overflow-hidden
                  border
                  border-modura-gray-200
                  bg-white
                  p-7
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-modura-secondary
                  hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                "
              >

                {/* Orange top accent */}

                <div
                  className="
                    absolute
                    left-0
                    top-0
                    h-[4px]
                    w-0
                    bg-modura-secondary
                    transition-all
                    duration-500
                    group-hover:w-full
                  "
                />


                {/* Number */}

                <div className="flex items-start justify-end">


                  {/* Icon */}

                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      border
                      border-modura-gray-200
                      bg-modura-light
                      text-modura-secondary
                      transition-all
                      duration-500
                      group-hover:border-modura-secondary
                      group-hover:bg-modura-secondary
                      group-hover:text-white
                      group-hover:rotate-6
                    "
                  >
                    <Icon
                      size={25}
                      strokeWidth={1.5}
                    />
                  </div>

                </div>




                {/* Title */}

                <h3
                  className="
                    mt-3
                    font-heading
                    text-2xl
                    font-semibold
                    uppercase
                    leading-[1]
                    text-modura-primary
                  "
                >
                  {item.title}
                </h3>


                {/* Description */}

                <p
                  className="
                    mt-5
                    font-body
                    text-sm
                    leading-7
                    text-modura-gray-600
                  "
                >
                  {item.description}
                </p>



              </div>
            );
          })}

        </div>


      </div>

    </section>

      {/* =========================================
          CERTIFICATIONS
      ========================================= */}

    <section className="bg-modura-light py-16">

      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Heading */}

        <div className="text-center">

          <div
            className="
              flex
              items-center
              justify-center
              gap-3
              font-body
              text-[10px]
              font-bold
              uppercase
              tracking-[4px]
              text-modura-secondary
            "
          >
            <span className="h-[2px] w-8 bg-modura-secondary" />

            <BadgeCheck
              size={17}
              strokeWidth={1.5}
            />

            <span>Standards</span>

            <span className="h-[2px] w-8 bg-modura-secondary" />
          </div>


          <h2
            className="
              mt-4
              font-heading
              text-5xl
              font-semibold
              uppercase
              leading-none
              text-modura-primary
              md:text-6xl
            "
          >
            Certifications
          </h2>


          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              font-body
              text-sm
              leading-7
              text-modura-gray-700
            "
          >
            Our commitment to quality, technical standards and
            professional excellence supports reliable project delivery.
          </p>

        </div>


        {/* Cards */}

        <div
          className="
            mt-12
            grid
            gap-6
            md:grid-cols-3
          "
        >

          {certifications.map((item) => {

            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  group
                  bg-white
                  p-8
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-xl
                "
              >

                {/* Icon */}

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    bg-modura-primary
                    text-modura-secondary
                    transition-all
                    duration-300
                    group-hover:bg-modura-secondary
                    group-hover:text-white
                  "
                >
                  <Icon
                    size={28}
                    strokeWidth={1.5}
                  />
                </div>


              


                {/* Title */}

                <h3
                  className="
                    mt-5
                    font-heading
                    text-2xl
                    font-semibold
                    uppercase
                    leading-tight
                    text-modura-primary
                  "
                >
                  {item.title}
                </h3>


                {/* Description */}

                <p
                  className="
                    mt-4
                    font-body
                    text-sm
                    leading-7
                    text-modura-gray-600
                  "
                >
                  {item.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>

      {/* =========================================
          TESTIMONIALS
      ========================================= */}

     <section
       id="testimonials"
      ref={sectiontestimonialRef}
      className="
        relative
        overflow-hidden
        bg-modura-off-white
        py-16
      "
    >

      {/* =========================================
          DECORATIVE ARCHITECTURE
      ========================================= */}

      <div
        className="
          pointer-events-none
          absolute
          right-[-140px]
          top-[-120px]
          h-[420px]
          w-[420px]
          rotate-45
          border
          border-modura-secondary/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-[-80px]
          top-[-60px]
          h-[300px]
          w-[300px]
          rotate-45
          border
          border-modura-primary/5
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-px
          w-[40%]
          bg-modura-secondary/30
        "
      />


      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-6
          lg:px-10
        "
      >

        {/* =========================================
            HEADER
        ========================================= */}

        <div
          className="
            grid
            items-end
            gap-10
            lg:grid-cols-[1fr_350px]
          "
        >

          <div>

            <div
              className="
                testimonial-label
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
                  h-[2px]
                  w-10
                  bg-modura-secondary
                "
              />

              <Users
                size={17}
                strokeWidth={1.5}
              />

              Client Stories

            </div>


            <h2
              className="
                testimonial-heading
                mt-5
                max-w-3xl
                font-heading
                text-5xl
                font-semibold
                uppercase
                leading-[0.88]
                text-modura-primary
                md:text-6xl
                lg:text-7xl
              "
            >

              Trusted By

              <br />

              <span className="text-modura-secondary">
                Industry Leaders
              </span>

            </h2>

          </div>


          {/* RIGHT INTRO */}

          <div className="testimonial-side-card">

            <p
              className="
                font-body
                text-sm
                leading-7
                text-modura-gray-600
              "
            >
              Strong partnerships are at the heart of
              everything we do. Here is what our clients
              say about working with our architecture and
              engineering team.
            </p>


            <div
              className="
                mt-5
                h-[2px]
                w-14
                bg-modura-secondary
              "
            />

          </div>

        </div>


        {/* =========================================
            TESTIMONIAL AREA
        ========================================= */}

        <div
          className="
            mt-14
            grid
            gap-8
            lg:grid-cols-[180px_1fr]
            xl:grid-cols-[210px_1fr]
          "
        >

          {/* LEFT QUOTE PANEL */}

          <div
            className="
              relative
              hidden
              min-h-[430px]
              overflow-hidden
              bg-modura-primary
              lg:block
              clip-testimonial-side
            "
          >

            <div
              className="
                absolute
                left-7
                top-7
                h-14
                w-14
                border
                border-modura-secondary
                text-modura-secondary
                flex
                items-center
                justify-center
              "
            >

              <Quote
                size={25}
                strokeWidth={1.4}
              />

            </div>


            <div
              className="
                absolute
                bottom-8
                left-7
                right-7
              "
            >

             

              <p
                className="
                  mt-3
                  font-body
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[3px]
                  text-modura-light
                "
              >
                Client Perspective
              </p>

            </div>

          </div>


          {/* SLIDER */}

          <div className="min-w-0">

            <Swiper
              modules={[
                Autoplay,
                EffectFade,
              ]}
              effect="fade"
              fadeEffect={{
                crossFade: true,
              }}
              slidesPerView={1}
              loop
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
              }}
              speed={900}
            >

              {testimonials.map((item, index) => (

                <SwiperSlide key={item.name}>

                  <div
                    className="
                      relative
                      min-h-[430px]
                      overflow-hidden
                      border
                      border-modura-gray-200
                      bg-white
                      p-8
                      md:p-12
                      lg:p-14
                    "
                  >

                    {/* Orange corner */}

                    <div
                      className="
                        absolute
                        right-0
                        top-0
                        h-20
                        w-20
                        bg-modura-secondary
                        clip-testimonial-corner
                      "
                    />


                    {/* Big quote */}

                    <div
                      className="
                        absolute
                        right-10
                        top-7
                        font-heading
                        text-[110px]
                        leading-none
                        text-modura-secondary/10
                      "
                    >
                      "
                    </div>


                    {/* Number */}

                    <div
                      className="
                        absolute
                        right-7
                        top-[76px]
                        font-body
                        text-[10px]
                        font-bold
                        tracking-[2px]
                        text-modura-gray-400
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                      {" / "}
                      {String(testimonials.length).padStart(2, "0")}
                    </div>


                    {/* Content */}

                    <div className="relative z-10 max-w-3xl">

                      <div
                        className="
                          flex
                          items-center
                          gap-1
                          text-modura-secondary
                        "
                      >

                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={15}
                            fill="currentColor"
                            strokeWidth={1}
                          />
                        ))}

                      </div>


                      <p
                        className="
                          mt-8
                          font-heading
                          text-3xl
                          font-medium
                          leading-[1.25]
                          text-modura-primary
                          md:text-4xl
                        "
                      >
                        “{item.text}”
                      </p>

                    </div>


                    {/* Bottom */}

                    <div
                      className="
                        absolute
                        bottom-0
                        left-0
                        right-0
                        border-t
                        border-modura-gray-200
                        bg-modura-off-white
                        px-8
                        py-6
                        md:px-12
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          gap-5
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-4
                          "
                        >

                          {/* Initials */}

                          <div
                            className="
                              flex
                              h-12
                              w-12
                              shrink-0
                              items-center
                              justify-center
                              bg-modura-primary
                              font-heading
                              text-lg
                              font-semibold
                              text-white
                              clip-testimonial-avatar
                            "
                          >
                            {item.initials}
                          </div>


                          <div>

                            <h3
                              className="
                                font-heading
                                text-xl
                                font-semibold
                                uppercase
                                leading-none
                                text-modura-primary
                              "
                            >
                              {item.name}
                            </h3>


                            <p
                              className="
                                mt-1
                                font-body
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[1.5px]
                                text-modura-secondary
                              "
                            >
                              {item.role}
                            </p>

                          </div>

                        </div>


                        {/* Company */}

                        <div
                          className="
                            hidden
                            text-right
                            sm:block
                          "
                        >

                          <p
                            className="
                              font-body
                              text-[11px]
                              font-bold
                              uppercase
                              tracking-[2px]
                              text-modura-gray-700
                            "
                          >
                            Project Partner
                          </p>

                          <p
                            className="
                              mt-1
                              font-heading
                              text-lg
                              font-semibold
                              uppercase
                              text-modura-primary
                            "
                          >
                            {item.company}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </SwiperSlide>

              ))}

            </Swiper>


            {/* =================================
                BOTTOM CTA
            ================================= */}

            <div
              className="
                mt-5
                flex
                items-center
                justify-between
                border-t
                border-modura-gray-200
                pt-5
              "
            >

              <p
                className="
                  font-body
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[2px]
                  text-modura-gray-600
                "
              >
                Building partnerships that last
              </p>


              <button
                className="
                  group
                  flex
                  items-center
                  gap-3
                  font-body
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[2px]
                  text-modura-primary
                  transition-colors
                  hover:text-modura-secondary
                "
              >

                Start Your Project

                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    bg-modura-primary
                    text-white
                    transition-all
                    duration-300
                    group-hover:bg-modura-secondary
                  "
                >

                  <ArrowUpRight
                    size={14}
                  />

                </span>

              </button>

            </div>

          </div>

        </div>

      </div>

    </section>


      {/* =========================================
          FAQ
      ========================================= */}

      <section  id="faqs" className="relative overflow-hidden bg-white py-16">

      <div className="mx-auto max-w-5xl px-6 lg:px-10">

        {/* Heading */}

        <div className="mb-12 text-center">

          <div
            className="
              mb-4
              flex
              items-center
              justify-center
              gap-3
              font-body
              text-[12px]
              font-bold
              uppercase
              tracking-[4px]
              text-modura-secondary
            "
          >
            <span className="h-[2px] w-8 bg-modura-secondary" />

           
<DraftingCompass
size={24}
className="
text-modura-secondary
"
/>
            <span>FAQ</span>

            <span className="h-[2px] w-8 bg-modura-secondary" />
          </div>

          <h2
            className="
              font-heading
              text-5xl
              font-semibold
              uppercase
              leading-none
              text-modura-primary
              md:text-6xl
            "
          >
            Frequently Asked
            <span className="text-modura-secondary"> Questions</span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              font-body
              text-sm
              leading-7
              text-modura-gray-700
            "
          >
            Find answers to some of the most common questions
            about our services and project process.
          </p>

        </div>


        {/* FAQ LIST */}

        <div className="border-t border-modura-gray-200">

          {faqs.map((faq, index) => {

            const isOpen = active === index;

            return (
              <div
                key={faq.question}
                className="
                  relative
                  border-b
                  border-modura-gray-200
                "
              >

                {/* Orange active line */}

                <span
                  className={`
                    absolute
                    left-0
                    top-0
                    h-full
                    w-[3px]
                    bg-modura-secondary
                    transition-transform
                    duration-300
                    origin-top
                    ${
                      isOpen
                        ? "scale-y-100"
                        : "scale-y-0"
                    }
                  `}
                />


                {/* Question */}

                <button
                  type="button"
                  onClick={() =>
                    setActive(isOpen ? null : index)
                  }
                  className="
                    flex
                    w-full
                    items-center
                    gap-5
                    px-5
                    py-6
                    text-left
                    transition-all
                    duration-300
                    hover:bg-modura-off-white
                    md:px-7
                  "
                >

                  {/* Number */}

                  <span
  className={`
    flex
    h-9
    w-9
    shrink-0
    items-center
    justify-center
    transition-all
    duration-300
    ${
      isOpen
        ? "bg-modura-secondary text-white"
        : "bg-modura-light text-modura-gray-500"
    }
  `}
>
  <CircleHelp
    size={17}
    strokeWidth={1.5}
    className="
      transition-transform
      duration-300
      group-hover:scale-110
    "
  />
</span>


                  {/* Question */}

                  <span
                    className={`
                      flex-1
                      font-heading
                      text-xl
                      font-semibold
                      uppercase
                      leading-tight
                      transition-colors
                      duration-300
                      md:text-2xl
                      ${
                        isOpen
                          ? "text-modura-primary"
                          : "text-modura-primary/80"
                      }
                    `}
                  >
                    {faq.question}
                  </span>


                  {/* Plus */}

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
                        isOpen
                          ? "border-modura-secondary bg-modura-secondary text-white"
                          : "border-modura-gray-300 text-modura-primary"
                      }
                    `}
                  >
                    <Plus
                      size={17}
                      strokeWidth={1.5}
                      className={`
                        transition-transform
                        duration-300
                        ${
                          isOpen
                            ? "rotate-45"
                            : "rotate-0"
                        }
                      `}
                    />
                  </span>

                </button>


                {/* Answer */}

                <div
                  className={`
                    grid
                    transition-all
                    duration-300
                    ${
                      isOpen
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }
                  `}
                >

                  <div className="overflow-hidden">

                    <div
                      className="
                        pb-7
                        pl-[60px]
                        pr-14
                        md:pl-[75px]
                        md:pr-20
                      "
                    >

                      <p
                        className="
                          max-w-3xl
                          font-body
                          text-sm
                          leading-7
                          text-modura-gray-600
                        "
                      >
                        {faq.answer}
                      </p>

                    </div>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>

 {/* =========================================
          Blog
      ========================================= */}
<section
id="blog"
ref={sectionblogRef}

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
    mb-14
    flex
    flex-col
    gap-7
    lg:flex-row
    lg:items-end
    lg:justify-between
  "
>
  {/* LEFT — HEADING */}

  <div>
    <div
      className="
        flex
        items-center
        gap-3
        font-body
        text-xs
        font-bold
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

      <span>
        OUR BLOG
      </span>
    </div>

    <h2
      className="
        mt-4
        font-heading
        text-5xl
        font-semibold
        leading-none
        text-modura-primary
        lg:text-6xl
      "
    >
      Engineering

      <span className="ml-3 text-modura-secondary">
        Insights
      </span>
    </h2>
  </div>


  {/* RIGHT — ANIMATED BUTTON */}

  <div className="lg:pb-1">
    <AnimatedButton
      href="/blog"
      title="View More"
    />
  </div>

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
blogs.map((blog,index)=>(



<motion.article


key={index}


whileHover={{
y:-12
}}


transition={{
duration:.35
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


   <Link
                                        href="blogDetail">

{/* IMAGE */}



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
mb-3
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


function Feature({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {

  return (
    <div
      className="
        flex
        items-center
        gap-4
        border
        border-modura-gray-200
        p-4
        transition-all
        duration-300
        hover:border-modura-secondary
      "
    >

      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          bg-modura-light
          text-modura-secondary
        "
      >
        <Icon size={20} strokeWidth={1.5} />
      </div>

      <span
        className="
          font-heading
          text-xl
          font-semibold
          uppercase
          text-modura-primary
        "
      >
        {title}
      </span>

    </div>
  );
}

function TeamGroup({
  title,
  members,
  onViewBio,
}: {
  title: string;
  members: TeamMember[];
  onViewBio: (member: TeamMember) => void;
}) {

  return (

    <div className="mt-20 lg:mt-24">


      {/* GROUP HEADER */}

      <div className="mb-8 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <span className="h-[3px] w-10 bg-modura-secondary" />

          <h3
            className="
              font-heading
              text-3xl
              font-semibold
              uppercase
              leading-none
              text-modura-primary
              md:text-4xl
            "
          >
            {title}
          </h3>

        </div>


        <span
          className="
            hidden
            font-body
            text-[9px]
            font-bold
            uppercase
            tracking-[3px]
            text-modura-gray-400
            sm:block
          "
        >
          {String(members.length).padStart(2, "0")} Members
        </span>

      </div>


      {/* TEAM GRID */}

      <div
        className="
          grid
          gap-5
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >

        {members.map((member, index) => (

          <article
            key={member.name}
            className="
              group
              relative
              overflow-hidden
              bg-modura-light
              transition-all
              duration-500
              hover:-translate-y-2
              hover:shadow-xl
            "
          >


            {/* IMAGE */}

            <div
              className="
                relative
                h-[360px]
                overflow-hidden
              "
            >

              <Image
                src={member.image}
                alt={member.name}
                fill
                className="
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
              />


              {/* OVERLAY */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-modura-primary/90
                  via-modura-primary/10
                  to-transparent
                "
              />

              {/* ORANGE CORNER */}

              <div
                className="
                  absolute
                  right-0
                  top-0
                  h-16
                  w-16
                  bg-modura-secondary
                "
                style={{
                  clipPath:
                    "polygon(100% 0, 100% 100%, 0 0)",
                }}
              />


              {/* VIEW BIO ON IMAGE */}

              <button
                type="button"
                onClick={() => onViewBio(member)}
                className="
                  absolute
                  bottom-5
                  right-5
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  bg-white
                  text-modura-primary
                  transition-all
                  duration-300
                  hover:bg-modura-secondary
                  hover:text-white
                "
                aria-label={`View bio of ${member.name}`}
              >

                <ArrowUpRight
                  size={18}
                  strokeWidth={1.5}
                />

              </button>


              {/* NAME ON IMAGE */}

              <div
                className="
                  absolute
                  bottom-5
                  left-5
                  right-16
                "
              >

                <h4
                  className="
                    font-heading
                    text-2xl
                    font-semibold
                    uppercase
                    leading-none
                    text-white
                  "
                >
                  {member.name}
                </h4>


                <p
                  className="
                    mt-2
                    font-body
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[1.5px]
                    text-modura-secondary
                  "
                >
                  {member.role}
                </p>

              </div>

            </div>


            {/* BOTTOM LINE */}

            <div className="h-[3px] w-0 bg-modura-secondary transition-all duration-500 group-hover:w-full" />

          </article>

        ))}

      </div>

    </div>
  );
}