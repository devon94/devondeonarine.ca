"use client"

import React from 'react'
import { cn } from '@devon94/devondeonarine.ca/lib/utils'  // You'll need to create this utility

interface HeaderProps {
  className?: string
}

const Header: React.FC<HeaderProps> = () => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [logoOpacity, setLogoOpacity] = React.useState<boolean>(false)
  const [textOpacity, setTextOpacity] = React.useState<boolean>(true)

  const onClick = () => {
    setTextOpacity(false)
    setTimeout(() => setLogoOpacity(true), 1500)
  }

  return (
    <div
      ref={containerRef}
      id="header"
      onClick={() => window.open("https://github.com/devon94", "_blank")}
      className={cn(
        "flex flex-col p-4 md:px-4 z-10 box-content cursor-pointer absolute top-4 left-4 transition-all duration-[1500ms] ease-in-out",
      )}
    >
      <p className="relative text-[#f0f0f0] text-2xl font-normal leading-6 p-0 m-0 bebas-neue-regular">
        Devon <br />Deonarine
      </p>
    </div>

  )
}

export default Header