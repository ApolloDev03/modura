// "use client";

// import {
//   useEffect,
//   useState,
// } from "react";

// import Image from "next/image";

// import {
//   Factory,
//   Building2,
//   Settings,
//   Droplets,
//   Truck,
//   ArrowRight,
//   DraftingCompass,
// } from "lucide-react";

// import {
//   motion,
//   AnimatePresence,
// } from "framer-motion";


// interface SoftwareItem {
//   id: number;
//   title?: string;
//   name?: string;
//   sub?: string;
//   description?: string;
//   image?: string;
//   imageUrl?: string;
// }


// interface IndustriesProps {
//   software: SoftwareItem[];
// }


// const icons = [
//   Factory,
//   Building2,
//   Settings,
//   Droplets,
//   Truck,
//   Factory,
// ];


// const circleCards = [
//   {
//     position: "top-5 left-1/2 -translate-x-1/2",
//     index: 0,
//   },

//   {
//     position: "top-32 right-5",
//     index: 1,
//   },

//   {
//     position: "top-32 left-5",
//     index: 2,
//   },

//   {
//     position: "bottom-32 left-5",
//     index: 3,
//   },

//   {
//     position: "bottom-32 right-5",
//     index: 4,
//   },

//   {
//     position: "bottom-5 left-1/2 -translate-x-1/2",
//     index: 5,
//   },
// ];


// export default function Industries({
//   software,
// }: IndustriesProps) {

//   const [active, setActive] = useState(0);


//   /*
//    * Prevent active index from going
//    * outside API data length.
//    */
//   useEffect(() => {
//     if (
//       software?.length &&
//       active >= software.length
//     ) {
//       setActive(0);
//     }
//   }, [software, active]);


//   /*
//    * Auto change active item
//    */
//   useEffect(() => {

//     if (!software?.length) return;

//     const timer = setInterval(() => {

//       setActive((prev) =>
//         prev === software.length - 1
//           ? 0
//           : prev + 1
//       );

//     }, 4500);


//     return () => clearInterval(timer);

//   }, [software]);


//   if (!software?.length) {
//     return null;
//   }


//   /*
//    * Keep your existing 6-card design.
//    * If API has more than 6 items,
//    * only first 6 are displayed in orbit.
//    */
//   const displayItems = software.slice(0, 6);


//   return (

//     <section
//       className="
//         relative
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
//           lg:px-8
//         "
//       >

//         <div
//           className="
//             grid
//             items-center
//             gap-16
//             lg:grid-cols-[400px_1fr]
//           "
//         >

//           {/* LEFT */}

//           <div>

//             <div
//               className="
//                 flex
//                 items-center
//                 gap-3
//                 font-body
//                 text-xs
//                 font-bold
//                 uppercase
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
//                 OUR EXPERTISE
//               </span>

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

//               Industries

//               <span
//                 className="
//                   block
//                   text-modura-secondary
//                 "
//               >
//                 We Serve
//               </span>

//             </h2>


//             <p
//               className="
//                 mt-8
//                 max-w-sm
//                 font-body
//                 leading-7
//                 text-modura-gray-600
//               "
//             >
//               Delivering innovative and sustainable
//               engineering solutions across diverse
//               industries worldwide.
//             </p>


//             <div
//               className="
//                 scrollbar-hide
//                 relative
//                 mt-12
//                 h-[520px]
//                 space-y-4
//                 overflow-y-auto
//                 pr-4
//               "
//             >

//               <div
//                 className="
//                   absolute
//                   bottom-5
//                   left-7
//                   top-5
//                   w-px
//                   bg-modura-border
//                 "
//               />


//               {displayItems.map(
//                 (item, index) => {

//                   const Icon =
//                     icons[index] || Factory;

//                   const title =
//                     item.title ||
//                     item.name ||
//                     "Industry";

//                   const sub =
//                     item.sub ||
//                     item.description ||
//                     "Engineering Solutions";


//                   return (

//                     <motion.button
//                       key={item.id ?? index}
//                       onClick={() =>
//                         setActive(index)
//                       }
//                       whileHover={{
//                         x: 8,
//                       }}
//                       className={`
//                         relative
//                         z-10
//                         flex
//                         w-full
//                         items-center
//                         gap-5
//                         rounded-full
//                         px-6
//                         py-5
//                         transition-all
//                         duration-500

//                         ${
//                           active === index
//                             ? "bg-modura-primary text-white shadow-xl"
//                             : "text-modura-primary hover:bg-white"
//                         }
//                       `}
//                     >

//                       <div
//                         className={`
//                           flex
//                           h-12
//                           w-12
//                           shrink-0
//                           items-center
//                           justify-center
//                           rounded-full
//                           border

//                           ${
//                             active === index
//                               ? "border-[#c49a45] bg-[#c49a45]"
//                               : "border-modura-border bg-white"
//                           }
//                         `}
//                       >

//                         <Icon size={22} />

//                       </div>


//                       <div className="text-left">

//                         <h4
//                           className="
//                             font-heading
//                             text-lg
//                             font-semibold
//                           "
//                         >
//                           {title}
//                         </h4>


//                         <p
//                           className="
//                             font-body
//                             text-sm
//                             opacity-70
//                           "
//                         >
//                           {sub}
//                         </p>

//                       </div>


//                       <ArrowRight
//                         size={20}
//                         className="ml-auto"
//                       />

//                     </motion.button>

//                   );

//                 }
//               )}

//             </div>

//           </div>


//           {/* RIGHT SECTION */}

//           <div
//             className="
//               relative
//               flex
//               h-[720px]
//               items-center
//               justify-center
//             "
//           >

//             {/* CUSTOM ORBIT DESIGN */}

//             <div
//               className="
//                 absolute
//                 h-[560px]
//                 w-[560px]
//                 rounded-full
//                 border
//                 border-[#c49a45]/30
//               "
//             >

//               <div
//                 className="
//                   absolute
//                   left-0
//                   top-1/2
//                   h-3
//                   w-3
//                   -translate-y-1/2
//                   rounded-full
//                   bg-[#c49a45]
//                 "
//               />


//               <div
//                 className="
//                   absolute
//                   right-0
//                   top-1/2
//                   h-3
//                   w-3
//                   -translate-y-1/2
//                   rounded-full
//                   bg-[#c49a45]
//                 "
//               />

//             </div>


//             <div
//               className="
//                 absolute
//                 h-[430px]
//                 w-[430px]
//                 rounded-full
//                 bg-white/60
//                 shadow-inner
//               "
//             />


//             {/* IMAGE CARDS */}

//             {circleCards.map(
//               (card, index) => {

//                 const item =
//                   displayItems[card.index];

//                 if (!item) return null;


//                 const image =
//                   item.imageUrl ||
//                   item.image ||
//                   "";


//                 const title =
//                   item.title ||
//                   item.name ||
//                   "Industry";


//                 return (

//                   <motion.div
//                     key={
//                       item.id ??
//                       index
//                     }
//                     onClick={() =>
//                       setActive(card.index)
//                     }
//                     whileHover={{
//                       scale: 1.08,
//                       y: -8,
//                     }}
//                     transition={{
//                       duration: 0.4,
//                     }}
//                     className={`
//                       absolute
//                       ${card.position}
//                       z-20
//                       h-[140px]
//                       w-[200px]
//                       cursor-pointer
//                       overflow-hidden
//                       border-[6px]
//                       border-white
//                       bg-white
//                       shadow-xl
//                       clip-industry
//                     `}
//                   >

//                     <Image
//                       src={image}
//                       alt={title}
//                       fill
//                       sizes="200px"
//                       className="
//                         object-cover
//                       "
//                     />

//                   </motion.div>

//                 );

//               }
//             )}


//             {/* CENTER IMAGE AREA */}

//             <div
//               className="
//                 relative
//                 z-30
//                 h-[370px]
//                 w-[370px]
//                 overflow-hidden
//                 rounded-full
//                 border-[12px]
//                 border-white
//                 shadow-2xl
//                 ring-8
//                 ring-[#c49a45]/20
//               "
//             >

//               <AnimatePresence mode="wait">

//                 <motion.div
//                   key={active}
//                   initial={{
//                     opacity: 0,
//                     scale: 1.15,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     scale: 1,
//                   }}
//                   transition={{
//                     duration: 0.7,
//                   }}
//                   className="
//                     absolute
//                     inset-0
//                   "
//                 >

//                   <Image
//                     src={
//                       displayItems[active]
//                         ?.imageUrl ||
//                       displayItems[active]
//                         ?.image ||
//                       ""
//                     }
//                     alt={
//                       displayItems[active]
//                         ?.title ||
//                       displayItems[active]
//                         ?.name ||
//                       "Industry"
//                     }
//                     fill
//                     sizes="370px"
//                     className="
//                       object-cover
//                     "
//                   />


//                   <div
//                     className="
//                       absolute
//                       inset-0
//                       bg-gradient-to-t
//                       from-modura-primary/90
//                       via-modura-primary/30
//                       to-transparent
//                     "
//                   />

//                 </motion.div>

//               </AnimatePresence>


//               <div
//                 className="
//                   absolute
//                   bottom-14
//                   left-0
//                   right-0
//                   z-40
//                   text-center
//                   text-white
//                 "
//               >

//                 <h3
//                   className="
//                     font-heading
//                     text-4xl
//                     font-bold
//                     tracking-wide
//                   "
//                 >
//                   {displayItems[active]
//                     ?.title ||
//                     displayItems[active]
//                       ?.name ||
//                     "Industry"}
//                 </h3>


//                 <p
//                   className="
//                     mt-3
//                     font-body
//                     text-sm
//                     uppercase
//                     tracking-[4px]
//                   "
//                 >
//                   {displayItems[active]
//                     ?.sub ||
//                     displayItems[active]
//                       ?.description ||
//                     "Engineering Solutions"}
//                 </p>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//     </section>

//   );
// }

"use client";

import {

  useEffect,

  useState,

} from "react";

import Image from "next/image";

import {

  Factory,

  Building2,

  Settings,

  Droplets,

  Truck,

  ArrowRight,

  DraftingCompass,

} from "lucide-react";

import {

  motion,

  AnimatePresence,

} from "framer-motion";

interface SoftwareItem {

  id: number;

  title?: string;

  name?: string;

  sub?: string;

  description?: string;

  image?: string;

  imageUrl?: string;

}

interface IndustriesProps {

  software: SoftwareItem[];

}

const icons = [

  Factory,

  Building2,

  Settings,

  Droplets,

  Truck,

  Factory,

];

const circleCards = [

  {

    position: "top-5 left-1/2 -translate-x-1/2",

    index: 0,

  },

  {

    position: "top-32 right-5",

    index: 1,

  },

  {

    position: "top-32 left-5",

    index: 2,

  },

  {

    position: "bottom-32 left-5",

    index: 3,

  },

  {

    position: "bottom-32 right-5",

    index: 4,

  },

  {

    position: "bottom-5 left-1/2 -translate-x-1/2",

    index: 5,

  },

];

export default function Industries({

  software,

}: IndustriesProps) {

  const [active, setActive] = useState(0);

  /*

   * Prevent active index from going

   * outside API data length.

   */

  useEffect(() => {

    if (

      software?.length &&

      active >= Math.min(software.length, 6)

    ) {

      setActive(0);

    }

  }, [software, active]);

  /*

   * Auto change active item

   */

  useEffect(() => {

    if (!software?.length) return;

    const timer = setInterval(() => {

      setActive((prev) =>

        prev === Math.min(software.length, 6) - 1

          ? 0

          : prev + 1

      );

    }, 4500);

    return () => clearInterval(timer);

  }, [software]);

  if (!software?.length) {

    return null;

  }

  /*

   * Keep your existing 6-card design.

   * If API has more than 6 items,

   * only first 6 are displayed in orbit.

   */

  const displayItems = software.slice(0, 6);

  return (

    <section

      className="

        relative

        overflow-hidden

        bg-modura-off-white

        py-12
        md:py-16

      "

    >

      <div

        className="

          mx-auto

          max-w-full

       px-4
    md:px-6
    lg:grid-cols-2
    lg:gap-12
    lg:px-10
    xl:gap-16
    2xl:px-16

        "

      >

        <div

          className="

            grid

            items-center

            gap-16

            lg:grid-cols-[400px_1fr]

          "

        >

          {/* LEFT */}

          <div>

            <div

              className="

                flex

                items-center

                gap-3

                font-body

                text-xs

                font-bold

                uppercase

                tracking-[5px]

                text-modura-secondary

              "

            >

              <DraftingCompass

                size={20}

                strokeWidth={1.5}

                className="

                  text-modura-secondary

                "

              />

              <span>

                OUR EXPERTISE

              </span>

            </div>

            <h2

              className="

                mt-4

                font-heading

                text-5xl

                font-semibold

                text-modura-primary

                lg:text-6xl

              "

            >

              Industries

              <span

                className="

                  block

                  text-modura-secondary

                "

              >

                We Serve

              </span>

            </h2>

            <p

              className="

                mt-8

                max-w-sm

                font-body

                leading-7

                text-modura-gray-600

              "

            >

              Delivering innovative and sustainable

              engineering solutions across diverse

              industries worldwide.

            </p>

            <div

              className="

                scrollbar-hide

                relative

                mt-12

                h-[520px]

                space-y-4

                overflow-y-auto

                pr-4

              "

            >

              <div

                className="

                  absolute

                  bottom-5

                  left-7

                  top-5

                  w-px

                  bg-modura-border

                "

              />

              {displayItems.map(

                (item, index) => {

                  const Icon =

                    icons[index] || Factory;

                  const title =

                    item.title ||

                    item.name ||

                    "Industry";

                  const sub =

                    item.sub ||

                    item.description ||

                    "Engineering Solutions";

                  return (

                    <motion.button

                      key={item.id ?? index}

                      onClick={() =>

                        setActive(index)

                      }

                      whileHover={{

                        x: 8,

                      }}

                      className={`

                        relative

                        z-10

                        flex

                        w-full

                        items-center

                        gap-5

                        rounded-full

                        px-6

                        py-5

                        transition-all

                        duration-500

                        ${

                          active === index

                            ? "bg-modura-primary text-white shadow-xl"

                            : "text-modura-primary hover:bg-white"

                        }

                      `}

                    >

                      <div

                        className={`

                          flex

                          h-12

                          w-12

                          shrink-0

                          items-center

                          justify-center

                          rounded-full

                          border

                          ${

                            active === index

                              ? "border-[#c49a45] bg-[#c49a45]"

                              : "border-modura-border bg-white"

                          }

                        `}

                      >

                        <Icon size={22} />

                      </div>

                      <div className="min-w-0 text-left">

                        <h4

                          className="

                            font-heading

                            text-lg

                            font-semibold

                          "

                        >

                          {title}

                        </h4>

                        <p

                          className="

                            font-body

                            text-sm

                            opacity-70

                          "

                        >

                          {sub}

                        </p>

                      </div>

                      <ArrowRight

                        size={20}

                        className="ml-auto shrink-0"

                      />

                    </motion.button>

                  );

                }

              )}

            </div>

          </div>

          {/* RIGHT SECTION */}

          <div className="relative h-[300px] min-w-0 w-full overflow-hidden sm:h-[480px] md:h-[610px] lg:h-[690px] xl:h-[720px]">
<div className="absolute left-1/2 top-1/2 flex h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 scale-[0.40] sm:scale-[0.68] md:scale-[0.85] lg:scale-[0.95] xl:scale-100 items-center justify-center">

            {/* CUSTOM ORBIT DESIGN */}

            <div

              className="

                absolute

                h-[560px]

                w-[560px]

                rounded-full

                border

                border-[#c49a45]/30

              "

            >

              <div

                className="

                  absolute

                  left-0

                  top-1/2

                  h-3

                  w-3

                  -translate-y-1/2

                  rounded-full

                  bg-[#c49a45]

                "

              />

              <div

                className="

                  absolute

                  right-0

                  top-1/2

                  h-3

                  w-3

                  -translate-y-1/2

                  rounded-full

                  bg-[#c49a45]

                "

              />

            </div>

            <div

              className="

                absolute

                h-[430px]

                w-[430px]

                rounded-full

                bg-white/60

                shadow-inner

              "

            />

            {/* IMAGE CARDS */}

            {circleCards.map(

              (card, index) => {

                const item =

                  displayItems[card.index];

                if (!item) return null;

                const image =

                  item.imageUrl ||

                  item.image ||

                  "";

                const title =

                  item.title ||

                  item.name ||

                  "Industry";

                return (

                  <motion.div

                    key={

                      item.id ??

                      index

                    }

                    onClick={() =>

                      setActive(card.index)

                    }

                    whileHover={{

                      scale: 1.08,

                      y: -8,

                    }}

                    transition={{

                      duration: 0.4,

                    }}

                    className={`

                      absolute

                      ${card.position}

                      z-20

                      h-[140px]

                      w-[200px]

                      cursor-pointer

                      overflow-hidden

                      border-[6px]

                      border-white

                      bg-white

                      shadow-xl

                      clip-industry

                    `}

                  >

                    <Image

                      src={image}

                      alt={title}

                      fill

                      sizes="200px"

                      className="

                        object-cover

                      "

                    />

                  </motion.div>

                );

              }

            )}

            {/* CENTER IMAGE AREA */}

            <div

              className="

                relative

                z-30

                h-[370px]

                w-[370px]

                overflow-hidden

                rounded-full

                border-[12px]

                border-white

                shadow-2xl

                ring-8

                ring-[#c49a45]/20

              "

            >

              <AnimatePresence mode="wait">

                <motion.div

                  key={active}

                  initial={{

                    opacity: 0,

                    scale: 1.15,

                  }}

                  animate={{

                    opacity: 1,

                    scale: 1,

                  }}

                  transition={{

                    duration: 0.7,

                  }}

                  className="

                    absolute

                    inset-0

                  "

                >

                  <Image

                    src={

                      displayItems[active]

                        ?.imageUrl ||

                      displayItems[active]

                        ?.image ||

                      ""

                    }

                    alt={

                      displayItems[active]

                        ?.title ||

                      displayItems[active]

                        ?.name ||

                      "Industry"

                    }

                    fill

                    sizes="370px"

                    className="

                      object-cover

                    "

                  />

                  <div

                    className="

                      absolute

                      inset-0

                      bg-gradient-to-t

                      from-modura-primary/90

                      via-modura-primary/30

                      to-transparent

                    "

                  />

                </motion.div>

              </AnimatePresence>

              <div

                className="

                  absolute

                  bottom-14

                  left-0

                  right-0

                  z-40

                  text-center

                  text-white

                "

              >

                <h3

                  className="

                    font-heading

                    text-4xl

                    font-bold

                    tracking-wide

                  "

                >

                  {displayItems[active]

                    ?.title ||

                    displayItems[active]

                      ?.name ||

                    "Industry"}

                </h3>

                <p

                  className="

                    mt-3

                    font-body

                    text-sm

                    uppercase

                    tracking-[4px]

                  "

                >

                  {displayItems[active]

                    ?.sub ||

                    displayItems[active]

                      ?.description ||

                    "Engineering Solutions"}

                </p>

              </div>

            </div>

          </div>
        </div>

        </div>

      </div>

    </section>

  );

}