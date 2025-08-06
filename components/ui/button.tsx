"use client"

import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "jungle" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", style, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      jungle: "text-white font-semibold shadow-xl border border-white/30 relative overflow-hidden hover:scale-105 hover:shadow-2xl transform transition-all duration-300 ease-out hover:border-white/50",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
    }
    
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    }

    const jungleStyle = variant === "jungle" ? {
      backgroundImage: "url('/jungle background.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      ...style
    } : style

    return (
      <button
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className || ''}`}
        style={jungleStyle}
        ref={ref}
        {...props}
      >
        {variant === "jungle" && (
          <>
            <div className="absolute inset-0 bg-black/40 rounded-md transition-all duration-300 hover:bg-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-600/20 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </>
        )}
        <span className="relative z-10">{props.children}</span>
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
