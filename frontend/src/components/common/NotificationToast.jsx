import React, { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import '../../styles/global.css'
import '../../styles/animations.css'

const NotificationToast = ({
  id,
  message,
  type = 'info',
  duration = 5000,
  onClose,
  position = 'top-right',
  icon,
  title,
}) => {
  const [isExiting, setIsExiting] = useState(false)
  
  const handleClose = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => {
      onClose(id)
    }, 300)
  }, [id, onClose])
  
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose()
    }, duration)
    
    return () => clearTimeout(timer)
  }, [duration, handleClose])
  
  const typeConfig = {
    success: {
      bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
      icon: '✅',
      text: 'text-white',
    },
    error: {
      bg: 'bg-gradient-to-r from-red-500 to-pink-500',
      icon: '❌',
      text: 'text-white',
    },
    warning: {
      bg: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      icon: '⚠️',
      text: 'text-white',
    },
    info: {
      bg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      icon: 'ℹ️',
      text: 'text-white',
    },
  }
  
  const config = typeConfig[type] || typeConfig.info
  
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  }
  
  return createPortal(
    <div
      className={`fixed ${positionClasses[position]} z-50 animate-in fade-in-0 slide-in-from-top-5 ${isExiting ? 'animate-out fade-out-0 slide-out-to-top-5' : ''}`}
    >
      <div
        className={`${config.bg} ${config.text} rounded-xl shadow-2xl overflow-hidden min-w-[300px] max-w-md transform transition-all duration-300 hover:scale-105`}
      >
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 text-xl">
              {icon || config.icon}
            </div>
            <div className="flex-1">
              {title && (
                <h4 className="font-bold text-sm mb-1">{title}</h4>
              )}
              <p className="text-sm">{message}</p>
            </div>
            <button
              onClick={handleClose}
              className="flex-shrink-0 ml-2 hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label="Close notification"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="h-1 bg-black/20 overflow-hidden">
          <div
            className="h-full bg-white/50"
            style={{
              animation: `progress ${duration}ms linear forwards`,
            }}
          ></div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default NotificationToast