import React from 'react'
import { Link } from 'react-router-dom'

export default function NoMatch(props) {
    return (
        <div className="nomatch">
            <h3>404 page not found</h3>
            <p>Ooops. Unfortunately there is nothing to see here.</p>
            <p>
                <Link to="/">Back to Home</Link><br/>
                <Link to="/search">Search for books</Link>
            </p>
        </div>
    )

}