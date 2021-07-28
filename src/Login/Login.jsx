import './Login.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';

class Login extends Component {

    state = {
        loggedIn: false,
        errorMessage: ""       
    };

    userLoginInfo = {
        email: "",
        password: "",
        secquestion: "",
        secAnswer: "",
        uid: ""
    };

    loginHandler = (event) => {
        event.preventDefault();
        this.setState({
            errorMessage: ""                    
        });        
        console.log(this.userLoginInfo);        
        
        axios.get('https://us-central1-sapp3-b1ed6.cloudfunctions.net/app/findUser/' + this.userLoginInfo.email)
            .then(res => {
                console.log("finduser " + res.data.uid)
                this.userLoginInfo.uid = res.data.uid;
                axios.get('https://us-central1-sapp3-b1ed6.cloudfunctions.net/app/getUserDetails/'+res.data.uid + '/' + this.loginHandler.password).then(
                    res => {
                        console.log("getUserDetails " + res.data)
                        axios.post('https://node-app-o3vfgoc4iq-uc.a.run.app/postSecurityQues', {
                            userId: this.userLoginInfo.uid, 
                            questionId: "1",
                            question: this.userLoginInfo.secquestion, 
                            answer: this.userLoginInfo.secAnswer,isRegister: false}).then(
                            res => {
                                console.log("postSecurityQues " + res.data)
                                localStorage.setItem('loggedInuser', this.userLoginInfo.email);
                                localStorage.setItem('isRestOwner', this.userLoginInfo.email);
                                // window.location.href = "http://localhost:3000/Home";
                            },
                            error => {                        
                                console.log(error);
                                this.setState({
                                    errorMessage: "Sorry, something went wrong on our side. Please try again later."                    
                                });
                            }
                        );
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
                console.log(error);
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
                        <h2>Login:</h2>
                    </div>
                    {
                        this.showMessage()
                    }
                    <div className="form-group col-12">
                        <input type="email" className="form-control" id="loginInputEmail"
                            aria-describedby="emailHelp" placeholder="Email" required={true}
                            onChange={event => this.userLoginInfo.email = event.target.value} />
                    </div>
                    <div className="form-group col-12">
                        <input type="password" className="form-control"
                            id="loginInputPassword" placeholder="Password" required={true}
                            onChange={event => this.userLoginInfo.password = event.target.value} />
                    </div>
                    <div className="form-group col-12">                        
                            <span><b>Select a security question</b></span>
                            <select name="secques" id="secques" onChange={event => this.userLoginInfo.secquestion = event.target.value}>
                                <option value="0">--Select--</option>
                                <option value="1">What is your birth city?</option>
                                <option value="2">What is your favourite pet?</option>
                                <option value="3">What is your cousin name?</option>
                                <option value="4">Which is your favourite car?</option>
                            </select>
                    </div>                    
                    <div className="form-group col-12">
                        <span><b>Answer</b></span>
                        <input type="text" className="form-control" id="loginInputAnswer" 
                            onChange={event => this.userLoginInfo.secAnswer = event.target.value} />                            
                    </div>

                    <div className="form-check col-12">
                        <button type="submit" className="btn  mr-3 text-light btn-block" style={{ background: 'black' }}>
                            Login
                        </button>
                    </div>
                </form>
            </div>







        );
    }
}



export default Login;
