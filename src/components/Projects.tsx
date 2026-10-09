// "use client";

// import Image from "next/image";

// import {
//   Swiper,
//   SwiperSlide,
// } from "swiper/react";

// import {
//   Autoplay,
//   EffectCoverflow,
// } from "swiper/modules";

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
//   return (
//     <section
//       className="
//         bg-white
//         py-16
//         overflow-hidden
//       "
//     >
//       <div
//         className="
//           max-w-7xl
//           mx-auto
//           px-6
//           lg:px-10
//         "
//       >
//         {/* Header */}

//         <div
//           className="
//             flex
//             justify-between
//             items-end
//             mb-14
//           "
//         >
//           <div>

//             <div
//               className="
//                 flex
//                 items-center
//                 gap-3
//                 font-body
//                 text-xs
//                 uppercase
//                 font-bold
//                 tracking-[5px]
//                 text-modura-secondary
//               "
//             >
//               <DraftingCompass
//                 size={20}
//                 strokeWidth={1.5}
//                 className="
//                   text-modura-secondary
//                 "
//               />

//               <span>
//                 Portfolio
//               </span>
//             </div>

//             <h2
//               className="
//                 mt-4
//                 font-heading
//                 text-5xl
//                 lg:text-6xl
//                 font-semibold
//                 text-modura-primary
//               "
//             >
//               Our

//               <span
//                 className="
//                   font-heading
//                   text-modura-secondary
//                   ml-2
//                 "
//               >
//                 Projects
//               </span>
//             </h2>

//           </div>

//           <div className="font-body">

//             <AnimatedButton
//               href="/portfolio"
//               title="View All Projects"
//             />

//           </div>
//         </div>

//         {/* Slider */}

//         <Swiper
//           modules={[
//             Autoplay,
//             EffectCoverflow,
//           ]}
//           effect="coverflow"
//           centeredSlides={true}
//           slidesPerView="auto"
//           loop={portfolios.length > 1}
//           speed={1000}
//           autoplay={{
//             delay: 3000,
//             disableOnInteraction: false,
//           }}
//           coverflowEffect={{
//             rotate: 0,
//             stretch: 0,
//             depth: 180,
//             modifier: 1,
//             slideShadows: false,
//           }}
//           className="projects-slider"
//         >

//           {portfolios.map((item) => (

//             <SwiperSlide
//               key={item.id}
//               className="
//                 !w-[360px]
//                 lg:!w-[430px]
//               "
//             >

//               <div
//                 className="
//                   project-card
//                   group
//                   relative
//                   h-[360px]
//                   overflow-hidden
//                   cursor-pointer
//                 "
//               >

//                 {/* Project Image */}

//                 <Image
//                   src={
//                     item.coverImageUrl ||
//                     item.coverImage ||
//                     "/images/placeholder.jpg"
//                   }
//                   alt={item.title}
//                   fill
//                   className="
//                     object-cover
//                     transition-all
//                     duration-1000
//                     group-hover:scale-110
//                   "
//                 />

//                 {/* Overlay */}

//                 <div
//                   className="
//                     absolute
//                     inset-0
//                     bg-gradient-to-t
//                     from-modura-primary/90
//                     via-modura-primary/20
//                     to-transparent
//                   "
//                 />

//                 {/* Corner Design */}

//                 <div
//                   className="
//                     absolute
//                     top-5
//                     right-5
//                     h-12
//                     w-12
//                     border-t
//                     border-r
//                     border-white/50
//                     group-hover:w-20
//                     group-hover:h-20
//                     transition-all
//                     duration-700
//                   "
//                 />

//                 {/* Content */}

//                 <div
//                   className="
//                     absolute
//                     bottom-5
//                     left-5
//                     right-5
//                     bg-white
//                     p-5
//                     translate-y-8
//                     transition-all
//                     duration-700
//                     group-hover:translate-y-0
//                   "
//                 >

//                   <div
//                     className="
//                       flex
//                       items-center
//                       justify-between
//                     "
//                   >

//                     <p
//                       className="
//                         font-body
//                         text-[10px]
//                         uppercase
//                         tracking-[4px]
//                         text-modura-secondary
//                       "
//                     >
//                       {item.clientName ||
//                         item.type}
//                     </p>

//                     <span
//                       className="
//                         h-[1px]
//                         w-8
//                         bg-modura-secondary
//                       "
//                     />

//                   </div>

//                   <h3
//                     className="
//                       mt-3
//                       font-heading
//                       text-3xl
//                       font-semibold
//                       text-modura-primary
//                     "
//                   >
//                     {item.title}
//                   </h3>

//                 </div>

//               </div>

//             </SwiperSlide>

//           ))}

//         </Swiper>

//       </div>
//     </section>
//   );
// }

"use client";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

import AnimatedButton from "./AnimatedButton";
import { DraftingCompass } from "lucide-react";

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

export default function Projects({
  portfolios,
}: ProjectsProps) {
  if (!portfolios || portfolios.length === 0) {
    return null;
  }

  return (
    <section className="w-full overflow-hidden bg-white py-12 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="mb-8 flex flex-col items-start gap-6 sm:mb-10 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">

          {/* HEADING */}

          <div className="w-full min-w-0 lg:w-auto">
            <div className="flex items-center gap-2.5 font-body text-[10px] font-bold uppercase tracking-[2px] text-modura-secondary sm:gap-3 sm:text-xs sm:tracking-[4px] lg:tracking-[5px]">
              <DraftingCompass
                size={20}
                strokeWidth={1.5}
                className="shrink-0 text-modura-secondary"
              />

              <span>Portfolio</span>
            </div>

            <h2 className="mt-4 font-heading text-[36px] font-semibold leading-[1.05] text-modura-primary min-[400px]:text-[42px] sm:text-5xl lg:text-6xl">
              Our
              <span className="ml-2 text-modura-secondary">
                Projects
              </span>
            </h2>
          </div>

          {/* BUTTON */}

          <div className="hero-button flex w-full shrink-0 justify-start font-body sm:w-auto lg:justify-end">
            <AnimatedButton
              href="/portfolio"
              title="View All Projects"
            />
          </div>
        </div>

        {/* =========================================
            COVERFLOW SLIDER
        ========================================= */}

        <Swiper
          modules={[Autoplay, EffectCoverflow]}
          effect="coverflow"
          centeredSlides={true}
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
          {portfolios.map((item) => {
            const projectImage =
              item.coverImageUrl ||
              item.coverImage ||
              item.images?.[0]?.imageUrl ||
              item.albums?.[0]?.images?.[0]?.imageUrl ||
              "/images/placeholder.jpg";

            return (
              <SwiperSlide
                key={item.id}
                className="!w-[min(82vw,360px)] sm:!w-[360px] lg:!w-[430px]"
              >
                <div className="project-card group relative h-[290px] cursor-pointer overflow-hidden sm:h-[330px] lg:h-[360px]">

                  {/* PROJECT IMAGE */}

                  <Image
                    src={projectImage}
                    alt={item.title}
                    fill
                    unoptimized
                    sizes="(max-width: 639px) 82vw, (max-width: 1023px) 360px, 430px"
                    className="object-cover transition-all duration-1000 group-hover:scale-110"
                  />

                  {/* OVERLAY */}

                  <div className="absolute inset-0 bg-gradient-to-t from-modura-primary/90 via-modura-primary/20 to-transparent" />

                  {/* CORNER DESIGN */}

                  <div className="absolute right-4 top-4 h-9 w-9 border-r border-t border-white/50 transition-all duration-700 group-hover:h-16 group-hover:w-16 sm:right-5 sm:top-5 sm:h-12 sm:w-12 lg:group-hover:h-20 lg:group-hover:w-20" />

                  {/* PROJECT CONTENT */}

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
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
