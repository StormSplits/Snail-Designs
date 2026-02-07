import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SEO from "../components/SEO";
import { FiArrowRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const projects = [
	{
		title: "Branding",
		description:
			"We create digital-first brand identities with consistent experiences across every channel, building recognition and trust.",
		src: "/Services/branding.jpg",
		link: "",
		bgColor: "#f5f5f5",
		accentColor: "#8B5CF6",
		tags: [
			"Brand Strategy",
			"Brand Architecture",
			"Verbal Identity",
			"Visual Identity",
			"Brand Guidelines",
			"Brand Experiences",
		],
	},
	{
		title: "Digital Products",
		description:
			"We design seamless, functional, and memorable products, from enterprise platforms to consumer apps, powered by strong design systems.",
		src: "/Services/product design.jpg",
		link: "",
		bgColor: "#fef3c7",
		accentColor: "#F59E0B",
		tags: [
			"Consumer and Enterprise Software",
			"User Research and Testing",
			"CX, UX and Interaction Design",
			"UI Design",
			"Motion Design",
			"Design Systems",
		],
	},
	{
		title: "Websites",
		description:
			"We build high-performing websites that combine striking design with exceptional user experience and business impact.",
		src: "/Services/Web Dev.jpg",
		link: "",
		bgColor: "#e0e7ff",
		accentColor: "#6366F1",
		tags: [
			"Content Strategy",
			"Web Design",
			"Interactive Experiences",
			"Content Production",
			"Frontend and Backend Development",
			"CMS Implementation",
		],
	},
	{
		title: "Content",
		description:
			"We deliver authentic, engaging, and tailored content assets with creativity and precision to strengthen your brand.",
		src: "/Services/content.jpg",
		link: "",
		bgColor: "#fce7f3",
		accentColor: "#EC4899",
		tags: [
			"Art Direction",
			"Illustration and Graphic Design",
			"Iconography",
			"Animation",
			"Photo and Video",
			"3D",
		],
	},
	{
		title: "Development",
		description:
			"Our team delivers flawless digital products and websites, focusing on accessibility, speed, scalability, and emerging technologies.",
		src: "/Services/developement.jpg",
		link: "",
		bgColor: "#d1fae5",
		accentColor: "#10B981",
		tags: [
			"Technology Consulting",
			"Architecture Planning",
			"Mobile App Development",
			"Frontend Web Development",
			"Backend Development and API Integration",
			"Emerging Tech (AI, AR/VR, Wearables, Web3)",
		],
	},
];

const Card = ({ title, description, src, tags, bgColor, accentColor }) => {
	return (
		<div
			className="w-screen h-screen flex-shrink-0 flex items-center justify-center p-6 lg:p-20 overflow-hidden relative"
			style={{ backgroundColor: bgColor }}
		>
			<div className="w-full max-w-[1600px] h-full grid grid-cols-1 landscape:grid-cols-2 lg:grid-cols-2 items-center gap-10 lg:gap-24">

				{/* Image Container */}
				<div className="w-full h-[40vh] landscape:h-auto lg:h-auto aspect-square lg:aspect-square order-1 landscape:order-1 lg:order-2 rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl relative mx-auto max-h-[80vh]">
					<div className="w-full h-full transform transition-transform duration-700 hover:scale-105">
						<img
							src={src}
							alt={title}
							className="w-full h-full object-cover"
						/>
					</div>
					{/* Overlay Gradient */}
					<div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none"></div>
				</div>

				{/* Text Content */}
				<div className="w-full flex flex-col justify-center text-left order-2 landscape:order-2 lg:order-1">
					<div className="max-w-xl mx-auto lg:mx-0">
						<h2
							className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 lg:mb-10"
							style={{ color: '#1a1a1a' }}
						>
							{title}
						</h2>

						<p className="text-gray-800 text-lg md:text-xl leading-relaxed mb-8 lg:mb-12">
							{description}
						</p>

						<div>
							<h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-6">
								What we do
							</h3>
							<ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{tags.map((tag, idx) => (
									<li
										key={idx}
										className="flex items-center gap-3 text-gray-700 font-medium text-base"
									>
										<span
											className="w-2 h-2 rounded-full flex-shrink-0"
											style={{ backgroundColor: accentColor }}
										></span>
										{tag}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
};

export default function Services() {
	const containerRef = useRef();
	const sliderRef = useRef();
	const [progress, setProgress] = useState(0);

	useLayoutEffect(() => {
		let ctx = gsap.context(() => {
			const totalWidth = sliderRef.current.scrollWidth;
			const windowWidth = window.innerWidth;

			// Only enable GSAP scroll trigger on desktop
			ScrollTrigger.matchMedia({
				"(min-width: 1024px)": function () {
					const scrollTween = gsap.to(sliderRef.current, {
						x: () => -(totalWidth - windowWidth),
						ease: "none",
						scrollTrigger: {
							trigger: containerRef.current,
							start: "top top",
							end: () => `+=${totalWidth}`,
							pin: true,
							scrub: 1,
							invalidateOnRefresh: true,
							onUpdate: (self) => {
								setProgress(self.progress);
							}
						},
					});
				},
			});
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<>
			<SEO
				title="Web Development & UI/UX Services | Branding & AI Solutions"
				description="Comprehensive digital services by Snail Designs: Custom Web Development, UI/UX Design, Corporate Branding, and Generative AI integration for modern businesses. Built with React & Next.js."
				keywords="web development services, ui/ux design services, corporate branding agency, generative ai development, ecommerce website design, custom software development, seo services lucknow"
				url="https://www.snaildesigns.in/services"
			/>

			{/* Main Wrapper */}
			<div className="bg-[#121212] overflow-hidden">

				{/* Intro Section - Keeping it separate so it scrolls normally before hitting the pin */}
				<div className="container relative z-10 py-20 lg:py-32">
					<div className="text-left">
						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-snug font-bold mb-4">
							Your Creative Partner <br />
							in Digital Growth
						</h1>

						<p className="text-xl md:text-2xl mt-8 font-CircularLight max-w-[40ch]">
							From websites to branding, we design and build inventive
							digital experiences that connect with people, everywhere
							your brand shows up.
						</p>
					</div>
				</div>

				{/* Horizontal Scroll Section */}
				<div ref={containerRef} className="relative h-[100dvh] lg:h-auto overflow-hidden">
					{/* Mobile Indicator */}
					<div className="lg:hidden absolute top-4 left-4 z-20 flex items-center gap-2 text-white bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
						<span className="text-xs font-CircularLight tracking-wide">Swipe</span>
						<FiArrowRight className="text-sm" />
					</div>

					{/* Slider Container */}
					<div
						ref={sliderRef}
						className="flex flex-row overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none w-full h-full hide-scrollbar"
					>
						{projects.map((p, i) => (
							<Card key={i} {...p} />
						))}
					</div>

					{/* Custom Scrollbar / Indicator for Desktop with Integrated Animation */}
					<div className="hidden lg:block absolute bottom-10 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gray-800 rounded-full overflow-hidden z-50">
						<div
							className="h-full bg-white rounded-full transition-all duration-75 ease-out"
							style={{ width: `${Math.max(5, progress * 100)}%` }}
						></div>
					</div>
				</div>

				{/* Spacer for footer or next content */}
				<div className="h-[20vh] bg-[#121212]"></div>
			</div>

			<style jsx global>{`
				.hide-scrollbar::-webkit-scrollbar {
					display: none;
				}
				.hide-scrollbar {
					-ms-overflow-style: none;
					scrollbar-width: none;
				}
			`}</style>
		</>
	);
}
