import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid'
import defaultCategory from './ShelfCategories'

class SearchBooks extends React.Component {
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
        matchingBooks: []   // the books matching the current search term
    }

    // this event handler gets called whenever the user changes 
    //  the search term. It updates the list of displayed books accordingly.    
    onChangeQuery = (query) => {
        this.setState({ query: query })
        if (query.length > 1) {
            BooksAPI.search(query)
                .then((result) => {
                    if (Array.isArray(result)) {
                        this.setState({
                            matchingBooks: result.map((b) => {
                                // if this book is already in one of the shelves
                                //  on the main page, this shelf should be the
                                //  value of the books' property 'shelf'  
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
                        // in case of a problem no books should be displayed so
                        //  that the user knows that the search term is invalid
                        this.setState({
                            matchingBooks: []
                        })
                    }
                })
                .catch((ex) => {
                    // in case of a problem no books should be displayed so that
                    //  the user knows that the search term is invalid
                    this.setState({
                        matchingBooks: []
                    })
                })
        }
    }

    render() {
        return (
            <div className="search-books">
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
                <div className="search-books-results">
                    <BooksGrid
                        books={this.state.matchingBooks}
                        handleChangeShelf={(book, shelf) =>
                            this.props.handleChangeShelf(book, shelf)}
                    />
                </div>
                <div>{this.state.result}</div>
            </div>
        )
    }
}

export default SearchBooks