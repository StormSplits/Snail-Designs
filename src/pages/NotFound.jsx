import React from "react";
import { Link } from "react-router";
import SEO from "../components/SEO";

export default function NotFound() {
	return (
		<>
			<SEO
				title="Page Not Found (404)"
				description="The page you're looking for doesn't exist. Navigate back to our homepage to explore our web design and development services."
				keywords="404, page not found, error page"
				url="https://www.snaildesigns.in/404"
			/>
			<style>
				{`
					@keyframes glitch {
						0% {
							text-shadow: 
								2px 0 #ff0000, 
								-2px 0 #00ffff;
							transform: translate(0);
						}
						20% {
							text-shadow: 
								-2px 0 #ff0000, 
								2px 0 #00ffff;
							transform: translate(-2px, 2px);
						}
						40% {
							text-shadow: 
								2px 0 #ff0000, 
								-2px 0 #00ffff;
							transform: translate(2px, -2px);
						}
						60% {
							text-shadow: 
								-2px 0 #ff0000, 
								2px 0 #00ffff;
							transform: translate(-1px, 1px);
						}
						80% {
							text-shadow: 
								2px 0 #ff0000, 
								-2px 0 #00ffff;
							transform: translate(1px, -1px);
						}
						100% {
							text-shadow: 
								2px 0 #ff0000, 
								-2px 0 #00ffff;
							transform: translate(0);
						}
					}

					@keyframes flicker {
						0%, 100% { opacity: 1; }
						50% { opacity: 0.8; }
						75% { opacity: 0.95; }
					}

					@keyframes scanline {
						0% { transform: translateY(-100%); }
						100% { transform: translateY(100%); }
					}

					.glitch-text {
						position: relative;
						animation: glitch 0.5s infinite;
						background: linear-gradient(
							180deg,
							#ffffff 0%,
							#c9a962 20%,
							#ffffff 40%,
							#5a9fd4 60%,
							#ffffff 80%,
							#c9a962 100%
						);
						background-size: 100% 200%;
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
						background-clip: text;
						filter: drop-shadow(0 0 30px rgba(132, 0, 255, 0.3));
					}

					.glitch-text::before,
					.glitch-text::after {
						content: "404";
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background: inherit;
						-webkit-background-clip: text;
						background-clip: text;
						-webkit-text-fill-color: transparent;
					}

					.glitch-text::before {
						left: 2px;
						text-shadow: -2px 0 #ff0000;
						animation: glitch 0.3s infinite reverse;
						clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
					}

					.glitch-text::after {
						left: -2px;
						text-shadow: 2px 0 #00ffff;
						animation: glitch 0.3s infinite;
						clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
					}

					.error-container {
						position: relative;
						overflow: hidden;
					}

					.error-container::before {
						content: "";
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						background: repeating-linear-gradient(
							0deg,
							transparent,
							transparent 2px,
							rgba(0, 0, 0, 0.1) 2px,
							rgba(0, 0, 0, 0.1) 4px
						);
						pointer-events: none;
						animation: flicker 0.15s infinite;
					}

					.pixelated {
						image-rendering: pixelated;
						font-smooth: never;
						-webkit-font-smoothing: none;
					}

					.glow-effect {
						text-shadow: 
							0 0 10px rgba(132, 0, 255, 0.5),
							0 0 20px rgba(132, 0, 255, 0.3),
							0 0 30px rgba(132, 0, 255, 0.2);
					}
				`}
			</style>

			<section className="min-h-screen flex flex-col items-center justify-center text-white bg-black error-container px-4">
				{/* Heading */}
				<div className="text-center mb-8 md:mb-12">
					<h1 className="text-3xl md:text-5xl lg:text-6xl font-serif italic leading-tight">
						<span className="block">Sorry, but this page didn't make it</span>
						<span className="block mt-2">through our quality control.</span>
					</h1>
				</div>

				{/* 404 Glitch Text */}
				<div className="relative my-8 md:my-16">
					<span className="glitch-text text-[120px] md:text-[200px] lg:text-[280px] font-bold tracking-wider pixelated">
						404
					</span>
				</div>

				{/* Subtitle */}
				<div className="text-center mt-8 md:mt-12 max-w-md">
					<p className="text-gray-300 text-base md:text-lg leading-relaxed font-CircularLight">
						This doesn't mean your journey ends here.
						<br />
						Let's get you back to exploring our best work!
					</p>
				</div>

				{/* CTA Button */}
				<div className="mt-10 md:mt-14 font-CircularLight">
					<Link
						to="/works"
						className="group relative text-xl inline-flex gap-2 items-center"
					>
						<div>
							<span className="glow-effect">Explore Projects</span>
							<div className="mt-1 w-full h-0.5 bg-white/30 rounded">
								<span className="block w-0 h-full group-hover:w-full bg-white transition-all duration-300"></span>
							</div>
						</div>
						<span className="text-white/30 group-hover:text-white transition-all duration-300">
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
					</Link>
				</div>
			</section>
		</>
	);
}
