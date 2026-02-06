import Layout from '@/layout/layout'
import { SEO } from '@/components/seo'
import {
  createOrganizationSchema,
  createAboutPageSchema,
  createBreadcrumbSchema,
} from '@/lib/seo-helpers'

export default function Team() {
  const organizationSchema = createOrganizationSchema()
  const aboutPageSchema = {
    ...createAboutPageSchema(),
    name: "Our Team",
    url: "https://retrodevs.com/team",
  }
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Our Team", url: "https://retrodevs.com/team" },
  ])

  return (
    <>
      <SEO
        title="Our Team"
        description="Meet the talented individuals behind RetroDevs. Our team of elite designers, developers, and product thinkers are dedicated to crafting premium digital experiences."
        keywords="team, developers, designers, RetroDevs team, web development team, design team, software engineers"
        canonicalUrl="https://retrodevs.com/team"
        schema={[organizationSchema, aboutPageSchema, breadcrumbSchema]}
      />
      <Layout>
        <section className='bg-[#F2F0FF] min-h-screen py-24'>
          <div className='container mx-auto px-4'>
            <h1 className='text-4xl md:text-5xl font-bold text-black mb-8'>Our Team</h1>
            <p className='text-lg text-gray-700'>Meet the talented individuals behind RetroDevs.</p>
          </div>
        </section>
      </Layout>
    </>
  )
}
