import React, { useState } from "react";
import LinkButton from "../../ui/LinkButton";

const menuItems = [
	{ id: "all", label: "All Work", bullet: true },
	{ id: "digital", label: "Digital Products", bullet: true },
	{ id: "websites", label: "Websites", bullet: true },
	{ id: "branding", label: "Branding", bullet: true },
	{ id: "genai", label: "Gen AI", bullet: true },
	{ id: "content", label: "Content", bullet: true },
];

export const projects = [
	// ---------- DIGITAL PROJECTS (1–18) ----------
	{
		id: 1,
		title: "DeepTune",
		category: "websites",
		description:
			"A modern landing page consisting of framer motion and gsap for better user experience.",
		image: "/Project Screenshots/deeptune.png",
		tags: ["UI/UX", "Development", "AI", "Demo"],
		layout: "half",
		link: "https://deeptune-demo.vercel.app/",
	},
	{
		id: 2,
		title: "Cymasonic Labs",
		category: "websites",
		description:
			"The demo focuses on improving UI/UX clarity, accessibility, and visual hierarchy, while preserving Cymasonic Labs’ research-first and non-promotional tone.",
		image: "/Project Screenshots/cymasonic.png",
		tags: ["UI/UX", "Development", "AI", "Demo"],
		layout: "half",
		link: "https://cymasonic-labs-demo.vercel.app/",
	},
	{
		id: 3,
		title: "Ezaz Shaikh Portfolio",
		category: "websites",
		description:
			"Persona 5 themed portfolio website for a game developer.",
		image: "/Project Screenshots/ezaz.png",
		tags: ["UI/UX", "Development"],
		layout: "full",
		link: "https://ezazshaikh.vercel.app/",
	},
	{
		id: 4,
		title: "Shira AI",
		category: "genai",
		description:
			"Shira-1o is is a new model and smartest uncensored AI with 8B sizes by Storm Splits (Core Member) and team. It is based on Llama 3 that has a variety of instruction, conversational, and coding skills.",
		image: "/Project Screenshots/shira.webp",
		tags: ["LLM", "Gen AI", "Uncensored"],
		layout: "half",
		link: "https://ollama.com/StormSplits/shira-1o",
	},
	{
		id: 5,
		title: "Zenleaf",
		category: "digital",
		description:
			"Secure crypto wallet with instant trading and analytics dashboard.",
		image: "/Project Screenshots/Zenleaf.webp",
		tags: ["UI/UX", "Web Design"],
		layout: "half",
		link: "https://dribbble.com/shots/25418981-ZenLeaf-Premium-Organic-Tea-Brand-Design-Case-Study",
	},
	{
		id: 6,
		title: "Gojo Illustration",
		category: "content",
		description:
			"Anime Character Illustration",
		image: "/Project Screenshots/gojo.webp",
		tags: ["Illustration", "Graphics Design"],
		layout: "full",
		link: "https://dribbble.com/shots/24032837-Anime-Character-Illustration",
	},
];

function HalfLayoutCard({ project }) {
	return (
		<>
			<div className="group-hover:bg-gradient-to-t from-black hover:ring border border-p5 lg:border-p5 hover:ring-p5 rounded-md overflow-hidden via-transparent px-4 py-8 to-transparent">
				<div className="relative overflow-hidden mb-6 aspect-[4/3]">
					<img
						src={project.image}
						alt={project.title}
						className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
					/>
					<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
				</div>

				<div className="space-y-3">
					<div className="flex flex-wrap gap-2 mb-6">
						{project.tags.map((tag, i) => (
							<span
								key={i}
								className="text-xs uppercase tracking-wider text-white border border-gray-700 px-3 py-1 rounded-full"
							>
								{tag}
							</span>
						))}
					</div>
					<h3 className="text-3xl md:text-4xl font-bold text-white transition-colors">
						{project.title}
					</h3>
					<p className="text-lg text-gray-300 mb-8 leading-snug">
						{project.description}
					</p>
					<div className=" font-CircularLight">
						{project.link ? (
							<LinkButton url={project.link} text="Visit Live Site" isExternal={true} />
						) : (
							<LinkButton url={`/works/${project.id}`} text="View Project" />
						)}
					</div>
				</div>
			</div>
		</>
	);
}

function FullWidthLayoutCard({ project }) {
	return (
		<div className="relative   hover:ring hover:ring-p5 border border-p5 lg:border-p5">
			<div className="absolute inset-0 overflow-hidden">
				<img
					src={project.image}
					alt={project.title}
					className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
			</div>

			<div className="p-6 md:p-12 relative z-10">
				<div className="max-w-[60ch] space-y-4">
					<div className="flex flex-wrap gap-2 mb-4">
						{project.tags.map((tag, i) => (
							<span
								key={i}
								className="text-xs uppercase tracking-wider text-white border border-white/30 px-3 py-1 rounded-full backdrop-blur-sm bg-white/10"
							>
								{tag}
							</span>
						))}
					</div>
					<h3 className="text-4xl md:text-5xl font-bold text-white  transition-colors">
						{project.title}
					</h3>
					<p className="text-xl text-gray-200 leading-relaxed">
						{project.description}
					</p>
					<div className="mt-60 font-CircularLight">
						{project.link ? (
							<LinkButton url={project.link} text="Visit Live Site" isExternal={true} />
						) : (
							<LinkButton url={`/works/${project.id}`} text="View Project" />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default function PortfolioWebsite() {
	const [activeTab, setActiveTab] = useState("all");

	const filteredProjects =
		activeTab === "all"
			? projects
			: projects.filter((project) => project.category === activeTab);

	// Calculate stagger offset dynamically
	const getStaggerClass = (index, filteredProjects) => {
		let halfCount = 0;
		for (let i = 0; i < index; i++) {
			if (filteredProjects[i].layout === "half") {
				halfCount++;
			}
		}
		// Apply stagger to every second 'half' item in the visual flow
		if (filteredProjects[index].layout === "half" && halfCount % 2 === 1) {
			return "md:mt-32";
		}
		return "";
	};

	return (
		<div className="min-h-screen container mb-30">
			{/* Hero Section */}
			<div className="lg:max-w-[95%] mt-20 mb-10 px-4 md:px-0">
				<div className="flex flex-col md:flex-row justify-between items-start gap-12">
					{/* Left side - Hero text */}
					<div className="flex-1 lg:w-2/3">
						<h1 className="text-[5vmax] font-CircularBlack max-w-[20ch] text-left leading-snug mb-4">
							{activeTab === "all" &&
								"We bring your boldest ideas to life"}
							{activeTab === "digital" &&
								"Crafting innovative digital products"}
							{activeTab === "websites" &&
								"Building stunning websites that convert"}
							{activeTab === "branding" &&
								"Creating memorable brand identities"}
							{activeTab === "genai" &&
								"Pioneering the future with Gen AI"}
							{activeTab === "content" &&
								"Captivating content that tells your story"}
						</h1>
					</div>

					{/* Right side - Navigation */}
					<nav className="md:pt-4 ms-4 lg:ms-0">
						<ul className="space-y-4 left">
							{menuItems.map((item) => (
								<li key={item.id}>
									<button
										onClick={() => setActiveTab(item.id)}
										className={` relative text-xl cursor-pointer md:text-2xl transition-colors ${activeTab === item.id
											? "text-p4 font-semibold"
											: "text-p1/60"
											}`}
									>
										{activeTab === item.id && (
											<>
												<span className="absolute -left-5 md:-left-6 top-0">
													•
												</span>
											</>
										)}
										<span className="absolute -right-5 -top-0.5 text-xs font-CircularLight">
											{item.id == "all"
												? projects.length
												: projects.filter(
													(value) =>
														value.category ==
														item.id
												).length}
										</span>
										{item.label}
									</button>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</div>

			{/* Projects Grid */}
			<div className="">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
					{filteredProjects.map((project, index) => (
						<div
							key={project.id}
							className={`group ${project.layout === "full" ? "md:col-span-2" : ""
								} ${getStaggerClass(index, filteredProjects)}`}
						>
							{project.layout === "full" ? (
								<FullWidthLayoutCard
									project={project}
									key={project.id}
								/>
							) : (
								<HalfLayoutCard
									project={project}
									key={project.id}
								/>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
