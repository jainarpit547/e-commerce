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

import { listUsers, deleteUsers } from "../../actions/usersActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var usersData = [];
var skillData = [];

class Users extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
      projectItem: "",
      filter: "",
      
     
  };
}
  componentDidMount(){
    if(localStorage.jwtToken)
    { 
      const token = localStorage.jwtToken;
      const decoded = jwt_decode(token);

      this.setState({ token: decoded.token });

      const userData = {
        //user_type: 2,
        token: decoded.token
      };

      this.listUser(userData);
    }else{
      store.dispatch(logoutUser());
      this.props.history.push("/login");
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log('next props',nextProps)
    skillData = [];
    if (nextProps.apiRes) {
      if(nextProps.apiRes.status === 200)
      {
        if(nextProps.apiRes.data)
        {
          usersData = [];
         
          var data = nextProps.apiRes.data;
          //console.log(data)
          for (var i = 0; i < data.length; i++) {
            console.log('data i is ',data[i])
            // data[i].roles.map((item)=>{
            //   console.log('data role',item)
             
            //     // var skillArr = {
            //     //   proficiency: item.proficiency,
            //     //   skillname: item.technology.name
            //     // }
            //     skillData.push(item)   
            // })
            var j = i+1;
            var dataArr = {
              s_no : j,
              firstname : data[i].firstName,
              lastname : data[i].lastName,
              username : data[i].username,
              email : data[i].email, 
            }
            
            usersData.push(dataArr);
          
          }
        }
        // else{
        //   toast.success(nextProps.apiRes.data.message, {
        //     position: "top-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //   });

        //   const userData = {
        //     user_type: 1,
        //     token: this.state.token
        //   };

        //   this.listUser(userData);
        // }
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

  listUser(userData)
  {
    this.props.listUsers(userData);
  }

  onChange = e => {
    console.log('normal data',usersData);
     //this.setState({ [e.target.name]: e.target.value });
     this.setState({ filter: e.target.value });
 };

 applyCond = (item) =>{
   console.log('arpit',item)
   if(item.skill.length > 0){ 
     return item.skill.map((val)=>{

        return <p>{val.technology.name} - <span>{val.proficiency}</span></p>;
      })
    }
     else{
       return <p>No Data</p>
     } 
   }

  // deleteUser = e => {
  //   const userData = {
  //     user_id: e,
  //     token: this.state.token
  //   };
      
  //   this.props.deleteUsers(userData);
  // };

  
  render() {
    const fields = [
      { key: 's_no' },
      { key: 'firstname' },
      { key: 'lastname' },
      { key: 'email' },
      { key: 'username' },
      { key: 'action' },  
    ]

    const { filter } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = usersData.filter(item => {
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
               Users List
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
                        return (
                          <CCardBody>
                            <CButton size="sm" color="info" className="ml-1" to={"/users/detail/"+item.user_id}>Show Details</CButton>          
                          </CCardBody>
                       )
                     },
                    //  'skill':
                    //   (item, index)=>{
                    //    //console.log('item is',item.skill);
                    //   return (
                    //           <div>
                    //              {this.applyCond(item)} 
                    //           </div>
                    //     ) 
                    //  } 

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

Users.propTypes = {
  listUsers: PropTypes.func.isRequired,
  deleteUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  apiRes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  apiRes: state.apiRes
});

export default connect(
  mapStateToProps,
  { listUsers, deleteUsers }
)(Users);