import React from 'react'
import PropTypes from 'prop-types'
import BooksGrid from './BooksGrid'

// a book shelf containing some books
function Bookshelf(props) {
    const bookCount = props.books.length
    const countDisplay = `(${bookCount} book${bookCount !== 1 ? 's' : ''})`

    return (
        <div className="bookshelf">
            {/* the title of the shelf and the number of books contained in this shelf */}
            <h2 className="bookshelf-title">
                {props.title}&nbsp;
                <span className="bookshelf-book-count">{countDisplay}</span>
            </h2>

            {/* the books contained in the shelf */}
            <div className="bookshelf-books">
                <BooksGrid
                    books={props.books}
                    handleChangeShelf={(book, shelf) =>
                        props.handleChangeShelf(book, shelf)}
                />
            </div>
        </div>
    )
}

Bookshelf.propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    handleChangeShelf: PropTypes.func.isRequired
}

export default Bookshelf