"use client"

import type React from "react"

import type { CalendarConfig } from "@/lib/types"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

interface ConfigPanelProps {
  config: CalendarConfig
  setConfig: (config: CalendarConfig) => void
}

export function ConfigPanel({ config, setConfig }: ConfigPanelProps) {
  const [tempConfig, setTempConfig] = useState<CalendarConfig>({ ...config })

  const handleChange = (key: keyof CalendarConfig, value: number) => {
    setTempConfig({ ...tempConfig, [key]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setConfig(tempConfig)
  }

  const handleReset = () => {
    setTempConfig({ ...config })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar Configuration</CardTitle>
        <CardDescription>Adjust the appearance of your calendar by changing these values</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventHeight">Event Height (px)</Label>
              <Input
                id="eventHeight"
                type="number"
                min="10"
                max="50"
                value={tempConfig.eventHeight}
                onChange={(e) => handleChange("eventHeight", Number.parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dayPadding">Day Cell Padding (px)</Label>
              <Input
                id="dayPadding"
                type="number"
                min="0"
                max="20"
                value={tempConfig.dayPadding}
                onChange={(e) => handleChange("dayPadding", Number.parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthGap">Gap Between Months (px)</Label>
              <Input
                id="monthGap"
                type="number"
                min="0"
                max="50"
                value={tempConfig.monthGap}
                onChange={(e) => handleChange("monthGap", Number.parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthsPerRow">Months Per Row</Label>
              <Input
                id="monthsPerRow"
                type="number"
                min="1"
                max="6"
                value={tempConfig.monthsPerRow}
                onChange={(e) => handleChange("monthsPerRow", Number.parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button type="submit">Apply Changes</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

