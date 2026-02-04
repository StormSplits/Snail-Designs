import React, { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function ImageExpand() {
	const containerRef = useRef(null);

	useEffect(() => {
		if (!containerRef.current) return;
		const img = containerRef.current.querySelector("img");
		const animationContext = gsap.context(() => {
			gsap.to(img, {
				scale: 1,
				borderRadius: "0px",
				duration: 50,
				opacity: 1,
				ease: "sine.in",
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top bottom",
					end: "bottom bottom",
					scrub: 1,
				},
			});
		});
		return () => animationContext.revert();
	}, []);

	return (
		<section ref={containerRef} className="">
			<img

				className="scale-80 object-contain opacity-10 aspect-square md:mt-8 md:aspect-video mx-auto w-full rounded object-center md:object-cover "
				src="/About/3d image.jpg"

			/>
		</section>
	);
}
