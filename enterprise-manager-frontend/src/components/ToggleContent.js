import React, { PureComponent } from "react";

export default class ToggleContent extends PureComponent {
  state = { isShown: false };
  hide = event => {
    event.stopPropagation();
    this.setState({ isShown: false });
  };

  show = event => {
    this.setState({ isShown: true });
    event.persist();
    event.preventDefault();
    event.stopPropagation();
  };

  render() {
    const { toggle, content } = this.props;
    return (
      <>
        {toggle(this.show)}
        {this.state.isShown && content(this.hide)}
      </>
    );
  }
}
