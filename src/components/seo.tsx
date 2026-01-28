import { Helmet } from "react-helmet-async"

interface SEOProps {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  ogUrl?: string
  ogType?: string
  twitterCard?: string
  canonicalUrl?: string
  noindex?: boolean
  nofollow?: boolean
  locale?: string
  alternateLanguages?: Record<string, string>
  schema?: Record<string, any>
  article?: {
    publishedTime?: string
    modifiedTime?: string
    author?: string
    section?: string
    tags?: string[]
  }
}

export function SEO({
  title,
  description,
  keywords = "web development, web design, product design, app development, AI development, content development, automation systems, digital agency, custom websites, React development, TypeScript development, full-stack development, UI/UX design, elite developers, premium digital experiences",
  ogImage = "/assets/retrodevslogo.png",
  ogUrl = typeof window !== "undefined" ? window.location.href : "https://retrodevs.com",
  ogType = "website",
  twitterCard = "summary_large_image",
  canonicalUrl,
  noindex = false,
  nofollow = false,
  locale = "en_US",
  alternateLanguages,
  schema,
  article,
}: SEOProps) {
  try {
    const fullTitle = `${title} | RetroDevs`
    const robots = `${noindex ? "noindex" : "index"},${nofollow ? "nofollow" : "follow"}`

    return (
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{fullTitle}</title>
        <meta name="title" content={fullTitle} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content={robots} />
        <meta name="language" content={locale} />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="RetroDevs" />

        {/* Canonical URL */}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:locale" content={locale} />
        <meta property="og:site_name" content="RetroDevs" />

        {/* Twitter */}
        <meta property="twitter:card" content={twitterCard} />
        <meta property="twitter:url" content={ogUrl} />
        <meta property="twitter:title" content={fullTitle} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={ogImage} />

        {/* Business Information */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="business:contact_data:country_name" content="United States" />

        {/* Alternate Languages */}
        {alternateLanguages &&
          Object.entries(alternateLanguages).map(([lang, url]) => (
            <link key={lang} rel="alternate" hrefLang={lang} href={url} />
          ))}

        {/* Article Meta Tags */}
        {article && (
          <>
            {article.publishedTime && (
              <meta property="article:published_time" content={article.publishedTime} />
            )}
            {article.modifiedTime && (
              <meta property="article:modified_time" content={article.modifiedTime} />
            )}
            {article.author && <meta property="article:author" content={article.author} />}
            {article.section && <meta property="article:section" content={article.section} />}
            {article.tags?.map((tag) => (
              <meta key={tag} property="article:tag" content={tag} />
            ))}
          </>
        )}

        {/* Custom Schema.org Structured Data */}
        {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
      </Helmet>
    )
  } catch (error) {
    console.error("Error in SEO component:", error)
    return null
  }
}
