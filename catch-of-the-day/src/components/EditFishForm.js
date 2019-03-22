import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends Component {
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    index: PropTypes.string,
    updateFish: PropTypes.func
  }

  handleChange = event => {
    const fishState = { 
      ...this.props.fishState,
      // wooooooo! copies the object but changes specific attribute
      [event.currentTarget.name]: event.currentTarget.value
    };
    this.props.updateFish(fishState, this.props.index);
  };

  render() { 
    const { name, price, status, desc, image } = this.props.fishState;

    return (
      <div className="fish-edit">
        <input name="name" type="text" onChange={this.handleChange} value={name} />
        <input name="price" type="text" onChange={this.handleChange} value={price} />
        <select name="status" onChange={this.handleChange} value={status} >
          <option onChange={this.handleChange} value="available">Fresh!</option>
          <option onChange={this.handleChange} value="unavailable">Sold out!</option>
        </select>
        <textarea name="desc" onChange={this.handleChange} value={desc} />
        <input name="image" type="text" onChange={this.handleChange} value={image} />
        <button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
      </div>
    );
  }
}
 
export default EditFishForm;