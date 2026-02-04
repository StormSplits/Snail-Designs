import React from "react";

export default function HeroSection() {
  return (
    <div className="mt-8">
      <div className="container">
        <div className=" ">
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">Clients</h1>
          </div>
          <div className="mb-16">
            <p className="text-xl md:text-2xl max-w-2xl leading-relaxed">
              Trusted by ambitious brands of all sizes, from early-stage startups to global enterprises.
            </p>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              src="/Clients/prop bag.jpg"
              alt="Client project showcase"
            />
          </div>
          <div className="h-80 md:mt-12 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              src="/Clients/ui mock.jpg"
              alt="Client project showcase"
            />
          </div>
          <div className="h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              src="/Clients/cover art.jpg"
              alt="Client project showcase"
            />
          </div>
        </div>
      </div>
    </div>
  );
};