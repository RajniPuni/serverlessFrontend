import React, { Component } from 'react';

class DataProcessing extends Component {
    constructor(props) {
        super(props);
        this.state = {
          success: false,
          error: false,
          errorMessage: "",
          display: false,
          words: "",
        };
    }

    componentDidMount() {
    }

    // componentWillMount() {
    //     console.log("helloooo")
    //     this.displayWordCloud();
    // }

    render() {
      if(localStorage.getItem('isRestOwner')=="true"){
      return (
        <div className="container">                
          <div className="form-group col-12">
              <h2>Data Processing:</h2>                        
          </div>
          <div>
          <iframe width="600" height="450" src="https://datastudio.google.com/embed/reporting/d3090459-f329-4637-8b32-b697e36ac6a2/page/ZbcWC" frameborder="0" allowfullscreen></iframe>
          
          </div>
        </div>
      );
      }
      else{
        return(<div><span><span >This feature is only accessible to the restaurant owner</span></span></div>)
    }
    }
}

export default DataProcessing;
