"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
    FiArrowRight,
    FiArrowUpRight,
    FiAward,
    FiBookOpen,
    FiBriefcase,
    FiChevronDown,
    FiChevronRight,
    FiFileText,
    FiGrid,
    FiHelpCircle,
    FiHome,
    FiLayers,
    FiMail,
    FiMenu,
    FiShield,
    FiUsers,
    FiX,
} from "react-icons/fi";

import {
    PiBlueprint,
    PiBridge,
    PiBuildings,
    PiCube,
    PiGear,
    PiStack,
} from "react-icons/pi";

import logo from "../assets/images/logo.png";
import AnimatedButton from "./AnimatedButton";

/* =========================================================
   TYPES
========================================================= */

type ServiceItem = {
    title: string;
    href: string;
};

type ServiceCategory = {
    title: string;
    href: string;
    description: string;
    services: ServiceItem[];
};

/* =========================================================
   COMPANY
========================================================= */

const companyLinks = [
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
    title: "Testimonials",
    href: "/company#testimonials",
    icon: PiStack,
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



const serviceCategories: ServiceCategory[] = [
    {
        title: "CAD Drafting Services",
        href: "/services/cad-drafting-services",
        description:
            "Accurate CAD drafting and technical documentation for architecture, engineering and construction projects.",
        services: [
            {
                title: "2D CAD Drafting",
                href: "/services/cad-drafting-services/2d-cad-drafting",
            },
            {
                title: "CAD Conversion",
                href: "/services/cad-drafting-services/cad-conversion",
            },
            {
                title: "As-Built Drawings",
                href: "/services/cad-drafting-services/as-built-drawings",
            },
            {
                title: "Construction Drawings",
                href: "/services/cad-drafting-services/construction-drawings",
            },
            {
                title: "PDF / Sketch to CAD",
                href: "/services/cad-drafting-services/pdf-sketch-to-cad",
            },
        ],
    },

    {
        title: "Architectural Engineering",
        href: "/services/architectural-engineering",
        description:
            "Architectural planning, documentation, modelling and visualization for coordinated project delivery.",
        services: [
            {
                title: "Architectural Drafting",
                href: "/services/architectural-engineering/architectural-drafting",
            },
            {
                title: "Architectural Planning",
                href: "/services/architectural-engineering/architectural-planning",
            },
            {
                title: "Architectural Modeling",
                href: "/services/architectural-engineering/architectural-modeling",
            },
            {
                title: "Architectural Rendering",
                href: "/services/architectural-engineering/architectural-rendering",
            },
            {
                title: "Architectural Walkthroughs",
                href: "/services/architectural-engineering/architectural-walkthroughs",
            },
        ],
    },

    {
        title: "Structural Engineering",
        href: "/services/structural-engineering",
        description:
            "Structural analysis, design and detailing solutions for safe, coordinated and constructible building systems.",
        services: [
            {
                title: "Residential Structural Design",
                href: "/services/structural-engineering/residential-structural-design",
            },
            {
                title: "Structural Steel Detailing",
                href: "/services/structural-engineering/structural-steel-detailing",
            },
            {
                title: "Reinforcement Detailing",
                href: "/services/structural-engineering/reinforcement-detailing",
            },
            {
                title: "Steel / Concrete Structures",
                href: "/services/structural-engineering/steel-concrete-structures",
            },
            {
                title: "Structural Steel Frame Analysis",
                href: "/services/structural-engineering/structural-steel-frame-analysis",
            },
            {
                title: "Structural Calculations",
                href: "/services/structural-engineering/structural-calculations",
            },
        ],
    },

    {
        title: "Building Information Modeling",
        href: "/services/building-information-modeling",
        description:
            "Integrated BIM workflows connecting design, coordination, construction and project information.",
        services: [
            {
                title: "Architectural BIM",
                href: "/services/building-information-modeling/architectural-bim",
            },
            {
                title: "Structural BIM",
                href: "/services/building-information-modeling/structural-bim",
            },
            {
                title: "MEP BIM",
                href: "/services/building-information-modeling/mep-bim",
            },
            {
                title: "Scan to BIM",
                href: "/services/building-information-modeling/scan-to-bim",
            },
            {
                title: "Clash Detection",
                href: "/services/building-information-modeling/clash-detection",
            },
            {
                title: "BIM Coordination",
                href: "/services/building-information-modeling/bim-coordination",
            },
        ],
    },

    {
        title: "MEP Engineering",
        href: "/services/mep-engineering",
        description:
            "Integrated mechanical, electrical and plumbing engineering for coordinated building systems.",
        services: [
            {
                title: "MEP Design",
                href: "/services/mep-engineering/mep-design",
            },
            {
                title: "MEP Coordination",
                href: "/services/mep-engineering/mep-coordination",
            },
            {
                title: "MEP Drafting",
                href: "/services/mep-engineering/mep-drafting",
            },
            {
                title: "MEP BIM Modeling",
                href: "/services/mep-engineering/mep-bim-modeling",
            },
            {
                title: "MEP Shop Drawings",
                href: "/services/mep-engineering/mep-shop-drawings",
            },
        ],
    },

    {
        title: "Mechanical Engineering",
        href: "/services/mechanical-engineering",
        description:
            "Mechanical design, modelling and technical documentation for multidisciplinary engineering projects.",
        services: [
            {
                title: "Mechanical Design",
                href: "/services/mechanical-engineering/mechanical-design",
            },
            {
                title: "Mechanical Drafting",
                href: "/services/mechanical-engineering/mechanical-drafting",
            },
            {
                title: "3D Mechanical Modeling",
                href: "/services/mechanical-engineering/3d-modeling",
            },
            {
                title: "Mechanical Detailing",
                href: "/services/mechanical-engineering/mechanical-detailing",
            },
        ],
    },

    {
        title: "Shop Drawing Services",
        href: "/services/shop-drawing-services",
        description:
            "Fabrication and installation-ready shop drawings developed for accurate project execution.",
        services: [
            {
                title: "Architectural Shop Drawings",
                href: "/services/shop-drawing-services/architectural",
            },
            {
                title: "Structural Shop Drawings",
                href: "/services/shop-drawing-services/structural",
            },
            {
                title: "MEP Shop Drawings",
                href: "/services/shop-drawing-services/mep",
            },
            {
                title: "Fabrication Drawings",
                href: "/services/shop-drawing-services/fabrication",
            },
            {
                title: "Facade Shop Drawings",
                href: "/services/shop-drawing-services/facade",
            },
        ],
    },

    {
        title: "Electrical Services",
        href: "/services/electrical-services",
        description:
            "Electrical layouts, engineering documentation and coordinated building-services design.",
        services: [
            {
                title: "Electrical Design",
                href: "/services/electrical-services/electrical-design",
            },
            {
                title: "Electrical Drafting",
                href: "/services/electrical-services/electrical-drafting",
            },
            {
                title: "Lighting Layouts",
                href: "/services/electrical-services/lighting-layouts",
            },
            {
                title: "Power Distribution",
                href: "/services/electrical-services/power-distribution",
            },
        ],
    },

    {
        title: "Plumbing / Piping",
        href: "/services/plumbing-piping",
        description:
            "Coordinated plumbing and piping design solutions for building and engineering applications.",
        services: [
            {
                title: "Plumbing Design",
                href: "/services/plumbing-piping/plumbing-design",
            },
            {
                title: "Piping Design",
                href: "/services/plumbing-piping/piping-design",
            },
            {
                title: "Plumbing Drafting",
                href: "/services/plumbing-piping/plumbing-drafting",
            },
            {
                title: "Piping Layouts",
                href: "/services/plumbing-piping/piping-layouts",
            },
        ],
    },

    {
        title: "HVAC Engineering",
        href: "/services/hvac-engineering",
        description:
            "HVAC design, calculations, layouts and coordinated documentation for efficient building systems.",
        services: [
            {
                title: "HVAC System Design",
                href: "/services/hvac-engineering/system-design",
            },
            {
                title: "HVAC Load Calculations",
                href: "/services/hvac-engineering/load-calculations",
            },
            {
                title: "Duct Layouts",
                href: "/services/hvac-engineering/duct-layouts",
            },
            {
                title: "HVAC Piping Design",
                href: "/services/hvac-engineering/piping-design",
            },
            {
                title: "HVAC Shop Drawings",
                href: "/services/hvac-engineering/shop-drawings",
            },
        ],
    },

    {
        title: "Civil Engineering",
        href: "/services/civil-engineering",
        description:
            "Civil engineering and documentation support across planning, design and construction stages.",
        services: [
            {
                title: "Civil Drafting",
                href: "/services/civil-engineering/civil-drafting",
            },
            {
                title: "Civil Engineering Design",
                href: "/services/civil-engineering/design",
            },
            {
                title: "Site Development",
                href: "/services/civil-engineering/site-development",
            },
            {
                title: "Construction Documentation",
                href: "/services/civil-engineering/construction-documentation",
            },
        ],
    },

    {
        title: "Detailing Services",
        href: "/services/detailing-services",
        description:
            "Detailed fabrication and construction documentation developed for accuracy and coordination.",
        services: [
            {
                title: "Steel Detailing",
                href: "/services/detailing-services/steel-detailing",
            },
            {
                title: "Rebar Detailing",
                href: "/services/detailing-services/rebar-detailing",
            },
            {
                title: "Precast Detailing",
                href: "/services/detailing-services/precast-detailing",
            },
            {
                title: "Structural Detailing",
                href: "/services/detailing-services/structural-detailing",
            },
        ],
    },

    {
        title: "Mass Timber Buildings",
        href: "/services/mass-timber-buildings",
        description:
            "Engineering and detailing support for modern mass-timber building systems and assemblies.",
        services: [
            {
                title: "Mass Timber Detailing",
                href: "/services/mass-timber-buildings/detailing",
            },
            {
                title: "CLT Detailing",
                href: "/services/mass-timber-buildings/clt-detailing",
            },
            {
                title: "Glulam Detailing",
                href: "/services/mass-timber-buildings/glulam-detailing",
            },
            {
                title: "Timber Shop Drawings",
                href: "/services/mass-timber-buildings/shop-drawings",
            },
        ],
    },

    {
        title: "Sheet Metal Design",
        href: "/services/sheet-metal-design",
        description:
            "Precision sheet-metal modelling, detailing and fabrication documentation.",
        services: [
            {
                title: "Sheet Metal Drafting",
                href: "/services/sheet-metal-design/drafting",
            },
            {
                title: "Sheet Metal Detailing",
                href: "/services/sheet-metal-design/detailing",
            },
            {
                title: "Fabrication Drawings",
                href: "/services/sheet-metal-design/fabrication-drawings",
            },
            {
                title: "3D Sheet Metal Modeling",
                href: "/services/sheet-metal-design/3d-modeling",
            },
        ],
    },

    {
        title: "Cladding Engineering",
        href: "/services/cladding-engineering",
        description:
            "Facade and cladding engineering documentation supporting fabrication and installation.",
        services: [
            {
                title: "Cladding Design",
                href: "/services/cladding-engineering/design",
            },
            {
                title: "Facade Detailing",
                href: "/services/cladding-engineering/facade-detailing",
            },
            {
                title: "Cladding Shop Drawings",
                href: "/services/cladding-engineering/shop-drawings",
            },
            {
                title: "Panel Layouts",
                href: "/services/cladding-engineering/panel-layouts",
            },
        ],
    },
];

/* =========================================================
   SOFTWARE
========================================================= */

const softwareLinks = [
    {
        title: "AutoCAD",
        subtitle: "CAD Drafting",
        icon: PiBlueprint,
        href: "/software-expertise/autocad",
    },
    {
        title: "Autodesk Revit",
        subtitle: "BIM & Coordination",
        icon: PiCube,
        href: "/software-expertise/revit",
    },
    {
        title: "Tekla Structures",
        subtitle: "Structural Detailing",
        icon: PiBridge,
        href: "/software-expertise/tekla",
    },
    {
        title: "STAAD.Pro",
        subtitle: "Structural Analysis",
        icon: PiBuildings,
        href: "/software-expertise/staad-pro",
    },
    {
        title: "Autodesk Inventor",
        subtitle: "Mechanical Engineering",
        icon: PiGear,
        href: "/software-expertise/autodesk-inventor",
    },
];

/* =========================================================
   PORTFOLIO
========================================================= */

const portfolioLinks = [
    {
        title: "Steel Detailing Samples",
        href: "/portfolio/steel-detailing",
        icon: PiBridge,
    },
    {
        title: "Rebar Detailing Samples",
        href: "/portfolio/rebar-detailing",
        icon: PiStack,
    },
    {
        title: "Architectural Samples",
        href: "/portfolio/architectural",
        icon: PiBuildings,
    },
    {
        title: "Structural Samples",
        href: "/portfolio/structural",
        icon: FiLayers,
    },
    {
        title: "Facade Shop Drawings",
        href: "/portfolio/facade-shop-drawings",
        icon: PiBlueprint,
    },
    {
        title: "Precast Shop Drawings",
        href: "/portfolio/precast-shop-drawings",
        icon: FiGrid,
    },
    {
        title: "BIM Samples",
        href: "/portfolio/bim",
        icon: PiCube,
    },
    {
        title: "Mechanical Detailing",
        href: "/portfolio/mechanical-detailing",
        icon: PiGear,
    },
    {
        title: "Millwork / Joinery",
        href: "/portfolio/millwork-joinery",
        icon: FiHome,
    },
];

/* =========================================================
   HEADER
========================================================= */

export default function Header() {
    const [activeService, setActiveService] = useState(0);

    const [mobileMenu, setMobileMenu] = useState(false);

    const [mobileSection, setMobileSection] =
        useState<string | null>(null);

    const [mobileServiceCategory, setMobileServiceCategory] =
        useState<number | null>(null);

    const selectedService = serviceCategories[activeService];

    const toggleMobileSection = (section: string) => {
        setMobileSection((current) =>
            current === section ? null : section
        );
    };

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
                    {/* ================= LOGO ================= */}

                    <Link
                        href="/"
                        className="
                            flex h-full
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

                    {/* ================= DESKTOP NAV ================= */}

                    <nav
                        className="
                            hidden
                            h-full
                            items-center
                            lg:flex
                        "
                    >
                        <DesktopLink
                            title="Home"
                            href="/"
                        />

                        {/* ================= COMPANY ================= */}

                        <div
                            className="
                                group/company
                                relative
                                flex h-full
                                items-center
                            "
                        >
                            <DesktopDropdownTrigger
                                title="Company"
                                groupName="company"
                            />

                            <div
                                className="
                                    invisible
                                    absolute
                                    left-1/2
                                    top-[calc(100%-5px)]
                                    w-[320px]
                                    origin-top
                                    -translate-x-1/2
                                    translate-y-[18px]
                                    scale-[0.96]
                                    opacity-0
                                    pointer-events-none

                                    transition-all
                                    duration-300
                                    ease-out

                                    group-hover/company:visible
                                    group-hover/company:translate-y-0
                                    group-hover/company:scale-100
                                    group-hover/company:opacity-100
                                    group-hover/company:pointer-events-auto
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

                        {/* ================= SERVICES ================= */}

                        <div
                            className="
                                group/services
                                relative
                                flex h-full
                                items-center
                            "
                        >
                            <DesktopDropdownTrigger
                                title="Services"
                                groupName="services"
                            />

                            <div
                                className="
                                    invisible
                                    absolute
                                    left-1/2
                                    top-[calc(100%-5px)]
                                    w-[650px]
                                    origin-top
                                    -translate-x-1/2
                                    translate-y-[18px]
                                    scale-[0.97]
                                    opacity-0
                                    pointer-events-none

                                    transition-all
                                    duration-300
                                    ease-out

                                    group-hover/services:visible
                                    group-hover/services:translate-y-0
                                    group-hover/services:scale-100
                                    group-hover/services:opacity-100
                                    group-hover/services:pointer-events-auto
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
                                    {/* =================
                                        LEFT CATEGORIES
                                        NO ICON
                                        NO NUMBER
                                    ================= */}

                                    <div
                                        className="
                                            border-r
                                            border-modura-secondary
                                            bg-modura-primary-light
                                            p-4
                                        "
                                    >
                                        <div className="mb-4 px-3">
                                            <span
                                                className="
                                                    text-[9px]
                                                    font-bold
                                                    uppercase
                                                    tracking-[0.2em]
                                                    text-modura-secondary-light
                                                "
                                            >
                                                Our Expertise
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

                                        <div className="max-h-[384px] overflow-y-auto overscroll-contain pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                                            {serviceCategories.map(
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
                                                                category.title
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

                                                            ${active
                                                                    ? "bg-modura-white font-semibold text-modura-primary shadow-[0_5px_18px_rgba(11,29,51,0.06)]"
                                                                    : "text-modura-gray-200 hover:bg-modura-primary hover:text-modura-white"
                                                                }
                                                        `}
                                                        >
                                                            {/* animated left bar */}

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

                                                                ${active
                                                                        ? "h-[60%]"
                                                                        : "h-0 group-hover/servicecategory:h-[60%]"
                                                                    }
                                                            `}
                                                            />

                                                            {/* animated line */}

                                                            <span
                                                                className={`
                                                                absolute
                                                                bottom-0
                                                                left-0
                                                                h-px
                                                                bg-modura-secondary
                                                                transition-all
                                                                duration-500

                                                                ${active
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

                                                                ${active
                                                                        ? "translate-x-2"
                                                                        : "group-hover/servicecategory:translate-x-2"
                                                                    }
                                                            `}
                                                            >
                                                                {
                                                                    category.title
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

                                                                ${active
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
                                            )}
                                        </div>
                                    </div>

                                    {/* =================
                                        RIGHT SERVICES
                                    ================= */}

                                    <div
                                        key={
                                            selectedService.title
                                        }
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
                                                        text-[9px]
                                                        font-bold
                                                        uppercase
                                                        tracking-[0.2em]
                                                        text-modura-secondary
                                                    "
                                                >
                                                    Selected
                                                    Expertise
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
                                                        selectedService.title
                                                    }
                                                </h3>
                                            </div>

                                            <Link
                                                href={
                                                    selectedService.href
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
                                                        relative z-10
                                                        transition-transform
                                                        duration-300
                                                        group-hover/viewcategory:rotate-45
                                                    "
                                                />
                                            </Link>
                                        </div>

                                        <p
                                            className="
                                                mt-4
                                                text-[11px]
                                                leading-[1.7]
                                                text-modura-gray-500
                                            "
                                        >
                                            {
                                                selectedService.description
                                            }
                                        </p>

                                        {/* SUB SERVICES */}

                                        <div
                                            className="
                                                mt-5
                                                border-t
                                                border-modura-gray-200
                                            "
                                        >
                                            {selectedService.services.map(
                                                (
                                                    service
                                                ) => (
                                                    <Link
                                                        key={
                                                            service.title
                                                        }
                                                        href={
                                                            service.href
                                                        }
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
                                                        {/* clearly visible hover bar */}

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

                                                        {/* subtle horizontal line */}

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
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ================= SOFTWARE ================= */}

                        <div
                            className="
                                group/software
                                relative
                                flex h-full
                                items-center
                            "
                        >
                            <DesktopDropdownTrigger
                                title="Software Expertise"
                                groupName="software"
                            />

                            <div
                                className="
                                    invisible
                                    absolute
                                    left-1/2
                                    top-[calc(100%-5px)]
                                    w-[300px]
                                    origin-top
                                    -translate-x-1/2
                                    translate-y-[18px]
                                    scale-[0.96]
                                    opacity-0
                                    pointer-events-none

                                    transition-all
                                    duration-300

                                    group-hover/software:visible
                                    group-hover/software:translate-y-0
                                    group-hover/software:scale-100
                                    group-hover/software:opacity-100
                                    group-hover/software:pointer-events-auto
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
                                        {softwareLinks.map((software) => {
                                            const Icon = software.icon;

                                            return (
                                                <AnimatedIconItem
                                                    key={software.title}
                                                    href={software.href}
                                                    title={software.title}
                                                    subtitle={software.subtitle}
                                                    icon={<Icon />}
                                                />
                                            );
                                        })}
                                    </div>


                                </div>
                            </div>
                        </div>

                        {/* ================= PORTFOLIO ================= */}

                        <div
                            className="
                                group/portfolio
                                relative
                                flex h-full
                                items-center
                            "
                        >
                            <DesktopDropdownTrigger
                                title="Portfolio"
                                groupName="portfolio"
                            />

                            <div
                                className="
                                    invisible
                                    absolute
                                    right-0
                                    top-[calc(100%-5px)]
                                    w-[340px]
                                    origin-top-right
                                    translate-y-[18px]
                                    scale-[0.96]
                                    opacity-0
                                    pointer-events-none

                                    transition-all
                                    duration-300

                                    group-hover/portfolio:visible
                                    group-hover/portfolio:translate-y-0
                                    group-hover/portfolio:scale-100
                                    group-hover/portfolio:opacity-100
                                    group-hover/portfolio:pointer-events-auto
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

                                    <div
                                        className="
                                            max-h-[430px]
                                            overflow-y-auto
                                            overscroll-contain
                                            [scrollbar-width:none]
                                            [-ms-overflow-style:none]
                                            [&::-webkit-scrollbar]:hidden
                                            px-5
                                            pb-5
                                            pr-4
                                        "
                                    >
                                        {portfolioLinks.map((item) => {
                                            const Icon = item.icon;

                                            return (
                                                <AnimatedIconItem
                                                    key={item.title}
                                                    href={item.href}
                                                    title={item.title}
                                                    icon={<Icon />}
                                                />
                                            );
                                        })}
                                    </div>


                                </div>
                            </div>
                        </div>

                        <DesktopLink
                            title="Career"
                            href="/career"
                        />

                        <DesktopLink
                            title="Inquiry"
                            href="/inquiry"
                        />
                    </nav>

                    {/* ================= CTA ================= */}

                    <div className="flex items-center">
                        <AnimatedButton
                            href="/contact"
                            title="Get In Touch"
                            className="hidden xl:flex"
                        />
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

                    ${mobileMenu
                        ? "max-h-[calc(100vh-100px)] border-t border-modura-gray-200 opacity-100"
                        : "max-h-0 opacity-0"
                    }
                `}
            >
                <div className="px-5 pb-6">

                    <MobileLink
                        title="Home"
                        href="/"
                        close={() =>
                            setMobileMenu(
                                false
                            )
                        }
                    />

                    {/* COMPANY MOBILE */}

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
                                        <Icon className="text-[17px] text-modura-primary" />

                                        {
                                            item.title
                                        }
                                    </Link>
                                );
                            }
                        )}
                    </MobileContent>

                    {/* SERVICES MOBILE */}

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
                            <div className="bg-modura-light">
                                {serviceCategories.map(
                                    (
                                        category,
                                        index
                                    ) => {
                                        const open =
                                            mobileServiceCategory ===
                                            index;

                                        return (
                                            <div
                                                key={
                                                    category.title
                                                }
                                                className="
                                                border-b
                                                border-modura-gray-200
                                            "
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setMobileServiceCategory(
                                                            open
                                                                ? null
                                                                : index
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
                                                        category.title
                                                    }

                                                    <FiChevronDown
                                                        className={`
                                                        transition-transform
                                                        duration-300

                                                        ${open
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

                                                    ${open
                                                            ? "max-h-[500px]"
                                                            : "max-h-0"
                                                        }
                                                `}
                                                >
                                                    {category.services.map(
                                                        (
                                                            service
                                                        ) => (
                                                            <Link
                                                                key={
                                                                    service.title
                                                                }
                                                                href={
                                                                    service.href
                                                                }
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
                                                                <span className="h-px w-3 bg-modura-secondary" />

                                                                {
                                                                    service.title
                                                                }
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        )}

                    {/* SOFTWARE MOBILE */}

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
                        {softwareLinks.map(
                            (software) => {
                                const Icon =
                                    software.icon;

                                return (
                                    <Link
                                        key={
                                            software.title
                                        }
                                        href={
                                            software.href
                                        }
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
                                        <Icon className="text-[18px] text-modura-primary" />

                                        <div>
                                            <span className="block text-[12px] font-semibold text-modura-primary">
                                                {
                                                    software.title
                                                }
                                            </span>

                                            <span className="block text-[10px] text-modura-gray-500">
                                                {
                                                    software.subtitle
                                                }
                                            </span>
                                        </div>
                                    </Link>
                                );
                            }
                        )}
                    </MobileContent>

                    {/* PORTFOLIO MOBILE */}

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
                        {portfolioLinks.map(
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
                                        <Icon className="text-[17px] text-modura-primary" />

                                        {
                                            item.title
                                        }
                                    </Link>
                                );
                            }
                        )}
                    </MobileContent>

                    <MobileLink
                        title="Career"
                        href="/career"
                        close={() =>
                            setMobileMenu(
                                false
                            )
                        }
                    />

                    <MobileLink
                        title="Inquiry"
                        href="/inquiry"
                        close={() =>
                            setMobileMenu(
                                false
                            )
                        }
                    />

                    <Link
                        href="/contact"
                        onClick={() =>
                            setMobileMenu(
                                false
                            )
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
                flex h-full
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
    groupName?: string;
}) {
    return (
        <button
            type="button"
            className="
                group/trigger
                relative
                flex h-full
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
            <span>{title}</span>

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
        <div className="relative h-[5px] w-full overflow-hidden">
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
                <span className="block text-[12px] font-semibold text-modura-primary">
                    {title}
                </span>
                {subtitle && (
                    <span className="mt-[2px] block text-[10px] text-modura-gray-500">
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
   MOBILE HELPERS
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

                    ${open
                        ? "rotate-180"
                        : ""
                    }
                `}
            />
        </button>
    );
}

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

                ${open
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                }
            `}
        >
            {children}
        </div>
    );
}