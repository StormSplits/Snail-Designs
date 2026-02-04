import React from "react";
import Prism from "../../ui/Prism";

export const Capabilities = () => {
	const capabilities = [
		{
			title: "Innovation",
			items: [
				"Creative product ideas",
				"AI-driven solutions",
				"Prototype development",
				"Continuous improvement",
			],
		},
		{
			title: "Technology",
			items: [
				"Full-stack web apps",
				"Cloud infrastructure",
				"API integrations",
				"Mobile-first design",
			],
		},
		{
			title: "Design",
			items: [
				"Modern UI/UX",
				"Brand identity",
				"Interactive prototypes",
				"Responsive layouts",
			],
		},
		{
			title: "Global Reach",
			items: [
				"International clients",
				"Multilingual support",
				"Remote collaboration",
				"Cross-border strategies",
			],
		},
	];

	return (
		<div className="relative container overflow-hidden mt-24 lg:mt-32">
			{/* Content Container */}
			<div className="relative">
				<div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-2 grid-cols-1 ">
					{/* Right Side - Image (appears first on mobile) */}

					<div className="space-y-8 lg:space-y-10 order-1 md:order-0 z-10">
						{/* Heading & Description */}
						<div className="space-y-4">
							<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
								Our Capabilities
							</h1>
							<p className="text-lg sm:text-xl lg:text-2xl font-light text-gray-300 max-w-2xl">
								We specialize in delivering modern digital
								solutions that combine creativity, technology,
								and strategy. Explore some of our key strengths
								below.
							</p>
						</div>

						{/* Features Section */}
						<div className="space-y-6 lg:space-y-8">
							{capabilities.map((capability, index) => (
								<div
									key={index}
									className="grid grid-cols-1 sm:grid-cols-[200px_1fr] md:grid-cols-[250px_1fr] gap-4 lg:gap-6 rounded-lg transition-colors duration-300"
								>
									<h2 className="text-3xl sm:text-4xl font-bold text-white">
										{capability.title}
									</h2>
									<ul className="space-y-2 sm:space-y-3 text-base sm:text-lg text-gray-200">
										{capability.items.map(
											(item, itemIndex) => (
												<li
													key={itemIndex}
													className="flex items-start"
												>
													<span>{item}</span>
												</li>
											)
										)}
									</ul>
								</div>
							))}
						</div>
					</div>
					<div className="order-0 md:order-1 mt-10 mb-5">
						{/* <div className="w-full h-[400px] md:h-[500px] xl:h-[600px]">
							<Prism
                animationType="hover"
                timeScale={0.5}
                height={4}
                baseWidth={6}
                scale={1.6}
                hueShift={0}
                colorFrequency={1}
                noise={0}
                glow={1}
              />
						</div> */}
					</div>
					{/* Left Side - Content */}
				</div>
			</div>
		</div>
	);
};
