import React, { Component } from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import jwt_decode from "jwt-decode";
import {logoutUser} from "../../../actions/authActions";

class Logout extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
    };
  }

  componentDidMount() {
    if(localStorage.jwtToken)
    { 
      const token = localStorage.jwtToken;
      const decoded = jwt_decode(token);

      this.setState({ token: decoded.token });

      const logoutData = {
        token: decoded.token
      };
      this.props.logoutUser(logoutData);
    }
    
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
}

  render() {
    return (
      <></>
    );
  }
}

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Logout);