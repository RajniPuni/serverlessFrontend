/*
* Authors: 
    - Sriram, Ponangi
    - Jay, Gajjar (UI)
*/
// import logo from '../logo.png';
import './Chat.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';

class Chat extends Component {

    state = {
        loggedIn: false,
        errorMessage: ""
       
    };

    userLoginInfo = {
        email: "",
        password: ""
    };

    loginHandler = (event) => {
        event.preventDefault();
        this.setState({
            errorMessage: ""                    
        });
        
        console.log(this.userLoginInfo);

        axios.post('auth/login', this.userLoginInfo)
            .then(res => {
                localStorage.setItem('jwt', res.data.jwt);
                this.setState({
                    loggedIn: true
                });

                let myHeaderConfig = {
                    headers: {
                        'Authorization': 'Bearer '+  res.data.jwt
                      }
                }
                axios.get('user', myHeaderConfig).then(
                    res => {
                        localStorage.setItem('firstName', res.data.firstName);
                        localStorage.setItem('lastName', res.data.lastName);
                        localStorage.setItem('role', res.data.role);
                        localStorage.setItem('email', res.data.email);
                        this.props.setCurrentUser(res.data);
                    },
                    error => {                        
                        console.log(error);
                        this.setState({
                            errorMessage: "Sorry, something went wrong on our side. Please try again later."                    
                        });
                    }
                );

            })
            .catch(error => {
                console.log(error.body);
                this.setState({
                    errorMessage: "Invalid Credentials!"                    
                });
            })
            
    }

    showMessage = () => {
        if (this.state.errorMessage) {
            return (
                <div className="alert alert-danger" role="alert">
                    {this.state.errorMessage}
                </div>
            );        
        } else {
            return (<div></div>);
        }

    }

    render() {
        if (this.state.loggedIn) {            
            return (
                <Redirect to={"/"} />
            );
        }
        return (
            <div className="container">
                <form onSubmit={this.loginHandler}>
                    <div className="form-group col-12">
                        <h2>Chat:</h2>
                    </div>
                    {
                        this.showMessage()
                    }
                    <div className="form-group col-12">
                        <input type="email" className="form-control" id="loginInputEmail"
                            aria-describedby="emailHelp" placeholder="" required={true}
                            onChange={event => this.userLoginInfo.email = event.target.value} />
                    </div>
                    <div className="form-check col-12">
                        <button type="submit" className="btn  mr-3 text-light btn-block" style={{ background: 'black' }}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>







        );
    }
}



export default Chat;
