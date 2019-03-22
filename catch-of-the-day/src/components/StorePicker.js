import React from 'react';
import { getFunName } from '../helpers.js';
import PropTypes from 'prop-types';

class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object
  }
  
  myInput = null;

  addRef = (ref) => {
    this.myInput = ref;
  }

  goToStore = e => {
    e.preventDefault(); // stops the form from submitting
    const storeName = this.myInput.value;
    this.props.history.push(`/store/${storeName}`);
  }

  render(){
    return (
      <form className="store-selector" onSubmit={this.goToStore} >
        <h2>Please Enter A Store</h2>
        <input type="text" ref={this.addRef} required placeholder="Store Name" defaultValue={getFunName()} />
        <button type="submit">Visit Store -></button>
      </form>
    )
  }
};

export default StorePicker;