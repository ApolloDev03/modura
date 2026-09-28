"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiArrowUpRight,
} from "react-icons/fi";

import {
    FaLinkedinIn,
    FaInstagram,
    FaFacebookF,
} from "react-icons/fa";


import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";


import logo from "../assets/logo.jpeg";


gsap.registerPlugin(
    ScrollTrigger
);



const menus = [

    {
        title:"Services",
        links:[
            "Architecture",
            "Structural Engineering",
            "BIM Services",
            "MEP Engineering"
        ]
    },

    {
        title:"Company",
        links:[
            "About Us",
            "Our Team",
            "Career",
            "Contact"
        ]
    },

    {
        title:"Explore",
        links:[
            "Portfolio",
            "Blog",
            "FAQ",
            "Inquiry"
        ]
    }

];




export default function Footer(){

const footerRef = useRef(null);



useGSAP(()=>{


const ctx = gsap.context(()=>{


gsap.from(
".blue-line",
{
scaleX:0,
duration:1.2,
ease:"power4.out",
scrollTrigger:{
trigger:footerRef.current,
start:"top 85%"
}
}
);



gsap.from(
".footer-animate",
{
opacity:0,
y:35,
duration:.9,
stagger:.08,
ease:"power4.out",

scrollTrigger:{
trigger:footerRef.current,
start:"top 80%"
}

}
);



},
footerRef);



return ()=>ctx.revert();



},[]);





return (

<footer
ref={footerRef}

className="
bg-white
overflow-hidden
text-modura-primary
"
>



<div
className="
max-w-[1500px]
mx-auto
px-6
lg:px-12
"
>


{/* TOP BLUEPRINT LINE */}

<div
className="
relative
h-[30px]
"
>

<span
className="
blue-line
absolute
top-0
left-0
right-0
h-px
bg-modura-border
"
/>


<span
className="
absolute
right-0
top-0
h-[15px]
w-px
bg-modura-secondary
"
/>


</div>





{/* MAIN FOOTER */}


<div
className="
grid
gap-12

lg:grid-cols-[1.1fr_1.8fr_1fr]

py-10
"
>



{/* =====================
 BRAND
===================== */}


<div
className="
footer-animate
relative

lg:pr-12
"
>


<div
className="
relative

h-[70px]
w-[230px]
"
>

<Image

src={logo}

alt="Modura"

fill

sizes="230px"

className="
object-contain
object-left
"

/>

</div>




<p
className="
mt-6

max-w-[330px]

text-sm
leading-7

text-modura-gray-600
"
>

Architecture, engineering,
BIM and detailing solutions
built for precise project
delivery.

</p>




<div
className="
mt-7
flex
gap-3
"
>


<Social>
<FaLinkedinIn/>
</Social>


<Social>
<FaInstagram/>
</Social>


<Social>
<FaFacebookF/>
</Social>


</div>





<div
className="
absolute
right-0
top-0
hidden
lg:block

h-full
w-px
bg-modura-border
"
/>


</div>








{/* =====================
MENU GRID
===================== */}


<div
className="
grid

grid-cols-3

gap-8

footer-animate

lg:px-10
"
>


{
menus.map((menu)=>(

<div
key={menu.title}
>


<h4
className="
mb-6

text-[10px]

font-bold

uppercase

tracking-[0.2em]
"
>

{menu.title}

</h4>




<div
className="
flex
flex-col
gap-4
"
>


{
menu.links.map((item)=>(

<Link

href="#"

key={item}

className="
group

flex
items-center

text-sm

text-modura-gray-600

hover:text-modura-primary

transition-all

"
>


<span
className="
w-0

h-px

bg-modura-secondary

transition-all

duration-500

group-hover:w-5

group-hover:mr-2

"
/>


{item}



<FiArrowUpRight

className="
ml-1

opacity-0

text-xs

transition-all

group-hover:opacity-100

"

/>



</Link>


))

}



</div>



</div>


))

}



</div>








{/* =====================
CONTACT
===================== */}



<div
className="
footer-animate

relative

lg:pl-10
"
>


<div
className="
absolute
left-0
top-0

hidden
lg:block

h-full
w-px

bg-modura-border
"
/>





<h4
className="
mb-7

text-[10px]

font-bold

uppercase

tracking-[0.2em]
"
>

Contact

</h4>




<Contact

icon={<FiMail/>}

title="Email"

value="info@modura.com"

/>



<Contact

icon={<FiPhone/>}

title="Phone"

value="+1 000 000 000"

/>




<Contact

icon={<FiMapPin/>}

title="Location"

value="USA Project Support"

/>




</div>



</div>








{/* =====================
BOTTOM
===================== */}



<div
className="
footer-animate

border-t

border-modura-border

py-5

flex

flex-col

gap-4

md:flex-row

md:justify-between

md:items-center

"
>



<div
className="
flex
gap-6

text-xs

text-modura-gray-500
"
>

<Link href="#">
Privacy Policy
</Link>


<Link href="#">
Terms
</Link>


</div>





<div
className="
flex
items-center
gap-5
"
>


<span
className="
text-xs

text-modura-gray-500
"
>

© 2026 Modura Design Group

</span>




<div
className="
flex
gap-3
"
>


<Social>
<FaLinkedinIn/>
</Social>


<Social>
<FaInstagram/>
</Social>


<Social>
<FaFacebookF/>
</Social>


</div>



</div>




</div>






</div>



</footer>


)

}






/* =========================
CONTACT COMPONENT
========================= */


function Contact({
icon,
title,
value
}:any){


return (

<div
className="
flex
gap-4
mb-5
"
>


<div
className="
h-10
w-10

flex
items-center
justify-center

border

border-modura-border

text-modura-secondary
"
>

{icon}

</div>



<div>


<p
className="
text-[9px]

uppercase

tracking-widest

text-modura-gray-400
"
>

{title}

</p>


<p
className="
text-sm

font-medium

mt-1
"
>

{value}

</p>


</div>



</div>

)

}






/* =========================
SOCIAL
========================= */


function Social({
children
}:{
children:React.ReactNode
}){


return (

<a

href="#"

className="
h-9
w-9

flex
items-center
justify-center

border

border-modura-border

text-sm

transition-all

hover:bg-modura-primary

hover:text-white

"

>

{children}

</a>


)

}