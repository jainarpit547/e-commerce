import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store from "./../../store";
import ChipInput from 'material-ui-chip-input';
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
  CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { dataUsers, updateUsers } from "./../../actions/usersActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Editdesig extends Component {
  constructor() {
      super();
      this.state = {
          token: "",
          user_id: "",
          employee_code:"",
          name: "",
          email: "",
          password: "",
          phone:"",
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

      if (this.props.match.params){
        this.setState({ user_id: this.props.match.params.id, token: decoded.token });
  
        const userData = {
          user_id: this.props.match.params.id,
          token: decoded.token
        };
  
       this.props.dataUsers(userData);
      }else{
        this.props.history.push("/users");
      }
    }else{
      store.dispatch(logoutUser());
      this.props.history.push("/login");
    }
  };

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps)
    if (nextProps.apiRes) {
      if(nextProps.apiRes.status === 200)
      {
        if(nextProps.apiRes.data.message == null)
        {
          //console.log(this.props.match.params.id);
          for (let index = 0; index < nextProps.apiRes.data.length; index++) {
            if(nextProps.apiRes.data[index].id == this.props.match.params.id){ 
              console.log(nextProps.apiRes.data[index])
              this.setState({ name: nextProps.apiRes.data[index].name });
              this.setState({ email: nextProps.apiRes.data[index].email });
              this.setState({ employee_code: nextProps.apiRes.data[index].employee_code });
              this.setState({ password: nextProps.apiRes.data[index].password });
              this.setState({ phone: nextProps.apiRes.data[index].phone });
              this.setState({ user_type: nextProps.apiRes.data[index].user_type });
              this.setState({ dob: nextProps.apiRes.data[index].dob });
              this.setState({ doj: nextProps.apiRes.data[index].doj });            
            }
          }
          
        }else{
          toast.success(nextProps.apiRes.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
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
      e.preventDefault();
      const userUpdateData = {
        user_id: this.state.user_id,
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

      this.props.updateUsers(userUpdateData);
  };

  render() {
    const { name, email, password, phone, employee_code, dob, doj, user_type, projects, submitStatus } = this.state;
    return (
      <>
        <CRow>
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader>
                Edit User
              </CCardHeader>
              <CCardBody>
                {/* <CForm className="form-horizontal">
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" placeholder="Name" onChange={this.onChange} name="name" value={name}/>
                    </CCol>
                  </CFormGroup>
                </CForm> */}
                <CForm className="form-horizontal">
                    
                    <CFormGroup row>
                       <CCol md="3">
                         <CLabel htmlFor="text-input">Employee Code</CLabel>
                       </CCol>
                       <CCol xs="12" md="9">
                         <CInput type="text" placeholder="Employee Code" onChange={this.onChange} name="employee_code" value={employee_code}/>
                       </CCol>
                     </CFormGroup>
   
                     <CFormGroup row>
                       <CCol md="3">
                         <CLabel htmlFor="text-input">Name</CLabel>
                       </CCol>
                       <CCol xs="12" md="9">
                         <CInput type="text" placeholder="Name" onChange={this.onChange} name="name" value={name}/>
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
                         <CSelect onChange={this.onChange} name="user_type" >
                           <option disabled selected hidden>{user_type}</option>
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
                         <CInput type="text" placeholder="Date of birth" onChange={this.onChange} name="dob" value={dob}/>
                       </CCol>
                     </CFormGroup>
   
                     <CFormGroup row>
                       <CCol md="3">
                         <CLabel htmlFor="text-input">Date of joining</CLabel>
                       </CCol>
                       <CCol xs="12" md="9">
                         <CInput type="text" placeholder="Date of joining" onChange={this.onChange} name="doj" value={doj}/>
                       </CCol>
                     </CFormGroup>
   
                   </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton type="button" size="sm" color="primary" disabled={submitStatus} onClick={this.onSubmit}><CIcon name="cil-scrubber" /> Update</CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>

        <ToastContainer />
      </>
    );
  }
}

Editdesig.propTypes = {
  dataUsers: PropTypes.func.isRequired,
  updateUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  apiRes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  apiRes: state.apiRes
});

export default connect(
  mapStateToProps,
  { dataUsers, updateUsers }
)(Editdesig);