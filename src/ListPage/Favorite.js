import React, { Component } from "react";
import Search from "../addElement/search";
export default class Favorite extends Component {
  render() {
    return (
      <div className="container_list">
        <div className="search_container">
          <Search />
        </div>
        <h2>7</h2>
      </div>
    );
  }
}
