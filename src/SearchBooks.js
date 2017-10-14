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
    constructor() {
        super()
        this.lastQuery = '';    // should not trigger a re-render, so not implemented as state
        this.queryingFinished = true;   // also not suited for state
    }

    static propTypes = {
        booksInShelves: PropTypes.array.isRequired,
        handleChangeShelf: PropTypes.func.isRequired
    }

    state = {
        query: '',          // the current query (search term)
        matchingBooks: [],  // the books matching the current search term
        newShelf: '',       // the shelf a book was recently added to
        querying: false     // true while the server has not yet returned a result
    }

    componentWillReceiveProps(nextProps) {
        window.scrollTo(0, 0)   // when the query changes, scroll to the top of the page so that all
        //  results are visible
    }

    // this event handler gets called whenever the user changes the search term. It updates the list of
    //  displayed books accordingly and returns a promise so that the caller can act upon the end of the
    //  operation
    onChangeQuery = (query) => {
        return Promise
            .resolve(this.setState({
                querying: true,
                query: query    // set the state immediately so that the user can continue typing
            }))
            .then(() => {
                // only search under certain circumstances
                if (query.length > 1    // don't search if just one character has been entered
                    && (!(this.state.matchingBooks.length === 0
                        && query.startsWith(this.lastQuery))    // if the previous search didn't return
                        //  any results, adding more characters won't change the search result. But there
                        //  are several edge cases that might warrant a search (see next cases)
                        //|| query.length === 2   // previously, there was just one character, and
                        //  therefore no search was conducted (see above). Now it's time to do a search
                        || this.queryingFinished === false  // another search operation is going on, and
                        //  no results have been returned so far, so it's unknown if it makes sense to
                        //  do a new search. To be safe, execute a new search operation now
                        || this.lastQuery.length < 2)) {    // previously, there were just zero or one
                        //  characters, and therefore no search was conducted (see above). Now it's time
                        //  to do a search!
                    this.queryingFinished = false
                    return BooksAPI
                        .search(query)
                        .then((result) => {
                            if (Array.isArray(result)) {
                                this.setState({
                                    matchingBooks: result.map((b) => {
                                        // set the shelf of the book, if a shelf was already set on the
                                        //  main page
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
                                this.setState({ matchingBooks: [] })
                            }
                        })
                        .catch((ex) => {
                            // in case of a problem no books should be displayed so that the user knows
                            //  that the search term is invalid
                            this.setState({ matchingBooks: [] })

                        })
                        .then(() => {
                            this.lastQuery = query
                            this.queryingFinished = true
                            this.setState({ querying: false })
                        }) // whatever the result was, the querying operation is finished now
                } else {
                    // zero or one characters - don't call the server, because at least two characters
                    //  are required
                    this.lastQuery = query
                    this.queryingFinished = true
                    return Promise.resolve(
                        this.setState({
                            matchingBooks: [],
                            querying: false
                        }))
                }
            })
    }

    render() {
        return (
            <div className="search-books">
                {/* the search bar */}
                <SearchBar
                    query={this.state.query}
                    onChangeQuery={(query) => this.props.wrapOperation(this.onChangeQuery, query)}
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