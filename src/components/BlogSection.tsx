"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, DraftingCompass } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface Blog {
  id: number;
  title: string;
  slug: string;
  image: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  description:string;
}

interface BlogSectionProps {
  blogs: Blog[];
}

export default function BlogSection({
  blogs,
}: BlogSectionProps) {
  const sectionRef =
    useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
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
  }, []);
const getShortDescription = (html: string, limit = 80) => {
  const text = html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

  return text.length > limit
    ? text.substring(0, limit).trimEnd() + "..."
    : text;
};
  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-modura-off-white
       py-10
        lg:py-16
      "
    >
      <div
        className="
          relative
          z-10
          mx-auto
          max-w-full
           px-4
    md:px-6
    lg:grid-cols-2
    lg:gap-12
    lg:px-10
    xl:gap-16
    2xl:px-16
        "
      >
        {/* HEADER */}

        <div
          className="
            mb-14
            text-center
          "
        >
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
           text-lg
lg:text-5xl
              font-semibold
              text-modura-primary
            
            "
          >
            Engineering

            <span
              className="
                ml-2
                text-modura-secondary
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
            gap-8
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {blogs.map((blog) => (
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
              {/* IMAGE */}

              <Link
                href={`/blogDetail/${blog.slug}`}
                className="block"
              >
                <div
                  className="
                    blog-image-shape
                    group
                    relative
                    h-[230px]
                    overflow-hidden
                  "
                >
                  <Image
                    src={
                      blog.imageUrl ||
                      blog.image
                    }
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
                      text-lg
                      font-bold
                      tracking-wide
                      text-modura-black
                    "
                  >
                    {new Date(
                      blog.publishedAt
                    ).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
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
                      font-body
                      text-sm
                      leading-7
                      text-modura-black
                    "
                  >
                   {getShortDescription(blog.description, 80)}
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
                        group-hover:translate-x-1
                        group-hover:rotate-12
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
          ))}
        </div>
      </div>
    </section>
  );
}