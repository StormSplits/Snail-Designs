import React from "react";

const SEOContentSection = () => {
    return (
        <section className="container mx-auto px-4 py-12 lg:py-20 font-CircularLight text-gray-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                {/* Column 1: Core Value Proposition */}
                <div>
                    <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                            Global Web Design & Development Agency
                        </h2>
                        <p className="mb-6 leading-relaxed">
                            Snail Designs is a premier <strong>digital agency based in India</strong>, serving ambitious brands and startups worldwide. We combine global design standards with engineering excellence to deliver high-performance websites. Whether you are in the US, UK, or anywhere across the globe, our remote-first team ensures seamless collaboration and world-class delivery.
                        </p>
                        <p className="mb-6 leading-relaxed">
                            We specialize in <strong>Offshore React & Next.js Development</strong>, providing cost-effective yet premium solutions. Our co-founder-led approach ensures that you get the strategic attention of a boutique agency with the technical capabilities of a large firm.
                        </p>

                        <h3 className="text-xl font-bold text-white mb-4 mt-8">
                            Why Partner With Snail Designs?
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 mb-6">
                            <li><strong>Global Standards:</strong> We build digital products that compete on the international stage.</li>
                            <li><strong>Remote-Ready Team:</strong> Proven track record of successful collaboration with global clients.</li>
                            <li><strong>Cost-Effective Quality:</strong> Premium development services from India at competitive rates.</li>
                            <li><strong>AI Integration:</strong> Leveraging Generative AI to stay ahead of the curve.</li>
                        </ul>
                    </div>
                </div>

                {/* Column 2: Process & Tech Stack */}
                <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                        Our Web Development Process
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-bold text-white mb-2">1. Discovery & Strategy</h4>
                            <p>We start by understanding your business goals, target audience, and market position. Our research-driven approach ensures every pixel serves a purpose.</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white mb-2">2. UI/UX Design</h4>
                            <p>Using tools like Figma, we craft intuitive user interfaces and seamless user experiences. We focus on accessibility, responsiveness, and brand consistency.</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white mb-2">3. Development & Testing</h4>
                            <p>Our developers write clean, semantic code using React, TypeScript, and Node.js. Rigorous testing ensures your site works perfectly across all devices and browsers.</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white mb-2">4. Launch & Support</h4>
                            <p>We handle the deployment process and provide ongoing maintenance to keep your digital assets secure and up-to-date.</p>
                        </div>
                    </div>

                    <div className="mt-10 p-6 bg-white/5 rounded-lg border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-4">Technology Stack</h3>
                        <p className="text-sm">
                            We leverage the modern web stack including <strong>React.js, Next.js, TypeScript, Tailwind CSS, Node.js, and Supabase</strong> to build robust digital products. Our expertise in <strong>Generative AI</strong> allows us to integrate smart features like chatbots and automated content generation.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SEOContentSection;
