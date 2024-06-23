import React, { useEffect } from 'react'

const NotFound = () => {
    useEffect(() => {
        alert('404 Not Found')
        setTimeout(() => {
            window.location.href = '/login';
        }, 0)
    },[])
  return (
    <div>
      <h1>404 Not Found</h1>
    </div>
  )
}

export default NotFound
