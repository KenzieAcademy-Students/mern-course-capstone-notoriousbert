import React from 'react'
import { useApiFetch } from "util/api"
import LoadingSpinner from 'components/LoadingSpinner'

export default function HomePage(props) {
  const {error, isLoading, response} = useApiFetch("/sample")

  return (
    <main>
      <h1>Welcome to my app!</h1>
      { error && <h3 style={{color:"red"}}>Error Loading Data: {error}</h3>}
      { isLoading &&  <LoadingSpinner></LoadingSpinner>}
      { !error && response && (
        <div>Username: {response.username}</div>
      )}
    </main>
  )
}
