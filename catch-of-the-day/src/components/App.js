import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';


class App extends Component {
  // state can be declared in constructor or as variable
  state = {
    fishes: {},
    order: {}
  };

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
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
      </div>
    );
  }
}
  
export default App;