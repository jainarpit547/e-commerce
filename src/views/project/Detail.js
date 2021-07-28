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

import {  listProjects,dataProjects,listProjectsDetail } from "./../../actions/projectActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var projectData=[];
var mileData=[];

class ProjectDetail extends Component {
  constructor() {
      super();
      this.state = {
          token: "",
          project_code:"",
          name: "",
          client: "",
          project_id:"",
          manager:"",
          user_type:"",
          submitStatus: false
      };
  }

  componentDidMount() {
    if(localStorage.jwtToken)
    { 
      const token = localStorage.jwtToken;
      const decoded = jwt_decode(token);
      console.log('type from token', decoded.user_type);
      this.setState({ user_type: decoded.user_type});

      if (this.props.match.params){
        this.setState({ project_id: this.props.match.params.id, token: decoded.token });
  
        const proData = {
          project_id: this.props.match.params.id,
          token: decoded.token
        };
  
       this.props.listProjectsDetail(proData);
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
        
          projectData=[];
          mileData=[];
          
            if(nextProps.apiRes.data.id == this.props.match.params.id){ 

               nextProps.apiRes.data.technologies.map((item,i) =>{
                var j = i+1;
                var proObj={
                  s_no:j,
                  name: item.technology.name,
                  type: item.name      
                } 
                 projectData.push(proObj);
                 console.log('proData push',projectData)
               });

               nextProps.apiRes.data.milestones.map((item,i) =>{
                var j = i+1;
                var mileObj={
                  s_no:j,
                  name: item.name,
                  percentage: item.percentage,
                  due_amount: item.due_amount,
                  due_date: item.due_date,
                  realized_amount: item.realized_amount,
                  realized_date: item.realized_date,
                  status: item.status,      
                } 
                 mileData.push(mileObj);
                 console.log('mile data push',mileData)
               });

              if(nextProps.apiRes.data.project_code === null){ 
                this.setState({ project_code: "not available" });
              }else{
                this.setState({ project_code: nextProps.apiRes.data.project_code });
              }
              this.setState({ name: nextProps.apiRes.data.name });
              this.setState({ client: nextProps.apiRes.data.client.name }); 
              this.setState({ manager:  nextProps.apiRes.data.assigned_to_user == null ? "Unassigned" :  nextProps.apiRes.data.assigned_to_user.name}); 
              this.setState( {project_id:nextProps.apiRes.data.id} );         
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
    // if(this.state.submitStatus === true){
    //     this.props.history.push("/users");
    // }
  }



  render() {
    const fields = [
        { key: 's_no' },
        { key: 'name' },
        { key: 'type'},
        { key: 'action' },
    ]
    const milefields = [
      { key: 's_no' },
      { key: 'name' },
      { key: 'percentage'},
      { key: 'due_amount'},
      { key: 'due_date'},
      { key: 'realized_amount'},
      { key: 'realized_date'},
      { key: 'status'},
      { key: 'action' },
  ]
   
    const { name, client, project_code, manager, project_id,user_type, submitStatus } = this.state;
    return (
      <>
        <CRow>
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                Project Details
                <div> 
                   <CButton size="sm" color="info" className="ml-1" to={"/projects/edit/"+project_id}>Edit</CButton>
                   <CButton size="sm" color="danger" className="ml-1">Delete</CButton>
                </div>
              </CCardHeader>
              <CCardBody>
                <CForm className="form-horizontal">
                    
                    <CFormGroup row>
                       <CCol md="2">
                         <CLabel htmlFor="text-input"><b>Project Code :</b></CLabel>
                       </CCol>
                       <CCol xs="12" md="">
                        <p>{project_code}</p>
                         {/* <CInput type="text" placeholder="Employee Code" onChange={this.onChange} name="employee_code" value={employee_code}/> */}
                       </CCol>
                     </CFormGroup>

                     <CFormGroup row>
                       <CCol md="2">
                         <CLabel htmlFor="text-input"><b>Project Name :</b></CLabel>
                       </CCol>
                       <CCol xs="12" md="">
                        <p>{name}</p>
                         {/* <CInput type="text" placeholder="Employee Code" onChange={this.onChange} name="employee_code" value={employee_code}/> */}
                       </CCol>
                     </CFormGroup>

                     <CFormGroup row>
                       <CCol md="2">
                         <CLabel htmlFor="text-input"><b>Client :</b></CLabel>
                       </CCol>
                       <CCol xs="12" md="">
                        <p>{client}</p>
                         {/* <CInput type="text" placeholder="Employee Code" onChange={this.onChange} name="employee_code" value={employee_code}/> */}
                       </CCol>
                     </CFormGroup>
   
                     <CFormGroup row>
                       <CCol md="2">
                         <CLabel htmlFor="text-input"><b>Assigned Manager :</b></CLabel>
                       </CCol>
                       <CCol xs="12" md="">
                        <p>{manager}</p>
                         {/* <CInput type="text" placeholder="Employee Code" onChange={this.onChange} name="employee_code" value={employee_code}/> */}
                       </CCol>
                     </CFormGroup>

                     <CFormGroup row style={{display:'flex',justifyContent:'space-between'}}>
                       <CCol md="2">
                         <CLabel htmlFor="text-input"><b>Technology :</b></CLabel>
                       </CCol>
                       <div style={{marginRight:'20px'}}> 
                           <CButton size="sm" color="info" className="ml-1" to={"/projects/technologies"}>Assign Technology</CButton>
                       </div>
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
                         <CLabel htmlFor="text-input"><b>User :</b></CLabel>
                       </CCol>
                       <div style={{marginRight:'20px'}}> 
                           <CButton size="sm" color="info" className="ml-1" to={"/projects/user"}>Assign User</CButton>
                       </div>
                     </CFormGroup>

                     
                  {(this.state.user_type === "admin" || this.state.user_type === "manager" || this.state.user_type === "sales") && (
                     <div row >
                       <div style={{display:'flex',justifyContent:'space-between', alignItems:'center',marginBottom:"20px"}}> 
                            <CCol md="2" style={{paddingLeft:"0px"}}>
                               <CLabel htmlFor="text-input"><b>Project Milestones :</b></CLabel>
                            </CCol>
                            <div> 
                                <CButton size="sm" color="info" className="ml-1" to={"/projects/milestones"}>Create Milestone</CButton>
                            </div>
                       </div>
                        
                       <CDataTable
                       items={ mileData }
                       fields={milefields}
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
              
                     </div>
                   )}

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

ProjectDetail.propTypes = {
  listProjects: PropTypes.func.isRequired,
  dataProjects: PropTypes.func.isRequired,
  listProjectsDetail:PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  apiRes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  apiRes: state.apiRes
});

export default connect(
  mapStateToProps,
  { dataProjects, listProjects, listProjectsDetail }
)( ProjectDetail );