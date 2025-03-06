"use client"

import type React from "react"

import type { Event } from "@/lib/types"

interface EventItemProps {
  event: Event
  onClick: (e: React.MouseEvent) => void
  height: number
}

export function EventItem({ event, onClick, height }: EventItemProps) {
  return (
    <div
      className="text-xs rounded px-1 truncate cursor-pointer"
      style={{
        backgroundColor: event.color,
        color: getContrastColor(event.color),
        height: `${height}px`,
        lineHeight: `${height}px`,
      }}
      onClick={onClick}
      title={`${event.title} (${event.assignee})`}
    >
      {event.title}
    </div>
  )
}

// Helper function to determine text color based on background color
function getContrastColor(hexColor: string): string {
  // Convert hex to RGB
  const r = Number.parseInt(hexColor.slice(1, 3), 16)
  const g = Number.parseInt(hexColor.slice(3, 5), 16)
  const b = Number.parseInt(hexColor.slice(5, 7), 16)

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Return black or white based on luminance
  return luminance > 0.5 ? "#000000" : "#ffffff"
}

