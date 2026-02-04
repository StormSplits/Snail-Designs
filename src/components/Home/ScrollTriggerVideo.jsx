import { Fullscreen } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(gsap);

export default function ScrollTriggerVideo() {
	const [isExpanded, setIsExpanded] = useState(false);
	const videoContainerRef = useRef(null);
	const playerRef = useRef(null);

	useEffect(() => {
		if (!videoContainerRef.current) return;

		const context = gsap.context(() => {
			gsap.to(videoContainerRef.current, {
				borderRadius: "0px",
				scale: 1,
				scrollTrigger: {
					trigger: videoContainerRef.current,
					start: "top bottom",
					end: "bottom 50%",
					scrub: true,
				},
			});
			return () => context.revert();
		});
	}, []);

	return (
		<div
			ref={videoContainerRef}
			className="relative xl:h-screen overflow-hidden scale-50 rounded-4xl"
		>
			<video muted autoPlay loop className="size-full object-cover">
				<source src="/banner.mp4" />
			</video>
		</div>
	);
}
