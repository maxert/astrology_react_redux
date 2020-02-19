import React, { Component } from "react";
import Search from "../addElement/search";
export default class Persons extends Component {
  render() {
    return (
      <div className="container_list">
        <div className="search_container">
          <Search />
        </div>
        <h2>2</h2>
      </div>
    );
  }
}
