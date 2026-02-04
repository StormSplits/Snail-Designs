import React, { useState } from "react";

function FAQAccordion({ question, answer, isOpen, onClick }) {
	return (
		<div onClick={onClick} className="cursor-pointer select-none">
			<div className="flex items-center justify-between gap-1.5">
				<h2 className="text-xl lg:text-2xl font-medium">
					{question}
				</h2>
				<div>
					{isOpen ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2.5}
							stroke="currentColor"
							className="size-5 shrink-0"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m4.5 15.75 7.5-7.5 7.5 7.5"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2.5}
							stroke="currentColor"
							className="size-5 shrink-0"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m19.5 8.25-7.5 7.5-7.5-7.5"
							/>
						</svg>
					)}
				</div>
			</div>
			<div
				className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-40 py-4" : "max-h-0"
					}`}
			>
				<p className="lg:text-xl font-CircularLight opacity-80">
					{answer}
				</p>
			</div>
		</div>
	);
}

export default function FAQ() {
	const [openIndex, setOpenIndex] = useState(null);

	const faqs = [
		{
			question:
				"What are your core services as a UX design and Web Development firm?",
			answer: "We provide web development, mobile app development, UI/UX design, and custom software solutions tailored to your needs.",
		},
		{
			question: "How long does a project take?",
			answer: "The timeline depends on the project size and requirements. Typically, small projects take 2–4 weeks, while larger ones may take 2–3 months.",
		},
		{
			question: "Do you provide ongoing support?",
			answer: "Yes! We offer maintenance, updates, and technical support to ensure your project runs smoothly even after launch.",
		},
		{
			question: "How can I get started?",
			answer: "You can contact us through our website, and we'll schedule a free consultation to discuss your project and provide a detailed plan.",
		},
	];

	return (
		<section className="mb-30 container text-white grid gap-10 grid-cols-1 xl:grid-cols-[600px_1fr] place-content-start">
			<div className="">
				<h1 className="text-4xl md:text-[4vmax]  leading-snug font-bold">
					FAQ
				</h1>
			</div>
			<div className="space-y-8 lg:space-y-12 mt-4">
				{faqs.map((faq, index) => (
					<FAQAccordion
						key={index}
						question={faq.question}
						answer={faq.answer}
						isOpen={openIndex === index}
						onClick={() =>
							setOpenIndex(openIndex === index ? null : index)
						}
					/>
				))}
			</div>
		</section>
	);
}

