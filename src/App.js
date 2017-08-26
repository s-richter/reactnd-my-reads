import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  static shelfCategories = {
    currentlyReading: 'currentlyReading',
    wantToRead: 'wantToRead',
    read: 'read',
    none: 'none'
  }

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  handleChangeShelf = (book, shelf) => {
    if (book && book.id && shelf) {
      if (!(shelf in BooksApp.shelfCategories)) {
        shelf = BooksApp.shelfCategories.none
      }
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf
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
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  title='Currently Reading'
                  books={this.state.books.filter(
                    (book) => book.shelf === BooksApp.shelfCategories.currentlyReading
                  )}
                  handleChangeShelf={this.handleChangeShelf} />
                <Bookshelf
                  title='Want to Read'
                  books={this.state.books.filter(
                    (book) => book.shelf === BooksApp.shelfCategories.wantToRead
                  )}
                  handleChangeShelf={this.handleChangeShelf} />
                <Bookshelf
                  title='Read'
                  books={this.state.books.filter(
                    (book) => book.shelf === BooksApp.shelfCategories.read
                  )}
                  handleChangeShelf={this.handleChangeShelf} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />

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
