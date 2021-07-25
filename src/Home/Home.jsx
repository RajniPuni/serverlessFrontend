import React, { Component } from 'react';
import './Home.css';
import axios from "axios";

class Home extends Component {   
    constructor(props) {
        super(props);
        this.state = {
          success: false,
          error: false,
          errorMessage: "",
          display: false,
          restaurants: [],
        };
    }
    // btnClick = (e) => {
    //     e.preventDefault();    
    //     this.displayItems();
    // };
    
    displayItems = async() => {        
        await axios
          .get("https://a1xkyltc1j.execute-api.us-east-1.amazonaws.com/test")
          .then((res) => {     
            console.log(res.data)       
            this.setState({restaurants: res.data});
          })
          .catch((err) => {this.setState({ error: true,errorMessage:"There is some issue in getting items!",});});
    };

    componentWillMount() {
        console.log("helloooo")
        this.displayItems();
    }
    render() {
        console.log(this.props.currentUser);
        console.log(localStorage.getItem('firstName'));
        
        return (
            <div>
                <div className="container bg-white pb-80">
                    
                    {/* Header Row */}
                    <div className="row hero mb-80" style={{ backgroundImage: "url(img/home-polaroid.jpg)" }}>
                        <div className="col-md-3"></div>
                        <div className="col-md-6 p-5 hero-content">
                            <h1 className="display-3"><span className="text-primary">Take A Break!</span></h1>
                            <h5 className="font-weight-light"><span className="text-success">Enjoy food delivery and various other services using this application.</span></h5>
                        </div>
                        <div className="col-md-3"></div>
                    </div>

                    {/* What We Do Row */}
                    <h2 className="display-4 text-center mb-80">What We <span className="text-pink">Provide</span></h2>
                    <div className="row mb-80">
                        <div className="col-md-6 mb-3">
                            <img className="img-fluid rounded" src={"/img/travel-agency.jpg"} alt=""/>
                        </div>
                        <div className="col-md-6 mb-3 pl-5 pr-5">
                            <div className="accordion" id="servicesAcc">
                                <div className="card">
                                    <div className="card-header" id="head1">
                                        <button className="btn btn-link btn-acc" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"><i className="fas fa-map-marked mr-3"></i> Explore Restaurants</button>
                                    </div>
                                    <div id="collapseOne" className="collapse show" aria-labelledby="head1" data-parent="#servicesAcc">
                                        <div className="card-body">
                                            Browse through restaurants in your region
                                            <div class="items">
                                            {this.state.restaurants.map((item)=>(
                                               <div> <a href={"/RestaurantItems/" + item.id} >{item.name}</a></div>
                                            ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="head2">
                                        <button className="btn btn-link btn-acc" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo"><i className="fas fa-user-plus mr-3"></i> Orders</button>
                                    </div>
                                    <div id="collapseTwo" className="collapse" aria-labelledby="head2" data-parent="#servicesAcc">
                                        <div className="card-body">
                                            <div><a href="/OrderSearch">Find all Orders here</a></div>
                                            <div><a href="/UpdateOrder">Update order status here</a></div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                   
                    
                </div>
            </div>
        );
    }
}

export default Home;