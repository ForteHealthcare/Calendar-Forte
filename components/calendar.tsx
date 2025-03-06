"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MonthGrid } from "@/components/month-grid"
import { EventForm } from "@/components/event-form"
import type { Event, CalendarConfig } from "@/lib/types"
import { generateSampleEvents } from "@/lib/sample-data"

interface CalendarProps {
  showWeekends: boolean
  config: CalendarConfig
}

export function Calendar({ showWeekends, config }: CalendarProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const currentYear = new Date().getFullYear()

  // Load sample events on first render
  useEffect(() => {
    setEvents(generateSampleEvents(currentYear))
  }, [currentYear])

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(currentYear, i, 1)
    return date
  })

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setSelectedEvent(null)
    setIsFormOpen(true)
  }

  const handleEventClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedEvent(event)
    setSelectedDate(new Date(event.start))
    setIsFormOpen(true)
  }

  const handleAddEvent = (event: Event) => {
    setEvents([...events, { ...event, id: Date.now().toString() }])
    setIsFormOpen(false)
  }

  const handleUpdateEvent = (updatedEvent: Event) => {
    setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)))
    setIsFormOpen(false)
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId))
    setIsFormOpen(false)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setSelectedEvent(null)
    setSelectedDate(null)
  }

  // Group months into rows based on monthsPerRow config
  const monthRows = []
  for (let i = 0; i < months.length; i += config.monthsPerRow) {
    monthRows.push(months.slice(i, i + config.monthsPerRow))
  }

  return (
    <div className="space-y-8">
      {monthRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${config.monthsPerRow}, 1fr)`,
            gap: `${config.monthGap}px`,
          }}
        >
          {row.map((month) => (
            <MonthGrid
              key={month.getMonth()}
              month={month}
              events={events}
              showWeekends={showWeekends}
              onDateClick={handleDateClick}
              onEventClick={handleEventClick}
              config={config}
            />
          ))}
        </div>
      ))}

      {isFormOpen && (
        <EventForm
          date={selectedDate}
          event={selectedEvent}
          onAdd={handleAddEvent}
          onUpdate={handleUpdateEvent}
          onDelete={handleDeleteEvent}
          onClose={closeForm}
        />
      )}
    </div>
  )
}

