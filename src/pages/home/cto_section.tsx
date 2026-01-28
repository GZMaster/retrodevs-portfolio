import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function CTOSection() {
  return (
    <section className='bg-white py-16 md:py-24'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col items-center text-center max-w-[974px] mx-auto'>
          {/* Main Heading */}
          <h2 className='text-3xl md:text-[50px] font-heading font-bold text-gray-900 leading-[120%] tracking-[-4%] mb-4'>
            Experience the difference of premium <br /> craftsmanship.
          </h2>

          {/* Sub-heading */}
          <p className='text-lg md:text-xl text-gray-600 font-sans mb-10'>
            High-end design. Precision development. Zero compromise.
          </p>

          {/* CTA Button */}
          <Link to='/contact'>
            <Button className='py-[14px] px-6 font-medium font-heading bg-[#5C4B8B] text-white hover:bg-[#4A3A70] transition-colors'>
              Build With Retro Devs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
