"use client";

import {
 useEffect,
 useState
} from "react";

import Image from "next/image";

import {
 Factory,
 Building2,
 Settings,
 Droplets,
 Truck,
 ArrowRight,
 DraftingCompass
} from "lucide-react";

import {
 motion,
 AnimatePresence
} from "framer-motion";


import oil from "../assets/oil.jpeg";
import infrastructure from "../assets/infrastructure.jpeg";
import steel from "../assets/steel.jpeg";
import water from "../assets/water.jpeg";
import transport from "../assets/transport.jpeg";
import manufacturing from "../assets/manufacturing.jpeg";


const industries = [

{
 title:"OIL & GAS",
 sub:"Energy Infrastructure",
 image:oil
},

{
 title:"INFRASTRUCTURE",
 sub:"Building Connections",
 image:infrastructure
},

{
 title:"STEEL & METAL",
 sub:"Industrial Solutions",
 image:steel
},

{
 title:"WATER TREATMENT",
 sub:"Sustainable Resources",
 image:water
},

{
 title:"TRANSPORTATION",
 sub:"Moving Forward",
 image:transport
},

{
 title:"MANUFACTURING",
 sub:"Advanced Production",
 image:manufacturing
}

];



const icons=[
 Factory,
 Building2,
 Settings,
 Droplets,
 Truck,
 Factory
];



const circleCards=[

{
 position:"top-5 left-1/2 -translate-x-1/2",
 index:0
},

{
 position:"top-32 right-5",
 index:1
},

{
 position:"top-32 left-5",
 index:2
},

{
 position:"bottom-32 left-5",
 index:3
},

{
 position:"bottom-32 right-5",
 index:4
},

{
 position:"bottom-5 left-1/2 -translate-x-1/2",
 index:5
}

];



export default function Industries(){


const [active,setActive]=useState(0);



useEffect(()=>{

const timer=setInterval(()=>{

setActive((prev)=>
prev === industries.length-1
?0
:prev+1
)

},4500);


return()=>clearInterval(timer);


},[]);



return(

<section className="
relative
overflow-hidden
bg-modura-off-white
py-16
">


<div className="
max-w-7xl
mx-auto
px-6
lg:px-8
">


<div className="
grid
lg:grid-cols-[400px_1fr]
gap-16
items-center
">



{/* LEFT */}

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
OUR EXPERTISE
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

Industries 

<span className="
block
text-modura-secondary
">

We Serve

</span>

</h2>



<p className="
font-body
mt-8
text-modura-gray-600
leading-7
max-w-sm
">

Delivering innovative and sustainable engineering solutions across diverse industries worldwide.

</p>




<div className="
relative
mt-12
h-[520px]
overflow-y-auto
scrollbar-hide
space-y-4
pr-4
">


<div className="
absolute
left-7
top-5
bottom-5
w-px
bg-modura-border
"/>



{
industries.map((item,index)=>{

const Icon=icons[index];


return(

<motion.button

key={index}

onClick={()=>setActive(index)}

whileHover={{
x:8
}}

className={`
relative
z-10
w-full
flex
items-center
gap-5
px-6
py-5
rounded-full
transition-all
duration-500

${
active===index
?
"bg-modura-primary text-white shadow-xl"
:
"text-modura-primary hover:bg-white"
}

`}

>


<div className={`
w-12
h-12
rounded-full
flex
items-center
justify-center
border

${
active===index
?
"bg-[#c49a45] border-[#c49a45]"
:
"bg-white border-modura-border"
}

`}>

<Icon size={22}/>

</div>



<div className="
text-left
">

<h4 className="
font-heading
text-lg
font-semibold
">

{item.title}

</h4>


<p className="
font-body
text-sm
opacity-70
">

{item.sub}

</p>


</div>



<ArrowRight
size={20}
className="ml-auto"
/>


</motion.button>

)

})

}


</div>


</div>
{/* RIGHT SECTION */}


<div className="
relative
h-[720px]
flex
items-center
justify-center
">



{/* CUSTOM ORBIT DESIGN */}

<div className="
absolute
w-[560px]
h-[560px]
rounded-full
border
border-[#c49a45]/30
">


<div className="
absolute
top-1/2
left-0
-translate-y-1/2
w-3
h-3
rounded-full
bg-[#c49a45]
"/>


<div className="
absolute
top-1/2
right-0
-translate-y-1/2
w-3
h-3
rounded-full
bg-[#c49a45]
"/>


</div>



<div className="
absolute
w-[430px]
h-[430px]
rounded-full
bg-white/60
shadow-inner
"/>







{/* IMAGE CARDS */}


{
circleCards.map((card,index)=>(


<motion.div


key={index}


onClick={()=>setActive(card.index)}


whileHover={{
scale:1.08,
y:-8
}}



transition={{
duration:.4
}}


className={`

absolute

${card.position}

w-[200px]

h-[140px]

overflow-hidden


bg-white


shadow-xl


border-[6px]

border-white


clip-industry


cursor-pointer


z-20

`}


>


<Image

src={industries[card.index].image}

alt={industries[card.index].title}

fill

sizes="200px"

className="
object-cover
"

/>


</motion.div>



))

}



{/* CENTER IMAGE AREA */}



<div className="

relative

w-[370px]

h-[370px]


rounded-full


overflow-hidden


border-[12px]


border-white


ring-8

ring-[#c49a45]/20


shadow-2xl


z-30

">


<AnimatePresence mode="wait">


<motion.div


key={active}


initial={{

opacity:0,

scale:1.15

}}


animate={{

opacity:1,

scale:1

}}


transition={{

duration:.7

}}


className="
absolute
inset-0
"

>


<Image

src={industries[active].image}

alt={industries[active].title}

fill

sizes="370px"

className="
object-cover
"

/>



<div className="

absolute

inset-0


bg-gradient-to-t

from-modura-primary/90

via-modura-primary/30

to-transparent

"/>



</motion.div>


</AnimatePresence>





<div className="

absolute

bottom-14

left-0

right-0


text-center


text-white


z-40

">


<h3 className="

font-heading

text-4xl

font-bold

tracking-wide

">


{industries[active].title}


</h3>



<p className="

font-body

mt-3

text-sm

uppercase

tracking-[4px]

">


{industries[active].sub}


</p>


</div>



</div>


</div>
</div>

</div>


</section>

)

}