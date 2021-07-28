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

import { dataSkill, updateSkill } from "./../../actions/skillActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Editskill extends Component {
  constructor() {
      super();
      this.state = {
          token: "",
          skill_id: "",
          name: "",
          submitStatus: false
      };
  }

  componentDidMount() {
    if(localStorage.jwtToken)
    { 
      const token = localStorage.jwtToken;
      const decoded = jwt_decode(token);

      if (this.props.match.params){
        this.setState({ skill_id: this.props.match.params.id, token: decoded.token });
  
        const skillData = {
          skill_id: this.props.match.params.id,
          token: decoded.token
        };
  
        this.props.dataSkill(skillData);
      }else{
        this.props.history.push("/skill");
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
          this.setState({ name: nextProps.apiRes.data.name });
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
      const skillUpdateData = {
        skill_id: this.state.skill_id,
        name: this.state.name,
        token: this.state.token
      };

      this.props.updateSkill(skillUpdateData);
  };

  render() {
    const { name, submitStatus } = this.state;
    return (
      <>
        <CRow>
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader>
                Edit Skill
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

Editskill.propTypes = {
  dataSkill: PropTypes.func.isRequired,
  updateSkill: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  apiRes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  apiRes: state.apiRes
});

export default connect(
  mapStateToProps,
  { dataSkill, updateSkill }
)(Editskill);