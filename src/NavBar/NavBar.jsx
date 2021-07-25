/*
* Authors: 
    - Sriram, Ponangi
    - Jay, Gajjar
*/

import axios from 'axios';
import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import './NavBar.css';

class NavBar extends Component {

  state = {
    groups:[
      {
        _id: "",
        name: ""
      }
    ]
  }
  componentDidMount = () =>{
    // axios.get('user/groups').then(result => {
    //   this.setState({
    //     groups:result.data.groups
    //   })
    // });
  }

  componentWillReceiveProps = (props) => {
    console.log(props);
  }

  navLinks = () => {
    
    
      return (
        <ul className="navbar-nav mr-auto main-nav">
          <li className="nav-item">
            <NavLink className="nav-link active" to={"/Home"}>Home</NavLink>
          </li>
          <li className="nav-item">
          <NavLink className="nav-link active" to={"/Chat"}>Chat</NavLink>
          </li>
          <li className="nav-item">
          <NavLink className="nav-link active" to={"/onlinesupport"}>Online Support</NavLink>
          </li>
          <li className="nav-item">
          <NavLink className="nav-link active" to={"/DataProcessing"}>Data Processing</NavLink>
          </li>
          <li className="nav-item ">
          <NavLink className="nav-link active" to={"/MachineLearning"}>Machine Learning</NavLink>
          </li>
        </ul>
      )
    
  }

  logoutHandler = () => {
    localStorage.clear();
    this.props.setCurrentUser(null);
  }

  welcomeMessage = () => {
    if (this.props.currentUser && this.props.currentUser.firstName) {
      return (
        <li className="nav-item ">
          <NavLink className="text-light" to="/profile/edit"
            style={{ fontFamily: 'Verdana' }}>Welcome, {this.props.currentUser.firstName}</NavLink>
        </li>
      );

    }
  }

  dropdownNavLinks = () => {

    if (this.props.currentUser) {

      return (
        <div className="dropdown-menu dropdown-menu-right">
          <NavLink className="dropdown-item" to="/profile/edit">Update Profile</NavLink>
          <NavLink className="dropdown-item" to="/" onClick={this.logoutHandler}>Logout</NavLink>
        </div>
      )
    }
    else {
      return (
        <div className="dropdown-menu dropdown-menu-right">
          <NavLink className="dropdown-item" to="/profile/login">Login</NavLink>
          <NavLink className="dropdown-item" to="/profile/register">Register</NavLink>
        </div>
      )
    }
  }

  render() {
    return (
      <div>

        <nav className="navbar sticky-top navbar-expand-lg navbar-dark" style={{ background: 'grey' }}>
          <NavLink className="navbar-brand" to="/"><span><b>DALLMSServerless</b></span></NavLink>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {
              this.navLinks()
            }
            <ul className="nav navbar-nav">
              {
                this.welcomeMessage()
              }
            </ul>
            <ul className="nav navbar-nav user-settings">

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink"
                  role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fa fa-user-cog"></i>
                </a>
                {
                  this.dropdownNavLinks()
                }
              </li>
            </ul>

          </div>
        </nav>


      </div>
    );
  }


}

export default NavBar;