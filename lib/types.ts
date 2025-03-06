export interface Event {
  id: string
  title: string
  start: string
  end: string
  color: string
  assignee: string
}

export interface CalendarConfig {
  eventHeight: number
  dayPadding: number
  monthGap: number
  monthsPerRow: number
}

