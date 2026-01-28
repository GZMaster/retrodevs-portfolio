import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useState } from 'react'

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
]

export default function Header() {
  const location = useLocation()
  const currentPath = location.pathname
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className='bg-[#E7E3FF] border-b border-purple-100'>
      <div className='container mx-auto px-4 py-8'>
        <nav className='relative flex items-center justify-between'>
          {/* Logo */}
          <Link to='/' className='flex items-center space-x-2 z-10'>
            <img
              src='/assets/retrodevslogo.png'
              alt='RetroDevs Logo'
              className='w-8 h-8'
            />
            <h3 className='text-xl font-bold text-black'>RetroDevs</h3>
          </Link>

          {/* Centered Navigation - Desktop */}
          <ul className='hidden lg:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2'>
            {navigationItems.map((item) => {
              const isActive = currentPath === item.href
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      'font-sans text-lg leading-none transition-colors',
                      isActive
                        ? 'text-gray-800 font-bold'
                        : 'text-gray-600 font-medium hover:text-[#4A3880]'
                    )}>
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* CTA Button - Desktop */}
          <div className='hidden lg:block z-10'>
            <Link to='/contact'>
              <Button className='font-heading py-[14px] px-6 font-bold bg-[#4A3880] text-[#F9F8FF] hover:bg-[#3A2B66] transition-colors rounded-[4px] gap-2'>
                Start a project
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className='lg:hidden z-10'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='p-2 w-10 h-10 rounded-[4px] hover:bg-[#D3CFF0]'>
                  <Menu size={24} className='text-[#4A3880]' />
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className='bg-[#E7E3FF] border-l border-purple-200'>
                <SheetHeader>
                  <SheetTitle className='text-left font-heading text-2xl text-black'>
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <div className='flex flex-col gap-8 mt-8'>
                  {/* Mobile Navigation Links */}
                  <div className='flex flex-col gap-6'>
                    {navigationItems.map((item) => {
                      const isActive = currentPath === item.href
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            'font-sans text-lg leading-none transition-colors py-2',
                            isActive
                              ? 'text-gray-800 font-bold'
                              : 'text-gray-600 font-medium hover:text-[#4A3880]'
                          )}>
                          {item.label}
                        </Link>
                      )
                    })}
                  </div>

                  {/* Mobile CTA Button */}
                  <div className='pt-4'>
                    <Link to='/contact' onClick={() => setIsOpen(false)}>
                      <Button className='w-full font-heading py-[14px] px-6 font-bold bg-[#4A3880] text-[#F9F8FF] hover:bg-[#3A2B66] transition-colors rounded-[4px] gap-2'>
                        Start a project
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}
