import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';
import PropTypes from 'prop-types';


class App extends Component {
  // state can be declared in constructor or as variable
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  }

  componentDidMount() {
    // link db
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);

    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    };

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  };

  componentDidUpdate() {
    // saves order in localstorage
   localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    // unlink db (we stored the ref because when we leave, we want to remove it)
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    const fishes = { ...this.state.fishes }; // spread operator to copy object
    fishes[`fish${Date.now()}`] = fish; // adds new fish
    this.setState({ fishes }); // equals to 'fishes: fishes'
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  }

  addToOrder = key => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  }

  updateFish = (updatedFish, key) => {
    const fishes = { ...this.state.fishes }
    fishes[key] = updatedFish;
    this.setState({ fishes })
  }
  
  deleteFish = key => {
    const fishes = { ...this.state.fishes }
    fishes[key] = null;
    this.setState({ fishes })
  }

  removeFromOrder = key => {
    const order = { ...this.state.order }
    delete order[key];
    this.setState({ order })
  }

  render() { 
    return ( 
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => 
              <Fish key={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} index={key} />
            )}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
        <Inventory storeId={this.props.match.params.storeId} addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} fishes={this.state.fishes} updateFish={this.updateFish} deleteFish={this.deleteFish} />
      </div>
    );
  }
}
  
export default App;