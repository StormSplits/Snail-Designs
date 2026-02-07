import StatsSection from "../components/about/StatsSection";
import HeroSection from "../components/about/HeroSection";
import ImageExpand from "../components/about/ImageExpand";
import React from "react";
import ClaySection from "../components/about/ClaySection";
import { Capabilities } from "../components/about/Capabilities";
import AboutSection from "../components/Home/AboutSection";
import LogoLoop from "../components/Home/LogoLoop";
import Cubes from "../components/about/HeroSection";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import Testimonial from "../components/about/Testimonial";
import DarkVeil from "../ui/DarkVeil";
import SEO from "../components/SEO";

export const About = () => {
  const sections = [
    {
      number: "01",
      title: "Teams Led by Co-Founders",
      desc1:
        "We differentiate ourselves from large agencies where junior talent typically handles most of the work, and interactions with design leaders are limited.",
      desc2:
        "At Snail Designs, our co-founders lead dedicated, senior-level teams with cross-disciplinary expertise to ensure project success.",
      image:
        "/About/cofounder.jpg",
    },
    {
      number: "02",
      title: "Cross-Disciplinary Teams",
      desc1:
        "We bring together designers, strategists, and engineers to solve complex problems from different perspectives.",
      desc2:
        "This ensures every solution is holistic and tailored for success.",
      image:
        "/About/cross team.jpg",
    },
    {
      number: "03",
      title: "Human-Centered Design",
      desc1:
        "Our process starts with deep user research to truly understand audience needs.",
      desc2: "Every decision we make is backed by insights, not assumptions.",
      image:
        "/About/human design.jpg",
    },
    {
      number: "04",
      title: "Global Reach",
      desc1:
        "We collaborate with clients across the world, delivering solutions that scale internationally.",
      desc2: "Our global perspective helps us adapt to diverse markets.",
      image:
        "/About/global reach.jpg",
    },
  ];
  const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    {
      node: <SiTypescript />,
      title: "TypeScript",
      href: "https://www.typescriptlang.org",
    },
    {
      node: <SiTailwindcss />,
      title: "Tailwind CSS",
      href: "https://tailwindcss.com",
    },
  ];
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Snail Designs - a passionate team of web designers and developers creating innovative digital solutions. Discover our story, values, and expertise in React, Next.js, and modern web technologies."
        keywords="about snail designs, web design team, development agency, our story, company values, web design experts, react developers"
        url="https://www.snaildesigns.in/about"
      />
      <div>
        <div className="container grid grid-cols-1 grid-rows-2 h-[80vh] md:h-screen lg:grid-cols-2 lg:grid-rows-1 lg:mt-8 gap-8 lg:h-auto">
          <div className="mb-5 lg:order-1">
            <div className="w-full h-[350px] md:h-[500px] xl:h-[600px]">
              <DarkVeil
                hueShift={0}
                noiseIntensity={0}
                scanlineIntensity={0}
                speed={0.5}
                scanlineFrequency={0}
                warpAmount={0}
              />
            </div>
          </div>
          <div className="place-content-center mt-5 md:mt-0">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl leading-snug font-bold mb-4">
              Where creativity meets technology to transform brands
            </h1>
          </div>
        </div>

        <ImageExpand />

        <StatsSection />

        <AboutSection />
        {sections.map((item, i) => (
          <ClaySection
            key={item.number}
            number={item.number}
            title={item.title}
            desc1={item.desc1}
            desc2={item.desc2}
            image={item.image}
            reverse={i % 2 !== 0}
          />
        ))}
        <Capabilities />
        <Testimonial />
        {/* <div className=" h-[200px] flex justify-center items-center relative overflow-hidden">
        <LogoLoop
          logos={techLogos}
          speed={120}
          direction="left"
          logoHeight={60}
          gap={40}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Technology partners"
        />
      </div> */}
      </div>
    </>
  );
};
