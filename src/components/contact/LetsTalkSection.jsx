import React from "react";
import LinkButton from "../../ui/LinkButton";

export default function LetsTalkSection() {
	return (
		<div className="container mt-8">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				{/* Left Content */}
				<div className="space-y-8">
					<h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
						Let's Talk
					</h2>

					<p className="text-xl md:text-2xl leading-relaxed max-w-xl">
						We'd love to learn more about you and what we can design
						and build together.
					</p>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-8">
						{/* Become a Client */}
						<div className="space-y-3">
							<h3 className="text-white text-lg">
								Become a Client
							</h3>
							<LinkButton text={"Get Free Quotation"} url={"https://tally.so/r/w4ebM5"} isExternal={true} />
						</div>

						{/* Contact Us */}
						<div className="space-y-3">
							<h3 className="text-white text-lg">
								Contact Us
							</h3>
							<LinkButton text={"work@snaildesigns.in"} url={"mailto:work@snaildesigns.in"} isExternal={true} />
						</div>
					</div>
				</div>

				{/* Right Image */}
				<div className="h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
					<img
						className="w-full h-full object-cover object-center"
						src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
						alt="Team collaboration workspace"
					/>
				</div>
			</div>
		</div>
	);
}
