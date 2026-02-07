import HeroSection from "../components/client/HeroSection";
import { ClientsList } from "../components/client/ClientsList";
import TestimonialCard from "../components/about/Testimonial";
import SEO from "../components/SEO";

export const Client = () => {
	return (
		<>
			<SEO
				title="Our Clients | Snail Designs"
				description="See the diverse range of clients and industries Snail Designs has partnered with to deliver exceptional digital experiences."
				keywords="snail designs clients, web design portfolio clients, happy customers, trusted by brands"
				url="https://www.snaildesigns.in/client"
			/>
			<HeroSection />
			<ClientsList />
			<TestimonialCard />
		</>
	);
};
