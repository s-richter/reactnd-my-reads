import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid'
import { defaultCategory } from './ShelfCategories'
import Notification from './Notification'

class SearchBooks extends React.Component {
    static propTypes = {
        booksInShelves: PropTypes.array.isRequired,
        handleChangeShelf: PropTypes.func.isRequired
    }

    static searchTermns = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy',
        'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief',
        'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook',
        'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing',
        'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film',
        'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi',
        'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri',
        'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez',
        'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography',
        'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics',
        'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming',
        'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality',
        'Web Development', 'iOS']

    state = {
        query: '',
        matchingBooks: [],  // the books matching the current search term
        newShelf: ''    // the shelf a book was recently added to
    }

    // this event handler gets called whenever the user changes the search term. It updates the list of
    //  displayed books accordingly
    onChangeQuery = (query) => {
        this.setState({ query: query })
        if (query.length > 1) {
            BooksAPI.search(query)
                .then((result) => {
                    if (Array.isArray(result)) {
                        this.setState({
                            matchingBooks: result.map((b) => {
                                // set the shelf of the book, if a shelf was already set on the main page
                                let bookInShelf = this.props.booksInShelves.find((item) => item.id === b.id)
                                if (bookInShelf) {
                                    b.shelf = bookInShelf.shelf
                                } else {
                                    b.shelf = defaultCategory
                                }
                                return b
                            })
                        })
                    } else {
                        // in case of a problem no books should be displayed so that the user knows that
                        //  the search term is invalid
                        this.setState({
                            matchingBooks: []
                        })
                    }
                })
                .catch((ex) => {
                    // in case of a problem no books should be displayed so that the user knows that the
                    //  search term is invalid
                    this.setState({
                        matchingBooks: []
                    })
                })
        }
    }

    setNewShelf = (shelf) => {
        this.setState({ newShelf: shelf})
        // this causes another render, but we need this so that the books' shelf is updated.
        //  What we don't want is a re-render of the notification, so we have to deal with that problem
        //  in the component 'Notification', which manages the notification display
    }

    render() {
        return (
            <div className="search-books">
                {/* the search bar */}
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) => { this.onChangeQuery(event.target.value) }}
                        />
                    </div>
                </div>

                {/* the list of books matching the current query */}
                <div className="search-books-results">
                    <BooksGrid
                        books={this.state.matchingBooks}
                        handleChangeShelf={(book, shelf) => {
                            this.props.handleChangeShelf(book, shelf)
                            this.setNewShelf(shelf)
                        }}
                    />
                </div>

                {/* the notification showing the most recent shelf change */}
                <Notification newShelf={this.state.newShelf}/>
            </div>
        )
    }
}

export default SearchBooks