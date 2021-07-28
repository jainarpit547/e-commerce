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
  CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { dataClients, updateClients } from "./../../actions/clientActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Editclient extends Component {
  constructor() {
      super();
      this.state = {
          token: "",
          client_id: "",
          client_code:"",
          name: "",
          country: "",
          address: "",
          submitStatus: false
      };
  }

  componentDidMount() {
    if(localStorage.jwtToken)
    { 
      const token = localStorage.jwtToken;
      const decoded = jwt_decode(token);

      if (this.props.match.params){
        this.setState({ client_id: this.props.match.params.id, token: decoded.token });
  
        const clientData = {
          client_id: this.props.match.params.id,
          token: decoded.token
        };
  
       this.props.dataClients(clientData);
      }else{
        this.props.history.push("/clients");
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
            console.log('api data is',nextProps.apiRes.data[index])
            if(nextProps.apiRes.data[index].client_code == this.props.match.params.id){ 
              //console.log(nextProps.apiRes.data[index])
              this.setState({ name: nextProps.apiRes.data[index].name });
              this.setState({ client_code: nextProps.apiRes.data[index].client_code });
              this.setState({ address: nextProps.apiRes.data[index].address });
              this.setState({ country: nextProps.apiRes.data[index].country });          
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
      this.setState({ [e.target.client_code]: e.target.value });
      this.setState({ [e.target.address]: e.target.value });
      this.setState({ [e.target.country]: e.target.value });
  };

  onSubmit = e => {
      e.preventDefault();
      const clientUpdateData = {
        client_id: this.state.user_id,
        name: this.state.name,
        client_code: this.state.client_code,
        country: this.state.country,
        address: this.state.address,
        token: this.state.token
      };

      this.props.updateClients(clientUpdateData);
  };

  render() {
    const { name, client_code, address, country, submitStatus } = this.state;
    return (
      <>
        <CRow>
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader>
                Edit Client
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
                         <CLabel htmlFor="text-input">Name</CLabel>
                       </CCol>
                       <CCol xs="12" md="9">
                         <CInput type="text" placeholder="Name" onChange={this.onChange} name="name" value={name}/>
                       </CCol>
                     </CFormGroup>
   
                     <CFormGroup row>
                       <CCol md="3">
                         <CLabel htmlFor="text-input">Address</CLabel>
                       </CCol>
                       <CCol xs="12" md="9">
                         <CInput type="text" placeholder="Address" onChange={this.onChange} name="address" value={address}/>
                       </CCol>
                     </CFormGroup>
   
                     <CFormGroup row>
                       <CCol md="3">
                         <CLabel htmlFor="text-input">Country</CLabel>
                       </CCol>
                       <CCol xs="12" md="9">
                         <CInput type="text" placeholder="country" onChange={this.onChange} name="country" value={country}/>
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

Editclient.propTypes = {
  dataClients: PropTypes.func.isRequired,
  updateClients: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  apiRes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  apiRes: state.apiRes
});

export default connect(
  mapStateToProps,
  { dataClients, updateClients }
)(Editclient);