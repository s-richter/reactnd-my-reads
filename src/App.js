import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { defaultCategory, internalNames as ShelfCategories, getDisplayName } from './ShelfCategories'
import Bookshelf from './Bookshelf'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  // This function sets the property 'shelf' of the supplied 'book' to the specified value 'shelf',
  //  both locally and on the backend server
  handleChangeShelf = (book, shelf) => {
    if (book && book.id && shelf) {
      if (!ShelfCategories.includes(shelf)) {
        // there should only be four well defined categories (including 'none')
        shelf = defaultCategory
      }
     // now that the shelf category of the book is verified, we can set it locally and on the 
      //backend server
      BooksAPI
        .update(book, shelf)
        .then(() => {
          book.shelf = shelf
          // the function 'handleChangeShelf' gets also called from the component 'SearchBooks'.
          //  In this case the book referred to by the argument 'book' is not yet contained in the
          //  array 'books', so we  have to explicitly add it using concat():
          this.setState((prev) => ({
            books: prev.books
              .filter((b) => (
                b.id !== book.id
              ))
              .concat(book)
          }))
        })
    }
  }

  render() {
    return (
      <div className="app">

        {/* the first <Route> contains the main page  */}
        <Route exact path="/" render={() => (
          <div className="list-books">

            {/* Title of the app */}
            <div className="list-books-title">
              <h1>MyReads</h1>
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
                      books={this.state.books.filter(book => book.shelf === category)}
                      handleChangeShelf={this.handleChangeShelf}
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
        )} />

        {/* the second <Route> contains the search page  */}
        <Route path="/search" render={() => (
          <SearchBooks
            booksInShelves={this.state.books}
            handleChangeShelf={this.handleChangeShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
