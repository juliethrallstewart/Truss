import React from 'react'

const ErrorComponent = () => {
    return (
        <div className="error">
            <div className="error-top">
            <h1 className="error-item">404</h1>
            <h2 className="error-item">We are sorry, we could not find what you are looking for!</h2>
            </div>
            <span className="error-item error-bottom">Photo by <a href="https://unsplash.com/@joeyc?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Joe Caione</a> on <a href="https://unsplash.com/s/photos/happy-puppy?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
        </div>
    )
}

export default ErrorComponent

