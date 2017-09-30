import React from 'react'
import PropTypes from 'prop-types'

// the component giving the user a clue when an invalid search term has been entered
class SearchTermsClue extends React.Component {
    static propTypes = {
        query: PropTypes.string.isRequired,
        onChangeQuery: PropTypes.func.isRequired,
        querying: PropTypes.bool.isRequired
    }

    static searchTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy',
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

    constructor() {
        super()
        // group the search terms by their first letter. The result is an array with objects, each of
        //  which has a 'letter' property and a 'values' property containing the search terms beginning
        //  with the letter specified in the 'letter' property
        this.groupedSearchTerms =
            Array
                .from(SearchTermsClue.searchTerms)
                .reduce((acc, current) => {
                    let firstLetter = current[0]
                    let group = acc.find(grp => grp.letter === firstLetter)
                    if (group) { // there is already an object for this letter
                        if (!group.values.includes(current)) {
                            group.values.push(current)
                        }
                    } else { // no object for this letter found -> create one
                        acc.push({ letter: firstLetter, values: [current] })
                    }
                    return acc
                }, [{ letter: SearchTermsClue.searchTerms[0].charAt(0), values: [] }])
    }

    render() {
        switch (this.props.query.length) {
            case 0:
                return null
            case 1:
                return (
                    <div className='search-books-invalid-query'>
                        Please enter at least two characters.
                    </div>
                )
            default:
                if (this.props.querying) {
                    return (
                        <div className='search-books-contacting-server'>
                            Contacting server...
                        </div>
                    )
                }
                return (
                    <div>
                        <div className='search-books-invalid-query'>
                            Your query returned no results.
                        </div>
                        <div className='search-books-clue'>
                            The following search terms are supported:
                        </div>
                        <div className='search-books-valid-search-terms'>
                            {
                                this.groupedSearchTerms.map(group =>
                                    <div
                                        key={group.letter}
                                        className='search-books-search-term-group'>
                                        <div className='search-books-search-term-group-letter'>
                                            {group.letter}
                                        </div>
                                        <div className='search-books-search-term-group-values'>
                                            {
                                                group.values.map(term =>
                                                    <div
                                                        key={term}
                                                        className='search-books-search-term'
                                                        onClick={() =>
                                                            this.props.onChangeQuery(term)}
                                                    >
                                                        {term}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
        }
    }
}

export default SearchTermsClue