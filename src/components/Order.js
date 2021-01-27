import React from 'react';
import { formatPrice } from '../helpers.js';
import PropTypes from 'prop-types';

class Order extends React.Component {

    static propTypes = {
        fishes: PropTypes.object,
        order: PropTypes.object,
        removeFromOrder: PropTypes.func
    }

    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        // if no fish exist, do nothing (handles the time between persisting order and firebase updating the state)
        if (!fish) return null;
        // check if fish exists AND if that fish is available
        const isAvailable = fish && fish.status === 'available';
        if(!isAvailable) {
            return<li key={key}>
                Sorry, {fish ? fish.name : 'fish'} is no longer available.
            </li>
        }
        if(count !== null) {
        return<li key={key}>
            {count} lbs {fish.name} {formatPrice(count * fish.price)} <button onClick={() => this.props.deleteFromOrder(key)}>&times;</button>
            </li>;
        };
    };

    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if(isAvailable) {
                return prevTotal + (count * fish.price);
            }
            return prevTotal;
        }, 0);
        return (
        <div className="order-wrap">
            <h2>Your Order</h2>
            <ul className="order">
                {orderIds.map(this.renderOrder)}
            </ul>
            <div className="total">Total:
            <strong>{formatPrice(total)}</strong></div>
        </div>
        )
    }
}

export default Order;