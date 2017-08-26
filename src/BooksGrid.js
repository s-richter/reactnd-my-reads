import React from 'react'
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

export default BooksGrid