"use client";

import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { useRef } from "react";
import gsap from "gsap";

type AnimatedButtonProps = {
    href: string;
    title: string;
    className?: string;
};

export default function AnimatedButton({
    href,
    title,
    className = "",
}: AnimatedButtonProps) {
    const buttonRef = useRef<HTMLAnchorElement>(null);

    const enterAnimation = () => {
        const button = buttonRef.current;
        if (!button) return;

        const topLetters =
            button.querySelectorAll(".btn-letter-top");

        const bottomLetters =
            button.querySelectorAll(".btn-letter-bottom");

        const sweep =
            button.querySelector(".btn-sweep");

        const arrowOne =
            button.querySelector(".btn-arrow-one");

        const arrowTwo =
            button.querySelector(".btn-arrow-two");

        const signature =
            button.querySelector(".btn-signature");

        const edge =
            button.querySelector(".btn-edge");

        gsap.killTweensOf([
            topLetters,
            bottomLetters,
            sweep,
            arrowOne,
            arrowTwo,
            signature,
            edge,
        ]);

        const tl = gsap.timeline();

        /* background architectural sweep */

        tl.to(
            sweep,
            {
                scaleX: 1,
                duration: 0.55,
                ease: "power4.inOut",
            },
            0
        );

        /* original letters break away */

        tl.to(
            topLetters,
            {
                y: (index) =>
                    index % 2 === 0 ? -24 : 24,

                opacity: 0,

                duration: 0.42,

                stagger: {
                    each: 0.018,
                    from: "start",
                },

                ease: "power3.in",
            },
            0
        );

        /* new letters enter */

        tl.to(
            bottomLetters,
            {
                y: 0,
                opacity: 1,

                duration: 0.55,

                stagger: {
                    each: 0.022,
                    from: "start",
                },

                ease: "back.out(1.7)",
            },
            0.12
        );

        /* first arrow exits */

        tl.to(
            arrowOne,
            {
                x: 24,
                y: -24,
                rotate: 12,
                opacity: 0,

                duration: 0.35,

                ease: "power3.in",
            },
            0.03
        );

        /* second arrow enters */

        tl.to(
            arrowTwo,
            {
                x: 0,
                y: 0,
                rotate: 0,
                opacity: 1,

                duration: 0.55,

                ease: "back.out(2)",
            },
            0.18
        );

        /* bottom signature */

        tl.to(
            signature,
            {
                width: 36,
                x: 5,

                duration: 0.45,

                ease: "power3.out",
            },
            0.08
        );

        /* right edge rises */

        tl.to(
            edge,
            {
                scaleY: 1,

                duration: 0.5,

                ease: "power4.inOut",
            },
            0
        );
    };

    const leaveAnimation = () => {
        const button = buttonRef.current;
        if (!button) return;

        const topLetters =
            button.querySelectorAll(".btn-letter-top");

        const bottomLetters =
            button.querySelectorAll(".btn-letter-bottom");

        const sweep =
            button.querySelector(".btn-sweep");

        const arrowOne =
            button.querySelector(".btn-arrow-one");

        const arrowTwo =
            button.querySelector(".btn-arrow-two");

        const signature =
            button.querySelector(".btn-signature");

        const edge =
            button.querySelector(".btn-edge");

        gsap.killTweensOf([
            topLetters,
            bottomLetters,
            sweep,
            arrowOne,
            arrowTwo,
            signature,
            edge,
        ]);

        const tl = gsap.timeline();

        /* current letters leave */

        tl.to(
            bottomLetters,
            {
                y: (index) =>
                    index % 2 === 0 ? 22 : -22,

                opacity: 0,

                duration: 0.3,

                stagger: {
                    each: 0.012,
                    from: "end",
                },

                ease: "power2.in",
            },
            0
        );

        /* original letters return */

        tl.to(
            topLetters,
            {
                y: 0,
                opacity: 1,

                duration: 0.45,

                stagger: {
                    each: 0.018,
                    from: "end",
                },

                ease: "power3.out",
            },
            0.08
        );

        /* background closes */

        tl.to(
            sweep,
            {
                scaleX: 0,

                duration: 0.5,

                ease: "power4.inOut",
            },
            0
        );

        /* second arrow leaves */

        tl.to(
            arrowTwo,
            {
                x: -22,
                y: 22,
                rotate: -12,
                opacity: 0,

                duration: 0.3,

                ease: "power2.in",
            },
            0
        );

        /* first arrow returns */

        tl.to(
            arrowOne,
            {
                x: 0,
                y: 0,
                rotate: 0,
                opacity: 1,

                duration: 0.5,

                ease: "back.out(1.8)",
            },
            0.12
        );

        tl.to(
            signature,
            {
                width: 11,
                x: 0,

                duration: 0.4,

                ease: "power3.out",
            },
            0
        );

        tl.to(
            edge,
            {
                scaleY: 0,

                duration: 0.4,

                ease: "power3.inOut",
            },
            0
        );
    };

    return (
        <Link
            ref={buttonRef}
            href={href}
            onMouseEnter={enterAnimation}
            onMouseLeave={leaveAnimation}
            className={`
                group
                relative
                inline-flex
                h-[54px]
                w-fit
                items-center
                overflow-hidden

                bg-modura-primary

                ${className}
            `}
        >
            {/* =========================================
                ANIMATED BACKGROUND SWEEP
            ========================================== */}

            <span
                className="
                    btn-sweep

                    pointer-events-none
                    absolute
                    inset-0

                    origin-left
                    scale-x-0

                    bg-modura-secondary-dark
                "
            />

            {/* =========================================
                TEXT AREA
            ========================================== */}

            <span
                className="
                    relative
                    z-20

                    flex
                    h-full

                    items-center

                    overflow-hidden

                    pl-5
                    pr-5
                "
            >
                {/* NATURAL WIDTH HOLDER */}

                <span
                    aria-hidden="true"
                    className="
                        invisible

                        whitespace-nowrap

                        text-[12px]
                        font-bold
                        uppercase
                        tracking-[0.09em]
                    "
                >
                    {title}
                </span>

                {/* ORIGINAL TITLE */}

                <span
                    className="
                        absolute
                        left-5
                        top-1/2

                        flex

                        -translate-y-1/2

                        whitespace-nowrap

                        text-[12px]
                        font-bold
                        uppercase
                        tracking-[0.09em]

                        text-modura-white
                    "
                >
                    {title.split("").map((letter, index) => (
                        <span
                            key={`original-${index}`}
                            className="
                                btn-letter-top
                                inline-block
                            "
                        >
                            {letter === " "
                                ? "\u00A0"
                                : letter}
                        </span>
                    ))}
                </span>

                {/* ENTERING TITLE */}

                <span
                    className="
                        absolute
                        left-5
                        top-1/2

                        flex

                        -translate-y-1/2

                        whitespace-nowrap

                        text-[12px]
                        font-bold
                        uppercase
                        tracking-[0.09em]

                        text-modura-white
                    "
                >
                    {title.split("").map((letter, index) => (
                        <span
                            key={`enter-${index}`}
                            className="
                                btn-letter-bottom

                                inline-block

                                translate-y-[24px]
                                opacity-0
                            "
                        >
                            {letter === " "
                                ? "\u00A0"
                                : letter}
                        </span>
                    ))}
                </span>
            </span>

            {/* =========================================
                ARROW AREA
            ========================================== */}

            <span
                className="
                    relative
                    z-20

                    flex

                    h-full
                    w-[52px]

                    shrink-0

                    items-center
                    justify-center

                    overflow-hidden

                    border-l
                    border-modura-secondary-dark
                "
            >
                {/* ORIGINAL ARROW */}

                <FiArrowUpRight
                    className="
                        btn-arrow-one

                        absolute

                        text-[17px]
                        text-modura-white
                    "
                />

                {/* ENTERING ARROW */}

                <FiArrowUpRight
                    className="
                        btn-arrow-two

                        absolute

                        -translate-x-[22px]
                        translate-y-[22px]
                        -rotate-12

                        opacity-0

                        text-[17px]
                        text-modura-white
                    "
                />
            </span>

            {/* =========================================
                BOTTOM SIGNATURE
            ========================================== */}

            <span
                className="
                    btn-signature

                    pointer-events-none

                    absolute
                    bottom-[7px]
                    left-5
                    z-30

                    h-[2px]
                    w-[11px]

                    bg-modura-secondary-light
                "
            />

            {/* =========================================
                RIGHT EDGE
            ========================================== */}

            <span
                className="
                    btn-edge

                    pointer-events-none

                    absolute
                    bottom-0
                    right-0
                    z-30

                    h-full
                    w-[2px]

                    origin-bottom
                    scale-y-0

                    bg-modura-secondary-light
                "
            />
        </Link>
    );
}