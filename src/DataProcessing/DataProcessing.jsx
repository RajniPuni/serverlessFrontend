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
      return (
        <div className="container">                
          <div className="form-group col-12">
              <h2>Data Processing:</h2>                        
          </div>
          <div>
          <iframe width="600" height="450" src="https://datastudio.google.com/embed/reporting/35bbea1a-5ec1-4f2c-96f7-6c43a77da95f/page/toOWC" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
      );
    }
}

export default DataProcessing;
