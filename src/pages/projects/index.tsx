import Layout from '@/layout/layout'
import { SEO } from '@/components/seo'
import ProjectsHero from './hero'
import ProjectsStrip from './projects_strip'
import ProjectsList from './projects_list'
import CTOSection from '../home/cto_section'
import {
  createOrganizationSchema,
  createCollectionPageSchema,
  createBreadcrumbSchema,
} from '@/lib/seo-helpers'

export default function Projects() {
  const organizationSchema = createOrganizationSchema()
  const collectionPageSchema = createCollectionPageSchema()
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Projects", url: "https://retrodevs.com/projects" },
  ])

  return (
    <>
      <SEO
        title="Projects"
        description="Explore our portfolio of high-end projects built with precision, strategy, and timeless design. View our work with Formatic Trucking, Move Your Pet, Nigeria Tennis Federation, and more."
        keywords="portfolio, web development projects, design projects, case studies, client work, web applications"
        canonicalUrl="https://retrodevs.com/projects"
        schema={[organizationSchema, collectionPageSchema, breadcrumbSchema]}
      />
      <Layout>
        <ProjectsHero />
        <ProjectsStrip />
        <ProjectsList />
        <CTOSection />
      </Layout>
    </>
  )
}
