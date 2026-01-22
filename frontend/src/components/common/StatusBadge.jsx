import React from 'react'
import '../../styles/global.css'

const StatusBadge = ({
  status,
  size = 'medium',
  showIcon = true,
  className = '',
}) => {
  const statusConfig = {
    new: {
      label: 'New',
      color: 'bg-gradient-to-r from-purple-900 to-purple-700',
      icon: '🆕',
      text: 'text-white',
    },
    pending: {
      label: 'Pending',
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      icon: '⏳',
      text: 'text-white',
    },
    'in-progress': {
      label: 'In Progress',
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      icon: '⚡',
      text: 'text-white',
    },
    resolved: {
      label: 'Resolved',
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      icon: '✅',
      text: 'text-white',
    },
    closed: {
      label: 'Closed',
      color: 'bg-gradient-to-r from-gray-500 to-gray-700',
      icon: '🔒',
      text: 'text-white',
    },
    escalated: {
      label: 'Escalated',
      color: 'bg-gradient-to-r from-red-500 to-pink-500',
      icon: '⚠️',
      text: 'text-white',
    },
    'under-review': {
      label: 'Under Review',
      color: 'bg-gradient-to-r from-indigo-500 to-purple-500',
      icon: '🔍',
      text: 'text-white',
    },
    rejected: {
      label: 'Rejected',
      color: 'bg-gradient-to-r from-red-700 to-red-900',
      icon: '❌',
      text: 'text-white',
    },
    approved: {
      label: 'Approved',
      color: 'bg-gradient-to-r from-green-600 to-emerald-600',
      icon: '👍',
      text: 'text-white',
    },
  }
  
  const config = statusConfig[status.toLowerCase()] || {
    label: status,
    color: 'bg-gradient-to-r from-gray-500 to-gray-700',
    icon: '❓',
    text: 'text-white',
  }
  
  const sizeClasses = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-1.5 text-base',
  }
  
  return (
    <span
      className={`inline-flex items-center gap-1.5 ${config.color} ${config.text} ${sizeClasses[size]} rounded-full font-semibold shadow-sm transition-all duration-300 hover:scale-105 ${className}`}
    >
      {showIcon && <span className="text-sm">{config.icon}</span>}
      {config.label}
    </span>
  )
}

export default StatusBadge