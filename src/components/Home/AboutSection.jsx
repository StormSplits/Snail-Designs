import React from "react";
import LinkButton from "../../ui/LinkButton";

export default function AboutSection() {
	const imageCards = [
		{
			id: 1,
			image: "https://source.unsplash.com/600x400/?nature,mountain",
			title: "Mountain Adventure",
		},
		{
			id: 2,
			image: "https://source.unsplash.com/600x400/?technology,future",
			title: "Future Technology",
		},
		{
			id: 3,
			image: "https://source.unsplash.com/600x400/?team,work",
			title: "Team Collaboration",
		},
	];

	return (
		<div className="container">
			<header className="">
				<h2 className="text-2xl xl:text-3xl max-w-[30ch] leading-snug font-bold mb-4">
					We bring ideas to life with design that moves at your pace.
				</h2>
				<p className="text-xl max-w-[30ch] lg:text-2xl mt-8 font-CircularLight">
					From websites to branding, we design and build inventive
					digital experiences that connect with people, everywhere
					your brand shows up.
				</p>
				<div className="my-12 font-CircularLight">
					<LinkButton text="View Our Services" url={"/services"} />
				</div>
			</header>

			{/* Flexible Image Cards */}
			<section>
				<div className="flex-row flex overflow-x-auto no-scrollbar gap-12 my-20">
					<div className="h-64 lg:h-96 shrink-0 aspect-[4/3] rounded-md overflow-hidden">
						<img
							className="size-full object-cover object-center"
							src="/Home Services/Web dev.jpg"
							alt="Web Development Services"
						/>
					</div>
					<div className="h-54 lg:h-80 shrink-0 aspect-[3/4] my-auto rounded-md overflow-hidden">
						<img
							className="size-full object-cover object-center"
							src="/Home Services/branding.jpg"
							alt="Branding Services"
						/>
					</div>
					<div className="h-64 lg:h-96 shrink-0 aspect-[4/3] rounded-md overflow-hidden">
						<img
							className="size-full object-cover object-center"
							src="/Home Services/uiux.jpg"
							alt="UI/UX Design Services"
						/>
					</div>
				</div>
			</section>
		</div>
	);
}
