import type React from "react"

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  id?: string
}

export function ResponsiveContainer({ children, className = "", as: Component = "div", id }: ResponsiveContainerProps) {
  return (
    <Component id={id} className={`w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-0 max-w-[1400px] mx-auto ${className}`}>
      {children}
    </Component>
  )
}
