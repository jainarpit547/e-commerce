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

import { listUsers } from "../../actions/usersActions";
import { listClients } from "../../actions/clientActions";
import { listProjectsDetail, updateProjects } from "../../actions/projectActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Editproject extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
      client_id:"",
      project_id:"",
      name: "",
      project_code:"",
      assigned_to:"",
      namedata:[],
      manager:[],
      submitStatus: false
    };
  }

  componentDidMount() {
    //console.log('path is', this.props)
    if(localStorage.jwtToken)
    { 
      const token = localStorage.jwtToken;
      const decoded = jwt_decode(token);

      this.setState({ token: decoded.token });
      this.setState( {project_id :this.props.match.params.id})
      const clientData = {
        user_type: 2,
        token: decoded.token
      };

      const userData = {
        user_type: 1,
        token: decoded.token
      };
      const proData = {
        project_id: this.props.match.params.id,
        token: decoded.token
      };
      this.props.listProjectsDetail(proData)
      this.props.listClients(clientData)
      this.props.listUsers(userData)
      // console.log(this.state.namedata);
    }else{
      store.dispatch(logoutUser());
      this.props.history.push("/login");
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log('next props',nextProps.apiRes.config)
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
        this.setState({ assigned_to:"" });

        if(nextProps.apiRes.config.url === "/api/v1/clients"){ 
          this.setState({ namedata: nextProps.apiRes.data})
        }else if(nextProps.apiRes.config.url === "/api/v1/users"){
          this.setState({ manager: nextProps.apiRes.data})
        }else if(nextProps.apiRes.config.url === "/api/v1/projects/"+this.state.project_id){
          console.log('details api',nextProps.apiRes.data);
          this.setState({ client_id: nextProps.apiRes.data.client.name});
          this.setState({ name: nextProps.apiRes.data.name });
          this.setState({ project_code: nextProps.apiRes.data.project_code });
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
    if(this.state.submitStatus === true){
      this.props.history.push("/projects");
    }
  }

  onChange = e => {
      this.setState({ [e.target.client_id]: e.target.value });
      this.setState({ [e.target.name]: e.target.value });
      this.setState({ [e.target.project_code]:e.target.value});
      console.log(e.target.value)
  };

  onSubmit = e => {
    this.setState({submitStatus:true});
    // this.state.namedata.map((item)=>{
    //   //console.log(item)
    //   //console.log(this.state.client_id)
    //   if(item.name === this.state.client_id){
    //     console.log(item.id)
    //     this.setState({client_id : item.id});
    //     console.log(this.state.client_id)
    //   }
    // })

    e.preventDefault();
    const proData = {
      project_id: parseInt(this.state.project_id),
      client_id: parseInt(this.state.client_id),
      name: this.state.name,
      project_code: this.state.project_code,
      assigned_to: parseInt(this.state.assigned_to),
      token: this.state.token
    };  
    console.log('data is ', proData)
    this.props.updateProjects(proData);
    
  };

  render() {
    const { client_id, name, project_code, assigned_to, submitStatus,namedata, manager } = this.state;
    //console.log(manager)
    return (
      <>
        <CRow>
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader>
                Edit Project
              </CCardHeader>
              <CCardBody>
                <CForm className="form-horizontal">

                       
                 <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Client Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {/* <CInput type="text" placeholder="Client Id" onChange={this.onChange} name="client_id" value={client_id}/> */}
                      
                      <CSelect  onChange={this.onChange} name="client_id">
                          <option value="" disabled selected hidden>Select Client </option>
                         {
                           namedata.map((item => {
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
                      <CLabel htmlFor="text-input">Project Code</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" placeholder="Project Code" onChange={this.onChange} name="project_code" value={project_code}/>
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
                      <CLabel htmlFor="text-input">Manager</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {/* <CInput type="text" placeholder="Manager" onChange={this.onChange} name="assigned_to" value={assigned_to} required/> */}

                      <CSelect onChange={this.onChange} name="assigned_to">
                          <option value="" disabled selected hidden>Select Manager</option>
                         {
                           manager.map((item => {
                             //console.log(item.user_type)
                             if(item.user_type === "manager"){ 
                              return(  <>
                              <option value={item.id}>{item.name}</option></>)
                             }
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

Editproject.propTypes = {
  listUsers: PropTypes.func.isRequired,
  listClients: PropTypes.func.isRequired,
  updateProjects: PropTypes.func.isRequired,
  listProjectsDetail:PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  apiRes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  apiRes: state.apiRes
});

export default connect(
  mapStateToProps,
  { updateProjects, listClients, listUsers, listProjectsDetail }
)(Editproject);