import React from 'react'
import { Link } from 'react-router-dom'

class SearchBar extends React.Component {
    render() {        
        return (
            <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        value={this.props.query}
                        onChange={(event) => this.props.onChangeQuery(event.target.value)}
                    />
                </div>
                <div className='search-books-bar-clear-wrapper'>
                    <button
                        onClick={() => this.props.clearQuery()}
                        className='search-books-bar-clear'
                        style={{
                            opacity: `${this.props.query === '' ? 0 : 1}`
                        }}>
                        Clear search
                </button>
                </div>
            </div>
        )
    }
}

export default SearchBar