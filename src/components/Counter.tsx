// "use client";

// import { useEffect, useRef, useState } from "react";

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";


// gsap.registerPlugin(ScrollTrigger);



// const stats = [

// {
// value:11000,
// title:"Projects Completed",
// desc:"Commercial & Industrial"
// },

// {
// value:2500,
// title:"Happy Clients",
// desc:"Worldwide Partners"
// },

// {
// value:180,
// title:"Qualified Engineers",
// desc:"BIM & Structural Team"
// },

// {
// value:17,
// title:"Years Experience",
// desc:"Engineering Excellence"
// },

// {
// value:40,
// title:"Countries Served",
// desc:"Global Delivery"
// }

// ];





// function CounterNumber({
// value
// }:{
// value:number
// }){


// const [count,setCount]=useState(0);



// useEffect(()=>{


// let start = 0;

// const duration = 2000;

// const increment = value / (duration / 20);



// const timer = setInterval(()=>{


// start += increment;



// if(start >= value){

// setCount(value);

// clearInterval(timer);

// }
// else{

// setCount(Math.floor(start));

// }



// },20);



// return()=>clearInterval(timer);



// },[value]);




// return <>{count.toLocaleString()}</>;

// }



// export default function StatsCounter(){



// const sectionRef = useRef<HTMLDivElement>(null);



// useEffect(()=>{


// const ctx = gsap.context(()=>{


// gsap.fromTo(

// ".stat-panel",

// {
// opacity:0,
// y:70,
// scale:0.92
// },


// {

// opacity:1,

// y:0,

// scale:1,

// duration:1,

// stagger:0.15,

// ease:"power3.out",


// scrollTrigger:{

// trigger:sectionRef.current,

// start:"top 80%",

// toggleActions:"play none none none"

// }


// }


// );



// ScrollTrigger.refresh();



// },sectionRef);



// return()=>ctx.revert();



// },[]);








// return(


// <section

// ref={sectionRef}

// className="
// relative
// overflow-hidden
// bg-modura-primary
// py-16
// "

// >





// {/* Background */}

// <div className="
// absolute
// inset-0

// bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=90')]

// bg-cover

// bg-center

// scale-110

// opacity-30

// "
// />



// <div className="
// relative
// z-10

// max-w-7xl

// mx-auto

// px-6

// lg:px-10

// ">




// <div className="
// grid

// grid-cols-1

// sm:grid-cols-2

// lg:grid-cols-5

// gap-6

// items-center

// ">






// {
// stats.map((item,index)=>(


// <div

// key={index}

// className={`
// stat-panel

// group

// relative

// h-[210px]

// bg-white/10

// backdrop-blur-xl

// border

// border-white/20

// p-7

// overflow-hidden

// will-change-transform

// transition-all

// duration-700


// hover:bg-white/20

// hover:-translate-y-5


// ${index % 2 === 0
// ? "lg:mt-0"
// : "lg:mt-12"
// }

// `}

// >






// {/* top animated border */}


// <div className="
// absolute

// top-0

// left-0

// h-[2px]

// w-0

// bg-modura-secondary-light

// group-hover:w-full

// transition-all

// duration-700

// "/>





// {/* right animated border */}


// <div className="
// absolute

// top-0

// right-0

// h-0

// w-[2px]

// bg-modura-secondary-light

// group-hover:h-full

// transition-all

// duration-700

// "/>



// {/* Number */}


// <h3 className="
// relative

// font-heading

// text-6xl

// font-bold

// text-white

// group-hover:text-modura-secondary-light

// transition-all

// duration-500

// ">


// <CounterNumber

// value={item.value}

// />


// <span className="
// text-modura-secondary-light
// ">

// +

// </span>


// </h3>









// <div className="
// mt-5

// h-[2px]

// w-10

// bg-modura-secondary-light

// group-hover:w-20

// transition-all

// duration-500

// "/>









// <p className="
// mt-5

// font-body

// text-xs

// uppercase

// tracking-[3px]

// text-white

// leading-5

// ">

// {item.title}

// </p>





// <p className="
// mt-2

// font-body

// text-[11px]

// text-white/60

// ">

// {item.desc}

// </p>







// {/* corner */}

// <div className="
// absolute

// bottom-0

// left-0

// h-10

// w-10

// border-l

// border-b

// border-modura-secondary-light

// "/>





// </div>


// ))
// }



// </div>







// </div>





// </section>


// )

// }

"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CounterData {
  projectCompleted?: number;
  happyClient?: number;
  qualifiedEngineers?: number;
  yearsExperience?: number;
  countriesServed?: number;
}

interface StatsCounterProps {
  counter?: CounterData | null;
}

interface Stat {
  value: number;
  title: string;
  desc: string;
}

function CounterNumber({
  value,
}: {
  value: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const duration = 2000;
    const increment = value / (duration / 20);

    // If value is 0, directly show 0
    if (value <= 0) {
      setCount(0);
      return;
    }

    const timer = setInterval(() => {
      start += increment;

      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [value]);

  return <>{count.toLocaleString()}</>;
}

export default function StatsCounter({
  counter,
}: StatsCounterProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  /*
   * API data only
   * If API data is missing, value will be 0.
   */
  const stats: Stat[] = [
    {
      value: Number(counter?.projectCompleted ?? 0),
      title: "Projects Completed",
      desc: "Commercial & Industrial",
    },
    {
      value: Number(counter?.happyClient ?? 0),
      title: "Happy Clients",
      desc: "Worldwide Partners",
    },
    {
      value: Number(counter?.qualifiedEngineers ?? 0),
      title: "Qualified Engineers",
      desc: "BIM & Structural Team",
    },
    {
      value: Number(counter?.yearsExperience ?? 0),
      title: "Years Experience",
      desc: "Engineering Excellence",
    },
    {
      value: Number(counter?.countriesServed ?? 0),
      title: "Countries Served",
      desc: "Global Delivery",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stat-panel",
        {
          opacity: 0,
          y: 70,
          scale: 0.92,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-modura-primary
        py-16
      "
    >
      {/* Background */}

      <div
        className="
          absolute
          inset-0
          scale-110
          bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=90')]
          bg-cover
          bg-center
          opacity-30
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-6
          lg:px-10
        "
      >
        <div
          className="
            grid
            grid-cols-1
            items-center
            gap-6
            sm:grid-cols-2
            lg:grid-cols-5
          "
        >
          {stats.map((item, index) => (
            <div
              key={item.title}
              className={`
                stat-panel
                group
                relative
                h-[210px]
                overflow-hidden
                border
                border-white/20
                bg-white/10
                p-7
                backdrop-blur-xl
                will-change-transform
                transition-all
                duration-700
                hover:-translate-y-5
                hover:bg-white/20

                ${
                  index % 2 === 0
                    ? "lg:mt-0"
                    : "lg:mt-12"
                }
              `}
            >
              {/* Top animated border */}

              <div
                className="
                  absolute
                  left-0
                  top-0
                  h-[2px]
                  w-0
                  bg-modura-secondary-light
                  transition-all
                  duration-700
                  group-hover:w-full
                "
              />

              {/* Right animated border */}

              <div
                className="
                  absolute
                  right-0
                  top-0
                  h-0
                  w-[2px]
                  bg-modura-secondary-light
                  transition-all
                  duration-700
                  group-hover:h-full
                "
              />

              {/* Number */}

              <h3
                className="
                  relative
                  font-heading
                  text-6xl
                  font-bold
                  text-white
                  transition-all
                  duration-500
                  group-hover:text-modura-secondary-light
                "
              >
                <CounterNumber value={item.value} />

                <span className="text-modura-secondary-light">
                  +
                </span>
              </h3>

              {/* Line */}

              <div
                className="
                  mt-5
                  h-[2px]
                  w-10
                  bg-modura-secondary-light
                  transition-all
                  duration-500
                  group-hover:w-20
                "
              />

              {/* Title */}

              <p
                className="
                  mt-5
                  font-body
                  text-xs
                  uppercase
                  leading-5
                  tracking-[3px]
                  text-white
                "
              >
                {item.title}
              </p>

              {/* Description */}

              <p
                className="
                  mt-2
                  font-body
                  text-[11px]
                  text-white/60
                "
              >
                {item.desc}
              </p>

              {/* Corner */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  h-10
                  w-10
                  border-b
                  border-l
                  border-modura-secondary-light
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}