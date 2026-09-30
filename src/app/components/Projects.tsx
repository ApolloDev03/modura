// "use client";

// import Image from "next/image";

// import {
// Swiper,
// SwiperSlide
// } from "swiper/react";

// import {
// Autoplay,
// EffectCoverflow
// } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/effect-coverflow";


// import AnimatedButton from "./AnimatedButton";



// const projects=[

// {
// title:"Commercial Tower",
// place:"Dubai",
// image:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=90"
// },

// {
// title:"Corporate Campus",
// place:"Singapore",
// image:"https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=90"
// },

// {
// title:"Airport Terminal",
// place:"Hong Kong",
// image:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=90"
// },

// {
// title:"Luxury Residence",
// place:"Mumbai",
// image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=90"
// },

// {
// title:"Urban Structure",
// place:"Global",
// image:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=90"
// }

// ];




// export default function Projects(){


// return(

// <section className="
// bg-white
// py-24
// overflow-hidden
// ">


// <div className="
// max-w-full
// mx-auto
// px-6
// lg:px-10
// ">





// {/* Header */}

// <div className="
// flex
// justify-between
// items-end
// mb-14
// ">


// <div>

// <p className="
// font-body
// text-xs
// uppercase
// tracking-[5px]
// text-modura-secondary
// ">

// Portfolio

// </p>


// <h2 className="
// mt-4
// font-heading
// text-6xl
// text-modura-primary
// ">

// Our

// <span className="
// text-modura-secondary
// ">
//  Projects
// </span>

// </h2>


// </div>



// <AnimatedButton

// href="/projects"

// title="View All Projects"

// />



// </div>








// <Swiper

// modules={[
// Autoplay,
// EffectCoverflow
// ]}


// effect="coverflow"


// centeredSlides={true}


// slidesPerView={"auto"}


// loop={true}


// speed={1000}


// autoplay={{

// delay:3000,

// disableOnInteraction:false

// }}


// coverflowEffect={{

// rotate:0,

// stretch:0,

// depth:180,

// modifier:1,

// slideShadows:false

// }}



// className="
// projects-slider
// "

// >



// {
// projects.map((item,index)=>(

// <SwiperSlide

// key={index}

// className="
// !w-[360px]
// lg:!w-[430px]
// "

// >

// <div className="
// project-card
// group
// relative
// h-[360px]
// overflow-hidden
// cursor-pointer
// "
// >


// {/* Image */}

// <Image

// src={item.image}

// alt={item.title}

// fill

// className="
// object-cover
// transition-all
// duration-1000
// group-hover:scale-110
// "

// />


// {/* Overlay */}

// <div className="
// absolute
// inset-0
// bg-gradient-to-t
// from-modura-primary/90
// via-modura-primary/20
// to-transparent
// "
// />


// {/* Corner Line */}

// <div className="
// absolute
// top-5
// right-5
// h-12
// w-12
// border-t
// border-r
// border-white/50
// group-hover:w-20
// group-hover:h-20
// transition-all
// duration-700
// "/>







// {/* Bottom Content */}

// <div className="
// absolute
// bottom-5
// left-5
// right-5
// bg-white
// p-5
// translate-y-8
// transition-all
// duration-700
// group-hover:translate-y-0
// "
// >


// <div className="
// flex
// items-center
// justify-between
// "
// >


// <p className="
// font-body
// text-[10px]
// uppercase
// tracking-[4px]
// text-modura-secondary
// ">

// {item.place}

// </p>



// <span className="
// h-[1px]
// w-8
// bg-modura-secondary
// "/>


// </div>





// <h3 className="
// mt-3
// font-heading
// text-3xl
// text-modura-primary
// ">

// {item.title}

// </h3>



// </div>



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
SwiperSlide
} from "swiper/react";

import {
Autoplay,
EffectCoverflow
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";


import AnimatedButton from "./AnimatedButton";
import { DraftingCompass } from "lucide-react";



const projects=[

{
title:"Commercial Tower",
place:"Dubai",
image:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=90"
},

{
title:"Corporate Campus",
place:"Singapore",
image:"https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=90"
},

{
title:"Airport Terminal",
place:"Hong Kong",
image:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=90"
},

{
title:"Luxury Residence",
place:"Mumbai",
image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=90"
},

{
title:"Urban Structure",
place:"Global",
image:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=90"
}

];




export default function Projects(){


return(

<section className="
bg-white
py-16
overflow-hidden
">


<div className="
max-w-7xl
mx-auto
px-6
lg:px-10
">





{/* Header */}

<div className="
flex
justify-between
items-end
mb-14
">


<div>



<div className="
flex
items-center
gap-3
font-body
text-xs
uppercase
font-bold
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
Portfolio
</span>


</div>


<h2 className="
mt-4
font-heading
text-5xl
lg:text-6xl
font-semibold
text-modura-primary
">

Our

<span className="
font-heading
text-modura-secondary ml-2
">

Projects

</span>


</h2>



</div>




<div className="
font-body
">

<AnimatedButton

href="/projects"

title="View All Projects"

/>

</div>



</div>



<Swiper

modules={[
Autoplay,
EffectCoverflow
]}


effect="coverflow"

centeredSlides={true}

slidesPerView={"auto"}

loop={true}

speed={1000}

autoplay={{

delay:3000,

disableOnInteraction:false

}}


coverflowEffect={{

rotate:0,

stretch:0,

depth:180,

modifier:1,

slideShadows:false

}}


className="
projects-slider
"

>



{
projects.map((item,index)=>(


<SwiperSlide

key={index}

className="
!w-[360px]
lg:!w-[430px]
"

>


<div className="
project-card
group
relative
h-[360px]
overflow-hidden
cursor-pointer
"
>



<Image

src={item.image}

alt={item.title}

fill

className="
object-cover
transition-all
duration-1000
group-hover:scale-110
"

/>






<div className="
absolute
inset-0
bg-gradient-to-t
from-modura-primary/90
via-modura-primary/20
to-transparent
"
/>







<div className="
absolute
top-5
right-5
h-12
w-12
border-t
border-r
border-white/50
group-hover:w-20
group-hover:h-20
transition-all
duration-700
"/>








<div className="
absolute
bottom-5
left-5
right-5
bg-white
p-5
translate-y-8
transition-all
duration-700
group-hover:translate-y-0
"
>



<div className="
flex
items-center
justify-between
"
>



<p className="
font-body
text-[10px]
uppercase
tracking-[4px]
text-modura-secondary
">

{item.place}

</p>




<span className="
h-[1px]
w-8
bg-modura-secondary
"/>



</div>







<h3 className="
mt-3
font-heading
text-3xl
font-semibold
text-modura-primary
">

{item.title}

</h3>



</div>




</div>


</SwiperSlide>


))
}


</Swiper>


</div>


</section>

)

}