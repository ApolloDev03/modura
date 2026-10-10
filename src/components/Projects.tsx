// "use client";

// import Image from "next/image";

// import { Swiper, SwiperSlide } from "swiper/react";

// import { Autoplay, EffectCoverflow } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/effect-coverflow";

// import AnimatedButton from "./AnimatedButton";
// import { DraftingCompass } from "lucide-react";

// interface PortfolioImage {
//   id: number;
//   image: string;
//   imageUrl: string;
// }

// interface PortfolioAlbum {
//   id: number;
//   title: string;
//   images: PortfolioImage[];
// }

// interface Portfolio {
//   id: number;
//   title: string;
//   slug: string;
//   type: string;
//   imageType: string;
//   clientName: string;
//   images: PortfolioImage[];
//   albums: PortfolioAlbum[];
//   coverImage: string;
//   coverImageUrl: string;
// }

// interface ProjectsProps {
//   portfolios: Portfolio[];
// }

// export default function Projects({
//   portfolios,
// }: ProjectsProps) {
//   if (!portfolios || portfolios.length === 0) {
//     return null;
//   }

//   return (
//     <section className="w-full overflow-hidden bg-white py-12 sm:py-14 lg:py-16">
//       <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">

//         {/* =========================================
//             HEADER
//         ========================================= */}

//         <div className="mb-8 flex flex-col items-start gap-6 sm:mb-10 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">

//           {/* HEADING */}

//           <div className="w-full min-w-0 lg:w-auto">
//             <div className="flex items-center gap-2.5 font-body text-[10px] font-bold uppercase tracking-[2px] text-modura-secondary sm:gap-3 sm:text-xs sm:tracking-[4px] lg:tracking-[5px]">
//               <DraftingCompass
//                 size={20}
//                 strokeWidth={1.5}
//                 className="shrink-0 text-modura-secondary"
//               />

//               <span>Portfolio</span>
//             </div>

//             <h2 className="mt-4 font-heading text-[36px] font-semibold leading-[1.05] text-modura-primary min-[400px]:text-[42px] sm:text-5xl lg:text-6xl">
//               Our
//               <span className="ml-2 text-modura-secondary">
//                 Projects
//               </span>
//             </h2>
//           </div>

//           {/* BUTTON */}

//           <div className="hero-button flex w-full shrink-0 justify-start font-body sm:w-auto lg:justify-end">
//             <AnimatedButton
//               href="/portfolio"
//               title="View All Projects"
//             />
//           </div>
//         </div>

//         {/* =========================================
//             COVERFLOW SLIDER
//         ========================================= */}

//         <Swiper
//           modules={[Autoplay, EffectCoverflow]}
//           effect="coverflow"
//           centeredSlides={true}
//           slidesPerView="auto"
//           loop={portfolios.length > 2}
//           watchOverflow
//           grabCursor
//           speed={900}
//           autoplay={{
//             delay: 3000,
//             disableOnInteraction: false,
//             pauseOnMouseEnter: true,
//           }}
//           coverflowEffect={{
//             rotate: 0,
//             stretch: 0,
//             depth: 100,
//             modifier: 1,
//             slideShadows: false,
//           }}
//           breakpoints={{
//             640: {
//               coverflowEffect: {
//                 rotate: 0,
//                 stretch: 0,
//                 depth: 140,
//                 modifier: 1,
//                 slideShadows: false,
//               },
//             },
//             1024: {
//               coverflowEffect: {
//                 rotate: 0,
//                 stretch: 0,
//                 depth: 180,
//                 modifier: 1,
//                 slideShadows: false,
//               },
//             },
//           }}
//           className="projects-slider !overflow-visible"
//         >
//           {portfolios.map((item) => {
//             const projectImage =
//               item.coverImageUrl ||
//               item.coverImage ||
//               item.images?.[0]?.imageUrl ||
//               item.albums?.[0]?.images?.[0]?.imageUrl ||
//               "/images/placeholder.jpg";

//             return (
//               <SwiperSlide
//                 key={item.id}
//                 className="!w-[min(82vw,360px)] sm:!w-[360px] lg:!w-[430px]"
//               >
//                 <div className="project-card group relative h-[290px] cursor-pointer overflow-hidden sm:h-[330px] lg:h-[360px]">

//                   {/* PROJECT IMAGE */}

//                   <Image
//                     src={projectImage}
//                     alt={item.title}
//                     fill
//                     unoptimized
//                     sizes="(max-width: 639px) 82vw, (max-width: 1023px) 360px, 430px"
//                     className="object-cover transition-all duration-1000 group-hover:scale-110"
//                   />

//                   {/* OVERLAY */}

//                   <div className="absolute inset-0 bg-gradient-to-t from-modura-primary/90 via-modura-primary/20 to-transparent" />

//                   {/* CORNER DESIGN */}

//                   <div className="absolute right-4 top-4 h-9 w-9 border-r border-t border-white/50 transition-all duration-700 group-hover:h-16 group-hover:w-16 sm:right-5 sm:top-5 sm:h-12 sm:w-12 lg:group-hover:h-20 lg:group-hover:w-20" />

//                   {/* PROJECT CONTENT */}

//                   <div className="absolute bottom-4 left-4 right-4 translate-y-0 bg-white p-4 transition-all duration-700 sm:bottom-5 sm:left-5 sm:right-5 sm:p-5 lg:translate-y-8 lg:group-hover:translate-y-0">

//                     <div className="flex items-center justify-between gap-3">
//                       <p className="min-w-0 truncate font-body text-[9px] uppercase tracking-[2px] text-modura-secondary sm:text-[10px] sm:tracking-[3px] lg:tracking-[4px]">
//                         {item.clientName || item.type}
//                       </p>

//                       <span className="h-px w-6 shrink-0 bg-modura-secondary sm:w-8" />
//                     </div>

//                     <h3 className="mt-2 break-words font-heading text-[21px] font-semibold leading-[1.1] text-modura-primary sm:mt-3 sm:text-2xl lg:text-3xl">
//                       {item.title}
//                     </h3>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             );
//           })}
//         </Swiper>
//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { DraftingCompass, ChevronLeft, ChevronRight, X } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-coverflow";

interface PortfolioImage {
  id: number;
  image: string;
  imageUrl: string;
}

interface PortfolioAlbum {
  id: number;
  title: string;
  images: PortfolioImage[];
}

interface Portfolio {
  id: number;
  title: string;
  slug: string;
  type: string;
  imageType: string;
  clientName: string;
  images: PortfolioImage[];
  albums: PortfolioAlbum[];
  coverImage: string;
  coverImageUrl: string;
}

interface ProjectsProps {
  portfolios: Portfolio[];
}

function getProjectImage(item: Portfolio): string {
  return (
    item.coverImageUrl ||
    item.coverImage ||
    item.images?.[0]?.imageUrl ||
    item.images?.[0]?.image ||
    item.albums?.[0]?.images?.[0]?.imageUrl ||
    item.albums?.[0]?.images?.[0]?.image ||
    "/images/placeholder.jpg"
  );
}

export default function Projects({ portfolios }: ProjectsProps) {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const isPopupOpen = activeProjectIndex !== null;
  const activeProject =
    activeProjectIndex !== null ? portfolios?.[activeProjectIndex] : undefined;

  const closePopup = () => setActiveProjectIndex(null);
  const nextProject = () =>
    setActiveProjectIndex((index) =>
      index === null ? null : (index + 1) % portfolios.length
    );
  const previousProject = () =>
    setActiveProjectIndex((index) =>
      index === null ? null : (index - 1 + portfolios.length) % portfolios.length
    );

  useEffect(() => {
    if (!isPopupOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopup();
      if (event.key === "ArrowRight") nextProject();
      if (event.key === "ArrowLeft") previousProject();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isPopupOpen, portfolios.length]);

  if (!portfolios || portfolios.length === 0) return null;

  return (
    <>
      <section className="w-full overflow-hidden bg-white pb-12 sm:pb-14 lg:pb-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
          {/* HEADING — View All Projects button removed */}
          <div className="mb-8 sm:mb-10 lg:mb-14">
            <div className="flex items-center gap-2.5 font-body text-[10px] font-bold uppercase tracking-[2px] text-modura-secondary sm:gap-3 sm:text-xs sm:tracking-[4px] lg:tracking-[5px]">
              <DraftingCompass
                size={20}
                strokeWidth={1.5}
                className="shrink-0 text-modura-secondary"
              />
              <span>Portfolio</span>
            </div>
            <h2 className="mt-4 font-heading text-[36px] font-semibold leading-[1.05] text-modura-primary min-[400px]:text-[42px] sm:text-5xl lg:text-6xl">
              Our <span className="text-modura-secondary">Projects</span>
            </h2>
          </div>

          {/* ORIGINAL COVERFLOW SLIDER */}
          <Swiper
            modules={[Autoplay, EffectCoverflow]}
            effect="coverflow"
            centeredSlides
            slidesPerView="auto"
            loop={portfolios.length > 2}
            watchOverflow
            grabCursor
            speed={900}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            breakpoints={{
              640: {
                coverflowEffect: {
                  rotate: 0,
                  stretch: 0,
                  depth: 140,
                  modifier: 1,
                  slideShadows: false,
                },
              },
              1024: {
                coverflowEffect: {
                  rotate: 0,
                  stretch: 0,
                  depth: 180,
                  modifier: 1,
                  slideShadows: false,
                },
              },
            }}
            className="projects-slider !overflow-visible"
          >
            {portfolios.map((item, index) => {
              const projectImage = getProjectImage(item);
              return (
                <SwiperSlide
                  key={item.id}
                  className="!w-[min(82vw,360px)] sm:!w-[360px] lg:!w-[430px]"
                >
                  <button
                    type="button"
                    onClick={() => setActiveProjectIndex(index)}
                    aria-label={`Open ${item.title} project`}
                    className="project-card group relative block h-[290px] w-full cursor-pointer overflow-hidden text-left transition-[transform] duration-300 sm:h-[330px] lg:h-[360px]"
                  >
                    <Image
                      src={projectImage}
                      alt={item.title}
                      fill
                      unoptimized
                      sizes="(max-width: 639px) 82vw, (max-width: 1023px) 360px, 430px"
                      className="object-cover transition-all duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-modura-primary/90 via-modura-primary/20 to-transparent" />
                    <div className="absolute right-4 top-4 h-9 w-9 border-r border-t border-white/50 transition-all duration-700 group-hover:h-16 group-hover:w-16 sm:right-5 sm:top-5 sm:h-12 sm:w-12 lg:group-hover:h-20 lg:group-hover:w-20" />
                    <div className="absolute bottom-4 left-4 right-4 translate-y-0 bg-white p-4 transition-all duration-700 sm:bottom-5 sm:left-5 sm:right-5 sm:p-5 lg:translate-y-8 lg:group-hover:translate-y-0">
                      <div className="flex items-center justify-between gap-3">
                        <p className="min-w-0 truncate font-body text-[9px] uppercase tracking-[2px] text-modura-secondary sm:text-[10px] sm:tracking-[3px] lg:tracking-[4px]">
                          {item.clientName || item.type}
                        </p>
                        <span className="h-px w-6 shrink-0 bg-modura-secondary sm:w-8" />
                      </div>
                      <h3 className="mt-2 break-words font-heading text-[21px] font-semibold leading-[1.1] text-modura-primary sm:mt-3 sm:text-2xl lg:text-3xl">
                        {item.title}
                      </h3>
                    </div>
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>

      {/* PROJECT POPUP: NEXT/PREV NAVIGATES PROJECTS, NOT ALBUM IMAGES */}
      {activeProject && activeProjectIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProject.title} project preview`}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#071522]/95 px-3 py-16 backdrop-blur-md sm:px-6"
          onClick={closePopup}
        >
          <button
            type="button"
            onClick={closePopup}
            aria-label="Close project preview"
            className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center border border-white/25 bg-white/10 text-white transition-colors hover:bg-modura-secondary sm:right-7 sm:top-6"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); previousProject(); }}
            aria-label="Previous project"
            className="absolute bottom-5 left-[calc(50%-76px)] z-30 flex h-12 w-12 items-center justify-center border border-white/30 bg-white/10 text-white transition-colors hover:bg-modura-secondary sm:bottom-auto sm:left-5 lg:left-10"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            className="relative flex max-h-[85dvh] w-full max-w-6xl flex-col overflow-hidden bg-modura-primary shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }}
            onTouchEnd={(event) => {
              if (touchStartX.current === null) return;
              const difference = event.changedTouches[0]?.clientX - touchStartX.current;
              touchStartX.current = null;
              if (difference === undefined || Math.abs(difference) < 55) return;
              if (difference < 0) nextProject();
              else previousProject();
            }}
          >
            <div className="relative min-h-0 w-full flex-1 aspect-[4/3] max-h-[65dvh] bg-black sm:aspect-[16/9]">
              <Image
                key={activeProject.id}
                src={getProjectImage(activeProject)}
                alt={activeProject.title}
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 1152px"
                className="object-contain"
              />
            </div>
            <div className="flex shrink-0 items-center justify-between gap-4 border-t border-white/15 bg-modura-primary px-4 py-4 text-white sm:px-7 sm:py-5">
              <div className="min-w-0">
                <p className="font-body text-[10px] font-semibold uppercase tracking-[2px] text-modura-secondary">
                  {activeProject.clientName || activeProject.type || "Portfolio"}
                </p>
                <h3 className="mt-1 break-words font-heading text-lg font-semibold sm:text-2xl">
                  {activeProject.title}
                </h3>
              </div>
              <span className="shrink-0 font-body text-xs text-white/70 sm:text-sm">
                {activeProjectIndex + 1} / {portfolios.length}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); nextProject(); }}
            aria-label="Next project"
            className="absolute bottom-5 right-[calc(50%-76px)] z-30 flex h-12 w-12 items-center justify-center border border-white/30 bg-white/10 text-white transition-colors hover:bg-modura-secondary sm:bottom-auto sm:right-5 lg:right-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </>
  );
}