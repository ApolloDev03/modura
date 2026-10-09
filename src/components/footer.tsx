// "use client";

// import Image from "next/image";

// import {
// Mail,
// Phone,
// MapPin
// } from "lucide-react";


// import {
// LiaLinkedin
// } from "react-icons/lia";

// import {
// BsInstagram
// } from "react-icons/bs";

// import {
// FaFacebookF
// } from "react-icons/fa6";


// import {
// useLayoutEffect,
// useRef
// } from "react";


// import gsap from "gsap";


// import logo from "../app/(website)/assets/images/logo.png";



// export default function Footer(){


// const footerRef = useRef<HTMLDivElement|null>(null);



// useLayoutEffect(()=>{


// const ctx = gsap.context(()=>{


// gsap.from(".footer-item",
// {
// opacity:0,
// y:50,
// duration:1,
// stagger:.15,
// ease:"power3.out"
// });


// },footerRef);



// return()=>ctx.revert();



// },[]);





// return(

// <footer

// ref={footerRef}

// className="
// relative
// overflow-hidden
// bg-white
// text-modura-primary
// "

// >


// <div
// className="
// absolute
// top-0
// left-0
// w-full
// h-[35px]
// overflow-hidden
// "
// >

// <svg
// viewBox="0 0 1440 80"
// className="
// absolute
// top-0
// left-0
// w-full
// h-full
// "
// preserveAspectRatio="none"
// >

// <path
// d="
// M0,20 
// C180,80 320,0 520,35 
// C720,70 850,10 1050,40 
// C1220,70 1350,20 1440,35
// L1440,0
// L0,0
// Z
// "
// fill="var(--modura-secondary)"
// />

// </svg>


// </div>






// {/* FOOTER CONTENT */}



// <div

// className="
// relative
// z-10
// max-w-7xl
// mx-auto
// px-6
// pt-16
// pb-12
// grid
// lg:grid-cols-12
// gap-10

// "

// >








// {/* LOGO */}



// <div

// className="
// footer-item
// lg:col-span-4
// "

// >


// <div

// className="
// relative
// w-[240px]
// h-[100px]
// "

// >

// <Image

// src={logo}

// alt="MVNL Engineering"

// fill

// className="
// object-contain
// object-left
// "

// />


// </div>

// <p

// className="
// mt-6
// max-w-sm
// text-sm
// leading-7
// text-modura-gray-600
// "

// >

// Delivering innovative and reliable engineering solutions through advanced technology, precision design and sustainable construction practices.

// </p>



// <h4

// className="
// my-3
// font-heading
// text-lg
// font-bold
// "

// >

// FOLLOW US

// </h4>




// <div

// className="
// flex
// gap-4
// "

// >


// {

// [
// LiaLinkedin,
// BsInstagram,
// FaFacebookF

// ].map((Icon,index)=>(


// <div

// key={index}

// className="
// social-reference
// "

// >

// <Icon size={18}/>


// </div>


// ))


// }


// </div>

// </div>









// {/* SERVICES */}



// <div

// className="
// footer-item
// lg:col-span-3
// border-l
// border-modura-border
// pl-8
// "

// >


// <h3

// className="
// font-heading
// text-xl
// font-bold
// "

// >

// SERVICES

// </h3>



// <div className="
// footer-title-line
// "/>




// <ul

// className="
// space-y-4
// text-sm
// text-modura-gray-600
// "

// >


// <li className="footer-link">
// Architecture Design
// </li>


// <li className="footer-link">
// Structural Engineering
// </li>


// <li className="footer-link">
// BIM Solutions
// </li>


// <li className="footer-link">
// Project Management
// </li>


// <li className="footer-link">
// MEP Engineering
// </li>


// <li className="footer-link">
// Industrial Design
// </li>


// </ul>



// </div>









// {/* COMPANY */}



// <div

// className="
// footer-item
// lg:col-span-2
// border-l
// border-modura-border
// pl-8
// "

// >


// <h3

// className="
// font-heading
// text-xl
// font-bold
// "

// >

// COMPANY

// </h3>


// <div className="
// footer-title-line
// "/>



// <ul

// className="
// space-y-4
// text-sm
// text-modura-gray-600
// "

// >


// <li className="footer-link">
// About Us
// </li>


// <li className="footer-link">
// Projects
// </li>


// <li className="footer-link">
// Career
// </li>


// <li className="footer-link">
// Contact
// </li>


// </ul>



// </div>









// {/* CONTACT */}



// <div

// className="
// footer-item
// lg:col-span-3
// border-l
// border-modura-border
// pl-8
// "

// >


// <h3

// className="
// font-heading
// text-xl
// font-bold
// "

// >

// CONTACT

// </h3>


// <div className="
// footer-title-line
// "/>





// <div

// className="
// space-y-5
// text-sm
// text-modura-gray-600
// "

// >



// <div className="flex gap-3 items-center">

// <span className="contact-icon">

// <Mail size={16}/>

// </span>


// info@mvnengineering.com


// </div>





// <div className="flex gap-3 items-center">


// <span className="contact-icon">

// <Phone size={16}/>

// </span>


// +91 00000 00000


// </div>







// <div className="flex gap-3">


// <span className="contact-icon">

// <MapPin size={16}/>

// </span>


// <span>

// Ahmedabad, Gujarat
// <br/>
// India

// </span>


// </div>



// </div>










// </div>






// </div>










// {/* BOTTOM */}



// <div

// className="
// relative
// z-10
// border-t
// border-modura-border
// "

// >


// <div

// className="
// max-w-7xl
// mx-auto
// px-6
// py-5
// flex
// justify-center
// text-sm
// text-modura-gray-600
// "

// >


// <p>

// © 2026 MVNL Engineering. All Rights Reserved.

// </p>





// </div>



// </div>







// </footer>

// )

// }


"use client";

import Image from "next/image";
import Link from "next/link";

import { Mail, Phone, MapPin } from "lucide-react";

import { LiaLinkedin } from "react-icons/lia";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa6";

import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";

import logo from "../app/(website)/assets/images/logo.png";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/91120919/admin/dashboard/",
    icon: LiaLinkedin,
  },
  {
    name: "Instagram",
    href: "",
    icon: BsInstagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/mvnlengineering/",
    icon: FaFacebookF,
  },
];

const services = [
  "Architecture Design",
  "Structural Engineering",
  "BIM Solutions",
  "Project Management",
  "MEP Engineering",
  "Industrial Design",
];

const companyLinks = [
  { title: "About Us", href: "/company" },
  { title: "Projects", href: "/portfolio" },
  { title: "Career", href: "/career" },
  { title: "Contact", href: "/contact" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-item",
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "transform",
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="
        relative
        w-full
        overflow-hidden
        bg-white
        text-modura-primary
      "
    >
      {/* TOP WAVE */}

      <div
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          h-[22px]
          w-full
          overflow-hidden
          sm:h-[28px]
          lg:h-[35px]
        "
      >
        <svg
          viewBox="0 0 1440 80"
          className="absolute left-0 top-0 h-full w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="
              M0,20
              C180,80 320,0 520,35
              C720,70 850,10 1050,40
              C1220,70 1350,20 1440,35
              L1440,0
              L0,0
              Z
            "
            fill="var(--modura-secondary)"
          />
        </svg>
      </div>

      {/* FOOTER CONTENT */}

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          w-full
          max-w-full
          grid-cols-1
          gap-x-6
          gap-y-10
          px-4
          pb-10
          pt-14
          sm:grid-cols-2
          sm:gap-y-12
          sm:pt-16
          md:px-6
          lg:grid-cols-12
          lg:gap-x-5
          lg:gap-y-0
          lg:px-10
          lg:pb-12
          lg:pt-20
          xl:gap-x-8
          2xl:px-16
        "
      >
        {/* LOGO / ABOUT */}

        <div
          className="
            footer-item
            min-w-0
            sm:col-span-2
            lg:col-span-4
          "
        >
          <Link
            href="/"
            aria-label="MVNL Engineering Home"
            className="
              relative
              block
              h-[90px]
              w-[210px]
              max-w-full
              sm:h-[100px]
              sm:w-[240px]
            "
          >
            <Image
              src={logo}
              alt="MVNL Engineering"
              fill
              sizes="240px"
              className="object-contain object-left"
            />
          </Link>

          <p
            className="
              mt-4
              max-w-sm
              font-body
              text-sm
              leading-7
              text-modura-gray-600
              sm:mt-5
            "
          >
            Delivering innovative and reliable
            engineering solutions through advanced
            technology, precision design and
            sustainable construction practices.
          </p>

          <h4
            className="
              mb-3
              mt-5
              font-heading
              text-lg
              font-bold
              sm:mt-6
            "
          >
            FOLLOW US
          </h4>

          <div className="flex flex-wrap items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              if (!social.href) {
                return (
                  <span
                    key={social.name}
                    className="social-reference"
                    aria-label={`${social.name} link unavailable`}
                    title={`${social.name} link unavailable`}
                  >
                    <Icon size={18} />
                  </span>
                );
              }

              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  title={social.name}
                  className="social-reference"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        {/* SERVICES */}

        <div
          className="
            footer-item
            min-w-0
            border-modura-border
            pl-0
            sm:border-l
            sm:pl-6
            lg:col-span-3
            lg:pl-6
            xl:pl-8
          "
        >
          <h3 className="font-heading text-xl font-bold">
            SERVICES
          </h3>

          <div className="footer-title-line" />

          <ul
            className="
              space-y-3
              font-body
              text-sm
              text-modura-gray-600
              lg:space-y-4
            "
          >
            {services.map((service) => (
              <li
                key={service}
                className="footer-link break-words"
              >
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* COMPANY */}

        <div
          className="
            footer-item
            min-w-0
            border-modura-border
            pl-0
            sm:border-l
            sm:pl-6
            lg:col-span-2
            lg:pl-6
            xl:pl-8
          "
        >
          <h3 className="font-heading text-xl font-bold">
            COMPANY
          </h3>

          <div className="footer-title-line" />

          <ul
            className="
              space-y-3
              font-body
              text-sm
              text-modura-gray-600
              lg:space-y-4
            "
          >
            {companyLinks.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="footer-link inline-block transition-colors duration-300 hover:text-modura-secondary"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}

        <div
          className="
            footer-item
            min-w-0
            border-modura-border
            pl-0
            sm:border-l
            sm:pl-6
            lg:col-span-3
            lg:pl-6
            xl:pl-8
          "
        >
          <h3 className="font-heading text-xl font-bold">
            CONTACT
          </h3>

          <div className="footer-title-line" />

          <div
            className="
              space-y-5
              font-body
              text-sm
              text-modura-gray-600
            "
          >
            {/* EMAIL */}

            <a
              href="mailto:info@mvnengineering.com"
              className="
                flex
                min-w-0
                items-start
                gap-3
                transition-colors
                duration-300
                hover:text-modura-secondary
              "
            >
              <span className="contact-icon shrink-0">
                <Mail size={16} />
              </span>

              <span className="min-w-0 break-all leading-7">
                info@mvnengineering.com
              </span>
            </a>

            {/* PHONE */}

            <a
              href="tel:+919879860886"
              className="
                flex
                min-w-0
                items-center
                gap-3
                transition-colors
                duration-300
                hover:text-modura-secondary
              "
            >
              <span className="contact-icon shrink-0">
                <Phone size={16} />
              </span>

              <span className="leading-7">
                +91 9879860886
              </span>
            </a>

            {/* ADDRESS */}

            <div className="flex min-w-0 items-start gap-3">
              <span className="contact-icon shrink-0">
                <MapPin size={16} />
              </span>

              <span className="min-w-0 leading-7">
                World Trade Tower
                <span className="block">
                  Ahmedabad, Gujarat
                </span>
                <span className="block">
                  India
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT */}

      <div
        className="
          relative
          z-10
          border-t
          border-modura-border
        "
      >
        <div
          className="
            mx-auto
            flex
            w-full
            max-w-full
            items-center
            justify-center
            px-4
            py-5
            text-center
            md:px-6
            lg:px-10
            2xl:px-16
          "
        >
          <p
            className="
              font-body
              text-xs
              leading-6
              text-modura-gray-600
              sm:text-sm
            "
          >
            © {new Date().getFullYear()} MVNL Engineering.
            All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
