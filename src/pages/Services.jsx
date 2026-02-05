import React from "react";
import { useRef, useLayoutEffect } from "react";
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

const Card = ({ i, title, description, src, tags, bgColor, accentColor, totalCards }) => {
	const topOffset = 80 + i * 40; // Staggered top position for stacking

	return (
		<div
			className={`card-${i} min-w-[85vw] md:min-w-[60vw] snap-center h-auto overflow-hidden lg:sticky lg:w-full lg:max-h-[85vh] lg:overflow-y-auto lg:overflow-x-hidden rounded-2xl shadow-2xl transition-shadow duration-300 gpu-accelerate`}
			style={{
				top: `${topOffset}px`,
				backgroundColor: bgColor,
				zIndex: i + 1,
			}}
		>
			<div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[600px]">
				{/* Left Content */}
				<div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-between order-2 lg:order-1">
					{/* Title */}
					<div>
						<h2
							className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
							style={{ color: '#1a1a1a' }}
						>
							{title}
						</h2>

						{/* Description */}
						<p className="text-gray-700 text-base lg:text-lg leading-relaxed max-w-md mb-8">
							{description}
						</p>
					</div>

					{/* Tags */}
					<ul className="space-y-3">
						{tags.map((tag, idx) => (
							<li
								key={idx}
								className="flex items-center gap-3 text-gray-600 text-sm lg:text-base"
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

				{/* Right Image */}
				<div className="relative h-64 lg:h-auto order-1 lg:order-2 overflow-hidden">
					<div
						className={`img-${i} w-full h-full`}
						style={{ transformOrigin: "center" }}
					>
						<img
							src={src}
							alt={title}
							className="w-full h-full object-cover"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default function Services() {
	const containerRef = useRef();
	const cardsContainerRef = useRef();

	useLayoutEffect(() => {
		let ctx = gsap.context(() => {
			ScrollTrigger.matchMedia({
				"(min-width: 1024px)": function () {
					const cards = gsap.utils.toArray('[class^="card-"]');

					cards.forEach((card, i) => {
						const img = card.querySelector(`[class^="img-"]`);

						// Create the stacking effect - cards scale down as they get "pushed back"
						ScrollTrigger.create({
							trigger: card,
							start: "top 80px",
							end: "bottom top",
							endTrigger: cardsContainerRef.current,
							pin: false,
							onUpdate: (self) => {
								// Calculate how far this card has scrolled past its pin point
								const progress = self.progress;

								// Scale down the card as it gets "stacked" - no opacity change to maintain readability
								const scale = gsap.utils.clamp(
									0.9,
									1,
									1 - progress * 0.1
								);

								gsap.to(card, {
									scale: scale,
									duration: 0.1,
									ease: "none",
								});
							},
						});

						// Image zoom-out effect on scroll
						gsap.fromTo(
							img,
							{ scale: 1.3 },
							{
								scale: 1,
								ease: "none",
								scrollTrigger: {
									trigger: card,
									start: "top bottom",
									end: "top 100px",
									scrub: 1,
								},
							}
						);
					});
				},
			});
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<>
			<SEO
				title="Our Services"
				description="Explore our comprehensive web design and development services including React development, Next.js applications, UI/UX design, responsive web design, custom web solutions, and frontend development."
				keywords="web design services, web development services, react development, nextjs services, UI/UX design, responsive design, frontend development services, custom web applications"
				url="https://snaildesigns.com/services"
			/>

			<div ref={containerRef} className="relative bg-[#121212] min-h-screen">
				{/* Hero Section */}
				<div className="container relative z-10 py-20">
					<div className="text-left">
						<h1 className="text-[5vmax] leading-snug font-bold mb-4">
							Your Creative Partner <br />
							in Digital Growth
						</h1>

						<p className="text-2xl mt-8 font-CircularLight max-w-[40ch]">
							From websites to branding, we design and build inventive
							digital experiences that connect with people, everywhere
							your brand shows up.
						</p>
					</div>
				</div>

				{/* Cards Section */}
				<div
					ref={cardsContainerRef}
					className="container relative z-10 pb-20 lg:pb-40"
				>
					{/* Mobile Scroll Indicator */}
					<div className="lg:hidden flex items-center gap-2 text-white mb-4 px-4">
						<span className="text-sm font-CircularLight tracking-wide">Swipe to explore</span>
						<FiArrowRight className="text-lg" />
					</div>

					<div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 pb-8 lg:block lg:space-y-[50vh] lg:overflow-visible lg:pb-0 scrollbar-hide">
						{projects.map((p, i) => (
							<Card
								key={i}
								{...p}
								i={i}
								totalCards={projects.length}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

