import React from 'react'
import LoadingIndicator from './LoadingIndicator'

// A wrapper component that displays a loading (busy) indicator when a long-running operation is being
//  executed
// Usage:
//  - First, check that the long-running operation returns a promise. The 'Loader' component uses this
//      to determine when the operation has finished
//  - Wrap the component(s) with the long-running operation(s) into a 'Loader' component:
//      ...
//          <Loader>
//              <MyComponent .../>
//          </Loader>
//      ...
//  - 'Loader' wraps the child component(s) and supplies a property 'wrapOperation', which is a function.
//      The child component(s) call this function to indicate that a long-running operation is being
//      executed
//  - 'wrapOperation' takes one or more arguments: the first is the long-running function, the others are
//      the argument to this long-running function
//  - 'wrapOperation' first signals that the loading indicator should be displayed by setting its state
//      variable 'showIndicator' to true, triggering a re-render by React
//  - 'wrapOperation' then calld the long-running function
//  - once the long-running function has returned a promise, 'wrapOperation' signals that the loading
//      indicator should be hidden/destroyed by setting its state variable 'showIndicator' to false
//  - 'wrapOperation' then returns a promise so that the caller can (optionally) chain .then()-calls
//  - if an error occurs, a message is sent to the console and the error is re-thrown
//  - Example for how a caller (in this case, a class component) can use the 'Loader' component:
//      ...
//      <input 
//          type="text"
//          onChange={(event) => {
//              this.props.wrapOperation(this.onChangeQuery, event.target.value)
//          }}
//      />
//      ...
//      In this example, onChangeQuery is a function returning a promise.
//  - Because 'wrapOperation' returns a promise, the caller can e.g. call this.setState(...):
//          onChange={(event) => {
//              this.props
//                  .wrapOperation(this.onChangeQuery, event.target.value)
//                  -then(() => this.setState({ applicationReady: true })))
class Loader extends React.Component {
    state = {
        showIndicator: false
    }

    // this method is called by the wrapped component and has one ore more arguments:
    //  - promiseFunc: a function returning a promise, executing a long-running operation. While this 
    //              operation takes place, the loading indicator is shown
    //  - ...args: zero or more arguments for the call to the operation (function) returning the promise
    wrapOperation = (promiseFunc, ...args) => {
        // first, we signal that we want to display the busy indicator       
        this.setState({ showIndicator: true })
        // some checks on the first argument
        if (promiseFunc && typeof promiseFunc === 'function') {
            try {
                // this fails if promiseFunc does not return a promise. If it succeeds, the operation
                //  is finished and we signal that we want to scrap the busy indicator. Furthermore, we
                //  return a promise so that the caller can act upon the finalization of the operation
                return promiseFunc(...args).then(() => {
                    this.setState({ showIndicator: false })
                })
            } catch (e) {
                console.log(
                    "There was an error executing the promise returning function and calling .then(...) "
                    + "on the result. Check if the argument 'promiseFunc' is really a function "
                    + "returning a promise. Re-throwing the error now...")
                throw e;
            }
        }
    }

    render() {
        return (
            <div>
                <div
                    className="loader-children"
                    style={{
                        opacity: `${this.state.showIndicator ? 0.3 : 1}`
                    }}>
                    {React.cloneElement(this.props.children, { wrapOperation: this.wrapOperation })}
                </div>
                {this.state.showIndicator ? <LoadingIndicator/> : null}
            </div>
        )
    }
}

export default Loader