import React from "react";

export default function LocationsSection() {
	const locations = [
		{
			city: "Lucknow",
			address: "Uttar Pradesh,",
			cityState: "India",
		},
		// {
		// 	city: "New York",
		// 	address: "148 Lafayette St,",
		// 	cityState: "New York, NY 10013",
		// },
		// {
		// 	city: "New York",
		// 	address: "148 Lafayette St,",
		// 	cityState: "New York, NY 10013",
		// },
		// {
		// 	city: "New York",
		// 	address: "148 Lafayette St,",
		// 	cityState: "New York, NY 10013",
		//},
	];

	return (
		<div className="container my-24">
			<div className="">
				{/* Header */}
				<div className="mb-16">
					<h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
						Locations
					</h2>
					<p className="text-xl md:text-2xl leading-relaxed max-w-2xl">
						We’re a fully remote team that comes together on video whenever collaboration will maximize impact.
					</p>
				</div>

				{/* Locations Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 pt-12">
					{locations.map((location, index) => (
						<div key={index} className="space-y-4">
							<h3 className="text-4xl md:text-5xl lg:text-6xl font-bold">
								{location.city}
							</h3>
							<div className="text-lg md:text-xl text-white space-y-1">
								<p>{location.address}</p>
								<p>{location.cityState}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
