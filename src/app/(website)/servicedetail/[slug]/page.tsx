import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    DraftingCompass,
    ChevronDown,
} from "lucide-react";

import Breadcrumb from "@/components/Breadcrumb";

import ServiceDetailContent from "./ServiceDetailContent";

import api from "@/lib/api";
import { apiUrl } from "../../config";


/* =========================================================
   TYPES
========================================================= */

type FAQ = {
    id?: number;
    question?: string;
    answer?: string;
};

type RelatedService = {
    id: number;
    title: string;
    slug: string;
    image?: string;
    imageUrl?: string;
};

type Blog = {
    id: number;
    title: string;
    slug: string;
    image?: string;
    imageUrl?: string;
    author?: string;
    description :string;
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

    related?: RelatedService[];

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
   DATE FORMAT
========================================================= */

function formatDate(date?: string) {

    if (!date) {
        return "";
    }

    const parsedDate =
        new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "";
    }

    return parsedDate.toLocaleDateString(
        "en-US",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
}


/* =========================================================
   API
========================================================= */

async function getServiceDetail(
    slug: string
): Promise<ServiceDetail | null> {

    try {

        const response =
            await api.post(
                `${apiUrl}/serviceDetail`,
                {
                    slug,
                }
            );


        if (
            response.data?.success &&
            response.data?.data
        ) {

            return response.data.data;

        }


        return null;

    } catch (error) {

        console.error(
            "Service Detail API Error:",
            error
        );

        return null;

    }

}


/* =========================================================
   PAGE
========================================================= */

export default async function ServiceDetailPage({
    params,
}: {
    params: Promise<{
        slug: string;
    }>;
}) {

    const { slug } =
        await params;


    const service =
        await getServiceDetail(slug);


    /* =====================================================
       ERROR
    ===================================================== */

    if (!service) {

        return (

            <main
                className="
                    min-h-screen
                    bg-modura-off-white
                "
            >

                <Breadcrumb
                    title="Service"
                />


                <section
                    className="
                        flex
                        min-h-[500px]
                        items-center
                        justify-center
                        px-5
                    "
                >

                    <div
                        className="
                            text-center
                        "
                    >

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
                            Service
                        </span>


                        <h1
                            className="
                                mt-4
                                font-heading
                                text-4xl
                                font-bold
                                text-modura-primary
                            "
                        >
                            Service Not Found
                        </h1>


                        <p
                            className="
                                mt-4
                                text-sm
                                text-modura-gray-500
                            "
                        >
                            The requested service
                            could not be found.
                        </p>


                        <Link
                            href="/services"
                            className="
                                mt-7
                                inline-flex
                                h-[50px]
                                items-center
                                gap-3
                                bg-modura-primary
                                px-7
                                text-[11px]
                                font-bold
                                uppercase
                                tracking-[0.15em]
                                text-white
                            "
                        >

                            Back To Services

                            <ArrowUpRight
                                size={17}
                            />

                        </Link>

                    </div>

                </section>

            </main>

        );

    }


    return (

        <ServiceDetailContent
            service={service}
        />

    );

}