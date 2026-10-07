"use client";

import type { ElementType } from "react";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  FileText,
  HardHat,
  Layers3,
  MapPin,
  Ruler,
  Send,
  Users,
} from "lucide-react";

import AnimatedButton from "@/app/components/AnimatedButton";
import Breadcrumb from "../components/Breadcrumb";

/* =========================================================
   JOB DATA
========================================================= */

const jobs = [
  {
    icon: Ruler,
    title: "Revit Modeler – Architecture",
    department: "Architecture / BIM",
    experience: "2+ Years",
    type: "Full Time",
    location: "Ahmedabad",
    vacancy: "02",

    description:
      "We are looking for candidates with strong knowledge of Revit Architecture to support international and offshore projects. The ideal candidate should be comfortable working with architectural BIM models, drawings and project documentation.",

    skills: [
      "Good knowledge of Revit Architecture.",
      "Knowledge of AutoCAD will be an added advantage.",
      "Experience working with architectural BIM projects.",
      "Understanding of architectural drawings and documentation.",
      "Ability to coordinate with project teams and other disciplines.",
    ],

    responsibilities: [
      "Develop and manage architectural BIM models using Revit.",
      "Create detailed architectural components including walls, floors, doors and families.",
      "Prepare accurate construction drawings and documentation.",
    ],

    qualification:
      "B.Arch, Diploma in Architecture or ITI Draftsman with good technical knowledge.",
  },

  {
    icon: Layers3,
    title: "Revit Modeler – Structure",
    department: "Structural BIM",
    experience: "2+ Years",
    type: "Full Time",
    location: "Ahmedabad",
    vacancy: "02",

    description:
      "We are seeking a skilled Revit Structure Modeler to work on structural BIM projects. The ideal candidate should have strong knowledge of structural modeling and project documentation.",

    skills: [
      "Good knowledge of Revit Structure.",
      "Knowledge of AutoCAD will be an added advantage.",
      "Understanding of structural drawings and detailing.",
      "Experience with reinforcement modeling.",
      "Ability to coordinate with project teams.",
    ],

    responsibilities: [
      "Develop detailed structural BIM models using Revit.",
      "Create structural components and reinforcement models.",
      "Prepare structural drawings and project documentation.",
      "Coordinate structural information with other disciplines.",
    ],

    qualification:
      "B.E. / Diploma in Civil Engineering or ITI Draftsman.",
  },

  {
    icon: Building2,
    title: "Structural Design Engineer",
    department: "Structural Engineering",
    experience: "3–5 Years",
    type: "Full Time",
    location: "Ahmedabad",
    vacancy: "01",

    description:
      "We are looking for an experienced Structural Design Engineer capable of independently handling structural design, analysis and coordination for engineering projects.",

    skills: [
      "Expertise in structural analysis and design.",
      "Good knowledge of RCC and steel structures.",
      "Experience with STAAD.Pro, ETABS or SAFE.",
      "Good understanding of Indian design codes.",
      "Knowledge of high-rise structural design will be an added advantage.",
    ],

    responsibilities: [
      "Study architectural and consultant drawings.",
      "Perform analysis, design and detailing of structural elements.",
      "Prepare structural calculations and design documentation.",
      "Coordinate with architects and consultants.",
      "Review structural drawings before project submission.",
    ],

    qualification:
      "M.E. / M.Tech in Structural Engineering or B.E. / B.Tech in Civil Engineering.",
  },

  {
    icon: HardHat,
    title: "Steel Structure Modeler",
    department: "Steel Detailing / BIM",
    experience: "3–5 Years",
    type: "Full Time",
    location: "Ahmedabad",
    vacancy: "02",

    description:
      "We are looking for a Steel Structure Modeler with strong knowledge of Tekla and steel detailing. The candidate should be comfortable working with Indian and international standards.",

    skills: [
      "Good knowledge of Tekla Structures.",
      "Understanding of steel structures and connections.",
      "Knowledge of Indian and international standards.",
      "Experience in structural steel modeling.",
      "Knowledge of AutoCAD will be an added advantage.",
    ],

    responsibilities: [
      "Create detailed steel structure models in Tekla.",
      "Review design drawings and project information.",
      "Create accurate connections and structural components.",
      "Prepare erection and assembly drawings.",
      "Coordinate with engineering and project teams.",
    ],

    qualification:
      "ITI Draftsman, Diploma in Civil / Mechanical Engineering or Bachelor's degree.",
  },
];

/* =========================================================
   CAREER PAGE
========================================================= */

export default function CareerSection() {
  return (
    <>
      <Breadcrumb title="Career" />

      <main className="bg-white">

        {/* =====================================================
            CAREER INTRO
        ===================================================== */}

        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">

            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

              {/* LEFT */}

              <div>
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    font-body
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[4px]
                    text-modura-secondary
                  "
                >
                  <BriefcaseBusiness
                    size={18}
                    strokeWidth={1.5}
                  />

                  <span>Careers</span>
                </div>

                <h1
                  className="
                    mt-6
                    font-heading
                    text-6xl
                    font-semibold
                    uppercase
                    leading-[0.88]
                    text-modura-primary
                    md:text-7xl
                    lg:text-[90px]
                  "
                >
                  Build{" "}
                  <span className="text-modura-secondary">
                    Your
                  </span>

                  <br />

                  Future
                </h1>
              </div>

              {/* RIGHT */}

              <div className="lg:pl-12">

                <div
                  className="
                    border-l-2
                    border-modura-secondary
                    pl-7
                  "
                >
                  <span
                    className="
                      font-body
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[4px]
                      text-modura-secondary
                    "
                  >
                    Join Our Team
                  </span>

                  <p
                    className="
                      mt-5
                      max-w-xl
                      font-body
                      text-base
                      leading-7
                      text-modura-gray-600
                    "
                  >
                    At Modura Design Group, our people are at
                    the heart of everything we create. We bring
                    together architects, engineers, BIM
                    specialists and project professionals to
                    deliver precise and innovative solutions.
                  </p>

                  <p
                    className="
                      mt-5
                      max-w-xl
                      font-body
                      text-base
                      leading-7
                      text-modura-gray-600
                    "
                  >
                    If you are passionate about design,
                    engineering and technology, explore our
                    current opportunities and become part of
                    our growing team.
                  </p>

                  <div className="mt-8">
                    <AnimatedButton
                      href="#openings"
                      title="View Openings"
                    />
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            WHY JOIN
        ===================================================== */}

        <section className="bg-modura-primary">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">

            <div className="grid md:grid-cols-3">

              <CareerFeature
                icon={Users}
                title="Collaborative"
                text="Work alongside experienced architects, engineers and BIM professionals."
              />

              <CareerFeature
                icon={BriefcaseBusiness}
                title="Meaningful Work"
                text="Be part of challenging projects that create real value for our clients."
              />

              <CareerFeature
                icon={ArrowUpRight}
                title="Professional Growth"
                text="Develop your technical skills and grow your career with our team."
              />

            </div>

          </div>
        </section>


        {/* =====================================================
            CURRENT OPENINGS
        ===================================================== */}

        <section
          id="openings"
          className="
            scroll-mt-24
            bg-modura-off-white
            py-16
            md:py-20
          "
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-10">

            {/* HEADER */}

            <div
              className="
                mb-14
                flex
                flex-col
                gap-7
                lg:flex-row
                lg:items-end
                lg:justify-between
              "
            >

              <div>

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    font-body
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[4px]
                    text-modura-secondary
                  "
                >
                  <FileText
                    size={18}
                    strokeWidth={1.5}
                  />

                  <span>Opportunities</span>
                </div>

                <h2
                  className="
                    mt-5
                    font-heading
                    text-5xl
                    font-semibold
                    uppercase
                    leading-[0.88]
                    text-modura-primary
                    md:text-7xl
                  "
                >
                  Current

                  <span className="ml-3 text-modura-secondary">
                    Openings
                  </span>
                </h2>

              </div>

              <p
                className="
                  max-w-md
                  font-body
                  text-base
                  leading-7
                  text-modura-gray-600
                "
              >
                Explore our current opportunities and find
                the role that matches your experience, skills
                and career goals.
              </p>

            </div>


            {/* JOB SECTIONS */}

            <div className="space-y-8">

              {jobs.map((job, index) => (
                <JobCard
                  key={`${job.title}-${index}`}
                  job={job}
                />
              ))}

            </div>

          </div>
        </section>


        {/* =====================================================
            APPLICATION SECTION
        ===================================================== */}

        <section
          id="apply"
          className="
            scroll-mt-24
            bg-white
            py-16
            md:py-20
          "
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-10">

            <div
              className="
                grid
                gap-14
                lg:grid-cols-[0.65fr_1.35fr]
              "
            >

              {/* LEFT */}

              <div>

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    font-body
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[4px]
                    text-modura-secondary
                  "
                >
                  <Send size={17} />

                  <span>Start Your Journey</span>
                </div>

                <h2
                  className="
                    mt-5
                    font-heading
                    text-6xl
                    font-semibold
                    uppercase
                    leading-[0.88]
                    text-modura-primary
                    md:text-7xl
                  "
                >
                  Apply

                  <br />

                  <span className="text-modura-secondary">
                    Now.
                  </span>
                </h2>

                <p
                  className="
                    mt-6
                    max-w-sm
                    font-body
                    text-base
                    leading-7
                    text-modura-gray-600
                  "
                >
                  Don't see the right opening? Send us your
                  profile and we will consider you for future
                  opportunities.
                </p>

              </div>


              {/* FORM */}

              <CareerForm />

            </div>

          </div>
        </section>

      </main>
    </>
  );
}


/* =========================================================
   JOB CARD
========================================================= */

function JobCard({
  job,
}: {
  job: (typeof jobs)[number];
}) {
  return (
    <article
      className="
        group
        overflow-hidden
        border
        border-modura-gray-200
        bg-white
        transition-all
        duration-500
        hover:border-modura-secondary
        hover:shadow-xl
      "
    >

      {/* TOP HEADER */}

      <div
        className="
          border-b
          border-modura-gray-200
          px-6
          py-7
          md:px-10
          md:py-8
        "
      >

        <div
          className="
            flex
            flex-col
            gap-5
            md:flex-row
            md:items-center
          "
        >

          {/* ICON */}

          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              border
              border-modura-secondary
              bg-modura-off-white
              text-modura-secondary
              transition-all
              duration-300
              group-hover:bg-modura-secondary
              group-hover:text-white
            "
          >
            <job.icon
              size={24}
              strokeWidth={1.5}
            />
          </div>


          {/* TITLE */}

          <div className="flex-1">

            <h3
              className="
                font-heading
                text-2xl
                font-semibold
                uppercase
                leading-tight
                text-modura-secondary
                md:text-3xl
              "
            >
              {job.title}
            </h3>

            <div
              className="
                mt-3
                flex
                flex-wrap
                items-center
                gap-x-3
                gap-y-2
                font-body
                text-[11px]
                font-semibold
                uppercase
                tracking-[1.5px]
                text-modura-gray-400
              "
            >
              <span>{job.department}</span>

              <span>•</span>

              <span>{job.experience}</span>

              <span>•</span>

              <span>{job.type}</span>
            </div>

          </div>


          {/* LOCATION */}

          <div
            className="
              flex
              items-center
              gap-2
              font-body
              text-sm
              text-modura-gray-500
            "
          >
            <MapPin size={16} />

            <span>{job.location}</span>
          </div>

        </div>

      </div>


      {/* JOB CONTENT */}

      <div
        className="
          grid
          gap-10
          px-6
          py-8
          md:px-10
          md:py-10
          lg:grid-cols-[1fr_280px]
        "
      >

        {/* LEFT CONTENT */}

        <div>

          <p
            className="
              max-w-5xl
              font-body
              text-base
              leading-8
              text-modura-gray-600
            "
          >
            {job.description}
          </p>


          <JobList
            title="Key Skills"
            items={job.skills}
          />


          <JobList
            title="Responsibilities"
            items={job.responsibilities}
          />


          {/* QUALIFICATION */}

          <div
            className="
              mt-9
              grid
              gap-5
              border-t
              border-modura-gray-200
              pt-7
              sm:grid-cols-3
            "
          >

            <InfoItem
              title="Qualification"
              value={job.qualification}
            />

            <InfoItem
              title="Experience"
              value={job.experience}
            />

            <InfoItem
              title="No. Of Vacancy"
              value={job.vacancy}
            />

          </div>

        </div>


        {/* RIGHT APPLY */}

        <div
          className="
            border-l
            border-modura-gray-200
            pl-0
            lg:pl-8
          "
        >

          <span
            className="
              font-body
              text-[10px]
              font-bold
              uppercase
              tracking-[3px]
              text-modura-secondary
            "
          >
            Interested?
          </span>


          <h4
            className="
              mt-4
              font-heading
              text-3xl
              font-semibold
              uppercase
              leading-[0.9]
              text-modura-primary
            "
          >
            Apply For

            <br />

            <span className="text-modura-secondary">
              This Role
            </span>
          </h4>


          <p
            className="
              mt-5
              font-body
              text-base
              leading-7
              text-modura-gray-600
            "
          >
            Take the next step in your career and become
            part of our growing team.
          </p>


          <div className="mt-7">
            <AnimatedButton
              href="#apply"
              title="Apply Now"
            />
          </div>

        </div>

      </div>

    </article>
  );
}


/* =========================================================
   JOB LIST
========================================================= */

function JobList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="mt-9">

      <h4
        className="
          font-heading
          text-xl
          font-semibold
          uppercase
          text-modura-primary
        "
      >
        {title}
      </h4>


      <div className="mt-5 space-y-4">

        {items.map((item) => (
          <div
            key={item}
            className="
              flex
              items-start
              gap-4
              font-body
              text-base
              leading-7
              text-modura-gray-600
            "
          >

            {/* SQUARE BULLET */}

            <span
              className="
                mt-[9px]
                h-2
                w-2
                shrink-0
                bg-modura-secondary
              "
            />

            <span>{item}</span>

          </div>
        ))}

      </div>

    </div>
  );
}


/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div>

      <span
        className="
          block
          font-body
          text-[10px]
          font-bold
          uppercase
          tracking-[2px]
          text-modura-secondary
        "
      >
        {title}
      </span>


      <p
        className="
          mt-2
          font-body
          text-base
          leading-7
          text-modura-gray-600
        "
      >
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   CAREER FEATURE
========================================================= */

function CareerFeature({
  icon: Icon,
  title,
  text,
}: {
  icon: ElementType;
  title: string;
  text: string;
}) {
  return (
    <div
      className="
        border-b
        border-white/10
        px-0
        py-10
        md:border-b-0
        md:px-8
        lg:px-10
      "
    >

      <div className="flex items-center justify-between">

        <Icon
          size={26}
          strokeWidth={1.5}
          className="text-modura-secondary"
        />

        <ArrowUpRight
          size={20}
          strokeWidth={1.5}
          className="text-white/40"
        />

      </div>


      <h3
        className="
          mt-7
          font-heading
          text-2xl
          font-semibold
          uppercase
          text-white
        "
      >
        {title}
      </h3>


      <p
        className="
          mt-4
          max-w-sm
          font-body
          text-base
          leading-7
          text-white/60
        "
      >
        {text}
      </p>

    </div>
  );
}


/* =========================================================
   APPLICATION FORM
========================================================= */

function CareerForm() {
  return (
    <form
      className="
        border-t-2
        border-modura-primary
        pt-8
      "
    >

      <div className="grid gap-8 md:grid-cols-2">

        <FormField
          label="Full Name"
          placeholder="Enter your name"
          required
        />

        <FormField
          label="Email Address"
          placeholder="Enter your email"
          type="email"
          required
        />

        <FormField
          label="Phone Number"
          placeholder="Enter your phone number"
          required
        />

        <FormField
          label="Experience"
          placeholder="e.g. 3 Years"
          required
        />


        {/* MESSAGE */}

        <div className="md:col-span-2">

          <label
            className="
              mb-3
              block
              font-body
              text-[13px]
              font-bold
              uppercase
              tracking-[2px]
              text-modura-gray-500
            "
          >
            Message
          </label>

          <textarea
            rows={5}
            placeholder="Tell us about yourself..."
            className="
              w-full
              resize-none
              border-b-2
              border-modura-gray-200
              bg-transparent
              px-1
              py-3
              font-body
              text-base
              leading-7
              text-modura-primary
              outline-none
              transition-colors
              placeholder:text-modura-gray-400
              focus:border-modura-secondary
            "
          />

        </div>


        {/* RESUME */}

        <div className="md:col-span-1">

          <label
            className="
              mb-3
              block
              font-body
              text-[13px]
              font-bold
              uppercase
              tracking-[2px]
              text-modura-gray-500
            "
          >
            Upload Resume
          </label>


          <label
            className="
              flex
              cursor-pointer
              items-center
              justify-between
              border
              border-dashed
              border-modura-gray-300
              px-5
              py-5
              transition-all
              duration-300
              hover:border-modura-secondary
              hover:bg-modura-off-white
            "
          >

            <div className="flex items-center gap-3">

              <FileText
                size={22}
                strokeWidth={1.5}
                className="text-modura-secondary"
              />

              <span
                className="
                  font-body
                  text-sm
                  text-modura-gray-500
                "
              >
                Upload your resume
              </span>

            </div>


            <ArrowUpRight
              size={19}
              className="text-modura-primary"
            />


            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
            />

          </label>


          <p
            className="
              mt-2
              font-body
              text-[12px]
              leading-5
              text-modura-gray-700
            "
          >
            Accepted formats: PDF, DOC, DOCX — Maximum
            file size 2MB
          </p>

        </div>

      {/* SUBMIT */}

      <div className="mt-9">

        <AnimatedButton
          href="#"
          title="Submit Application"
        />

      </div>
      </div>



    </form>
  );
}


/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>

      <label
        className="
          mb-3
          block
          font-body
          text-[13px]
          font-bold
          uppercase
          tracking-[2px]
          text-modura-gray-500
        "
      >

        {label}

        {required && (
          <span className="ml-1 text-modura-secondary">
            *
          </span>
        )}

      </label>


      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="
          h-14
          w-full
          border-b-2
          border-modura-gray-200
          bg-transparent
          px-1
          font-body
          text-base
          text-modura-primary
          outline-none
          transition-colors
          placeholder:text-modura-gray-400
          focus:border-modura-secondary
        "
      />

    </div>
  );
}