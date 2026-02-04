import React from 'react';

export default function JoinUsSection() {
  const positions = [
    "Brand Designer",
    "Middle UI/UX Designer",
    "Senior UI/UX Designer",
    "UI/UX Design Lead"
  ];

  return (
    <div className=" text-white py-20 px-6 md:px-8 lg:px-8 relative overflow-hidden">
      {/* Decorative Spheres */}
      <div className="absolute top-32 right-1/4 w-16 h-16 bg-pink-500 rounded-full blur-sm opacity-80"></div>
      <div className="absolute top-56 right-1/3 w-12 h-12 bg-blue-600 rounded-full blur-sm opacity-80"></div>
      
      <div className=" relative z-10">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            Join Us
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-2xl">
            Work from anywhere. Be part of a global, world-class<br className="hidden md:block" />
            creative team shaping the future of digital.
          </p>
        </div>

        {/* Open Positions */}
        <div className="mt-20">
          <h3 className="text-3xl md:text-4xl font-bold mb-10">
            Open Positions
          </h3>
          
          <div className="space-y-1 max-w-[30%]">
            {positions.map((position, index) => (
              <a
                key={index}
                href="#apply"
                className="block text-2xl md:text-3xl py-4 border-b border-gray-700 hover:text-gray-300 transition-colors duration-200 group"
              >
                <span className="inline-block group-hover:translate-x-2 transition-transform duration-200">
                  {position}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Dark gradient overlay on right side */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-black/40 to-transparent pointer-events-none"></div>
    </div>
  );
}