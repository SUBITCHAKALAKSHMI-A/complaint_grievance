import React from 'react'
import '../../styles/global.css'
import '../../styles/animations.css'

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses = 'btn transition-all duration-300 ease-out'
  
  const variants = {
    primary: 'btn-gradient-primary hover:scale-105 active:scale-95',
    secondary: 'btn-gradient-secondary hover:scale-105 active:scale-95',
    outline: 'btn-outline hover:bg-gradient-to-r from-purple-900 to-emerald-400 hover:text-white',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600',
  }
  
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-5 py-2.5 text-base',
    large: 'px-7 py-3.5 text-lg',
  }
  
  const widthClass = fullWidth ? 'w-full' : ''
  const disabledClass = disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'
  const loadingClass = loading ? 'opacity-75 cursor-wait' : ''
  
  const classes = [
    baseClasses,
    variants[variant],
    sizes[size],
    widthClass,
    disabledClass,
    loadingClass,
    className,
  ].filter(Boolean).join(' ')
  
  return (
    <button
      type={type}
      className={`${classes} relative overflow-hidden group`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {/* Ripple Effect */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {children}
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
            {children}
            {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
          </>
        )}
      </span>
    </button>
  )
}

export default Button