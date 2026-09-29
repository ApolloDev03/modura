"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { 
  Building2, 
  Box, 
  Layers, 
  Cpu, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight, 
  Compass, 
  Ruler, 
  CornerDownRight,
  Sparkles,
  ChevronRight,
  Code2
} from 'lucide-react';
import { LiaLinkedin } from 'react-icons/lia';
import { BsInstagram, BsTwitter } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa6';
import Image from "next/image";
import logo from "../assets/logo.jpeg";

interface ServiceItem {
  id: string;
  name: string;
  code: string;
  href: string;
}

interface NavLink {
  label: string;
  href: string;
  badge?: string;
}

const SERVICES: ServiceItem[] = [
  { id: '01', name: 'Architecture', code: 'ARC-3D', href: '#architecture' },
  { id: '02', name: 'BIM Services', code: 'BIM-LOD500', href: '#bim' },
  { id: '03', name: 'Structural Engineering', code: 'STR-CALC', href: '#structural' },
  { id: '04', name: 'Outsourcing', code: 'OUT-CAD', href: '#outsourcing' },
];

const COMPANY_LINKS: NavLink[] = [
  { label: 'About Us', href: '#about' },
  { label: 'Our Projects', href: '#projects', badge: '24 Active' },
  { label: 'Insights & News', href: '#insights' },
  { label: 'Join Our Team', href: '#careers', badge: 'Hiring' },
  { label: 'Contact', href: '#contact' },
];

export default function App() {
  const footerRef = useRef<HTMLDivElement>(null);
  const ctaBoxRef = useRef<HTMLDivElement>(null);
  const gridOverlayRef = useRef<SVGSVGElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | HTMLDivElement | null)[]>([]);

  const [activeServiceHover, setActiveServiceHover] = useState<string | null>(null);
  const [emailValue, setEmailValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Main Footer Box
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );

      // CTA Box Slide-In with Spring Effect
      gsap.fromTo(
        ctaBoxRef.current,
        { opacity: 0, scale: 0.96, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, delay: 0.2, ease: 'back.out(1.4)' }
      );

      // Staggered Items Animation
      const animateTargets = linksRef.current.filter(Boolean);
      gsap.fromTo(
        animateTargets,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          delay: 0.4,
          ease: 'power2.out',
        }
      );

      // Continuous subtle pulse on technical grid lines
      if (gridOverlayRef.current) {
        gsap.to('.blueprint-pulse-line', {
          strokeDashoffset: -100,
          duration: 10,
          repeat: -1,
          ease: 'none',
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);



  return (
    <div className="min-h-screen bg-[#090d12] text-[#f3f4f5] flex flex-col justify-end items-center p-2 sm:p-4 md:p-8 font-sans selection:bg-[#596a79] selection:text-white">
  
      <footer 
        ref={footerRef}
        className="w-full max-w-7xl relative bg-[#0b1d33] border border-[#3e4d5a] rounded-xl overflow-hidden shadow-2xl blueprint-bg text-[#f3f4f5] transition-all duration-300"
      >
        {/* Architectural SVG Background Technical Grid Overlay */}
        <svg 
          ref={gridOverlayRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(132, 145, 156, 0.15)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Accent Structural Vector Lines */}
          <line x1="0" y1="60" x2="100%" y2="60" stroke="#596a79" strokeWidth="0.5" strokeDasharray="4 4" className="blueprint-pulse-line" />
          <line x1="0" y1="82%" x2="100%" y2="82%" stroke="#596a79" strokeWidth="0.5" strokeDasharray="6 6" />
        </svg>

        {/* Technical Frame Markers (Top & Corner Crosshairs) */}
        <div className="absolute top-2 left-3 font-mono text-[9px] text-[#84919c] tracking-widest uppercase z-10 flex items-center gap-2">
          <span className="inline-block w-2 h-2 border border-[#84919c]"></span>
          MODURA_SPEC_V4.0 // FOOTER_ARCH_CAD
        </div>
        
        <div className="absolute top-2 right-3 z-10 hidden sm:flex items-center gap-2">
          <span className="px-2 py-0.5 text-[10px] font-mono bg-[#1d3349] border border-[#596a79] text-[#cbd1d5] rounded-xs flex items-center gap-1.5">
            <Code2 className="w-3 h-3 text-[#84919c]" />
            BUILT WITH REACT & NEXT.JS
          </span>
        </div>

        {/* Outer Corner Target Crosshairs */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#84919c] z-10"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#84919c] z-10"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#84919c] z-10"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#84919c] z-10"></div>

        {}
        <div className="relative z-10 pt-10 px-4 sm:px-8 md:px-12">
          <div 
            ref={ctaBoxRef}
            className="relative bg-gradient-to-r from-[#1d3349] via-[#0b1d33] to-[#1d3349] border border-[#596a79] p-6 sm:p-8 md:p-10 rounded-lg shadow-xl overflow-hidden group"
          >
            {/* CTA Background Architectural Grid Sketch Elements */}
            <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center justify-end pr-8">
              <Compass className="w-64 h-64 text-white transform translate-x-12 -translate-y-8 rotate-12" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left Headline */}
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-mono text-[#84919c] tracking-widest uppercase mb-2">
                  <Ruler className="w-3.5 h-3.5" />
                  <span>PROJECT INITIATION // PHASE 01</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wider leading-none">
                  Ready to build something <span className="text-[#84919c] underline decoration-1 underline-offset-8 decoration-[#596a79]">Extraordinary?</span>
                </h2>
                <p className="mt-3 font-body text-sm sm:text-base text-[#cbd1d5] max-w-lg">
                  Let's collaborate on your next landmark architectural or structural BIM project.
                </p>
              </div>

              {/* Right CTA Button & Quick Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
                <a
                  href="#start-project"
                  ref={(el) => { linksRef.current[0] = el; }}
                  className="relative group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#0b1d33] font-heading font-bold text-lg uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-white/10 active:translate-y-0 rounded-sm"
                >
                  <span className="relative z-10">Start A Project</span>
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#0b1d33]" />
                  <div className="absolute inset-0 border-2 border-white translate-x-1 translate-y-1 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-200"></div>
                </a>

                <a
                  href="#schedule-call"
                  ref={(el) => { linksRef.current[1] = el; }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-[#84919c] text-white font-heading text-base uppercase tracking-wider hover:bg-[#1d3349]/50 transition-colors rounded-sm"
                >
                  <span>Schedule Consultation</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 px-4 sm:px-8 md:px-12 py-12 border-b border-[#303a43]/80">
          
          {/* Column 1: Brand & Logo (Cols 4) */}
          <div className="lg:col-span-4 space-y-6">
          <div className="space-y-6">

    <div
        className="
        relative
        h-[200px]
        w-[330px]
        "
    >

        <Image
            src={logo}
            alt="Modura Design Group"
            fill
            sizes="330px"
            className="
            object-contain
            object-left
            "
        />

    </div>




</div>
           

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              {[
                { icon: LiaLinkedin, label: 'LinkedIn', href: '#linkedin' },
                { icon: BsInstagram, label: 'Instagram', href: '#instagram' },
                { icon: FaFacebook, label: 'Facebook', href: '#facebook' },
                { icon: BsTwitter, label: 'X (Twitter)', href: '#twitter' },
              ].map((soc, idx) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={idx}
                    href={soc.href}
                    aria-label={soc.label}
                    ref={(el) => { linksRef.current[2 + idx] = el; }}
                    className="w-9 h-9 bg-[#061322] border border-[#3e4d5a] rounded flex items-center justify-center text-[#9ca6ae] hover:text-white hover:border-[#84919c] hover:bg-[#1d3349] transition-all duration-200 group"
                  >
                    <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Services (Cols 3) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 border-b border-[#303a43] pb-2">
              <Layers className="w-4 h-4 text-[#84919c]" />
              <h4 className="font-heading text-lg font-bold uppercase tracking-wider text-white">
                Services
              </h4>
            </div>

            <ul className="space-y-2.5 font-body text-sm">
              {SERVICES.map((srv, idx) => (
                <li key={srv.id}>
                  <a
                    href={srv.href}
                    ref={(el) => { linksRef.current[6 + idx] = el; }}
                    onMouseEnter={() => setActiveServiceHover(srv.id)}
                    onMouseLeave={() => setActiveServiceHover(null)}
                    className="group flex items-center justify-between p-2 rounded hover:bg-[#1d3349]/50 border border-transparent hover:border-[#3e4d5a] transition-all duration-200"
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Isometric Cube Icon Bullet */}
                      <span className={`transition-colors duration-200 ${activeServiceHover === srv.id ? 'text-white' : 'text-[#596a79]'}`}>
                        <Box className="w-4 h-4" />
                      </span>
                      <span className="text-[#cbd1d5] group-hover:text-white transition-colors">
                        {srv.name}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#6f7b84] group-hover:text-[#84919c] uppercase">
                      {srv.code}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company Links (Cols 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 border-b border-[#303a43] pb-2">
              <Building2 className="w-4 h-4 text-[#84919c]" />
              <h4 className="font-heading text-lg font-bold uppercase tracking-wider text-white">
                Company
              </h4>
            </div>

            <ul className="space-y-2.5 font-body text-sm">
              {COMPANY_LINKS.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    ref={(el) => { linksRef.current[10 + idx] = el; }}
                    className="group flex items-center justify-between text-[#cbd1d5] hover:text-white transition-colors py-1"
                  >
                    <span className="flex items-center gap-1.5">
                      <ChevronRight className="w-3 h-3 text-[#596a79] group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                      {link.label}
                    </span>
                    {link.badge && (
                      <span className="text-[9px] font-mono uppercase bg-[#1d3349] text-[#84919c] px-1.5 py-0.5 rounded border border-[#3e4d5a]">
                        {link.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & HQ Specifications (Cols 3) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 border-b border-[#303a43] pb-2">
              <MapPin className="w-4 h-4 text-[#84919c]" />
              <h4 className="font-heading text-lg font-bold uppercase tracking-wider text-white">
                Contact & HQ
              </h4>
            </div>

            <div className="space-y-3 font-body text-sm">
              {/* Email */}
              <a 
                href="mailto:info@moduradesign.com" 
                className="flex items-start gap-3 p-2.5 bg-[#061322] border border-[#3e4d5a] rounded hover:border-[#84919c] transition-colors group"
              >
                <Mail className="w-4 h-4 text-[#84919c] group-hover:text-white mt-0.5 shrink-0" />
                <div>
                  <span className="font-mono text-[10px] text-[#6f7b84] uppercase block">INQUIRIES</span>
                  <span className="text-xs text-[#cbd1d5] group-hover:text-white font-mono">info@moduradesign.com</span>
                </div>
              </a>

              {/* Phone */}
              <a 
                href="tel:+15550199" 
                className="flex items-start gap-3 p-2.5 bg-[#061322] border border-[#3e4d5a] rounded hover:border-[#84919c] transition-colors group"
              >
                <Phone className="w-4 h-4 text-[#84919c] group-hover:text-white mt-0.5 shrink-0" />
                <div>
                  <span className="font-mono text-[10px] text-[#6f7b84] uppercase block">PHONE LINE</span>
                  <span className="text-xs text-[#cbd1d5] group-hover:text-white font-mono">+1 (555) 0199 - 2800</span>
                </div>
              </a>

              {/* HQ Address Box */}
              <div className="flex items-start gap-3 p-2.5 bg-[#061322] border border-[#3e4d5a] rounded">
                <MapPin className="w-4 h-4 text-[#84919c] mt-0.5 shrink-0" />
                <div>
                  <span className="font-mono text-[10px] text-[#6f7b84] uppercase block">HEADQUARTERS</span>
                  <p className="text-xs text-[#cbd1d5] leading-snug">
                    123 Construction Way, Suite 400<br />
                    Architectural District, NY 10001
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {}
        <div className="relative z-10 px-4 sm:px-8 md:px-12 py-6 bg-[#061322]/80 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-[#84919c]">
          
          {/* Copyright & Stamp */}
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>© {new Date().getFullYear()} MODURA DESIGN GROUP. ALL RIGHTS RESERVED.</span>
          </div>

          {/* Architectural Dividers & Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <span className="text-[#3e4d5a]">///</span>
            <a href="#privacy" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <span className="text-[#3e4d5a]">///</span>
            <a href="#terms" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
            <span className="text-[#3e4d5a]">///</span>
            <a href="#sitemap" className="hover:text-white transition-colors">SITEMAP</a>
          </div>

          {/* Back to Top Quick Link */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 text-xs text-[#cbd1d5] hover:text-white hover:underline transition-all"
          >
            <span>BACK TO TOP</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </footer>
    </div>
  );
}