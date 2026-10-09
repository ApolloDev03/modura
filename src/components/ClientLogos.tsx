// "use client";

// import Image from "next/image";

// import {
//   Swiper,
//   SwiperSlide
// } from "swiper/react";

// import {
//   Autoplay,
// } from "swiper/modules";

// import "swiper/css";


// import logo1 from "../app/(website)/assets/images/logo1.jpg";
// import logo2 from "../app/(website)/assets/images/logo2.jpg";
// import logo3 from "../app/(website)/assets/images/logo3.png";
// import logo4 from "../app/(website)/assets/images/logo4.jpg";
// import logo5 from "../app/(website)/assets/images/logo5.webp";
// import logo6 from "../app/(website)/assets/images/logo6.jpg";
// import logo7 from "../app/(website)/assets/images/logo7.jpg";
// import { DraftingCompass } from "lucide-react";



// const clients = [
// {
// logo:logo1
// },
// {
// logo:logo2
// },
// {
// logo:logo3
// },
// {
// logo:logo4
// },
// {
// logo:logo5
// },
// {
// logo:logo6
// },
// {
// logo:logo7
// },
// ];





// export default function ClientLogoSlider(){


// return(

// <section
// className="
// relative
// overflow-hidden
// bg-white
// py-16
// "

// >


// {/* Background Blueprint */}

// <div
// className="
// absolute
// right-0
// bottom-0
// h-[300px]
// w-[300px]

// bg-modura-light

// opacity-40

// rounded-full

// blur-3xl

// "
// />



// <div
// className="
// relative
// z-10
// max-w-7xl
// mx-auto
// px-6
// lg:px-10
// "

// >


// {/* Heading */}

// <div
// className="
// text-center
// mb-14
// "

// >


// <div className="
// flex
// items-center
// gap-3
// font-body
// justify-center
// text-xs
// uppercase
// font-bold
// tracking-[5px]
// text-modura-secondary
// ">


// <DraftingCompass
// size={20}
// strokeWidth={1.5}
// className="
// text-modura-secondary
// "
// />


// <span>
// Our Clients
// </span>


// </div>



// <h2
// className="
// mt-4
// font-heading
// text-5xl
// lg:text-6xl
// font-semibold
// text-modura-primary
// "
// >

// Trusted By

// <span
// className="
// text-modura-secondary ml-2
// "
// >
//  Global Brands
// </span>


// </h2>



// </div>






// <Swiper


// modules={[Autoplay]}


// loop={true}


// slidesPerView={"auto"}


// spaceBetween={30}


// speed={5000}


// autoplay={{

// delay:0,

// disableOnInteraction:false

// }}


// className="
// client-swiper
// "

// >



// {
// [...clients,...clients].map((item,index)=>(


// <SwiperSlide

// key={index}

// className="
// !w-[240px]
// "

// >


// <div

// className="
// group

// relative

// h-[130px]

// w-[220px]


// bg-white


// border

// border-modura-gray-200


// shadow-sm


// flex

// items-center

// justify-center


// overflow-hidden


// transition-all

// duration-500


// hover:-translate-y-2

// hover:shadow-xl

// "

// >


// {/* Cut Corner */}

// <div

// className="
// absolute
// top-0
// right-0

// border-t-[25px]

// border-t-modura-primary-light

// border-l-[25px]

// border-l-transparent

// "

// />





// <Image

// src={item.logo}

// alt="client"

// width={150}

// height={80}


// className="
// object-contain

// max-h-[90px]

// transition-all

// duration-500


// group-hover:scale-110

// "

//  />






// </div>


// </SwiperSlide>


// ))
// }



// </Swiper>



// </div>


// </section>


// )

// }

"use client";

import Image from "next/image";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import {
  Autoplay,
} from "swiper/modules";

import "swiper/css";

import { DraftingCompass } from "lucide-react";

interface Client {
  id: number;
  name: string;
  websiteUrl: string;
  image: string;
  imageUrl: string;
}

interface ClientLogoSliderProps {
  clients: Client[];
}

export default function ClientLogoSlider({
  clients,
}: ClientLogoSliderProps) {
  /*
   * Duplicate clients for
   * continuous infinite slider
   */
  const sliderClients = [
    ...clients,
    ...clients,
  ];

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-white
        py-16
      "
    >
      {/* Background */}

      <div
        className="
          absolute
          right-0
          bottom-0
          h-[300px]
          w-[300px]
          rounded-full
          bg-modura-light
          opacity-40
          blur-3xl
        "
      />

      <div
        className="
          relative
          z-10
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
        {/* Heading */}

        <div
          className="
            mb-14
            text-center
          "
        >
          <div
            className="
              flex
              items-center
              justify-center
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
              Our Clients
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
            Trusted By

            <span
              className="
                ml-2
                text-modura-secondary
              "
            >
              Global Brands
            </span>
          </h2>
        </div>

        {/* Slider */}

        <Swiper
          modules={[Autoplay]}
          loop={clients.length > 1}
          slidesPerView="auto"
          spaceBetween={30}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          className="client-swiper"
        >
          {sliderClients.map(
            (item, index) => (
              <SwiperSlide
                key={`${item.id}-${index}`}
                className="
                  !w-[240px]
                "
              >
                <a
                  href={
                    item.websiteUrl || "#"
                  }
                  target={
                    item.websiteUrl
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    item.websiteUrl
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="
                    block
                    no-underline
                  "
                >
                  <div
                    className="
                      group
                      relative
                      flex
                      h-[130px]
                      w-[220px]
                      items-center
                      justify-center
                      overflow-hidden
                      border
                      border-modura-gray-200
                      bg-white
                      shadow-sm
                      transition-all
                      duration-500
                      hover:-translate-y-2
                      hover:shadow-xl
                    "
                  >
                    {/* Cut Corner */}

                    <div
                      className="
                        absolute
                        right-0
                        top-0
                        border-l-[25px]
                        border-t-[25px]
                        border-l-transparent
                        border-t-modura-primary-light
                      "
                    />

                    {/* Logo */}

                    <Image
                      src={
                        item.imageUrl ||
                        item.image
                      }
                      alt={
                        item.name ||
                        "Client"
                      }
                      width={150}
                      height={80}
                      className="
                        max-h-[90px]
                        object-contain
                        transition-all
                        duration-500
                        group-hover:scale-110
                      "
                    />
                  </div>
                </a>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </section>
  );
}