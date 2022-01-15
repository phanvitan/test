import React, { Component } from "react";
import ChildComponent from "./ChildComponent";

export default class LifeCycleReact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
    };
    console.log('contructor')
  }

  static getDrivedStateFromProps(newProps, currentState) {
    console.log("getDrivedStateFromProps");
    return null;
  }

  render() {
    return (
      <div>
          <h1>Parent Component</h1>
        <ChildComponent />
      </div>
    );
  }
  componentDidMount() {
    console.log("componentDidMount");
  }
}
