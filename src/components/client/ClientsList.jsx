import React from "react";

export const ClientsList = () => {
	const clients = [
		{
			name: "BBD University",
			description:
				"UI/UX Design and website development for BBD University annual fest 2025.",
		},
		{
			name: "TeleCRM",
			description:
				"Transforming existing page into a more aesthetically pleasing, intuitive, and engaging experience for their CRM service audience.",
		},
		{
			name: "Ezaz Shaik",
			description:
				"UI/UX Design and website development for Ezaz Shaik.",
		},
		{
			name: "Sneh Dhara NGO",
			description:
				"Brand identity and website development for Sneh Dhara NGO.",
		},
		{
			name: "NHP India",
			description:
				"UI/UX Design and website development for NHP India.",
		},
		{
			name: "Habot",
			description:
				"Development and deployment of task management web app for Habot.",
		},
		// {
		// 	name: "Amazon",
		// 	description:
		// 		"E-commerce optimization and cloud services interface design.",
		// },
		// {
		// 	name: "Microsoft",
		// 	description:
		// 		"Enterprise software design and accessibility consulting for Azure products.",
		// },
		// {
		// 	name: "Tesla",
		// 	description:
		// 		"Digital experience design for vehicle interface and mobile applications.",
		// },
		// {
		// 	name: "Adobe",
		// 	description:
		// 		"Collaboration on creative tool workflows and design system architecture.",
		// },
		// {
		// 	name: "Airbnb",
		// 	description:
		// 		"Travel platform redesign and host experience optimization.",
		// },
		// {
		// 	name: "Nike",
		// 	description:
		// 		"Digital product strategy and mobile commerce experience design.",
		// },
	];

	return (
		<div className="container mt-28 mb-40">
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-20 xl:gap-x-40 gap-y-15">
				{clients.map((client, index) => (
					<div
						key={index}
						className=" rounded-lg hover:shadow-lg transition-shadow"
					>
						<h3 className="text-2xl xl:text-3xl mb-3">
							{client.name}
						</h3>
						<p className="text-gray-300 opacity-80 xl:text-lg max-w-[30ch] lg:max-w-[25ch] text-left">
							{client.description}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};
