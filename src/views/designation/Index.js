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
  CButton
} from '@coreui/react'

import { listDesignation, deleteDesignation } from "../../actions/designationActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var designationData = [];

class Designation extends Component {
  constructor() {
    super();
    this.state = {
      token: ""
    };
  }

  componentDidMount() {
    if(localStorage.jwtToken)
    { 
      const token = localStorage.jwtToken;
      const decoded = jwt_decode(token);

      this.setState({ token: decoded.token });

      this.listDesig(decoded.token);
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
          designationData = [];
          var data = nextProps.apiRes.data;

          for (var i = 0; i < data.length; i++) {
            var j = i+1;
            var dataArr = {
              s_no : j,
              name : data[i].name,
              desig_id : data[i].id
            }
            
            designationData.push(dataArr);
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

          this.listDesig(this.state.token);
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

  listDesig(token)
  {
    const authData = {
      token: token
    };

    this.props.listDesignation(authData);
  }

  deleteDesig = e => {
    const desigData = {
      desig_id: e,
      token: this.state.token
    };
      
    this.props.deleteDesignation(desigData);
  };

  render() {
    const fields = [
      { key: 's_no' },
      { key: 'name' },
      { key: 'action' },
    ]

    return (
      <>
        <CRow>
          <CCol xs="12" lg="12">
            <CCard>
              <CCardHeader>
                List
              </CCardHeader>
              <CCardBody>
              <CDataTable
                items={designationData}
                fields={fields}
                striped
                itemsPerPage={10}
                pagination
                scopedSlots = {{
                  'action':
                      (item, index)=>{
                        return (
                          <CCardBody>
                            <CButton size="sm" color="info" className="ml-1" to={"/designation/edit/"+item.desig_id}>Edit</CButton>
                            <CButton size="sm" color="danger" className="ml-1" onClick={() => {if(window.confirm('Are you sure you want to delete this?')){this.deleteDesig(item.desig_id)};}}>Delete</CButton>
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

Designation.propTypes = {
  listDesignation: PropTypes.func.isRequired,
  deleteDesignation: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  apiRes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  apiRes: state.apiRes
});

export default connect(
  mapStateToProps,
  { listDesignation, deleteDesignation }
)(Designation);