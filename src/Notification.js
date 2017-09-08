import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import PropTypes from 'prop-types'
import { getDisplayName } from './ShelfCategories'

// A notification showing the most recent shelf-change
class Notification extends React.Component {
    static propTypes = {
        newShelf: PropTypes.string.isRequired
    }

    shouldComponentUpdate(nextProps, nextState) {
        // SearchBooks (the parent component) causes two renderings whenever we change the book shelf. 
        //  We only want to render the current 'Notification' once, so we have to check if the shelf 
        //  was already set and cancel the second render
        return this.props.newShelf !== nextProps.newShelf || this.props.newShelf === ''
    }

    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName="note-fade-out"
                transitionEnterTimeout={3000}
                transitionLeaveTimeout={10}>
                <div
                    key={this.props.newShelf || 'none'}
                    className="notify-change-shelf">
                    The book was moved to the shelf '{getDisplayName(this.props.newShelf)}'
                </div>
            </ReactCSSTransitionGroup>
        )
    }
}

export default Notification