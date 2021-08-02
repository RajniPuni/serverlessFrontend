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

    showVisualization = () => {
        if (localStorage.getItem('isRestOwner') == "true") {
            return (
                <div>
                    <h2 className="display-4 text-center mb-2">Most ordered <span className="text-pink">items</span></h2>
                    <div className="row">
                        <div className="pl-80">
                        <iframe width="600" height="450" src="https://datastudio.google.com/embed/reporting/c7c10cb2-29bf-41f2-90b7-931240727e02/page/FgcWC" frameborder="0" allowfullscreen></iframe>
                        </div>
                        
                    </div>
                </div>
            );
        }
    }
    render() {
        console.log(this.props.currentUser);
        console.log(localStorage.getItem('firstName'));
        if (localStorage.getItem('loggedInuser') !="" && localStorage.getItem('loggedInuser') != null){
        return (
            <div>
                <div className="container bg-white pb-80">
                    
                    {/* Header Row */}
                    <div className="mt-5"></div>
                    {/* What We Do Row */}
                    <h2 className="display-4 text-center pt-70">What We <span className="text-pink">Provide</span></h2>
                    <div className="row mb-4">
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
                    {
                        this.showVisualization()
                    }
                    
                </div>
            </div>
        );
        }
        else{return (<div></div>)}
    }
}

export default Home;