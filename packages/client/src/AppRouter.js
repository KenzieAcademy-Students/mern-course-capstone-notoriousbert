/*
  Import from this file instead of react-router-dom directly.
*/
import React, { useEffect } from 'react'
import { Router as RouterOriginal, useLocation } from 'react-router-dom'

// Use a custom history object and pass to Router so that we
// can utilize history.listen() where needed (such as for pageview tracking)
import { createBrowserHistory } from 'history'
export const history = createBrowserHistory()

// Export our <Router> component
// Includes custom history object and component for auto-scrolling to top
export function AppRouter({ children }) {
  return (
    <RouterOriginal history={history}>
      <ScrollToTop />
      {children}
    </RouterOriginal>
  )
}

// Remove or customize if you need more advanced scroll behavior
// and don't want to always scroll to top when location.pathname changes.
function ScrollToTop() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  return null
}