import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends React.Component {
    static searchTermns = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy',
        'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief',
        'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook',
        'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing',
        'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film',
        'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi',
        'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri',
        'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez',
        'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography',
        'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics',
        'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming',
        'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality',
        'Web Development', 'iOS']

    state = {
        query: '',
        matchingBooks: [],
        result: '' // TODO: remove
    }

    updateQuery = (query) => {
        console.log('---- query updated: ' + query + '----')
        this.setState({ query: query })
        if (query.length > 1) {
            console.log('query.length: ' + query.length)
            BooksAPI.search(query)
                .then((result) => {
                    console.log('result: ' + result)
                    if (Array.isArray(result)) {
                        console.log('result is an Array:')
                        console.log(result.map((b) => b.title).join(', '))
                        this.setState({
                            matchingBooks: result
                        })
                    } else {
                        console.log('result is NOT an Array:')
                        this.setState({
                            matchingBooks: []
                        })
                    }
                    console.log('matchingBooks is now: ')
                    console.log(this.state.matchingBooks.map((b) => b.title).join(', '))
                    this.setState({
                        result: this.state.matchingBooks.map((b) => b.title).join(', ')
                    })
                })
                .catch((ex) => {
                    console("exception: " + ex)
                    this.setState({
                        matchingBooks: []
                    })
                })
        } else {
            this.setState({
                result: ''
            })
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) => { this.updateQuery(event.target.value) }}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid"></ol>
                </div>
                <div>{this.state.result}</div>
            </div>
        )
    }
}

export default SearchBooks