import React, { Component } from 'react';
import axios from "axios";
import uuid from 'react-uuid'

class OrderSearch extends Component {   
    constructor(props) {
        super(props);
        this.state = {
          items: [],
          searchText: "",
          orderreview: ""
        };
        this.txtsearchHandler = this.txtsearchHandler.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.txtreviewHandler = this.txtreviewHandler.bind(this);
        this.handleReviewSubmit = this.handleReviewSubmit.bind(this);  
    }
    handleSearchSubmit(event) { 
        event.preventDefault();
        this.searchOrder();
    }
    handleReviewSubmit(event) { 
        event.preventDefault();
        this.postreview();
    }
    
    txtsearchHandler = event => {
        this.setState({searchText: event.target.value})
    }
    txtreviewHandler = event => {
        this.setState({orderreview: event.target.value})
    }
      
    postreview = async() => {
        await axios
          .post("https://node-app-o3vfgoc4iq-uc.a.run.app/postratings", {ratings:this.state.orderreview})
          .then((res) => {            
             axios
                .get("https://python2-o3vfgoc4iq-uc.a.run.app/createReactWordCloud")
                .then((res) => {            
                    
                    alert("Review posted successfully.");
                })
                .catch((err) => {this.setState({ error: true,errorMessage:"There is some issue in placing order!",});});            
          })
          .catch((err) => {this.setState({ error: true,errorMessage:"There is some issue in placing order!",});});
    };
    searchOrder = async() => {  
        await axios
          .get("https://auf9iujmjd.execute-api.us-east-1.amazonaws.com/test?id=" + this.state.searchText)
          .then((res) => {     
            console.log(res.data)       
            this.setState({items: res.data});
          })
          .catch((err) => {this.setState({ error: true,errorMessage:"There is some issue in placing order!",});});
    };

    render() {
        
        return (
                <div className="container bg-white pb-80">
                    <h2 className="display-5 text-center mb-2 mt-5"><span className="text-pink">Orders</span></h2>
                    <div className="row mb-80">
                    
                        <div className="col-md-10 mb-5 pl-5 pr-6">
                            <div className="accordion" id="servicesAcc">
                            <div><h4>Order details</h4></div>
                            <div>
                                <h6>Search order using order ID:</h6>
                                <form className="form-signin" onSubmit={this.handleSearchSubmit}>                            
                                    <input type="text" onChange={this.txtsearchHandler} class="mt-2 form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"></input>
                                    <button type="Submit" class="mt-2 items btn btn-primary">Search</button>
                                </form>
                            </div>
                            {this.state.items.map((item)=>(
                                <div>                                    
                                    <h5>Items</h5>
                                    <p>{item.items}</p>
                                    <h5>Status</h5>
                                    <p>{item.status}</p>
                                    
                                </div>
                                
                            ))}
                                
                            </div>
                        </div>
                        {/* {if (this.state.items[0]['status'] == "Dispatched"):} */}
                        <div className="col-md-10 mb-5 pl-5 pr-6">
                            <form className="form-signin" onSubmit={this.handleReviewSubmit}>                            
                                <div><input type="text" onChange={this.txtreviewHandler} class="mt-2 form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"></input></div>
                                <div><button type="Submit" class="mt-2 items btn btn-primary">Add Review</button></div>
                            </form>
                        </div>  
                    </div>
                                
                </div>
        );
    }
}

export default OrderSearch;