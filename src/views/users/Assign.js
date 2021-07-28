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

import { assignProject, listUsers } from "../../actions/usersActions";
import { listProjects } from "../../actions/projectActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Assignproject extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
      user_id:"",
      resource: "",
      project_id:"",
      proinfo:[],
      userinfo:[],
      submitStatus: false,
    };
  }

  componentDidMount() {
    //console.log('path is', this.props)
    if(localStorage.jwtToken)
    { 
      const token = localStorage.jwtToken;
      const decoded = jwt_decode(token);

      this.setState({ token: decoded.token });
      const proData = {
        user_type: 2,
        token: decoded.token
      };

      const userData = {
        user_type: 1,
        token: decoded.token
      };
      this.props.listProjects(proData)
      this.props.listUsers(userData)
    }else{
      store.dispatch(logoutUser());
      this.props.history.push("/login");
    }
  };

  componentWillReceiveProps(nextProps) {
    //console.log('next props is',nextProps.apiRes.data)
    //  this.setState({ namedata: nextProps.apiRes.data})
    //  console.log('clllllllient data ',this.state.namedata);
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
        this.setState({ user_id:""});
        this.setState({ resource: "" });
        this.setState({ project_id:"" });

        if(nextProps.apiRes.config.url === "/api/v1/projects"){ 
          this.setState({ proinfo: nextProps.apiRes.data})
        }else if(nextProps.apiRes.config.url === "/api/v1/users"){
          this.setState({ userinfo: nextProps.apiRes.data})
        }
        //console.log('clllllllient data ',this.state.namedata);
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
    if(this.state.submitStatus === true){ 
      this.state.userinfo.map(item =>{
        if(item.id === parseInt(this.state.user_id)){
          this.props.history.push("/users/detail/"+item.id);
        }
      })
    }
  }

  onChange = e => {
    //console.log(e.target.name);
      this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    this.setState({submitStatus:true});
    //console.log('submit status is',this.submitStatus)

    e.preventDefault();
    const userData = {
      project_id: parseInt(this.state.project_id),
      resource: this.state.resource,
      user_id: parseInt(this.state.user_id),
      token: this.state.token
    };  
   // console.log('data after submit is ', userData)
    this.props.assignProject(userData);
    
  };

  render() {
    const { user_id, project_id, resource, submitStatus, proinfo, userinfo } = this.state;
    //console.log(manager)
    return (
      <>
        <CRow>
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader>
                Assign Project
              </CCardHeader>
              <CCardBody>
                <CForm className="form-horizontal">

                       
                 <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Select Project</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect onChange={this.onChange} name="project_id">
                          <option value="" disabled selected hidden>Select Project Name</option>
                         {
                           proinfo.map((item => {
                             //console.log(item.name)
                              return(  <>
                              <option value={item.id}>{item.name}</option></>)
                           }))
                         }
              
                      </CSelect>
                   
                    </CCol>
                  </CFormGroup>
                    
                 <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Select Resource Role</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {/* <CInput type="text" placeholder="Project Code" onChange={this.onChange} name="project_code" value={project_code}/> */}

                      <CSelect onChange={this.onChange} name="resource" value={resource}>
                          <option value="" disabled selected hidden>Select Resource</option>
                          <option value="manager">Manager</option>
                          <option value="user">User</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Assign Resource</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {/* <CInput type="text" placeholder="Project Code" onChange={this.onChange} name="project_code" value={project_code}/> */}

                      <CSelect onChange={this.onChange} name="user_id">
                          <option value="" disabled selected hidden>Select Resource Name</option>
                         {
                           userinfo.map((item => {
                             //console.log(item.name)
                              return(  <>
                              <option value={item.id}>{item.name}</option></>)
                           }))
                         }
              
                      </CSelect>
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

Assignproject.propTypes = {
  listUsers: PropTypes.func.isRequired,
  assignProject: PropTypes.func.isRequired,
  listProjects: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  apiRes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  apiRes: state.apiRes
});

export default connect(
  mapStateToProps,
  { assignProject, listProjects, listUsers }
)(Assignproject);