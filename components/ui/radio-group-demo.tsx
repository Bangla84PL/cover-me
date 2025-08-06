"use client"

interface RadioOption {
  id: string
  label: string
  description?: string
}

interface RadioGroupProps {
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
  name: string
  className?: string
}

export function RadioGroup({ options, value, onChange, name, className = '' }: RadioGroupProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {options.map((option) => (
        <label
          key={option.id}
          className="flex items-start space-x-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center">
            <input
              type="radio"
              name={name}
              value={option.id}
              checked={value === option.id}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
              value === option.id
                ? 'border-emerald-400 bg-emerald-400/20'
                : 'border-white/40 bg-white/10 group-hover:border-white/60'
            }`}>
              {value === option.id && (
                <div className="w-2 h-2 rounded-full bg-emerald-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              )}
            </div>
          </div>
          <div className="flex-1">
            <div className={`text-sm font-medium transition-colors duration-200 ${
              value === option.id ? 'text-white' : 'text-white/80 group-hover:text-white'
            }`}>
              {option.label}
            </div>
            {option.description && (
              <div className="text-xs text-white/60 mt-1">
                {option.description}
              </div>
            )}
          </div>
        </label>
      ))}
    </div>
  )
}