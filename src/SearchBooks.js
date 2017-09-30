import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid'
import { defaultCategory } from './ShelfCategories'
import Notification from './Notification'
import SearchBar from './SearchBar'
import SearchTermsClue from './SearchTermsClue'

// the component enabling the user to search for books and place them on a shelf
class SearchBooks extends React.Component {
    static propTypes = {
        booksInShelves: PropTypes.array.isRequired,
        handleChangeShelf: PropTypes.func.isRequired
    }

    state = {
        query: '',
        lastQuery: '',      // the last query. Used to determine if sending the new query makes sense
        matchingBooks: [],  // the books matching the current search term
        newShelf: '',       // the shelf a book was recently added to
        querying: false     // true while the server has not yet returned a result
    }

    componentWillReceiveProps(nextProps) {
        window.scrollTo(0, 0)   // when the query changes, scroll to the top of the page so that all
                                //  results are visible
    }

    // this event handler gets called whenever the user changes the search term. It updates the list
    //  of displayed books accordingly and returns a promise so that the caller can act upon the end
    //  of the operation
    onChangeQuery = (query) => {
        return Promise
            .resolve(this.setState({
                querying: true,
                query: query
            }))
            .then(() => {
                // only search (call the server) if the query is longer than 1 character and, if the
                //  last search returned no results, don't search if the new query builds upon (adds
                //  letters to) the last query string, except when the query consists of two letters
                if (query.length > 1
                    && (!(this.state.matchingBooks.length === 0
                        && query.startsWith(this.state.lastQuery))
                        || query.length === 2)) {
                    return BooksAPI
                        .search(query)
                        .then((result) => {
                            if (Array.isArray(result)) {
                                this.setState({
                                    matchingBooks: result.map((b) => {
                                        // set the shelf of the book, if a shelf was already set on
                                        //  the main page
                                        let bookInShelf = this.props.booksInShelves
                                            .find((item) => item.id === b.id)
                                        if (bookInShelf) {
                                            b.shelf = bookInShelf.shelf
                                        } else {
                                            b.shelf = defaultCategory
                                        }
                                        return b
                                    })
                                })
                            } else {
                                // in case of a problem no books should be displayed so that the user
                                //  knows that the search term is invalid
                                this.setState({
                                    matchingBooks: [],
                                    lastQuery: query
                                })
                            }
                        })
                        .catch((ex) => {
                            // in case of a problem no books should be displayed so that the user knows
                            //  that the search term is invalid
                            this.setState({
                                matchingBooks: [],
                                lastQuery: query
                            })

                        })
                        .then(() => this.setState({ querying: false }))
                } else {
                    // zero or one characters - don't call the server, because we require at least two
                    //  characters
                    this.setState({
                        matchingBooks: [],
                        lastQuery: query
                    })
                    return Promise
                        .resolve(null)
                        .then(() => this.setState({ querying: false }))
                }
            })
    }


    render() {
        return (
            <div className="search-books">
                {/* the search bar */}
                <SearchBar
                    query={this.state.query}
                    onChangeQuery={(query) =>
                        this.props.wrapOperation(this.onChangeQuery, query)
                    }
                />

                {/* the list of books matching the current query */}
                <div className="search-books-results">
                    {
                        this.state.matchingBooks.length === 0
                            ? <SearchTermsClue
                                query={this.state.query}
                                onChangeQuery={(query) => {
                                    this.props.wrapOperation(this.onChangeQuery, query)
                                }}
                                querying={this.state.querying}
                            />
                            : <BooksGrid
                                books={this.state.matchingBooks}
                                handleChangeShelf={(book, shelf) => {
                                    this.props
                                        .wrapOperation(this.props.handleChangeShelf, book, shelf)
                                        .then(() => this.setState({ newShelf: shelf }))
                                }}
                            />
                    }
                </div>

                {/* the notification showing the most recent shelf change */}
                <Notification newShelf={this.state.newShelf} />
            </div>
        )
    }
}

export default SearchBooks