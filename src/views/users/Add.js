import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store from "./../../store";
import jwt_decode from "jwt-decode";
import { logoutUser } from "./../../actions/authActions";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';

import { addUsers } from "../../actions/usersActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Adduser extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
      name: "",
      email: "",
      password: "",
      phone:"",
      employee_code:"",
      dob:"",
      doj:"",
      user_type:"",
      submitStatus: false
    };
  }

  componentDidMount() {
    if(localStorage.jwtToken)
    { 
      const token = localStorage.jwtToken;
      const decoded = jwt_decode(token);

      this.setState({ token: decoded.token });
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

        this.setState({ name: "" });
        this.setState({ email: "" });
        this.setState({ password: "" });
        this.setState({ phone: "" });
        this.setState({ employee_code:"" });
        this.setState({ dob:"" });
        this.setState({ doj:"" });
        this.setState({ user_type:""});
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
    this.props.history.push("/users");
  }

  onChange = e => {
     console.log(e.target.name);
      this.setState({ [e.target.name]: e.target.value });
  };

 

  onSubmit = e => {
    this.setState({submitStatus:true});
    //this.setState({ projects: this.state.projects.concat(e.target.value) })
    
    e.preventDefault();
    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone,
      employee_code: this.state.employee_code,
      dob: this.state.dob,
      doj: this.state.doj,
      user_type: this.state.user_type,
      token: this.state.token
    };  
    console.log('data is ', userData)
    this.props.addUsers(userData);
   
  };


  render() {
    const { name, email, password, phone, employee_code, dob, doj, user_type, submitStatus } = this.state;
    return (
      <>
        <CRow>
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader>
                Add User
              </CCardHeader>
              <CCardBody>
                <CForm className="form-horizontal">
                    
                 <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Employee Code</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" placeholder="Employee Code" onChange={this.onChange}  name="employee_code" value={employee_code}/>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" placeholder="Name" onChange={this.onChange} name="name" value={name} required/>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Email</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="email" placeholder="Email" onChange={this.onChange} name="email" value={email}/>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Password</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="password" placeholder="Password" onChange={this.onChange} name="password" value={password}/>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Phone Number</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" placeholder="Phone Number" onChange={this.onChange} name="phone" value={phone}/>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">User Type</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {/* <CSelect type="email" placeholder="Email" onChange={this.onChange} name="email" value={email}/> */}
                      <CSelect onChange={this.onChange} name="user_type" value={user_type}>
                        <option value="" disabled selected hidden>Select a user type</option>
                        <option value="admin">Admin</option>
                        <option value="sales">Sales</option>
                        <option value="manager">Manager</option>
                        <option value="user">User</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Date of birth</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" placeholder="YYYY-MM-DD" onChange={this.onChange} name="dob" value={dob}/>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Date of joining</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" placeholder="YYYY-MM-DD" onChange={this.onChange} name="doj" value={doj}/>
                    </CCol>
                  </CFormGroup>

                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton type="button" size="sm" color="primary" disabled={submitStatus} onClick={this.onSubmit}><CIcon name="cil-scrubber" /> Submit </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>

        <ToastContainer />
      </>
    );
  }
}

Adduser.propTypes = {
  addUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  apiRes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  apiRes: state.apiRes
});

export default connect(
  mapStateToProps,
  { addUsers }
)(Adduser);