import React from "react";
import LetsTalkSection from "../components/contact/LetsTalkSection";
import LocationsSection from "../components/contact/LocationSection";
import JoinUsSection from "../components/contact/JoinUs";
import SEO from "../components/SEO";

export const Contact = () => {
  return (
    <>
     <SEO
        title="Contact Us"
        description="Get in touch with Snail Designs. Let's discuss your project and create something amazing together. Contact us for web design, development services, and project consultations."
        keywords="contact snail designs, get in touch, web design inquiry, project consultation, hire web developers, contact form, request quote"
        url="https://snaildesigns.com/contact"
      />
      <LetsTalkSection />
      <LocationsSection/>
      {/* <JoinUsSection/> */}
    </>
  );
};
