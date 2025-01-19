"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HabitTracker() {
  const [checkedDays, setCheckedDays] = useState<{ [key: string]: boolean }>({})

  const getDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 365; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      dates.push(date.toISOString().split("T")[0])
    }
    return dates
  }

  useEffect(() => {
    // Utiliser un préfixe unique pour éviter les conflits de stockage
    const storageKey = "habit-tracker-data"
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      setCheckedDays(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    const storageKey = "habit-tracker-data"
    localStorage.setItem(storageKey, JSON.stringify(checkedDays))
  }, [checkedDays])

  const handleCheckboxChange = (date: string) => {
    setCheckedDays((prev) => ({
      ...prev,
      [date]: !prev[date],
    }))
  }

  const dates = getDates()
  const stats = {
    totalDays: dates.length,
    completedDays: Object.values(checkedDays).filter(Boolean).length,
    missedDays: 0,
    noEntryDays: dates.length - Object.values(checkedDays).filter(Boolean).length,
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-none border-none">
      <CardHeader>
        <CardTitle>Muscu 2K25</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(20px,1fr))] gap-1">
          {dates.map((date) => (
            <label key={date} className="block w-5 h-5 cursor-pointer" title={date}>
              <input
                type="checkbox"
                className="sr-only peer"
                checked={checkedDays[date] || false}
                onChange={() => handleCheckboxChange(date)}
              />
              <div className="w-full h-full rounded-sm bg-gray-200 peer-checked:bg-green-500" />
            </label>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-center font-medium">Statistics</h2>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-sm text-muted-foreground">Total Days</div>
              <div className="text-2xl font-bold">{stats.totalDays}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Completed Days</div>
              <div className="text-2xl font-bold">{stats.completedDays}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Missed Days</div>
              <div className="text-2xl font-bold">{stats.missedDays}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">No Entry Days</div>
              <div className="text-2xl font-bold">{stats.noEntryDays}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

