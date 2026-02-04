// src/components/SEO.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "Snail Designs - Web Design & Development Agency",
  description = "Professional web design and development services. We create stunning, responsive websites using React, Next.js, and modern technologies.",
  keywords = "web design, web development, react development, nextjs, typescript, tailwind css",
  image = "https://snaildesigns.com/og-image.jpg",
  url = "https://snaildesigns.com",
  type = "website",
}) => {
  const siteTitle = title.includes("Snail Designs") ? title : `${title} | Snail Designs`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;