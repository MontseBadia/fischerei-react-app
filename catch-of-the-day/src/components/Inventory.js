import React, { Component } from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';
import Login from './Login';

class Inventory extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
  };

  state = {
    uid: null,
    owner: null
  }

  componentDidMount() {
    // Check if somebody is logged in after refreshing the page
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.authHandler({ user });
      }
    })
  }

  authHandler = async (authData) => {
    const store = await base.fetch(this.props.storeId, { context: this })

    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }

    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })

  }

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  }

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  }

  render() { 
    const logout = <button onClick={this.logout}>Log Out</button>

    // 1. Check if they are logged in
    if(!this.state.uid){
      return <Login authenticate={this.authenticate}/>
    } 

    // 2. Check if they are the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner</p>
          {logout}
        </div>
      );
    }

    // 3. If they are the owner
    return ( 
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
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