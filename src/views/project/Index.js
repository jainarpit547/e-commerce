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

import { listProjects, deleteProjects } from "../../actions/projectActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var proData = [];

class Projects extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
      namedata:[],
      manager:[],
      proj:[],
      filter:""
    };
  }

  componentDidMount() {
    if(localStorage.jwtToken)
    { 
      const token = localStorage.jwtToken;
      const decoded = jwt_decode(token);

      this.setState({ token: decoded.token });

      const proData = {
        user_type: 2,
        token: decoded.token
      };
      
      // this.props.listClients(clientData)
      // this.props.listUsers(userData)
      this.listPro(proData);
    }else{
      store.dispatch(logoutUser());
      this.props.history.push("/login");
    }
  };

  componentWillReceiveProps(nextProps) {
    //console.log('urls are', nextProps.apiRes.config.url)
    if (nextProps.apiRes) {
      if(nextProps.apiRes.status === 200)
      {
        if(nextProps.apiRes.data.message == null)
        {
          proData = [];
          
          var data = nextProps.apiRes.data;
          //console.log('data is',data)
          data.map((item,i)=>{
            var j = i+1;
            var dataArr = {
              s_no : j,
              project_name : item.name,
              project_code : item.project_code,
              client : item.client.name,
              status : item.status,
              id:item.id,
              client_id: item.client.id,
              assigned_to: item.assigned_to_user == null ? "Unassigned" :  item.assigned_to_user.name,
              user_id: item.assigned_to_user == null ? "Unassigned" :  item.assigned_to_user.id,
            }
            proData.push(dataArr);

          })
         
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

          // const proData = {
          //   user_type: 1,
          //   token: this.state.token
          // };

          // this.listPro(proData);
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

  listPro(proData)
  {
    this.props.listProjects(proData);
  }

  // deletePro = e => {
  //   const proData = {
  //     project_code: e,
  //     token: this.state.token
  //   };
    
  //   this.props.deleteProjects(proData);
  // };

  render() {
    const fields = [
      { key: 's_no' },
      { key: 'project_name' },
      { key: 'assigned_to' }, 
      { key: 'project_code' },
      { key: 'client'},
      { key: 'status'},
      { key: 'action' },
      
    ]

    const { filter } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = proData.filter(item => {
      //console.log('item from ', item)
      return Object.keys(item).some(key =>
        typeof item[key] === "string" && item[key].toLowerCase().includes(lowercasedFilter)
      );
    });
    console.log('filter data be',filteredData); 

    return (
      <>
        <CRow>
          <CCol xs="12" lg="12">
            <CCard>
              <CCardHeader>
                Projects List 
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
                      'client':
                      (item, index)=>{
                       //console.log('client item is',item);
                        return (
                          <CCardBody>
                            <CButton  className="ml-1" to={"/projects/clientdetail/"+item.client_id}>{item.client}</CButton> 
                          </CCardBody>
                      )
                    }, 
                    'assigned_to':
                    (item, index)=>{
                      //console.log('item is',item);
                      return (
                        <CCardBody>
                          <CButton size="sm" style={{width:'100%'}} className="ml-1" to={"/users/detail/"+item.user_id}>{item.assigned_to}</CButton> 
                        </CCardBody>
                    )
                  },
                  'action':
                      (item, index)=>{
                        return (
                          <CCardBody>
                            <CButton size="sm" color="info" className="ml-1" to={"/project/detail/"+item.id}>Show Details</CButton> 
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

Projects.propTypes = {
  listProjects: PropTypes.func.isRequired,
  deleteProjects: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  apiRes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  apiRes: state.apiRes
});

export default connect(
  mapStateToProps,
  { listProjects, deleteProjects, }
)(Projects);