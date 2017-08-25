import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  static statics = {
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
      if (!(shelf in BooksApp.statics)) {
        shelf = BooksApp.statics.none
      }
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf
        this.setState((prev) => ({ 
          books: prev.books }))
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
                  title={BooksApp.statics.currentlyReading}
                  books={this.state.books.filter(
                    (book) => book.shelf === BooksApp.statics.currentlyReading
                  )}
                  handleChangeShelf={this.handleChangeShelf} />
                <Bookshelf
                  title={BooksApp.statics.wantToRead}
                  books={this.state.books.filter(
                    (book) => book.shelf === BooksApp.statics.wantToRead
                  )}
                  handleChangeShelf={this.handleChangeShelf} />
                <Bookshelf
                  title={BooksApp.statics.read}
                  books={this.state.books.filter(
                    (book) => book.shelf === BooksApp.statics.read
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
          <SearchBooks />
        )} />
      </div>
    )
  }
}

export default BooksApp
