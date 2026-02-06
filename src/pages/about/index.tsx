import Layout from '@/layout/layout'
import { SEO } from '@/components/seo'
import AboutHero from './hero'
import SignatureSection from './signature_section'
import ValuesSection from './values_section'
import BlueprintSection from './blueprint_section'
import KPISection from '../home/kpi_section'
import CTOSection from '../home/cto_section'
import {
  createOrganizationSchema,
  createAboutPageSchema,
  createBreadcrumbSchema,
} from '@/lib/seo-helpers'

export default function About() {
  const organizationSchema = createOrganizationSchema()
  const aboutPageSchema = createAboutPageSchema()
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "About Us", url: "https://retrodevs.com/about" },
  ])

  return (
    <>
      <SEO
        title="About Us"
        description="Retro Devs is a collective of elite designers, developers, and product thinkers dedicated to crafting premium digital experiences. We merge creativity, technology, and strategy to help brands grow with confidence."
        keywords="about us, design agency, development team, elite developers, digital agency, web development company"
        canonicalUrl="https://retrodevs.com/about"
        schema={[organizationSchema, aboutPageSchema, breadcrumbSchema]}
      />
      <Layout>
        <AboutHero />
        <SignatureSection />
        <ValuesSection />
        <BlueprintSection />
        <KPISection />
        <CTOSection />
      </Layout>
    </>
  )
}
