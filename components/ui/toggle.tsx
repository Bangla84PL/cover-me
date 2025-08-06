"use client"

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
  className?: string
}

export function Toggle({ 
  checked, 
  onChange, 
  label, 
  description, 
  disabled = false, 
  className = '' 
}: ToggleProps) {
  return (
    <label className={`flex items-start space-x-3 cursor-pointer group ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          className="sr-only"
          disabled={disabled}
        />
        <div className={`w-11 h-6 rounded-full transition-all duration-200 flex items-center ${
          checked 
            ? 'bg-emerald-500' 
            : 'bg-white/20 border border-white/30'
        } ${!disabled && 'group-hover:bg-opacity-80'}`}>
          <div className={`w-4 h-4 rounded-full bg-white transition-all duration-200 transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          } shadow-sm`} />
        </div>
      </div>
      {(label || description) && (
        <div className="flex-1">
          {label && (
            <div className={`text-sm font-medium transition-colors duration-200 ${
              disabled ? 'text-white/50' : 'text-white/90 group-hover:text-white'
            }`}>
              {label}
            </div>
          )}
          {description && (
            <div className="text-xs text-white/60 mt-1">
              {description}
            </div>
          )}
        </div>
      )}
    </label>
  )
}

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
  className?: string
}

export function Checkbox({ 
  checked, 
  onChange, 
  label, 
  description, 
  disabled = false, 
  className = '' 
}: CheckboxProps) {
  return (
    <label className={`flex items-start space-x-3 cursor-pointer group ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          className="sr-only"
          disabled={disabled}
        />
        <div className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
          checked
            ? 'border-emerald-400 bg-emerald-400/20'
            : 'border-white/40 bg-white/10 group-hover:border-white/60'
        }`}>
          {checked && (
            <svg 
              className="w-3 h-3 text-emerald-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      {(label || description) && (
        <div className="flex-1">
          {label && (
            <div className={`text-sm font-medium transition-colors duration-200 ${
              disabled ? 'text-white/50' : checked ? 'text-white' : 'text-white/80 group-hover:text-white'
            }`}>
              {label}
            </div>
          )}
          {description && (
            <div className="text-xs text-white/60 mt-1">
              {description}
            </div>
          )}
        </div>
      )}
    </label>
  )
}