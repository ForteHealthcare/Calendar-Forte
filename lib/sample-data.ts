import type { Event } from "@/lib/types"

export function generateSampleEvents(year: number): Event[] {
  const colors = [
    "#ef4444", // red
    "#f97316", // orange
    "#eab308", // yellow
    "#22c55e", // green
    "#06b6d4", // cyan
    "#3b82f6", // blue
    "#8b5cf6", // purple
    "#ec4899", // pink
  ]

  const assignees = ["Alice", "Bob", "Charlie", "David", "Emma"]

  const events: Event[] = [
    {
      id: "1",
      title: "Team Meeting",
      start: new Date(year, 0, 15).toISOString(),
      end: new Date(year, 0, 15).toISOString(),
      color: colors[0],
      assignee: assignees[0],
    },
    {
      id: "2",
      title: "Project Deadline",
      start: new Date(year, 1, 28).toISOString(),
      end: new Date(year, 1, 28).toISOString(),
      color: colors[1],
      assignee: assignees[1],
    },
    {
      id: "3",
      title: "Conference",
      start: new Date(year, 2, 10).toISOString(),
      end: new Date(year, 2, 12).toISOString(),
      color: colors[2],
      assignee: assignees[2],
    },
    {
      id: "4",
      title: "Vacation",
      start: new Date(year, 3, 5).toISOString(),
      end: new Date(year, 3, 15).toISOString(),
      color: colors[3],
      assignee: assignees[3],
    },
    {
      id: "5",
      title: "Training",
      start: new Date(year, 4, 20).toISOString(),
      end: new Date(year, 4, 22).toISOString(),
      color: colors[4],
      assignee: assignees[4],
    },
    {
      id: "6",
      title: "Client Meeting",
      start: new Date(year, 5, 7).toISOString(),
      end: new Date(year, 5, 7).toISOString(),
      color: colors[5],
      assignee: assignees[0],
    },
    {
      id: "7",
      title: "Team Building",
      start: new Date(year, 6, 15).toISOString(),
      end: new Date(year, 6, 16).toISOString(),
      color: colors[6],
      assignee: assignees[1],
    },
    {
      id: "8",
      title: "Product Launch",
      start: new Date(year, 7, 10).toISOString(),
      end: new Date(year, 7, 10).toISOString(),
      color: colors[7],
      assignee: assignees[2],
    },
    {
      id: "9",
      title: "Review Meeting",
      start: new Date(year, 8, 5).toISOString(),
      end: new Date(year, 8, 5).toISOString(),
      color: colors[0],
      assignee: assignees[3],
    },
    {
      id: "10",
      title: "Planning Session",
      start: new Date(year, 9, 12).toISOString(),
      end: new Date(year, 9, 14).toISOString(),
      color: colors[1],
      assignee: assignees[4],
    },
    {
      id: "11",
      title: "Annual Review",
      start: new Date(year, 10, 25).toISOString(),
      end: new Date(year, 10, 25).toISOString(),
      color: colors[2],
      assignee: assignees[0],
    },
    {
      id: "12",
      title: "Holiday Party",
      start: new Date(year, 11, 20).toISOString(),
      end: new Date(year, 11, 20).toISOString(),
      color: colors[3],
      assignee: assignees[1],
    },
  ]

  // Add a few more random events throughout the year
  for (let i = 0; i < 15; i++) {
    const month = Math.floor(Math.random() * 12)
    const day = Math.floor(Math.random() * 28) + 1
    const colorIndex = Math.floor(Math.random() * colors.length)
    const assigneeIndex = Math.floor(Math.random() * assignees.length)
    const duration = Math.floor(Math.random() * 3) // 0-2 days

    events.push({
      id: `random-${i}`,
      title: `Event ${i + 1}`,
      start: new Date(year, month, day).toISOString(),
      end: new Date(year, month, day + duration).toISOString(),
      color: colors[colorIndex],
      assignee: assignees[assigneeIndex],
    })
  }

  return events
}

