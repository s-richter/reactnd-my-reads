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
        // we just want to render a notification if there was a change. Due to the fact that React renders
        //  the components every time a state or prop change happens, this component might render multiple
        //  times, which we want to avoid
        return this.props.newShelf !== nextProps.newShelf
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