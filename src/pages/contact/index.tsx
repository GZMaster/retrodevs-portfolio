import Layout from '@/layout/layout'
import { SEO } from '@/components/seo'
import ContactHero from './hero'
import ContactFormSection from './contact_form_section'
import CTOSection from '../home/cto_section'
import {
  createOrganizationSchema,
  createContactPageSchema,
  createBreadcrumbSchema,
} from '@/lib/seo-helpers'

export default function Contact() {
  const organizationSchema = createOrganizationSchema()
  const contactPageSchema = createContactPageSchema()
  const breadcrumbSchema = createBreadcrumbSchema("/contact", [
    { name: "Contact Us", url: "https://retrodevs.com/contact" },
  ])

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with RetroDevs to start your project. Email us at hello@retrodevs.com or call +234 (000) 000 000. We're ready to collaborate and bring your project to life."
        keywords="contact, get in touch, start a project, web development inquiry, hire developers, contact form"
        canonicalUrl="https://retrodevs.com/contact"
        schema={[organizationSchema, contactPageSchema, breadcrumbSchema]}
      />
      <Layout>
        <ContactHero />
        <ContactFormSection />
        <CTOSection />
      </Layout>
    </>
  )
}
