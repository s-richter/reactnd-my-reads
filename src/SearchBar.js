import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input';

// the search bar at the top of the page where the user enters a search term
class SearchBar extends React.Component {
    static propTypes = {
        query: PropTypes.string.isRequired,
        onChangeQuery: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.textInput.focus();
    }

    componentDidUpdate() {
        this.textInput.focus();
    }

    render() {
        return (
            <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    <DebounceInput
                        minLength={0}
                        debounceTimeout={200}
                        placeholder="Search by title or author"
                        value={this.props.query}
                        onChange={(event) => this.props.onChangeQuery(event.target.value)}
                        inputRef={(input) => { this.textInput = input; }}
                    />
                </div>
                <div className='search-books-bar-clear-wrapper'>
                    <button
                        onClick={() => this.props.onChangeQuery('')}
                        className='search-books-bar-clear'
                        style={{
                            visibility: `${this.props.query === '' ? 'hidden' : 'visible'}`
                        }}>
                        Clear search
                </button>
                </div>
            </div>
        )
    }
}

export default SearchBar