import React from 'react'
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

export default Bookshelf