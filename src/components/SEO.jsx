// src/components/SEO.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "Snail Designs - Web Design & Development Agency",
  description = "Professional web design and development services. We create stunning, responsive websites using React, Next.js, and modern technologies.",
  keywords = "web design, web development, react development, nextjs, typescript, tailwind css",
  image = "https://www.snaildesigns.in/og-image.jpg",
  url = "https://www.snaildesigns.in",
  type = "website",
  article = null, // For blog/article pages
  breadcrumbs = null, // Array of { name, url } for breadcrumb schema
  service = null, // For service pages { name, description, provider }
  faq = null, // For FAQ pages array of { question, answer }
}) => {
  const siteTitle = title.includes("Snail Designs") ? title : `${title} | Snail Designs`;

  // Generate breadcrumb structured data
  const getBreadcrumbSchema = () => {
    if (!breadcrumbs || breadcrumbs.length === 0) return null;

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    };
  };

  // Generate article structured data
  const getArticleSchema = () => {
    if (!article) return null;

    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title || title,
      "description": article.description || description,
      "image": article.image || image,
      "author": {
        "@type": "Organization",
        "name": "Snail Designs"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Snail Designs",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.snaildesigns.in/logo.png"
        }
      },
      "datePublished": article.datePublished,
      "dateModified": article.dateModified || article.datePublished
    };
  };

  // Generate service structured data
  const getServiceSchema = () => {
    if (!service) return null;

    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": service.name,
      "description": service.description || description,
      "provider": {
        "@type": "Organization",
        "name": "Snail Designs",
        "url": "https://www.snaildesigns.in"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Worldwide"
      }
    };
  };

  // Generate WebPage schema
  const getWebPageSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": siteTitle,
    "description": description,
    "url": url,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Snail Designs",
      "url": "https://www.snaildesigns.in"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Snail Designs",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.snaildesigns.in/logo.png"
      }
    }
  });

  // Generate Organization Schema (Global)
  const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.snaildesigns.in/#organization",
    "name": "Snail Designs",
    "url": "https://www.snaildesigns.in",
    "logo": "https://www.snaildesigns.in/logo.png",
    "description": "Professional web design and development agency specializing in React, Next.js, and modern web technologies.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lucknow",
      "addressRegion": "Uttar Pradesh",
      "addressCountry": "IN"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "email": "hello@snaildesigns.in",
        "availableLanguage": ["English", "Hindi"]
      }
    ],
    "sameAs": [
      "https://twitter.com/snaildesigns",
      "https://linkedin.com/company/snaildesigns",
      "https://github.com/snaildesigns",
      "https://instagram.com/snaildesigns"
    ]
  });

  // Generate FAQ Schema
  const getFAQSchema = () => {
    if (!faq || faq.length === 0) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faq.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
  };

  const breadcrumbSchema = getBreadcrumbSchema();
  const articleSchema = getArticleSchema();
  const serviceSchema = getServiceSchema();
  const webPageSchema = getWebPageSchema();
  const organizationSchema = getOrganizationSchema();
  const faqSchema = getFAQSchema();

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Snail Designs" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Language */}
      <meta httpEquiv="content-language" content="en" />
      <html lang="en" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Snail Designs" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@snaildesigns" />
      <meta name="twitter:site" content="@snaildesigns" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Alternate languages (for future i18n) */}
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* WebPage Schema */}
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>

      {/* Breadcrumb Schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {/* Article Schema */}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}

      {/* Service Schema */}
      {serviceSchema && (
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      )}

      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* FAQ Schema */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;