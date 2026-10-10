"use client";


import Image from "next/image";

import { useParams } from "next/navigation";

import { useCallback, useEffect, useMemo, useState } from "react";

import axios from "axios";

import { FiPlus, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import Breadcrumb from "@/components/Breadcrumb";

import { apiUrl } from "../../config";



type TabKey = "2d" | "3d";



type PortfolioImage = { id: number; image?: string; imageUrl?: string };

type Album = { id: number; title: string; images?: PortfolioImage[] };

type PortfolioItem = {

  id: number;

  title: string;

  slug: string;

  type: string;

  imageType: "image" | "album";

  clientName?: string;

  coverImage?: string;

  coverImageUrl?: string;

  images?: PortfolioImage[];

  albums?: Album[];

};

type PortfolioResponse = {

  success: boolean;

  message?: string;

  data?: {

    items?: PortfolioItem[];

    pagination?: { page: number; limit: number; total: number; totalPages: number };

  };

};

type GalleryImage = { id: string; src: string; title: string; albumTitle?: string };

type OpenGallery = (images: GalleryImage[], index: number) => void;



// Imported apiUrl can be string | undefined depending on config.ts.

const API_BASE = (apiUrl || "https://mvnl.salexo.co.in/api/v1").replace(/\/+$/, "");

const IMAGE_ORIGIN = new URL(API_BASE).origin;



function imageUrl(image?: string | null) {

  if (!image) return "";

  if (/^https?:\/\//i.test(image)) return image;

  return `${IMAGE_ORIGIN}/${image.replace(/^\/+/, "")}`;

}



function galleryImages(item: PortfolioItem): GalleryImage[] {
  // Albums: use ONLY albums[].images, never the main images[] array.
  if (item.imageType === "album") {
    return (item.albums ?? []).flatMap((album) =>
      (album.images ?? []).map((img) => ({
        id: `album-${item.id}-${album.id}-${img.id}`,
        src: imageUrl(img.imageUrl || img.image),
        title: item.title,
        albumTitle: album.title,
      }))
    ).filter((img) => Boolean(img.src));
  }

  const directImages: GalleryImage[] = (item.images ?? []).map((img) => ({
    id: `image-${item.id}-${img.id}`,
    src: imageUrl(img.imageUrl || img.image),
    title: item.title,
  })).filter((img) => Boolean(img.src));

  if (directImages.length === 0 && (item.coverImageUrl || item.coverImage)) {
    const coverSrc = imageUrl(item.coverImageUrl || item.coverImage);
    if (coverSrc) {
      directImages.push({ id: `cover-${item.id}`, src: coverSrc, title: item.title });
    }
  }
  return directImages;
}


function SingleImageCard({ item, onOpen }: { item: PortfolioItem; onOpen: (id: number) => void }) {

  const images = galleryImages(item);

  const cover = images[0];



  return (

    <article className="group min-w-0 overflow-hidden bg-white shadow-[0_5px_25px_rgba(6,19,34,0.07)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(6,19,34,0.13)]">

      <button

        type="button"

        disabled={!cover}

        onClick={() => onOpen(item.id)}

        className="relative block h-[260px] w-full overflow-hidden bg-modura-light text-left sm:h-[300px] lg:h-[320px]"

        aria-label={`View ${item.title}`}

      >

        {cover ? (

          <Image src={cover.src} alt={item.title} fill unoptimized sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />

        ) : (

          <span className="flex h-full items-center justify-center text-modura-gray-500">No image available</span>

        )}

        <span className="pointer-events-none absolute inset-0 bg-modura-primary/0 transition-colors duration-500 group-hover:bg-modura-primary/35" />

        <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-white text-modura-primary opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">

          <FiPlus size={24} />

        </span>

      </button>

      <div className="px-5 py-5">

        <h3 className="break-words font-heading text-xl font-semibold uppercase leading-tight text-modura-primary">{item.title}</h3>

      </div>

    </article>

  );

}



function AlbumCard({ item, onOpen }: { item: PortfolioItem; onOpen: OpenGallery }) {

  const images = useMemo(() => galleryImages(item), [item]);

  const [active, setActive] = useState(0);

  const currentIndex = images.length ? active % images.length : 0;

  const current = images[currentIndex];



  useEffect(() => {

    setActive(0);

    if (images.length <= 1) return;

    const timer = window.setInterval(() => {

      setActive((index) => (index + 1) % images.length);

    }, 3500);

    return () => window.clearInterval(timer);

  }, [images.length, item.id]);



  return (

    <article className="group min-w-0 overflow-hidden bg-white shadow-[0_8px_30px_rgba(6,19,34,0.07)] transition-all duration-500 hover:-translate-y-1">

      <div className="relative h-[260px] overflow-hidden bg-modura-light sm:h-[370px] lg:h-[430px]">

        {current ? (

          <button type="button" onClick={() => onOpen(images, currentIndex)} className="absolute inset-0 block w-full cursor-zoom-in" aria-label={`Open ${item.title}`}>

            <Image key={current.id} src={current.src} alt={item.title} fill unoptimized sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain" />

          </button>

        ) : (

          <div className="flex h-full items-center justify-center text-modura-gray-500">No image available</div>

        )}

        {images.length > 1 && (

          <div className="absolute bottom-4 left-1/2 z-10 flex max-w-[90%] -translate-x-1/2 flex-wrap items-center justify-center gap-2 rounded-full bg-modura-primary/60 px-3 py-2">

            {images.map((img, index) => (

              <button

                key={img.id}

                type="button"

                aria-label={`Show ${item.title} image ${index + 1}`}

                aria-pressed={index === currentIndex}

                onClick={() => setActive(index)}

                className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? "w-6 bg-white" : "w-2.5 bg-white/50 hover:bg-white"}`}

              />

            ))}

          </div>

        )}

      </div>

      <div className="px-5 py-5">

        <h3 className="break-words font-heading text-xl font-semibold uppercase leading-tight text-modura-primary">{item.title}</h3>

      </div>

    </article>

  );

}



export default function PortfolioCategoryPage() {

  const params = useParams();

  // /portfolio => category: ""; /portfolio/[slug] => selected category slug.

  const slug = typeof params.slug === "string" ? params.slug : "";



  // Switching a header category resets tab to 3D without waiting for an effect.

  const [tabState, setTabState] = useState<{ slug: string; type: TabKey }>({

    slug,

    type: "3d",

  });

  const activeTab: TabKey = tabState.slug === slug ? tabState.type : "3d";

  const [items, setItems] = useState<PortfolioItem[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [lightbox, setLightbox] = useState<{ images: GalleryImage[]; index: number } | null>(null);



  // Run on category slug OR static 2D/3D tab change.

  useEffect(() => {

    const controller = new AbortController();



    async function fetchPortfolios() {

      setLoading(true);

      setError("");

      setItems([]);

      setLightbox(null);



      try {

        const allItems: PortfolioItem[] = [];

        const seenIds = new Set<number>();

        let totalPages = 1;



        // API returns paginated data; retrieve remaining pages when provided.

        for (let page = 1; page <= Math.min(totalPages, 100); page++) {

          const response = await axios.post<PortfolioResponse>(

            `${API_BASE}/portfolios`,

            { category: slug, type: activeTab, page, limit: 12 },

            { signal: controller.signal, headers: { "Content-Type": "application/json" } }

          );



          if (!response.data.success) {

            throw new Error(response.data.message || "Failed to load portfolios");

          }



          const pageItems = response.data.data?.items ?? [];

          const newItems = pageItems.filter((item) => !seenIds.has(item.id));

          // Prevent duplicate results if backend ignores page parameter.

          if (page > 1 && newItems.length === 0) break;

          newItems.forEach((item) => {

            seenIds.add(item.id);

            allItems.push(item);

          });

          const pages = response.data.data?.pagination?.totalPages;

          totalPages = typeof pages === "number" && pages > 0 ? pages : 1;

        }



        if (!controller.signal.aborted) setItems(allItems);

      } catch (err) {

        if (controller.signal.aborted || axios.isCancel(err)) return;

        setError(err instanceof Error ? err.message : "Unable to load portfolios");

      } finally {

        if (!controller.signal.aborted) setLoading(false);

      }

    }



    void fetchPortfolios();

    return () => controller.abort();

  }, [slug, activeTab]);



  const moveLightbox = useCallback((direction: number) => {

    setLightbox((current) =>

      current && current.images.length

        ? { ...current, index: (current.index + direction + current.images.length) % current.images.length }

        : current

    );

  }, []);



  const isLightboxOpen = lightbox !== null;

  useEffect(() => {

    if (!isLightboxOpen) return;

    const oldOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKey = (event: KeyboardEvent) => {

      if (event.key === "Escape") setLightbox(null);

      if (event.key === "ArrowRight") moveLightbox(1);

      if (event.key === "ArrowLeft") moveLightbox(-1);

    };

    window.addEventListener("keydown", handleKey);

    return () => {

      document.body.style.overflow = oldOverflow;

      window.removeEventListener("keydown", handleKey);

    };

  }, [isLightboxOpen, moveLightbox]);



  const singleProjects = items.filter((item) => item.imageType !== "album");

  const albumProjects = items.filter((item) => item.imageType === "album");

  // A + click opens the selected project cover. Next/Previous moves to the
  // next/previous IMAGE portfolio, rather than images inside the same project.
  const projectGallery = useMemo(() =>
    singleProjects.flatMap((project) => {
      const cover = galleryImages(project)[0];
      return cover ? [{ ...cover, id: `project-${project.id}` }] : [];
    }), [items]
  );

  const openProject = useCallback((projectId: number) => {
    const index = projectGallery.findIndex((image) => image.id === `project-${projectId}`);
    if (index >= 0) setLightbox({ images: projectGallery, index });
  }, [projectGallery]);

  const lightboxCount = lightbox?.images.length ?? 0;



  return (

    <>

      <main className="min-h-[55vh] bg-modura-off-white">

        <Breadcrumb title="Portfolio" />



     

        <section className="bg-white">

          <div className="flex justify-center px-4 py-8 md:px-6 lg:px-10 2xl:px-16">

            <div className="flex w-full max-w-[400px] flex-col gap-3 sm:flex-row">

              {(["2d", "3d"] as const).map((type) => {

                const active = activeTab === type;

                return (

                  <button

                    key={type}

                    type="button"

                    onClick={() => {

                      setTabState({ slug, type });

                      setLightbox(null);

                    }}

                    aria-pressed={active}

                    className="group relative flex min-h-[66px] flex-1 items-center overflow-hidden border border-modura-gray-200 bg-modura-off-white px-7 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-modura-secondary"

                  >

                    <span className={`absolute inset-y-0 left-0 w-full origin-left bg-modura-primary transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />

                    <span className={`absolute left-0 top-0 h-[7px] bg-modura-secondary transition-all duration-500 ${active ? "w-[75px]" : "w-[38px] group-hover:w-[75px]"}`} />

                    <span className={`relative z-10 font-heading text-[17px] font-bold tracking-[-0.01em] transition-all duration-500 ${active ? "translate-x-2 text-white" : "text-modura-primary group-hover:translate-x-2 group-hover:text-white"}`}>

                      {type === "2d" ? "2D Samples" : "3D Samples"}

                    </span>

                    <span className={`absolute bottom-0 left-0 h-[2px] bg-modura-secondary transition-all duration-700 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />

                  </button>

                );

              })}

            </div>

          </div>

        </section>



        <section id="portfolio-gallery" className="scroll-mt-24 bg-modura-off-white">

          <div className="mx-auto w-full max-w-full px-4 pb-12 pt-7 md:px-6 lg:px-10 2xl:px-16">

            {loading ? (

              <div className="flex min-h-[280px] items-center justify-center" aria-label="Loading portfolios">

                <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-modura-gray-200 border-t-modura-secondary" />

              </div>

            ) : error ? (

              <div role="alert" className="py-16 text-center font-body text-modura-primary">{error}</div>

            ) : items.length === 0 ? (

              <div className="py-16 text-center font-body text-modura-gray-600">

                No {activeTab.toUpperCase()} projects available{slug ? " in this category" : ""}.

              </div>

            ) : (

              <div className="space-y-12">

                {singleProjects.length > 0 && (

                  <div>

                    <div className="mb-7 flex items-center gap-4">

                      <span className="h-[2px] w-9 shrink-0 bg-modura-secondary" />

                      <h2 className="font-heading text-2xl font-semibold uppercase text-modura-primary md:text-4xl">

                        Project <span className="text-modura-secondary">Images</span>

                      </h2>

                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                      {singleProjects.map((item) => (

                        <SingleImageCard key={item.id} item={item} onOpen={openProject} />

                      ))}

                    </div>

                  </div>

                )}

                {albumProjects.length > 0 && (

                  <div>

                    <div className="mb-7 flex items-center gap-4">

                      <span className="h-[2px] w-9 shrink-0 bg-modura-secondary" />

                      <h2 className="font-heading text-2xl font-semibold uppercase text-modura-primary md:text-4xl">

                        Project <span className="text-modura-secondary">Albums</span>

                      </h2>

                    </div>

                    <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">

                      {albumProjects.map((item) => (

                        <AlbumCard key={item.id} item={item} onOpen={(images, index) => setLightbox({ images, index })} />

                      ))}

                    </div>

                  </div>

                )}

              </div>

            )}

          </div>

        </section>

      </main>



      {lightbox && lightboxCount > 0 && (

        <div

          className="fixed inset-0 z-[9999] flex items-center justify-center bg-modura-primary/95 p-3 backdrop-blur-md sm:p-8"

          role="dialog"

          aria-modal="true"

          aria-label={`${lightbox.images[lightbox.index].title} gallery`}

          onClick={() => setLightbox(null)}

        >

          <button type="button" aria-label="Close gallery" onClick={() => setLightbox(null)} className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white text-modura-primary hover:bg-modura-secondary hover:text-white">

            <FiX size={21} />

          </button>

          {lightboxCount > 1 && (

            <>

              <button type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); moveLightbox(-1); }} className="absolute left-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-modura-primary sm:left-8">

                <FiChevronLeft size={22} />

              </button>

              <button type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); moveLightbox(1); }} className="absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-modura-primary sm:right-8">

                <FiChevronRight size={22} />

              </button>

            </>

          )}

          <div className="relative h-[75vh] w-full max-w-[1200px]" onClick={(event) => event.stopPropagation()}>

            <Image src={lightbox.images[lightbox.index].src} alt={lightbox.images[lightbox.index].title} fill unoptimized priority sizes="95vw" className="object-contain" />

          </div>

       

        </div>

      )}

    </>

  );

}