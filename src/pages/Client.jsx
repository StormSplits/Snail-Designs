import HeroSection from "../components/client/HeroSection";
import { ClientsList } from "../components/client/ClientsList";
import TestimonialCard from "../components/about/Testimonial";
import SEO from "../components/SEO";

export const Client = () => {
	return (
		<>
			<SEO
				title="Our Clients"
				description="Trusted by leading brands and businesses worldwide. Discover the companies we've partnered with to create exceptional digital experiences and successful web projects."
				keywords="our clients, client testimonials, case studies, trusted brands, client success stories, client reviews, partnerships"
				url="https://www.snaildesigns.in/client"
			/>
			<HeroSection />
			<ClientsList />
			<TestimonialCard />
		</>
	);
};
