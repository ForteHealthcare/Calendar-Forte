"use client"

import { useState } from "react"
import { Calendar } from "@/components/calendar"
import { ThemeProvider } from "@/components/theme-provider"
import { ConfigPanel } from "@/components/config-panel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModeToggle } from "@/components/mode-toggle"

export default function Home() {
  const [showWeekends, setShowWeekends] = useState(true)
  const [config, setConfig] = useState({
    eventHeight: 20,
    dayPadding: 4,
    monthGap: 16,
    monthsPerRow: 3,
  })

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <main className="min-h-screen p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Calendar App</h1>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showWeekends}
                onChange={() => setShowWeekends(!showWeekends)}
                className="rounded"
              />
              <span>Show Weekends</span>
            </label>
            <ModeToggle />
          </div>
        </div>

        <Tabs defaultValue="year">
          <TabsList className="mb-4">
            <TabsTrigger value="year">Year View</TabsTrigger>
            <TabsTrigger value="config">Configuration</TabsTrigger>
          </TabsList>
          <TabsContent value="year">
            <Calendar showWeekends={showWeekends} config={config} />
          </TabsContent>
          <TabsContent value="config">
            <ConfigPanel config={config} setConfig={setConfig} />
          </TabsContent>
        </Tabs>
      </main>
    </ThemeProvider>
  )
}

