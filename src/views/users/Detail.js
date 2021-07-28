import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store from "./../../store";
import ChipInput from 'material-ui-chip-input';
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
import CIcon from '@coreui/icons-react'

import {  listUsers,dataUsers,deleteUsers } from "./../../actions/usersActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var projectData=[];
var skillData=[]

class UserDetail extends Component {
  constructor() {
      super();
      this.state = {
          token: "",
          employee_code:"",
          name: "",
          email: "",
          user_id:"",
          user_type:"",
          submitStatus: false
      };
  }

  componentDidMount() {
    if(localStorage.jwtToken)
    { 
      const token = localStorage.jwtToken;
      const decoded = jwt_decode(token);

      if (this.props.match.params){
        this.setState({ user_id: this.props.match.params.id, token: decoded.token });
  
        const userData = {
          user_id: this.props.match.params.id,
          token: decoded.token
        };
  
       this.props.dataUsers(userData);
      }else{
        this.props.history.push("/users");
      }

      const userData = {
        user_type: 1,
        token: decoded.token
      };
      this.props.listUsers(userData)
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
          projectData=[];
          skillData=[];
          for (let index = 0; index < nextProps.apiRes.data.length; index++) {
            if(nextProps.apiRes.data[index].id == this.props.match.params.id){ 

               nextProps.apiRes.data[index].projects.map((item,i) =>{
                var j = i+1;
                var proObj={
                  s_no:j,
                  name: item.project.name      
                } 
                 projectData.push(proObj);
                // console.log('proData push',projectData)
               });

               nextProps.apiRes.data[index].skills.map((item,i) =>{
                var j = i+1;
                var skillObj={
                  s_no:j,
                  name:item.technology.name,
                  proficiency: item.proficiency,      
                } 
                 skillData.push(skillObj);
                // console.log('proData push',projectData)
               });
              if(nextProps.apiRes.data[index].employee_code === null){ 
                this.setState({ employee_code: "not available" });
              }else{
                this.setState({ employee_code: nextProps.apiRes.data[index].employee_code });
              }
              this.setState({ name: nextProps.apiRes.data[index].name });
              this.setState({ email: nextProps.apiRes.data[index].email }); 
              this.setState({ user_type: nextProps.apiRes.data[index].user_type }); 
              this.setState( {user_id:nextProps.apiRes.data[index].id} );         
            }
          }
          //console.log('final projectdata is ',projectData)
          
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
        // this.setState({ user_id:""});
        // this.setState({ resource: "" });
        // this.setState({ project_id:"" });

        if(nextProps.apiRes.config.url === "/api/v1/projects"){ 
          this.setState({ proinfo: nextProps.apiRes.data})
        }else if(nextProps.apiRes.config.url === "/api/v1/users"){
          this.setState({ userinfo: nextProps.apiRes.data})
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
    if(this.state.submitStatus === true){
        this.props.history.push("/users");
    }
  }

  onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
      
  };

  onSubmit = e => {
    this.setState({submitStatus:true});
    //console.log('submit status is',this.submitStatus)

    e.preventDefault();
    const userData = {
      project_id: parseInt(this.state.project_id),
      resource: this.state.resource,
      user_id: parseInt(this.state.user_id),
      token: this.state.token
    };  
   // console.log('data after submit is ', userData)
    this.props.assignProject(userData);
    
  };

  deleteUser = e => {
    const userData = {
      user_id: e,
      token: this.state.token
    };
      
    this.props.deleteUsers(userData);
  };

  render() {
    const fields = [
        { key: 's_no' },
        { key: 'name' },
        { key: 'action' },
    ]
    const skillfields = [
      { key: 's_no' },
      { key: 'name' },
      { key: 'proficiency' },
      { key: 'action' },
  ]
   
    const { name, email, employee_code, user_type, projects_id, user_id, resource, proinfo, userinfo, submitStatus } = this.state;
    return (
      <>
        <CRow>
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                User Details
                <div> 
                   <CButton size="sm" color="info" className="ml-1" to={"/users/edit/"+user_id}>Edit</CButton>
                   <CButton size="sm" color="danger" className="ml-1" onClick={() => {if(window.confirm('Are you sure you want to delete this?')){this.deleteUser(user_id)};}}>Delete</CButton>
                </div>
              </CCardHeader>
              <CCardBody>
                <CForm className="form-horizontal">
                    
                    <CFormGroup row>
                       <CCol md="2">
                         <CLabel htmlFor="text-input"><b>Employee Code :</b></CLabel>
                       </CCol>
                       <CCol xs="12" md="">
                        <p>{employee_code}</p>
                         {/* <CInput type="text" placeholder="Employee Code" onChange={this.onChange} name="employee_code" value={employee_code}/> */}
                       </CCol>
                     </CFormGroup>

                     <CFormGroup row>
                       <CCol md="2">
                         <CLabel htmlFor="text-input"><b>Name :</b></CLabel>
                       </CCol>
                       <CCol xs="12" md="">
                        <p>{name}</p>
                         {/* <CInput type="text" placeholder="Employee Code" onChange={this.onChange} name="employee_code" value={employee_code}/> */}
                       </CCol>
                     </CFormGroup>

                     <CFormGroup row>
                       <CCol md="2">
                         <CLabel htmlFor="text-input"><b>Email :</b></CLabel>
                       </CCol>
                       <CCol xs="12" md="">
                        <p>{email}</p>
                         {/* <CInput type="text" placeholder="Employee Code" onChange={this.onChange} name="employee_code" value={employee_code}/> */}
                       </CCol>
                     </CFormGroup>
   
                     <CFormGroup row>
                       <CCol md="2">
                         <CLabel htmlFor="text-input"><b>User Type :</b></CLabel>
                       </CCol>
                       <CCol xs="12" md="">
                        <p>{user_type}</p>
                         {/* <CInput type="text" placeholder="Employee Code" onChange={this.onChange} name="employee_code" value={employee_code}/> */}
                       </CCol>
                     </CFormGroup>

                     <CFormGroup row style={{display:'flex',justifyContent:'space-between'}}>
                       <CCol md="2">
                         <CLabel htmlFor="text-input"><b>User Projects :</b></CLabel>
                       </CCol>
                       {/* <div style={{marginRight:'20px'}}> 
                           <CButton size="sm" color="info" className="ml-1" to={"/users/project/"}>Add new project</CButton>
                       </div> */}
                     </CFormGroup>

                     <CDataTable
                items={projectData}
                fields={fields}
                striped
                itemsPerPage={10}
                pagination
                 scopedSlots = {{
                  'action':
                      (item, index)=>{
                        return (
                          <CCardBody>
                           <CButton size="sm" color="danger" className="ml-1" onClick={() => {if(window.confirm('Are you sure you want to delete this?')){this.deleteUser(item.user_id)};}}>Delete</CButton>
                          </CCardBody>
                       )
                     }
                }}
              />

                         <CFormGroup row style={{display:'flex',justifyContent:'space-between'}}>
                             <CCol md="2">
                               <CLabel htmlFor="text-input"><b>User Skills :</b></CLabel>
                             </CCol>
                            <div style={{marginRight:'20px'}}> 
                               <CButton size="sm" color="info" className="ml-1" to={"/users/skill/"}>Add new skill</CButton>
                            </div>
                         </CFormGroup>

                         <CDataTable
                items={skillData}
                fields={skillfields}
                striped
                itemsPerPage={10}
                pagination
                 scopedSlots = {{
                  'action':
                      (item, index)=>{
                        return (
                          <CCardBody>
                           <CButton size="sm" color="danger" className="ml-1" onClick={() => {if(window.confirm('Are you sure you want to delete this?')){this.deleteUser(item.user_id)};}}>Delete</CButton>
                          </CCardBody>
                       )
                     }
                }}
              />

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

UserDetail.propTypes = {
  listUsers: PropTypes.func.isRequired,
  dataUsers: PropTypes.func.isRequired,
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
  { dataUsers, listUsers, deleteUsers }
)(UserDetail);