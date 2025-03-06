"use client"

import type React from "react"

import type { Event, CalendarConfig } from "@/lib/types"
import { getDaysInMonth, isWeekend } from "@/lib/date-utils"
import { EventItem } from "@/components/event-item"

interface MonthGridProps {
  month: Date
  events: Event[]
  showWeekends: boolean
  onDateClick: (date: Date) => void
  onEventClick: (event: Event, e: React.MouseEvent) => void
  config: CalendarConfig
}

export function MonthGrid({ month, events, showWeekends, onDateClick, onEventClick, config }: MonthGridProps) {
  const monthName = month.toLocaleString("default", { month: "long" })
  const year = month.getFullYear()
  const daysInMonth = getDaysInMonth(month)

  // Get all days in the month
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    return new Date(year, month.getMonth(), i + 1)
  })

  // Filter out weekends if showWeekends is false
  const visibleDays = showWeekends ? days : days.filter((day) => !isWeekend(day))

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div className="bg-muted p-2 font-medium text-center">
        {monthName} {year}
      </div>
      <div className="grid grid-cols-7 text-center text-xs bg-muted/50">
        {showWeekends ? (
          <>
            <div className="p-1">Sun</div>
            <div className="p-1">Mon</div>
            <div className="p-1">Tue</div>
            <div className="p-1">Wed</div>
            <div className="p-1">Thu</div>
            <div className="p-1">Fri</div>
            <div className="p-1">Sat</div>
          </>
        ) : (
          <>
            <div className="p-1">Mon</div>
            <div className="p-1">Tue</div>
            <div className="p-1">Wed</div>
            <div className="p-1">Thu</div>
            <div className="p-1">Fri</div>
          </>
        )}
      </div>
      <div className={`grid ${showWeekends ? "grid-cols-7" : "grid-cols-5"} auto-rows-fr`}>
        {/* Empty cells for days before the 1st of the month */}
        {Array.from({
          length: showWeekends
            ? new Date(year, month.getMonth(), 1).getDay()
            : (new Date(year, month.getMonth(), 1).getDay() + 6) % 7,
        }).map((_, i) => (
          <div key={`empty-start-${i}`} className="border bg-muted/20"></div>
        ))}

        {/* Calendar days */}
        {visibleDays.map((day) => {
          const dayEvents = events.filter((event) => {
            const eventStart = new Date(event.start)
            const eventEnd = new Date(event.end)
            return (
              day >= new Date(eventStart.setHours(0, 0, 0, 0)) && day <= new Date(eventEnd.setHours(23, 59, 59, 999))
            )
          })

          return (
            <div
              key={day.toISOString()}
              className={`border relative ${isWeekend(day) ? "bg-muted/10" : ""}`}
              style={{ padding: `${config.dayPadding}px` }}
              onClick={() => onDateClick(day)}
            >
              <div className="text-xs font-medium mb-1">{day.getDate()}</div>
              <div className="space-y-1 overflow-y-auto" style={{ maxHeight: "calc(100% - 20px)" }}>
                {dayEvents.map((event) => (
                  <EventItem
                    key={event.id}
                    event={event}
                    onClick={(e) => onEventClick(event, e)}
                    height={config.eventHeight}
                  />
                ))}
              </div>
            </div>
          )
        })}

        {/* Empty cells for days after the last day of the month */}
        {showWeekends && (
          <>
            {Array.from({
              length: (7 - ((new Date(year, month.getMonth(), 1).getDay() + daysInMonth) % 7)) % 7,
            }).map((_, i) => (
              <div key={`empty-end-${i}`} className="border bg-muted/20"></div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

