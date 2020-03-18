import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import './styles.css';
import { connect } from 'react-redux';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.alerts !== this.props.alerts) {
      this.setState({ show: true });
      setTimeout(() => this.setState({ show: false }), 5000);
    }
  }

  render() {
    const { alerts } = this.props;
    const error = alerts.find(alert => alert.type === 'error');
    const success = alerts.find(alert => alert.type === 'success');
    if (success)
      return (
        <CSSTransition
          in={this.state.show}
          timeout={300}
          unmountOnExit
          classNames="fade"
          appear>
          <div className="alert alert-success d-flex align-items-center">
            <ul className="mb-0">
              {success.messages.map((message, id) => (
                <li key={id}>{message}</li>
              ))}
            </ul>
          </div>
        </CSSTransition>
      );
    else if (error)
      return (
        <CSSTransition
          in={this.state.show}
          timeout={300}
          unmountOnExit
          classNames="fade"
          appear>
          <div className="alert alert-danger d-flex align-items-center">
            <ul className="mb-0">
              {error.messages.map((message, id) => (
                <li key={id}>{message}</li>
              ))}
            </ul>
          </div>
        </CSSTransition>
      );
    else return <></>;
  }
}

const mapStateToProps = ({ alerts }) => {
  return { alerts };
};

export default connect(mapStateToProps)(Alert);
