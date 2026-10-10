"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, DraftingCompass } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import axios from "axios";

import Breadcrumb from "@/components/Breadcrumb";

import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "https://mvnl.salexo.co.in/api/v1"
).replace(/\/+$/, "");

interface Blog {
  id: number;
  title: string;
  slug: string;
  author?: string;
  image?: string;
  imageUrl?: string;
  publishedAt?: string;
  description?: string;
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

interface BlogApiResponse {
  success: boolean;
  message: string;
  data: {
    items: Blog[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

/* ---------------------------------------
   Remove HTML + Create Short Description
---------------------------------------- */

const getShortDescription = (
  html: string | undefined,
  limit = 85
): string => {
  if (!html) {
    return "";
  }

  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= limit) {
    return text;
  }

  return `${text.substring(0, limit).trimEnd()}...`;
};

/* ---------------------------------------
   Format API Date
---------------------------------------- */

const formatDate = (dateString?: string) => {
  if (!dateString) {
    return {
      day: "",
      month: "",
      year: "",
    };
  }

  const date = new Date(dateString);

  return {
    day: date.toLocaleDateString("en-GB", {
      day: "2-digit",
    }),

    month: date
      .toLocaleDateString("en-US", {
        month: "short",
      })
      .toUpperCase(),

    year: date.toLocaleDateString("en-GB", {
      year: "numeric",
    }),
  };
};

export default function BlogSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ---------------------------------------
     GET BLOGS - POST METHOD
  ---------------------------------------- */

  useLayoutEffect(() => {
    let mounted = true;

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.post<BlogApiResponse>(
          `${API_URL}/blogs`,
          {
            search: "",
            category: "",
            page: 1,
            limit: 10,
          }
        );

        if (!mounted) return;

        if (response.data?.success) {
          setBlogs(response.data.data?.items || []);
        } else {
          setBlogs([]);
          setError("Unable to load blogs.");
        }
      } catch (err) {
        console.error("Blog API Error:", err);

        if (mounted) {
          setBlogs([]);
          setError("Unable to load blogs.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchBlogs();

    return () => {
      mounted = false;
    };
  }, []);

  /* ---------------------------------------
     GSAP ANIMATION
  ---------------------------------------- */

  useLayoutEffect(() => {
    if (loading || blogs.length === 0) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".blog-card", {
        opacity: 0,
        y: 70,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, blogs]);

  return (
    <>
      <Breadcrumb title="Blog" />

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
            mx-auto
            max-w-7xl
            px-6
          "
        >
          {/* HEADER */}

          <div
            className="
              mb-14
              grid
              gap-8
              lg:grid-cols-2
              lg:items-end
            "
          >
            {/* LEFT */}

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

                <span>OUR BLOG</span>
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

                <span className="ml-2 text-modura-secondary">
                  Insights
                </span>
              </h2>
            </div>

            {/* RIGHT */}

            <div className="lg:flex lg:justify-end">
              <p
                className="
                  max-w-md
                  border-l-2
                  border-modura-secondary
                  pl-5
                  font-body
                  text-sm
                  leading-7
                  text-modura-gray-600
                "
              >
                Explore our latest engineering insights, industry trends and
                practical ideas covering BIM, architecture, construction and
                project management.
              </p>
            </div>
          </div>

          {/* LOADING */}

          {loading && (
            <div
              className="
                grid
                gap-8
                md:grid-cols-2
                lg:grid-cols-3
              "
            >
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                    h-[500px]
                    animate-pulse
                    bg-white
                    shadow-xl
                  "
                />
              ))}
            </div>
          )}

          {/* ERROR */}

          {!loading && error && (
            <div className="py-16 text-center">
              <p className="font-body text-modura-gray-600">
                {error}
              </p>
            </div>
          )}

          {/* NO BLOG */}

          {!loading && !error && blogs.length === 0 && (
            <div className="py-16 text-center">
              <p className="font-body text-modura-gray-600">
                No blogs found.
              </p>
            </div>
          )}

          {/* BLOG GRID */}

          {!loading && !error && blogs.length > 0 && (
            <div
              className="
                grid
                gap-8
                md:grid-cols-2
                lg:grid-cols-3
              "
            >
              {blogs.map((blog) => {
                const date = formatDate(blog.publishedAt);

                const image =
                  blog.imageUrl ||
                  (blog.image
                    ? blog.image.startsWith("http")
                      ? blog.image
                      : `https://mvnl.salexo.co.in${blog.image}`
                    : "/images/blog-placeholder.jpg");

                return (
                  <motion.article
                    key={blog.id}
                    whileHover={{
                      y: -12,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                    className="
                      blog-card
                      blog-card-shape
                      h-[500px]
                      overflow-hidden
                      bg-white
                      shadow-xl
                    "
                  >
                    <Link
                      href={`/blogDetail/${blog.slug}`}
                      className="block h-full"
                    >
                      {/* IMAGE */}

                      <div
                        className="
                          blog-image-shape
                          relative
                          h-[230px]
                          overflow-hidden
                        "
                      >
                        <Image
                          src={image}
                          alt={blog.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                          className="
                            object-cover
                            transition-transform
                            duration-700
                            hover:scale-110
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
                            text-lg
                            font-bold
                            tracking-wide
                            text-modura-black
                          "
                        >
                          {date.day} {date.month} {date.year}
                        </div>



                        {/* TITLE */}

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

                        {/* DESCRIPTION */}

                        <p
                          className="
                            mt-2
                            font-body
                            text-sm
                            leading-7
                            text-modura-black
                          "
                        >
                          {getShortDescription(blog.description, 85)}
                        </p>

                        {/* READ MORE */}

                        <div
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
                            border-2
                            border-modura-secondary
                            bg-modura-white
                            px-7
                            font-body
                            font-semibold
                            text-modura-primary
                            clip-read-btn
                            transition-all
                            duration-500
                          "
                        >
                          {/* Hover Layer */}

                          <span
                            className="
                              absolute
                              inset-0
                              translate-y-full
                              bg-modura-secondary
                              transition-transform
                              duration-500
                              ease-out
                              group-hover:translate-y-0
                            "
                          />

                          {/* TEXT */}

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
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}