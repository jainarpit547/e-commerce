import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store from "../../store";
import jwt_decode from "jwt-decode";
import { logoutUser } from "../../actions/authActions";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
} from '@coreui/react'

import { listClients, deleteClients ,dataClients } from "../../actions/clientActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var clientData = [];

class Clients extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
      filter: "",
    };
  }

  componentDidMount() {
    if(localStorage.jwtToken)
    { 
      const token = localStorage.jwtToken;
      const decoded = jwt_decode(token);

      this.setState({ token: decoded.token });

      const clientData = {
        user_type: 2,
        token: decoded.token
      };

      this.listclient(clientData);
    }else{
      store.dispatch(logoutUser());
      this.props.history.push("/login");
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.apiRes) {
      if(nextProps.apiRes.status === 200)
      {
        if(nextProps.apiRes.data.message == null)
        {
          clientData = [];
          var data = nextProps.apiRes.data;
          console.log(data)
          for (var i = 0; i < data.length; i++) {
            var j = i+1;
            var dataArr = {
              s_no : j,
              name : data[i].name,
              address : data[i].address,
              country : data[i].country,
              client_code : data[i].client_code,
              //client_id : data[i].id,
            }
            
            clientData.push(dataArr);
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

          const clientData = {
            user_type: 1,
            token: this.state.token
          };

          this.listclient(clientData);
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
    }
  }

  onChange = e => {
    console.log('normal data',clientData);
     //this.setState({ [e.target.name]: e.target.value });
     this.setState({ filter: e.target.value });
 };

  listclient(clientData)
  {
    this.props.listClients(clientData);
  }

  deleteClient = e => {
    const clientData = {
      client_code: e,
      token: this.state.token
    };
    

    this.props.deleteClients(clientData);
  };

  render() {
    const fields = [
      { key: 's_no' },
      { key: 'name' },
      // { key: 'client_id'},
      { key: 'address' },
      { key: 'country' },
      { key: 'client_code' },
      { key: 'action' },
    ]

    const { filter } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = clientData.filter(item => {
      console.log('item from ', item)
      return Object.keys(item).some(key =>
        typeof item[key] === "string" && item[key].toLowerCase().includes(lowercasedFilter)
      );
    });
    console.log('fil data be',filteredData); 


    return (
      <>
        <CRow>
          <CCol xs="12" lg="12">
            <CCard>
              <CCardHeader>
                 Client List
              </CCardHeader>
              <CCardBody>

              <CForm className="form-horizontal">
                  <CFormGroup row>
                    <CCol xs="2" md="3">
                      <CInput type="text" placeholder="Search" onChange={this.onChange}  name="search" />
                    </CCol>
                  </CFormGroup>
               </CForm>

              <CDataTable
                items={filteredData} 
                fields={fields}
                striped
                itemsPerPage={10}
                pagination
                scopedSlots = {{
                  'action':
                      (item, index)=>{
                        //console.log('item gfrom client',item)
                        return (
                          <CCardBody>
                            <CButton size="sm" color="info" className="ml-1" to={"/clients/edit/"+item.client_code}>Edit</CButton>
                            <CButton size="sm" color="danger" className="ml-1" onClick={() => {if(window.confirm('Are you sure you want to delete this?')){this.deleteClient(item.client_code)};}}>Delete</CButton>
                          </CCardBody>
                      )
                    }
                }}
              />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <ToastContainer />
      </>
    );
  }
}

Clients.propTypes = {
  listClients: PropTypes.func.isRequired,
  deleteClients: PropTypes.func.isRequired,
  dataClients: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  apiRes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  apiRes: state.apiRes
});

export default connect(
  mapStateToProps,
  { listClients, deleteClients, dataClients}
)(Clients);