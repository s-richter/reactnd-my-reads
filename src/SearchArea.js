import React from 'react'
import SearchBar from './SearchBar'
import SearchTermsClue from './SearchTermsClue'

class SearchArea extends React.Component {
    // state = {
    //     query: ''
    // }

    onChangeQuery = (query) => {
        // this.setState({ query: query })
        this.props.onChangeQuery(query)
    }

    clearQuery = () => {
        // this.setState({ query: '' })
        this.props.onChangeQuery('')
    }

    shouldComponentUpdate(nextProps, nextState) {        
        return nextProps.query !== this.props.query;
    }

    render() {       
        return (
            <div>
                <SearchBar
                    query={this.props.query}
                    onChangeQuery={(query) => this.onChangeQuery(query)}
                    clearQuery={() => this.clearQuery()}
                />
                {
                    this.props.bookCount === 0
                        ? <SearchTermsClue
                            query={this.props.query}
                            onChangeQuery={(query) => {
                                this.onChangeQuery(query)
                            }}
                        />
                        : null
                }
            </div>
        )
    }
}

export default SearchArea