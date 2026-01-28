import { useAnimatedCounter } from '@/hooks/use-animated-counter'

interface KPI {
  value: string
  label: string
}

const kpis: KPI[] = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '20+', label: 'Happy Clients' },
  { value: '14', label: 'Team Members' },
  { value: '98%', label: 'Satisfaction Rate' },
]

function KPIItem({ value, label }: KPI) {
  const { ref, valueRef, displayValue } = useAnimatedCounter(value)

  return (
    <div ref={ref} className='text-center'>
      {/* Animated Number */}
      <div className='mb-2 md:mb-4'>
        <span
          ref={valueRef}
          className='text-4xl md:text-5xl lg:text-6xl font-bold text-white'>
          {displayValue}
        </span>
      </div>

      {/* Label */}
      <div className='text-sm md:text-base lg:text-lg text-white font-sans'>{label}</div>
    </div>
  )
}

export default function KPISection() {
  return (
    <section className='bg-[#493C81] py-16 md:py-24 relative'>
      {/* Bottom border line */}
      <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400' />

      <div className='container mx-auto'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12'>
          {kpis.map((kpi) => (
            <KPIItem key={kpi.label} value={kpi.value} label={kpi.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
