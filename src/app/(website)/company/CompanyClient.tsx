"use client";
import Image from "next/image";
import Breadcrumb from "../../../components/Breadcrumb";
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
    Award,
  BadgeCheck,
  RefreshCw,
  Target,
  X,
  BriefcaseBusiness,
  Sparkles,
  ArrowRight,
} from "lucide-react";
gsap.registerPlugin(ScrollTrigger);
import about_building from "../assets/images/about-building.jpeg";
import blueprint from "../assets/images/blueprint.jpeg";
import { motion } from "framer-motion";
import img1 from "../assets/images/why-us1.png";
import img2 from "../assets/images/why-us2.jpeg";
import img3 from "../assets/images/why-us3.jpeg";
import img4 from "../assets/images/why-us4.jpeg";
import img5 from "../assets/images/why-us5.jpeg";
import img6 from "../assets/images/why-us6.jpeg";
import AnimatedButton from "../../../components/AnimatedButton";
import Link from "next/link";
import axios from "axios";
import { apiUrl } from "../config";
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
 type FAQ = {
  id: number;
  question: string;
  answer: string;
};
interface Blog {
  id: number;
  title: string;
  slug: string;
  author: string;
  image: string;
  imageUrl: string;
  publishedAt: string;
  categoryId: number;
  serviceId: number;
  softwareId: number;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  service?: {
    id: number;
    title: string;
    slug: string;
  };
  software?: {
    id: number;
    name: string;
    slug: string;
  };
}
interface Certification {
  id: number;
  title: string;
  issuedBy: string;
  year: number;
  description: string;
  file: string;
  fileUrl: string;
}
interface TeamMember {
  id: number;
  name: string;
  designation: string;
  bio: string;
  photo: string;
  linkedinUrl: string | null;
  socialUrl: string | null;
  photoUrl: string;
}
export default function CompanyPage() {
 const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
const [teamLoading, setTeamLoading] = useState(true);
const [blogs, setBlogs] = useState<Blog[]>([]);
const [blogLoading, setBlogLoading] = useState(true);
const [faqs, setFaqs] = useState<FAQ[]>([]);
const [faqLoading, setFaqLoading] = useState(true);
const [faqError, setFaqError] = useState(false);
const [active, setActive] = useState<number | null>(0);
      const sectionRef = useRef<HTMLElement | null>(null);
        const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${apiUrl}/certifications`
        );
        if (
          response.data?.success &&
          Array.isArray(response.data?.data)
        ) {
          setCertifications(response.data.data);
        } else {
          setCertifications([]);
        }
      } catch (error) {
        console.error(
          "Certification API Error:",
          error
        );
        setCertifications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCertifications();
  }, []);
     useEffect(() => {
      const ctx = gsap.context(() => {

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
  useEffect(() => {
    if (!selectedMember) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedMember(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedMember]);
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
  useEffect(() => {
  const fetchFAQs = async () => {
    try {
      setFaqLoading(true);
      setFaqError(false);
      const response = await axios.post(
        `${apiUrl}/faqs`
      );
      if (response.data?.success && Array.isArray(response.data?.data)) {
        setFaqs(response.data.data);
        setActive(response.data.data.length > 0 ? 0 : null);
      } else {
        setFaqs([]);
        setFaqError(true);
      }
    } catch (error) {
      console.error("FAQ API Error:", error);
      setFaqs([]);
      setFaqError(true);
    } finally {
      setFaqLoading(false);
    }
  };
  fetchFAQs();
}, []);
useEffect(() => {
  const fetchBlogs = async () => {
    try {
      setBlogLoading(true);
      const response = await axios.post(
        `${apiUrl}/blogs`,
        {
          params: {
            search: "",
            category: "",
            page: 1,
            limit: 10,
          },
        }
      );
      if (
        response.data?.success &&
        Array.isArray(response.data?.data?.items)
      ) {
        setBlogs(response.data.data.items);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error("Blog API Error:", error);
      setBlogs([]);
    } finally {
      setBlogLoading(false);
    }
  };
  fetchBlogs();
}, []);
const getPlainText = (html: string = ""): string => {
  if (!html) return "";
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent
    ?.replace(/\s+/g, " ")
    .trim() || "";
};
const getShortDescription = (
  description: string = ""
): string => {
  const text = getPlainText(description);
  if (text.length <= 80) {
    return text;
  }
  return `${text.substring(0, 80).trim()}...`;
};
useEffect(() => {
  const fetchTeam = async () => {
    try {
      setTeamLoading(true);
      const response = await axios.post(
        `${apiUrl}/team`
      );
      if (
        response.data?.success &&
        Array.isArray(response.data?.data)
      ) {
        setTeamMembers(response.data.data);
      } else {
        setTeamMembers([]);
      }
    } catch (error) {
      console.error("Team API Error:", error);
      setTeamMembers([]);
    } finally {
      setTeamLoading(false);
    }
  };
  fetchTeam();
}, []);
  return (
    <main className="min-h-screen w-full min-w-0 overflow-x-clip bg-white">
      <Breadcrumb title="Company" />

    <section id="about" className="relative overflow-hidden bg-white pt-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
    <div className="grid items-center gap-7 sm:gap-12 lg:grid-cols-2">

    <div className="relative h-[310px] min-w-0 sm:h-[410px] lg:h-[500px]">

    <div className="absolute left-[10%] top-0 h-[270px] w-[85%] sm:left-16 sm:h-[350px] sm:w-[min(450px,85%)] lg:h-[390px] overflow-hidden clip-main">
    <Image
    src={about_building}
    alt="building"
    fill
    className="object-cover"
    />
    </div>

    <div className="absolute bottom-2 left-0 h-[120px] w-[150px] sm:bottom-5 sm:left-5 sm:h-[170px] sm:w-[220px] overflow-hidden border-8 border-white shadow-xl clip-blueprint">
    <Image
    src={blueprint}
    alt="blueprint"
    fill
    className="object-cover"
    />
    </div>
    </div>

    <div>
    <div className="flex items-center gap-3 uppercase tracking-[5px] text-xs font-bold text-modura-secondary mb-4">
    <DraftingCompass
    size={24}
    className="text-modura-secondary"
    />
    About Us
    </div>
    <h2 className="mt-4 font-heading text-[clamp(32px,8vw,48px)] lg:text-5xl font-semibold leading-[1.1] text-modura-primary">
    Building Tomorrow
    <br/>
    <span className="text-modura-secondary">
    Through Smart Design
    </span>
    </h2>
    <p className="mt-6 max-w-xl leading-8 font-body text-modura-gray-600">
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
      className="relative overflow-hidden bg-white py-16"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[35%] opacity-[0.035]">
        <div
          className="absolute right-[-120px] top-20 h-[400px] w-[400px] rotate-45 border border-modura-primary"
        />
        <div
          className="absolute right-[-30px] top-48 h-[260px] w-[260px] rotate-45 border border-modura-secondary"
        />
      </div>
      <div className="relative mx-auto max-w-full px-4 md:px-6 lg:px-10 2xl:px-16">

        <div className="mb-14">
          <div
            className="flex items-center gap-3 font-body text-[10px] font-bold uppercase tracking-[4px] text-modura-secondary"
          >
            <span className="h-[2px] w-12 bg-modura-secondary" />
            <span>
              Our Direction
            </span>
          </div>
          <h2
            className="mt-5 font-heading text-[clamp(32px,8vw,48px)] font-semibold leading-[0.9] text-modura-primary lg:text-5xl"
          >
            Vision
            <span className="text-modura-secondary">
              {" "} & Mission
            </span>
          </h2>
        </div>

        <div
          className="grid gap-8 lg:grid-cols-2"
        >

          <div
            className="vision-mission-item group relative min-h-[390px] overflow-hidden bg-modura-off-white clip-vm-card"
          >

            <span
              className="pointer-events-none absolute bottom-[-60px] right-[-5px] font-heading text-[250px] font-bold leading-none text-modura-primary/[0.025] transition-all duration-700 group-hover:text-modura-secondary/[0.07]"
            >
              V
            </span>

            <div
              className="absolute left-0 top-0 h-full w-1 bg-modura-secondary transition-all duration-500 group-hover:w-2"
            />
            <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-10 lg:p-12">
              <div>

                <div
                  className="flex items-center gap-3 font-body text-[10px] font-bold uppercase tracking-[4px] text-modura-secondary"
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center bg-modura-primary text-white clip-vm-icon"
                  >
                    <Sparkles size={14} />
                  </span>
                  <span>
                    Our Vision
                  </span>
                </div>
                <h3
                  className="mt-7 max-w-md font-heading text-[clamp(28px,7vw,36px)] font-semibold leading-[0.95] text-modura-primary sm:text-"
                >
                  Engineering
                  <span className="text-modura-secondary">
                    {" "}Beyond
                  </span>
                  <br />
                  Boundaries
                </h3>
                <p
                  className="mt-6 max-w-xl font-body text-sm leading-7 text-modura-gray-600"
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

              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="h-[2px] w-10 bg-modura-secondary transition-all duration-500 group-hover:w-16"
                  />
                  <span
                    className="font-body text-[9px] uppercase tracking-[3px] text-modura-gray-400"
                  >
                    Direction 01
                  </span>
                </div>
                <div
                  className="flex h-10 w-10 items-center justify-center border border-modura-primary/15 text-modura-primary transition-all duration-500 group-hover:rotate-45 group-hover:border-modura-secondary group-hover:bg-modura-secondary group-hover:text-white clip-vm-arrow"
                >
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-500 group-hover:-rotate-45"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="vision-mission-item group relative min-h-[390px] overflow-hidden bg-modura-primary text-white clip-vm-card-reverse"
          >

            <span
              className="pointer-events-none absolute bottom-[-60px] right-[-10px] font-heading text-[250px] font-bold leading-none text-white/[0.035] transition-all duration-700 group-hover:text-modura-secondary/[0.09]"
            >
              M
            </span>

            <div
              className="absolute right-0 top-0 h-full w-1 bg-modura-secondary transition-all duration-500 group-hover:w-2"
            />
            <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-10 lg:p-12">
              <div>

                <div
                  className="flex items-center gap-3 font-body text-[10px] font-bold uppercase tracking-[4px] text-modura-secondary"
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center bg-modura-secondary text-white clip-vm-icon"
                  >
                    <Sparkles size={14} />
                  </span>
                  <span>
                    Our Mission
                  </span>
                </div>
                <h3
                  className="mt-7 max-w-md font-heading text-[clamp(28px,7vw,36px)] font-semibold leading-[0.95] text-white"
                >
                  Creating
                  <span className="text-modura-secondary">
                    {" "}Value
                  </span>
                  <br />
                  Through Expertise
                </h3>
                <p
                  className="mt-6 max-w-xl font-body text-sm leading-7 text-white/65"
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

              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="h-[2px] w-10 bg-modura-secondary transition-all duration-500 group-hover:w-16"
                  />
                  <span
                    className="font-body text-[9px] uppercase tracking-[3px] text-white/40"
                  >
                    Direction 02
                  </span>
                </div>
                <div
                  className="flex h-10 w-10 items-center justify-center border border-white/20 text-white transition-all duration-500 group-hover:rotate-45 group-hover:border-modura-secondary group-hover:bg-modura-secondary clip-vm-arrow"
                >
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-500 group-hover:-rotate-45"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
       id="why-us"
      ref={sectionRef}
      className="relative overflow-hidden bg-white pb-16"
    >

      <div
        className="pointer-events-none absolute right-0 top-0 h-[620px] w-[42%] overflow-hidden"
      >

        <div
          className="absolute right-[-80px] top-[-100px] h-[480px] w-[480px] rotate-45 border border-modura-gray-200 opacity-40"
        />
        <div
          className="absolute right-[40px] top-[80px] h-[280px] w-[280px] rotate-45 border border-modura-secondary opacity-10"
        />

        <div
          className="absolute right-[40px] top-0 h-[120px] w-[180px] bg-modura-secondary opacity-[0.08] clip-why-orange"
        />
      </div>
      <div className="relative mx-auto max-w-full px-4 md:px-6 lg:px-10 2xl:px-16">

        <div
          className="why-top-content grid items-end gap-12 lg:grid-cols-12"
        >

          <div className="lg:col-span-6">

            <div
              className="flex items-center gap-3 font-body text-[10px] font-bold uppercase tracking-[4px] text-modura-secondary"
            >
              <span className="h-[2px] w-10 bg-modura-secondary" />
              <span>
                Why Us
              </span>
            </div>

            <h2
              className="mt-6 max-w-2xl font-heading text-[clamp(38px,10vw,58px)] font-semibold uppercase leading-[0.82] tracking-tight text-modura-primary sm:text-[75px] lg:text-[84px]"
            >
              Why Choose
              <br />
              <span className="text-modura-secondary">
                MVNL
              </span>
              {" "}Engineering?
            </h2>

            <div className="mt-7 flex items-center gap-4">
              <span className="h-[1px] w-14 bg-modura-primary" />
              <span
                className="font-body text-[9px] font-semibold uppercase tracking-[3px] text-modura-gray-400"
              >
                Built on expertise • Driven by trust
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 lg:pb-1">
            <div className="max-w-xl">
              <div
                className="mb-6 flex items-center gap-4"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center bg-modura-primary text-white clip-why-icon"
                >
                  <DraftingCompass
                    size={22}
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <p
                    className="font-heading text-xl font-semibold uppercase text-modura-primary"
                  >
                    Our Advantage
                  </p>
                  <p
                    className="font-body text-[12px] uppercase tracking-[3px] text-modura-black"
                  >
                    Engineering Excellence
                  </p>
                </div>
              </div>
              <p
                className="font-body text-sm leading-7 text-modura-gray-600 sm:text-[15px]"
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

              <button
                type="button"
                className="group relative mt-7 flex h-12 items-center gap-5 overflow-hidden bg-modura-primary px-6 font-body text-xs font-semibold text-white clip-why-button"
              >
                <span
                  className="absolute inset-0 origin-left scale-x-0 bg-modura-secondary transition-transform duration-500 group-hover:scale-x-100"
                />
                <span className="relative z-10">
                  Get a free consultation
                </span>
                <span
                  className="relative z-10 flex h-7 w-7 items-center justify-center border border-white/30 transition-all duration-500 group-hover:rotate-45"
                >
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-500 group-hover:-rotate-45"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div
          className="why-cards-grid mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {advantages.map((item,index) => {
            const Icon = item.icon;
            return (
              <article
                key={index}
                className="why-card group relative min-h-[300px] overflow-hidden border border-modura-gray-200 bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
              >

                <div
                  className="absolute right-0 top-0 h-[145px] w-[48%] overflow-hidden opacity-90 clip-why-image"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >

                  <div
                    className="absolute inset-0 bg-white/20 transition-all duration-500 group-hover:bg-modura-secondary/10"
                  />
                </div>

                <div
                  className="absolute right-[39%] top-[55px] h-[90px] w-[65px] rotate-45 border border-modura-secondary opacity-40 transition-all duration-500 group-hover:scale-110 group-hover:opacity-70"
                />

                <div
                  className="relative z-10 mt-14 flex h-12 w-12 items-center justify-center bg-modura-primary text-white transition-all duration-500 group-hover:bg-modura-secondary clip-why-icon"
                >
                  <Icon
                    size={21}
                    strokeWidth={1.5}
                  />
                </div>

                <div className="relative z-10 mt-7 pr-2">
                  <h3
                    className="font-heading text-xl 2xl:text-3xl font-semibold uppercase leading-none text-modura-primary transition-colors duration-500 group-hover:text-modura-secondary"
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-4 font-body text-[13px] leading-6 text-modura-gray-600"
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

  <section
  id="team"
  className="relative overflow-hidden bg-white pb-16"
>
  <div className="mx-auto max-w-full px-4 md:px-6 lg:px-10 2xl:px-16">

    <div className="grid items-end gap-10 lg:grid-cols-[1fr_0.8fr]">
      <div>
        <div
          className="flex items-center gap-3 font-body text-[10px] font-bold uppercase tracking-[4px] text-modura-secondary"
        >
          <span className="h-[2px] w-10 bg-modura-secondary" />
          <Users
            size={18}
            strokeWidth={1.5}
          />
          Our People
        </div>
        <h2
          className="mt-5 font-heading text-[clamp(32px,8vw,48px)] font-semibold uppercase leading-[0.88] text-modura-primary md:text-5xl"
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
            className="max-w-md font-body text-sm leading-7 text-modura-gray-600"
          >
            Our strength lies in our people. Engineers,
            designers, coordinators and business
            professionals work together to create
            reliable and innovative solutions.
          </p>
        </div>
      </div>
    </div>

    {teamLoading ? (
      <div className="mt-20 flex justify-center py-20">
        <div className="flex items-center gap-3">
          <div
            className="h-5 w-5 animate-spin rounded-full border-2 border-modura-gray-300 border-t-modura-secondary"
          />
          <span className="font-body text-sm text-modura-gray-500">
            Loading team...
          </span>
        </div>
      </div>
    ) : teamMembers.length > 0 ? (
      <TeamGroup
        title="Our Team"
        members={teamMembers}
        onViewBio={setSelectedMember}
      />
    ) : (
      <div className="mt-20 py-16 text-center">
        <p className="font-body text-sm text-modura-gray-500">
          No team members available.
        </p>
      </div>
    )}
  </div>
</section>

         {selectedMember && (
           <div
             className="fixed inset-0 z-[9999] flex items-center justify-center bg-modura-primary/70 overflow-y-auto overscroll-contain px-3 py-3 sm:px-5 sm:py-6 backdrop-blur-md"
             onClick={() => setSelectedMember(null)}
           >
             <div
               className="relative w-full my-auto max-w-4xl max-h-[calc(100dvh-24px)] overflow-y-auto overscroll-contain bg-white shadow-2xl sm:max-h-[calc(100dvh-48px)]"
               onClick={(e) => e.stopPropagation()}
             >

               <div className="h-1 w-full bg-modura-secondary" />

               <button
                 type="button"
                 onClick={() => setSelectedMember(null)}
                 aria-label="Close biography"
                 className="absolute right-3 top-3 z-30 sm:right-5 sm:top-5 flex h-10 w-10 items-center justify-center bg-modura-primary text-white transition-all duration-300 hover:bg-modura-secondary"
               >
                 <X size={19} />
               </button>

               <div className="grid min-w-0 grid-cols-1 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">

                 <div className="relative h-[190px] min-w-0 bg-modura-light min-[400px]:h-[230px] sm:h-[280px] md:h-auto md:min-h-[430px] lg:min-h-[500px]">
                   <Image
                     src={selectedMember.photoUrl || (selectedMember.photo?.startsWith("http") ? selectedMember.photo : `https://admin.mvnlengineering.in/${(selectedMember.photo || "").replace(/^\/+/, "")}`)}
                     alt={selectedMember.name}
                     fill
                     unoptimized
                     sizes="(max-width: 767px) 100vw, 45vw"
                     className="object-cover"
                   />

                   <div
                     className="absolute inset-0 bg-gradient-to-t from-modura-primary/80 via-transparent to-transparent"
                   />

                   <div className="absolute bottom-4 left-4 right-4 sm:bottom-7 sm:left-7">
                     <div
                       className="mb-2 flex items-center gap-2 font-body text-[10px] font-bold uppercase tracking-[3px] text-white"
                     >
                       <BriefcaseBusiness size={13} />
                       Modura Team
                     </div>
                     <p
                       className="max-w-xs font-body text-lg font-semibold uppercase tracking-[1px] text-white"
                     >
                       {selectedMember.designation}
                     </p>
                   </div>
                 </div>

                 <div className="relative flex min-w-0 flex-col justify-center p-5 sm:p-8 md:p-10 lg:p-14">

                   <div
                     className="flex items-center gap-3 font-body text-[10px] font-bold uppercase tracking-[4px] text-modura-secondary"
                   >
                     <span className="h-[2px] w-8 bg-modura-secondary" />
                     Team Profile
                   </div>

                   <h3
                     className="mt-5 max-w-xl font-heading break-words text-[clamp(25px,7vw,36px)] font-semibold uppercase leading-[1.05] text-modura-primary sm:text-[clamp(28px,7vw,36px)] md:text-[clamp(32px,8vw,48px)]"
                   >
                     {selectedMember.name}
                   </h3>

                   <p
                     className="mt-4 font-body break-words text-[11px] font-bold uppercase tracking-[1px] text-modura-secondary sm:text-xs sm:tracking-[2px]"
                   >
                     {selectedMember.designation}
                   </p>

                   <div className="my-5 h-px w-full bg-modura-gray-200 sm:my-7" />

                   <p
                     className="max-w-xl break-words font-body text-[13px] leading-6 text-modura-gray-600 sm:text-sm sm:leading-8"
                   >
                     {selectedMember.bio}
                   </p>

                   <div
                     className="mt-5 flex items-center sm:mt-8 gap-3 border-t border-modura-gray-200 pt-5"
                   >
                     <span className="h-[3px] w-10 bg-modura-secondary" />
                     <span
                       className="font-body text-[9px] font-bold uppercase tracking-[3px] text-modura-gray-400"
                     >
                       Engineering With Precision
                     </span>
                   </div>
                 </div>
               </div>

               <div className="h-[3px] w-full bg-modura-secondary" />
             </div>
           </div>
         )}

     <section  id="certifications" className="relative overflow-hidden bg-white pb-16">
      <div className="mx-auto max-w-full px-4 md:px-6 lg:px-10 2xl:px-16">

     <div className="mx-auto text-center">
  <div className="flex items-center justify-center gap-3">
    <span className="h-[2px] w-10 bg-modura-secondary" />
    <span
      className="font-body text-[11px] font-bold uppercase tracking-[4px] text-modura-secondary"
    >
      Our Commitment
    </span>
    <span className="h-[2px] w-10 bg-modura-secondary" />
  </div>
  <h2
    className="mt-5 font-heading text-[clamp(32px,8vw,48px)] font-semibold uppercase leading-[0.95] text-modura-primary md:text-5xl"
  >
    Quality
    <span className="ml-2 text-modura-secondary">
      Policy
    </span>
  </h2>
  <p
    className="mx-auto mt-6 max-w-5xl font-body text-sm leading-7 text-modura-gray-600"
  >
    We are committed to maintaining high standards of
    quality, accuracy and reliability throughout every
    stage of our projects. Our approach combines
    experienced professionals, disciplined processes
    and continuous improvement.
  </p>
</div>

        <div
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {qualityPoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative flex min-h-[250px] flex-col overflow-hidden border border-modura-gray-200 bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:border-modura-secondary hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
              >

                <div
                  className="absolute left-0 top-0 h-[4px] w-0 bg-modura-secondary transition-all duration-500 group-hover:w-full"
                />

                <div className="flex items-start justify-end">

                  <div
                    className="flex h-14 w-14 items-center justify-center border border-modura-gray-200 bg-modura-light text-modura-secondary transition-all duration-500 group-hover:border-modura-secondary group-hover:bg-modura-secondary group-hover:text-white group-hover:rotate-6"
                  >
                    <Icon
                      size={25}
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                <h3
                  className="mt-3 font-heading text-lg 2xl:text-2xl font-semibold uppercase leading-[1] text-modura-primary"
                >
                  {item.title}
                </h3>

                <p
                  className="mt-5 font-body text-sm leading-7 text-modura-gray-600"
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

<section className="bg-modura-light py-16">
  <div className="mx-auto max-w-full px-4 md:px-6 lg:px-10 2xl:px-16">

    <div className="text-center">
      <div
        className="flex items-center justify-center gap-3 font-body text-[10px] font-bold uppercase tracking-[4px] text-modura-secondary"
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
        className="mt-4 font-heading text-[clamp(32px,8vw,48px)] font-semibold uppercase leading-none text-modura-primary lg:text-5xl"
      >
        Certifications
      </h2>
      <p
        className="mx-auto mt-5 max-w-2xl font-body text-sm leading-7 text-modura-gray-700"
      >
        Our commitment to quality, technical standards and
        professional excellence supports reliable project delivery.
      </p>
    </div>

    <div
      className="mt-12 grid gap-6 md:grid-cols-3"
    >

      {loading && (
        <div
          className="col-span-full flex min-h-[250px] items-center justify-center"
        >
          <div className="flex items-center gap-3">
            <div
              className="h-5 w-5 animate-spin rounded-full border-2 border-modura-gray-300 border-t-modura-secondary"
            />
            <span
              className="font-body text-sm text-modura-gray-600"
            >
              Loading certifications...
            </span>
          </div>
        </div>
      )}

      {!loading && certifications.length === 0 && (
        <div
          className="col-span-full py-10 text-center"
        >
          <p className="font-body text-sm text-modura-gray-500">
            No certifications available.
          </p>
        </div>
      )}

      {!loading &&
        certifications.map((item) => (
          <div
            key={item.id}
            className="group bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >

            <div
              className="flex h-14 w-14 items-center justify-center bg-modura-primary text-modura-secondary transition-all duration-300 group-hover:bg-modura-secondary group-hover:text-white"
            >
              <Award
                size={28}
                strokeWidth={1.5}
              />
            </div>

            <div
              className="mt-5 flex items-center justify-between gap-3"
            >
              <span
                className="font-body text-[10px] font-bold uppercase tracking-[2px] text-modura-secondary"
              >
                {item.issuedBy}
              </span>
              <span
                className="font-body text-[10px] font-bold tracking-[2px] text-modura-gray-500"
              >
                {item.year}
              </span>
            </div>

            <h3
              className="mt-3 font-heading text-xl 2xl:text-2xl font-semibold uppercase leading-tight text-modura-primary"
            >
              {item.title}
            </h3>

            <p
              className="mt-4 font-body text-sm leading-7 text-modura-gray-600"
            >
              {item.description}
            </p>
          </div>
        ))}
    </div>
  </div>
</section>

    <section
  id="faqs"
  className="relative overflow-hidden bg-white py-16"
>
  <div className="mx-auto max-w-5xl px-6 lg:px-10">

    <div className="mb-12 text-center">
      <div
        className="mb-4 flex items-center justify-center gap-3 font-body text-[11px] font-bold uppercase tracking-[4px] text-modura-secondary"
      >
        <span className="h-[2px] w-8 bg-modura-secondary" />
        <DraftingCompass
          size={20}
          className="text-modura-secondary"
        />
        <span>FAQ</span>
        <span className="h-[2px] w-8 bg-modura-secondary" />
      </div>
      <h2
        className="font-heading text-[clamp(32px,8vw,48px)] font-semibold uppercase leading-none text-modura-primary lg:text-5xl"
      >
        Frequently Asked
        <span className="text-modura-secondary">
          {" "}Questions
        </span>
      </h2>
      <p
        className="mx-auto mt-5 max-w-2xl font-body text-sm leading-7 text-modura-gray-700"
      >
        Find answers to some of the most common questions
        about our services and project process.
      </p>
    </div>

    <div className="border-t border-modura-gray-200">

      {faqLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="flex items-center gap-3">
            <div
              className="h-5 w-5 animate-spin rounded-full border-2 border-modura-gray-200 border-t-modura-secondary"
            />
            <span
              className="font-body text-sm text-modura-gray-500"
            >
              Loading FAQs...
            </span>
          </div>
        </div>
      )}

      {!faqLoading && faqError && (
        <div className="py-12 text-center">
          <p
            className="font-body text-sm text-modura-gray-500"
          >
            Unable to load FAQs.
          </p>
        </div>
      )}

      {!faqLoading && !faqError && faqs.length === 0 && (
        <div className="py-12 text-center">
          <p
            className="font-body text-sm text-modura-gray-500"
          >
            No FAQs available.
          </p>
        </div>
      )}

      {!faqLoading &&
        !faqError &&
        faqs.map((faq, index) => {
          const isOpen = active === index;
          return (
            <div
              key={faq.id}
              className="relative border-b border-modura-gray-200"
            >

              <span
                className={`absolute left-0 top-0 h-full w-[3px] origin-top bg-modura-secondary transition-transform duration-300 ${ isOpen ? "scale-y-100" : "scale-y-0" }`}
              />

              <button
                type="button"
                onClick={() =>
                  setActive(isOpen ? null : index)
                }
                className="group flex w-full items-center gap-5 px-5 py-6 text-left transition-all duration-300 hover:bg-modura-off-white md:px-7"
              >

                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center transition-all duration-300 ${ isOpen ? "bg-modura-secondary text-white" : "bg-modura-light text-modura-gray-500" }`}
                >
                  <CircleHelp
                    size={17}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </span>

                <span
                  className={`flex-1 font-heading text-xl font-semibold uppercase leading-tight transition-colors duration-300 lg:text-xl ${ isOpen ? "text-modura-primary" : "text-modura-primary/80" }`}
                >
                  {faq.question}
                </span>

                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-all duration-300 ${ isOpen ? "border-modura-secondary bg-modura-secondary text-white" : "border-modura-gray-300 text-modura-primary" }`}
                >
                  <Plus
                    size={17}
                    strokeWidth={1.5}
                    className={`transition-transform duration-300 ${ isOpen ? "rotate-45" : "rotate-0" }`}
                  />
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ${ isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]" }`}
              >
                <div className="overflow-hidden">
                  <div
                    className="pb-7 pl-[60px] pr-14 md:pl-[75px] md:pr-20"
                  >
                    <div
                      className="max-w-3xl font-body text-sm leading-7 text-modura-gray-600"
                      dangerouslySetInnerHTML={{
                        __html: faq.answer,
                      }}
                    />
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
  id="blog"
  ref={sectionblogRef}
  className="relative overflow-hidden bg-modura-off-white py-16"
>
  <div
    className="relative z-10 mx-auto max-w-full px-4 md:px-6 lg:px-10 2xl:px-16"
  >

    <div
      className="mb-14 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between"
    >

      <div>
        <div
          className="flex items-center gap-3 font-body text-xs font-bold uppercase tracking-[5px] text-modura-secondary"
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
          className="mt-4 font-heading text-[clamp(32px,8vw,48px)] font-semibold leading-none text-modura-primary lg:text-5xl"
        >
          Engineering
          <span className="ml-3 text-modura-secondary">
            Insights
          </span>
        </h2>
      </div>

      <div className="lg:pb-1">
        <AnimatedButton
          href="/blog"
          title="View More"
        />
      </div>
    </div>
   { blogs.length === 0 ? (
      <div
        className="py-16 text-center font-body text-sm text-modura-gray-600"
      >
        No blogs available.
      </div>
    ) : (
      <div
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {blogs.slice(0,3).map((blog) => (
          <motion.article
            key={blog.id}
            whileHover={{
              y: -12,
            }}
            transition={{
              duration: 0.35,
            }}
            className="blog-card blog-card-shape h-[530px] overflow-hidden bg-white shadow-xl"
          >
            <Link
              href={`/blogDetail/${blog.slug}`}
              className="block h-full"
            >

              <div
                className="group relative h-[230px] overflow-hidden blog-image-shape"
              >
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  sizes="400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div
                className="px-8 py-5"
              >

                <div
                  className="mb-3 font-heading text-lg font-bold tracking-wide text-modura-black"
                >
                  {new Date(blog.publishedAt).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </div>

                <h3
                  className="font-heading text-[20px] font-semibold leading-tight text-modura-secondary"
                >
                  {blog.title}
                </h3>

                <p
                  className="mt-3 font-body text-sm leading-7 text-modura-black"
                >
                  {getShortDescription(
                    (blog as Blog & {
                      description?: string;
                    }).description || ""
                  )}
                </p>

                <div
                  className="group relative mt-3 flex h-[58px] w-[200px] items-center justify-between overflow-hidden border-2 border-modura-secondary bg-modura-white px-7 font-body font-semibold text-modura-primary clip-read-btn transition-all duration-500"
                >

                  <span
                    className="absolute inset-0 translate-y-full bg-modura-secondary transition-transform duration-500 ease-out group-hover:translate-y-0"
                  />

                  <span
                    className="relative z-10 transition-all duration-500 group-hover:tracking-wider"
                  >
                    Read More
                  </span>

                  <span
                    className="relative z-10 flex h-10 w-12 items-center justify-center bg-modura-secondary text-modura-primary clip-arrow-box transition-all duration-500 group-hover:translate-x-1 group-hover:rotate-12 group-hover:bg-modura-primary group-hover:text-white"
                  >
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-500 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    )}
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
      className="flex items-center gap-4 border border-modura-gray-200 p-4 transition-all duration-300 hover:border-modura-secondary"
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center bg-modura-light text-modura-secondary"
      >
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <span
        className="font-heading text-lg 2xl:text-xl font-semibold uppercase text-modura-primary"
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

      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="h-[3px] w-10 bg-modura-secondary" />
          <h3
            className="font-heading text-3xl font-semibold uppercase leading-none text-modura-primary"
          >
            {title}
          </h3>
        </div>
        <span
          className="hidden font-body text-[9px] font-bold uppercase tracking-[3px] text-modura-gray-400 sm:block"
        >
          {String(members.length).padStart(2, "0")} Members
        </span>
      </div>

      <div
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {members.map((member) => (
          <article
            key={member.id}
            className="group relative overflow-hidden bg-modura-light transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
          >

            <div
              className="relative h-[360px] overflow-hidden"
            >
              <Image
                src={member.photoUrl}
                alt={member.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-modura-primary/90 via-modura-primary/10 to-transparent"
              />

              <div
                className="absolute right-0 top-0 h-16 w-16 bg-modura-secondary"
                style={{
                  clipPath:
                    "polygon(100% 0, 100% 100%, 0 0)",
                }}
              />

              <button
                type="button"
                onClick={() => onViewBio(member)}
                className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center bg-white text-modura-primary transition-all duration-300 hover:bg-modura-secondary hover:text-white"
                aria-label={`View bio of ${member.name}`}
              >
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.5}
                />
              </button>

              <div
                className="absolute bottom-5 left-5 right-16"
              >
                <h4
                  className="font-heading text-xl 2xl:text-2xl font-semibold uppercase leading-none text-white"
                >
                  {member.name}
                </h4>
                <p
                  className="mt-2 font-body text-[10px] font-bold uppercase tracking-[1.5px] text-modura-secondary"
                >
                  {member.designation}
                </p>
              </div>
            </div>

            <div
              className="h-[3px] w-0 bg-modura-secondary transition-all duration-500 group-hover:w-full"
            />
          </article>
        ))}
      </div>
    </div>
  );
}