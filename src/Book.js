import React from 'react'
import PropTypes from 'prop-types'
import { internalNames as ShelfCategories, getDisplayName } from './ShelfCategories'

// the component representing a book including a menu control enabling the user to change the shelf the
//  book is on
function Book(props) {
    const book = props.book
    // sometimes the books returned by BooksAPI.search() do not have values for all properties, so let's
    //  set default values if this is the case
    const imageURL = book.imageLinks
        ? `url(${book.imageLinks.thumbnail})`
        : 'url(https://books.google.com/googlebooks/images/no_cover_thumb.gif)'
    const authors = book.authors
        ? book.authors.join(', ')
        : ''

    return (
        <li>
            <div className="book">
                {/* the cover of the book with a menu control to enable the user to change the shelf  */}
                <div className="book-top">
                    {/* the cover */}
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `${imageURL}`
                        }}>
                    </div>

                    {/* the menu control */}
                    <div className="book-shelf-changer">
                        <select
                            value={book.shelf}
                            onChange={(e) => {
                                props.handleChangeShelf(props.book, e.target.value)
                            }}>
                            {/* the first entry in the context menu is actually not a shelf category, so 
                                we have to add it manually
                            */}
                            <option value="none" disabled>Move to...</option>
                            {/* now we can enumerate over all the shelf categories and create an <option>-
                                element for each category
                            */}
                            {ShelfCategories.map((category) => (
                                <option
                                    key={category}
                                    value={category}>{getDisplayName(category)}
                                </option>
                            ))
                            }
                        </select>
                    </div>
                </div>

                {/* the title of the book */}
                <div className="book-title">{book.title}</div>

                {/* the authors of the book */}
                <div className="book-authors">{authors}</div>
            </div>
        </li>
    )
}

// the code above does also do some (overlapping) checks
Book.PropTypes = {
    book: PropTypes.shape({
        imageLinks: PropTypes.array.isRequired,
        authors: PropTypes.array.isRequired,
        shelf: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }),
    handleChangeShelf: PropTypes.func.isRequired
}

export default Book