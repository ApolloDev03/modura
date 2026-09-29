"use client";

import Image from "next/image";

import {
  Swiper,
  SwiperSlide
} from "swiper/react";

import {
  Autoplay,
  FreeMode
} from "swiper/modules";


import "swiper/css";



const clients = [

{
image:
"https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=90"
},

{
image:
"https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=90"
},

{
image:
"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=90"
},

{
image:
"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=90"
},

{
image:
"https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=90"
},

{
image:
"https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=90"
}

];





export default function ClientLogoSlider(){


return(


<section className="
relative
w-full

overflow-hidden

bg-white

py-16

">





<Swiper

modules={[

Autoplay,

FreeMode

]}



loop={true}



freeMode={{

enabled:true,

momentum:false

}}



speed={6000}



autoplay={{

delay:0,

disableOnInteraction:false,

pauseOnMouseEnter:false

}}



slidesPerView={"auto"}



spaceBetween={30}



allowTouchMove={false}



className="
client-logo-slider
!overflow-visible
"

>





{

[...clients,...clients].map((item,index)=>(


<SwiperSlide

key={index}

className="
!w-[260px]
"

>


<div

className="
client-card

group

relative

h-[170px]

w-[240px]


overflow-hidden

cursor-pointer


transition-all

duration-700


hover:-translate-y-3

"

>







{/* Main Image */}

<Image

src={item.image}

alt="client"

fill


className="
object-cover


transition-all

duration-[1200ms]

ease-out


group-hover:scale-110

group-hover:rotate-1

"

/>








{/* Dark Glass Overlay */}

<div className="
absolute

inset-0


bg-modura-primary/40


opacity-0


group-hover:opacity-100


transition-all

duration-700

"/>








{/* Glass Shine Effect */}

<div className="

absolute

top-[-120%]

left-[-80%]


h-[250%]

w-[50%]


rotate-[35deg]


bg-white/30


blur-xl


transition-all

duration-[1200ms]


group-hover:left-[150%]

"

></div>








{/* Inner Frame */}

<div className="

absolute

inset-4


border

border-white/0


group-hover:border-white/70


transition-all

duration-700

"

></div>








{/* Top Left Corner */}

<div className="

absolute

top-0

left-0


h-10

w-10


border-t-2

border-l-2

border-modura-secondary


scale-0


group-hover:scale-100


transition-transform

duration-500

"

></div>








{/* Bottom Right Corner */}

<div className="

absolute

bottom-0

right-0


h-10

w-10


border-b-2

border-r-2

border-modura-secondary


scale-0


group-hover:scale-100


transition-transform

duration-500

"

></div>







</div>


</SwiperSlide>


))


}



</Swiper>





</section>


)

}