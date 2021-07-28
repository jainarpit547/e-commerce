import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "./../../../actions/authActions";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
// import Loader from "../../../containers/Loader";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      submitStatus: false,
    };
  }

  componentDidMount() {
    console.log('this props',this.props)
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('next props',nextProps)
    if (nextProps.auth.isAuthenticated) {
      toast.success('Login Successfull', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        this.props.history.push("/dashboard");  
    }, 1500);
    }

    if (nextProps.apiRes) {
      if (nextProps.apiRes.status === 200) {
        //
      } else {
        toast.error('Credtials Error', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        this.setState({ submitStatus: false });
      }
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    this.setState({ submitStatus: true });

    e.preventDefault();
    const userData = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.loginUser(userData);
  };

  render() {
    const { username, password, submitStatus } = this.state;

    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="4">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={this.onSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="text"
                          placeholder="Username"
                          onChange={this.onChange}
                          name="username"
                          value={username}
                          required
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          onChange={this.onChange}
                          name="password"
                          value={password}
                          required
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton
                            type="submit"
                            color="primary"
                            className="px-4"
                            disabled={submitStatus}
                          >
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <Link to="/forgot" color="link" className="px-0">
                            Forgot password?
                          </Link>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>

        <ToastContainer />
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  apiRes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  apiRes: state.apiRes,
});

export default connect(mapStateToProps, { loginUser })(Login);
