"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

import {
    FiArrowRight,
    FiArrowUpRight,
    FiAward,
    FiBookOpen,
    FiChevronDown,
    FiChevronRight,
    FiFileText,
    FiHelpCircle,
    FiMenu,
    FiShield,
    FiUsers,
    FiX,
} from "react-icons/fi";

import {
    PiBlueprint,
    PiBuildings,
    PiStack,
} from "react-icons/pi";

import logo from "../app/(website)/assets/images/logo.png";
import AnimatedButton from "./AnimatedButton";
import { apiUrl } from "@/app/(website)/config";


/* =========================================================
   TYPES
========================================================= */

type CompanyLink = {
    title: string;
    href: string;
    icon: React.ElementType;
};


type CategoryApiItem = {
    id: number;
    name: string;
    slug: string;
    image?: string;
    imageUrl?: string;
};


type ServiceApiItem = {
    id: number;
    title: string;
    slug: string;
    shortDescription?: string;
    image?: string;
    imageUrl?: string;
    categoryId: number;
    category?: {
        id: number;
        name: string;
        slug: string;
    };
};


type SoftwareItem = {
    id: number;
    name: string;
    slug: string;
    shortDescription?: string;
    image?: string;
    imageUrl?: string;
};


type PortfolioCategory = {
    id: number;
    name: string;
    slug: string;
    type: string;
};


/* =========================================================
   COMPANY
========================================================= */

const companyLinks: CompanyLink[] = [
    {
        title: "About Modura",
        href: "/company#about",
        icon: PiBuildings,
    },
    {
        title: "Why Choose Us",
        href: "/company#why-us",
        icon: FiShield,
    },
    {
        title: "Our Team",
        href: "/company#team",
        icon: FiUsers,
    },
    {
        title: "Quality Policy",
        href: "/company#quality-policy",
        icon: FiFileText,
    },
    {
        title: "Certifications",
        href: "/company#certifications",
        icon: FiAward,
    },
 
    {
        title: "FAQs",
        href: "/company#faqs",
        icon: FiHelpCircle,
    },
    {
        title: "Blog",
        href: "/company#blog",
        icon: FiBookOpen,
    },
];


/* =========================================================
   API FUNCTIONS
========================================================= */

async function fetchCategories(): Promise<CategoryApiItem[]> {
    try {
        const response = await axios.post(
            `${apiUrl}/categories`
        );

        if (response.data?.success) {
            return response.data.data || [];
        }

        return [];
    } catch (error) {
        console.error(
            "Categories API Error:",
            error
        );

        return [];
    }
}


async function fetchServices(
    categorySlug: string
): Promise<ServiceApiItem[]> {
    try {
        const response = await axios.post(
            `${apiUrl}/services`,
            {
                category: categorySlug || "",
            }
        );

        if (response.data?.success) {
            return response.data.data || [];
        }

        return [];
    } catch (error) {
        console.error(
            "Services API Error:",
            error
        );

        return [];
    }
}


async function fetchSoftwareExpertise(): Promise<
    SoftwareItem[]
> {
    try {
        const response = await axios.post(
            `${apiUrl}/softwareExpertise`
        );

        if (response.data?.success) {
            return response.data.data || [];
        }

        return [];
    } catch (error) {
        console.error(
            "Software Expertise API Error:",
            error
        );

        return [];
    }
}


async function fetchPortfolioCategories(): Promise<
    PortfolioCategory[]
> {
    try {
        const response = await axios.post(
            `${apiUrl}/portfoliocategories`,
            {
                type: "",
            }
        );

        if (response.data?.success) {
            return response.data.data || [];
        }

        return [];
    } catch (error) {
        console.error(
            "Portfolio Categories API Error:",
            error
        );

        return [];
    }
}


/* =========================================================
   HEADER
========================================================= */

export default function Header() {

    /* =====================================================
       DESKTOP STATES
    ===================================================== */

    const [activeService, setActiveService] =
        useState(0);


    const portfolioScrollRef =
        useRef<HTMLDivElement>(null);


    /* =====================================================
       MOBILE STATES
    ===================================================== */

    const [mobileMenu, setMobileMenu] =
        useState(false);

    const [mobileSection, setMobileSection] =
        useState<string | null>(null);

    const [mobileServiceCategory, setMobileServiceCategory] =
        useState<number | null>(null);


    /* =====================================================
       API STATES
    ===================================================== */

    const [categories, setCategories] =
        useState<CategoryApiItem[]>([]);

    const [services, setServices] =
        useState<ServiceApiItem[]>([]);

    const [softwareExpertise, setSoftwareExpertise] =
        useState<SoftwareItem[]>([]);

    const [portfolioCategories, setPortfolioCategories] =
        useState<PortfolioCategory[]>([]);

    const [loadingCategories, setLoadingCategories] =
        useState(true);

    const [loadingServices, setLoadingServices] =
        useState(false);

    const [loadingSoftware, setLoadingSoftware] =
        useState(true);

    const [loadingPortfolio, setLoadingPortfolio] =
        useState(true);


    /* =====================================================
       SERVICE CACHE
    ===================================================== */

    const serviceCache =
        useRef<Record<string, ServiceApiItem[]>>({});


    /* =====================================================
       SELECTED CATEGORY
    ===================================================== */

    const selectedCategory =
        categories[activeService];


    /* =====================================================
       INITIAL API LOAD
    ===================================================== */

    useEffect(() => {

        const loadHeaderData = async () => {

            setLoadingCategories(true);
            setLoadingSoftware(true);
            setLoadingPortfolio(true);


            const [
                categoryData,
                softwareData,
                portfolioData,
            ] = await Promise.all([
                fetchCategories(),
                fetchSoftwareExpertise(),
                fetchPortfolioCategories(),
            ]);


            setCategories(categoryData);

            setSoftwareExpertise(
                softwareData
            );

            setPortfolioCategories(
                portfolioData
            );


            setLoadingCategories(false);
            setLoadingSoftware(false);
            setLoadingPortfolio(false);

        };


        loadHeaderData();

    }, []);


    /* =====================================================
       LOAD SERVICES WHEN CATEGORY CHANGES
    ===================================================== */

    useEffect(() => {

        if (!selectedCategory?.slug) {
            setServices([]);
            return;
        }


        const slug =
            selectedCategory.slug;


        const loadServices = async () => {

            /* Use cached data if available */

            if (serviceCache.current[slug]) {

                setServices(
                    serviceCache.current[slug]
                );

                return;
            }


            setLoadingServices(true);


            const data =
                await fetchServices(slug);


            serviceCache.current[slug] =
                data;


            setServices(data);


            setLoadingServices(false);

        };


        loadServices();

    }, [selectedCategory?.slug]);


    /* =====================================================
       MOBILE SECTION
    ===================================================== */

    const toggleMobileSection = (
        section: string
    ) => {

        setMobileSection((current) =>
            current === section
                ? null
                : section
        );

    };


    /* =====================================================
       MOBILE SERVICE CATEGORY
    ===================================================== */

    const handleMobileServiceCategory = async (
        index: number,
        slug: string
    ) => {

        const isAlreadyOpen =
            mobileServiceCategory === index;


        if (isAlreadyOpen) {

            setMobileServiceCategory(null);

            return;

        }


        setMobileServiceCategory(index);


        if (serviceCache.current[slug]) {

            setServices(
                serviceCache.current[slug]
            );

            return;

        }


        setLoadingServices(true);


        const data =
            await fetchServices(slug);


        serviceCache.current[slug] =
            data;


        setServices(data);


        setLoadingServices(false);

    };


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <header
            className="
                sticky
                top-0
                z-[100]
                border-b
                border-modura-gray-200
                bg-modura-white
                shadow-[0_4px_20px_rgba(11,29,51,0.06)]
            "
        >

            <div
                className="
                    mx-auto
                    max-w-[1440px]
                    px-5
                    xl:px-8
                    2xl:px-10
                "
            >

                <div
                    className="
                        flex
                        h-[118px]
                        items-center
                        justify-between
                    "
                >

                    {/* =================================================
                        LOGO
                    ================================================= */}

                    <Link
                        href="/"
                        className="
                            flex
                            h-full
                            w-[190px]
                            shrink-0
                            items-center
                        "
                    >

                        <div
                            className="
                                relative
                                h-[100px]
                                w-[170px]
                            "
                        >

                            <Image
                                src={logo}
                                alt="Modura Design Group"
                                fill
                                priority
                                className="object-contain"
                            />

                        </div>

                    </Link>


                    {/* =================================================
                        DESKTOP NAV
                    ================================================= */}

                    <nav
                        className="
                            hidden
                            h-full
                            items-center
                            lg:flex
                        "
                    >

                        {/* =================================================
                            COMPANY
                        ================================================= */}

                        <div
                            className="
                                group/company
                                relative
                                flex
                                h-full
                                items-center
                            "
                        >

                            <DesktopDropdownTrigger
                                title="Company"
                            />


                            <div
                                className="
                                    invisible
                                    pointer-events-none
                                    absolute
                                    left-1/2
                                    top-[calc(100%-5px)]
                                    w-[320px]
                                    -translate-x-1/2
                                    translate-y-[18px]
                                    scale-[0.96]
                                    origin-top
                                    opacity-0
                                    transition-all
                                    duration-300
                                    ease-out

                                    group-hover/company:visible
                                    group-hover/company:pointer-events-auto
                                    group-hover/company:translate-y-0
                                    group-hover/company:scale-100
                                    group-hover/company:opacity-100
                                "
                            >

                                <DropdownTopLine />

                                <div
                                    className="
                                        overflow-hidden
                                        border
                                        border-modura-gray-200
                                        bg-modura-white
                                        shadow-[0_24px_70px_rgba(11,29,51,0.18)]
                                    "
                                >

                                    <div className="px-5 pb-5">

                                        <div
                                            className="
                                                max-h-[430px]
                                                overflow-y-auto
                                                overscroll-contain
                                                pr-1
                                                [scrollbar-width:none]
                                                [-ms-overflow-style:none]
                                                [&::-webkit-scrollbar]:hidden
                                            "
                                        >

                                            {companyLinks.map(
                                                (item) => {

                                                    const Icon =
                                                        item.icon;

                                                    return (
                                                        <AnimatedIconItem
                                                            key={
                                                                item.title
                                                            }
                                                            href={
                                                                item.href
                                                            }
                                                            title={
                                                                item.title
                                                            }
                                                            icon={
                                                                <Icon />
                                                            }
                                                        />
                                                    );

                                                }
                                            )}

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            SERVICES
                        ================================================= */}

                        <div
                            className="
                                group/services
                                relative
                                flex
                                h-full
                                items-center
                            "
                        >

                            <DesktopDropdownTrigger
                                title="Services"
                            />


                            <div
                                className="
                                    invisible
                                    pointer-events-none
                                    absolute
                                    left-1/2
                                    top-[calc(100%-5px)]
                                    w-[650px]
                                    -translate-x-1/2
                                    translate-y-[18px]
                                    scale-[0.97]
                                    origin-top
                                    opacity-0
                                    transition-all
                                    duration-300
                                    ease-out

                                    group-hover/services:visible
                                    group-hover/services:pointer-events-auto
                                    group-hover/services:translate-y-0
                                    group-hover/services:scale-100
                                    group-hover/services:opacity-100
                                "
                            >

                                <DropdownTopLine />


                                <div
                                    className="
                                        grid
                                        grid-cols-[275px_375px]
                                        overflow-hidden
                                        border
                                        border-modura-gray-200
                                        bg-modura-white
                                        shadow-[0_24px_70px_rgba(11,29,51,0.18)]
                                    "
                                >

                                    {/* =====================================
                                        LEFT CATEGORY
                                    ===================================== */}

                                    <div
                                        className="
                                            border-r
                                            border-modura-secondary
                                            bg-modura-primary-light
                                            p-4
                                        "
                                    >

                                        <div
                                            className="
                                                mb-4
                                                px-3
                                            "
                                        >

                                            <span
                                                className="
                                                    text-[12px]
                                                    font-bold
                                                    uppercase
                                                    tracking-[0.2em]
                                                    text-modura-secondary-light
                                                "
                                            >
                                                Our Categories
                                            </span>

                                            <h3
                                                className="
                                                    mt-1
                                                    text-[21px]
                                                    font-semibold
                                                    text-modura-white
                                                "
                                            >
                                                Services
                                            </h3>

                                        </div>


                                        <div
                                            className="
                                                max-h-[384px]
                                                overflow-y-auto
                                                overscroll-contain
                                                pr-1
                                                [scrollbar-width:none]
                                                [-ms-overflow-style:none]
                                                [&::-webkit-scrollbar]:hidden
                                            "
                                        >

                                            {loadingCategories ? (

                                                <div
                                                    className="
                                                        px-4
                                                        py-6
                                                        text-[11px]
                                                        text-modura-gray-300
                                                    "
                                                >
                                                    Loading categories...
                                                </div>

                                            ) : categories.length === 0 ? (

                                                <div
                                                    className="
                                                        px-4
                                                        py-6
                                                        text-[11px]
                                                        text-modura-gray-300
                                                    "
                                                >
                                                    No categories found.
                                                </div>

                                            ) : (

                                                categories.map(
                                                    (
                                                        category,
                                                        index
                                                    ) => {

                                                        const active =
                                                            activeService ===
                                                            index;


                                                        return (

                                                            <button
                                                                key={
                                                                    category.id
                                                                }
                                                                type="button"
                                                                onMouseEnter={() =>
                                                                    setActiveService(
                                                                        index
                                                                    )
                                                                }
                                                                onFocus={() =>
                                                                    setActiveService(
                                                                        index
                                                                    )
                                                                }
                                                                className={`
                                                                    group/servicecategory
                                                                    relative
                                                                    flex
                                                                    w-full
                                                                    items-center
                                                                    justify-between
                                                                    overflow-hidden
                                                                    px-4
                                                                    py-[8px]
                                                                    text-left
                                                                    text-[11.5px]
                                                                    transition-all
                                                                    duration-300

                                                                    ${
                                                                        active
                                                                            ? "bg-modura-white font-semibold text-modura-primary shadow-[0_5px_18px_rgba(11,29,51,0.06)]"
                                                                            : "text-modura-gray-200 hover:bg-modura-primary hover:text-modura-white"
                                                                    }
                                                                `}
                                                            >

                                                                <span
                                                                    className={`
                                                                        absolute
                                                                        left-0
                                                                        top-1/2
                                                                        w-[3px]
                                                                        -translate-y-1/2
                                                                        bg-modura-primary
                                                                        transition-all
                                                                        duration-300

                                                                        ${
                                                                            active
                                                                                ? "h-[60%]"
                                                                                : "h-0 group-hover/servicecategory:h-[60%]"
                                                                        }
                                                                    `}
                                                                />


                                                                <span
                                                                    className={`
                                                                        absolute
                                                                        bottom-0
                                                                        left-0
                                                                        h-px
                                                                        bg-modura-secondary
                                                                        transition-all
                                                                        duration-500

                                                                        ${
                                                                            active
                                                                                ? "w-full"
                                                                                : "w-0 group-hover/servicecategory:w-full"
                                                                        }
                                                                    `}
                                                                />


                                                                <span
                                                                    className={`
                                                                        relative
                                                                        transition-transform
                                                                        duration-300

                                                                        ${
                                                                            active
                                                                                ? "translate-x-2"
                                                                                : "group-hover/servicecategory:translate-x-2"
                                                                        }
                                                                    `}
                                                                >
                                                                    {
                                                                        category.name
                                                                    }
                                                                </span>


                                                                <span
                                                                    className={`
                                                                        flex
                                                                        h-6
                                                                        w-6
                                                                        items-center
                                                                        justify-center
                                                                        border
                                                                        transition-all
                                                                        duration-300

                                                                        ${
                                                                            active
                                                                                ? "translate-x-0 border-modura-primary text-modura-primary opacity-100"
                                                                                : "translate-x-2 border-transparent text-modura-secondary opacity-0 group-hover/servicecategory:translate-x-0 group-hover/servicecategory:border-modura-primary group-hover/servicecategory:text-modura-primary group-hover/servicecategory:opacity-100"
                                                                        }
                                                                    `}
                                                                >
                                                                    <FiChevronRight />
                                                                </span>

                                                            </button>

                                                        );

                                                    }
                                                )

                                            )}

                                        </div>

                                    </div>


                                    {/* =====================================
                                        RIGHT SERVICES
                                    ===================================== */}

                                    <div
                                        className="
                                            px-6
                                            py-6
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                items-start
                                                justify-between
                                                gap-6
                                            "
                                        >

                                            <div>

                                                <span
                                                    className="
                                                        text-[12px]
                                                        font-bold
                                                        uppercase
                                                        tracking-[0.2em]
                                                        text-modura-secondary
                                                    "
                                                >
                                                    Selected Services
                                                </span>


                                                <h3
                                                    className="
                                                        mt-2
                                                        max-w-[300px]
                                                        text-[21px]
                                                        font-semibold
                                                        leading-[1.25]
                                                        text-modura-primary
                                                    "
                                                >
                                                    {
                                                        selectedCategory?.name ||
                                                        "Services"
                                                    }
                                                </h3>

                                            </div>


                                            <Link
                                                href={
                                                    selectedCategory
                                                        ? `/services/${selectedCategory.slug}`
                                                        : "/services"
                                                }
                                                className="
                                                    group/viewcategory
                                                    relative
                                                    flex
                                                    h-10
                                                    w-10
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    overflow-hidden
                                                    border
                                                    border-modura-primary
                                                    text-modura-primary
                                                    transition-colors
                                                    duration-300
                                                    hover:text-modura-white
                                                "
                                            >

                                                <span
                                                    className="
                                                        absolute
                                                        inset-0
                                                        origin-bottom
                                                        scale-y-0
                                                        bg-modura-primary
                                                        transition-transform
                                                        duration-300
                                                        group-hover/viewcategory:scale-y-100
                                                    "
                                                />

                                                <FiArrowUpRight
                                                    className="
                                                        relative
                                                        z-10
                                                        transition-transform
                                                        duration-300
                                                        group-hover/viewcategory:rotate-45
                                                    "
                                                />

                                            </Link>

                                        </div>


                                     


                                        {/* SERVICE LIST */}

                                        <div
                                            className="
                                                mt-5
                                                border-t
                                                border-modura-gray-200
                                            "
                                        >

                                            {loadingServices ? (

                                                <div
                                                    className="
                                                        py-7
                                                        text-center
                                                        text-[11px]
                                                        text-modura-gray-500
                                                    "
                                                >
                                                    Loading services...
                                                </div>

                                            ) : services.length === 0 ? (

                                                <div
                                                    className="
                                                        py-7
                                                        text-center
                                                        text-[11px]
                                                        text-modura-gray-500
                                                    "
                                                >
                                                    No services available.
                                                </div>

                                            ) : (

                                                services.map(
                                                    (service) => (

                                                        <Link
                                                            key={
                                                                service.id
                                                            }
                                                            href={`/servicedetail/${service.slug}`}
                                                            className="
                                                                group/subservice
                                                                relative
                                                                flex
                                                                min-h-[48px]
                                                                items-center
                                                                justify-between
                                                                overflow-hidden
                                                                border-b
                                                                border-modura-gray-200
                                                                px-1
                                                            "
                                                        >

                                                            <span
                                                                className="
                                                                    absolute
                                                                    left-0
                                                                    top-1/2
                                                                    h-0
                                                                    w-[3px]
                                                                    -translate-y-1/2
                                                                    bg-modura-primary
                                                                    transition-all
                                                                    duration-300
                                                                    group-hover/subservice:h-[26px]
                                                                "
                                                            />


                                                            <span
                                                                className="
                                                                    absolute
                                                                    bottom-0
                                                                    left-0
                                                                    h-[2px]
                                                                    w-0
                                                                    bg-modura-primary
                                                                    transition-all
                                                                    duration-500
                                                                    group-hover/subservice:w-full
                                                                "
                                                            />


                                                            <span
                                                                className="
                                                                    relative
                                                                    text-[12px]
                                                                    font-medium
                                                                    text-modura-gray-700
                                                                    transition-all
                                                                    duration-300
                                                                    group-hover/subservice:translate-x-3
                                                                    group-hover/subservice:font-semibold
                                                                    group-hover/subservice:text-modura-primary
                                                                "
                                                            >
                                                                {
                                                                    service.title
                                                                }
                                                            </span>


                                                            <span
                                                                className="
                                                                    relative
                                                                    flex
                                                                    h-7
                                                                    w-7
                                                                    translate-x-3
                                                                    items-center
                                                                    justify-center
                                                                    border
                                                                    border-transparent
                                                                    text-modura-secondary
                                                                    opacity-0
                                                                    transition-all
                                                                    duration-300
                                                                    group-hover/subservice:translate-x-0
                                                                    group-hover/subservice:rotate-[-45deg]
                                                                    group-hover/subservice:border-modura-primary
                                                                    group-hover/subservice:text-modura-primary
                                                                    group-hover/subservice:opacity-100
                                                                "
                                                            >
                                                                <FiArrowRight />
                                                            </span>

                                                        </Link>

                                                    )
                                                )

                                            )}

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            SOFTWARE EXPERTISE
                        ================================================= */}

                        <div
                            className="
                                group/software
                                relative
                                flex
                                h-full
                                items-center
                            "
                        >

                            <DesktopDropdownTrigger
                                title="Software Expertise"
                            />


                            <div
                                className="
                                    invisible
                                    pointer-events-none
                                    absolute
                                    left-1/2
                                    top-[calc(100%-5px)]
                                    w-[320px]
                                    -translate-x-1/2
                                    translate-y-[18px]
                                    scale-[0.96]
                                    origin-top
                                    opacity-0
                                    transition-all
                                    duration-300
                                    ease-out

                                    group-hover/software:visible
                                    group-hover/software:pointer-events-auto
                                    group-hover/software:translate-y-0
                                    group-hover/software:scale-100
                                    group-hover/software:opacity-100
                                "
                            >

                                <DropdownTopLine />


                                <div
                                    className="
                                        overflow-hidden
                                        border
                                        border-modura-gray-200
                                        bg-modura-white
                                        shadow-[0_24px_70px_rgba(11,29,51,0.18)]
                                    "
                                >

                                    <div className="px-5 pb-5">

                                        <div
                                            className="
                                                max-h-[430px]
                                                overflow-y-auto
                                                overscroll-contain
                                                pr-1
                                                [scrollbar-width:none]
                                                [-ms-overflow-style:none]
                                                [&::-webkit-scrollbar]:hidden
                                            "
                                        >

                                            {loadingSoftware ? (

                                                <div
                                                    className="
                                                        px-3
                                                        py-6
                                                        text-[11px]
                                                        text-modura-gray-500
                                                    "
                                                >
                                                    Loading...
                                                </div>

                                            ) : softwareExpertise.length === 0 ? (

                                                <div
                                                    className="
                                                        px-3
                                                        py-6
                                                        text-[11px]
                                                        text-modura-gray-500
                                                    "
                                                >
                                                    No software found.
                                                </div>

                                            ) : (

                                                softwareExpertise.map(
                                                    (software) => (

                                                        <Link
                                                            key={
                                                                software.id
                                                            }
                                                            href={`/softwareexpertise/${software.slug}`}
                                                            className="
                                                                group/item
                                                                relative
                                                                flex
                                                                min-h-[68px]
                                                                items-center
                                                                overflow-hidden
                                                                border-b
                                                                border-modura-gray-200
                                                                px-3
                                                            "
                                                        >

                                                            {/* LEFT BAR */}

                                                            <span
                                                                className="
                                                                    absolute
                                                                    left-0
                                                                    top-1/2
                                                                    h-0
                                                                    w-[3px]
                                                                    -translate-y-1/2
                                                                    bg-modura-primary
                                                                    transition-all
                                                                    duration-300
                                                                    group-hover/item:h-[32px]
                                                                "
                                                            />


                                                            {/* BOTTOM LINE */}

                                                            <span
                                                                className="
                                                                    absolute
                                                                    bottom-0
                                                                    left-0
                                                                    h-[2px]
                                                                    w-0
                                                                    bg-modura-secondary
                                                                    transition-all
                                                                    duration-500
                                                                    group-hover/item:w-full
                                                                "
                                                            />


                                                            {/* ICON */}

                                                            <span
                                                                className="
                                                                    relative
                                                                    mr-3
                                                                    flex
                                                                    h-9
                                                                    w-9
                                                                    shrink-0
                                                                    items-center
                                                                    justify-center
                                                                    border
                                                                    border-modura-gray-200
                                                                    text-[18px]
                                                                    text-modura-primary
                                                                    transition-all
                                                                    duration-300
                                                                    group-hover/item:translate-x-2
                                                                    group-hover/item:border-modura-primary
                                                                "
                                                            >

                                                                <PiBlueprint
                                                                    size={18}
                                                                />

                                                            </span>


                                                            {/* TEXT */}

                                                            <span
                                                                className="
                                                                    relative
                                                                    flex-1
                                                                    transition-transform
                                                                    duration-300
                                                                    group-hover/item:translate-x-2
                                                                "
                                                            >

                                                                <span
                                                                    className="
                                                                        block
                                                                        text-[12px]
                                                                        font-semibold
                                                                        text-modura-primary
                                                                    "
                                                                >
                                                                    {
                                                                        software.name
                                                                    }
                                                                </span>

                                                                <span
                                                                    className="
                                                                        mt-[2px]
                                                                        block
                                                                        text-[10px]
                                                                        text-modura-gray-500
                                                                    "
                                                                >
                                                                    Software Expertise
                                                                </span>

                                                            </span>


                                                            <FiArrowUpRight
                                                                className="
                                                                    relative
                                                                    translate-x-3
                                                                    text-[14px]
                                                                    text-modura-primary
                                                                    opacity-0
                                                                    transition-all
                                                                    duration-300
                                                                    group-hover/item:translate-x-0
                                                                    group-hover/item:opacity-100
                                                                "
                                                            />

                                                        </Link>

                                                    )
                                                )

                                            )}

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            PORTFOLIO
                        ================================================= */}

                        <div
                            className="
                                group/portfolio
                                relative
                                flex
                                h-full
                                items-center
                            "
                         
                        >

                            <DesktopDropdownTrigger
                                title="Portfolio"
                            />


                            <div
                                className="
                                    invisible
                                    pointer-events-none
                                    absolute
                                    right-0
                                    top-[calc(100%-5px)]
                                    z-[9999]
                                    w-[340px]
                                    translate-y-3
                                    opacity-0
                                    transition-all
                                    duration-300
                                    ease-out

                                    group-hover/portfolio:visible
                                    group-hover/portfolio:pointer-events-auto
                                    group-hover/portfolio:translate-y-0
                                    group-hover/portfolio:opacity-100
                                "
                            >

                                <DropdownTopLine />


                                <div
                                    className="
                                        relative
                                        overflow-visible
                                        border
                                        border-modura-gray-200
                                        bg-modura-white
                                        shadow-[0_20px_60px_rgba(11,29,51,0.15)]
                                    "
                                >

                                    <div
                                        ref={portfolioScrollRef}
                                        className="
                                            max-h-[430px]
                                            overflow-y-auto
                                            overscroll-contain
                                            pr-0
                                            [scrollbar-width:none]
                                            [-ms-overflow-style:none]
                                            [&::-webkit-scrollbar]:hidden
                                        "
                                    >

                                        {loadingPortfolio ? (

                                            <div
                                                className="
                                                    px-5
                                                    py-7
                                                    text-[11px]
                                                    text-modura-gray-500
                                                "
                                            >
                                                Loading portfolio...
                                            </div>

                                        ) : portfolioCategories.length === 0 ? (

                                            <div
                                                className="
                                                    px-5
                                                    py-7
                                                    text-[11px]
                                                    text-modura-gray-500
                                                "
                                            >
                                                No portfolio categories found.
                                            </div>

                                        ) : (

                                            portfolioCategories.map(
                                                (item) => (

                                                    <div
                                                        key={item.id}
                                                        className="
                                                            group/portfolio-item
                                                            relative
                                                        "
                                                    >

                                                        <Link
                                                            href={`/portfolio/${item.slug}`}
                                                            className="
                                                                group/item
                                                                relative
                                                                flex
                                                                min-h-[68px]
                                                                items-center
                                                                overflow-hidden
                                                                border-b
                                                                border-modura-gray-200
                                                                px-3
                                                            "
                                                        >

                                                            {/* LEFT LINE */}

                                                            <span
                                                                className="
                                                                    absolute
                                                                    left-0
                                                                    top-1/2
                                                                    h-0
                                                                    w-[3px]
                                                                    -translate-y-1/2
                                                                    bg-modura-primary
                                                                    transition-all
                                                                    duration-300
                                                                    group-hover/item:h-7
                                                                "
                                                            />


                                                            {/* ICON */}

                                                            <span
                                                                className="
                                                                    relative
                                                                    mr-3
                                                                    flex
                                                                    h-9
                                                                    w-9
                                                                    shrink-0
                                                                    items-center
                                                                    justify-center
                                                                    border
                                                                    border-modura-gray-200
                                                                    text-[18px]
                                                                    text-modura-primary
                                                                    transition-all
                                                                    duration-300
                                                                    group-hover/item:translate-x-2
                                                                    group-hover/item:border-modura-primary
                                                                "
                                                            >

                                                                <PiBuildings
                                                                    size={17}
                                                                />

                                                            </span>


                                                            {/* BOTTOM LINE */}

                                                            <span
                                                                className="
                                                                    absolute
                                                                    bottom-0
                                                                    left-0
                                                                    h-[2px]
                                                                    w-0
                                                                    bg-modura-secondary
                                                                    transition-all
                                                                    duration-500
                                                                    group-hover/item:w-full
                                                                "
                                                            />


                                                            {/* TITLE */}

                                                            <span
                                                                className="
                                                                    relative
                                                                    flex-1
                                                                    text-[12px]
                                                                    font-semibold
                                                                    text-modura-primary
                                                                    transition-transform
                                                                    duration-300
                                                                    group-hover/item:translate-x-2
                                                                "
                                                            >
                                                                {
                                                                    item.name
                                                                }
                                                            </span>


                                                            <FiArrowUpRight
                                                                className="
                                                                    text-[14px]
                                                                    text-modura-secondary
                                                                    opacity-0
                                                                    transition-all
                                                                    duration-300
                                                                    group-hover/item:translate-x-0
                                                                    group-hover/item:opacity-100
                                                                "
                                                            />

                                                        </Link>

                                                    </div>

                                                )
                                            )

                                        )}

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            CAREER
                        ================================================= */}

                        <DesktopLink
                            title="Career"
                            href="/career"
                        />


                        {/* =================================================
                            INQUIRY
                        ================================================= */}

                        <DesktopLink
                            title="Inquiry"
                            href="/inquiry"
                        />

                    </nav>


                    {/* =================================================
                        CTA
                    ================================================= */}

                        <AnimatedButton
                            href="/contact"
                            title="Get In Touch"
                            className="hidden! lg:flex!"
                        />
                    <div className="flex items-center">



                        {/* MOBILE BUTTON */}

                        <button
                            type="button"
                            aria-label="Toggle navigation"
                            onClick={() =>
                                setMobileMenu(
                                    !mobileMenu
                                )
                            }
                            className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                border
                                border-modura-gray-200
                                text-[21px]
                                text-modura-primary
                                lg:hidden
                            "
                        >

                            {mobileMenu ? (
                                <FiX />
                            ) : (
                                <FiMenu />
                            )}

                        </button>

                    </div>

                </div>

            </div>


            {/* =====================================================
                MOBILE MENU
            ====================================================== */}

            <div
                className={`
                    overflow-y-auto
                    bg-modura-white
                    transition-all
                    duration-500
                    lg:hidden

                    ${
                        mobileMenu
                            ? "max-h-[calc(100vh-100px)] border-t border-modura-gray-200 opacity-100"
                            : "max-h-0 opacity-0"
                    }
                `}
            >

                <div className="px-5 pb-6">


                    {/* HOME */}

                    <MobileLink
                        title="Home"
                        href="/"
                        close={() =>
                            setMobileMenu(false)
                        }
                    />


                    {/* =================================================
                        COMPANY
                    ================================================= */}

                    <MobileButton
                        title="Company"
                        open={
                            mobileSection ===
                            "company"
                        }
                        onClick={() =>
                            toggleMobileSection(
                                "company"
                            )
                        }
                    />


                    <MobileContent
                        open={
                            mobileSection ===
                            "company"
                        }
                    >

                        {companyLinks.map(
                            (item) => {

                                const Icon =
                                    item.icon;

                                return (

                                    <Link
                                        key={
                                            item.title
                                        }
                                        href={
                                            item.href
                                        }
                                        onClick={() =>
                                            setMobileMenu(
                                                false
                                            )
                                        }
                                        className="
                                            flex
                                            min-h-[48px]
                                            items-center
                                            gap-3
                                            border-b
                                            border-modura-gray-200
                                            px-4
                                            text-[12px]
                                            font-medium
                                            text-modura-gray-700
                                        "
                                    >

                                        <Icon
                                            className="
                                                text-[17px]
                                                text-modura-primary
                                            "
                                        />

                                        {
                                            item.title
                                        }

                                    </Link>

                                );

                            }
                        )}

                    </MobileContent>


                    {/* =================================================
                        SERVICES
                    ================================================= */}

                    <MobileButton
                        title="Services"
                        open={
                            mobileSection ===
                            "services"
                        }
                        onClick={() =>
                            toggleMobileSection(
                                "services"
                            )
                        }
                    />


                    {mobileSection ===
                        "services" && (

                        <div
                            className="
                                bg-modura-light
                            "
                        >

                            {loadingCategories ? (

                                <div
                                    className="
                                        px-4
                                        py-5
                                        text-[11px]
                                        text-modura-gray-500
                                    "
                                >
                                    Loading categories...
                                </div>

                            ) : (

                                categories.map(
                                    (
                                        category,
                                        index
                                    ) => {

                                        const open =
                                            mobileServiceCategory ===
                                            index;


                                        const categoryServices =
                                            services.filter(
                                                (service) =>
                                                    service.categoryId ===
                                                    category.id
                                            );


                                        return (

                                            <div
                                                key={
                                                    category.id
                                                }
                                                className="
                                                    border-b
                                                    border-modura-gray-200
                                                "
                                            >

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleMobileServiceCategory(
                                                            index,
                                                            category.slug
                                                        )
                                                    }
                                                    className="
                                                        flex
                                                        w-full
                                                        items-center
                                                        justify-between
                                                        px-4
                                                        py-4
                                                        text-left
                                                        text-[12px]
                                                        font-semibold
                                                        text-modura-primary
                                                    "
                                                >

                                                    {
                                                        category.name
                                                    }

                                                    <FiChevronDown
                                                        className={`
                                                            transition-transform
                                                            duration-300

                                                            ${
                                                                open
                                                                    ? "rotate-180"
                                                                    : ""
                                                            }
                                                        `}
                                                    />

                                                </button>


                                                <div
                                                    className={`
                                                        overflow-hidden
                                                        bg-modura-white
                                                        transition-all
                                                        duration-300

                                                        ${
                                                            open
                                                                ? "max-h-[500px]"
                                                                : "max-h-0"
                                                        }
                                                    `}
                                                >

                                                    {loadingServices &&
                                                    open ? (

                                                        <div
                                                            className="
                                                                px-6
                                                                py-5
                                                                text-[11px]
                                                                text-modura-gray-500
                                                            "
                                                        >
                                                            Loading services...
                                                        </div>

                                                    ) : (

                                                        categoryServices.length >
                                                        0 ? (

                                                            categoryServices.map(
                                                                (
                                                                    service
                                                                ) => (

                                                                    <Link
                                                                        key={
                                                                            service.id
                                                                        }
                                                                        href={`/servicedetail/${service.slug}`}
                                                                        onClick={() =>
                                                                            setMobileMenu(
                                                                                false
                                                                            )
                                                                        }
                                                                        className="
                                                                            flex
                                                                            min-h-[44px]
                                                                            items-center
                                                                            gap-3
                                                                            border-b
                                                                            border-modura-gray-100
                                                                            px-6
                                                                            text-[11px]
                                                                            text-modura-gray-600
                                                                        "
                                                                    >

                                                                        <span
                                                                            className="
                                                                                h-px
                                                                                w-3
                                                                                bg-modura-secondary
                                                                            "
                                                                        />

                                                                        {
                                                                            service.title
                                                                        }

                                                                    </Link>

                                                                )
                                                            )

                                                        ) : (

                                                            <div
                                                                className="
                                                                    px-6
                                                                    py-5
                                                                    text-[11px]
                                                                    text-modura-gray-500
                                                                "
                                                            >
                                                                No services available.
                                                            </div>

                                                        )

                                                    )}

                                                </div>

                                            </div>

                                        );

                                    }
                                )

                            )}

                        </div>

                    )}


                    {/* =================================================
                        SOFTWARE EXPERTISE
                    ================================================= */}

                    <MobileButton
                        title="Software Expertise"
                        open={
                            mobileSection ===
                            "software"
                        }
                        onClick={() =>
                            toggleMobileSection(
                                "software"
                            )
                        }
                    />


                    <MobileContent
                        open={
                            mobileSection ===
                            "software"
                        }
                    >

                        {softwareExpertise.map(
                            (software) => (

                                <Link
                                    key={
                                        software.id
                                    }
                                    href={`/softwareexpertise/${software.slug}`}
                                    onClick={() =>
                                        setMobileMenu(
                                            false
                                        )
                                    }
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        border-b
                                        border-modura-gray-200
                                        px-4
                                        py-3
                                    "
                                >

                                    <PiBlueprint
                                        className="
                                            text-[18px]
                                            text-modura-primary
                                        "
                                    />

                                    <div>

                                        <span
                                            className="
                                                block
                                                text-[12px]
                                                font-semibold
                                                text-modura-primary
                                            "
                                        >
                                            {
                                                software.name
                                            }
                                        </span>

                                        <span
                                            className="
                                                block
                                                text-[10px]
                                                text-modura-gray-500
                                            "
                                        >
                                            Software Expertise
                                        </span>

                                    </div>

                                </Link>

                            )
                        )}

                    </MobileContent>


                    {/* =================================================
                        PORTFOLIO
                    ================================================= */}

                    <MobileButton
                        title="Portfolio"
                        open={
                            mobileSection ===
                            "portfolio"
                        }
                        onClick={() =>
                            toggleMobileSection(
                                "portfolio"
                            )
                        }
                    />


                    <MobileContent
                        open={
                            mobileSection ===
                            "portfolio"
                        }
                    >

                        {portfolioCategories.map(
                            (item) => (

                                <Link
                                    key={
                                        item.id
                                    }
                                    href={`/portfolio/${item.slug}`}
                                    onClick={() =>
                                        setMobileMenu(
                                            false
                                        )
                                    }
                                    className="
                                        flex
                                        min-h-[48px]
                                        items-center
                                        gap-3
                                        border-b
                                        border-modura-gray-200
                                        px-4
                                        text-[12px]
                                        font-medium
                                        text-modura-gray-700
                                    "
                                >

                                    <PiBuildings
                                        className="
                                            text-[17px]
                                            text-modura-primary
                                        "
                                    />

                                    <span className="flex-1">
                                        {
                                            item.name
                                        }
                                    </span>

                                    <FiArrowUpRight
                                        className="
                                            text-[14px]
                                            text-modura-secondary
                                        "
                                    />

                                </Link>

                            )
                        )}

                    </MobileContent>


                    {/* =================================================
                        CAREER
                    ================================================= */}

                    <MobileLink
                        title="Career"
                        href="/career"
                        close={() =>
                            setMobileMenu(false)
                        }
                    />


                    {/* =================================================
                        INQUIRY
                    ================================================= */}

                    <MobileLink
                        title="Inquiry"
                        href="/inquiry"
                        close={() =>
                            setMobileMenu(false)
                        }
                    />


                    {/* =================================================
                        GET IN TOUCH
                    ================================================= */}

                    <Link
                        href="/contact"
                        onClick={() =>
                            setMobileMenu(false)
                        }
                        className="
                            mt-5
                            flex
                            h-[52px]
                            items-center
                            justify-between
                            bg-modura-primary
                            px-5
                            text-[11px]
                            font-bold
                            uppercase
                            tracking-[0.08em]
                            text-modura-white
                        "
                    >

                        Get In Touch

                        <FiArrowUpRight />

                    </Link>

                </div>

            </div>

        </header>

    );
}


/* =========================================================
   NORMAL DESKTOP LINK
========================================================= */

function DesktopLink({
    title,
    href,
}: {
    title: string;
    href: string;
}) {

    return (

        <Link
            href={href}
            className="
                group/nav
                relative
                flex
                h-full
                items-center
                px-3
                text-[14px]
                font-semibold
                text-modura-gray-800
                transition-colors
                duration-300
                hover:text-modura-primary
                xl:px-4
            "
        >

            <span className="relative z-10">
                {title}
            </span>


            <span
                className="
                    absolute
                    bottom-[29px]
                    left-4
                    h-[2px]
                    w-0
                    bg-modura-primary
                    transition-all
                    duration-500
                    group-hover/nav:w-[26px]
                "
            />


            <span
                className="
                    absolute
                    bottom-[25px]
                    left-4
                    h-px
                    w-0
                    bg-modura-secondary
                    transition-all
                    delay-75
                    duration-500
                    group-hover/nav:w-[15px]
                "
            />

        </Link>

    );

}


/* =========================================================
   DROPDOWN TRIGGER
========================================================= */

function DesktopDropdownTrigger({
    title,
}: {
    title: string;
}) {

    return (

        <button
            type="button"
            className="
                group/trigger
                relative
                flex
                h-full
                items-center
                gap-[6px]
                bg-transparent
                px-3
                text-[14px]
                font-semibold
                text-modura-gray-800
                transition-colors
                duration-300
                hover:text-modura-primary
                xl:px-4
            "
        >

            <span>
                {title}
            </span>


            <FiChevronDown
                className="
                    text-[12px]
                    text-modura-secondary
                    transition-all
                    duration-300
                    group-hover/trigger:translate-y-[2px]
                    group-hover/trigger:rotate-180
                    group-hover/trigger:text-modura-primary
                "
            />


            <span
                className="
                    absolute
                    bottom-[29px]
                    left-4
                    h-[2px]
                    w-0
                    bg-modura-primary
                    transition-all
                    duration-500
                    group-hover/trigger:w-[26px]
                "
            />


            <span
                className="
                    absolute
                    bottom-[25px]
                    left-4
                    h-px
                    w-0
                    bg-modura-secondary
                    transition-all
                    delay-75
                    duration-500
                    group-hover/trigger:w-[15px]
                "
            />

        </button>

    );

}


/* =========================================================
   DROPDOWN TOP LINE
========================================================= */

function DropdownTopLine() {

    return (

        <div
            className="
                relative
                h-[5px]
                w-full
                overflow-hidden
            "
        >

            <span
                className="
                    absolute
                    inset-y-0
                    left-1/2
                    w-full
                    -translate-x-1/2
                    bg-modura-primary
                "
            />

        </div>

    );

}


/* =========================================================
   COMPANY ITEM
========================================================= */

function AnimatedIconItem({
    href,
    title,
    icon,
    subtitle,
}: {
    href: string;
    title: string;
    icon: React.ReactNode;
    subtitle?: string;
}) {

    return (

        <Link
            href={href}
            className="
                group/item
                relative
                flex
                min-h-[68px]
                items-center
                overflow-hidden
                border-b
                border-modura-gray-200
                px-3
            "
        >

            {/* LEFT BAR */}

            <span
                className="
                    absolute
                    left-0
                    top-1/2
                    h-0
                    w-[3px]
                    -translate-y-1/2
                    bg-modura-primary
                    transition-all
                    duration-300
                    group-hover/item:h-[32px]
                "
            />


            {/* BOTTOM LINE */}

            <span
                className="
                    absolute
                    bottom-0
                    left-0
                    h-[2px]
                    w-0
                    bg-modura-secondary
                    transition-all
                    duration-500
                    group-hover/item:w-full
                "
            />


            {/* ICON */}

            <span
                className="
                    relative
                    mr-3
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    border
                    border-modura-gray-200
                    text-[18px]
                    text-modura-primary
                    transition-all
                    duration-300
                    group-hover/item:translate-x-2
                    group-hover/item:border-modura-primary
                "
            >

                {icon}

                <span
                    className="
                        absolute
                        -right-[1px]
                        -top-[1px]
                        h-[7px]
                        w-[7px]
                        border-r-2
                        border-t-2
                        border-transparent
                        transition-all
                        duration-300
                        group-hover/item:border-modura-primary
                    "
                />

            </span>


            {/* TEXT */}

            <span
                className="
                    relative
                    flex-1
                    transition-transform
                    duration-300
                    group-hover/item:translate-x-2
                "
            >

                <span
                    className="
                        block
                        text-[12px]
                        font-semibold
                        text-modura-primary
                    "
                >
                    {title}
                </span>

                {subtitle && (
                    <span
                        className="
                            mt-[2px]
                            block
                            text-[10px]
                            text-modura-gray-500
                        "
                    >
                        {subtitle}
                    </span>
                )}

            </span>


            {/* ARROW */}

            <FiArrowUpRight
                className="
                    relative
                    translate-x-3
                    text-[14px]
                    text-modura-primary
                    opacity-0
                    transition-all
                    duration-300
                    group-hover/item:translate-x-0
                    group-hover/item:opacity-100
                "
            />

        </Link>

    );

}


/* =========================================================
   MOBILE LINK
========================================================= */

function MobileLink({
    title,
    href,
    close,
}: {
    title: string;
    href: string;
    close: () => void;
}) {

    return (

        <Link
            href={href}
            onClick={close}
            className="
                flex
                min-h-[56px]
                items-center
                border-b
                border-modura-gray-200
                text-[14px]
                font-semibold
                text-modura-primary
            "
        >
            {title}
        </Link>

    );

}


/* =========================================================
   MOBILE BUTTON
========================================================= */

function MobileButton({
    title,
    open,
    onClick,
}: {
    title: string;
    open: boolean;
    onClick: () => void;
}) {

    return (

        <button
            type="button"
            onClick={onClick}
            className="
                flex
                min-h-[56px]
                w-full
                items-center
                justify-between
                border-b
                border-modura-gray-200
                text-left
                text-[14px]
                font-semibold
                text-modura-primary
            "
        >

            {title}

            <FiChevronDown
                className={`
                    transition-transform
                    duration-300

                    ${
                        open
                            ? "rotate-180"
                            : ""
                    }
                `}
            />

        </button>

    );

}


/* =========================================================
   MOBILE CONTENT
========================================================= */

function MobileContent({
    open,
    children,
}: {
    open: boolean;
    children: React.ReactNode;
}) {

    return (

        <div
            className={`
                overflow-hidden
                bg-modura-light
                transition-all
                duration-500

                ${
                    open
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0"
                }
            `}
        >

            {children}

        </div>

    );

}