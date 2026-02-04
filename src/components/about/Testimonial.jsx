import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialCard() {
	const testimonials = [
		{
			quote: "I had only a rough idea for my website, but Snail Designs turned it into something really professional. They were patient with my feedback and gave me multiple options to choose from. Very happy with the final result.",
			author: "Rakesh Kumar",
			position: "Small Business Owner",
		},
		{
			quote: "Working with Snail Designs was super easy. They understood my requirements very well and made the design look modern and clean. Even small changes were done quickly. Highly recommend them for anyone looking for UI/UX work.",
			author: "Amit Yadav",
			position: "BBD University Management",
		},
		{
			quote: "Snail Designs did a great job with my mobile app screens. They quickly understood what I wanted and made the design simple and easy to use. The communication was smooth, and they delivered everything on time. I’ll definitely work with them again.",
			author: "Ezaz Shaik",
			position: "Game Developer",
		},
		{
			quote: "Snail Designs helped me design the UI for my first mobile app. I didn’t know much about design, but they guided me step by step. The screens look clean and professional now. Great experience overall.",
			author: "Meera Iyer",
			position: "Freelance App Developer",
		},
	];

	const [currentIndex, setCurrentIndex] = useState(0);

	const handlePrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
		);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
		);
	};

	return (
		<div className="my-20 container">
			<div className="flex flex-col md:flex-row-reverse justify-between items-end md:items-start gap-8">
				<div className="flex justify-end gap-8">
					<button
						onClick={handlePrevious}
						className="text-white cursor-pointer hover:text-p5 transition-colors"
						aria-label="Previous testimonial"
					>
						<ChevronLeft size={40} strokeWidth={2} />
					</button>
					<button
						onClick={handleNext}
						className="text-white cursor-pointer hover:text-p5 transition-colors"
						aria-label="Next testimonial"
					>
						<ChevronRight size={40} strokeWidth={2} />
					</button>
				</div>

				<blockquote className="text-pretty md:w-2/3">
					<p className="text-xl text-pretty sm:text-2xl lg:text-3xl xl:text-4xl text-white font-CircularLight leading-tight">
						"{testimonials[currentIndex].quote}"
					</p>
				</blockquote>
			</div>

			<div className="mt-8">
				<h3 className="text-xl text-white font-medium mb-1">
					{testimonials[currentIndex].author}
				</h3>
				<p className="text-base text-gray-400">
					{testimonials[currentIndex].position}
				</p>
			</div>
		</div>
	);
}
