import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
// import ListBookshelves from './ListShelves'
import Bookshelf from './Bookshelf'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      this.setState({
        currentlyReading: books.filter((book) =>
          (
            book.shelf === 'currentlyReading'
          ))
      })
      this.setState({
        wantToRead: books.filter((book) =>
          (
            book.shelf === 'wantToRead'
          ))
      })
      this.setState({
        read: books.filter((book) =>
          (
            book.shelf === 'read'
          ))
      })
    })
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
                <Bookshelf title='Currently Reading' books={this.state.currentlyReading} />
                <Bookshelf title='Want to Read' books={this.state.wantToRead} />
                <Bookshelf title='Read' books={this.state.read} />
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
