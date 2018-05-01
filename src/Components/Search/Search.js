import React, { Component } from "react";
import Suggestions from "components/Suggestions";

// https://dev.to/sage911/how-to-write-a-search-component-with-suggestions-in-react-d20

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      results: []
    };
  }

  handleInputChange = () => {
    this.setState({ query: this.search.value }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo();
        }
      } else if (!this.state.query) {
        // TODO: show suggestions once implemented
      }
    });
  };

  render() {
    return (
      <div>
        <input
          placeholder="Search for..."
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
        />
        <Suggestions results={this.state.results} />
      </div>
    );
  }
}

export default Search;
