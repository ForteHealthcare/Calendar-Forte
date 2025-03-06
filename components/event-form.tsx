"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ColorPicker } from "@/components/color-picker"
import type { Event } from "@/lib/types"
import { formatDateForInput } from "@/lib/date-utils"

interface EventFormProps {
  date: Date | null
  event: Event | null
  onAdd: (event: Event) => void
  onUpdate: (event: Event) => void
  onDelete: (eventId: string) => void
  onClose: () => void
}

export function EventForm({ date, event, onAdd, onUpdate, onDelete, onClose }: EventFormProps) {
  const [title, setTitle] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [color, setColor] = useState("#4f46e5")
  const [assignee, setAssignee] = useState("")

  useEffect(() => {
    if (event) {
      setTitle(event.title)
      setStartDate(formatDateForInput(new Date(event.start)))
      setEndDate(formatDateForInput(new Date(event.end)))
      setColor(event.color)
      setAssignee(event.assignee)
    } else if (date) {
      setStartDate(formatDateForInput(date))
      setEndDate(formatDateForInput(date))
    }
  }, [event, date])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newEvent: Event = {
      id: event?.id || "",
      title,
      start: new Date(startDate).toISOString(),
      end: new Date(endDate).toISOString(),
      color,
      assignee,
    }

    if (event) {
      onUpdate(newEvent)
    } else {
      onAdd(newEvent)
    }
  }

  const handleDelete = () => {
    if (event) {
      onDelete(event.id)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">{event ? "Edit Event" : "Add Event"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="end-date">End Date</Label>
              <Input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </div>
          </div>

          <div>
            <Label htmlFor="assignee">Assignee</Label>
            <Input id="assignee" value={assignee} onChange={(e) => setAssignee(e.target.value)} required />
          </div>

          <div>
            <Label>Color</Label>
            <ColorPicker color={color} onChange={setColor} />
          </div>

          <div className="flex justify-between pt-4">
            {event ? (
              <>
                <Button type="button" variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
                <div className="space-x-2">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit">Update</Button>
                </div>
              </>
            ) : (
              <>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">Add Event</Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

