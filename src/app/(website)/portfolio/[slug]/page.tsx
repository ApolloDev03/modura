// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import {
//   FiPlus,
//   FiX,
//   FiChevronLeft,
//   FiChevronRight,
// } from "react-icons/fi";

// import img1 from "../../assets/images/blog1.jpeg";
// import img2 from "../../assets/images/blog2.jpeg";
// import img3 from "../../assets/images/blog3.jpeg";
// import img4 from "../../assets/images/blueprint.jpeg";
// import img5 from "../../assets/images/infrastructure.jpeg";
// import img6 from "../../assets/images/manufacturing.jpeg";
// import img7 from "../../assets/images/oil.jpeg";
// import Breadcrumb from "../../../../components/Breadcrumb";

// type SampleType = "3D" | "2D";

// type GalleryItem = {
//   image: string;
//   type: SampleType;
// };

// const gallery: GalleryItem[] = [
//   // =========================
//   // 3D SAMPLES
//   // =========================
//   {
//     image: img1.src,
//     type: "3D",
//   },
//   {
//     image: img2.src,
//     type: "3D",
//   },
//   {
//     image: img3.src,
//     type: "3D",
//   },
//   {
//     image: img5.src,
//     type: "3D",
//   },
//   {
//     image: img6.src,
//     type: "3D",
//   },
//   {
//     image: img7.src,
//     type: "3D",
//   },

//   // =========================
//   // 2D SAMPLES
//   // =========================
//   {
//     image: img4.src,
//     type: "2D",
//   },
//   {
//     image: img1.src,
//     type: "2D",
//   },
//   {
//     image: img2.src,
//     type: "2D",
//   },
//   {
//     image: img3.src,
//     type: "2D",
//   },
//   {
//     image: img5.src,
//     type: "2D",
//   },
//   {
//     image: img6.src,
//     type: "2D",
//   },
// ];

// export default function PortfolioPage() {
//   const [activeTab, setActiveTab] =
//     useState<SampleType>("3D");

//   const [selected, setSelected] =
//     useState<number | null>(null);

//   const images = gallery.filter(
//     (item) => item.type === activeTab
//   );

//   /* =====================================================
//      LOCK BODY SCROLL WHEN LIGHTBOX IS OPEN
//   ===================================================== */

//   useEffect(() => {
//     if (selected !== null) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [selected]);

//   /* =====================================================
//      OPEN IMAGE
//   ===================================================== */

//   const openImage = (index: number) => {
//     setSelected(index);
//   };

//   /* =====================================================
//      CLOSE IMAGE
//   ===================================================== */

//   const closeImage = () => {
//     setSelected(null);
//   };

//   /* =====================================================
//      NEXT IMAGE
//   ===================================================== */

//   const nextImage = () => {
//     if (selected === null) return;

//     setSelected(
//       (selected + 1) % images.length
//     );
//   };

//   /* =====================================================
//      PREVIOUS IMAGE
//   ===================================================== */

//   const previousImage = () => {
//     if (selected === null) return;

//     setSelected(
//       selected === 0
//         ? images.length - 1
//         : selected - 1
//     );
//   };

//   /* =====================================================
//      CHANGE TAB
//   ===================================================== */

//   const changeTab = (tab: SampleType) => {
//     setActiveTab(tab);
//     setSelected(null);
//   };

//   /* =====================================================
//      KEYBOARD CONTROLS
//   ===================================================== */

//   useEffect(() => {
//     if (selected === null) return;

//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         closeImage();
//       }

//       if (event.key === "ArrowRight") {
//         nextImage();
//       }

//       if (event.key === "ArrowLeft") {
//         previousImage();
//       }
//     };

//     window.addEventListener(
//       "keydown",
//       handleKeyDown
//     );

//     return () => {
//       window.removeEventListener(
//         "keydown",
//         handleKeyDown
//       );
//     };
//   }, [selected, images.length]);

//   return (
//     <>
      

//       <main className="bg-modura-off-white">

// <Breadcrumb title="Portfolio" />

//         {/* =====================================================
//             ONLY 2 TABS
//         ===================================================== */}


// <section className="bg-white">
//   <div className="flex justify-center px-5 py-16">

//     <div
//       className="
//         flex
//         w-full
//         max-w-[520px]
//         flex-col
//         gap-3
//         sm:flex-row
//       "
//     >

//       {[
//         {
//           key: "3D" as SampleType,
//           title: "3D & Site View Samples",
//         },
//         {
//           key: "2D" as SampleType,
//           title: "2D Drawings Samples",
//         },
//       ].map((tab) => {

//         const active =
//           activeTab === tab.key;

//         return (
//           <button
//             key={tab.key}
//             type="button"
//             onClick={() => changeTab(tab.key)}
//             className="
//               group
//               relative
//               flex
//               min-h-[66px]
//               flex-1
//               items-center
//               overflow-hidden
//               border
//               border-modura-gray-200
//               bg-modura-off-white
//               px-7
//               text-left
//               focus:outline-none
//             "
//           >

//             {/* =========================================
//                 HOVER / ACTIVE SLIDE
//             ========================================= */}

//             <span
//               className={`
//                 absolute
//                 inset-y-0
//                 left-0
//                 w-full
//                 origin-left
//                 bg-modura-primary
//                 transition-transform
//                 duration-700
//                 ease-[cubic-bezier(0.22,1,0.36,1)]
//                 ${
//                   active
//                     ? "scale-x-100"
//                     : "scale-x-0 group-hover:scale-x-100"
//                 }
//               `}
//             />


//             {/* =========================================
//                 CUSTOM TOP CORNER
//             ========================================= */}

//             <span
//               className={`
//                 absolute
//                 left-0
//                 top-0
//                 h-[7px]
//                 w-[38px]
//                 bg-modura-secondary
//                 transition-all
//                 duration-500
//                 ${
//                   active
//                     ? "w-[75px]"
//                     : "group-hover:w-[75px]"
//                 }
//               `}
//             />


//             {/* =========================================
//                 TITLE
//             ========================================= */}

//             <span
//               className={`
//                 relative
//                 z-10
//                 font-heading
//                 text-[17px]
//                 font-bold
//                 tracking-[-0.01em]
//                 transition-all
//                 duration-500
//                 ${
//                   active
//                     ? "translate-x-2 text-white"
//                     : "text-modura-primary group-hover:translate-x-2 group-hover:text-white"
//                 }
//               `}
//             >
//               {tab.title}
//             </span>


        


//             {/* =========================================
//                 BOTTOM ANIMATED LINE
//             ========================================= */}

//             <span
//               className={`
//                 absolute
//                 bottom-0
//                 left-0
//                 h-[2px]
//                 bg-modura-secondary
//                 transition-all
//                 duration-700
//                 ${
//                   active
//                     ? "w-full"
//                     : "w-0 group-hover:w-full"
//                 }
//               `}
//             />


//             {/* =========================================
//                 RIGHT EDGE DETAIL
//             ========================================= */}

//             <span
//               className="
//                 absolute
//                 bottom-0
//                 right-0
//                 h-3
//                 w-3
//                 translate-x-full
//                 translate-y-full
//                 rotate-45
//                 bg-modura-secondary
//                 transition-all
//                 duration-500
//                 group-hover:translate-x-1/2
//                 group-hover:translate-y-1/2
//               "
//             />

//           </button>
//         );
//       })}

//     </div>

//   </div>
// </section>


//         {/* =====================================================
//             IMAGE GALLERY
//         ===================================================== */}

//         <section
//           id="portfolio-gallery"
//           className="
//             scroll-mt-24
//             bg-modura-off-white
//           "
//         >

//           <div
//             className="
//               mx-auto
//               max-w-[1380px]
//               px-4
//               pb-20
//               pt-6
//               sm:px-7
//               lg:pt-8
//             "
//           >

//             {/* =================================================
//                 FIXED GRID
//             ================================================= */}

//             <div
//               className="
//                 grid
//                 grid-cols-1
//                 gap-5
//                 sm:grid-cols-2
//                 lg:grid-cols-3
//               "
//             >

//               {images.map((item, index) => (

//                 <button
//                   key={`${item.type}-${index}`}
//                   type="button"
//                   onClick={() =>
//                     openImage(index)
//                   }
//                   className="
//                     group
//                     relative
//                     h-[260px]
//                     w-full
//                     overflow-hidden
//                     bg-white
//                     text-left
//                     shadow-[0_5px_25px_rgba(6,19,34,0.07)]
//                     transition-all
//                     duration-500
//                     hover:-translate-y-1
//                     hover:shadow-[0_18px_40px_rgba(6,19,34,0.13)]
//                     focus:outline-none
//                     sm:h-[300px]
//                     lg:h-[320px]
//                   "
//                 >

//                   {/* =========================================
//                       IMAGE
//                   ========================================= */}

//                   <Image
//                     src={item.image}
//                     alt={`${activeTab} sample ${index + 1}`}
//                     fill
//                     sizes="
//                       (max-width: 640px) 100vw,
//                       (max-width: 1024px) 50vw,
//                       33vw
//                     "
//                     className="
//                       object-cover
//                       object-center
//                       transition-transform
//                       duration-700
//                       ease-out
//                       group-hover:scale-[1.06]
//                     "
//                   />


//                   {/* =========================================
//                       HOVER OVERLAY
//                   ========================================= */}

//                   <div
//                     className="
//                       absolute
//                       inset-0
//                       bg-modura-primary/0
//                       transition-all
//                       duration-500
//                       group-hover:bg-modura-primary/40
//                     "
//                   />


//                   {/* =========================================
//                       CREATIVE HOVER ICON
//                   ========================================= */}

//                   <span
//                     className="
//                       absolute
//                       left-1/2
//                       top-1/2
//                       flex
//                       h-16
//                       w-16
//                       -translate-x-1/2
//                       -translate-y-1/2
//                       scale-50
//                       items-center
//                       justify-center
//                       rounded-full
//                       border
//                       border-white
//                       bg-white/95
//                       text-modura-primary
//                       opacity-0
//                       shadow-xl
//                       transition-all
//                       duration-500
//                       group-hover:scale-100
//                       group-hover:opacity-100
//                     "
//                   >

//                     <FiPlus
//                       size={23}
//                       strokeWidth={1.5}
//                       className="
//                         transition-transform
//                         duration-500
//                         group-hover:rotate-90
//                       "
//                     />

//                   </span>


                 

//                 </button>

//               ))}

//             </div>

//           </div>

//         </section>

//       </main>


//       {/* =====================================================
//           LIGHTBOX
//       ===================================================== */}

//       {selected !== null && (
//         <div
//           className="
//             fixed
//             inset-0
//             z-[9999]
//             flex
//             items-center
//             justify-center
//             bg-modura-primary/95
//             p-4
//             backdrop-blur-md
//             sm:p-8
//           "
//           onClick={closeImage}
//         >

//           {/* ===============================================
//               CLOSE BUTTON
//           =============================================== */}

//           <button
//             type="button"
//             aria-label="Close gallery"
//             onClick={closeImage}
//             className="
//               absolute
//               right-5
//               top-5
//               z-30
//               flex
//               h-11
//               w-11
//               items-center
//               justify-center
//               rounded-full
//               bg-white
//               text-modura-primary
//               shadow-lg
//               transition-all
//               duration-300
//               hover:rotate-90
//               hover:bg-modura-secondary
//               hover:text-white
//             "
//           >
//             <FiX size={21} />
//           </button>


//           {/* ===============================================
//               PREVIOUS
//           =============================================== */}

//           <button
//             type="button"
//             aria-label="Previous image"
//             onClick={(event) => {
//               event.stopPropagation();
//               previousImage();
//             }}
//             className="
//               absolute
//               left-4
//               top-1/2
//               z-30
//               flex
//               h-12
//               w-12
//               -translate-y-1/2
//               items-center
//               justify-center
//               rounded-full
//               bg-white
//               text-modura-primary
//               shadow-lg
//               transition-all
//               duration-300
//               hover:bg-modura-secondary
//               hover:text-white
//               sm:left-8
//             "
//           >
//             <FiChevronLeft size={22} />
//           </button>


//           {/* ===============================================
//               NEXT
//           =============================================== */}

//           <button
//             type="button"
//             aria-label="Next image"
//             onClick={(event) => {
//               event.stopPropagation();
//               nextImage();
//             }}
//             className="
//               absolute
//               right-4
//               top-1/2
//               z-30
//               flex
//               h-12
//               w-12
//               -translate-y-1/2
//               items-center
//               justify-center
//               rounded-full
//               bg-white
//               text-modura-primary
//               shadow-lg
//               transition-all
//               duration-300
//               hover:bg-modura-secondary
//               hover:text-white
//               sm:right-8
//             "
//           >
//             <FiChevronRight size={22} />
//           </button>


//           {/* ===============================================
//               LARGE IMAGE
//           =============================================== */}

//           <div
//             className="
//               relative
//               h-[78vh]
//               w-full
//               max-w-[1200px]
//             "
//             onClick={(event) =>
//               event.stopPropagation()
//             }
//           >

//             <Image
//               src={images[selected].image}
//               alt={`${activeTab} sample`}
//               fill
//               sizes="95vw"
//               className="
//                 object-contain
//               "
//               priority
//             />

//           </div>


//           {/* ===============================================
//               COUNTER
//           =============================================== */}

//           <div
//             className="
//               absolute
//               bottom-5
//               left-1/2
//               -translate-x-1/2
//               rounded-full
//               bg-white/10
//               px-4
//               py-2
//               font-body
//               text-[9px]
//               font-semibold
//               uppercase
//               tracking-[0.18em]
//               text-white/80
//               backdrop-blur
//             "
//           >
//             {selected + 1} / {images.length}
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
import { apiUrl } from "../../config";


type TabKey = "2d" | "3d" | "other";
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
  // Update these two values when backend confirms the Other Work category/type.
  { key: "other", title: "Other Work", category: "other-work", type: "other" },
];

function imageUrl(image?: string | null) {
  if (!image) return "";
  return /^https?:\/\//i.test(image) ? image : `${apiUrl}/${image.replace(/^\/+/, "")}`;
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

function PortfolioCard({ item, onOpen }: { item: PortfolioItem; onOpen: (images: GalleryImage[], index: number) => void }) {
  const images = useMemo(() => galleryImages(item), [item]);
  const [active, setActive] = useState(0);
  const current = images[active];
  const hasMultiple = images.length > 1;

  const move = (direction: number) => {
    if (!images.length) return;
    setActive((currentIndex) => (currentIndex + direction + images.length) % images.length);
  };

  return (
    <article className="group overflow-hidden bg-white shadow-[0_5px_25px_rgba(6,19,34,0.07)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(6,19,34,0.13)]">
      <div className="relative h-[260px] overflow-hidden bg-modura-light sm:h-[300px] lg:h-[320px]">
        {current ? (
          <button type="button" onClick={() => onOpen(images, active)} aria-label={`Open ${item.title} gallery`} className="absolute inset-0 block w-full cursor-zoom-in text-left">
            <Image
              src={current.src}
              alt={`${item.title}${current.albumTitle ? ` - ${current.albumTitle}` : ""}`}
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
            <span className="pointer-events-none absolute inset-0 bg-modura-primary/0 transition-colors duration-500 group-hover:bg-modura-primary/30" />
            <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 scale-50 items-center justify-center rounded-full border border-white bg-white/95 text-modura-primary opacity-0 shadow-xl transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
              <FiPlus size={23} strokeWidth={1.5} />
            </span>
          </button>
        ) : (
          <div className="flex h-full items-center justify-center font-body text-sm text-modura-gray-500">No image available</div>
        )}

        {hasMultiple && (
          <>
            <button type="button" aria-label={`Previous ${item.title} image`} onClick={() => move(-1)} className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white/95 text-modura-primary shadow-md transition hover:bg-modura-secondary hover:text-white"><FiChevronLeft size={20} /></button>
            <button type="button" aria-label={`Next ${item.title} image`} onClick={() => move(1)} className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white/95 text-modura-primary shadow-md transition hover:bg-modura-secondary hover:text-white"><FiChevronRight size={20} /></button>
            <div className="absolute bottom-3 right-3 z-10 bg-modura-primary/85 px-3 py-1.5 font-body text-[11px] font-semibold text-white">{active + 1} / {images.length}</div>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="flex gap-2 overflow-x-auto px-3 pt-3 pb-1">
          {images.map((img, index) => (
            <button key={img.id} type="button" aria-label={`View thumbnail ${index + 1}`} onClick={() => setActive(index)} className={`relative h-[64px] w-[74px] shrink-0 overflow-hidden border-2 transition-opacity ${active === index ? "border-modura-secondary opacity-100" : "border-transparent opacity-55 hover:opacity-100"}`}>
              <Image src={img.src} alt={`${item.title} thumbnail ${index + 1}`} fill unoptimized sizes="74px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="px-5 pb-5 pt-4">
      
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

  useEffect(() => {
    const controller = new AbortController();
    async function fetchPortfolios() {
      setLoading(true);
      setError("");
      setItems([]);
      try {
        const response = await axios.post<PortfolioResponse>(
          `${apiUrl}/portfolios`,
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
            <div className="flex w-full max-w-[850px] flex-col gap-3 sm:flex-row">
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
          <div className="mx-auto max-w-[1380px] px-4 pb-20 pt-6 sm:px-7 lg:pt-8">
            {loading ? (
              <div className="flex min-h-[300px] items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-[3px] border-modura-gray-200 border-t-modura-secondary" /></div>
            ) : error ? (
              <div className="py-20 text-center font-body text-modura-primary" role="alert">{error}</div>
            ) : items.length === 0 ? (
              <div className="py-20 text-center font-body text-modura-gray-600">No portfolio projects available.</div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => <PortfolioCard key={item.id} item={item} onOpen={(images, index) => setLightbox({ images, index })} />)}
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
            {lightbox.images[lightbox.index].albumTitle && <span className="text-white/70">{lightbox.images[lightbox.index].albumTitle}</span>}
            <span className="text-white/80">{lightbox.index + 1} / {lightboxCount}</span>
          </div>
        </div>
      )}
    </>
  );
}