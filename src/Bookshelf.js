import React from 'react'
import BooksGrid from './BooksGrid'

class Bookshelf extends React.Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <BooksGrid
                        books={this.props.books}
                        handleChangeShelf={(book, shelf) =>
                            this.props.handleChangeShelf(book, shelf)}
                    />
                </div>
            </div>
        )
    }
}

export default Bookshelf