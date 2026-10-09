// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { ChevronRight, Compass } from "lucide-react";

// import breadcrumbBg from "../app/(website)/assets/images/Breadcrumb.jpeg";

// interface BreadcrumbProps {
//   title: string;
//   parent?: string;
//   parentHref?: string;
// }

// export default function Breadcrumb({
//   title,
//   parent,
//   parentHref = "#",
// }: BreadcrumbProps) {
//   return (
//     <section
//       className="
//         relative
//         min-h-[360px]
//         overflow-hidden
//         bg-white
//       "
//     >
//       {/* ================================================
//           BACKGROUND IMAGE
//       ================================================= */}

//       <div className="absolute inset-0">

//         <Image
//           src={breadcrumbBg}
//           alt=""
//           fill
//           priority
//           sizes="100vw"
//           className="
//             object-cover
//             object-center
//           "
//         />

   

//       </div>


  


//       {/* ================================================
//           MAIN CONTENT
//       ================================================= */}

//       <div
//         className="
//           relative
//           z-10
//           mx-auto
//           flex
//           min-h-[360px]
//           max-w-7xl
//           items-center
//           px-6
//           py-16
//           lg:px-10
//         "
//       >

//         <div className="w-full">

//           {/* Small Label */}

//           <div
//             className="
//               flex
//               items-center
//               gap-4
//               font-body
//               text-[10px]
//               font-bold
//               uppercase
//               tracking-[4px]
//               text-modura-secondary
//             "
//           >

//             <span
//               className="
//                 h-[2px]
//                 w-14
//                 bg-modura-secondary
//               "
//             />

//             <span>
//               Architecture / Engineering
//             </span>

//           </div>


//           {/* ==========================================
//               TITLE
//           ========================================== */}

//           <h1
//             className="
//               mt-6
//               max-w-3xl
//               font-heading
//               text-5xl
//               font-semibold
//               leading-[0.88]
//               text-modura-primary
//               sm:text-6xl
//               lg:text-8xl
//             "
//           >
//             {title}
//           </h1>


//           {/* ==========================================
//               CUSTOM BREADCRUMB
//           ========================================== */}

//           <div
//             className="
//               mt-8
//               flex
//               flex-wrap
//               items-center
//             "
//           >

//             {/* HOME */}
// <Link
//   href="/"
//   className="
//     home-breadcrumb group
//     relative
//     flex
//     h-11
//     items-center
//     overflow-hidden
//     bg-modura-primary
//     px-7
//     font-body
//     text-[11px]
//     font-semibold
//     uppercase
//     tracking-[2px]
//     text-white
//     clip-breadcrumb-home
//   "
// >
//   {/* Architectural hover frame */}

//   <span
//     className="
//       pointer-events-none
//       absolute
//       inset-[4px]
//       z-0
//       border
//       border-white/20
//       opacity-0
//       transition-all
//       duration-500
//       group-hover:inset-[7px]
//       group-hover:opacity-100
//     "
//   />

//   {/* Left orange marker */}

//   <span
//     className="
//       absolute
//       left-0
//       top-0
//       z-10
//       h-full
//       w-[3px]
//       origin-bottom
//       scale-y-0
//       bg-modura-secondary
//       transition-transform
//       duration-500
//       ease-out
//       group-hover:scale-y-100
//     "
//   />

//   {/* Home text */}

//   <span
//     className="
//       relative
//       z-20
//       transition-all
//       duration-500
//       font-semibold
//       text-lg
//       font-heading
//       group-hover:-translate-x-2
//       group-hover:text-modura-secondary
//     "
//   >
//     Home
//   </span>


//   {/* Small blueprint arrow */}

//   <span
//     className="
//       relative
//       z-20
//       ml-3
//       flex
//       h-6
//       w-6
//       items-center
//       justify-center
//       border
//       border-white/30
//       transition-all
//       duration-500
//       group-hover:translate-x-2
//       group-hover:border-modura-secondary
//       group-hover:bg-modura-secondary
//       group-hover:text-white
//     "
//   >
//     <ChevronRight
//       size={13}
//       strokeWidth={1.5}
//     />
//   </span>


//   {/* Top measuring line */}

//   <span
//     className="
//       absolute
//       right-5
//       top-0
//       z-20
//       h-[2px]
//       w-0
//       bg-modura-secondary
//       transition-all
//       duration-500
//       group-hover:w-10
//     "
//   />

// </Link>


//             {/* Arrow Block */}

//             <div
//               className="
//                 flex
//                 h-11
//                 w-10
//                 items-center
//                 justify-center
//                 bg-modura-secondary
//                 text-white
//                 clip-breadcrumb-arrow
//               "
//             >
//               <ChevronRight
//                 size={15}
//                 strokeWidth={1.5}
//               />
//             </div>


//             {/* Parent */}

//             {parent && (
//               <>
//                 <Link
//                   href={parentHref}
//                   className="
//                     flex
//                     h-11
//                     items-center
//                     bg-white
//                     px-5
//                     font-heading
//                     text-lg
//                     font-semibold
//                     uppercase
//                     tracking-[2px]
//                     text-modura-gray-600
//                     shadow-sm
//                     transition-all
//                     duration-300
//                     hover:text-modura-secondary
//                     clip-breadcrumb-parent
//                   "
//                 >
//                   {parent}
//                 </Link>

//                 <div
//                   className="
//                     flex
//                     h-14
//                     w-14
//                     items-center
//                     justify-center
//                     font-semibold
                    
//                     bg-modura-gray-200
//                     text-modura-secondary
//                     clip-breadcrumb-arrow
//                   "
//                 >
//                   <ChevronRight
//                     size={18}
//                     strokeWidth={1.5}
//                   />
//                 </div>
//               </>
//             )}


//             {/* Current */}

//             <div
//               className="
//                 flex
//                 h-11
//                 items-center
//                 bg-modura-secondary
//                 px-6
//              font-heading
//                     text-lg
//                 font-bold
//                 uppercase
//                 tracking-[2px]
//                 text-white
//                 shadow-sm
//                 clip-breadcrumb-current
//               "
//             >
//               {title}
//             </div>

//           </div>


//           {/* ==========================================
//               UNIQUE ARCHITECTURAL MARKER
//           ========================================== */}

//           <div
//             className="
//               mt-9
//               flex
//               items-center
//               gap-3
//             "
//           >

//             {/* Compass */}

//             <div
//               className="
//                 flex
//                 h-8
//                 w-8
//                 items-center
//                 justify-center
//                 bg-modura-primary
//                 text-white
//                 clip-breadcrumb-icon
//               "
//             >
//               <Compass
//                 size={15}
//                 strokeWidth={1.5}
//               />
//             </div>


//             {/* Steps */}

//             <div
//               className="
//                 h-[2px]
//                 w-10
//                 bg-modura-primary/20
//               "
//             />

//             <div
//               className="
//                 h-[6px]
//                 w-5
//                 bg-modura-secondary
//               "
//             />

//             <div
//               className="
//                 h-[2px]
//                 w-14
//                 bg-modura-secondary
//               "
//             />

//             <div
//               className="
//                 h-[6px]
//                 w-3
//                 bg-modura-primary
//               "
//             />

//             <span
//               className="
//                 ml-2
//                 font-body
//                 text-[10px]
//                 font-semibold
//                 uppercase
//                 tracking-[3px]
//                 text-modura-black
//               "
//             >
//               Built With Precision
//             </span>

//           </div>

//         </div>


     

//       </div>


//     </section>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Compass } from "lucide-react";
import breadcrumbBg from "../app/(website)/assets/images/Breadcrumb.jpeg";

interface BreadcrumbProps {
  title: string;
  parent?: string;
  parentHref?: string;
}

export default function Breadcrumb({
  title,
  parent,
  parentHref = "#",
}: BreadcrumbProps) {
  return (
    <section className="relative min-h-[240px] overflow-hidden bg-white sm:min-h-[290px] lg:min-h-[360px]">
      {/* BACKGROUND - original image and visual style */}
      <div className="absolute inset-0">
        <Image
          src={breadcrumbBg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[240px] w-full max-w-full items-center px-4 py-9 sm:min-h-[290px] sm:py-12 md:px-6 lg:min-h-[360px] lg:px-10 lg:py-16 2xl:px-16">
        <div className="w-full min-w-0">
          {/* SMALL LABEL */}
          <div className="flex min-w-0 items-center gap-2 font-body text-[9px] font-bold uppercase tracking-[1.5px] text-modura-secondary sm:gap-4 sm:text-[10px] sm:tracking-[4px]">
            <span className="h-[2px] w-8 shrink-0 bg-modura-secondary sm:w-14" />
            <span className="break-words">Architecture / Engineering</span>
          </div>

          {/* TITLE */}
          <h1 className="mt-4 max-w-3xl break-words font-heading text-[clamp(32px,8vw,48px)] font-semibold leading-[1.05] text-modura-primary sm:mt-6 sm:text-6xl sm:leading-[0.95] lg:text-8xl lg:leading-[0.88] [overflow-wrap:anywhere]">
            {title}
          </h1>

          {/* CUSTOM BREADCRUMB - original shapes and colors */}
          <nav aria-label="Breadcrumb" className="mt-5 flex min-w-0 flex-wrap items-center gap-y-2 sm:mt-8">
            <Link
              href="/"
              className="home-breadcrumb group relative flex h-10 shrink-0 items-center overflow-hidden bg-modura-primary px-4 font-body text-[10px] font-semibold uppercase tracking-[1px] text-white clip-breadcrumb-home sm:h-11 sm:px-7 sm:text-[11px] sm:tracking-[2px]"
            >
              <span className="pointer-events-none absolute inset-[4px] z-0 border border-white/20 opacity-0 transition-all duration-500 group-hover:inset-[7px] group-hover:opacity-100" />
              <span className="absolute left-0 top-0 z-10 h-full w-[3px] origin-bottom scale-y-0 bg-modura-secondary transition-transform duration-500 ease-out group-hover:scale-y-100" />
              <span className="relative z-20 font-heading text-sm font-semibold transition-all duration-500 group-hover:-translate-x-1 group-hover:text-modura-secondary sm:text-lg sm:group-hover:-translate-x-2">
                Home
              </span>
              <span className="relative z-20 ml-2 flex h-5 w-5 items-center justify-center border border-white/30 transition-all duration-500 group-hover:translate-x-1 group-hover:border-modura-secondary group-hover:bg-modura-secondary group-hover:text-white sm:ml-3 sm:h-6 sm:w-6 sm:group-hover:translate-x-2">
                <ChevronRight size={13} strokeWidth={1.5} />
              </span>
              <span className="absolute right-5 top-0 z-20 h-[2px] w-0 bg-modura-secondary transition-all duration-500 group-hover:w-10" />
            </Link>

            <div aria-hidden="true" className="flex h-10 w-7 shrink-0 items-center justify-center bg-modura-secondary text-white clip-breadcrumb-arrow sm:h-11 sm:w-10">
              <ChevronRight size={15} strokeWidth={1.5} />
            </div>

            {parent && (
              <>
                <Link
                  href={parentHref}
                  className="flex min-h-10 max-w-full items-center break-words bg-white px-3 font-heading text-sm font-semibold uppercase tracking-[1px] text-modura-gray-600 shadow-sm transition-all duration-300 hover:text-modura-secondary clip-breadcrumb-parent sm:min-h-11 sm:px-5 sm:text-lg sm:tracking-[2px] [overflow-wrap:anywhere]"
                >
                  {parent}
                </Link>
                <div aria-hidden="true" className="flex h-10 w-7 shrink-0 items-center justify-center bg-modura-gray-200 font-semibold text-modura-secondary clip-breadcrumb-arrow sm:h-11 sm:w-10">
                  <ChevronRight size={18} strokeWidth={1.5} />
                </div>
              </>
            )}

            <div aria-current="page" className="flex min-h-10 max-w-full min-w-0 items-center break-words bg-modura-secondary px-3 font-heading text-sm font-bold uppercase tracking-[1px] text-white shadow-sm clip-breadcrumb-current sm:min-h-11 sm:px-6 sm:text-lg sm:tracking-[2px] [overflow-wrap:anywhere]">
              {title}
            </div>
          </nav>

          {/* ORIGINAL ARCHITECTURAL MARKER */}
          <div className="mt-5 flex max-w-full items-center gap-2 sm:mt-9 sm:gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-modura-primary text-white clip-breadcrumb-icon sm:h-8 sm:w-8">
              <Compass size={15} strokeWidth={1.5} />
            </div>
            <div className="h-[2px] w-5 shrink-0 bg-modura-primary/20 sm:w-10" />
            <div className="h-[6px] w-3 shrink-0 bg-modura-secondary sm:w-5" />
            <div className="h-[2px] w-6 shrink-0 bg-modura-secondary sm:w-14" />
            <div className="h-[6px] w-2 shrink-0 bg-modura-primary sm:w-3" />
            <span className="ml-1 min-w-0 break-words font-body text-[8px] font-semibold uppercase tracking-[1px] text-modura-black sm:ml-2 sm:text-[10px] sm:tracking-[3px]">
              Built With Precision
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}