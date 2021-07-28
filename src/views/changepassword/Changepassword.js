import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store from "./../../store";
import jwt_decode from "jwt-decode";
import { logoutUser } from "./../../actions/authActions";
import { updatePassword } from "./../../actions/changepassActions";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CCardFooter,
  CButton
} from '@coreui/react'

import CIcon from '@coreui/icons-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Changepassword extends Component {
  constructor() {
      super();
      this.state = {
          oldpassword: "",
          password: "",
          password2: "",
          user_id: "",
          token: "",
          submitStatus: false
      };
  }

  componentDidMount() {
    if(localStorage.jwtToken)
    { 
      const token = localStorage.jwtToken;
      const decoded = jwt_decode(token);
      this.setState({ user_id: decoded.id, token: decoded.token });
    }else{
      store.dispatch(logoutUser());
      this.props.history.push("/login");
    }
  };

  componentWillReceiveProps(nextProps) {
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

          this.setState({ oldpassword: "", password: "", password2: "" });
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
        oldpassword: this.state.oldpassword,
        password: this.state.password,
        password2: this.state.password2,
        user_id: this.state.user_id,
        token: this.state.token
    };
    
    this.props.updatePassword(userData);
  };

  render() {
    const { oldpassword, password, password2, submitStatus } = this.state;
    return (
      <>
        <CRow>
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader>
                Change Passowrd
              </CCardHeader>
              <CCardBody>
                <CForm className="form-horizontal">
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="hf-email">Old Password</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="password" placeholder="Old Password" autoComplete="current-password" onChange={this.onChange} name="oldpassword" value={oldpassword}/>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="hf-email">Passowrd</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="password" placeholder="Password" autoComplete="current-password" onChange={this.onChange} name="password" value={password}/>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="hf-email">Confirm Passowrd</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="password" placeholder="Confirm Password" autoComplete="current-password" onChange={this.onChange} name="password2" value={password2}/>
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>

              <CCardFooter>
                <CButton type="submit" size="sm" color="primary" disabled={submitStatus} onClick={this.onSubmit}><CIcon name="cil-scrubber" /> Submit</CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>

        <ToastContainer />
      </>
    );
  }
}

Changepassword.propTypes = {
  updatePassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  apiRes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    apiRes: state.apiRes
});

export default connect(
    mapStateToProps,
    { updatePassword }
)(Changepassword);
