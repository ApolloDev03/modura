"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  DraftingCompass,
} from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { apiUrl } from "../../config";



interface BlogItem {
  id: number;
  title: string;
  slug: string;
  image: string;
  imageUrl?: string;
  author?: string;
  publishedAt?: string;
}

interface BlogDetailData extends BlogItem {
  description: string;
  categoryId?: number;
  serviceId?: number;
  softwareId?: number;
  status?: string;
  metaTitle?: string;
  metaDescription?: string;

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

  related?: BlogItem[];
  recent?: BlogItem[];
}

interface BlogApiResponse {
  success: boolean;
  message: string;
  data: BlogDetailData;
}

/* =========================================================
   HELPERS
========================================================= */

const getImageUrl = (image?: string | null): string => {
  if (!image) return "";

  if (
    image.startsWith("https://") ||
    image.startsWith("http://")
  ) {
    return image;
  }

  return `${apiUrl}/${image.replace(/^\/+/, "")}`;
};

const formatDate = (date?: string) => {
  if (!date) {
    return { day: "", month: "", year: "" };
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return { day: "", month: "", year: "" };
  }

  return {
    day: parsed.toLocaleDateString("en-US", {
      day: "2-digit",
      timeZone: "UTC",
    }),
    month: parsed
      .toLocaleDateString("en-US", {
        month: "short",
        timeZone: "UTC",
      })
      .toUpperCase(),
    year: parsed.toLocaleDateString("en-US", {
      year: "numeric",
      timeZone: "UTC",
    }),
  };
};

/* =========================================================
   BLOG DETAIL
========================================================= */

export default function BlogDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [blog, setBlog] = useState<BlogDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================================
     BLOG DETAIL API
  ========================================================= */

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError("Invalid blog URL.");
      return;
    }

    const controller = new AbortController();

    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        setError("");
        setBlog(null);

        const response = await axios.post<BlogApiResponse>(
          `${apiUrl}/api/v1/blogDetail`,
          {
            slug,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            signal: controller.signal,
          }
        );

        if (response.data.success && response.data.data) {
          setBlog(response.data.data);
        } else {
          setError(response.data.message || "Blog not found.");
        }
      } catch (err) {
        if (axios.isCancel(err)) return;

        console.error("Blog Detail API Error:", err);

        setError(
          "Unable to load blog details. Please try again."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchBlogDetail();

    return () => {
      controller.abort();
    };
  }, [slug]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <>
        <Breadcrumb title="BlogDetail" />

        <main className="bg-white">
          <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-6">
            <div className="flex flex-col items-center gap-5">
              <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-modura-gray-200 border-t-modura-secondary" />

              <p className="font-body text-sm text-modura-secondary">
                Loading blog details...
              </p>
            </div>
          </div>
        </main>
      </>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error || !blog) {
    return (
      <>
        <Breadcrumb title="BlogDetail" />

        <main className="bg-white">
          <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center gap-6 px-6">
            <h2 className="font-heading text-3xl font-semibold uppercase text-modura-primary">
              Blog Not Found
            </h2>

            <p className="font-body text-sm text-modura-gray-600">
              {error || "The requested blog could not be found."}
            </p>

            <Link
              href="/blog"
              className="bg-modura-primary px-7 py-3 font-body text-xs font-bold uppercase tracking-[2px] text-white transition-colors hover:bg-modura-secondary"
            >
              Back To Blogs
            </Link>
          </div>
        </main>
      </>
    );
  }

  const blogDate = formatDate(blog.publishedAt);
  const relatedBlogs = blog.related || [];
  const featureImage = getImageUrl(
    blog.imageUrl || blog.image
  );

  return (
    <>
      <Breadcrumb title="BlogDetail" />

      <main className="bg-white">
        {/* =====================================================
            BLOG HERO
        ===================================================== */}

        <section className="relative overflow-hidden bg-modura-off-white">
          {/* Architectural Background */}

          <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[40%] lg:block">
            <div className="absolute right-[10%] top-0 h-full w-px bg-modura-primary/5" />
            <div className="absolute right-[25%] top-0 h-full w-px bg-modura-primary/5" />
            <div className="absolute right-[40%] top-0 h-full w-px bg-modura-primary/5" />
            <div className="absolute right-[55%] top-0 h-full w-px bg-modura-primary/5" />
            <div className="absolute right-0 top-[30%] h-px w-full bg-modura-primary/5" />
            <div className="absolute right-0 top-[65%] h-px w-full bg-modura-primary/5" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-10">
            {/* META */}

            <div className="mt-12 flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-3 font-body text-[10px] font-bold uppercase tracking-[3px] text-modura-secondary">
                <DraftingCompass size={17} />

                {blog.category?.name || "Engineering Insights"}
              </div>

              <span className="h-1 w-1 rounded-full bg-modura-gray-300" />

              <span className="flex items-center gap-2 font-body text-xs text-modura-gray-500">
                <CalendarDays
                  size={15}
                  className="text-modura-secondary"
                />

                {blogDate.day} {blogDate.month} {blogDate.year}
              </span>
            </div>

            {/* TITLE */}

            <h1 className="mt-8 max-w-5xl font-heading text-5xl font-semibold uppercase leading-[0.9] tracking-[-1px] text-modura-primary md:text-6xl lg:text-[76px]">
              {blog.title}

              <span className="text-modura-secondary">.</span>
            </h1>

            {/* DESCRIPTION */}

            <div className="mt-9 flex max-w-3xl items-start gap-5">
              <span className="mt-2 h-12 w-[3px] shrink-0 bg-modura-secondary" />

              <div
                className="font-body text-sm leading-7 text-modura-gray-600 md:text-base md:leading-8"
                dangerouslySetInnerHTML={{
                  __html: blog.description || "",
                }}
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            FEATURE IMAGE
        ===================================================== */}

        <section className="relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="relative h-[300px] overflow-hidden md:h-[480px] lg:h-[600px]">
              {featureImage && (
                <Image
                  src={featureImage}
                  alt={blog.title}
                  fill
                  priority
                  unoptimized
                  sizes="100vw"
                  className="object-cover transition-transform duration-1000 hover:scale-[1.02]"
                />
              )}

              {/* Image Overlay */}

              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-modura-primary/40 to-transparent" />

              {/* Image Label */}

              <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-white px-5 py-3">
                <span className="h-2 w-2 bg-modura-secondary" />

                <span className="font-body text-[9px] font-bold uppercase tracking-[3px] text-modura-primary">
                  Modura Design Group
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            ARTICLE AREA
        ===================================================== */}

        <section className="py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-10">
            {/* =================================================
                LEFT SIDEBAR
            ================================================= */}

            <aside className="hidden lg:block">
              <div className="sticky top-28">
                {/* Related Heading */}

                <div className="flex items-center gap-3 font-body text-[12px] font-bold uppercase tracking-[3px] text-modura-secondary">
                  <span className="h-[2px] w-8 bg-modura-secondary" />

                  Related Blogs
                </div>

                {/* Related Blogs */}

                <div className="mt-7 space-y-8">
                  {relatedBlogs.map((item) => {
                    const itemDate = formatDate(item.publishedAt);
                    const itemImage = getImageUrl(
                      item.imageUrl || item.image
                    );

                    return (
                      <Link
                        key={item.slug}
                        href={`/blogDetail/${item.slug}`}
                        className="group block"
                      >
                        {/* Image */}

                        <div className="relative h-[125px] w-full overflow-hidden bg-modura-light">
                          {itemImage && (
                            <Image
                              src={itemImage}
                              alt={item.title}
                              fill
                              unoptimized
                              sizes="240px"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          )}

                          {/* Hover */}

                          <div className="absolute inset-0 bg-modura-primary/0 transition-all duration-500 group-hover:bg-modura-primary/20" />

                          {/* Arrow */}

                          <div className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center bg-white text-modura-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                            <ArrowUpRight size={13} />
                          </div>
                        </div>

                        {/* Date */}

                        <div className="mt-3 font-body text-[11px] font-bold uppercase tracking-[2px] text-modura-secondary">
                          {itemDate.day} {itemDate.month}{" "}
                          {itemDate.year}
                        </div>

                        {/* Title */}

                        <h4 className="mt-2 font-heading text-lg font-semibold uppercase leading-[1.05] text-modura-primary transition-colors duration-300 group-hover:text-modura-secondary">
                          {item.title}
                        </h4>
                      </Link>
                    );
                  })}
                </div>

                {/* Divider */}

                <div className="mt-10 h-px w-full bg-modura-gray-200" />
              </div>
            </aside>

            {/* =================================================
                MAIN ARTICLE
            ================================================= */}

            <article className="max-w-4xl">
              {/* OVERVIEW */}

              <div id="overview" className="scroll-mt-28">
                <div className="mb-8 flex items-center gap-3">
                  <span className="h-[2px] w-10 bg-modura-secondary" />

                  <span className="font-body text-[11px] font-bold uppercase tracking-[3px] text-modura-secondary">
                    Overview
                  </span>
                </div>

                {/* API DESCRIPTION */}

                <div
                  className="font-body text-[15px] leading-8 text-modura-gray-600 md:text-base md:leading-9 [&_p]:mb-7 [&_ul]:mb-7 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-7 [&_ol]:list-decimal [&_ol]:pl-6 [&_h2]:mb-5 [&_h2]:font-heading [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:uppercase [&_h2]:text-modura-primary [&_h3]:mb-4 [&_h3]:font-heading [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-modura-primary [&_img]:h-auto [&_img]:max-w-full"
                  dangerouslySetInnerHTML={{
                    __html: blog.description || "",
                  }}
                />
              </div>

              {/* =================================================
                  KEY INSIGHTS
                  Existing static design/content retained
              ================================================= */}

              <div
                id="insights"
                className="mt-20 scroll-mt-28"
              >
                <span className="font-body text-[11px] font-bold uppercase tracking-[3px] text-modura-secondary">
                  What Matters
                </span>

                <h2 className="mt-4 font-heading text-4xl font-semibold uppercase leading-[0.95] text-modura-primary md:text-5xl">
                  Key

                  <span className="ml-2 text-modura-secondary">
                    Insights
                  </span>
                </h2>

                <div className="mt-10 grid gap-4 md:grid-cols-2">
                  {[
                    "Improved coordination between architecture, structure and other project disciplines.",
                    "Greater accuracy across drawings, models and project documentation.",
                    "Early identification of design conflicts and potential construction issues.",
                    "More efficient collaboration between distributed project teams.",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden border border-modura-gray-200 bg-modura-off-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-modura-secondary"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-3xl font-semibold leading-none text-modura-secondary/40 transition-colors duration-300 group-hover:text-modura-secondary">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <ArrowUpRight
                          size={18}
                          className="text-modura-gray-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-modura-secondary"
                        />
                      </div>

                      <p className="mt-8 font-body text-sm leading-7 text-modura-gray-600">
                        {item}
                      </p>

                      <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-modura-secondary transition-all duration-500 group-hover:w-full" />
                    </div>
                  ))}
                </div>
              </div>

              {/* =================================================
                  HIGHLIGHT
              ================================================= */}

              <div className="relative my-20 overflow-hidden bg-modura-primary px-7 py-12 md:px-12 md:py-14">
                <div className="absolute right-[-40px] top-[-40px] h-36 w-36 rotate-45 border border-white/10" />

                <div className="absolute bottom-[-50px] right-20 h-32 w-32 rotate-45 border border-modura-secondary/30" />

                <div className="relative z-10">
                  <span className="font-body text-[9px] font-bold uppercase tracking-[3px] text-modura-secondary">
                    Modura Perspective
                  </span>

                  <h3 className="mt-5 max-w-2xl font-heading text-3xl font-semibold uppercase leading-[1] text-white md:text-4xl">
                    Better Coordination.
                    <br />
                    Better Decisions.
                    <br />

                    <span className="text-modura-secondary">
                      Better Outcomes.
                    </span>
                  </h3>
                </div>
              </div>

              {/* =================================================
                  OUR APPROACH
                  Existing static content retained
              ================================================= */}

              <div id="approach" className="scroll-mt-28">
                <span className="font-body text-[11px] font-bold uppercase tracking-[3px] text-modura-secondary">
                  Our Perspective
                </span>

                <h2 className="mt-4 font-heading text-4xl font-semibold uppercase leading-[0.95] text-modura-primary md:text-5xl">
                  Our

                  <span className="ml-2 text-modura-secondary">
                    Approach
                  </span>
                </h2>

                <div className="mt-8">
                  <p className="mb-7 font-body text-[15px] leading-8 text-modura-gray-600 md:text-base md:leading-9">
                    At Modura Design Group, we use digital
                    engineering workflows to support accurate
                    modelling, coordination and project delivery.
                    Our approach combines technical expertise
                    with practical project requirements to
                    create reliable outcomes.
                  </p>

                  <p className="mb-7 font-body text-[15px] leading-8 text-modura-gray-600 md:text-base md:leading-9">
                    As construction continues to adopt smarter
                    digital workflows, BIM will remain an
                    important part of delivering efficient,
                    coordinated and future-ready projects.
                  </p>
                </div>
              </div>

              {/* =================================================
                  ARTICLE FOOTER
              ================================================= */}

              <div className="mt-16 flex flex-col gap-6 border-t border-modura-gray-200 pt-7 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="font-body text-[11px] font-bold uppercase tracking-[3px] text-modura-gray-400">
                    Published By
                  </span>

                  <p className="mt-2 font-heading text-lg font-semibold uppercase text-modura-primary">
                    {blog.author || "Modura Design Group"}
                  </p>
                </div>

                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-3 font-body text-[10px] font-bold uppercase tracking-[2px] text-modura-primary transition-colors hover:text-modura-secondary"
                >
                  Explore All Insights

                  <span className="flex h-9 w-9 items-center justify-center bg-modura-secondary text-modura-primary transition-all duration-300 group-hover:bg-modura-primary group-hover:text-white">
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </span>
                </Link>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
