import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

function BooksGrid(props) {
    return (
        <ol className="books-grid">
            {props.books.map((book) => (
                <Book
                    key={book.id}
                    book={book}
                    handleChangeShelf={(book, shelf) =>
                        props.handleChangeShelf(book, shelf)} />
            ))}
        </ol>
    )
}

BooksGrid.propTypes = {
    books: PropTypes.array.isRequired,
    handleChangeShelf: PropTypes.func.isRequired
}

export default BooksGrid