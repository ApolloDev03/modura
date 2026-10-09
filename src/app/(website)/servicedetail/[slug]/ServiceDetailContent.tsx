"use client";

import Image from "next/image";

import Link from "next/link";

import {

    ArrowRight,

    ArrowUpRight,

    ChevronDown,

    DraftingCompass,

} from "lucide-react";

import {

    useLayoutEffect,

    useRef,

    useState,

} from "react";

import { motion } from "framer-motion";

import gsap from "gsap";

import {

    ScrollTrigger,

} from "gsap/ScrollTrigger";

import Breadcrumb from "@/components/Breadcrumb";

gsap.registerPlugin(

    ScrollTrigger

);

/* =========================================================

   TYPES

========================================================= */

type FAQ = {

    id?: number;

    question?: string;

    answer?: string;

};

type Blog = {

    id: number;

    title: string;

    slug: string;

    image?: string;

    imageUrl?: string;

    author?: string;

    description:string;

    publishedAt?: string;

};

type ServiceDetail = {

    id: number;

    title: string;

    slug: string;

    categoryId?: number;

    displayOrder?: number;

    shortDescription?: string;

    description?: string;

    image?: string;

    imageUrl?: string;

    metaTitle?: string;

    metaKeyword?: string;

    metaDescription?: string;

    headScript?: string;

    bodyScript?: string;

    status?: boolean;

    category?: {

        id: number;

        name: string;

        slug: string;

    };

    faqs?: FAQ[];

    blogs?: Blog[];

};

/* =========================================================

   IMAGE URL

========================================================= */

function getImageUrl(

    image?: string,

    imageUrl?: string

) {

    if (imageUrl) {

        return imageUrl;

    }

    if (!image) {

        return "/images/placeholder.jpg";

    }

    if (image.startsWith("http")) {

        return image;

    }

    return `https://mvnl.salexo.co.in${image}`;

}

/* =========================================================

   DATE

========================================================= */

function formatDate(date?: string) {

    if (!date) {

        return "";

    }

    const parsed =

        new Date(date);

    if (

        Number.isNaN(

            parsed.getTime()

        )

    ) {

        return "";

    }

    return parsed.toLocaleDateString(

        "en-US",

        {

            day: "2-digit",

            month: "short",

            year: "numeric",

        }

    );

}

/* =========================================================

   COMPONENT

========================================================= */

export default function ServiceDetailContent({

    service,

}: {

    service: ServiceDetail;

}) {

    const [activeFaq, setActiveFaq] =

        useState<number | null>(

            service.faqs &&

            service.faqs.length > 0

                ? 0

                : null

        );

    const sectionRef =

        useRef<HTMLDivElement | null>(

            null

        );

    /* =====================================================

       GSAP

    ===================================================== */

    useLayoutEffect(() => {

        const ctx =

            gsap.context(() => {

                gsap.from(

                    ".blog-card",

                    {

                        opacity: 0,

                        y: 70,

                        duration: 1,

                        ease: "power3.out",

                        stagger: 0.2,

                        scrollTrigger: {

                            trigger:

                                sectionRef.current,

                            start: "top 75%",

                            once: true,

                        },

                    }

                );

                ScrollTrigger.refresh();

            },

            sectionRef);

        return () =>

            ctx.revert();

    }, []);

function cleanDescription(

    text?: string,

    maxLength = 90

) {

    if (!text) return "";

    const cleanText = text
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/\s+/g, " ")
        .trim();

    if (cleanText.length <= maxLength) {

        return cleanText;

    }

    return `${cleanText.substring(0, maxLength).trim()}...`;

}

    return (

        <main

            className="

                min-h-screen
                w-full
                min-w-0
                overflow-x-clip
                bg-modura-off-white

            "

        >

            {/* =================================================

                BREADCRUMB

            ================================================= */}

            <Breadcrumb

                title={service.title}

            />

            {/* =================================================

                HERO

            ================================================= */}

            <section

                className="

                    bg-white

                "

            >

                <div

                    className="

                        mx-auto

                        max-w-full

                        px-4

                        pb-8

                        pt-6

                        md:px-6

                        sm:pb-12

                        sm:pt-8

                        lg:px-10 2xl:px-16

                        lg:pb-14

                        lg:pt-10

                    "

                >

                    <div

                        className="

                            grid

                            gap-6

                            lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]

                            lg:items-end

                            lg:gap-10

                        "

                    >

                        {/* TITLE */}

                        <div>

                            <div

                                className="

                                    flex

                                    items-center

                                    gap-3

                                "

                            >

                                <span

                                    className="

                                        h-[2px]

                                        w-10

                                        bg-modura-secondary

                                    "

                                />

                                <span

                                    className="

                                        font-body

                                        text-[13px]

                                        font-bold

                                        uppercase

                                        tracking-[0.3em]

                                        text-modura-secondary

                                    "

                                >

                                    Service

                                </span>

                            </div>

                            <h1

                                className="

                                    mt-6

                                    max-w-[800px]

                                    font-heading

                                    text-[clamp(2.5rem,7vw,3.25rem)]

                                    font-bold

                                    leading-[0.9]

                                    tracking-[-0.055em]

                                    text-modura-primary

                                    sm:text-[64px]

                                    lg:text-[clamp(4rem,6vw,6.25rem)]

                                "

                            >

                                {service.title}

                            </h1>

                        </div>

                        {/* SHORT DESCRIPTION */}

                        <p

                            className="

                                max-w-[580px]

                                font-body

                                text-base

                                leading-8

                                text-modura-gray-600

                                lg:pb-2

                                lg:text-lg

                            "

                        >

                            {service.shortDescription ||

                                "Professional engineering and architectural solutions tailored to your project requirements."}

                        </p>

                    </div>

                    {/* IMAGE */}

                    <div

                        className="

                            relative

                            mt-8

                            aspect-[4/3]
                           sm:aspect-[16/9]
                           lg:aspect-[16/7]

                            overflow-hidden

                            bg-modura-light

                            sm:mt-10

                        "

                    >

                        <Image

                            src={getImageUrl(

                                service.image,

                                service.imageUrl

                            )}

                            alt={

                                service.title

                            }

                            fill

                            priority

                            sizes="100vw"

                            className="

                                object-cover

                                transition-transform

                                duration-[1400ms]

                                hover:scale-[1.025]

                            "

                        />

                        <div

                            className="

                                absolute

                                bottom-0

                                left-0

                                h-1

                                w-36

                                bg-modura-secondary

                            "

                        />

                    </div>

                </div>

            </section>

            {/* =================================================

                FULL WIDTH CONTENT

            ================================================= */}

            <section

                className="

                    bg-modura-off-white

                "

            >

                <div

                    className="

                        mx-auto

                        max-w-full

                        px-4

                        py-10 md:py-12

                        md:px-6

                        sm:py-10 md:py-12

                        lg:px-10 2xl:px-16

                    "

                >

                    {/* INTRO */}

                    <div

                        className="

                            mb-8

                            grid

                            gap-8

                            border-b

                            border-modura-gray-300

                            pb-6

                            lg:grid-cols-[minmax(0,1fr)_minmax(0,0.65fr)]

                            lg:items-end

                        "

                    >

                        <div>

                            <span

                                className="

                                    font-body

                                    text-[13px]

                                    font-bold

                                    uppercase

                                    tracking-[0.3em]

                                    text-modura-secondary

                                "

                            >

                                Service Overview

                            </span>

                            <h2

                                className="

                                    mt-5

                                    max-w-[800px]

                                    font-heading

                                    text-4xl

                                    font-bold

                                    leading-[0.95]

                                    tracking-[-0.04em]

                                    text-modura-primary

                                    sm:text-5xl

                                "

                            >

                                Professional solutions.

                                <span

                                    className="

                                        text-modura-secondary

                                    "

                                >

                                    {" "}

                                    Built around your project.

                                </span>

                            </h2>

                        </div>

                        <p

                            className="

                                max-w-[400px]

                                font-body

                                text-sm

                                leading-7

                                text-modura-gray-500

                            "

                        >

                            {service.shortDescription ||

                                "A complete approach to professional project delivery, documentation and coordination."}

                        </p>

                    </div>

                    {/* =================================================

                        API DESCRIPTION

                    ================================================= */}

                    {service.description ? (

                        <article

                            className="

                                service-content

                            "

                            dangerouslySetInnerHTML={{

                                __html:

                                    service.description,

                            }}

                        />

                    ) : (

                        <p

                            className="

                                text-sm

                                text-modura-gray-500

                            "

                        >

                            No description available.

                        </p>

                    )}

                </div>

            </section>

            {/* =================================================

                FAQ

            ================================================= */}

            {service.faqs &&

                service.faqs.length > 0 && (

                    <section

                        className="

                            bg-modura-off-white

                        "

                    >

                        <div

                            className="

                                mx-auto

                                max-w-full

                                px-4

                                py-10 md:py-12

                                md:px-6

                                lg:px-10 2xl:px-16

                            "

                        >

                            {/* HEADER */}

                            <div

                                className="

                                    mb-10

                                    flex

                                    flex-col

                                    gap-5

                                    md:flex-row

                                    md:items-end

                                    md:justify-center

                                "

                            >

                                <div>

                                    <div

                                        className="

                                            flex

                                            items-center

                                            justify-center

                                            gap-3

                                        "

                                    >

                                        <span

                                            className="

                                                flex

                                                h-6

                                                w-6

                                                shrink-0

                                                items-center

                                                justify-center

                                                text-modura-secondary

                                            "

                                        >

                                            <DraftingCompass

                                                size={19}

                                                strokeWidth={1.5}

                                            />

                                        </span>

                                        <span

                                            className="

                                                font-body

                                                text-[12px]

                                                font-bold

                                                uppercase

                                                tracking-[0.3em]

                                                text-modura-secondary

                                            "

                                        >

                                            FAQ

                                        </span>

                                    </div>

                                    <h2

                                        className="

                                            mt-5

                                            text-center

                                            font-heading

                                            text-4xl

                                            font-bold

                                            leading-[0.92]

                                            tracking-[-0.045em]

                                            text-modura-primary

                                            sm:text-5xl

                                            lg:text-6xl

                                        "

                                    >

                                        Questions

                                        <span

                                            className="

                                                text-modura-secondary

                                            "

                                        >

                                            {" "}

                                            explained.

                                        </span>

                                    </h2>

                                </div>

                            </div>

                            {/* FAQ LIST */}

                            <div

                                className="

                                    overflow-hidden

                                    border-t

                                    border-modura-primary

                                    bg-white

                                "

                            >

                                {service.faqs.map(

                                    (

                                        faq,

                                        index

                                    ) => {

                                        const active =

                                            activeFaq ===

                                            index;

                                        return (

                                            <div

                                                key={

                                                    faq.id ??

                                                    faq.question ??

                                                    index

                                                }

                                                className={`

                                                    relative

                                                    border-b

                                                    border-modura-gray-200

                                                    transition-all

                                                    duration-500

                                                    ${

                                                        active

                                                            ? "bg-modura-light"

                                                            : "bg-white"

                                                    }

                                                `}

                                            >

                                                {/* ACTIVE SIDE */}

                                                <span

                                                    className={`

                                                        absolute

                                                        left-0

                                                        top-0

                                                        h-full

                                                        bg-modura-secondary

                                                        transition-all

                                                        duration-500

                                                        ${

                                                            active

                                                                ? "w-[3px]"

                                                                : "w-0"

                                                        }

                                                    `}

                                                />

                                                {/* QUESTION */}

                                                <button

                                                    type="button"

                                                    onClick={() =>

                                                        setActiveFaq(

                                                            active

                                                                ? null

                                                                : index

                                                        )

                                                    }

                                                    className="

                                                        group

                                                        flex

                                                        min-h-[72px]

                                                        w-full

                                                        items-center

                                                        gap-5

                                                        px-4

                                                        py-4

                                                        text-left

                                                        sm:min-h-[78px]

                                                        md:px-6

                                                    "

                                                >

                                                    <span

                                                        className={`

                                                            relative

                                                            flex

                                                            h-7

                                                            w-7

                                                            shrink-0

                                                            items-center

                                                            justify-center

                                                            border

                                                            transition-all

                                                            duration-500

                                                            ${

                                                                active

                                                                    ? "rotate-45 border-modura-secondary bg-modura-secondary"

                                                                    : "border-modura-gray-300 bg-white group-hover:border-modura-secondary"

                                                            }

                                                        `}

                                                    >

                                                        <span

                                                            className={`

                                                                absolute

                                                                h-px

                                                                w-3

                                                                ${

                                                                    active

                                                                        ? "bg-white"

                                                                        : "bg-modura-primary"

                                                                }

                                                            `}

                                                        />

                                                        <span

                                                            className={`

                                                                absolute

                                                                h-3

                                                                w-px

                                                                transition-transform

                                                                duration-300

                                                                ${

                                                                    active

                                                                        ? "scale-y-0 bg-white"

                                                                        : "bg-modura-primary"

                                                                }

                                                            `}

                                                        />

                                                    </span>

                                                    <span

                                                        className={`

                                                            flex-1

                                                            font-heading

                                                            text-[15px]

                                                            font-semibold

                                                            leading-6

                                                            transition-all

                                                            duration-300

                                                            sm:text-[17px]

                                                            ${

                                                                active

                                                                    ? "translate-x-1 text-modura-primary"

                                                                    : "text-modura-gray-700 group-hover:translate-x-1 group-hover:text-modura-primary"

                                                            }

                                                        `}

                                                    >

                                                        {

                                                            faq.question

                                                        }

                                                    </span>

                                                    <ChevronDown

                                                        size={18}

                                                        className={`

                                                            transition-transform

                                                            duration-300

                                                            ${

                                                                active

                                                                    ? "rotate-180 text-modura-secondary"

                                                                    : "text-modura-gray-400"

                                                            }

                                                        `}

                                                    />

                                                </button>

                                                {/* ANSWER */}

                                                <div

                                                    className={`

                                                        grid

                                                        transition-all

                                                        duration-500

                                                        ease-[cubic-bezier(0.22,1,0.36,1)]

                                                        ${

                                                            active

                                                                ? "grid-rows-[1fr] opacity-100"

                                                                : "grid-rows-[0fr] opacity-0"

                                                        }

                                                    `}

                                                >

                                                    <div

                                                        className="

                                                            overflow-hidden

                                                        "

                                                    >

                                                        <div

                                                            className="

                                                                flex

                                                                gap-5

                                                                px-4

                                                                pb-6

                                                                pl-[60px]

                                                                md:px-6

                                                                sm:pb-7

                                                                sm:pl-[76px]

                                                            "

                                                        >

                                                            <div

                                                                className="

                                                                    max-w-[760px]

                                                                    border-l

                                                                    border-modura-secondary

                                                                    pl-5

                                                                "

                                                            >

                                                                <p

                                                                    className="

                                                                        font-body

                                                                        text-[13px]

                                                                        leading-6

                                                                        text-modura-gray-600

                                                                        sm:text-sm

                                                                        sm:leading-7

                                                                    "

                                                                >

                                                                    {

                                                                        faq.answer

                                                                    }

                                                                </p>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        );

                                    }

                                )}

                            </div>

                        </div>

                    </section>

                )}

            {/* =================================================

                BLOGS

            ================================================= */}

            {service.blogs &&

                service.blogs.length > 0 && (

                    <section

                        ref={sectionRef}

                        className="

                            relative

                            overflow-hidden

                            bg-modura-off-white

                            py-10 md:py-12

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

    lg:px-10 2xl:px-16

    2xl:px-16

                            "

                        >

                            {/* HEADER */}

                            <div

                                className="

                                    mb-8

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

                                        text-modura-primary

                                        lg:text-6xl

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

                                {service.blogs.map(

                                    (

                                        blog

                                    ) => (

                                        <motion.article

                                            key={

                                                blog.id

                                            }

                                            whileHover={{

                                                y: -12,

                                            }}

                                            transition={{

                                                duration:

                                                    0.35,

                                            }}

                                            className="

                                                blog-card

                                                overflow-hidden

                                                bg-white

                                                shadow-xl

                                            "

                                        >

                                            {/* IMAGE */}

                                            <Link

                                                href={`/blogDetail/${blog.slug}`}

                                            >

                                                <div

                                                    className="

                                                        relative

                                                        h-[200px]
                                                       sm:h-[230px]

                                                        overflow-hidden

                                                    "

                                                >

                                                    <Image

                                                        src={getImageUrl(

                                                            blog.image,

                                                            blog.imageUrl

                                                        )}

                                                        alt={

                                                            blog.title

                                                        }

                                                        fill

                                                        sizes="400px"

                                                        className="

                                                            object-cover

                                                            transition-transform

                                                            duration-700

                                                            hover:scale-110

                                                        "

                                                    />

                                                </div>

                                            </Link>

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

                                                        text-sm

                                                        font-bold

                                                        uppercase

                                                        tracking-wide

                                                        text-modura-black

                                                    "

                                                >

                                                    {

                                                        formatDate(

                                                            blog.publishedAt

                                                        )

                                                    }

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

                                                    {

                                                        blog.title

                                                    }

                                                </h3>

                                                {blog.description && (

            <p

                className="

                    mt-3

                    font-body

                    text-sm

                    leading-7

                    text-modura-black

                "

            >

                {cleanDescription(blog.description, 90)}

            </p>

        )}

                                                {/* BUTTON */}

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

                                        </motion.article>

                                    )

                                )}

                            </div>

                        </div>

                    </section>

                )}

        </main>

    );

}