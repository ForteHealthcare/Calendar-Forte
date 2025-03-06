"use client"
import { Input } from "@/components/ui/input"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const presetColors = [
    "#ef4444", // red
    "#f97316", // orange
    "#eab308", // yellow
    "#22c55e", // green
    "#06b6d4", // cyan
    "#3b82f6", // blue
    "#8b5cf6", // purple
    "#ec4899", // pink
    "#6b7280", // gray
  ]

  return (
    <div className="space-y-2">
      <div className="flex">
        <Input type="color" value={color} onChange={(e) => onChange(e.target.value)} className="w-12 h-10 p-1 mr-2" />
        <Input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
          maxLength={7}
          pattern="^#[0-9A-Fa-f]{6}$"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {presetColors.map((presetColor) => (
          <button
            key={presetColor}
            type="button"
            className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer"
            style={{ backgroundColor: presetColor }}
            onClick={() => onChange(presetColor)}
            aria-label={`Select color ${presetColor}`}
          />
        ))}
      </div>
    </div>
  )
}

