import Image from "next/image";
import {
  Building2,
  Cuboid,
  Layers3,
  Settings,
  ArrowRight,
  DraftingCompass,
} from "lucide-react";

import about_building from "../assets/about-building.jpeg";
import blueprint from "../assets/blueprint.jpeg";
import AnimatedButton from "./AnimatedButton";


export default function About() {

return (

<section className="relative overflow-hidden bg-white py-16">



<div className="
mx-auto
max-w-7xl
px-6
lg:px-10
">


<div className="
grid
items-center
gap-12
lg:grid-cols-2
">





{/* LEFT */}

<div className="
relative
h-[500px]
">



{/* Main Image */}

<div className="
absolute
left-16
top-0
h-[390px]
w-[450px]
overflow-hidden
clip-main
">


<Image

src={about_building}

alt="building"

fill

className="
object-cover
"

/>


</div>





{/* Blueprint */}

<div className="
absolute
bottom-5
left-5
h-[170px]
w-[220px]
overflow-hidden
border-8
border-white
shadow-xl
clip-blueprint
">


<Image

src={blueprint}

alt="blueprint"

fill

className="object-cover"

/>


</div>





</div>







{/* RIGHT */}


<div>


<div className="
flex
items-center
gap-3
uppercase
tracking-[5px]
text-xs
font-bold
text-modura-secondary
mb-4
">
<DraftingCompass
size={24}
className="
text-modura-secondary
"
/>

About Us

</div>





<h2 className="
mt-4
font-heading
text-5xl
lg:text-6xl
font-semibold
text-modura-primary
">


Building Tomorrow

<br/>

<span className="
text-modura-secondary
">

Through Smart Design

</span>


</h2>






<p className="
mt-6
max-w-xl
leading-8
font-body
text-modura-gray-600
">


MODURA Design Group is a multidisciplinary
architecture and engineering consultancy
delivering innovative solutions across
Architecture, BIM, Structural Design and
Project Management.


<br/><br/>


We combine creativity, technology and
technical expertise to create functional,
sustainable and future-ready spaces.


</p>

<div
    className="
        hero-button
        mt-8
        w-fit
    "
>
    <AnimatedButton
        href="/about"
        title="Learn More"
    />
</div>


</div>


</div>


</div>


</section>

)

}