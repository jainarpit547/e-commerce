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
  CDataTable
} from '@coreui/react'

import {  listClients } from "./../../actions/clientActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class ProClientDetail extends Component {
  constructor() {
      super();
      this.state = {
          token: "",
          client_code:"",
          name: "",
          address: "",
          client_id:"",
          country:"",
          submitStatus: false
      };
  }

  componentDidMount() {
    if(localStorage.jwtToken)
    { 
      const token = localStorage.jwtToken;
      const decoded = jwt_decode(token);
      //console.log('client_id',this.props.match.params)
      if (this.props.match.params){
        this.setState({ client_id: this.props.match.params.id, token: decoded.token });
  
        const clientData = {
          client_id: this.props.match.params.id,
          token: decoded.token
        };
  
       this.props.listClients(clientData);
      }else{
        this.props.history.push("/projects");
      }

    }else{
      store.dispatch(logoutUser());
      this.props.history.push("/login");
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log('next prop is ',nextProps.apiRes.data)
    if (nextProps.apiRes) {
      if(nextProps.apiRes.status === 200)
      {          
        nextProps.apiRes.data.map((item,i) =>{
            if(item.id == this.props.match.params.id){ 
                this.setState({ name: item.name });
                this.setState({ client_code: item.client_code }); 
                this.setState({ address: item.address }); 
                this.setState( { country: item.country } );         
              }
           });
            
         
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



  render() {
   
    const { name, address, client_code, country, client_id, submitStatus } = this.state;
    return (
      <>
        <CRow>
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                Client Details
              </CCardHeader>
              <CCardBody>
                <CForm className="form-horizontal">
                    
                    <CFormGroup row>
                       <CCol md="2">
                         <CLabel htmlFor="text-input"><b>Client Code :</b></CLabel>
                       </CCol>
                       <CCol xs="12" md="">
                        <p>{client_code}</p>
                         {/* <CInput type="text" placeholder="Employee Code" onChange={this.onChange} name="employee_code" value={employee_code}/> */}
                       </CCol>
                     </CFormGroup>

                     <CFormGroup row>
                       <CCol md="2">
                         <CLabel htmlFor="text-input"><b>Client Name :</b></CLabel>
                       </CCol>
                       <CCol xs="12" md="">
                        <p>{name}</p>
                         {/* <CInput type="text" placeholder="Employee Code" onChange={this.onChange} name="employee_code" value={employee_code}/> */}
                       </CCol>
                     </CFormGroup>

                     <CFormGroup row>
                       <CCol md="2">
                         <CLabel htmlFor="text-input"><b>Address :</b></CLabel>
                       </CCol>
                       <CCol xs="12" md="">
                        <p>{address}</p>
                         {/* <CInput type="text" placeholder="Employee Code" onChange={this.onChange} name="employee_code" value={employee_code}/> */}
                       </CCol>
                     </CFormGroup>
   
                     <CFormGroup row>
                       <CCol md="2">
                         <CLabel htmlFor="text-input"><b>Country :</b></CLabel>
                       </CCol>
                       <CCol xs="12" md="">
                        <p>{country}</p>
                         {/* <CInput type="text" placeholder="Employee Code" onChange={this.onChange} name="employee_code" value={employee_code}/> */}
                       </CCol>
                     </CFormGroup>


                   </CForm>
                    

                   
              </CCardBody>
            </CCard>
    
          </CCol>
        </CRow>

        

        <ToastContainer />
      </>
    );
  }
}

ProClientDetail.propTypes = {
  listClients: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  apiRes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  apiRes: state.apiRes
});

export default connect(
  mapStateToProps,
  { listClients }
)( ProClientDetail );