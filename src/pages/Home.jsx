// src/pages/Home.jsx
import React, { useState } from "react";
import SEO from "../components/SEO"; // ADD THIS IMPORT
import HeroSection from "../components/Home/HeroSection";
import ScrollTriggerVideo from "../components/Home/ScrollTriggerVideo";
import ServiceSection from "../components/Home/ServiceSection";
import ProjectSection from "../components/Home/ProjectSection";
import AboutSection from "../components/Home/AboutSection";
import FAQ from "../components/Home/FAQ";
import ContactUs from "../components/Home/ContactUs";
import SEOContentSection from "../components/Home/SEOContentSection";

import {
	SiReact,
	SiNextdotjs,
	SiTypescript,
	SiTailwindcss,
} from "react-icons/si";

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

const Home = () => {
	return (
		<>
			{/* ADD THIS SEO COMPONENT */}
			<SEO
				title="Snail Designs - Global Web Design Agency"
				description="Transform your digital presence with Snail Designs. A premium web design agency serving clients worldwide. We build high-performance websites and AI solutions."
				keywords="web design agency, offshore react development, global web development company, outsourcing nextjs, web design agency lucknow, ai solutions"
				url="https://www.snaildesigns.in"
			/>

			{/* YOUR EXISTING CODE BELOW */}
			<div className="relative grid grid-cols-1 lg:grid-cols-2 container mx-auto px-4 sm:px-6 lg:px-8 gap-6 sm:gap-8 py-6 sm:py-10">
				<div className="flex items-center justify-center lg:justify-start order-2 lg:order-1">
					<div className=" lg:text-left w-full">
						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-snug font-bold mb-4">
							Designing experiences. <br />
							Building the web.
						</h1>
					</div>
				</div>

				<div className="flex items-center justify-center order-1 lg:order-2 w-full">
					<div className="w-full max-w-[280px] h-[280px] sm:max-w-[350px] sm:h-[350px] md:max-w-[450px] md:h-[450px] lg:max-w-[550px] lg:h-[550px] xl:max-w-[600px] xl:h-[600px]">
						<HeroSection
							hoverIntensity={1.5}
							rotateOnHover={true}
							hue={0}
							forceHoverState={false}
						/>
					</div>
				</div>
			</div>

			<ScrollTriggerVideo />
			<ServiceSection />
			<ProjectSection />
			<AboutSection />
			<ContactUs />
			<SEOContentSection />
			<FAQ />
		</>
	);
};

export default Home;