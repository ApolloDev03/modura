// "use client";

// import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";
// import Image from "next/image";
// import Link from "next/link";
// import DOMPurify from "dompurify";
// import { AnimatePresence, motion } from "framer-motion";
// import { Minus, Plus, ArrowRight, DraftingCompass } from "lucide-react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Breadcrumb from "@/components/Breadcrumb";
// import AnimatedButton from "@/components/AnimatedButton";
// import { apiUrl } from "../../config";

// gsap.registerPlugin(ScrollTrigger);

// const API_BASE = (apiUrl || "https://mvnl.salexo.co.in/api/v1").replace(/\/+$/, "");
// const ASSET_ORIGIN = new URL(API_BASE).origin;
// const getAssetUrl = (value?: string) => {
//   if (!value) return "";
//   return /^https?:\/\//i.test(value) ? value : `${ASSET_ORIGIN}/${value.replace(/^\/+/, "")}`;
// };

// type FAQ = { id?: number; question: string; answer: string };
// type SoftwareBlog = {
//   id: number;
//   title: string;
//   slug: string;
//   image?: string;
//   imageUrl?: string;
//   description?: string;
//   publishedAt?: string;
// };
// type SoftwareData = {
//   id: number;
//   title: string;
//   category: string;
//   shortDescription: string;
//   longDescription: string;
//   image: string;
//   faqs: FAQ[];
//   blogs: SoftwareBlog[];
// };

// type ApiResponse = {
//   success: boolean;
//   message?: string;
//   data?: {
//     id?: number;
//     name?: string;
//     title?: string;
//     category?: string | { name?: string };
//     shortDescription?: string;
//     longDescription?: string;
//     image?: string;
//     imageUrl?: string;
//     faqs?: FAQ[];
//     blogs?: SoftwareBlog[];
//   };
// };

// function normalizeSoftware(data: NonNullable<ApiResponse["data"]>): SoftwareData {
//   const category = typeof data.category === "string" ? data.category : data.category?.name;
//   return {
//     id: Number(data.id || 0),
//     title: data.name || data.title || "Software Expertise",
//     category: category || "Software Expertise",
//     shortDescription: data.shortDescription || "",
//     longDescription: data.longDescription || "",
//     image: getAssetUrl(data.imageUrl || data.image),
//     faqs: Array.isArray(data.faqs) ? data.faqs : [],
//     blogs: Array.isArray(data.blogs) ? data.blogs : [],
//   };
// }

// /**
//  * HTML is sourced from the CMS. Sanitize before rendering; remove inline styles,
//  * event handlers and unsafe protocols. CSS below owns all visual presentation.
//  */
// function RichHTML({ html, className = "" }: { html?: string; className?: string }) {
//   const [safeHtml, setSafeHtml] = useState("");

//   useEffect(() => {
//     // DOMPurify uses the browser DOM, hence sanitation happens after mount.
//     const sanitized = DOMPurify.sanitize(html || "", {
//       USE_PROFILES: { html: true },
//       FORBID_TAGS: ["style", "script", "iframe", "object", "embed", "form", "input", "button", "svg", "math"],
//       FORBID_ATTR: ["style", "srcset", "onerror", "onclick", "onload"],
//     });

//     // Relative assets from the API should resolve against the website, not localhost.
//     const template = document.createElement("template");
//     template.innerHTML = sanitized;
//     template.content.querySelectorAll("img").forEach((img) => {
//       const src = img.getAttribute("src") || "";
//       if (src && !src.startsWith("data:")) img.setAttribute("src", getAssetUrl(src));
//       img.setAttribute("loading", "lazy");
//       img.setAttribute("decoding", "async");
//     });
//     template.content.querySelectorAll("a").forEach((a) => {
//       const href = a.getAttribute("href") || "";
//       if (/^https?:\/\//i.test(href)) {
//         a.setAttribute("target", "_blank");
//         a.setAttribute("rel", "noopener noreferrer");
//       }
//     });
//     setSafeHtml(template.innerHTML);
//   }, [html]);

//   if (!safeHtml) return null;
//   return <div className={`software-rich-html min-w-0 max-w-full break-words font-body text-modura-gray-600 ${className}`} dangerouslySetInnerHTML={{ __html: safeHtml }} />;
// }

// export default function SoftwareDetailPage() {
//   const params = useParams();
//   const slug = typeof params.slug === "string" ? params.slug : "";
//   const [software, setSoftware] = useState<SoftwareData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [activeFaq, setActiveFaq] = useState<number | null>(null);
//   const blogSectionRef = useRef<HTMLElement | null>(null);

//   useEffect(() => {
//     if (!slug) { setSoftware(null); setLoading(false); return; }
//     const controller = new AbortController();
//     setLoading(true);
//     setSoftware(null);
//     setError("");
//     setActiveFaq(null);
//     axios.post<ApiResponse>(`${API_BASE}/softwareDetail`, { slug }, {
//       headers: { "Content-Type": "application/json" },
//       signal: controller.signal,
//     }).then(({ data }) => {
//       if (!data.success || !data.data) throw new Error(data.message || "Software details not found.");
//       if (!controller.signal.aborted) setSoftware(normalizeSoftware(data.data));
//     }).catch((err: unknown) => {
//       if (controller.signal.aborted || axios.isCancel(err)) return;
//       setError(err instanceof Error ? err.message : "Unable to load software details.");
//     }).finally(() => {
//       if (!controller.signal.aborted) setLoading(false);
//     });
//     return () => controller.abort();
//   }, [slug]);

//   useLayoutEffect(() => {
//     if (!software || !blogSectionRef.current || !software.blogs.length) return;
//     const ctx = gsap.context(() => {
//       gsap.fromTo(".blog-card", { opacity: 0, y: 45 }, {
//         opacity: 1, y: 0, duration: .8, stagger: .12,
//         ease: "power3.out", scrollTrigger: { trigger: blogSectionRef.current, start: "top 80%", once: true },
//       });
//     }, blogSectionRef);
//     return () => ctx.revert();
//   }, [software]);

//   if (loading) return <main className="flex min-h-[55vh] items-center justify-center bg-white text-modura-gray-600">Loading software details...</main>;
//   if (!software) return (
//     <main className="flex min-h-[55vh] flex-col items-center justify-center gap-4 bg-white px-4 text-center">
//       <h1 className="font-heading text-3xl font-bold text-modura-primary">Software Not Found</h1>
//       <p className="text-modura-gray-600">{error || "No software found for the selected link."}</p>
//       <Link href="/softwareexpertise" className="text-modura-secondary underline">View software expertise</Link>
//     </main>
//   );

//   return (
//     <main className="w-full min-w-0 overflow-x-clip bg-white text-modura-primary">
//       <Breadcrumb title={software.title} />

//       {/* HERO: original image / copy layout, responsive for unpredictable lengths */}
//       <section className="bg-white">
//         <div className="mx-auto w-full max-w-full px-4 py-10 md:px-6 lg:px-10 lg:py-14 2xl:px-16">
//           <div className="grid min-w-0 items-center gap-7 lg:grid-cols-2 lg:gap-12">
//             <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .6 }} className="min-w-0">
//               <div className="relative min-h-[230px] w-full overflow-hidden bg-modura-off-white sm:min-h-[340px] lg:min-h-[450px]">
//                 {software.image ? (
//                   <Image src={software.image} alt={software.title} fill unoptimized sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
//                 ) : <div className="flex h-full min-h-[230px] items-center justify-center font-heading text-lg text-modura-gray-500">Software Expertise</div>}
//               </div>
//             </motion.div>
//             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .6 }} className="min-w-0">
//               <div className="flex min-w-0 items-center gap-3">
//                 <span className="h-[2px] w-9 shrink-0 bg-modura-secondary" />
//                 <span className="min-w-0 break-words font-body text-[10px] font-bold uppercase tracking-[.2em] text-modura-secondary">{software.category}</span>
//               </div>
//               <h1 className="mt-5 break-words font-heading text-[clamp(32px,5vw,70px)] font-bold leading-[1.08] tracking-tight text-modura-primary">{software.title}</h1>
//               {software.shortDescription && (
//                 <RichHTML html={software.shortDescription} className="mt-6 text-[15px] leading-7 sm:text-[17px]" />
//               )}
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* CMS CONTENT: one single content stream, no guessed / duplicated sections */}
//       {software.longDescription.trim() && (
//         <section className="bg-modura-off-white">
//           <div className="mx-auto w-full max-w-full px-4 py-10 md:px-6 lg:px-10 lg:py-16 2xl:px-16">
//             <SectionHeading label="Software Expertise" title="Detailed" accent="Overview" />
//             <div className="mt-6 min-w-0 max-w-[1100px] border-l-[3px] border-modura-secondary bg-white px-4 py-6 shadow-[0_8px_35px_rgba(11,29,51,0.04)] sm:px-8 sm:py-9 lg:px-10">
//               <RichHTML html={software.longDescription} className="text-[14px] leading-[1.85] sm:text-[16px]" />
//             </div>
//           </div>
//         </section>
//       )}

//       {software.faqs.length > 0 && (
//         <section className="bg-white">
//           <div className="mx-auto w-full max-w-full px-4 py-10 md:px-6 lg:px-10 lg:py-14 2xl:px-16">
//             <SectionHeading label="FAQ" title="Frequently Asked" accent="Questions" />
//             <div className="mt-7 border-t border-modura-gray-300">
//               {software.faqs.map((faq, index) => {
//                 const open = activeFaq === index;
//                 return (
//                   <div key={faq.id ?? index} className="border-b border-modura-gray-300">
//                     <button type="button" aria-expanded={open} onClick={() => setActiveFaq(open ? null : index)} className="flex w-full min-w-0 items-center gap-4 py-5 text-left">
//                       <span className={`flex h-9 w-9 shrink-0 items-center justify-center border ${open ? "border-modura-secondary bg-modura-secondary text-white" : "border-modura-gray-300 text-modura-secondary"}`}>
//                         {open ? <Minus size={16} /> : <Plus size={16} />}
//                       </span>
//                       <span className={`min-w-0 flex-1 break-words font-heading text-[16px] font-semibold sm:text-[19px] ${open ? "text-modura-secondary" : "text-modura-primary"}`}>{faq.question}</span>
//                     </button>
//                     <AnimatePresence initial={false}>
//                       {open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .3 }} className="overflow-hidden">
//                         <div className="pb-7 pl-0 sm:pl-[52px]">
//                           <div className="border-l-2 border-modura-secondary pl-4 sm:pl-5"><RichHTML html={faq.answer} className="text-[14px] leading-7" /></div>
//                         </div>
//                       </motion.div>}
//                     </AnimatePresence>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>
//       )}

//       {software.blogs.length > 0 && (
//         <section ref={blogSectionRef} className="bg-modura-off-white py-10 lg:py-14">
//           <div className="mx-auto w-full max-w-full px-4 md:px-6 lg:px-10 2xl:px-16">
//             <div className="mb-8 text-center">
//               <div className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[.25em] text-modura-secondary"><DraftingCompass size={20} /> OUR BLOG</div>
//               <h2 className="mt-4 font-heading text-3xl font-semibold text-modura-primary sm:text-4xl lg:text-5xl">Engineering <span className="text-modura-secondary">Insights</span></h2>
//             </div>
//             <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
//               {software.blogs.map(blog => (
//                 <article key={blog.id} className="blog-card group min-w-0 overflow-hidden bg-white shadow-[0_10px_30px_rgba(11,29,51,.08)]">
//                   <Link href={`/blogDetail/${blog.slug}`} className="block h-full">
//                     <div className="relative h-[220px] overflow-hidden bg-modura-light">
//                       {getAssetUrl(blog.imageUrl || blog.image) ? <Image src={getAssetUrl(blog.imageUrl || blog.image)} alt={blog.title} fill unoptimized sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /> : null}
//                     </div>
//                     <div className="p-5 sm:p-6">
//                       {blog.publishedAt && !Number.isNaN(new Date(blog.publishedAt).getTime()) && <p className="mb-2 text-sm font-semibold text-modura-primary">{new Date(blog.publishedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}</p>}
//                       <h3 className="break-words font-heading text-xl font-semibold text-modura-secondary">{blog.title}</h3>
//                       <div className="mt-2 line-clamp-3"><BlogExcerpt html={blog.description || ""} /></div>
//                       <span className="mt-5 inline-flex items-center gap-3 border border-modura-secondary px-5 py-3 font-body text-sm font-semibold text-modura-primary transition-colors group-hover:bg-modura-secondary group-hover:text-white">Read More <ArrowRight size={17}/></span>
//                     </div>
//                   </Link>
//                 </article>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       <section className="bg-modura-light">
//         <div className="mx-auto flex w-full max-w-full flex-col gap-7 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6 lg:px-10 2xl:px-16">
//           <div className="min-w-0 max-w-[700px]">
//             <span className="font-body text-[10px] font-bold uppercase tracking-[.25em] text-modura-secondary">Let&apos;s Work Together</span>
//             <h2 className="mt-3 break-words font-heading text-[clamp(32px,5vw,48px)] font-bold leading-tight">Start Your Project <span className="text-modura-secondary">With Us</span></h2>
//             <p className="mt-3 font-body text-sm leading-7 text-modura-gray-600">Have a project that requires reliable {software.title} expertise? Let&apos;s discuss your requirements.</p>
//           </div>
//           <div className="shrink-0 self-start md:self-center"><AnimatedButton href="/inquiry" title="Get In Touch" /></div>
//         </div>
//       </section>
//     </main>
//   );
// }

// function BlogExcerpt({ html }: { html: string }) {
//   const [text, setText] = useState("");
//   useEffect(() => {
//     const sanitized = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
//     const decoded = document.createElement("textarea");
//     decoded.innerHTML = sanitized;
//     setText(decoded.value.replace(/\s+/g, " ").trim());
//   }, [html]);
//   return <p className="font-body text-sm leading-6 text-modura-gray-600">{text}</p>;
// }

// function SectionHeading({ label, title, accent }: { label: string; title: string; accent: string }) {
//   return (
//     <div className="min-w-0">
//       <div className="flex items-center gap-3"><span className="h-[2px] w-9 shrink-0 bg-modura-secondary"/><span className="font-body text-[10px] font-bold uppercase tracking-[.2em] text-modura-secondary">{label}</span></div>
//       <h2 className="mt-3 break-words font-heading text-[clamp(30px,5vw,48px)] font-bold leading-tight text-modura-primary">{title} <span className="text-modura-secondary">{accent}</span></h2>
//     </div>
//   );
// }

"use client";



import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useParams } from "next/navigation";

import axios from "axios";

import Image from "next/image";

import Link from "next/link";

import DOMPurify from "dompurify";

import { AnimatePresence, motion } from "framer-motion";

import { Minus, Plus, ArrowRight, DraftingCompass } from "lucide-react";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import Breadcrumb from "@/components/Breadcrumb";

import AnimatedButton from "@/components/AnimatedButton";

import { apiUrl } from "../../config";



gsap.registerPlugin(ScrollTrigger);



const API_BASE = (apiUrl || "https://mvnl.salexo.co.in/api/v1").replace(/\/+$/, "");

const ASSET_ORIGIN = new URL(API_BASE).origin;

const getAssetUrl = (value?: string) => {

  if (!value) return "";

  return /^https?:\/\//i.test(value) ? value : `${ASSET_ORIGIN}/${value.replace(/^\/+/, "")}`;

};



type FAQ = { id?: number; question: string; answer: string };

type SoftwareBlog = {

  id: number;

  title: string;

  slug: string;

  image?: string;

  imageUrl?: string;

  description?: string;

  publishedAt?: string;

};

type SoftwareData = {

  id: number;

  title: string;

  category: string;

  shortDescription: string;

  longDescription: string;

  image: string;

  faqs: FAQ[];

  blogs: SoftwareBlog[];

};



type ApiResponse = {

  success: boolean;

  message?: string;

  data?: {

    id?: number;

    name?: string;

    title?: string;

    category?: string | { name?: string };

    shortDescription?: string;

    longDescription?: string;

    image?: string;

    imageUrl?: string;

    faqs?: FAQ[];

    blogs?: SoftwareBlog[];

  };

};



function normalizeSoftware(data: NonNullable<ApiResponse["data"]>): SoftwareData {

  const category = typeof data.category === "string" ? data.category : data.category?.name;

  return {

    id: Number(data.id || 0),

    title: data.name || data.title || "Software Expertise",

    category: category || "Software Expertise",

    shortDescription: data.shortDescription || "",

    longDescription: data.longDescription || "",

    image: getAssetUrl(data.imageUrl || data.image),

    faqs: Array.isArray(data.faqs) ? data.faqs : [],

    blogs: Array.isArray(data.blogs) ? data.blogs : [],

  };

}



const RICH_CONTENT_CLASSES = `
  software-rich-html
  min-w-0 w-full max-w-full break-words
  font-body text-[14px] leading-[1.85] text-modura-gray-600
  sm:text-[16px] sm:leading-[1.9]

  [&_p]:mb-5 [&_p]:max-w-full [&_p]:break-words
  [&_p]:text-[14px] [&_p]:leading-[1.85]
  sm:[&_p]:text-[16px] sm:[&_p]:leading-[1.9]
  [&_p:last-child]:mb-0
  [&_.ql-align-justify]:text-justify
  [&_.ql-align-center]:text-center
  [&_.ql-align-right]:text-right

  [&_h1]:mb-5 [&_h1]:mt-10 [&_h1]:break-words
  [&_h1]:font-heading [&_h1]:text-[30px] [&_h1]:font-bold
  [&_h1]:leading-[1.2] [&_h1]:text-modura-primary
  sm:[&_h1]:text-[38px]

  [&_h2]:mb-5 [&_h2]:mt-9 [&_h2]:break-words
  [&_h2]:border-l-[3px] [&_h2]:border-modura-secondary
  [&_h2]:pl-4 [&_h2]:font-heading [&_h2]:text-[24px]
  [&_h2]:font-bold [&_h2]:leading-[1.3] [&_h2]:text-modura-primary
  sm:[&_h2]:text-[30px]

  [&_h3]:mb-4 [&_h3]:mt-8 [&_h3]:break-words
  [&_h3]:font-heading [&_h3]:text-[21px] [&_h3]:font-bold
  [&_h3]:leading-[1.35] [&_h3]:text-modura-secondary
  sm:[&_h3]:text-[25px]

  [&_h4]:mb-3 [&_h4]:mt-7 [&_h4]:font-heading
  [&_h4]:text-[19px] [&_h4]:font-semibold [&_h4]:text-modura-primary
  [&_h5]:mb-3 [&_h5]:mt-6 [&_h5]:font-heading
  [&_h5]:text-[17px] [&_h5]:font-semibold [&_h5]:text-modura-primary
  [&_h6]:mb-3 [&_h6]:mt-5 [&_h6]:font-heading
  [&_h6]:text-[15px] [&_h6]:font-bold [&_h6]:text-modura-secondary

  [&_ul]:mb-6 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2
  [&_ul]:pl-6 [&_ul]:marker:text-modura-secondary
  sm:[&_ul]:pl-8
  [&_ol]:mb-6 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:space-y-2
  [&_ol]:pl-6 [&_ol]:marker:font-bold [&_ol]:marker:text-modura-secondary
  sm:[&_ol]:pl-8
  [&_li]:break-words [&_li]:pl-1 [&_li]:leading-[1.8]
  [&_li_p]:mb-1
  [&_li_ul]:mb-2 [&_li_ol]:mb-2

  [&_strong]:font-bold [&_strong]:text-modura-primary
  [&_b]:font-bold [&_b]:text-modura-primary
  [&_em]:italic [&_i]:italic
  [&_u]:underline
  [&_a]:break-all [&_a]:font-medium [&_a]:text-modura-secondary
  [&_a]:underline [&_a]:underline-offset-4
  hover:[&_a]:text-modura-primary

  [&_blockquote]:my-7 [&_blockquote]:border-l-4
  [&_blockquote]:border-modura-secondary [&_blockquote]:bg-modura-off-white
  [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:italic
  [&_blockquote]:text-modura-primary

  [&_img]:my-7 [&_img]:block [&_img]:h-auto [&_img]:max-w-full
  [&_figure]:my-7 [&_figure]:max-w-full
  [&_figcaption]:mt-2 [&_figcaption]:text-center
  [&_figcaption]:text-xs [&_figcaption]:text-modura-gray-500

  [&_table]:my-6 [&_table]:block [&_table]:max-w-full
  [&_table]:overflow-x-auto [&_table]:border-collapse
  [&_th]:border [&_th]:border-modura-gray-200
  [&_th]:bg-modura-primary [&_th]:px-4 [&_th]:py-3
  [&_th]:text-left [&_th]:text-sm [&_th]:font-semibold [&_th]:text-white
  [&_td]:border [&_td]:border-modura-gray-200
  [&_td]:px-4 [&_td]:py-3 [&_td]:align-top
  [&_hr]:my-8 [&_hr]:border-modura-gray-200
  [&_pre]:my-5 [&_pre]:max-w-full [&_pre]:overflow-x-auto
  [&_pre]:bg-modura-primary [&_pre]:p-5 [&_pre]:text-white
  [&_code]:break-words [&_code]:font-mono
  [&_code]:text-[13px]
  [&_div]:max-w-full
  [&_h1:first-child]:mt-0 [&_h2:first-child]:mt-0
  [&_h3:first-child]:mt-0
`;

function RichHTML({ html, className = "" }: { html?: string; className?: string }) {

  const [safeHtml, setSafeHtml] = useState("");



  useEffect(() => {

    // Render untrusted CMS HTML safely; presentation is controlled by Tailwind.

    const sanitized = DOMPurify.sanitize(html || "", {

      USE_PROFILES: { html: true },

      FORBID_TAGS: ["style", "script", "iframe", "object", "embed", "form", "input", "button", "svg", "math"],

      FORBID_ATTR: ["style", "srcset", "onerror", "onclick", "onload"],

    });



    // Relative assets from the API should resolve against the website, not localhost.

    const template = document.createElement("template");

    template.innerHTML = sanitized;

  // React Quill can encode every gap as &nbsp;, which prevents wrapping.
  // Restore ordinary spaces so long paragraphs wrap on mobile screens.
  const textWalker = document.createTreeWalker(template.content, NodeFilter.SHOW_TEXT);
  let textNode: Node | null;
  while ((textNode = textWalker.nextNode())) {
    if (textNode.textContent?.includes("\u00a0")) {
      textNode.textContent = textNode.textContent.replace(/\u00a0/g, " ");
    }
  }

    template.content.querySelectorAll("img").forEach((img) => {

      const src = img.getAttribute("src") || "";

      if (src && !src.startsWith("data:")) img.setAttribute("src", getAssetUrl(src));

      img.setAttribute("loading", "lazy");

      img.setAttribute("decoding", "async");

    });

    template.content.querySelectorAll("a").forEach((a) => {

      const href = a.getAttribute("href") || "";

      if (/^https?:\/\//i.test(href)) {

        a.setAttribute("target", "_blank");

        a.setAttribute("rel", "noopener noreferrer");

      }

    });

    setSafeHtml(template.innerHTML);

  }, [html]);



  if (!safeHtml) return null;

  return <div className={`${RICH_CONTENT_CLASSES} ${className}`} dangerouslySetInnerHTML={{ __html: safeHtml }} />;

}



export default function SoftwareDetailPage() {

  const params = useParams();

  const slug = typeof params.slug === "string" ? params.slug : "";

  const [software, setSoftware] = useState<SoftwareData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const blogSectionRef = useRef<HTMLElement | null>(null);



  useEffect(() => {

    if (!slug) { setSoftware(null); setLoading(false); return; }

    const controller = new AbortController();

    setLoading(true);

    setSoftware(null);

    setError("");

    setActiveFaq(null);

    axios.post<ApiResponse>(`${API_BASE}/softwareDetail`, { slug }, {

      headers: { "Content-Type": "application/json" },

      signal: controller.signal,

    }).then(({ data }) => {

      if (!data.success || !data.data) throw new Error(data.message || "Software details not found.");

      if (!controller.signal.aborted) setSoftware(normalizeSoftware(data.data));

    }).catch((err: unknown) => {

      if (controller.signal.aborted || axios.isCancel(err)) return;

      setError(err instanceof Error ? err.message : "Unable to load software details.");

    }).finally(() => {

      if (!controller.signal.aborted) setLoading(false);

    });

    return () => controller.abort();

  }, [slug]);



  useLayoutEffect(() => {

    if (!software || !blogSectionRef.current || !software.blogs.length) return;

    const ctx = gsap.context(() => {

      gsap.fromTo(".blog-card", { opacity: 0, y: 45 }, {

        opacity: 1, y: 0, duration: .8, stagger: .12,

        ease: "power3.out", scrollTrigger: { trigger: blogSectionRef.current, start: "top 80%", once: true },

      });

    }, blogSectionRef);

    return () => ctx.revert();

  }, [software]);



  if (loading) return <main className="flex min-h-[55vh] items-center justify-center bg-white text-modura-gray-600">Loading software details...</main>;

  if (!software) return (

    <main className="flex min-h-[55vh] flex-col items-center justify-center gap-4 bg-white px-4 text-center">

      <h1 className="font-heading text-3xl font-bold text-modura-primary">Software Not Found</h1>

      <p className="text-modura-gray-600">{error || "No software found for the selected link."}</p>

      <Link href="/softwareexpertise" className="text-modura-secondary underline">View software expertise</Link>

    </main>

  );



  return (

    <main className="w-full min-w-0 overflow-x-clip bg-white text-modura-primary">

      <Breadcrumb title={software.title} />



      {/* HERO: original image / copy layout, responsive for unpredictable lengths */}

      <section className="bg-white">

        <div className="mx-auto w-full max-w-full px-4 py-10 md:px-6 lg:px-10 lg:py-14 2xl:px-16">

          <div className="grid min-w-0 items-center gap-7 lg:grid-cols-2 lg:gap-12">

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .6 }} className="min-w-0">

              <div className="relative min-h-[230px] w-full overflow-hidden bg-modura-off-white sm:min-h-[340px] lg:min-h-[450px]">

                {software.image ? (

                  <Image src={software.image} alt={software.title} fill unoptimized sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />

                ) : <div className="flex h-full min-h-[230px] items-center justify-center font-heading text-lg text-modura-gray-500">Software Expertise</div>}

              </div>

            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .6 }} className="min-w-0">

              <div className="flex min-w-0 items-center gap-3">

                <span className="h-[2px] w-9 shrink-0 bg-modura-secondary" />

                <span className="min-w-0 break-words font-body text-[10px] font-bold uppercase tracking-[.2em] text-modura-secondary">{software.category}</span>

              </div>

              <h1 className="mt-5 break-words font-heading text-[clamp(32px,5vw,70px)] font-bold leading-[1.08] tracking-tight text-modura-primary">{software.title}</h1>

              {software.shortDescription && (

                <RichHTML html={software.shortDescription} className="mt-6 text-[15px] leading-7 sm:text-[17px]" />

              )}

            </motion.div>

          </div>

        </div>

      </section>



      {/* CMS CONTENT: one single content stream, no guessed / duplicated sections */}

      {software.longDescription.trim() && (

        <section className="bg-modura-off-white">

          <div className="mx-auto w-full max-w-full px-4 py-10 md:px-6 lg:px-10 lg:py-16 2xl:px-16">

            <SectionHeading label="Software Expertise" title="Detailed" accent="Overview" />

            <div className="mt-7 min-w-0 w-full max-w-full bg-white px-4 py-7 sm:px-8 sm:py-10 lg:px-10 2xl:px-16">

              <RichHTML html={software.longDescription} className="" />

            </div>

          </div>

        </section>

      )}



      {software.faqs.length > 0 && (

        <section className="bg-white">

          <div className="mx-auto w-full max-w-full px-4 py-10 md:px-6 lg:px-10 lg:py-14 2xl:px-16">

            <SectionHeading label="FAQ" title="Frequently Asked" accent="Questions" />

            <div className="mt-7 border-t border-modura-gray-300">

              {software.faqs.map((faq, index) => {

                const open = activeFaq === index;

                return (

                  <div key={faq.id ?? index} className="border-b border-modura-gray-300">

                    <button type="button" aria-expanded={open} onClick={() => setActiveFaq(open ? null : index)} className="flex w-full min-w-0 items-center gap-4 py-5 text-left">

                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center border ${open ? "border-modura-secondary bg-modura-secondary text-white" : "border-modura-gray-300 text-modura-secondary"}`}>

                        {open ? <Minus size={16} /> : <Plus size={16} />}

                      </span>

                      <span className={`min-w-0 flex-1 break-words font-heading text-[16px] font-semibold sm:text-[19px] ${open ? "text-modura-secondary" : "text-modura-primary"}`}>{faq.question}</span>

                    </button>

                    <AnimatePresence initial={false}>

                      {open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .3 }} className="overflow-hidden">

                        <div className="pb-7 pl-0 sm:pl-[52px]">

                          <div className="border-l-2 border-modura-secondary pl-4 sm:pl-5"><RichHTML html={faq.answer} className="text-[14px] leading-7" /></div>

                        </div>

                      </motion.div>}

                    </AnimatePresence>

                  </div>

                );

              })}

            </div>

          </div>

        </section>

      )}



    
      
{software.blogs.length > 0 && (
  <section
    ref={blogSectionRef}
    className="
      relative
      overflow-hidden
      bg-modura-off-white
      py-10
      md:py-12
    "
  >
    <div
      className="
        relative
        z-10
        mx-auto
        w-full
        max-w-full
        px-4
        md:px-6
        lg:px-10
        2xl:px-16
      "
    >
      {/* HEADER */}

      <div className="mb-8 text-center">
        <div
          className="
            flex
            items-center
            justify-center
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
          />

          <span>OUR BLOG</span>
        </div>

        <h2
          className="
            mt-4
            font-heading
            text-3xl
            font-semibold
            text-modura-primary
            sm:text-5xl
            lg:text-6xl
          "
        >
          Engineering{" "}
          <span className="text-modura-secondary">
            Insights
          </span>
        </h2>
      </div>

      {/* BLOG GRID */}

      <div
        className="
          grid
          gap-5
          md:grid-cols-2
          md:gap-8
          lg:grid-cols-3
        "
      >
        {software.blogs.map((blog) => {
          const imageSrc = getAssetUrl(
            blog.imageUrl || blog.image
          );

          const blogHref = `/blogDetail/${blog.slug}`;

          return (
            <motion.article
              key={blog.id}
              whileHover={{ y: -12 }}
              transition={{ duration: 0.35 }}
              className="
                blog-card
                group
                flex
                h-full
                min-w-0
                flex-col
                overflow-hidden
                bg-white
                shadow-xl
              "
            >
              {/* IMAGE */}

              <Link
                href={blogHref}
                className="block"
              >
                <div
                  className="
                    relative
                    h-[200px]
                    overflow-hidden
                    bg-modura-light
                    sm:h-[230px]
                  "
                >
                  {imageSrc && (
                    <Image
                      src={imageSrc}
                      alt={blog.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-110
                      "
                    />
                  )}
                </div>
              </Link>

              {/* CONTENT */}

              <div
                className="
                  flex
                  min-w-0
                  flex-1
                  flex-col
                  px-4
                  py-5
                  sm:px-6
                  lg:px-8
                "
              >
                {/* DATE */}

                {blog.publishedAt &&
                  !Number.isNaN(
                    new Date(blog.publishedAt).getTime()
                  ) && (
                    <div
                      className="
                        mb-1
                        font-heading
                        text-md
                        font-bold
                        uppercase
                        tracking-wide
                        text-modura-black
                      "
                    >
                      {new Date(
                        blog.publishedAt
                      ).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  )}

                {/* TITLE */}

                <h3
                  className="
                    break-words
                    font-heading
                    text-[20px]
                    font-semibold
                    leading-tight
                    text-modura-secondary
                  "
                >
                  <Link href={blogHref}>
                    {blog.title}
                  </Link>
                </h3>

                {/* DESCRIPTION */}

                {blog.description && (
                  <div
                    className="
                      mt-1
                      line-clamp-3
                      font-body
                      text-sm
                      leading-7
                      text-modura-black
                    "
                  >
                    <BlogExcerpt
                      html={blog.description}
                    />
                  </div>
                )}

                {/* READ MORE BUTTON */}

                <Link
                  href={blogHref}
                  className="
                    group/btn
                    relative
                    mt-auto
                    flex
                    h-[58px]
                    w-[200px]
                    max-w-full
                    items-center
                    justify-between
                    overflow-hidden
                    border-2
                    border-modura-secondary
                    bg-white
                    px-7
                    font-body
                    font-semibold
                    text-modura-primary
                    clip-read-btn
                    transition-all
                    duration-500
                    pt-0
                  "
                  style={{
                    marginTop: "auto",
                  }}
                >
                  {/* HOVER LAYER */}

                  <span
                    className="
                      absolute
                      inset-0
                      translate-y-full
                      bg-modura-secondary
                      transition-transform
                      duration-500
                      ease-out
                      group-hover/btn:translate-y-0
                    "
                  />

                  {/* TEXT */}

                  <span
                    className="
                      relative
                      z-10
                      whitespace-nowrap
                      transition-all
                      duration-500
                      group-hover/btn:tracking-wider
                      group-hover/btn:text-white
                    "
                  >
                    Read More
                  </span>

                  {/* ARROW */}

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
                      group-hover/btn:rotate-12
                      group-hover/btn:translate-x-1
                      group-hover/btn:bg-modura-primary
                      group-hover/btn:text-white
                    "
                  >
                    <ArrowRight
                      size={18}
                      className="
                        transition-transform
                        duration-500
                        group-hover/btn:translate-x-1
                      "
                    />
                  </span>
                </Link>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>
)}




      <section className="bg-modura-light">

        <div className="mx-auto flex w-full max-w-full flex-col gap-7 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6 lg:px-10 2xl:px-16">

          <div className="min-w-0 max-w-[700px]">

            <span className="font-body text-[10px] font-bold uppercase tracking-[.25em] text-modura-secondary">Let's Work Together</span>

            <h2 className="mt-3 break-words font-heading text-[clamp(32px,5vw,48px)] font-bold leading-tight">Start Your Project <span className="text-modura-secondary">With Us</span></h2>

            <p className="mt-3 font-body text-sm leading-7 text-modura-gray-600">Have a project that requires reliable {software.title} expertise? Let's discuss your requirements.</p>

          </div>

          <div className="shrink-0 self-start md:self-center"><AnimatedButton href="/inquiry" title="Get In Touch" /></div>

        </div>

      </section>

    </main>

  );

}



function BlogExcerpt({ html }: { html: string }) {

  const [text, setText] = useState("");

  useEffect(() => {

    const sanitized = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });

    const decoded = document.createElement("textarea");

    decoded.innerHTML = sanitized;

    setText(decoded.value.replace(/\s+/g, " ").trim());

  }, [html]);

  return <p className="font-body text-sm leading-6 text-modura-gray-600">{text}</p>;

}



function SectionHeading({ label, title, accent }: { label: string; title: string; accent: string }) {

  return (

    <div className="min-w-0">

      <div className="flex items-center gap-3"><span className="h-[2px] w-9 shrink-0 bg-modura-secondary"/><span className="font-body text-[10px] font-bold uppercase tracking-[.2em] text-modura-secondary">{label}</span></div>

      <h2 className="mt-3 break-words font-heading text-[clamp(30px,5vw,48px)] font-bold leading-tight text-modura-primary">{title} <span className="text-modura-secondary">{accent}</span></h2>

    </div>

  );

}