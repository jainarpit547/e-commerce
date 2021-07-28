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

import { dataProjects,proMilestone } from "../../actions/projectActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Promilestone extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
      project_id:"",
      name: "",
      percentage:"",
      realized_date:"",
      realized_amount:"",
      due_amount:"",
      due_date:"",
      status:"",
      client:[],
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

      const proData = {
        user_type: 1,
        token: decoded.token
      };
      this.props.dataProjects(proData)
      // console.log(this.state.namedata);
    }else{
      store.dispatch(logoutUser());
      this.props.history.push("/login");
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log('next props',nextProps.apiRes.data)
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
        this.setState({ project_id:""});
        this.setState({ name: "" });
        this.setState({ percentage:"" });
        this.setState({ due_date:"" });
        this.setState({ due_amount:""});
        this.setState({ realized_amount:""});
        this.setState({ realized_date:""});
        this.setState({ status:""});
        this.setState({ client: nextProps.apiRes.data})

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
        this.state.client.map(item =>{
          if(item.id === parseInt(this.state.project_id)){
            this.props.history.push("/project/detail/"+item.id);
          }
        })
    }
  }

  onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
      console.log("value", e.target.value)
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
      name: this.state.name,
      percentage: this.state.percentage,
      due_amount: this.state.due_amount,
      due_date: this.state.due_date,
      realized_date: this.state.realized_date,
      realized_amount: this.state.realized_amount,
      status: this.state.status,
      token: this.state.token
    };  
    console.log('req data is ', proData)
    this.props.proMilestone(proData);
    
  };

  render() {
    const {  percentage,client, name, due_amount, due_date,realized_amount,realized_date,status, submitStatus } = this.state;
    //console.log(manager)
    return (
      <>
        <CRow>
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader>
                Project Milestone
              </CCardHeader>
              <CCardBody>
                <CForm className="form-horizontal">

                       
                 <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Project Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {/* <CInput type="text" placeholder="Client Id" onChange={this.onChange} name="client_id" value={client_id}/> */}
                      
                      <CSelect onChange={this.onChange} name="project_id">
                          <option value="" disabled selected hidden>Select Project Name</option>
                         {
                           this.state.client.map((item) => {
                             //console.log(item.name)
                              return(  <>
                              <option value={item.id}>{item.name}</option></>)
                           })
                         }
              
                      </CSelect>
                   
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
                      <CLabel htmlFor="text-input">Percentage</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" placeholder="Percentage" onChange={this.onChange} name="percentage" value={percentage} required/>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Due Amount</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" placeholder="Due Amount" onChange={this.onChange} name="due_amount" value={due_amount} required/>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Due Date</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" placeholder="YYYY-MM-DD" onChange={this.onChange} name="due_date" value={due_date} required/>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Realized Amount</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" placeholder="Realized Amount" onChange={this.onChange} name="realized_amount" value={realized_amount} required/>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Realized Date</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" placeholder="YYYY-MM-DD" onChange={this.onChange} name="realized_date" value={realized_date} required/>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Status</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {/* <CSelect type="email" placeholder="Email" onChange={this.onChange} name="email" value={email}/> */}
                      <CSelect onChange={this.onChange} name="status" value={status}>
                        <option value="" disabled selected hidden>Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
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

Promilestone.propTypes = {
  dataProjects: PropTypes.func.isRequired,
  proMilestone: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  apiRes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  apiRes: state.apiRes
});

export default connect(
  mapStateToProps,
  { dataProjects, proMilestone }
)(Promilestone);