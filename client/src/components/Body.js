import React, { Component } from "react";
import BusinessListView from "./BusinessListView";
import SearchBar from "./SearchBar";
import { callAutocompleteApi } from "../api";

class Body extends Component {
  state = {
    businesses: [],
    loading: false,
  };

  handleSearchUpdate = async (text) => {
    this.setState({ loading: true });
    try {
      const { data } = await callAutocompleteApi(text);
      this.setState({ loading: false, businesses: data || [] });
    } catch (error) {
      this.setState({ loading: false, businesses: [] });
    }
  };

  render() {
    return (
      <>
        <SearchBar handleSearchUpdate={this.handleSearchUpdate} loading={this.state.loading} />
        <BusinessListView
          businesses={this.state.businesses.length !== 0 ? this.state.businesses : this.props.initialBusinesses}
          loading={this.state.loading}
        />
      </>
    );
  }
}

export default Body;
