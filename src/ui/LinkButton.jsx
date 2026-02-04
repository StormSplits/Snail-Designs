import React from "react";
import { Link } from "react-router";

export default function LinkButton({ text, url, isExternal = false }) {
	const buttonContent = (
		<>
			<div className="">
				<span>{text}</span>
				<div className="mt-1 w-full h-0.5 bg-white/30 rounded">
					<span className="block w-0 h-full group-hover/link-button:w-full bg-white transition-all duration-300"></span>
				</div>
			</div>
			<span className="text-white/30 group-hover/link-button:text-white transition-all duration-300">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
					/>
				</svg>
			</span>
		</>
	);

	if (isExternal) {
		return (
			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				className="group/link-button relative text-xl inline-flex gap-2 items-center"
			>
				{buttonContent}
			</a>
		);
	}

	return (
		<Link
			to={url}
			className="group/link-button relative text-xl inline-flex gap-2 items-center"
		>
			{buttonContent}
		</Link>
	);
}

