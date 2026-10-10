"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { ArrowUpRight, DraftingCompass } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { apiUrl } from "../config";

type Service = {
  id: number;
  title: string;
  slug: string;
  shortDescription?: string;
  image?: string;
  imageUrl?: string;
};

type ServicesResponse = {
  success?: boolean;
  message?: string;
  data?: Service[] | { items?: Service[] };
};

const API_BASE = (apiUrl || "https://mvnl.salexo.co.in/api/v1").replace(/\/+$/, "");
const ASSET_BASE = new URL(API_BASE).origin;

function imageUrlOf(service: Service): string {
  const url = service.imageUrl || service.image || "";
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return `${ASSET_BASE}/${url.replace(/^\/+/, "")}`;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function loadServices() {
      try {
        setLoading(true);
        setError("");
        const { data } = await axios.post<ServicesResponse>(
          `${API_BASE}/services`,
          { category: "" },
          { signal: controller.signal }
        );
        if (!data.success) throw new Error(data.message || "Unable to load services.");
        const items = Array.isArray(data.data) ? data.data : (data.data?.items || []);
        if (!controller.signal.aborted) setServices(items);
      } catch (err) {
        if (controller.signal.aborted || axios.isCancel(err)) return;
        setError(err instanceof Error ? err.message : "Unable to load services.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void loadServices();
    return () => controller.abort();
  }, []);

  return (
    <main className="w-full min-w-0 overflow-x-clip bg-modura-off-white">
      <Breadcrumb title="Our Services" />
      <section className="py-10 sm:py-12 lg:py-16">
        <div className="mx-auto w-full max-w-full px-4 md:px-6 lg:px-10 2xl:px-16">
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <div className="flex items-center gap-3 font-body text-[11px] font-bold uppercase tracking-[3px] text-modura-secondary sm:tracking-[5px]">
              <DraftingCompass size={20} strokeWidth={1.5} aria-hidden="true" />
              <span>Our Expertise</span>
            </div>
            <h1 className="mt-4 break-words font-heading text-[clamp(36px,6vw,64px)] font-semibold leading-[1.08] text-modura-primary">
              Our <span className="text-modura-secondary">Services</span>
            </h1>
            <p className="mt-4 max-w-[720px] font-body text-sm leading-7 text-modura-gray-600 sm:text-base">
              Explore our engineering and architectural services, tailored to the requirements of each project.
            </p>
          </div>

          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6" aria-live="polite">
              {Array.from({ length: 8 }, (_, i) => <div key={i} className="h-[300px] animate-pulse bg-modura-gray-200 sm:h-[330px] lg:h-[360px]" />)}
            </div>
          ) : error ? (
            <div role="alert" className="border-l-4 border-modura-secondary bg-white p-6 font-body text-modura-primary">{error}</div>
          ) : services.length === 0 ? (
            <div className="bg-white p-8 font-body text-modura-gray-600">No services available at the moment.</div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {services.map((item) => {
                const cover = imageUrlOf(item);
                return (
                  <Link
                    key={item.id}
                    href={`/servicedetail/${encodeURIComponent(item.slug)}`}
                    aria-label={`View ${item.title} details`}
                    className="group block min-w-0 no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-modura-secondary"
                  >
                    <article className="service-card relative h-[300px] w-full overflow-hidden bg-modura-primary transition-transform duration-500 hover:-translate-y-1 sm:h-[320px] lg:h-[360px]">
                      {cover ? (
                        <Image
                          src={cover}
                          alt={item.title}
                          fill
                          unoptimized
                          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
                          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-modura-secondary/20" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-modura-primary/95 via-modura-primary/25 to-transparent transition-colors duration-700 group-hover:from-modura-primary" />
                      <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-white/40 bg-modura-primary/50 text-white transition-all duration-300 group-hover:border-modura-secondary group-hover:bg-modura-secondary">
                        <ArrowUpRight size={20} strokeWidth={1.7} />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 min-w-0 p-5 transition-transform duration-700 group-hover:-translate-y-2 sm:p-6 lg:p-7">
                        <h2 className="break-words font-heading text-[20px] font-semibold leading-[1.15] text-white sm:text-[22px] lg:text-2xl">
                          {item.title}
                        </h2>
                        <div className="mt-3 h-[2px] w-10 bg-modura-secondary transition-all duration-500 group-hover:w-20" />
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}