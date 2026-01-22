import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProtectedRoute = ({ children, allowedRoles, user }) => {
  // Check if user exists
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Check if user has required role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
  user: PropTypes.shape({
    role: PropTypes.string.isRequired
  })
}

ProtectedRoute.defaultProps = {
  allowedRoles: [],
  user: null
}

export default ProtectedRoute