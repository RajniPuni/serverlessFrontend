import './App.css';


import ProfileTemplate from './ProfileTemplate/ProfileTemplate';
import EditProfile from './EditProfile/EditProfile';
import NavBar from './NavBar/NavBar';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home/Home';
import Chat from './Chat/Chat';
import OnlineSupport from './OnlineSupport/OnlineSupport';
import DataProcessing from './DataProcessing/DataProcessing';
import RestaurantItems from './RestaurantItems/RestaurantItems';
import OrderSearch from './OrderSearch/OrderSearch';
import UpdateOrder from './UpdateOrder/UpdateOrder';
import MachineLearning from './MachineLearning/MachineLearning';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


class App extends Component {
  state = {
    currentUser: undefined
  };

  componentDidMount = () => {
    axios.get('user').then(
      res => {        
        this.setCurrentUser(res.data);
      },
      error => {        
        console.log(error);
      }
    );
  };

  setCurrentUser = (currentUser) => {
    
    this.setState({
      currentUser: currentUser
    });
  };

  render() {
    return (

      <div className="App">
        <BrowserRouter>
          <NavBar currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser}/>
          <Route path="/chat" exact component={Chat} />
            <Route path="/home" exact component={Home} />
            <Route path="/OnlineSupport" exact component={OnlineSupport} />
            <Route path="/DataProcessing" exact component={DataProcessing} />
            <Route path="/OrderSearch" exact component={OrderSearch} />
            <Route path="/MachineLearning" exact component={MachineLearning} />
            <Route path="/RestaurantItems/:id" exact component={RestaurantItems} />
            <Route path="/UpdateOrder" exact component={UpdateOrder} />
            <Route path="/profile/login" exact component={() => <ProfileTemplate setCurrentUser={this.setCurrentUser}/>} />
            <Route path="/profile/register" exact component={ProfileTemplate} />
            <Route path="/profile/edit" exact component={() => <EditProfile currentUser={this.state.currentUser} />} />
            {/* <br /> */}
            <Route path="/" exact component={() => <Home currentUser={this.state.currentUser} />} />
            
        </BrowserRouter>
      </div>

    );
  }
}

export default App;