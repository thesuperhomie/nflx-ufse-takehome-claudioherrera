import React, { Component } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

class SearchBar extends Component {
  state = {
    searchTerm: "",
    searchOpen: false,
    searchOptions: [],
  };

  handleVisibilityChange = (searchOpen) => {
    this.setState({ searchOpen });
  };

  handleSearchChange = (evt) => {
    this.setState({ searchTerm: evt.target.value });
  };

  handleSearch = () => {
    if (this.state.searchTerm.length !== 0) {
      this.props.handleSearchUpdate(this.state.searchTerm);
    }
  };

  render() {
    return (
      <div className="search-container">
        <TextField label="Search for businesses!" variant="outlined" onChange={this.handleSearchChange} sx={{ width: 500 }} />
        <Button variant="outlined" disabled={this.props.loading} onClick={this.handleSearch}>
          Go!
        </Button>
      </div>
    );
  }
}

export default SearchBar;
