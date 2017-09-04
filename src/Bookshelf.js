import React from 'react'
import PropTypes from 'prop-types'
import BooksGrid from './BooksGrid'

function Bookshelf(props) {
    return (
        <div className="bookshelf">
            {/* the title of the shelf */}
            <h2 className="bookshelf-title">{props.title}</h2>

            {/* the books contained in teh shelf */}
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