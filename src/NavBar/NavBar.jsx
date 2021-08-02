import axios from 'axios';
import { NavLink } from 'react-router-dom';
import React, { Component, useEffect } from 'react';
import './NavBar.css';

class NavBar extends Component {

  constructor(props) {
      super(props);
      this.state = {
        currentUser: localStorage.getItem('loggedInuser')
    }

    this.handlechatclick = this.handlechatclick.bind(this);  
    this.handleonlinesuppclick = this.handleonlinesuppclick.bind(this);  
  }
  handlechatclick(event) { 
      
      window.location.href = "https://front-ion5wdstsq-uc.a.run.app/user";
      
  }
  handleonlinesuppclick(event) { 
      
    window.location.href = "https://chatbot-o3vfgoc4iq-uc.a.run.app";
  }
  componentDidMount = () =>{
    console.log("logged in user" + localStorage.getItem('loggedInuser'));
  }

  componentWillReceiveProps = (props) => {
    console.log(props);
  }


  navLinks = () => {
    
    if (localStorage.getItem('loggedInuser') !="" || localStorage.getItem('loggedInuser') != null){
      return (
        <ul className="navbar-nav mr-auto main-nav">
          <li className="nav-item">
            <NavLink className="nav-link active" to={"/Home"}>Home</NavLink>
          </li>
          <li className="nav-item">
          <NavLink className="nav-link active" onClick={()=>this.handlechatclick()} to={"/Chat"}>Chat</NavLink>
          </li>
          <li className="nav-item">
          <NavLink className="nav-link active" onClick={()=>this.handleonlinesuppclick()} to={"/onlinesupport"}>Online Support</NavLink>
          </li>
          <li className="nav-item">
          <NavLink className="nav-link active" to={"/DataProcessing"}>Data Processing</NavLink>
          </li>
          <li className="nav-item ">
          <NavLink className="nav-link active" to={"/MachineLearning"}>Machine Learning</NavLink>
          </li>
        </ul>
      )
    }else{return (<div></div>)}
  }

  logoutHandler = () => {
    localStorage.clear();
    this.setState({currentUser:""});
    localStorage.setItem('loggedInuser', "");
    localStorage.setItem('isRestOwner', "false");
    window.location.href = "https://node-app-o3vfgoc4iq-uc.a.run.app/Home";
  }

  welcomeMessage = () => {
    if (this.state.currentUser) {
      return (
        <li className="nav-item ">
          <NavLink className="text-light" to="/profile/edit"
            style={{ fontFamily: 'Verdana' }}>Welcome, {this.state.currentUser}</NavLink>
        </li>
      );  
    }
  }

  dropdownNavLinks = () => {

    if (localStorage.getItem('loggedInuser') !="" && localStorage.getItem('loggedInuser') != null) {

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
          <NavLink className="navbar-brand" to="/"><span><b>Halifax Foodie</b></span></NavLink>

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