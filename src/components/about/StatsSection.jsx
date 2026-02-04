import React from "react";

export default function StatsSection() {
	const stats = [
		{ id: 1, value: "5", label: "Global Team Members" },
		{ id: 2, value: "2", label: "Years In Business" },
		{ id: 3, value: "20+", label: "Projects Completed" },
	];

	return (
		<section className="container md:my-16 mb-10">
			<div className="">
				<div className="flex flex-wrap gap-10 md:gap-32 xl:gap-48 ">
					{stats.map((stat) => (
						<div className="text-white text-left" key={stat.id}>
							<h2 className="text-7xl md:text-8xl lg:text-9xl leading-snug font-bold">
								{stat.value}
							</h2>
							<p className="text-lg font-CircularLight">
								{stat.label}
							</p>
						</div>
					))}
				</div>
				<div className=" mt-20">
					<h1 className="text-3xl md:text-9xl text-[50px] mt-5">Lucknow</h1>
					<p className="text-2xl md:pl-[10px]">Headquarters</p>
				</div>
			</div>
		</section>
	);
}
