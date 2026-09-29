"use client";

import Image from "next/image";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import {
Swiper,
SwiperSlide
} from "swiper/react";

import {
Autoplay
} from "swiper/modules";


import "swiper/css";
import { DraftingCompass } from "lucide-react";


gsap.registerPlugin(ScrollTrigger);



const testimonials=[

{
name:"David Anderson",
role:"Project Director",
company:"Global Construction Ltd.",
image:"https://randomuser.me/api/portraits/men/32.jpg",
text:"MODURA delivered exceptional architectural and engineering solutions with outstanding precision and professionalism."
},

{
name:"Sophia Williams",
role:"CEO",
company:"Urban Developers",
image:"https://randomuser.me/api/portraits/women/44.jpg",
text:"Their BIM coordination and project management approach helped us achieve better efficiency and quality."
},

{
name:"Michael Brown",
role:"Managing Partner",
company:"BuildTech International",
image:"https://randomuser.me/api/portraits/men/46.jpg",
text:"A reliable design partner who understands complex projects and delivers innovative solutions."
}

];





export default function Testimonials(){


const sectionRef = useRef<HTMLDivElement>(null);



useEffect(()=>{


const ctx = gsap.context(()=>{


gsap.from(".testimonial-content",{

opacity:0,

x:-80,

duration:1,

scrollTrigger:{

trigger:sectionRef.current,

start:"top 80%"

}

});




gsap.from(".testimonial-card",{

opacity:0,

y:80,

duration:1,

stagger:.2,

scrollTrigger:{

trigger:sectionRef.current,

start:"top 80%"

}

});



},sectionRef);



return()=>ctx.revert();



},[]);







return(


<section

ref={sectionRef}

className="
relative
overflow-hidden
bg-white
py-24
"

>


<div className="
max-w-7xl
mx-auto

px-6

lg:px-10

grid

lg:grid-cols-2

gap-16

items-center

">








{/* LEFT */}


<div className="
testimonial-content
">


<div className="
flex
items-center
gap-3
font-body
text-xs
uppercase
tracking-[5px]
text-modura-secondary
">


<DraftingCompass
size={20}
strokeWidth={1.5}
className="
text-modura-secondary
"
/>


<span>
Testimonials
</span>


</div>




<h2 className="
mt-5

font-heading

text-6xl

font-semibold

text-modura-primary

leading-tight

">


Trusted By

<span className="
text-modura-secondary
">

 Industry Leaders

</span>


</h2>





<p className="
mt-6

font-body

text-modura-gray-600

leading-8

max-w-md

">

Our commitment to precision,
innovation and quality has helped us
build long-term partnerships worldwide.

</p>




</div>



{/* RIGHT SLIDER */}



<div>


<Swiper

modules={[Autoplay]}

slidesPerView={1}

loop

autoplay={{

delay:4000,

disableOnInteraction:false

}}

speed={900}

>


{
testimonials.map((item,index)=>(


<SwiperSlide

key={index}

>


<div className="
testimonial-card

relative

bg-modura-off-white

p-10

border

border-modura-gray-200

"

>





{/* quote */}

<div className="
absolute

top-5

right-8

font-heading

text-8xl

text-modura-secondary/20

">

"

</div>







<p className="
relative

font-body

text-modura-gray-600

leading-8

text-lg

">

{item.text}

</p>








<div className="
mt-8

flex

items-center

gap-5

">


<div className="
relative

h-16

w-16

overflow-hidden

rounded-full

border-2

border-modura-secondary

">

<img

src={item.image}

alt={item.name}

className="
h-full
w-full
object-cover
"

/>


</div>






<div>


<h4 className="
font-heading

text-2xl

text-modura-primary

">

{item.name}

</h4>



<p className="
font-body

text-xs

uppercase

tracking-[2px]

text-modura-secondary

">

{item.role}

</p>



</div>



</div>









{/* project tag */}

<div className="
absolute

bottom-0

right-0

bg-modura-primary

px-6

py-3

text-white

font-body

text-xs

tracking-[2px]

uppercase

">

{item.company}

</div>






</div>


</SwiperSlide>


))
}



</Swiper>


</div>







</div>


</section>


)

}