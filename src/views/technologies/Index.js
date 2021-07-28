import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store from "./../../store";
import jwt_decode from "jwt-decode";
import { logoutUser } from "./../../actions/authActions";
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

import { listTechnologies, deleteTechnologies } from "../../actions/technologiesActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var techData = [];

class Technologies extends Component {
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

      this.listTechno(decoded.token);
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
          techData = [];
          var data = nextProps.apiRes.data;

          for (var i = 0; i < data.length; i++) {
            var j = i+1;
            var dataArr = {
              s_no : j,
              name : data[i].name,
              tech_id : data[i].id
            }
            
            techData.push(dataArr);
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

          this.listTechno(this.state.token);
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
    
     this.setState({ filter: e.target.value });
 };

  listTechno(token)
  {
    const authData = {
      token: token
    };

    this.props.listTechnologies(authData);
  }

  deleteTechno = e => {
    const technoData = {
      tech_id: e,
      token: this.state.token
    };
      
    this.props.deleteTechnologies(technoData);
  };

  render() {
    const fields = [
      { key: 's_no' },
      { key: 'name' },
      { key: 'action' },
    ]

    const { filter } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = techData.filter(item => {
      //console.log('item from ', item)
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
                List
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
                items={filteredData }
                fields={fields}
                striped
                itemsPerPage={10}
                pagination
                scopedSlots = {{
                  'action':
                      (item, index)=>{
                        return (
                          <CCardBody>
                            <CButton size="sm" color="info" className="ml-1" to={"/technologies/edit/"+item.tech_id}>Edit</CButton>
                            <CButton size="sm" color="danger" className="ml-1" onClick={() => {if(window.confirm('Are you sure you want to delete this?')){this.deleteTechno(item.tech_id)};}}>Delete</CButton>
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

Technologies.propTypes = {
  listTechnologies: PropTypes.func.isRequired,
  deleteTechnologies: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  apiRes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  apiRes: state.apiRes
});

export default connect(
  mapStateToProps,
  { listTechnologies, deleteTechnologies }
)(Technologies);