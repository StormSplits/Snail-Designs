"use client";
import { motion } from "framer-motion";

export default function ClaySection({
	number,
	title,
	desc1,
	desc2,
	image,
	reverse,
}) {
	return (
		<section className="container mt-30 overflow-hidden">
			<div className=" ">
				<div
					className={`grid grid-cols-1 md:grid-cols-2 items-center gap-8 sm:gap-10 md:gap-20 xl:gap-40 ${reverse
						? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
						: ""
						}`}
				>
					{/* Content Column */}
					<motion.div
						className="w-full"
						initial={{ opacity: 0, x: reverse ? 100 : -100 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						viewport={{ once: true, amount: 0.3 }}
					>
						<div className="flex flex-col gap-8">
							<span className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-white leading-none">
								{number}
							</span>
							<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight sm:leading-tight md:leading-tight lg:leading-tight">
								{title}
							</h2>
							<div className="space-y-3 sm:space-y-4 lg:space-y-5">
								<p className="text-xl lg:text-2xl mt-8 font-CircularLight text-gray-200">
									{desc1}
								</p>
								<p className="text-xl lg:text-2xl mt-8 font-CircularLight text-gray-200">
									{desc2}
								</p>
							</div>
						</div>
					</motion.div>

					{/* Image Column */}
					<motion.div
						className="w-full"
						initial={{ opacity: 0, y: 100 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						viewport={{ once: true, amount: 0.3 }}
					>
						<div className="flex justify-center lg:justify-start">
							<div className="w-full lg:h-[700px] ">
								<img
									src={image}
									alt={title}
									className="w-full h-auto object-cover rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl"
									loading="lazy"
								/>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
