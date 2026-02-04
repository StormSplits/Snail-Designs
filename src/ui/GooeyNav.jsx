import React from "react";
import { useRef, useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router";
import useMediaQuery from "../hooks/UseMediaQuery";
import { RiMenu4Fill } from "react-icons/ri";

const Gooey = ({
	isMobileNavOpened,
	toggleMobileNav,
	animationTime = 600,
	particleCount = 15,
	particleDistances = [90, 10],
	particleR = 100,
	timeVariance = 300,
	colors = [1, 2, 3, 1, 2, 3, 1, 4],
	initialActiveIndex = 0,
}) => {
	const items = [
		{ label: "Home", href: "/" },
		{ label: "About", href: "/about" },
		{ label: "Services", href: "/services" },
		{ label: "Client", href: "/client" },
		{ label: "Works", href: "/works" },
		{ label: "Contact", href: "/contact" },
	];
	const containerRef = useRef(null);
	const navRef = useRef(null);
	const filterRef = useRef(null);
	const textRef = useRef(null);
	const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
	const navigate = useNavigate();
	const location = useLocation();

	const isMobile = useMediaQuery("(max-width: 1023px)");

	// Sync activeIndex with current route on mount and location change
	useEffect(() => {
		const currentIndex = items.findIndex(item => item.href === location.pathname);
		if (currentIndex !== -1 && currentIndex !== activeIndex) {
			setActiveIndex(currentIndex);
		}
	}, [location.pathname]);

	const noise = (n = 1) => n / 2 - Math.random() * n;
	const getXY = (distance, pointIndex, totalPoints) => {
		const angle =
			((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
		return [distance * Math.cos(angle), distance * Math.sin(angle)];
	};
	const createParticle = (i, t, d, r) => {
		let rotate = noise(r / 10);
		return {
			start: getXY(d[0], particleCount - i, particleCount),
			end: getXY(d[1] + noise(7), particleCount - i, particleCount),
			time: t,
			scale: 1 + noise(0.2),
			color: colors[Math.floor(Math.random() * colors.length)],
			rotate:
				rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
		};
	};
	const makeParticles = (element) => {
		const d = particleDistances;
		const r = particleR;
		const bubbleTime = animationTime * 2 + timeVariance;
		element.style.setProperty("--time", `${bubbleTime}ms`);
		for (let i = 0; i < particleCount; i++) {
			const t = animationTime * 2 + noise(timeVariance * 2);
			const p = createParticle(i, t, d, r);
			element.classList.remove("active");
			setTimeout(() => {
				const particle = document.createElement("span");
				const point = document.createElement("span");
				particle.classList.add("particle");
				particle.style.setProperty("--start-x", `${p.start[0]}px`);
				particle.style.setProperty("--start-y", `${p.start[1]}px`);
				particle.style.setProperty("--end-x", `${p.end[0]}px`);
				particle.style.setProperty("--end-y", `${p.end[1]}px`);
				particle.style.setProperty("--time", `${p.time}ms`);
				particle.style.setProperty("--scale", `${p.scale}`);
				particle.style.setProperty(
					"--color",
					`var(--color-${p.color}, white)`
				);
				particle.style.setProperty("--rotate", `${p.rotate}deg`);
				point.classList.add("point");
				particle.appendChild(point);
				element.appendChild(particle);
				requestAnimationFrame(() => {
					element.classList.add("active");
				});
				setTimeout(() => {
					try {
						element.removeChild(particle);
					} catch {
						// do nothing
					}
				}, t);
			}, 30);
		}
	};
	const updateEffectPosition = (element) => {
		if (!containerRef.current || !filterRef.current || !textRef.current)
			return;
		const containerRect = containerRef.current.getBoundingClientRect();
		const pos = element.getBoundingClientRect();
		const styles = {
			left: `${pos.x - containerRect.x}px`,
			top: `${pos.y - containerRect.y}px`,
			width: `${pos.width}px`,
			height: `${pos.height}px`,
		};
		Object.assign(filterRef.current.style, styles);
		Object.assign(textRef.current.style, styles);
		textRef.current.innerText = element.innerText;
	};

	const handleClick = (e, index, url) => {
		e.preventDefault();
		const liEl = e.currentTarget;
		if (activeIndex === index) return;
		setActiveIndex(index);
		updateEffectPosition(liEl);
		if (filterRef.current) {
			const particles = filterRef.current.querySelectorAll(".particle");
			particles.forEach((p) => filterRef.current.removeChild(p));
		}
		if (textRef.current) {
			textRef.current.classList.remove("active");
			void textRef.current.offsetWidth;
			textRef.current.classList.add("active");
		}
		if (filterRef.current) {
			makeParticles(filterRef.current);
		}

		if (isMobile) {
			toggleMobileNav(false);
		}

		navigate(url);
	};
	const handleKeyDown = (e, index) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			const liEl = e.currentTarget.parentElement;
			if (liEl) {
				handleClick({ currentTarget: liEl }, index);
			}
		}
	};
	useEffect(() => {
		if (isMobileNavOpened) {
			window.scrollTo(0, 0);
			document.body.style.overflow = "hidden";
			document.documentElement.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
			document.documentElement.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
			document.documentElement.style.overflow = "";
		};
	}, [isMobileNavOpened]);
	useEffect(() => {
		if (!navRef.current || !containerRef.current) return;
		const activeLi = navRef.current.querySelectorAll("li")[activeIndex];
		if (activeLi) {
			updateEffectPosition(activeLi);
			textRef.current?.classList.add("active");
		}
		const resizeObserver = new ResizeObserver(() => {
			const currentActiveLi =
				navRef.current?.querySelectorAll("li")[activeIndex];
			if (currentActiveLi) {
				updateEffectPosition(currentActiveLi);
			}
		});

		resizeObserver.observe(containerRef.current);

		const page_styles = `
              :root {
                --linear-ease: linear(0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245, 1.27 15.8%, 1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949, 0.928 33.3%, 0.926, 0.933 36.8%, 1.001 45.6%, 1.013, 1.019 50.8%, 1.018 54.4%, 1 63.1%, 0.995 68%, 1.001 85%, 1);
                --color-1: #FFFFFF;
                --color-2: #7014CC;
                --color-3: #CFB1EE;
                --color-4: #3C096C;
                }
              .effect {
                position: absolute;
                opacity: 1;
                pointer-events: none;
                display: grid;
                place-items: center;
                z-index: 1;
              }
              .effect.text {
                color: white;
                transition: color 0.3s ease;
              }
              .effect.text.active {
                color: black;
              }
              .effect.filter {
                filter: blur(7px) contrast(100) blur(0);
                mix-blend-mode: lighten;
              }
              .effect.filter::before {
                content: "";
                position: absolute;
                inset: -75px;
                z-index: -2;
				background-color:black;
              }
              .effect.filter::after {
                content: "";
                position: absolute;
                inset: 0;
                background: white;
                transform: scale(0);
                opacity: 0;
                z-index: -1;
                border-radius: 9999px;
				background-color:black;
              }
              .effect.active::after {
                animation: pill 0.3s ease both;
              }
              @keyframes pill {
                to {
                  transform: scale(1);
                  opacity: 1;
                }
              }
              .particle,
              .point {
                display: block;
                opacity: 0;
                width: 20px;
                height: 20px;
                border-radius: 9999px;
                transform-origin: center;
              }
              .particle {
                --time: 5s;
                position: absolute;
                top: calc(50% - 8px);
                left: calc(50% - 8px);
                animation: particle calc(var(--time)) ease 1 -350ms;
              }
              .point {
                background: var(--color);
                opacity: 1;
                animation: point calc(var(--time)) ease 1 -350ms;
              }
              @keyframes particle {
                0% {
                  transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
                  opacity: 1;
                  animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
                }
                70% {
                  transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
                  opacity: 1;
                  animation-timing-function: ease;
                }
                85% {
                  transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
                  opacity: 1;
                }
                100% {
                  transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
                  opacity: 1;
                }
              }
              @keyframes point {
                0% {
                  transform: scale(0);
                  opacity: 0;
                  animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
                }
                25% {
                  transform: scale(calc(var(--scale) * 0.25));
                }
                38% {
                  opacity: 1;
                }
                65% {
                  transform: scale(var(--scale));
                  opacity: 1;
                  animation-timing-function: ease;
                }
                85% {
                  transform: scale(var(--scale));
                  opacity: 1;
                }
                100% {
                  transform: scale(0);
                  opacity: 0;
                }
              }
              li.active {
                color: black;
                text-shadow: none;
              }
              li.active::after {
                opacity: 1;
                transform: scale(1);
              }
              li::after {
                content: "";
                position: absolute;
                inset: 0;
                border-radius: 8px;
                background: white;
                opacity: 0;
                transform: scale(0);
                transition: all 0.3s ease;
                z-index: -1;
              }
              @media (max-width: 1023px) {
                .effect.text,
                .effect.filter {
                  display: none !important;
                }
              }
            `;
		const style = document.createElement("style");
		style.textContent = page_styles;
		document.head.appendChild(style);

		return () => {
			document.head.removeChild(style);
			resizeObserver.disconnect();
		};
	}, [activeIndex]);

	if (isMobile) {
		return (
			<div
				className={`fixed inset-0 z-[9998] transition-all duration-500 ${isMobileNavOpened
					? 'opacity-100 pointer-events-auto'
					: 'opacity-0 pointer-events-none'
					}`}
				style={{
					backgroundColor: 'rgba(18, 18, 18, 0.98)',
					backdropFilter: 'blur(20px)'
				}}
			>
				{/* Close Button - Using hamburger icon */}
				<button
					onClick={toggleMobileNav}
					className={`absolute top-6 right-6 transition-all duration-300 ${isMobileNavOpened ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
						}`}
					style={{ transitionDelay: isMobileNavOpened ? '300ms' : '0ms' }}
				>
					<RiMenu4Fill size={28} />
				</button>

				<div className="h-full flex flex-col justify-center items-center" ref={containerRef}>
					<nav style={{ transform: "translate3d(0,0,0.01px)" }}>
						<ul
							ref={navRef}
							className="header-nav flex flex-col gap-6 list-none p-0 m-0 relative z-[3]"
							style={{
								color: "white",
								textShadow: "0 1px 1px hsl(205deg 30% 10% / 0.2)",
							}}
						>
							{items.map((item, index) => (
								<li
									key={index}
									className={`relative cursor-pointer transition-all duration-500 ease-out text-center ${activeIndex === index ? "active" : ""
										}`}
									style={{
										transform: isMobileNavOpened
											? 'translateY(0) translateX(0)'
											: 'translateY(30px) translateX(-20px)',
										opacity: isMobileNavOpened ? 1 : 0,
										transitionDelay: isMobileNavOpened
											? `${index * 80 + 100}ms`
											: `${(items.length - index) * 50}ms`
									}}
								>
									<NavLink
										onClick={(e) => handleClick(e, index, item.href)}
										onKeyDown={(e) => handleKeyDown(e, index)}
										className="outline-none py-3 px-8 inline-block text-3xl font-light transition-all duration-300"
									>
										{item.label}
									</NavLink>
								</li>
							))}
						</ul>
					</nav>

					{/* Bottom decoration */}
					<div
						className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 transition-all duration-500 ${isMobileNavOpened ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
							}`}
						style={{ transitionDelay: isMobileNavOpened ? '500ms' : '0ms' }}
					>
						<span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
						<span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
						<span className="w-1.5 h-1.5 rounded-full bg-purple-300"></span>
					</div>
				</div>
				<span className="effect filter hidden" ref={filterRef} />
				<span className="effect text hidden" ref={textRef} />
			</div>
		);
	} else {
		return (
			<>
				<div className="relative" ref={containerRef}>
					<nav
						className="flex relative"
						style={{ transform: "translate3d(0,0,0.01px)" }}
					>
						<ul
							ref={navRef}
							className="header-nav flex gap-8 list-none p-0 px-4 m-0 relative z-[3]"
							style={{
								color: "white",
								textShadow:
									"0 1px 1px hsl(205deg 30% 10% / 0.2)",
							}}
						>
							{items.map((item, index) => (
								<li
									key={index}
									className={`rounded-full relative cursor-pointer transition-[background-color_color_box-shadow] duration-300 ease shadow-[0_0_0.5px_1.5px_transparent] text-white ${activeIndex === index ? "active" : ""
										}`}
								>
									<NavLink
										onClick={(e) =>
											handleClick(e, index, item.href)
										}
										to={item.href}
										onKeyDown={(e) =>
											handleKeyDown(e, index)
										}
										className="outline-none py-[0.6em] px-[1em] inline-block"
									>
										{item.label}
									</NavLink>
								</li>
							))}
						</ul>
					</nav>
					<span className="effect filter" ref={filterRef} />
					<span className="effect text ms-[2.2spx]" ref={textRef} />
				</div>
			</>
		);
	}
};
export default Gooey;