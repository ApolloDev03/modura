// "use client";

// import Image from "next/image";
// import Link from "next/link";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";

// import "swiper/css";

// import AnimatedButton from "./AnimatedButton";
// import { DraftingCompass } from "lucide-react";

// interface Service {
//   id: number;
//   title: string;
//   slug: string;
//   shortDescription: string;
//   image: string;
//   imageUrl: string;
// }

// interface ServicesProps {
//   services: Service[];
// }

// export default function Services({
//   services,
// }: ServicesProps) {
//   return (
//     <section
//       className="
//         overflow-hidden
//         bg-modura-off-white
//         py-16
//       "
//     >
//       <div
//         className="
//           mx-auto
//           max-w-7xl
//           px-6
//           lg:px-10
//         "
//       >
//         {/* Heading */}

//         <div
//           className="
//             mb-12
//             flex
//             items-end
//             justify-between
//             gap-5
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
//                 font-semibold
//                 uppercase
//                 tracking-[5px]
//                 text-modura-secondary
//               "
//             >
//               <DraftingCompass
//                 size={20}
//                 strokeWidth={1.5}
//                 className="text-modura-secondary"
//               />

//               <span>Our Expertise</span>
//             </div>

//             <h2
//               className="
//                 mt-4
//                 font-heading
//                 text-5xl
//                 font-semibold
//                 text-modura-primary
//                 lg:text-6xl
//               "
//             >
//               <span>Our</span>

//               <span
//                 className="
//                   ml-2
//                   text-modura-secondary
//                 "
//               >
//                 Services
//               </span>
//             </h2>
//           </div>

//           {/* Button */}

//           <div className="hero-button w-fit">
//             <AnimatedButton
//               href="/services"
//               title="View All Services"
//             />
//           </div>
//         </div>

//         {/* Slider */}

//         <Swiper
//           modules={[Autoplay]}
//           spaceBetween={30}
//           slidesPerView={1}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: false,
//           }}
//           speed={900}
//           loop={services.length > 4}
//           breakpoints={{
//             640: {
//               slidesPerView: 2,
//             },
//             1024: {
//               slidesPerView: 3,
//             },
//             1280: {
//               slidesPerView: 4,
//             },
//           }}
//         >
//           {services.map((item) => (
//             <SwiperSlide key={item.id}>
//               <Link
//                 href="/services"
//                 className="
//                   block
//                   cursor-pointer
//                   no-underline
//                 "
//               >
//                 <div
//                   className="
//                     service-card
//                     group
//                     relative
//                     h-[360px]
//                     overflow-hidden
//                     transition-all
//                     duration-700
//                     hover:-translate-y-3
//                   "
//                 >
//                   {/* Image */}

//                   <Image
//                     src={item.imageUrl}
//                     alt={item.title}
//                     fill
//                     className="
//                       object-cover
//                       transition-transform
//                       duration-[1200ms]
//                       ease-out
//                       group-hover:scale-110
//                     "
//                   />

//                   {/* Overlay */}

//                   <div
//                     className="
//                       absolute
//                       inset-0
//                       bg-gradient-to-t
//                       from-modura-primary/90
//                       via-modura-primary/20
//                       to-transparent
//                       transition
//                       duration-700
//                       group-hover:from-modura-primary
//                     "
//                   />

//                   {/* Content */}

//                   <div
//                     className="
//                       absolute
//                       bottom-0
//                       left-0
//                       p-7
//                       transition-all
//                       duration-700
//                       group-hover:-translate-y-2
//                     "
//                   >
//                     <h3
//                       className="
//                         font-heading
//                         text-2xl
//                         text-white
//                       "
//                     >
//                       {item.title}
//                     </h3>

//                     <div
//                       className="
//                         mt-3
//                         h-[2px]
//                         w-10
//                         bg-modura-secondary
//                         transition-all
//                         duration-500
//                         group-hover:w-20
//                       "
//                     />
//                   </div>
//                 </div>
//               </Link>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// }


"use client";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import AnimatedButton from "./AnimatedButton";
import { DraftingCompass } from "lucide-react";

interface Service {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  image: string;
  imageUrl: string;
}

interface ServicesProps {
  services: Service[];
}

export default function Services({ services }: ServicesProps) {
  if (!services || services.length === 0) return null;

  return (
    <section className="w-full overflow-hidden bg-modura-off-white py-12 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-full px-4
    md:px-6
    lg:grid-cols-2
    lg:gap-12
    lg:px-10
    xl:gap-16
    2xl:px-16">

        {/* HEADING + BUTTON */}

        <div className="mb-8 flex flex-col items-start gap-6 sm:mb-10 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">

          {/* HEADING */}
          <div className="min-w-0 w-full lg:w-auto">
            <div className="flex items-center gap-2.5 font-body text-[10px] font-semibold uppercase tracking-[2px] text-modura-secondary sm:gap-3 sm:text-xs sm:tracking-[4px] lg:tracking-[5px]">
              <DraftingCompass
                size={20}
                strokeWidth={1.5}
                className="shrink-0 text-modura-secondary"
              />

              <span>Our Expertise</span>
            </div>

            <h2 className="mt-4 font-heading text-[36px] font-semibold leading-[1.05] text-modura-primary min-[400px]:text-[42px] sm:text-5xl lg:text-6xl">
              <span>Our</span>

              <span className="ml-2 text-modura-secondary">
                Services
              </span>
            </h2>
          </div>

          {/* BUTTON */}
          <div className="hero-button flex w-full shrink-0 justify-start sm:w-auto lg:justify-end">
            <AnimatedButton
              href="/services"
              title="View All Services"
            />
          </div>
        </div>

        {/* SERVICES SLIDER */}

        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={900}
          loop={services.length > 4}
          watchOverflow
          observer
          observeParents
          breakpoints={{
            480: {
              slidesPerView: 1.25,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className="w-full"
        >
          {services.map((item) => (
            <SwiperSlide key={item.id} className="!h-auto">
              <Link
                href="/services"
                className="block h-full cursor-pointer no-underline"
              >
                <div className="service-card group relative h-[300px] w-full overflow-hidden transition-all duration-700 hover:-translate-y-1 sm:h-[320px] md:h-[340px] lg:h-[360px] lg:hover:-translate-y-2">

                  {/* IMAGE */}

                  <Image
                    src={item.imageUrl || item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 479px) 100vw, (max-width: 639px) 80vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />

                  {/* OVERLAY */}

                  <div className="absolute inset-0 bg-gradient-to-t from-modura-primary/90 via-modura-primary/20 to-transparent transition duration-700 group-hover:from-modura-primary" />

                  {/* CONTENT */}

                  <div className="absolute bottom-0 left-0 right-0 p-5 transition-all duration-700 group-hover:-translate-y-2 sm:p-6 lg:p-7">
                    <h3 className="break-words font-heading text-[20px] font-semibold leading-[1.15] text-white sm:text-[22px] lg:text-2xl">
                      {item.title}
                    </h3>

                    <div className="mt-3 h-[2px] w-10 bg-modura-secondary transition-all duration-500 group-hover:w-20" />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
