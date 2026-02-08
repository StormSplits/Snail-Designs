import React from "react";
import { useParams, Link } from "react-router";
import SEO from "../components/SEO";
import LinkButton from "../ui/LinkButton";
import { projects } from "../components/work/HeroSection";

export default function ProjectDetail() {
    const { id } = useParams();
    const project = projects.find((p) => p.id === parseInt(id));

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <p className="text-gray-400 mb-8">The project you're looking for doesn't exist.</p>
                    <Link to="/works" className="text-purple-400 hover:text-purple-300">
                        ← Back to Works
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEO
                title={`${project.title} | Snail Designs`}
                description={project.description}
                url={`https://www.snaildesigns.in/works/${project.id}`}
            />

            <div className="min-h-screen">
                {/* Hero Section */}
                <div className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                    {/* Back Button */}
                    <Link
                        to="/works"
                        className="absolute top-8 left-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Back to Works
                    </Link>
                </div>

                {/* Content Section */}
                <div className="container py-16 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-3 mb-6">
                                {project.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="text-sm uppercase tracking-wider text-purple-400 border border-purple-400/30 px-4 py-2 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Title */}
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                                {project.title}
                            </h1>

                            {/* Description */}
                            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
                                {project.fullDescription || project.description}
                            </p>

                            {/* External Link Button */}
                            {project.link && (
                                <div className="font-CircularLight">
                                    <LinkButton
                                        text="Visit Live Site"
                                        url={project.link}
                                        isExternal={true}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-32 space-y-8">
                                {/* Client */}
                                {project.client && (
                                    <div>
                                        <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Client</h3>
                                        <p className="text-xl">{project.client}</p>
                                    </div>
                                )}

                                {/* Year */}
                                {project.year && (
                                    <div>
                                        <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Year</h3>
                                        <p className="text-xl">{project.year}</p>
                                    </div>
                                )}

                                {/* Category */}
                                <div>
                                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Category</h3>
                                    <p className="text-xl capitalize">{project.category}</p>
                                </div>

                                {/* Services */}
                                {project.services && (
                                    <div>
                                        <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Services</h3>
                                        <ul className="space-y-2">
                                            {project.services.map((service, i) => (
                                                <li key={i} className="text-lg text-gray-300">
                                                    {service}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* More Projects Section */}
                <div className="container pb-20">
                    <div className="border-t border-gray-800 pt-16">
                        <h2 className="text-3xl font-bold mb-8">More Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {projects
                                .filter((p) => p.id !== project.id)
                                .slice(0, 2)
                                .map((p) => (
                                    <Link
                                        key={p.id}
                                        to={`/works/${p.id}`}
                                        className="group block"
                                    >
                                        <div className="aspect-[16/10] overflow-hidden rounded-xl mb-4">
                                            <img
                                                src={p.image}
                                                alt={p.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors">
                                            {p.title}
                                        </h3>
                                        <p className="text-gray-400 mt-2">{p.description}</p>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
