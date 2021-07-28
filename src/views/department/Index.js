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

import { listDepartment, deleteDepartment } from "../../actions/departmentActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var departmentData = [];

class Department extends Component {
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

      this.listDepart(decoded.token);
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
          departmentData = [];
          var data = nextProps.apiRes.data;

          for (var i = 0; i < data.length; i++) {
            var j = i+1;
            var dataArr = {
              s_no : j,
              name : data[i].name,
              depart_id : data[i].id
            }
            
            departmentData.push(dataArr);
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

          this.listDepart(this.state.token);
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

  listDepart(token)
  {
    const authData = {
      token: token
    };

    this.props.listDepartment(authData);
  }

  deleteDepart = e => {
    const departData = {
      depart_id: e,
      token: this.state.token
    };
      
    this.props.deleteDepartment(departData);
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
                items={departmentData}
                fields={fields}
                striped
                itemsPerPage={10}
                pagination
                scopedSlots = {{
                  'action':
                      (item, index)=>{
                        return (
                          <CCardBody>
                            <CButton size="sm" color="info" className="ml-1" to={"/department/edit/"+item.depart_id}>Edit</CButton>
                            <CButton size="sm" color="danger" className="ml-1" onClick={() => {if(window.confirm('Are you sure you want to delete this?')){this.deleteDepart(item.depart_id)};}}>Delete</CButton>
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

Department.propTypes = {
  listDepartment: PropTypes.func.isRequired,
  deleteDepartment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  apiRes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  apiRes: state.apiRes
});

export default connect(
  mapStateToProps,
  { listDepartment, deleteDepartment }
)(Department);