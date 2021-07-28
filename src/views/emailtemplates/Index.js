import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton
} from '@coreui/react'

import { listEmail } from "../../actions/emailtempActions"

var emailData = [];

class Email extends Component {
  componentDidMount() {
    this.props.listEmail();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.apiRes) {
      if(nextProps.apiRes.status === 200)
      {
        emailData = [];
        var data = nextProps.apiRes.data;

        for (var i = 0; i < data.length; i++) {
          var j = i+1;
          var dataArr = {
            s_no : j,
            title : data[i].title,
            subject : data[i].subject,
            slug : data[i].slug,
            email_id : data[i].id
          }
          
          emailData.push(dataArr);
        }
      }
    }
  }

  render() {
    const fields = [
      { key: 's_no' },
      { key: 'title' },
      { key: 'subject' },
      { key: 'slug' },
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
                items={emailData}
                fields={fields}
                striped
                itemsPerPage={10}
                pagination
                scopedSlots = {{
                  'action':
                      (item, index)=>{
                        return (
                          <CCardBody>
                            <CButton size="sm" color="info" className="ml-1" to={"/editemail/"+item.email_id}>Edit</CButton>
                            <CButton size="sm" color="danger" className="ml-1" to={"/delemail/"+item.email_id}>Delete</CButton>
                          </CCardBody>
                      )
                    }
                }}
              />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}

Email.propTypes = {
  listEmail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  apiRes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  apiRes: state.apiRes
});

export default connect(
  mapStateToProps,
  { listEmail }
)(Email);