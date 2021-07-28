import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resetUser } from "../../../actions/authActions";
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

class Reset extends Component {
  constructor() {
      super();
      this.state = {
          password: "",
          password2: "",
          user_id: "",
          user_otp: "",
          submitStatus: false
      };
  }

  componentDidMount() {
      if (this.props.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
      }else{
        if (this.props.match.params){
          this.setState({ user_id: this.props.match.params.id, user_otp: this.props.match.params.otp });
        }
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
  
          this.setState({ password: "", password2: "" });
          
          setTimeout(() => {
            this.props.history.push("/login");
          }, 1200)
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
        password: this.state.password,
        password2: this.state.password2,
        user_id: this.state.user_id,
        user_otp: this.state.user_otp
    };
    this.props.resetUser(userData);
  };

  render() {
      const { password, password2, submitStatus } = this.state;
      return (
        <div className="c-app c-default-layout flex-row align-items-center">
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md="4">
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm onSubmit={this.onSubmit} >
                        <h1>Reset Password</h1>
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="password" placeholder="Password" autoComplete="current-password" onChange={this.onChange} name="password" value={password}/>
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="password" placeholder="Confirm Password" autoComplete="current-password" onChange={this.onChange} name="password2" value={password2}/>
                        </CInputGroup>
                        <CRow>
                          <CCol xs="6">
                            <CButton type="submit" color="primary" className="px-4" disabled={submitStatus}>Submit</CButton>
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

Reset.propTypes = {
  resetUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  apiRes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  apiRes: state.apiRes
});

export default connect(
  mapStateToProps,
  { resetUser }
)(Reset);