import Layout from '@/layout/layout'
import { SEO } from '@/components/seo'
import HeroSection from './hero_section'
import WhatWeDoSection from './what_we_do_section'
import ProjectsShowcase from './projects_showcase'
import TestimonialSection from './testimonial_section'
import KPISection from './kpi_section'
import CTOSection from './cto_section'

export default function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="RetroDevs design, develop, and manage exceptional websites using a perfect blend of timeless creativity and cutting-edge technology. Where World-Class Design Meets Elite Development."
        keywords="web development, web design, product design, app development, elite developers, premium digital experiences, custom websites, React development"
      />
      <Layout>
        <HeroSection />
        <WhatWeDoSection />
        <ProjectsShowcase />
        <TestimonialSection />
        <KPISection />
        <CTOSection />
      </Layout>
    </>
  )
}
