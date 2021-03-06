import React from 'react'
import { Route, Switch } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { defaultCategory, internalNames as ShelfCategories } from './ShelfCategories'
import BookList from './BookList'
import SearchBooks from './SearchBooks'
import Loader from './Loader'
import NoMatch from './NoMatch'
import './App.css'

// the top level component of the app 'My Reads'
class BooksApp extends React.Component {
  state = {
    books: [],                    // the books contained by the shelves
    booksHaveBeenFetched: false   // to notify child components if they should wait for results
  }

  componentDidMount() {
    BooksAPI
      .getAll()
      .then((books) => {
        this.setState({
          books,
          booksHaveBeenFetched: true
        })
      })
  }

  // This function places the specified book on the specified shelf, both locally and on the backend
  //  server, and returns a promise
  handleChangeShelf = (book, shelf) => {
    if (book && book.id && shelf) {
      if (!ShelfCategories.includes(shelf)) {
        // there should only be four well defined categories (including 'none')
        shelf = defaultCategory
      }
      // now that the shelf category of the book is verified, we can set it locally and on the backend
      //  server. We return a promise so that the caller can act upon it
      return BooksAPI
        .update(book, shelf)
        .then(() => {
          book.shelf = shelf
          // the function 'handleChangeShelf' gets also called from the component <SearchBooks>.
          //  In this case the book referred to by the argument 'book' is not yet contained in the array
          //  'books', so we  have to explicitly add it using concat():
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
      // })     // for testing the loading indicator. Blocking operation.
    }
  }

  render() {
    return (
      <div className="app">

        <Switch>
          {/* the first <Route> contains the book shelves with the books  */}
          <Route exact path="/" render={() => (
            <Loader>
              <BookList
                books={this.state.books}
                handleChangeShelf={this.handleChangeShelf}
                booksHaveBeenFetched={this.state.booksHaveBeenFetched}
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

          {/* any other URL is not valid - display an error page */}
          <Route component={NoMatch}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp
