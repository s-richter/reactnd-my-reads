import React from 'react'

// A functional component indicating when the app is busy
function LoadingIndicator(props) {
    return <div className="loading-indicator">
        <div className="loading-dot"/>
        <div className="loading-dot"/>
        <div className="loading-dot"/>
        <div className="loading-dot"/>
    </div>
}

export default LoadingIndicator