// "use client";

// import Image from "next/image";
// import { useCallback, useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { FiPlus, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import Breadcrumb from "@/components/Breadcrumb";
// import { apiUrl } from "../../config";


// type TabKey = "2d" | "3d" | "other";
// type PortfolioImage = { id: number; image: string; imageUrl?: string };
// type Album = { id: number; title: string; images: PortfolioImage[] };
// type PortfolioItem = {
//   id: number;
//   title: string;
//   slug: string;
//   type: string;
//   imageType: "image" | "album";
//   clientName?: string;
//   coverImage?: string;
//   coverImageUrl?: string;
//   images: PortfolioImage[];
//   albums: Album[];
// };
// type Pagination = { page: number; limit: number; total: number; totalPages: number };
// type PortfolioResponse = {
//   success: boolean;
//   message: string;
//   data: { items: PortfolioItem[]; pagination: Pagination };
// };
// type GalleryImage = { id: string; src: string; title: string; albumTitle?: string };

// type TabConfig = { key: TabKey; title: string; category: string; type: string };
// const TABS: TabConfig[] = [
//   { key: "2d", title: "2D Samples", category: "2d-drafting", type: "2d" },
//   { key: "3d", title: "3D Samples", category: "2d-drafting", type: "3d" },
//   // Update these two values when backend confirms the Other Work category/type.
//   { key: "other", title: "Other Work", category: "other-work", type: "other" },
// ];

// function imageUrl(image?: string | null) {
//   if (!image) return "";
//   return /^https?:\/\//i.test(image) ? image : `${apiUrl}/${image.replace(/^\/+/, "")}`;
// }

// function galleryImages(item: PortfolioItem): GalleryImage[] {
//   const albumImages = (item.albums ?? []).flatMap((album) =>
//     (album.images ?? []).map((img) => ({
//       id: `album-${album.id}-${img.id}`,
//       src: imageUrl(img.imageUrl || img.image),
//       title: item.title,
//       albumTitle: album.title,
//     }))
//   );
//   const directImages = (item.images ?? []).map((img) => ({
//     id: `image-${img.id}`,
//     src: imageUrl(img.imageUrl || img.image),
//     title: item.title,
//   }));
//   const result = item.imageType === "album"
//     ? [...albumImages, ...directImages]
//     : [...directImages, ...albumImages];
//   if (result.length === 0 && (item.coverImageUrl || item.coverImage)) {
//     return [{ id: `cover-${item.id}`, src: imageUrl(item.coverImageUrl || item.coverImage), title: item.title }];
//   }
//   return result.filter((img) => Boolean(img.src));
// }

// function PortfolioCard({ item, onOpen }: { item: PortfolioItem; onOpen: (images: GalleryImage[], index: number) => void }) {
//   const images = useMemo(() => galleryImages(item), [item]);
//   const [active, setActive] = useState(0);
//   const current = images[active];
//   const hasMultiple = images.length > 1;

//   const move = (direction: number) => {
//     if (!images.length) return;
//     setActive((currentIndex) => (currentIndex + direction + images.length) % images.length);
//   };

//   return (
//     <article className="group overflow-hidden bg-white shadow-[0_5px_25px_rgba(6,19,34,0.07)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(6,19,34,0.13)]">
//       <div className="relative h-[260px] overflow-hidden bg-modura-light sm:h-[300px] lg:h-[320px]">
//         {current ? (
//           <button type="button" onClick={() => onOpen(images, active)} aria-label={`Open ${item.title} gallery`} className="absolute inset-0 block w-full cursor-zoom-in text-left">
//             <Image
//               src={current.src}
//               alt={`${item.title}${current.albumTitle ? ` - ${current.albumTitle}` : ""}`}
//               fill
//               unoptimized
//               sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//               className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
//             />
//             <span className="pointer-events-none absolute inset-0 bg-modura-primary/0 transition-colors duration-500 group-hover:bg-modura-primary/30" />
//             <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 scale-50 items-center justify-center rounded-full border border-white bg-white/95 text-modura-primary opacity-0 shadow-xl transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
//               <FiPlus size={23} strokeWidth={1.5} />
//             </span>
//           </button>
//         ) : (
//           <div className="flex h-full items-center justify-center font-body text-sm text-modura-gray-500">No image available</div>
//         )}

//         {hasMultiple && (
//           <>
//             <button type="button" aria-label={`Previous ${item.title} image`} onClick={() => move(-1)} className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white/95 text-modura-primary shadow-md transition hover:bg-modura-secondary hover:text-white"><FiChevronLeft size={20} /></button>
//             <button type="button" aria-label={`Next ${item.title} image`} onClick={() => move(1)} className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white/95 text-modura-primary shadow-md transition hover:bg-modura-secondary hover:text-white"><FiChevronRight size={20} /></button>
//             <div className="absolute bottom-3 right-3 z-10 bg-modura-primary/85 px-3 py-1.5 font-body text-[11px] font-semibold text-white">{active + 1} / {images.length}</div>
//           </>
//         )}
//       </div>

//       {hasMultiple && (
//         <div className="flex gap-2 overflow-x-auto px-3 pt-3 pb-1">
//           {images.map((img, index) => (
//             <button key={img.id} type="button" aria-label={`View thumbnail ${index + 1}`} onClick={() => setActive(index)} className={`relative h-[64px] w-[74px] shrink-0 overflow-hidden border-2 transition-opacity ${active === index ? "border-modura-secondary opacity-100" : "border-transparent opacity-55 hover:opacity-100"}`}>
//               <Image src={img.src} alt={`${item.title} thumbnail ${index + 1}`} fill unoptimized sizes="74px" className="object-cover" />
//             </button>
//           ))}
//         </div>
//       )}

//       <div className="px-5 pb-5 pt-4">
      
//         <h3 className="font-heading text-xl font-semibold uppercase leading-tight text-modura-primary">{item.title}</h3>
      
//       </div>
//     </article>
//   );
// }

// export default function PortfolioPage() {
//   const [activeTab, setActiveTab] = useState<TabKey>("3d");
//   const [items, setItems] = useState<PortfolioItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [lightbox, setLightbox] = useState<{ images: GalleryImage[]; index: number } | null>(null);

//   const selectedTab = TABS.find((tab) => tab.key === activeTab)!;
//   const lightboxCount = lightbox?.images.length ?? 0;

//   useEffect(() => {
//     const controller = new AbortController();
//     async function fetchPortfolios() {
//       setLoading(true);
//       setError("");
//       setItems([]);
//       try {
//         const response = await axios.post<PortfolioResponse>(
//           `${apiUrl}/portfolios`,
//           { category: selectedTab.category, type: selectedTab.type },
//           { headers: { "Content-Type": "application/json" }, signal: controller.signal }
//         );
//         if (!response.data.success) throw new Error(response.data.message || "Failed to load portfolios");
//         if (!controller.signal.aborted) setItems(response.data.data.items ?? []);
//       } catch (err) {
//         if (controller.signal.aborted || axios.isCancel(err)) return;
//         setError(err instanceof Error ? err.message : "Unable to load portfolios");
//       } finally {
//         if (!controller.signal.aborted) setLoading(false);
//       }
//     }
//     fetchPortfolios();
//     return () => controller.abort();
//   }, [selectedTab.category, selectedTab.type]);

//   const moveLightbox = useCallback((direction: number) => {
//     setLightbox((current) => current && current.images.length > 0
//       ? { ...current, index: (current.index + direction + current.images.length) % current.images.length }
//       : current);
//   }, []);

//   useEffect(() => {
//     if (!lightbox) return;
//     const previousOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     const handleKey = (event: KeyboardEvent) => {
//       if (event.key === "Escape") setLightbox(null);
//       if (event.key === "ArrowRight") moveLightbox(1);
//       if (event.key === "ArrowLeft") moveLightbox(-1);
//     };
//     window.addEventListener("keydown", handleKey);
//     return () => {
//       document.body.style.overflow = previousOverflow;
//       window.removeEventListener("keydown", handleKey);
//     };
//   }, [lightbox !== null, moveLightbox]);

//   return (
//     <>
//       <main className="bg-modura-off-white">
//         <Breadcrumb title="Portfolio" />
//         <section className="bg-white">
//           <div className="flex justify-center px-5 py-16">
//             <div className="flex w-full max-w-[850px] flex-col gap-3 sm:flex-row">
//               {TABS.map((tab) => {
//                 const active = activeTab === tab.key;
//                 return (
//                   <button key={tab.key} type="button" onClick={() => { setActiveTab(tab.key); setLightbox(null); }} className="group relative flex min-h-[66px] flex-1 items-center overflow-hidden border border-modura-gray-200 bg-modura-off-white px-7 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-modura-secondary" aria-pressed={active}>
//                     <span className={`absolute inset-y-0 left-0 w-full origin-left bg-modura-primary transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
//                     <span className={`absolute left-0 top-0 h-[7px] bg-modura-secondary transition-all duration-500 ${active ? "w-[75px]" : "w-[38px] group-hover:w-[75px]"}`} />
//                     <span className={`relative z-10 font-heading text-[17px] font-bold tracking-[-0.01em] transition-all duration-500 ${active ? "translate-x-2 text-white" : "text-modura-primary group-hover:translate-x-2 group-hover:text-white"}`}>{tab.title}</span>
//                     <span className={`absolute bottom-0 left-0 h-[2px] bg-modura-secondary transition-all duration-700 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         </section>

//         <section id="portfolio-gallery" className="scroll-mt-24 bg-modura-off-white">
//           <div className="mx-auto max-w-[1380px] px-4 pb-20 pt-6 sm:px-7 lg:pt-8">
//             {loading ? (
//               <div className="flex min-h-[300px] items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-[3px] border-modura-gray-200 border-t-modura-secondary" /></div>
//             ) : error ? (
//               <div className="py-20 text-center font-body text-modura-primary" role="alert">{error}</div>
//             ) : items.length === 0 ? (
//               <div className="py-20 text-center font-body text-modura-gray-600">No portfolio projects available.</div>
//             ) : (
//               <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//                 {items.map((item) => <PortfolioCard key={item.id} item={item} onOpen={(images, index) => setLightbox({ images, index })} />)}
//               </div>
//             )}
//           </div>
//         </section>
//       </main>

//       {lightbox && lightboxCount > 0 && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-modura-primary/95 p-4 backdrop-blur-md sm:p-8" role="dialog" aria-modal="true" aria-label={`${lightbox.images[lightbox.index].title} gallery`} onClick={() => setLightbox(null)}>
//           <button type="button" aria-label="Close gallery" onClick={() => setLightbox(null)} className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white text-modura-primary shadow-lg transition-all duration-300 hover:rotate-90 hover:bg-modura-secondary hover:text-white"><FiX size={21} /></button>
//           {lightboxCount > 1 && (
//             <>
//               <button type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); moveLightbox(-1); }} className="absolute left-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-modura-primary shadow-lg transition-all duration-300 hover:bg-modura-secondary hover:text-white sm:left-8"><FiChevronLeft size={22} /></button>
//               <button type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); moveLightbox(1); }} className="absolute right-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-modura-primary shadow-lg transition-all duration-300 hover:bg-modura-secondary hover:text-white sm:right-8"><FiChevronRight size={22} /></button>
//             </>
//           )}
//           <div className="relative h-[75vh] w-full max-w-[1200px]" onClick={(event) => event.stopPropagation()}>
//             <Image src={lightbox.images[lightbox.index].src} alt={lightbox.images[lightbox.index].title} fill unoptimized priority sizes="95vw" className="object-contain" />
//           </div>
//           <div className="absolute bottom-5 left-1/2 flex max-w-[90vw] -translate-x-1/2 flex-col items-center gap-1 rounded-lg bg-white/10 px-5 py-2 text-center font-body text-xs text-white backdrop-blur">
//             <span className="font-semibold">{lightbox.images[lightbox.index].title}</span>
//             {lightbox.images[lightbox.index].albumTitle && <span className="text-white/70">{lightbox.images[lightbox.index].albumTitle}</span>}
//             <span className="text-white/80">{lightbox.index + 1} / {lightboxCount}</span>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FiPlus, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Breadcrumb from "@/components/Breadcrumb";

const API_BASE = "https://mvnl.salexo.co.in";

type TabKey = "2d" | "3d";
type PortfolioImage = { id: number; image: string; imageUrl?: string };
type Album = { id: number; title: string; images: PortfolioImage[] };
type PortfolioItem = {
  id: number;
  title: string;
  slug: string;
  type: string;
  imageType: "image" | "album";
  clientName?: string;
  coverImage?: string;
  coverImageUrl?: string;
  images: PortfolioImage[];
  albums: Album[];
};
type Pagination = { page: number; limit: number; total: number; totalPages: number };
type PortfolioResponse = {
  success: boolean;
  message: string;
  data: { items: PortfolioItem[]; pagination: Pagination };
};
type GalleryImage = { id: string; src: string; title: string; albumTitle?: string };

type TabConfig = { key: TabKey; title: string; category: string; type: string };
const TABS: TabConfig[] = [
  { key: "2d", title: "2D Samples", category: "2d-drafting", type: "2d" },
  { key: "3d", title: "3D Samples", category: "2d-drafting", type: "3d" },
];

function imageUrl(image?: string | null) {
  if (!image) return "";
  return /^https?:\/\//i.test(image) ? image : `${API_BASE}/${image.replace(/^\/+/, "")}`;
}

function galleryImages(item: PortfolioItem): GalleryImage[] {
  const albumImages = (item.albums ?? []).flatMap((album) =>
    (album.images ?? []).map((img) => ({
      id: `album-${album.id}-${img.id}`,
      src: imageUrl(img.imageUrl || img.image),
      title: item.title,
      albumTitle: album.title,
    }))
  );
  const directImages = (item.images ?? []).map((img) => ({
    id: `image-${img.id}`,
    src: imageUrl(img.imageUrl || img.image),
    title: item.title,
  }));
  const result = item.imageType === "album"
    ? [...albumImages, ...directImages]
    : [...directImages, ...albumImages];
  if (result.length === 0 && (item.coverImageUrl || item.coverImage)) {
    return [{ id: `cover-${item.id}`, src: imageUrl(item.coverImageUrl || item.coverImage), title: item.title }];
  }
  return result.filter((img) => Boolean(img.src));
}

type OpenGallery = (images: GalleryImage[], index: number) => void;

/* Single-image portfolios: compact grid cards at the top */
function SingleImageCard({ item, onOpen }: { item: PortfolioItem; onOpen: OpenGallery }) {
  const images = galleryImages(item);
  const cover = images[0];
  return (
    <article className="group overflow-hidden bg-white shadow-[0_5px_25px_rgba(6,19,34,0.07)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(6,19,34,0.13)]">
      <button type="button" disabled={!cover} onClick={() => onOpen(images, 0)} className="relative block h-[260px] w-full overflow-hidden bg-modura-light text-left sm:h-[300px] lg:h-[320px]" aria-label={`View ${item.title}`}>
        {cover ? <Image src={cover.src} alt={item.title} fill unoptimized sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /> : <span className="flex h-full items-center justify-center text-modura-gray-500">No image available</span>}
        <span className="pointer-events-none absolute inset-0 bg-modura-primary/0 transition-colors duration-500 group-hover:bg-modura-primary/35" />
        <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-white text-modura-primary opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"><FiPlus size={24} /></span>
      </button>
      <div className="px-5 py-5">
        <h3 className="font-heading text-xl font-semibold uppercase leading-tight text-modura-primary">{item.title}</h3>
      </div>
    </article>
  );
}

/* Album projects: automatic slider, dot indicators, and title only */
function AlbumCard({ item, onOpen }: { item: PortfolioItem; onOpen: OpenGallery }) {
  const images = useMemo(() => galleryImages(item), [item]);
  const [active, setActive] = useState(0);
  const currentIndex = images.length ? active % images.length : 0;
  const current = images[currentIndex];

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % images.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <article className="group overflow-hidden bg-white shadow-[0_8px_30px_rgba(6,19,34,0.07)] transition-all duration-500 hover:-translate-y-1">
      <div className="relative h-[260px] overflow-hidden bg-modura-light sm:h-[370px] lg:h-[430px]">
        {current ? (
          <button
            type="button"
            onClick={() => onOpen(images, currentIndex)}
            className="absolute inset-0 block w-full cursor-zoom-in"
            aria-label={`Open ${item.title}`}
          >
            <Image
              key={current.id}
              src={current.src}
              alt={item.title}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain animate-[fadeIn_0.5s_ease-in-out]"
            />
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
        <h3 className="font-heading text-xl font-semibold uppercase leading-tight text-modura-primary">{item.title}</h3>
      </div>
    </article>
  );
}

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("3d");
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lightbox, setLightbox] = useState<{ images: GalleryImage[]; index: number } | null>(null);

  const selectedTab = TABS.find((tab) => tab.key === activeTab)!;
  const lightboxCount = lightbox?.images.length ?? 0;
  const singleProjects = items.filter((item) => item.imageType !== "album");
  const albumProjects = items.filter((item) => item.imageType === "album");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchPortfolios() {
      setLoading(true);
      setError("");
      setItems([]);
      try {
        const response = await axios.post<PortfolioResponse>(
          `${API_BASE}/api/v1/portfolios`,
          { category: selectedTab.category, type: selectedTab.type },
          { headers: { "Content-Type": "application/json" }, signal: controller.signal }
        );
        if (!response.data.success) throw new Error(response.data.message || "Failed to load portfolios");
        if (!controller.signal.aborted) setItems(response.data.data.items ?? []);
      } catch (err) {
        if (controller.signal.aborted || axios.isCancel(err)) return;
        setError(err instanceof Error ? err.message : "Unable to load portfolios");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    fetchPortfolios();
    return () => controller.abort();
  }, [selectedTab.category, selectedTab.type]);

  const moveLightbox = useCallback((direction: number) => {
    setLightbox((current) => current && current.images.length > 0
      ? { ...current, index: (current.index + direction + current.images.length) % current.images.length }
      : current);
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight") moveLightbox(1);
      if (event.key === "ArrowLeft") moveLightbox(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightbox !== null, moveLightbox]);

  return (
    <>
      <main className="bg-modura-off-white">
        <Breadcrumb title="Portfolio" />
        <section className="bg-white">
          <div className="flex justify-center px-5 py-16">
            <div className="flex w-full max-w-[400px] flex-col gap-3 sm:flex-row">
              {TABS.map((tab) => {
                const active = activeTab === tab.key;
                return (
                  <button key={tab.key} type="button" onClick={() => { setActiveTab(tab.key); setLightbox(null); }} className="group relative flex min-h-[66px] flex-1 items-center overflow-hidden border border-modura-gray-200 bg-modura-off-white px-7 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-modura-secondary" aria-pressed={active}>
                    <span className={`absolute inset-y-0 left-0 w-full origin-left bg-modura-primary transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                    <span className={`absolute left-0 top-0 h-[7px] bg-modura-secondary transition-all duration-500 ${active ? "w-[75px]" : "w-[38px] group-hover:w-[75px]"}`} />
                    <span className={`relative z-10 font-heading text-[17px] font-bold tracking-[-0.01em] transition-all duration-500 ${active ? "translate-x-2 text-white" : "text-modura-primary group-hover:translate-x-2 group-hover:text-white"}`}>{tab.title}</span>
                    <span className={`absolute bottom-0 left-0 h-[2px] bg-modura-secondary transition-all duration-700 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section id="portfolio-gallery" className="scroll-mt-24 bg-modura-off-white">
          <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-7 lg:pt-8">
            {loading ? (
              <div className="flex min-h-[300px] items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-[3px] border-modura-gray-200 border-t-modura-secondary" /></div>
            ) : error ? (
              <div className="py-20 text-center font-body text-modura-primary" role="alert">{error}</div>
            ) : items.length === 0 ? (
              <div className="py-20 text-center font-body text-modura-gray-600">No portfolio projects available.</div>
            ) : (
              <div className="space-y-16">
                {/* FIRST: SINGLE IMAGES */}
                {singleProjects.length > 0 && <div>
                  <div className="mb-7 flex items-center gap-4"><span className="h-[2px] w-9 bg-modura-secondary" /><h2 className="font-heading text-3xl font-semibold uppercase text-modura-primary md:text-4xl">Project <span className="text-modura-secondary">Images</span></h2></div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {singleProjects.map((item) => <SingleImageCard key={item.id} item={item} onOpen={(images, index) => setLightbox({ images, index })} />)}
                  </div>
                </div>}
                {/* SECOND: ALBUMS, LARGE SLIDERS WITH THUMBNAILS */}
                {albumProjects.length > 0 && <div>
                  <div className="mb-7 flex items-center gap-4"><span className="h-[2px] w-9 bg-modura-secondary" /><h2 className="font-heading text-3xl font-semibold uppercase text-modura-primary md:text-4xl">Project <span className="text-modura-secondary">Albums</span></h2></div>
                  <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
                    {albumProjects.map((item) => <AlbumCard key={item.id} item={item} onOpen={(images, index) => setLightbox({ images, index })} />)}
                  </div>
                </div>}
              </div>
            )}
          </div>
        </section>
      </main>

      {lightbox && lightboxCount > 0 && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-modura-primary/95 p-4 backdrop-blur-md sm:p-8" role="dialog" aria-modal="true" aria-label={`${lightbox.images[lightbox.index].title} gallery`} onClick={() => setLightbox(null)}>
          <button type="button" aria-label="Close gallery" onClick={() => setLightbox(null)} className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white text-modura-primary shadow-lg transition-all duration-300 hover:rotate-90 hover:bg-modura-secondary hover:text-white"><FiX size={21} /></button>
          {lightboxCount > 1 && (
            <>
              <button type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); moveLightbox(-1); }} className="absolute left-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-modura-primary shadow-lg transition-all duration-300 hover:bg-modura-secondary hover:text-white sm:left-8"><FiChevronLeft size={22} /></button>
              <button type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); moveLightbox(1); }} className="absolute right-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-modura-primary shadow-lg transition-all duration-300 hover:bg-modura-secondary hover:text-white sm:right-8"><FiChevronRight size={22} /></button>
            </>
          )}
          <div className="relative h-[75vh] w-full max-w-[1200px]" onClick={(event) => event.stopPropagation()}>
            <Image src={lightbox.images[lightbox.index].src} alt={lightbox.images[lightbox.index].title} fill unoptimized priority sizes="95vw" className="object-contain" />
          </div>
          <div className="absolute bottom-5 left-1/2 flex max-w-[90vw] -translate-x-1/2 flex-col items-center gap-1 rounded-lg bg-white/10 px-5 py-2 text-center font-body text-xs text-white backdrop-blur">
            <span className="font-semibold">{lightbox.images[lightbox.index].title}</span>
          </div>
        </div>
      )}
    </>
  );
}