import React, { Component } from 'react';
import './RestaurantItems.css';
import axios from "axios";
import uuid from 'react-uuid'

class RestaurantItems extends Component {   
    constructor(props) {
        super(props);
        this.state = {
          success: false,
          error: false,
          errorMessage: "",
          display: false,
          items: [],
          orderitems: ""
        };
        this.handleOrderSubmit = this.handleOrderSubmit.bind(this);  
        this.handleAddToCart = this.handleAddToCart.bind(this);        
    }
    handleOrderSubmit(event) { 
        event.preventDefault();
        this.postorder();
    }
    handleAddToCart(id) {
        
        var prevOrderItems = this.state.orderitems
        prevOrderItems = prevOrderItems + id + ","
        this.setState({orderitems: prevOrderItems})
        console.log(prevOrderItems)
    }
    
    postorder = async() => {
        var id = uuid()        
        await axios
          .post("https://node-app-o3vfgoc4iq-uc.a.run.app/postorder", {orderitems:this.state.orderitems, id: id})
          .then((res) => {            
            axios.get("https://python2-o3vfgoc4iq-uc.a.run.app/createVisualization")
                .then((res) => {            
                    alert("Order placed successfully. Order id: " + id);
                })
                .catch((err) => {this.setState({ error: true,errorMessage:"There is some issue in placing order!",});});
            })
          .catch((err) => {this.setState({ error: true,errorMessage:"There is some issue in placing order!",});});

        this.setState({orderitems: ""})
    };  
    
    displayItems = async() => {  
        await axios
          .get("https://w6ll03bji9.execute-api.us-east-1.amazonaws.com/test?id=" + this.props.match.params.id)
          .then((res) => {     
            console.log(res.data)       
            this.setState({items: res.data});
          })
          .catch((err) => {this.setState({ error: true,errorMessage:"There is some issue in placing order!",});});
    };

    componentDidMount() {
        this.displayItems();
    }
    render() {
        // console.log(this.props.currentUser);
        // console.log(localStorage.getItem('firstName'));
        
        return (
                <div className="container bg-white pb-80">
                    <h2 className="display-5 text-center mb-2 mt-5"><span className="text-pink">Please select an item and place order</span></h2>
                    <div className="row mb-80">
                    <div className="col-md-10 mb-5 pl-5 pr-6">
                            <form className="form-signin" onSubmit={this.handleOrderSubmit}>
                                <button type="submit" class="mt-2 items btn btn-primary">Place order</button>
                            </form>                            
                        </div>  
                        <div className="col-md-10 mb-5 pl-5 pr-6">
                            <div className="accordion" id="servicesAcc">
                            {this.state.items.map((item)=>(
                                <div className="card">
                                    <div className="card-header" id="head1">
                                        <button className="btn btn-link btn-acc" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <i className="fas fa-map-marked mr-3"></i> {item.name}</button>
                                    </div>
                                    <div class="ml-3 mr-3"><p>{item.description}</p></div>
                                    <div id="collapseOne" className="collapse show" aria-labelledby="head1" data-parent="#servicesAcc">
                                        <div className="card-body">
                                     
                                            <div class="items">
                                               <div>
                                                    <button type="button" onClick={()=>this.handleAddToCart(item.name)} class="mt-2 items btn btn-warning btn-lg btn-block">Add to cart</button>
                                                        
                                                </div>                                          
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                 ))}
                                
                            </div>
                        </div>
                        
                    </div>
                                
                </div>
        );
    }
}

export default RestaurantItems;