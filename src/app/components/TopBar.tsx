"use client";

import {
  FiMail,
  FiPhone,
} from "react-icons/fi";

import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa6";

export default function TopBar() {
  return (
    <div className="relative hidden overflow-hidden bg-modura-primary text-white lg:block">

      {/* Decorative architecture lines */}
      <div
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          h-full
          w-[260px]
          opacity-[0.06]
        "
      >
        <div className="absolute left-10 top-0 h-full w-px bg-white" />
        <div className="absolute left-20 top-0 h-full w-px bg-white" />
        <div className="absolute left-0 top-1/2 h-px w-full bg-white" />
      </div>

      <div className="mx-auto max-w-[1440px] px-6 xl:px-10">

        <div className="flex h-[46px] items-center justify-between">

          {/* LEFT */}

          <div className="relative flex h-full items-center">

            <div className="mr-5 h-[1px] w-8 bg-modura-secondary-light" />

            <p className="text-[12px] font-medium tracking-[0.07em] text-white/80">
              Architecture
              <span className="mx-3 text-modura-secondary-light">•</span>

              Engineering
              <span className="mx-3 text-modura-secondary-light">•</span>

              Project Management
              <span className="mx-3 text-modura-secondary-light">•</span>

              Valuation
            </p>

          </div>

          {/* RIGHT */}

          <div className="flex h-full items-center">

            {/* Contact Area */}

            <div
              className="
                relative
                flex
                h-full
                items-center
                gap-7
                bg-[#a57952]
                pl-16
                pr-8
                before:absolute
                before:-left-[28px]
                before:top-0
                before:h-full
                before:w-[58px]
                before:-skew-x-[32deg]
                before:bg-[#a57952]
              "
            >

              <a
                href="mailto:info@moduragroup.com"
                className="
                  group
                  flex
                  items-center
                  gap-2.5
                  text-[12px]
                  font-medium
                  text-white/90
                  transition-colors
                  hover:text-white
                "
              >
                <FiMail className="text-[16px]" />

                <span>
                  info@moduragroup.com
                </span>
              </a>

              <span className="h-4 w-px bg-white/25" />

              <a
                href="tel:+14155550100"
                className="
                  group
                  flex
                  items-center
                  gap-2.5
                  text-[12px]
                  font-medium
                  text-white/90
                  transition-colors
                  hover:text-white
                "
              >
                <FiPhone className="text-[15px]" />

                <span>
                  +1 (415) 555-0100
                </span>
              </a>

            </div>

            {/* Social */}

            <div className="flex h-full items-center gap-1 bg-modura-primary-dark pl-5">

              <SocialLink
                href="#"
                label="LinkedIn"
              >
                <FaLinkedinIn />
              </SocialLink>

              <SocialLink
                href="#"
                label="Instagram"
              >
                <FaInstagram />
              </SocialLink>

              <SocialLink
                href="#"
                label="Facebook"
              >
                <FaFacebookF />
              </SocialLink>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom highlight */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-white/10" />

    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="
        flex
        h-[46px]
        w-[38px]
        items-center
        justify-center
        text-[14px]
        text-white/70
        transition-all
        duration-300
        hover:-translate-y-[2px]
        hover:bg-white/10
        hover:text-white
      "
    >
      {children}
    </a>
  );
}