"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full h-[80vh] max-w-7xl mx-auto overflow-hidden shadow-2xl group">
      {/* Background Image */}
      <img
        src="https://images.pexels.com/photos/1054655/pexels-photo-1054655.jpeg?cs=srgb&dl=pexels-hsapir-1054655.jpg&fm=jpg"
        alt="Data Analytics Banner"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/60 to-black/80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>

      {/* Main Content */}
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 h-full">
        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center px-6 md:px-12 text-white">
          <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Transform
            </span>
            <br />
            <span className="text-white">Your Data Into</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Insights
            </span>
          </h1>

          <p className="text-lg md:text-xl max-w-xl mb-10 text-gray-200 leading-relaxed font-light">
            Unlock the power of advanced data analytics and build intelligent
            solutions with our cutting-edge AI technology and expert guidance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Get Started Button */}
            <button
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-1"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-2">
                <span>Get Started</span>
                <ChevronRight
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isHovered ? "translate-x-1" : ""
                  }`}
                />
              </div>
            </button>

            {/* Learn More Button */}
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl font-bold text-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:shadow-xl hover:shadow-white/10">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                Learn More
              </span>
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex items-center justify-center bg-black/70 text-white text-2xl font-bold">
         play video
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-10"></div>
    </div>
  );
}
