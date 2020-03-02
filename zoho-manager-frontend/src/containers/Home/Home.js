import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchResources } from "../../actions/resourceActions";
import SideBar from "../../components/Home/SideBar/SideBar";

class Home extends Component {
  componentDidMount() {
    const { organization, fetchResources } = this.props;
    fetchResources(organization.id);
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-2">
          <SideBar />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ resources }) => {
  return {
    resources
  };
};

export default connect(mapStateToProps, { fetchResources })(Home);
