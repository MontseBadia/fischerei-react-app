import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends Component {
  references = {};

  static propTypes = {
    addFish: PropTypes.func
  }

  addRef = (ref) => {
    this.references[ref.name] = ref;
  }

  createFish = (event) => {
    event.preventDefault();

    const { name, price, status, desc, image } = this.references;
    const fish = {
      name: name.value,
      price: parseFloat(price.value), // store as number
      status: status.value,
      desc: desc.value,
      image: image.value
    };

    this.props.addFish(fish);
    event.currentTarget.reset(); // reset the form to leave it empty
  }

  render() { 
    return ( 
      <form className="fish-edit" onSubmit={this.createFish}>
        <input name="name" ref={this.addRef} type="text" placeholder="Name" />
        <input name="price" ref={this.addRef} type="text" placeholder="Price" />
        <select name="status" ref={this.addRef}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold out!</option>
        </select>
        <textarea name="desc" ref={this.addRef} placeholder="Desc" />
        <input name="image" ref={this.addRef} type="text" placeholder="Image" />
        <button type="submit">+ Add Fish</button>
      </form>
     );
  }
}
 
export default AddFishForm;