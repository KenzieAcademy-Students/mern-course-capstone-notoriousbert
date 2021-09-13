import React from 'react'
import { FaSpinner } from 'react-icons/fa'
import './LoadingSpinner.css'

function LoadingSpinner({ full }) {
  return (
    <div className={`${full ? 'FullPageSpinner' : 'Spinner'}`}>
      <FaSpinner />
    </div>
  )
}

export default LoadingSpinner
