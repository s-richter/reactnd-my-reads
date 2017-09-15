import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { defaultCategory, internalNames as ShelfCategories } from './ShelfCategories'
import BookList from './BookList'
import SearchBooks from './SearchBooks'
import Loader from './Loader'
import './App.css'

// the top level component of the app 'MyReads'
class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI
      .getAll()
      .then((books) => {
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
      //backend server. We return a promise so that the caller can act upon it
      return BooksAPI
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
      // .then(() => {
      //   var currentTime = new Date().getTime()
      //   while (currentTime + 10000 >= new Date().getTime()) { }
      // })     // for testing the loading indicator
    }
  }

  render() {
    return (
      <div className="app">

        {/* the first <Route> contains the book shelves with the books  */}
        <Route exact path="/" render={() => (
          <Loader>
            <BookList
              books={this.state.books}
              handleChangeShelf={this.handleChangeShelf}
            />
          </Loader>
        )} />

        {/* the second <Route> contains the search page  */}
        <Route path="/search" render={() => (
          <Loader>
            <SearchBooks
              booksInShelves={this.state.books}
              handleChangeShelf={this.handleChangeShelf} />
          </Loader>
        )} />
      </div>
    )
  }
}

export default BooksApp
