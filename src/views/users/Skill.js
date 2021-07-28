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

import { addSkill, listUsers } from "../../actions/usersActions";
import { listTechnologies  } from "../../actions/technologiesActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Addskill extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
      user_id:"",
      proficeincy: "",
      primary:"",
      technology_id:"",
      techinfo:[],
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
      const authData = {
        user_type: 2,
        token: decoded.token
      };

      const userData = {
        user_type: 1,
        token: decoded.token
      };
      this.props.listTechnologies(authData)
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
        this.setState({ proficeincy: "" });
        this.setState({ technology_id:"" });
        this.setState({primary:""});

        if(nextProps.apiRes.config.url === "/api/v1/technologies"){ 
          this.setState({ techinfo: nextProps.apiRes.data})
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
    console.log(e.target.name, e.target.value);
      this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    this.setState({submitStatus:true});
    //console.log('submit status is',this.submitStatus)

    e.preventDefault();
    const userData = {
      technology_id: parseInt(this.state.technology_id),
      proficeincy: this.state.proficeincy,
      primary:parseInt(this.state.primary),
      user_id: parseInt(this.state.user_id),
      token: this.state.token
    };  
    console.log('data after submit is ', userData)
    this.props.addSkill(userData);
    
  };

  render() {
    const { user_id, project_id, proficeincy, primary, submitStatus, techinfo, userinfo } = this.state;
    //console.log(manager)
    return (
      <>
        <CRow>
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader>
                Add Skill
              </CCardHeader>
              <CCardBody>
                <CForm className="form-horizontal">

                       
                 <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">User</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect onChange={this.onChange} name="user_id">
                          <option value="" disabled selected hidden>Select User Name</option>
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
                    
                 <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Proficeincy</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {/* <CInput type="text" placeholder="Project Code" onChange={this.onChange} name="project_code" value={project_code}/> */}

                      <CSelect onChange={this.onChange} name="proficeincy" value={proficeincy}>
                          <option value="" disabled selected hidden>Select Proficeincy</option>
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="expert">Expert</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Primary</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {/* <CInput type="text" placeholder="Project Code" onChange={this.onChange} name="project_code" value={project_code}/> */}

                      <CSelect onChange={this.onChange} name="primary" value={primary}>
                          <option value="" disabled selected hidden>Select Primary</option>
                          <option value="1">True</option>
                          <option value="0">False</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Technology</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {/* <CInput type="text" placeholder="Project Code" onChange={this.onChange} name="project_code" value={project_code}/> */}

                      <CSelect onChange={this.onChange} name="technology_id">
                          <option value="" disabled selected hidden>Select Technology Name</option>
                         {
                           techinfo.map((item => {
                             //console.log('techinfo',item)
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

Addskill.propTypes = {
  listUsers: PropTypes.func.isRequired,
  addSkill: PropTypes.func.isRequired,
  listTechnologies: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  apiRes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  apiRes: state.apiRes
});

export default connect(
  mapStateToProps,
  { addSkill, listTechnologies, listUsers }
)(Addskill);