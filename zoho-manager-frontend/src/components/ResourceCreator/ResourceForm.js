import React, { Component } from "react";

class ResourceForm extends Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Resource name" />
        <input type="submit" />
      </form>
    );
  }
}

export default ResourceForm;
