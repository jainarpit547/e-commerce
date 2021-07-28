import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { forgotUser } from "../../../actions/authActions";
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
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";

class Forgot extends Component {
  constructor() {
      super();
      this.state = {
          email: "",
          submitStatus: false
      };
  }

  componentDidMount() {
      if (this.props.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
      }
  };

  componentWillReceiveProps(nextProps) {
      if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
      }
      
      if (nextProps.apiRes) {
        if(nextProps.apiRes.status === 200)
        {
          toast.success(nextProps.apiRes.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
  
          this.setState({ email: "" });
        }else{
          toast.error(nextProps.apiRes.errorMessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }

        this.setState({submitStatus:false});
      }
  }

  onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    this.setState({submitStatus:true});

    e.preventDefault();
    const userData = {
        email: this.state.email
    };
    this.props.forgotUser(userData);
  };

  render() {
      const { email, submitStatus } = this.state;
      return (
        <div className="c-app c-default-layout flex-row align-items-center">
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md="4">
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm onSubmit={this.onSubmit} >
                        <h1>Forgot Password</h1>
                        <p className="text-muted">Enter your email address and we'll send you an email with instructions to reset your password.</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" placeholder="Email" autoComplete="email" onChange={this.onChange} name="email" value={email}/>
                        </CInputGroup>
                        <CRow>
                          <CCol xs="6">
                            <CButton type="submit" color="primary" className="px-4" disabled={submitStatus}>Send Email</CButton>
                          </CCol>
                          <CCol xs="6" className="text-right">
                            <Link to="/login" color="link" className="px-0">Login</Link>
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

Forgot.propTypes = {
  forgotUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  apiRes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  apiRes: state.apiRes
});

export default connect(
  mapStateToProps,
  { forgotUser }
)(Forgot);