// Footer.tsx
import { SiLetterboxd, SiLinkedin } from "react-icons/si";
import { Link } from "react-router";
import { MdEmail } from "react-icons/md";

const navigations = [
	{ label: "Home", url: "/" },
	{ label: "About", url: "/about" },
	{
		label: "Services",
		url: "/services",
	},
	{
		label: "Client",
		url: "/client",
	},
	{
		label: "Works",
		url: "/works",
	},
	{
		label: "Contact",
		url: "/contact",
	},
];

export default function Footer() {
	return (
		<footer className="relative overflow-hidden bg-p5 text-white">
			{/* main grid */}
			<div className="container py-20 font-CircularLight">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:grid-cols-4">
					{/* Come by */}
					<div>
						<h3 className="text-3xl tracking-tight font-CircularBook">
							Come by
						</h3>
						<div className="mt-6 space-y-6">
							<address className="not-italic leading-6">
								<div className="font-semibold">
									Snail Design
								</div>
								Lucknow
								<br />
								Uttar Pradesh, 226028
								<br />
								India
							</address>
						</div>
					</div>

					{/* Say hello */}
					<div>
						<h3 className="text-3xl tracking-tight font-CircularBook">
							Say hello
						</h3>
						<div className="mt-6 space-y-4">
							<ul className="space-y-2">
								<li>
									<a
										href="mailto:work@snaildesigns.in"
										className="flex gap-3 items-center group transition-colors duration-300 hover:text-purple-300"
									>
										<MdEmail className="size-9" />
										<span className="relative">
											Email
											<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-300 group-hover:w-full transition-all duration-300"></span>
										</span>
									</a>
								</li>
								<li>
									<a
										href="https://www.linkedin.com/company/108555705"
										target="_blank"
										rel="noopener noreferrer"
										className="flex gap-4 items-center group transition-colors duration-300 hover:text-purple-300"
									>
										<SiLinkedin className="size-7 ms-1" />
										<span className="relative">
											LinkedIn
											<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-300 group-hover:w-full transition-all duration-300"></span>
										</span>
									</a>
								</li>
							</ul>
						</div>
					</div>

					{/* Explore */}
					<nav aria-label="Footer Navigation">
						<h3 className="text-3xl tracking-tight font-CircularBook">
							Explore
						</h3>
						<ul className="mt-6 space-y-3">
							{navigations.map((v, i) => (
								<li key={i}>
									<Link
										to={v.url}
										className="group relative inline-block transition-colors duration-300 hover:text-purple-300"
									>
										{v.label}
										<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-300 group-hover:w-full transition-all duration-300"></span>
									</Link>
								</li>
							))}
						</ul>
					</nav>

					{/* CTA block */}
					<div className="md:flex md:flex-col md:items-start md:justify-start">
						<p className="font-CircularBook text-2xl leading-snug text-rose-50/95 md:text-[28px]">
							Let's Talk.
						</p>
						<div className="font-CircularLight mt-8">
							<button className="group relative text-xl inline-flex gap-2 items-center">
								<div className="">
									<Link to={"/contact"}>Get In Touch</Link>
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
							</button>
						</div>
					</div>
				</div>

				{/* gigantic wordmark */}
				<div className="pointer-events-none select-none pt-16 md:pt-20">
					<div className="leading-[0.85] text-[20vmin] font-CircularBlack">
						<div>snail</div>
						<div>design</div>
					</div>
				</div>

				{/* legal row */}
				<div className="mt-6 flex flex-col justify-between gap-4 border-t border-white py-4 text-sm md:flex-row">
					<p>© 2026 Snail Design. All rights reserved.</p>
					<div className="flex items-center gap-6">
						<Link to="/cancellation" className="group relative inline-block transition-colors duration-300 hover:text-purple-300">
							Cancellation Policy
							<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-300 group-hover:w-full transition-all duration-300"></span>
						</Link>
						<Link to="/terms" className="group relative inline-block transition-colors duration-300 hover:text-purple-300">
							Terms
							<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-300 group-hover:w-full transition-all duration-300"></span>
						</Link>
						<Link to="/privacy" className="group relative inline-block transition-colors duration-300 hover:text-purple-300">
							Privacy
							<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-300 group-hover:w-full transition-all duration-300"></span>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
