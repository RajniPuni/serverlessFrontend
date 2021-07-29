import axios from 'axios';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';

class MachineLearning extends Component {
    constructor(props) {
        super(props);
        this.state = {
          restaurants: []
        };
    }
    recipeInfo = {
        restaurantid:"",
        name: "",
        description: "",
        ingredients:"",
        tag: ""
    };
     
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

    recipeHandler = (event) => {
        // alert("submit");
        event.preventDefault();
             
        
               
    }

    getTagsHandler = async (event) => {
        alert("tag");
        // this.recipeInfo.tag = "test tag"
        
        // console.log(this.recipeInfo);        
        
        await axios.get('https://us-central1-serverless-316507.cloudfunctions.net/mlfunction?name=' + this.recipeInfo.description)
            .then(res => {
                console.log("msg" + res.data.msg.label)
                this.recipeInfo.tag = res.data.msg.label
                console.log(this.recipeInfo);   
                axios.post('https://node-app-o3vfgoc4iq-uc.a.run.app/addrecipe/', this.recipeInfo)
                    .then(res => {
                        alert("Recipe saved successfully and is tagged as " + this.recipeInfo.tag)
                        Console.log(res)                
                    })
                    .catch(error => {
                        console.log(error.body);
                    })                   
            })
            .catch(error => {
                console.log(error);
            })           
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.recipeHandler}>
                    <div className="form-group col-12">
                        <h2>Add a recipe:</h2>
                    </div>
                    <div className="form-group col-12">
                        <select name="secques" id="secques" className="form-control" onChange={event => this.recipeInfo.restaurantid = event.target.value}>
                            <option value="0">--Select--</option>
                            {this.state.restaurants.map((item)=>(
                                <option value={item.id}>{item.name}</option>
                            ))}
                        </select>
                        
                    </div>
                    <div className="form-group col-12">
                        <input type="text" className="form-control" id="name" placeholder="Recipe Name" 
                            onChange={event => this.recipeInfo.name = event.target.value} />
                    </div>
                    <div className="form-group col-12">
                        <input type="text" className="form-control" id="ingredients" placeholder="Ingredients" 
                            onChange={event => this.recipeInfo.ingredients = event.target.value} />
                    </div>
                    <div className="form-group col-12">
                    <input type="text" className="form-control" id="desc" placeholder="Recipe Description" 
                            onChange={event => this.recipeInfo.description = event.target.value} />
                    </div>
                    <div className="form-check col-12">
                        <button onClick={this.getTagsHandler} className="btn  mr-3 text-light btn-block" style={{ background: 'black' }}>
                          Get tag and submit
                        </button>
                    </div>
                    <div className="form-check col-12">
                        {/* <button type="submit" className="btn  mr-3 text-light btn-block" style={{ background: 'black' }}>
                            Submit
                        </button> */}
                    </div>
                </form>
            </div>
        );
    }
}

export default MachineLearning;
