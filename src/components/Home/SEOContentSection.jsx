import React from "react";

const SEOContentSection = () => {
    return (
        <section className="container mx-auto px-4 py-12 lg:py-20 font-CircularLight text-gray-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                {/* Column 1: Core Value Proposition */}
                <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                        Leading Web Design Agency in Lucknow
                    </h2>
                    <p className="mb-6 leading-relaxed">
                        Snail Designs stands as a premier <strong>web design agency in Lucknow</strong>, committed to transforming how businesses interact with the digital world. Founded by a team of tech visionaries and lead by co-founders with global experience, we utilize cutting-edge technology to build websites that are not just visually stunning but performance-driven.
                    </p>
                    <p className="mb-6 leading-relaxed">
                        Unlike traditional agencies, we focus on <strong>React and Next.js development</strong> to ensure your website is fast, SEO-friendly, and scalable. whether you are a startup looking for a digital product launch or an established enterprise seeking digital transformation, our team delivers custom solutions tailored to your unique needs.
                    </p>

                    <h3 className="text-xl font-bold text-white mb-4 mt-8">
                        Why Choose Snail Designs?
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 mb-6">
                        <li><strong>Keep It Simple:</strong> We believe in minimalism and clarity. Our designs cut through the noise.</li>
                        <li><strong>Performance First:</strong> Utilizing Next.js and Tailwind CSS for lightning-fast load times.</li>
                        <li><strong>Global Standards, Local expertise:</strong> Based in Lucknow, serving clients worldwide with international design quality.</li>
                        <li><strong>AI Integration:</strong> Leveraging Generative AI to automate workflows and create unique user experiences.</li>
                    </ul>
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
