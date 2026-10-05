"use client";



import Image, { StaticImageData } from "next/image";

import {

    useCallback,

    useEffect,

    useRef,

    useState,

} from "react";



import {

    FiArrowLeft,

    FiArrowRight,

    FiBox,

    FiGrid,

    FiLayers,

} from "react-icons/fi";



import gsap from "gsap";

import { useGSAP } from "@gsap/react";

import { flushSync } from "react-dom";



import AnimatedButton from "./AnimatedButton";



import banner1 from "../assets/images/banner1.jpeg";

import banner2 from "../assets/images/banner2.jpeg";

import banner3 from "../assets/images/banner3.jpeg";



gsap.registerPlugin(useGSAP);






type Slide = {

    category: string;

    kicker: string;



    smallTitle: string;

    focusTitle: string;



    bottomTitle: string;

    bottomFocus: string;



    description: string;



    image: StaticImageData;



    href: string;



    icon: React.ElementType;

};






const slides: Slide[] = [

    {

        category: "Architecture",



        kicker: "Architectural Engineering",



        smallTitle: "Design",

        focusTitle: "With Purpose.",



        bottomTitle: "Build With",

        bottomFocus: "Clarity.",



        description:

            "Architectural design and documentation developed around constructability, coordination and real-world project requirements.",



        image: banner1,



        href: "/services/architectural-engineering",



        icon: FiGrid,

    },



    {

        category: "BIM",



        kicker: "Building Information Modeling",



        smallTitle: "Connect",

        focusTitle: "Every Detail.",



        bottomTitle: "Coordinate",

        bottomFocus: "Before Site.",



        description:

            "Integrated BIM workflows connecting architecture, structure and building systems before construction begins.",



        image: banner2,



        href: "/services/building-information-modeling",



        icon: FiLayers,

    },



    {

        category: "Structural",



        kicker: "Structural Engineering",



        smallTitle: "Engineer",

        focusTitle: "The Detail.",



        bottomTitle: "Strengthen",

        bottomFocus: "The Whole.",



        description:

            "Structural engineering and detailing focused on accuracy, constructability and dependable project delivery.",



        image: banner3,



        href: "/services/structural-engineering",



        icon: FiBox,

    },

];






export default function Hero() {

    const heroRef = useRef<HTMLElement>(null);



    const activeRef = useRef(0);

    const lockedRef = useRef(false);



    const autoplayRef =

        useRef<ReturnType<typeof setInterval> | null>(null);



    const [active, setActive] = useState(0);



    const [previous, setPrevious] =

        useState<number | null>(null);



    const [locked, setLocked] =

        useState(false);



    const slide = slides[active];



    const previousSlide =

        previous !== null

            ? slides[previous]

            : null;



    const SlideIcon = slide.icon;






    useGSAP(

        () => {

            const root = heroRef.current;



            if (!root) return;



            const image =

                root.querySelector(

                    ".hero-current-image"

                );



            const kicker =

                root.querySelector(

                    ".hero-kicker"

                );



            const titles =

                root.querySelectorAll(

                    ".hero-title-part"

                );



            const description =

                root.querySelector(

                    ".hero-description"

                );



            const button =

                root.querySelector(

                    ".hero-button"

                );



            const arrows =

                root.querySelectorAll(

                    ".hero-edge-arrow"

                );





            gsap.set(image, {

                scale: 1.08,

                opacity: 0,

            });



            gsap.set(kicker, {

                opacity: 0,

                x: -55,

            });



            gsap.set(titles, {

                opacity: 0,

                x: -80,

            });



            gsap.set(description, {

                opacity: 0,

                x: -60,

            });



            gsap.set(button, {

                opacity: 0,

                x: -50,

            });



            gsap.set(arrows, {

                opacity: 0,

            });






            const tl = gsap.timeline();



            tl.to(

                image,

                {

                    scale: 1,

                    opacity: 1,

                    duration: 1.4,

                    ease: "power4.out",

                },

                0

            );



            tl.to(

                kicker,

                {

                    opacity: 1,

                    x: 0,

                    duration: 1.25,

                    ease: "power4.out",

                },

                0

            );



            tl.to(

                titles,

                {

                    opacity: 1,

                    x: 0,

                    duration: 1.35,

                    stagger: 0,

                    ease: "power4.out",

                },

                0

            );



            tl.to(

                description,

                {

                    opacity: 1,

                    x: 0,

                    duration: 1.25,

                    ease: "power4.out",

                },

                0

            );



            tl.to(

                button,

                {

                    opacity: 1,

                    x: 0,

                    duration: 1.2,

                    ease: "power4.out",

                },

                0

            );



            tl.to(

                arrows,

                {

                    opacity: 1,

                    duration: 0.9,

                    ease: "power3.out",

                },

                0

            );

        },

        {

            scope: heroRef,

        }

    );






useGSAP(

    () => {

        const root = heroRef.current;



        if (!root) return;



        const image =

            root.querySelector(".hero-current-image");



        const kicker =

            root.querySelector(".hero-kicker");



        const titles =

            root.querySelectorAll<HTMLElement>(

                ".hero-title-part"

            );



        const description =

            root.querySelector(".hero-description");



        const button =

            root.querySelector(".hero-button");



        const arrows =

            root.querySelectorAll(

                ".hero-edge-arrow"

            );



   



        const title1 = titles[0];

        const title2 = titles[1];

        const title3 = titles[2];

        const title4 = titles[3];



      



        gsap.set(image, {

            scale: 1.08,

            opacity: 0,

        });






        gsap.set(kicker, {

            opacity: 0,

            x: -55,

        });



        gsap.set(title1, {

            opacity: 0,



            x: -55,



            clipPath:

                "inset(0 100% 0 0)",

        });





        gsap.set(title2, {

            opacity: 0,



            y: 60,



            clipPath:

                "inset(100% 0 0 0)",



            letterSpacing:

                "-0.08em",

        });



     



        gsap.set(title3, {

            opacity: 0,



            x: 45,



            clipPath:

                "inset(0 0 0 100%)",

        });






        gsap.set(title4, {

            opacity: 0,



            y: 45,



            clipPath:

                "polygon(0 100%, 100% 82%, 100% 100%, 0 100%)",

        });






        gsap.set(description, {

            opacity: 0,

            x: -60,

        });






        gsap.set(button, {

            opacity: 0,

            x: -50,

        });






        gsap.set(arrows, {

            opacity: 0,

        });





        const tl = gsap.timeline();



      


        tl.to(

            image,

            {

                scale: 1,



                opacity: 1,



                duration: 1.4,



                ease: "power4.out",

            },

            0

        );





        tl.to(

            kicker,

            {

                opacity: 1,



                x: 0,



                duration: 1.25,



                ease: "power4.out",

            },

            0

        );




        tl.to(

            title1,

            {

                opacity: 1,



                x: 0,



                clipPath:

                    "inset(0 0% 0 0)",



                duration: 1.3,



                ease: "expo.out",

            },

            0

        );






        tl.to(

            title2,

            {

                opacity: 1,



                y: 0,



                clipPath:

                    "inset(0% 0 0 0)",



                letterSpacing:

                    "-0.045em",



                duration: 1.45,



                ease: "expo.out",

            },

            0

        );






        tl.to(

            title3,

            {

                opacity: 1,



                x: 0,



                clipPath:

                    "inset(0 0 0 0%)",



                duration: 1.3,



                ease: "expo.out",

            },

            0

        );






        tl.to(

            title4,

            {

                opacity: 1,



                y: 0,



                clipPath:

                    "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",



                duration: 1.45,



                ease: "expo.out",

            },

            0

        );




        tl.to(

            description,

            {

                opacity: 1,



                x: 0,



                duration: 1.25,



                ease: "power4.out",

            },

            0

        );




        tl.to(

            button,

            {

                opacity: 1,



                x: 0,



                duration: 1.2,



                ease: "power4.out",

            },

            0

        );






        tl.to(

            arrows,

            {

                opacity: 1,



                duration: 0.9,



                ease: "power3.out",

            },

            0

        );

    },

    {

        scope: heroRef,

    }

);






const changeSlide = useCallback(

    (

        targetIndex: number,

        direction: "next" | "prev"

    ) => {

        if (

            lockedRef.current ||

            targetIndex === activeRef.current ||

            !heroRef.current

        ) {

            return;

        }



        lockedRef.current = true;



        setLocked(true);



        const oldIndex =

            activeRef.current;





        flushSync(() => {

            setPrevious(oldIndex);

            setActive(targetIndex);

        });



        activeRef.current =

            targetIndex;



        const root =

            heroRef.current;



        if (!root) {

            lockedRef.current = false;



            setLocked(false);



            return;

        }



      


        const newImage =

            root.querySelector(

                ".hero-current-image"

            );



        const oldImage =

            root.querySelector(

                ".hero-previous-image"

            );



        const kicker =

            root.querySelector(

                ".hero-kicker"

            );



        const titles =

            root.querySelectorAll<HTMLElement>(

                ".hero-title-part"

            );



        const description =

            root.querySelector(

                ".hero-description"

            );



        const button =

            root.querySelector(

                ".hero-button"

            );



        const title1 = titles[0];

        const title2 = titles[1];

        const title3 = titles[2];

        const title4 = titles[3];



   


        gsap.set(newImage, {

            clipPath:

                direction === "next"

                    ? "inset(0 0 0 100%)"

                    : "inset(0 100% 0 0)",



            scale: 1.07,



            xPercent:

                direction === "next"

                    ? 2

                    : -2,

        });





        gsap.set(kicker, {

            opacity: 0,



            x:

                direction === "next"

                    ? 55

                    : -55,

        });



     


        gsap.set(title1, {

            opacity: 0,



            x:

                direction === "next"

                    ? -55

                    : 55,



            clipPath:

                direction === "next"

                    ? "inset(0 100% 0 0)"

                    : "inset(0 0 0 100%)",

        });




        gsap.set(title2, {

            opacity: 0,



            y:

                direction === "next"

                    ? 60

                    : -60,



            clipPath:

                direction === "next"

                    ? "inset(100% 0 0 0)"

                    : "inset(0 0 100% 0)",



            letterSpacing:

                "-0.08em",

        });





        gsap.set(title3, {

            opacity: 0,



            x:

                direction === "next"

                    ? 45

                    : -45,



            clipPath:

                direction === "next"

                    ? "inset(0 0 0 100%)"

                    : "inset(0 100% 0 0)",

        });



  

        gsap.set(title4, {

            opacity: 0,



            y:

                direction === "next"

                    ? 45

                    : -45,



            clipPath:

                direction === "next"

                    ? "polygon(0 100%, 100% 82%, 100% 100%, 0 100%)"

                    : "polygon(0 0%, 100% 0%, 100% 18%, 0 0%)",

        });



 


        gsap.set(description, {

            opacity: 0,



            x:

                direction === "next"

                    ? 60

                    : -60,

        });



     


        gsap.set(button, {

            opacity: 0,



            x:

                direction === "next"

                    ? 50

                    : -50,

        });



     



        const tl = gsap.timeline({

            onComplete: () => {

                setPrevious(null);



                lockedRef.current = false;



                setLocked(false);

            },

        });





        tl.to(

            newImage,

            {

                clipPath:

                    "inset(0 0% 0 0%)",



                scale: 1,



                xPercent: 0,



                duration: 1.4,



                ease: "power4.inOut",

            },

            0

        );



    



        if (oldImage) {

            tl.to(

                oldImage,

                {

                    scale: 1.06,



                    xPercent:

                        direction === "next"

                            ? -3

                            : 3,



                    duration: 1.4,



                    ease: "power4.inOut",

                },

                0

            );

        }



      



        tl.to(

            kicker,

            {

                opacity: 1,



                x: 0,



                duration: 1.3,



                ease: "power4.out",

            },

            0

        );



       


        tl.to(

            title1,

            {

                opacity: 1,



                x: 0,



                clipPath:

                    "inset(0 0% 0 0)",



                duration: 1.3,



                ease: "expo.out",

            },

            0

        );



     



        tl.to(

            title2,

            {

                opacity: 1,



                y: 0,



                clipPath:

                    "inset(0% 0 0 0)",



                letterSpacing:

                    "-0.045em",



                duration: 1.45,



                ease: "expo.out",

            },

            0

        );



      
    


        tl.to(

            title3,

            {

                opacity: 1,



                x: 0,



                clipPath:

                    "inset(0 0 0 0%)",



                duration: 1.3,



                ease: "expo.out",

            },

            0

        );






        tl.to(

            title4,

            {

                opacity: 1,



                y: 0,



                clipPath:

                    "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",



                duration: 1.45,



                ease: "expo.out",

            },

            0

        );



     



        tl.to(

            description,

            {

                opacity: 1,



                x: 0,



                duration: 1.3,



                ease: "power4.out",

            },

            0

        );



       



        tl.to(

            button,

            {

                opacity: 1,



                x: 0,



                duration: 1.25,



                ease: "power4.out",

            },

            0

        );

    },

    []

);






    const nextSlide =

        useCallback(() => {

            const target =

                (activeRef.current + 1) %

                slides.length;



            changeSlide(

                target,

                "next"

            );

        }, [changeSlide]);



    



    const prevSlide =

        useCallback(() => {

            const target =

                activeRef.current === 0

                    ? slides.length - 1

                    : activeRef.current - 1;



            changeSlide(

                target,

                "prev"

            );

        }, [changeSlide]);






    useEffect(() => {

        autoplayRef.current =

            setInterval(() => {

                if (

                    !lockedRef.current

                ) {

                    const target =

                        (activeRef.current + 1) %

                        slides.length;



                    changeSlide(

                        target,

                        "next"

                    );

                }

            }, 6500);



        return () => {

            if (

                autoplayRef.current

            ) {

                clearInterval(

                    autoplayRef.current

                );



                autoplayRef.current =

                    null;

            }

        };

    }, [changeSlide]);



  



    return (

        <section

            ref={heroRef}

            className="

                relative

                isolate

                overflow-hidden



                bg-modura-primary-dark



                min-h-[540px]

                sm:min-h-[565px]

                lg:min-h-[590px]

                xl:min-h-[610px]

            "

        >

         



            <div className="absolute inset-0">






                {previousSlide && (

                    <div

                        className="

                            hero-previous-image

                            absolute

                            inset-0

                            z-[1]

                        "

                    >

                        <Image

                            src={

                                previousSlide.image

                            }

                            alt=""

                            fill

                            sizes="100vw"

                            className="

                                object-cover

                                object-center

                            "

                        />

                    </div>

                )}





                <div

                    key={`hero-image-${active}`}

                    className="

                        hero-current-image

                        absolute

                        inset-0

                        z-[2]

                    "

                >

                    <Image

                        src={slide.image}

                        alt={slide.category}

                        fill

                        priority={

                            active === 0

                        }

                        sizes="100vw"

                        className="

                            object-cover

                            object-center

                        "

                    />

                </div>





                <div

                    className="

                        pointer-events-none

                        absolute

                        inset-0

                        z-[3]

                    "

                    style={{

                        background:

                            "linear-gradient(90deg, rgba(0,0,0,0.98) 0%, rgba(17,17,17,0.95) 17%, rgba(17,17,17,0.84) 32%, rgba(17,17,17,0.58) 46%, rgba(17,17,17,0.28) 60%, rgba(17,17,17,0.08) 74%, rgba(17,17,17,0) 88%)",

                    }}

                />





                <div

                    className="

                        pointer-events-none

                        absolute

                        bottom-0

                        left-0

                        right-0

                        z-[4]

                        h-[100px]



                        bg-gradient-to-t

                        from-modura-primary-dark

                        to-transparent

                    "

                />






                <div

                    className="

                        pointer-events-none

                        absolute

                        inset-0

                        z-[4]



                        bg-modura-primary-dark/40



                        lg:hidden

                    "

                />

            </div>



        



            <div

                className="

                    relative

                    z-20



                    mx-auto

                    flex



                    min-h-[540px]

                    max-w-[1600px]



                    items-center



                    px-[64px]

                    py-[55px]



                    sm:min-h-[565px]

                    sm:px-[90px]

                    sm:py-[60px]



                    lg:min-h-[590px]

                    lg:px-[6%]

                    lg:py-[65px]



                    xl:min-h-[610px]

                    xl:py-[70px]

                "

            >

                <div

                    key={`hero-content-${active}`}

                    className="

                        w-full

                        max-w-[860px]

                    "

                >



                    <div

                        className="

                            hero-kicker



                            mb-5



                            flex

                            items-center

                            gap-3

                        "

                    >

                        <div

                            className="

                                flex



                                h-[38px]

                                w-[38px]



                                shrink-0



                                items-center

                                justify-center



                                bg-modura-secondary



                                text-modura-white



                                backdrop-blur-sm

                            "

                        >

                            <SlideIcon

                                className="

                                    text-[17px]

                                "

                            />

                        </div>



                        <div>

                            <span

                                className="

                                    block



                                    text-[9px]

                                    font-bold

                                    uppercase



                                    tracking-[0.24em]



                                    text-modura-secondary-light



                                    sm:text-[10px]

                                "

                            >

                                Modura Design Group

                            </span>



                            <span

                                className="

                                    mt-[3px]

                                    block



                                    text-[11px]

                                    font-semibold

                                    uppercase



                                    tracking-[0.12em]



                                    text-modura-gray-200



                                    sm:text-[12px]

                                "

                            >

                                {slide.kicker}

                            </span>

                        </div>

                    </div>





                    <div

                        className="

                            relative

                            max-w-[860px]

                        "

                    >



                        <div className="overflow-hidden">

                            <h1

                                className="

                                    hero-title-part



                                    font-heading



                                    text-[40px]

                                    font-medium

                                    uppercase



                                    leading-[0.9]



                                    tracking-[-0.025em]



                                    text-modura-white



                                    sm:text-[50px]

                                    md:text-[56px]

                                    lg:text-[62px]

                                    xl:text-[66px]

                                "

                            >

                                {

                                    slide.smallTitle

                                }

                            </h1>

                        </div>






                        <div

                            className="

                                overflow-hidden

                                pb-[6px]

                            "

                        >

                            <h2

                                className="

                                    hero-title-part



                                    font-heading



                                    text-[58px]

                                    font-bold

                                    uppercase



                                    leading-[0.82]



                                    tracking-[-0.045em]



                                    text-modura-secondary-light



                                    sm:text-[72px]

                                    md:text-[82px]

                                    lg:text-[88px]

                                    xl:text-[94px]

                                "

                            >

                                {

                                    slide.focusTitle

                                }

                            </h2>

                        </div>





                        <div

                            className="

                                mt-2



                                sm:ml-[65px]

                                lg:ml-[95px]

                            "

                        >

                            <div className="overflow-hidden">

                                <h3

                                    className="

                                        hero-title-part



                                        font-heading



                                        text-[28px]

                                        font-medium

                                        uppercase



                                        leading-none



                                        tracking-[-0.015em]



                                        text-modura-gray-300



                                        sm:text-[34px]

                                        lg:text-[38px]

                                    "

                                >

                                    {

                                        slide.bottomTitle

                                    }

                                </h3>

                            </div>



                            <div className="overflow-hidden">

                                <h3

                                    className="

                                        hero-title-part



                                        font-heading



                                        text-[42px]

                                        font-semibold

                                        uppercase



                                        leading-[0.88]



                                        tracking-[-0.03em]



                                        text-modura-white



                                        sm:text-[50px]

                                        lg:text-[56px]

                                    "

                                >

                                    {

                                        slide.bottomFocus

                                    }

                                </h3>

                            </div>

                        </div>

                    </div>



                



                    <div

                        className="

                            hero-description



                            mt-5



                            max-w-[550px]



                            sm:mt-6

                        "

                    >

                        <p

                            className="

                                text-[13px]



                                leading-[1.75]



                                text-modura-gray-300



                                sm:text-[14px]

                            "

                        >

                            {

                                slide.description

                            }

                        </p>

                    </div>



                 


              <div

    className="

        hero-button

        mt-5

        w-fit

    "

>

    <AnimatedButton

        href={slide.href}

        title="Explore Services"

    />

</div>



                </div>

            </div>



         



            <div

                className="

                    hero-edge-arrow

                    absolute



                    left-[14px]

                    sm:left-[20px]

                    lg:left-[28px]



                    top-1/2

                    z-30



                    -translate-y-1/2

                "

            >

                <EdgeArrow

                    direction="left"

                    onClick={prevSlide}

                    disabled={locked}

                />

            </div>






            <div

                className="

                    hero-edge-arrow

                    absolute



                    right-[14px]

                    sm:right-[20px]

                    lg:right-[28px]



                    top-1/2

                    z-30



                    -translate-y-1/2

                "

            >

                <EdgeArrow

                    direction="right"

                    onClick={nextSlide}

                    disabled={locked}

                />

            </div>

        </section>

    );

}





function EdgeArrow({

    direction,

    onClick,

    disabled,

}: {

    direction: "left" | "right";

    onClick: () => void;

    disabled: boolean;

}) {

    const Icon =

        direction === "left"

            ? FiArrowLeft

            : FiArrowRight;



    const isLeft =

        direction === "left";



    return (

        <button

            type="button"

            onClick={onClick}

            disabled={disabled}

            aria-label={

                isLeft

                    ? "Previous slide"

                    : "Next slide"

            }

            className="

                group/nav

                relative



                flex

                h-[54px]

                w-[54px]



                items-center

                justify-center



                rounded-full



                disabled:pointer-events-none

                disabled:opacity-40



                sm:h-[58px]

                sm:w-[58px]

            "

        >



            <span

                className="

                    absolute

                    inset-[-5px]



                    rounded-full



                    bg-modura-primary-dark/30



                    backdrop-blur-[2px]



                    transition-all

                    duration-500



                    group-hover/nav:inset-[-7px]

                    group-hover/nav:bg-modura-primary-dark/30

                "

            />



            <span

                className="

                    absolute

                    inset-0



                    rounded-full



                    border

                    border-modura-secondary-light



                    transition-all

                    duration-700



                    ease-[cubic-bezier(.76,0,.24,1)]



                    group-hover/nav:rotate-180

                    group-hover/nav:border-modura-secondary-light

                "

            />




            <span

                className="

                    absolute

                    inset-[5px]



                    rounded-full



                    border

                    border-modura-secondary/60



                    transition-transform

                    duration-700



                    ease-[cubic-bezier(.76,0,.24,1)]



                    group-hover/nav:-rotate-[135deg]

                "

                style={{

                    clipPath:

                        "polygon(0 0, 68% 0, 68% 18%, 100% 18%, 100% 82%, 68% 82%, 68% 100%, 0 100%, 0 72%, 18% 72%, 18% 28%, 0 28%)",

                }}

            />




            <span

                className="

                    absolute

                    inset-[9px]



                    rounded-full



                    bg-modura-primary



                    shadow-[0_5px_20px_rgba(6,19,34,0.35)]



                    backdrop-blur-md



                    transition-all

                    duration-500



                    group-hover/nav:scale-[1.08]

                    group-hover/nav:bg-modura-secondary

                "

            />




            <span

                className="

                    absolute



                    left-1/2

                    top-[-2px]



                    z-10



                    h-[5px]

                    w-[5px]



                    -translate-x-1/2



                    rounded-full



                    bg-modura-gray-200



                    transition-all

                    duration-700



                    group-hover/nav:top-[calc(100%-3px)]

                "

            />




            <span

                className="

                    relative

                    z-20



                    h-[22px]

                    w-[25px]



                    overflow-hidden

                "

            >




                <Icon

                    className={`

                        absolute

                        left-1/2

                        top-1/2



                        text-[17px]

                        text-modura-white



                        -translate-x-1/2

                        -translate-y-1/2



                        transition-all

                        duration-500



                        ease-[cubic-bezier(.76,0,.24,1)]



                        ${

                            isLeft

                                ? "group-hover/nav:-translate-x-[32px] group-hover/nav:opacity-0"

                                : "group-hover/nav:translate-x-[16px] group-hover/nav:opacity-0"

                        }

                    `}

                />





                <Icon

                    className={`

                        absolute

                        top-1/2



                        -translate-y-1/2



                        text-[17px]

                        text-modura-white



                        opacity-0



                        transition-all

                        duration-500



                        ease-[cubic-bezier(.76,0,.24,1)]



                        ${

                            isLeft

                                ? "left-[35px] group-hover/nav:left-1/2 group-hover/nav:-translate-x-1/2 group-hover/nav:opacity-100"

                                : "-left-[15px] group-hover/nav:left-1/2 group-hover/nav:-translate-x-1/2 group-hover/nav:opacity-100"

                        }

                    `}

                />

            </span>

        </button>

    );

}