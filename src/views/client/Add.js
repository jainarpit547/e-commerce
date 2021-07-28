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

import { addClients } from "../../actions/clientActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Addclient extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
      name: "",
      address: "",
      country: "",
      client_code:"",
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
        this.setState({ address: "" });
        this.setState({ country: "" });
        this.setState({ client_code:"" });
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
    this.props.history.push("/clients");
  }

  onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
      this.setState({ [e.target.address]: e.target.value });
      this.setState({ [e.target.country]: e.target.value });
      this.setState({ [e.target.client_code]:e.target.value});
  };

  onSubmit = e => {
    this.setState({submitStatus:true});

    e.preventDefault();
    const clientData = {
      name: this.state.name,
      address: this.state.address,
      country: this.state.country,
      client_code: this.state.client_code,
      token: this.state.token
    };  
    this.props.addClients(clientData);
   
  };

  render() {
    const { name, address, country, client_code, submitStatus } = this.state;
    return (
      <>
        <CRow>
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader>
                Add Client
              </CCardHeader>
              <CCardBody>
                <CForm className="form-horizontal">

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
                      <CLabel htmlFor="text-input">Address</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="email" placeholder="Address" onChange={this.onChange} name="address" value={address}/>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Country</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" placeholder="Country" onChange={this.onChange} name="country" value={country}/>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Client Code</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" placeholder="Client Code" onChange={this.onChange} name="client_code" value={client_code}/>
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

Addclient.propTypes = {
  addClients: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  apiRes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  apiRes: state.apiRes
});

export default connect(
  mapStateToProps,
  { addClients }
)(Addclient);