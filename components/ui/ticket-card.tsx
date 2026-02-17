"use client"

import * as React from "react"

type TicketCardProps = React.HTMLAttributes<HTMLDivElement> & {
  cardBg?: string
  notchRadius?: number
  notchStep?: number
}

export function TicketCard({
  className = "",
  style,
  cardBg = "#ffffff",
  notchRadius = 8,
  notchStep = 25,
  children,
  ...props
}: TicketCardProps) {
  const vars = {
    ["--ticket-bg" as string]: cardBg,
    ["--notch-radius" as string]: `${notchRadius}px`,
    ["--notch-step" as string]: `${notchStep}px`,
  }

  return (
    <div
      className={`ticket-card rounded-none! p-6 ${className}`}
      style={{ ...vars, ...(style as React.CSSProperties) }}
      {...props}
    >
      {children}
    </div>
  )
}
