import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { DeletionModal } from "../Modal/Modals";

export default class RecordFieldDelete extends Component {
  constructor() {
    super();
    this.state = { status: "deleting" };
  }

  render() {
    return    <DeletionModal />
    
  }
}
