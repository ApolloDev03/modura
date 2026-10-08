"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
  type ElementType,
} from "react";

import axios from "axios";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  FileText,
  MapPin,
  Send,
  Users,
} from "lucide-react";

import Breadcrumb from "@/components/Breadcrumb";
import AnimatedButton from "@/components/AnimatedButton";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { apiUrl } from "../config";

/* =========================================================
   API TYPES
========================================================= */

interface Career {
  id: number;
  jobTitle: string;
  slug: string;
  department: string;
  experience: string;
  location: string;
  jobType: string;
  openings: number;
  lastDate: string;
  salary_range: string;
  description: string;
  requirements: string;
}

interface CareersResponse {
  success: boolean;
  message: string;
  data: Career[];
}

/* =========================================================
   CAREER PAGE
========================================================= */

export default function CareerSection() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  /* =======================================================
     FETCH CAREERS API
  ======================================================= */

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setLoading(true);

        const response = await axios.post<CareersResponse>(
          `${apiUrl}/careers`
        );

        if (response.data?.success) {
          setCareers(response.data.data || []);
        } else {
          setCareers([]);
        }
      } catch (error) {
        console.error("Career API Error:", error);
        setCareers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  return (
    <>
      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <Breadcrumb title="Career" />

      <main className="bg-white">

        {/* =================================================
            CAREER INTRO
        ================================================= */}

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

        {/* =================================================
            WHY JOIN
        ================================================= */}

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

        {/* =================================================
            CURRENT OPENINGS
        ================================================= */}

        <section
          id="openings"
          className="
            scroll-mt-24
            bg-modura-off-white
            py-16
            md:py-20
          "
        >

          <div className="mx-auto max-w-7xl px-6 ">

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

            {/* JOB LIST */}

            {loading ? (

              <div
                className="
                  border
                  border-modura-gray-200
                  bg-white
                  px-6
                  py-16
                  text-center
                "
              >
                <div className="flex flex-col items-center">

                  <div
                    className="
                      h-8
                      w-8
                      animate-spin
                      border-2
                      border-modura-gray-200
                      border-t-modura-secondary
                    "
                  />

                  <p
                    className="
                      mt-5
                      font-body
                      text-sm
                      text-modura-gray-500
                    "
                  >
                    Loading current openings...
                  </p>

                </div>
              </div>

            ) : careers.length === 0 ? (

              <div
                className="
                  border
                  border-modura-gray-200
                  bg-white
                  px-6
                  py-16
                  text-center
                "
              >
                <FileText
                  size={35}
                  strokeWidth={1.5}
                  className="mx-auto text-modura-secondary"
                />

                <p
                  className="
                    mt-5
                    font-body
                    text-sm
                    text-modura-gray-500
                  "
                >
                  No current openings available.
                </p>

              </div>

            ) : (

              <div className="space-y-8">

                {careers.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                  />
                ))}

              </div>

            )}

          </div>

        </section>

        {/* =================================================
            APPLICATION SECTION
        ================================================= */}

        <section
          id="apply"
          className="
            scroll-mt-24
            bg-white
            py-16
            md:py-20
          "
        >

          <div className="mx-auto max-w-7xl px-6 ">

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

              <CareerForm
                careers={careers}
              />

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
  job: Career;
}) {
  const jobType =
    job.jobType === "full_time"
      ? "Full Time"
      : job.jobType === "part_time"
      ? "Part Time"
      : job.jobType?.replaceAll("_", " ");

  const requirements = job.requirements
    ? job.requirements
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

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

            <BriefcaseBusiness
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
              {job.jobTitle}
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

              <span>
                {job.department}
              </span>

              <span>•</span>

              <span>
                {job.experience}
              </span>

              <span>•</span>

              <span>
                {jobType}
              </span>

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

            <span>
              {job.location}
            </span>

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

        {/* LEFT */}

        <div>

          {/* DESCRIPTION */}

          <div
            className="
              career-description
              max-w-5xl
              font-body
              text-base
              leading-8
              text-modura-gray-600
            "
            dangerouslySetInnerHTML={{
              __html: job.description || "",
            }}
          />

          {/* REQUIREMENTS */}

          {requirements.length > 0 && (
            <JobList
              title="Requirements"
              items={requirements}
            />
          )}

          {/* INFORMATION */}

          <div
            className="
              mt-9
              grid
              gap-5
              border-t
              border-modura-gray-200
              pt-7
              sm:grid-cols-4
            "
          >

            <InfoItem
              title="Experience"
              value={job.experience}
            />

            <InfoItem
              title="Salary"
              value={
                job.salary_range ||
                "As per company policy"
              }
            />

            <InfoItem
              title="No. Of Vacancy"
              value={String(job.openings)}
            />
  {job.lastDate && (

              <InfoItem
                title="Last Date To Apply"
                value={formatDate(job.lastDate)}
              />

          )}
          </div>

          {/* LAST DATE */}

        

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
              href={`/career?jobId=${job.id}#apply`}
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

        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
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

            <span
              className="
                mt-[9px]
                h-2
                w-2
                shrink-0
                bg-modura-secondary
              "
            />

            <span>
              {item}
            </span>

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

function CareerForm({
  careers,
}: {
  careers: Career[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const jobId = searchParams.get("jobId");

  const [formData, setFormData] = useState({
    careerId: jobId || "",
    name: "",
    email: "",
    phone: "",
    experience: "",
    currentCtc: "",
    expectedCtc: "",
    noticePeriod: "",
    portfolioLink: "",
    coverLetter: "",
  });

  const [resume, setResume] =
    useState<File | null>(null);

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  const [loading, setLoading] =
    useState(false);

  /* =======================================================
     SET CAREER ID FROM URL
  ======================================================= */

  useEffect(() => {
    if (jobId) {
      setFormData((prev) => ({
        ...prev,
        careerId: jobId,
      }));
    }
  }, [jobId]);

  /* =======================================================
     INPUT CHANGE
  ======================================================= */

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      submit: "",
    }));
  };

  /* =======================================================
     RESUME
  ======================================================= */

  const handleResumeChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const maxSize =
      2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {

      setErrors((prev) => ({
        ...prev,
        resume:
          "Only PDF, DOC or DOCX files are allowed.",
      }));

      e.target.value = "";
      setResume(null);

      return;
    }

    if (file.size > maxSize) {

      setErrors((prev) => ({
        ...prev,
        resume:
          "Resume size must be less than 2MB.",
      }));

      e.target.value = "";
      setResume(null);

      return;
    }

    setResume(file);

    setErrors((prev) => ({
      ...prev,
      resume: "",
      submit: "",
    }));
  };

  /* =======================================================
     VALIDATION
  ======================================================= */

  const validateForm = () => {
    const newErrors: Record<
      string,
      string
    > = {};

    if (!formData.careerId) {
      newErrors.careerId =
        "Please select a position.";
    }

    if (!formData.name.trim()) {

      newErrors.name =
        "Name is required.";

    } else if (
      formData.name.trim().length < 2
    ) {

      newErrors.name =
        "Please enter a valid name.";
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!formData.email.trim()) {

      newErrors.email =
        "Email is required.";

    } else if (
      !emailRegex.test(
        formData.email.trim()
      )
    ) {

      newErrors.email =
        "Please enter a valid email address.";
    }

    const phoneDigits =
      formData.phone.replace(
        /\D/g,
        ""
      );

    if (!formData.phone.trim()) {

      newErrors.phone =
        "Phone number is required.";

    } else if (
      phoneDigits.length < 7 ||
      phoneDigits.length > 15
    ) {

      newErrors.phone =
        "Please enter a valid phone number.";
    }

    if (!formData.experience.trim()) {
      newErrors.experience =
        "Experience is required.";
    }

    if (!formData.currentCtc.trim()) {

      newErrors.currentCtc =
        "Current CTC is required.";

    } else if (
      Number.isNaN(
        Number(formData.currentCtc)
      )
    ) {

      newErrors.currentCtc =
        "Enter a valid CTC.";
    }

    if (!formData.expectedCtc.trim()) {

      newErrors.expectedCtc =
        "Expected CTC is required.";

    } else if (
      Number.isNaN(
        Number(formData.expectedCtc)
      )
    ) {

      newErrors.expectedCtc =
        "Enter a valid CTC.";
    }

    if (!formData.noticePeriod.trim()) {

      newErrors.noticePeriod =
        "Notice period is required.";

    } else if (
      Number.isNaN(
        Number(formData.noticePeriod)
      )
    ) {

      newErrors.noticePeriod =
        "Enter a valid notice period.";
    }

    if (
      formData.portfolioLink.trim() &&
      !/^https?:\/\/.+/i.test(
        formData.portfolioLink.trim()
      )
    ) {

      newErrors.portfolioLink =
        "Please enter a valid portfolio URL.";
    }

    if (!formData.coverLetter.trim()) {

      newErrors.coverLetter =
        "Cover letter is required.";

    } else if (
      formData.coverLetter.trim().length < 10
    ) {

      newErrors.coverLetter =
        "Please provide more details.";
    }

    if (!resume) {
      newErrors.resume =
        "Resume is required.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  /* =======================================================
     SUBMIT APPLICATION
  ======================================================= */

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {

      setLoading(true);

      const payload =
        new FormData();

      payload.append(
        "careerId",
        formData.careerId
      );

      payload.append(
        "name",
        formData.name.trim()
      );

      payload.append(
        "email",
        formData.email.trim()
      );

      payload.append(
        "phone",
        formData.phone.trim()
      );

      payload.append(
        "experience",
        formData.experience.trim()
      );

      payload.append(
        "currentCtc",
        formData.currentCtc.trim()
      );

      payload.append(
        "expectedCtc",
        formData.expectedCtc.trim()
      );

      payload.append(
        "noticePeriod",
        formData.noticePeriod.trim()
      );

      payload.append(
        "portfolioLink",
        formData.portfolioLink.trim()
      );

      payload.append(
        "coverLetter",
        formData.coverLetter.trim()
      );

      if (resume) {
        payload.append(
          "resume",
          resume
        );
      }

      const response =
        await axios.post(
          "https://mvnl.salexo.co.in/api/v1/careers/apply",
          payload,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
              Accept:
                "application/json",
            },

            timeout: 60000,
          }
        );

      const result =
        response.data;

      if (
        !result?.success
      ) {
        throw new Error(
          result?.message ||
            "Unable to submit application."
        );
      }

      /* SUCCESS */

      router.push(
        "/thank-you"
      );

    } catch (error: unknown) {

      console.error(
        "Career Application Error:",
        error
      );

      if (
        axios.isAxiosError(error)
      ) {

        setErrors({
          submit:
            error.response?.data
              ?.message ||
            "Unable to submit application. Please try again.",
        });

      } else {

        setErrors({
          submit:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
        });

      }

    } finally {

      setLoading(false);

    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="
        border-t-2
        border-modura-primary
        pt-8
      "
    >

      {/* SUBMIT ERROR */}

      {errors.submit && (
        <div
          className="
            mb-8
            border
            border-red-200
            bg-red-50
            px-5
            py-4
            font-body
            text-sm
            text-red-600
          "
        >
          {errors.submit}
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-2">

        {/* POSITION */}

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
            Position

            <span className="ml-1 text-modura-secondary">
              *
            </span>
          </label>

          <select
            name="careerId"
            value={formData.careerId}
            onChange={handleChange}
            className={`
              h-14
              w-full
              border-b-2
              bg-transparent
              px-1
              font-body
              text-base
              text-modura-primary
              outline-none
              ${
                errors.careerId
                  ? "border-red-400"
                  : "border-modura-gray-200"
              }
              focus:border-modura-secondary
            `}
          >

            <option value="">
              Select Position
            </option>

            {careers.map(
              (career) => (
                <option
                  key={career.id}
                  value={String(
                    career.id
                  )}
                >
                  {career.jobTitle}
                </option>
              )
            )}

          </select>

          {errors.careerId && (
            <p className="mt-2 text-xs text-red-500">
              {errors.careerId}
            </p>
          )}

        </div>

        {/* NAME */}

        <FormField
          label="Full Name"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />

        {/* EMAIL */}

        <FormField
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        {/* PHONE */}

        <FormField
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          required
        />

        {/* EXPERIENCE */}

        <FormField
          label="Experience"
          name="experience"
          placeholder="e.g. 2 Years"
          value={formData.experience}
          onChange={handleChange}
          error={errors.experience}
          required
        />

        {/* CURRENT CTC */}

        <FormField
          label="Current CTC"
          name="currentCtc"
          type="number"
          placeholder="e.g. 450000"
          value={formData.currentCtc}
          onChange={handleChange}
          error={errors.currentCtc}
          required
        />

        {/* EXPECTED CTC */}

        <FormField
          label="Expected CTC"
          name="expectedCtc"
          type="number"
          placeholder="e.g. 500000"
          value={formData.expectedCtc}
          onChange={handleChange}
          error={errors.expectedCtc}
          required
        />

        {/* NOTICE PERIOD */}

        <FormField
          label="Notice Period"
          name="noticePeriod"
          type="number"
          placeholder="e.g. 1"
          value={formData.noticePeriod}
          onChange={handleChange}
          error={errors.noticePeriod}
          required
        />

        {/* PORTFOLIO */}

        <FormField
          label="Portfolio Link"
          name="portfolioLink"
          type="url"
          placeholder="https://www.example.com/portfolio"
          value={formData.portfolioLink}
          onChange={handleChange}
          error={errors.portfolioLink}
        />

        {/* COVER LETTER */}

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
            Cover Letter

            <span className="ml-1 text-modura-secondary">
              *
            </span>
          </label>

          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            rows={5}
            placeholder="Tell us about yourself..."
            className={`
              w-full
              resize-none
              border-b-2
              bg-transparent
              px-1
              py-3
              font-body
              text-base
              leading-7
              text-modura-primary
              outline-none
              placeholder:text-modura-gray-400
              focus:border-modura-secondary
              ${
                errors.coverLetter
                  ? "border-red-400"
                  : "border-modura-gray-200"
              }
            `}
          />

          {errors.coverLetter && (
            <p className="mt-2 text-xs text-red-500">
              {errors.coverLetter}
            </p>
          )}

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

            <span className="ml-1 text-modura-secondary">
              *
            </span>
          </label>

          <label
            className={`
              flex
              cursor-pointer
              items-center
              justify-between
              border
              border-dashed
              px-5
              py-5
              transition-all
              duration-300
              hover:border-modura-secondary
              hover:bg-modura-off-white
              ${
                errors.resume
                  ? "border-red-400"
                  : "border-modura-gray-300"
              }
            `}
          >

            <div className="flex min-w-0 items-center gap-3">

              <FileText
                size={22}
                strokeWidth={1.5}
                className="
                  shrink-0
                  text-modura-secondary
                "
              />

              <span
                className="
                  truncate
                  font-body
                  text-sm
                  text-modura-gray-500
                "
              >
                {resume
                  ? resume.name
                  : "Upload your resume"}
              </span>

            </div>

            <ArrowUpRight
              size={19}
              className="
                shrink-0
                text-modura-primary
              "
            />

            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={
                handleResumeChange
              }
            />

          </label>

          {errors.resume && (
            <p className="mt-2 text-xs text-red-500">
              {errors.resume}
            </p>
          )}

          <p
            className="
              mt-2
              font-body
              text-[12px]
              leading-5
              text-modura-gray-700
            "
          >
            Accepted formats: PDF, DOC, DOCX —
            Maximum file size 2MB
          </p>

        </div>

      </div>

      {/* SUBMIT */}

      <div className="mt-4">

        <button
          type="submit"
          disabled={loading}
          className="
            group
            relative
            inline-flex
            h-[52px]
            items-center
            justify-center
            gap-4
            overflow-hidden
            bg-modura-primary
            px-7
            font-body
            text-[12px]
            font-bold
            uppercase
            tracking-[2px]
            text-white
            transition-all
            duration-300
            hover:bg-modura-secondary
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >

          {loading
            ? "Submitting..."
            : "Submit Application"}

          {!loading && (
            <ArrowUpRight
              size={17}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          )}

        </button>

      </div>

    </form>
  );
}

/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (
    e: ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => void;
  error?: string;
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
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          h-14
          w-full
          border-b-2
          bg-transparent
          px-1
          font-body
          text-base
          text-modura-primary
          outline-none
          transition-colors
          placeholder:text-modura-gray-400
          focus:border-modura-secondary
          ${
            error
              ? "border-red-400"
              : "border-modura-gray-200"
          }
        `}
      />

      {error && (
        <p
          className="
            mt-2
            font-body
            text-xs
            text-red-500
          "
        >
          {error}
        </p>
      )}

    </div>
  );
}

/* =========================================================
   DATE FORMAT
========================================================= */

function formatDate(
  dateString: string
) {
  if (!dateString) {
    return "";
  }

  const date = new Date(
    `${dateString}T00:00:00`
  );

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}