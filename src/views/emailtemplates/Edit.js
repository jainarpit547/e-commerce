import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CTextarea,
  CInput,
  CLabel,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { dataEmail, updateEmail } from "./../../actions/emailtempActions"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Editemail extends Component {
  constructor() {
      super();
      this.state = {
          email_id: "",
          title:"",
          subject:"",
          content:""
      };
  }

  componentDidMount() {
    if (this.props.match.params){
      this.setState({ email_id: this.props.match.params.id });

      const emailData = {
        email_id: this.props.match.params.id
      };

      this.props.dataEmail(emailData);
    }else{
      this.props.history.push("/email");
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.apiRes) {
      if(nextProps.apiRes.status === 200)
      {
        console.log(nextProps.apiRes)
        if(nextProps.apiRes.success == null)
        {
          this.setState({ title: nextProps.apiRes.data.title, subject: nextProps.apiRes.data.subject, content: nextProps.apiRes.data.content });
        }else{
          console.log('2')
          toast.success(nextProps.apiRes.message, {
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
        toast.error(nextProps.apiRes.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          this.props.history.push("/email");
        }, 1200)
      }
    }
  }

  onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
      e.preventDefault();
      const emailData = {
          email_id: this.state.email_id,
          title: this.state.title,
          subject: this.state.subject,
          content: this.state.content
      };
      //console.log(emailData)
      this.props.updateEmail(emailData);
  };

  handleSubmit = e => {
    this.onSubmit(e);
  };

  render() {
    const { title, subject, content } = this.state;
    return (
      <>
        <CRow>
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader>
                Edit
              </CCardHeader>
              <CCardBody>
                <CForm onSubmit={this.onSubmit} className="form-horizontal">
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Title</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" placeholder="Title" onChange={this.onChange} name="title" value={title}/>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Subject</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" placeholder="Subject" onChange={this.onChange} name="subject" value={subject}/>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="textarea-input">Content</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CTextarea 
                        name="content" 
                        id="textarea-input" 
                        rows="9"
                        placeholder="Content..." 
                        onChange={this.onChange}
                        value={content}
                      />
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton type="button" size="sm" color="primary" onClick={this.handleSubmit}><CIcon name="cil-scrubber" /> Update</CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>

        <ToastContainer />
      </>
    );
  }
}

Editemail.propTypes = {
  dataEmail: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  apiRes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  apiRes: state.apiRes
});

export default connect(
  mapStateToProps,
  { dataEmail, updateEmail }
)(Editemail);