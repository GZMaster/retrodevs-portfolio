import { useEffect, useRef, useState } from "react"

// Custom hook for intersection observer
function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        ...options,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options])

  return [ref, isInView]
}

// Helper function to format numbers with commas
function formatNumberWithCommas(num: number, decimals = 0): string {
  return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Animation function using requestAnimationFrame
function animateValue(
  element: HTMLElement | null,
  start: number,
  end: number,
  duration: number,
  suffix = "",
  decimals = 0,
) {
  const startTime = performance.now()

  function updateValue(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Easing function for smooth animation
    const easeOutQuart = 1 - (1 - progress) ** 4
    const currentValue = start + (end - start) * easeOutQuart

    if (element) {
      const formattedValue = formatNumberWithCommas(currentValue, decimals)
      element.textContent = formattedValue + suffix
    }

    if (progress < 1) {
      requestAnimationFrame(updateValue)
    }
  }

  requestAnimationFrame(updateValue)
}

// Parse value to extract number and suffix
function parseValue(val: string) {
  // Handle values with commas (e.g., "1,000+", "10,000+")
  const match = val.match(/^([\d,]+\.?\d*)(.*)$/)
  if (match) {
    // Remove commas and parse as number
    const numStr = match[1].replace(/,/g, "")
    const num = Number.parseFloat(numStr)
    const suffix = match[2] || ""
    return { num, suffix }
  }
  return { num: 0, suffix: val }
}

interface UseAnimatedCounterOptions {
  duration?: number
  threshold?: number
}

export function useAnimatedCounter(value: string, options: UseAnimatedCounterOptions = {}) {
  const { duration = 3500, threshold = 0.1 } = options
  const [ref, isInView] = useInView({ threshold })
  const valueRef = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  const { num, suffix } = parseValue(value)

  useEffect(() => {
    if (isInView && !hasAnimated && valueRef.current) {
      setHasAnimated(true)
      const decimals = num % 1 !== 0 ? 1 : 0
      animateValue(valueRef.current, 0, num, duration, suffix, decimals)
    }
  }, [isInView, hasAnimated, num, suffix, duration])

  return {
    ref: ref as React.RefObject<HTMLDivElement>,
    valueRef,
    displayValue: `0${suffix}`,
  }
}
