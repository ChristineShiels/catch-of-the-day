import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header.js';
import Inventory from './Inventory.js';
import Order from './Order.js';
import Fish from './Fish.js';
import base from '../base.js';

import sampleFishes from '../sample-fishes.js';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    }

    // sync to firebase when storefront loads
    componentDidMount() {
        const { params } = this.props.match;
        // reinstate local storage to persist order storage through refresh
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({
                order: JSON.parse(localStorageRef)
            })
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    };

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    };

    // stops syncing to firebase when you unload the storefront
    componentWillUnmount() {
        base.removeBinding(this.ref);
    };


addFish = (fish) => {
    // take a copy of teh existing state
    const fishes = {...this.state.fishes};
    // add new fish to fishes (Date.now is # of ms since 1970)
    fishes[`fish${Date.now()}`] = fish;
    // set new fishes object to state
    this.setState({
        fishes: fishes
    });
};

updateFish = (key, updatedFish) => {
    // take a copy of the current state
    const fishes ={ ...this.state.fishes };
    // update that state
    fishes[key] = updatedFish;
    // set update to state
    this.setState({ fishes: fishes });
};

deleteFish = (key) => {
    // take a copy of state
    const fishes = { ...this.state.fishes };
    // update the value (must update to null to delete from firebase)
    fishes[key] = null;
    // update the state
    this.setState({ fishes });
};

loadSampleFishes = () => {
this.setState({
    fishes: sampleFishes
})};

addToOrder = (key) => {
    // take a copy of state
    const order = { ...this.state.order };
    // add to order
    order[key] = order[key] + 1 || 1;
    // set state
    this.setState({ order });
};

deleteFromOrder = (key) => {
    const order = { ...this.state.order };
    if(order[key] === 1) {
        order[key] = null
    }else {
        order[key] = order[key] - 1;
    };
    this.setState({ order });
};

render() {
    return (
        <div className="catch-of-the-day">
            <div className="menu">
                <Header tagline="Fresh Seafood Market"/>
                <ul className="fishes">
                    {Object.keys(this.state.fishes).map(key =>
                    <Fish
                        key={key}
                        index={key}
                        details={this.state.fishes[key]}
                        addToOrder={this.addToOrder} />)}
                </ul>
            </div>
            <Order
                fishes={this.state.fishes}
                order={this.state.order}
                deleteFromOrder={this.deleteFromOrder} />
            <Inventory
                addFish={this.addFish}
                updateFish={this.updateFish}
                deleteFish={this.deleteFish}
                loadSampleFishes={this.loadSampleFishes}
                fishes={this.state.fishes}
                storeId={this.props.match.params.storeId} />
        </div>
    )
}

}

export default App;