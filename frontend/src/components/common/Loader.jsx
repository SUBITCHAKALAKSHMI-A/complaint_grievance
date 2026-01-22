import React from 'react'
import '../../styles/global.css'
import '../../styles/animations.css'

const Loader = ({
  type = 'spinner',
  size = 'medium',
  color = 'primary',
  text,
  fullScreen = false,
  className = '',
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16',
  }
  
  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-purple-600',
    success: 'text-green-600',
    danger: 'text-red-600',
    warning: 'text-yellow-600',
    white: 'text-white',
  }
  
  const renderLoader = () => {
    switch (type) {
      case 'spinner':
        return (
          <div className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`}>
            <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )
        
      case 'dots':
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`${sizeClasses[size]} ${colorClasses[color]} bg-current rounded-full animate-bounce`}
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        )
        
      case 'pulse':
        return (
          <div className={`${sizeClasses[size]} ${colorClasses[color]}`}>
            <div className="w-full h-full bg-current rounded-full animate-pulse"></div>
          </div>
        )
        
      case 'ring':
        return (
          <div className={`${sizeClasses[size]} relative`}>
            <div className={`w-full h-full border-4 border-gray-200 rounded-full`}></div>
            <div className={`absolute top-0 left-0 w-full h-full border-4 border-t-current ${colorClasses[color]} rounded-full animate-spin`}></div>
          </div>
        )
        
      case 'bars':
        return (
          <div className="flex items-end justify-center space-x-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-1 ${colorClasses[color]} bg-current rounded-t-full animate-bounce`}
                style={{
                  height: `${(i + 1) * 20}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              ></div>
            ))}
          </div>
        )
        
      default:
        return null
    }
  }
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm">
        {renderLoader()}
        {text && (
          <p className="mt-4 text-lg font-medium text-gray-700">{text}</p>
        )}
      </div>
    )
  }
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {renderLoader()}
      {text && (
        <p className="mt-3 text-sm font-medium text-gray-600">{text}</p>
      )}
    </div>
  )
}

export default Loader