import { Helmet } from "react-helmet-async"
import { SEO_CONFIG } from "@/lib/seo-config"
import {
  getAbsoluteImageUrl,
  getAbsoluteUrl,
  generatePageTitle,
} from "@/lib/seo-helpers"
import { useLocation } from "react-router-dom"

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
  schema?: Record<string, unknown> | Array<Record<string, unknown>>
  article?: {
    publishedTime?: string
    modifiedTime?: string
    author?: string
    section?: string
    tags?: string[]
  }
  twitterHandle?: string
  twitterCreator?: string
  ogImageWidth?: number
  ogImageHeight?: number
  ogImageAlt?: string
  themeColor?: string
  verification?: {
    google?: string
    bing?: string
  }
}

export function SEO({
  title,
  description,
  keywords = SEO_CONFIG.defaultKeywords,
  ogImage = SEO_CONFIG.defaultOgImage,
  ogUrl,
  ogType = "website",
  twitterCard = "summary_large_image",
  canonicalUrl,
  noindex = false,
  nofollow = false,
  locale = SEO_CONFIG.locale,
  alternateLanguages,
  schema,
  article,
  twitterHandle = SEO_CONFIG.twitterHandle,
  twitterCreator = SEO_CONFIG.twitterCreator,
  ogImageWidth = SEO_CONFIG.ogImageWidth,
  ogImageHeight = SEO_CONFIG.ogImageHeight,
  ogImageAlt,
  themeColor = SEO_CONFIG.themeColor,
  verification,
}: SEOProps) {
  const location = useLocation()

  try {
    const fullTitle = generatePageTitle(title)
    const robots = `${noindex ? "noindex" : "index"},${nofollow ? "nofollow" : "follow"}`

    // Generate absolute URLs
    const absoluteOgImage = getAbsoluteImageUrl(ogImage)
    const absoluteOgUrl = ogUrl || (typeof window !== "undefined" ? window.location.href : getAbsoluteUrl(location.pathname))
    const absoluteCanonicalUrl = canonicalUrl || getAbsoluteUrl(location.pathname)

    // Combine verification codes
    const googleVerification = verification?.google || SEO_CONFIG.verification.google
    const bingVerification = verification?.bing || SEO_CONFIG.verification.bing

    // Handle multiple schemas (array) or single schema (object)
    const schemas = Array.isArray(schema) ? schema : schema ? [schema] : []

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
        <meta name="author" content={SEO_CONFIG.siteName} />

        {/* Theme Color */}
        <meta name="theme-color" content={themeColor} />

        {/* Verification Meta Tags */}
        {googleVerification && (
          <meta name="google-site-verification" content={googleVerification} />
        )}
        {bingVerification && (
          <meta name="msvalidate.01" content={bingVerification} />
        )}

        {/* Canonical URL */}
        <link rel="canonical" href={absoluteCanonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={absoluteOgUrl} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={absoluteOgImage} />
        <meta property="og:image:width" content={ogImageWidth.toString()} />
        <meta property="og:image:height" content={ogImageHeight.toString()} />
        {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
        <meta property="og:locale" content={locale} />
        <meta property="og:site_name" content={SEO_CONFIG.siteName} />

        {/* Twitter */}
        <meta name="twitter:card" content={twitterCard} />
        <meta name="twitter:url" content={absoluteOgUrl} />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={absoluteOgImage} />
        {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
        {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}

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
        {schemas.map((schemaItem) => {
          const schemaType = (schemaItem["@type"] as string) || "schema"
          const schemaUrl = (schemaItem.url as string) || ""
          const schemaId = `${schemaType}-${schemaUrl || JSON.stringify(schemaItem).substring(0, 30)}`
          return (
            <script
              key={schemaId}
              type="application/ld+json"
            >
              {JSON.stringify(schemaItem)}
            </script>
          )
        })}
      </Helmet>
    )
  } catch (error) {
    console.error("Error in SEO component:", error)
    return null
  }
}
