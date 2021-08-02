import './Register.css';
import axios from 'axios';
import React, { Component } from 'react';

class Register extends Component {
    state = {
        errorMessage: "",
        successMessage: ""
    }
    userRegistrationInfo = {
        userName: "",
        email: "",
        password: "",
        isRestOwner: "",
        owner: false,
        secquestion: "",
        secAnswer: "",
        uid:""
    }

    registerHandler = (event) => {
        event.preventDefault();
        this.setState({
            errorMessage: "",
            successMessage: ""                    
        });
        if (this.userRegistrationInfo.isRestOwner == "on"){
            this.userRegistrationInfo.owner = true;
            localStorage.setItem('isRestOwner', "true");
        }
        else{
            localStorage.setItem('isRestOwner', "false");
        }

        console.log(this.userRegistrationInfo);
        this.setState({
            successMessage: "Registration successful"                    
        });
        // axios.post('https://node-app-o3vfgoc4iq-uc.a.run.app/createUser', {email: this.userRegistrationInfo.email, 
        //         password: this.userRegistrationInfo.password})
        //     .then(res => {
        //         console.log("createuser " + res.data.uid)
        //         this.userRegistrationInfo.uid = res.data.uid;
        //         if(this.userRegistrationInfo.uid != ""){
        //             axios.post('https://node-app-o3vfgoc4iq-uc.a.run.app/postUserDetails', {id: this.userRegistrationInfo.uid, 
        //                     email: this.userRegistrationInfo.email, password: this.userRegistrationInfo.password, 
        //                     name: this.userRegistrationInfo.userName, isRestaurantOwner: this.userRegistrationInfo.owner})
        //                     .then(res => {
        //                         console.log("postuserdetails  " + res)

        //                         axios.post('https://node-app-o3vfgoc4iq-uc.a.run.app/postSecurityQues', {
        //                             userId: this.userRegistrationInfo.uid, 
        //                             questionId: "1",
        //                             question: this.userRegistrationInfo.secquestion, 
        //                             answer: this.userRegistrationInfo.secAnswer,isRegister: true})
        //                             .then(res => {
        //                                 console.log("postsecurityques " + res.data);
        //                                 this.setState({
        //                                     successMessage: "Registration successful"                    
        //                                 });
        //                                 // window.location.href = "http://localhost:3001/login";
        //                             },
        //                             error => {                        
        //                                 console.log(error);
        //                                 this.setState({
        //                                     errorMessage: "Sorry, something went wrong on our side. Please try again later."                    
        //                                 });
        //                             }
        //                         );
        //                 },
        //                 error => {                        
        //                     console.log(error);
        //                     this.setState({
        //                         errorMessage: "Sorry, something went wrong on our side. Please try again later."                    
        //                     });
        //                 }
        //             );
        //         }
        //         this.setState({ successMessage: "Account Created Successfully." });

        //     }).catch(error => {
        //         console.log(JSON.stringify(error.response));
        //         this.setState({ errorMessage: "Sorry. There was some error,"+
        //         " could not register your account. Please try again later.",
        //         successMessage:""});
        //     })

    }
    showMessage = () => {
        if (this.state.errorMessage) {
            return (
                <div className="alert alert-danger" role="alert">
                    {this.state.errorMessage}
                </div>
            );
        } else if (this.state.successMessage) {
            return (
                <div className="alert alert-success" role="alert">
                    {this.state.successMessage}
                </div>
            );
        } else {
            return (<div></div>);
        }

    }
   
    render() {
        return (

            <div className="container">


                <form onSubmit={this.registerHandler}>
                    <div className="form-group col-12">
                        <h2>Registration:</h2>
                    </div>
                    {
                        this.showMessage()
                    }
                    <div className="form-group col-12">
                        <input type="text" className="form-control" placeholder="Username"
                        onChange={event => this.userRegistrationInfo.userName = event.target.value} ></input>
                    
                    </div>
                    <div className="form-group col-12">
                        <input type="email" className="form-control" id="loginInputEmail"
                            aria-describedby="emailHelp" placeholder="Email" required={true}
                            onChange={event => this.userRegistrationInfo.email = event.target.value} />
                    </div>

                    <div className="form-group col-12">
                        <input type="password" className="form-control"
                            id="loginInputPassword" placeholder="Password" required={true}
                            onChange={event => this.userRegistrationInfo.password = event.target.value} />
                    </div>
                    <div className="form-group col-12">                        
                            <span><b>Select a security question</b></span>
                            <select name="secques" id="secques" className="form-control" 
                            onChange={event => this.userRegistrationInfo.secquestion = event.target.value}>
                                <option value="0">--Select--</option>
                                <option value="What is your birth city?">What is your birth city?</option>
                                <option value="What is your favourite pet?">What is your favourite pet?</option>
                                <option value="What is your cousin name?">What is your cousin name?</option>
                                <option value="Which is your favourite car?">Which is your favourite car?</option>
                            </select>
                    </div>
                    
                    <div className="form-group col-12">
                        <span><b>Answer</b></span>
                        <input type="text" className="form-control"
                            id="loginInputAnswer" 
                            onChange={event => this.userRegistrationInfo.secAnswer = event.target.value} />
                            
                    </div>
                    <div className="form-group col-12">                        
                            <span><b>Select a restaurant</b></span>
                            <select name="secques" id="secques" className="form-control" 
                            onChange={event => this.userRegistrationInfo.secquestion = event.target.value}>
                                <option value="0">--Select--</option>
                                <option value="Mexican cuisine">Mexican cuisine</option>
                                <option value="Thai cuisine">Thai cuisine</option>
                                <option value="Indian cuisine">Indian cuisine</option>
                            </select>
                    </div>
                    <div className="form-group col-12">
                        <input type="checkbox" className="form-control"
                            id="loginInputrestOwner"  style={{width:"fit-content"}}
                            onChange={event => this.userRegistrationInfo.isRestOwner = event.target.value} />
                            <span style={{width:"fit-content"}}>Restaurant owner?</span>
                    </div>

                    <div className="form-check col-12">
                        <button type="submit" className="btn text-light mr-3 btn-block" style={{ background: 'black' }}>Register</button>
                    </div>

                </form>

            </div>
        );
    }
}

export default Register;

