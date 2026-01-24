import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { FadeInOnScroll } from '@/components/fade-in'

interface Project {
  title: string
  description: string
  image: string
  tags: string[]
}

const projects: Project[] = [
  {
    title: 'Formatic Trucking INC',
    description:
      'A premium shopping platform engineered for smooth browsing, flawless checkout, and exceptional user experience.',
    image: '/assets/hero/formatic-side.png',
    tags: ['Design', 'Web development'],
  },
  {
    title: 'Move Your Pet',
    description:
      'A premium shopping platform engineered for smooth browsing, flawless checkout, and exceptional user experience.',
    image: '/assets/hero/movemypets-side.png',
    tags: ['Design', 'Web development'],
  },
]

export default function ProjectsShowcase() {
  return (
    <section className='bg-white py-12 md:py-24' id='our-work'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <FadeInOnScroll>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12 md:mb-16'>
          <div className='flex flex-col gap-4'>
            <h2 className='text-3xl md:text-[56px] font-heading font-bold text-black mb-4'>
              Our featured projects
            </h2>
            <p className='text-lg md:text-[22px] text-gray-600 font-sans'>
              Comprehensive digital solution tailored to our business needs.
            </p>
          </div>
          <div className='md:ml-4'>
            <Link to='/projects'>
              <Button
                variant='outline'
                className='border border-[#493C81] text-[#493C81] bg-white hover:bg-[#F2F0FF] transition-colors px-6 py-[14px]'>
                View all projects
              </Button>
            </Link>
          </div>
        </div>
        </FadeInOnScroll>

        {/* Projects Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative'>
          {projects.map((project, index) => (
            <FadeInOnScroll key={project.title} delay={index * 0.2}>
            <div key={project.title} className='flex flex-col'>
              {/* Project Image */}
              <div className='mb-4 w-full'>
                <img
                  src={project.image}
                  alt={project.title}
                  className='w-full h-[200px] md:h-[300px] object-cover'
                  style={{ maxWidth: '588px' }}
                />
              </div>

              {/* Tags */}
              <div className='flex gap-2 mb-3'>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className='px-4 py-1 text-[8px] rounded-full font-medium'
                    style={{
                      backgroundColor: tag === 'Design' ? '#FEE5F8' : '#F3E7FF',
                      color: tag === 'Design' ? '#1E1E1E' : '#1E1E1E',
                    }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Project Title */}
              <h3 className='text-2xl md:text-xl font-heading font-bold text-black mb-2'>
                {project.title}
              </h3>

              {/* Project Description */}
              <p className='text-gray-600 text-base'>
                {project.description}
              </p>
            </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
