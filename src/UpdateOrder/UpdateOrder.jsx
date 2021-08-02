import React, { Component } from 'react';
import axios from "axios";
import uuid from 'react-uuid'

class UpdateOrder extends Component {   
    constructor(props) {
        super(props);
        this.state = {
          items: [],
          status: "",
          orderid: ""
        };
        this.txtstatusHandler = this.txtstatusHandler.bind(this);
        this.txtorderidHandler = this.txtorderidHandler.bind(this);
        this.handleUpdateOrderSubmit = this.handleUpdateOrderSubmit.bind(this);  
    }
    handleUpdateOrderSubmit(event) { 
        event.preventDefault();
        this.updateOrder();
    }
    
    txtstatusHandler = event => {
        this.setState({status: event.target.value})
    }
    txtorderidHandler = event => {
        this.setState({orderid: event.target.value})
    }
      
    updateOrder = async() => {
        console.log(this.state.orderid)
        console.log(this.state.status)
        await axios
          .put("https://node-app-o3vfgoc4iq-uc.a.run.app/updateorder", {id:this.state.orderid, status: this.state.status})
          .then((res) => {            
            alert("Order status updated successfully.");
          })
          .catch((err) => {console.log(err)});
    };

    render() {     
        if(localStorage.getItem('isRestOwner')=="true"){
        return (
        <div className="container bg-white pb-80">
            <h2 className="display-5 text-center mb-2 mt-5"><span className="text-pink">Orders</span></h2>
            <div className="row mb-80">                    
                <div className="col-md-10 mb-5 pl-5 pr-6">
                    <div className="accordion" id="servicesAcc">
                        <div><h4>Update Order Status</h4></div>
                        <div>
                            <h6>Add order details:</h6>
                            <form className="form-signin" onSubmit={this.handleUpdateOrderSubmit}>                            
                                <h6>OrderID:</h6>
                                <input type="text" onChange={this.txtorderidHandler} class="mt-2 form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"></input>
                                <h6>Order Status:</h6>
                                <input type="text" onChange={this.txtstatusHandler} class="mt-2 form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"></input>
                                <button type="Submit" class="mt-2 items btn btn-primary">Update</button>
                            </form>
                        </div>
                    </div>
                </div>                       
            </div>                                
        </div>
        );
        }
        else{
            return(<div><span>This feature is only accessible to the restaurant owner</span></div>)
        }
    }
}

export default UpdateOrder;