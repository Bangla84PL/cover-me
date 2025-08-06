"use client"

interface DatePickerProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function DatePicker({ 
  value, 
  onChange, 
  placeholder = "Select date", 
  className = '',
  disabled = false 
}: DatePickerProps) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`flex h-10 w-full rounded-md border border-white/30 bg-white/10 backdrop-blur-sm px-3 py-2 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  )
}

interface DateRangePickerProps {
  startDate: string
  endDate: string
  onStartDateChange: (value: string) => void
  onEndDateChange: (value: string) => void
  className?: string
  disabled?: boolean
}

export function DateRangePicker({ 
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange, 
  className = '',
  disabled = false 
}: DateRangePickerProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <div className="flex-1">
        <label className="text-xs text-white/70 mb-1 block">Start Date</label>
        <DatePicker
          value={startDate}
          onChange={onStartDateChange}
          disabled={disabled}
        />
      </div>
      <div className="flex-1">
        <label className="text-xs text-white/70 mb-1 block">End Date</label>
        <DatePicker
          value={endDate}
          onChange={onEndDateChange}
          disabled={disabled}
        />
      </div>
    </div>
  )
}