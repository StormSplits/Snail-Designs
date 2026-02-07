import React from "react";
import LetsTalkSection from "../components/contact/LetsTalkSection";
import LocationsSection from "../components/contact/LocationSection";
import JoinUsSection from "../components/contact/JoinUs";
import SEO from "../components/SEO";

export const Contact = () => {
  return (
    <>
      <SEO
        title="Contact Snail Designs | Hire Web Developers in Lucknow"
        description="Get in touch with Snail Designs. Ready to transform your digital presence? Contact us for web design, development, and branding inquiries in Lucknow and globally."
        keywords="contact web design agency, hire react developers, web design quote lucknow, snail designs contact, connect with web developers"
        url="https://www.snaildesigns.in/contact"
      />
      <LetsTalkSection />
      <LocationsSection />
      {/* <JoinUsSection/> */}
    </>
  );
};
