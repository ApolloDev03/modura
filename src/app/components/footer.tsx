"use client";

import Image from "next/image";

import {
Mail,
Phone,
MapPin
} from "lucide-react";


import {
LiaLinkedin
} from "react-icons/lia";

import {
BsInstagram
} from "react-icons/bs";

import {
FaFacebookF
} from "react-icons/fa6";


import {
useLayoutEffect,
useRef
} from "react";


import gsap from "gsap";


import logo from "../assets/images/logo.png";



export default function Footer(){


const footerRef = useRef<HTMLDivElement|null>(null);



useLayoutEffect(()=>{


const ctx = gsap.context(()=>{


gsap.from(".footer-item",
{
opacity:0,
y:50,
duration:1,
stagger:.15,
ease:"power3.out"
});


},footerRef);



return()=>ctx.revert();



},[]);





return(

<footer

ref={footerRef}

className="
relative
overflow-hidden
bg-white
text-modura-primary
"

>


<div
className="
absolute
top-0
left-0
w-full
h-[35px]
overflow-hidden
"
>

<svg
viewBox="0 0 1440 80"
className="
absolute
top-0
left-0
w-full
h-full
"
preserveAspectRatio="none"
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
max-w-7xl
mx-auto
px-6
pt-16
pb-12
grid
lg:grid-cols-12
gap-10

"

>








{/* LOGO */}



<div

className="
footer-item
lg:col-span-4
"

>


<div

className="
relative
w-[240px]
h-[100px]
"

>

<Image

src={logo}

alt="MVNL Engineering"

fill

className="
object-contain
object-left
"

/>


</div>

<p

className="
mt-6
max-w-sm
text-sm
leading-7
text-modura-gray-600
"

>

Delivering innovative and reliable engineering solutions through advanced technology, precision design and sustainable construction practices.

</p>



<h4

className="
my-3
font-heading
text-lg
font-bold
"

>

FOLLOW US

</h4>




<div

className="
flex
gap-4
"

>


{

[
LiaLinkedin,
BsInstagram,
FaFacebookF

].map((Icon,index)=>(


<div

key={index}

className="
social-reference
"

>

<Icon size={18}/>


</div>


))


}


</div>

</div>









{/* SERVICES */}



<div

className="
footer-item
lg:col-span-3
border-l
border-modura-border
pl-8
"

>


<h3

className="
font-heading
text-xl
font-bold
"

>

SERVICES

</h3>



<div className="
footer-title-line
"/>




<ul

className="
space-y-4
text-sm
text-modura-gray-600
"

>


<li className="footer-link">
Architecture Design
</li>


<li className="footer-link">
Structural Engineering
</li>


<li className="footer-link">
BIM Solutions
</li>


<li className="footer-link">
Project Management
</li>


<li className="footer-link">
MEP Engineering
</li>


<li className="footer-link">
Industrial Design
</li>


</ul>



</div>









{/* COMPANY */}



<div

className="
footer-item
lg:col-span-2
border-l
border-modura-border
pl-8
"

>


<h3

className="
font-heading
text-xl
font-bold
"

>

COMPANY

</h3>


<div className="
footer-title-line
"/>



<ul

className="
space-y-4
text-sm
text-modura-gray-600
"

>


<li className="footer-link">
About Us
</li>


<li className="footer-link">
Projects
</li>


<li className="footer-link">
Career
</li>


<li className="footer-link">
Contact
</li>


</ul>



</div>









{/* CONTACT */}



<div

className="
footer-item
lg:col-span-3
border-l
border-modura-border
pl-8
"

>


<h3

className="
font-heading
text-xl
font-bold
"

>

CONTACT

</h3>


<div className="
footer-title-line
"/>





<div

className="
space-y-5
text-sm
text-modura-gray-600
"

>



<div className="flex gap-3 items-center">

<span className="contact-icon">

<Mail size={16}/>

</span>


info@mvnengineering.com


</div>





<div className="flex gap-3 items-center">


<span className="contact-icon">

<Phone size={16}/>

</span>


+91 00000 00000


</div>







<div className="flex gap-3">


<span className="contact-icon">

<MapPin size={16}/>

</span>


<span>

Ahmedabad, Gujarat
<br/>
India

</span>


</div>



</div>










</div>






</div>










{/* BOTTOM */}



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
max-w-7xl
mx-auto
px-6
py-5
flex
justify-center
text-sm
text-modura-gray-600
"

>


<p>

© 2026 MVNL Engineering. All Rights Reserved.

</p>





</div>



</div>







</footer>

)

}