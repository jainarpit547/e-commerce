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
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { dataTechnologies, updateTechnologies } from "./../../actions/technologiesActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Edittechno extends Component {
  constructor() {
      super();
      this.state = {
          token: "",
          tech_id: "",
          name: "",
          submitStatus: false
      };
  }

  componentDidMount() {
    if(localStorage.jwtToken)
    { 
      const token = localStorage.jwtToken;
      const decoded = jwt_decode(token);
      //console.log('decoded data is ', token);

      if (this.props.match.params){
        this.setState({ tech_id: this.props.match.params.id, token: decoded.token });
  
        const techData = {
          tech_id: this.props.match.params.id,
          token: decoded.token
        };
  
        this.props.dataTechnologies(techData);
      }else{
        this.props.history.push("/technologies");
      }
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
          console.log('techno data is ',nextProps.apiRes.data)
          nextProps.apiRes.data.map((val,i)=>{
            console.log('data is',val )
            if(val.id == this.props.match.params.id){
              this.setState({ name: val.name });
            }
          })
        }else{
          toast.success(nextProps.apiRes.data.message,{
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
  };

  onSubmit = e => {
      e.preventDefault();
      const techUpdateData = {
        tech_id: this.state.tech_id,
        name: this.state.name,
        token: this.state.token
      };

      this.props.updateTechnologies(techUpdateData);
  };

  render() {
    const { name, submitStatus } = this.state;
    return (
      <>
        <CRow>
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader>
                Edit Technologies
              </CCardHeader>
              <CCardBody>
                <CForm className="form-horizontal">
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" placeholder="Name" onChange={this.onChange} name="name" value={name}/>
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

Edittechno.propTypes = {
  dataTechnologies: PropTypes.func.isRequired,
  updateTechnologies: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  apiRes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  apiRes: state.apiRes
});

export default connect(
  mapStateToProps,
  { dataTechnologies, updateTechnologies }
)(Edittechno);