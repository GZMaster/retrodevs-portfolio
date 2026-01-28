import { SEO_CONFIG } from "./seo-config"

export function getAbsoluteUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`
  return `${SEO_CONFIG.baseUrl}${cleanPath}`
}

export function generateCanonicalUrl(path: string): string {
  return getAbsoluteUrl(path)
}

export function getAbsoluteImageUrl(imagePath: string): string {
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath
  }
  return getAbsoluteUrl(imagePath)
}

export function createOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO_CONFIG.organization.name,
    url: SEO_CONFIG.organization.url,
    logo: SEO_CONFIG.organization.logo,
    contactPoint: {
      "@type": "ContactPoint",
      email: SEO_CONFIG.organization.email,
      telephone: SEO_CONFIG.organization.phone,
      contactType: "customer service",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: SEO_CONFIG.organization.address.addressCountry,
      addressLocality: SEO_CONFIG.organization.address.addressLocality,
    },
    sameAs: SEO_CONFIG.organization.sameAs,
  }
}

export function createWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SEO_CONFIG.baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

export function createBreadcrumbSchema(path: string, pathSegments: Array<{ name: string; url: string }>) {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SEO_CONFIG.baseUrl,
    },
    ...pathSegments.map((segment, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: segment.name,
      item: segment.url,
    })),
  ]

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  }
}

export function createAboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Us",
    url: getAbsoluteUrl("/about"),
    mainEntity: {
      "@type": "Organization",
      name: SEO_CONFIG.organization.name,
    },
  }
}

export function createContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Us",
    url: getAbsoluteUrl("/contact"),
    mainEntity: {
      "@type": "Organization",
      name: SEO_CONFIG.organization.name,
      contactPoint: {
        "@type": "ContactPoint",
        email: SEO_CONFIG.organization.email,
        telephone: SEO_CONFIG.organization.phone,
        contactType: "customer service",
      },
    },
  }
}

export function createCollectionPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects",
    url: getAbsoluteUrl("/projects"),
    description: "Portfolio of web development and design projects",
  }
}

export function validateMetaDescription(description: string): boolean {
  return description.length >= 120 && description.length <= 160
}

export function generatePageTitle(title: string): string {
  if (title === "Home") {
    return SEO_CONFIG.defaultTitle
  }
  return `${title} | ${SEO_CONFIG.siteName}`
}
