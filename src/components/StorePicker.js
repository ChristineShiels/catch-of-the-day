import React from 'react';
import { getFunName } from "../helpers.js";
import PropTypes from 'prop-types';



class StorePicker extends React.Component {
    myInput = React.createRef();

    static propTypes = {
        history: PropTypes.object
    }

    goToStore = (e) => {
        // stop from reloading page
        e.preventDefault();
        // get text from input
        const storeName = this.myInput.current.value;
        // go to store page
        this.props.history.push(`/store/${storeName}`);
    };

    render() {
        return (
        <React.Fragment>
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Enter a Store</h2>
                <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={this.myInput} />
                <button type="submit" >Visit Store ➡</button>
            </form>
        </React.Fragment>
        )
    }
}

export default StorePicker;