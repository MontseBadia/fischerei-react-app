import React, { Component } from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import PropTypes from 'prop-types';

class Inventory extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
  }

  render() { 
    return ( 
      <div className="inventory">
        <h2>Inventory</h2>
        <ul>
          {Object.keys(this.props.fishes).map(key => 
            <li key={key}><EditFishForm fishState={this.props.fishes[key]} updateFish={this.props.updateFish} index={key} deleteFish={this.props.deleteFish} /></li>  
          )}
        </ul>
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes} >Load Sample Fishes</button>
      </div>
    );
  }
}
 
export default Inventory;