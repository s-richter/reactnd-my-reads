import React from 'react'

function Book(props) {
    const book = props.book
    // sometimes the books returned by BooksAPI.search() do not
    //  have values for all properties
    const imageURL = book.imageLinks
        ? `url(${book.imageLinks.thumbnail})`
        : 'url(https://books.google.com/googlebooks/images/no_cover_thumb.gif)'
    const authors = book.authors
        ? book.authors.join(', ')
        : ''

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `${imageURL}`
                        }}>
                    </div>
                    <div className="book-shelf-changer">
                        <select
                            value={book.shelf}
                            onChange={(e) => {
                                props.handleChangeShelf(props.book, e.target.value)
                            }}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        </li>
    )
}


export default Book