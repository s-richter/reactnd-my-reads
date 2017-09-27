import React from 'react'

// A functional component indicating when the app is busy
function LoadingIndicator(props) {
    return <div className="loading-indicator">
        <div className='loading-letter'>l</div>
        <div className='loading-letter'>o</div>
        <div className='loading-letter'>a</div>
        <div className='loading-letter'>d</div>
        <div className='loading-letter'>i</div>
        <div className='loading-letter'>n</div>
        <div className='loading-letter'>g</div>
    </div>
}

export default LoadingIndicator