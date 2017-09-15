import React from 'react'
import { Link } from 'react-router-dom'
import { defaultCategory, internalNames as ShelfCategories, getDisplayName } from './ShelfCategories'
import Bookshelf from './Bookshelf'

// the list of books, ordered by the book shelf they are on
function BookList(props) {
    return (
        <div className="list-books">

            {/* Title of the app */}
            <div className="list-books-title">
                <h1>My Reads</h1>
                <p>Udacity React Nanodegree · Project #1 · Stephan Richter</p>
            </div>

            {/* The books on the shelves */}
            <div className="list-books-content">
                <div>
                    {/* enumerate all the shelf categories (except for 'none') and create a 'BookShelf' 
                          component für each category
                    */}
                    {ShelfCategories
                        .filter(category => category !== defaultCategory)
                        .map((category) => (
                            <Bookshelf
                                key={category}
                                title={getDisplayName(category)}
                                books={props.books.filter(book => book.shelf === category)}
                                handleChangeShelf={(book, shelf) =>
                                    props.wrapOperation(props.handleChangeShelf, book, shelf)}
                            />
                        ))
                    }
                </div>
            </div>

            {/* Link to the search page */}
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
}
export default BookList