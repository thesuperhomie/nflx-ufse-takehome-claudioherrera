import React, { Component } from "react";
import Body from "./components/Body";
import Header from "./components/Header";
import CircularProgress from "@mui/material/CircularProgress";
import { initializeAppData } from "./api";

import "./App.css";

class App extends Component {
  state = {
    loading: false,
    hasInitializedData: false,
    params: [],
    error: null,
    initialBusinesses: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      // Allow BE to come up... purely for development purposes
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 500);
      });
      const {
        data: { businesses: initialBusinesses },
      } = await new Promise((resolve) => {
        initializeAppData().then((data) => {
          resolve(data);
        });
      });
      this.setState({ initialBusinesses, loading: false, hasInitializedData: true, error: null });
    } catch (err) {
      this.setState({ error: "err", loading: false });
    }
  }

  render() {
    return (
      <div className="container">
        {this.state.loading && this.state.error != null ? (
          <CircularProgress color="inherit" size={20} xs={{ marginTop: 32 }} />
        ) : (
          <>
            <Header />
            <Body initialBusinesses={this.state.initialBusinesses} />
          </>
        )}
        {this.state.error != null && <h1>Whoops something went wrong please try again </h1>}
      </div>
    );
  }
}

export default App;
