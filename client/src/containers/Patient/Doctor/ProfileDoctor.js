import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProfileDoctor.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { getProfileDoctorInfoById } from '../../../services/userService';

class ProfileDoctor extends Component {
   constructor(props) {
      super(props);
      this.state = {
         dataProfile: {},
      };
   }

   async componentDidMount() {
      let data = await this.getDoctorInfo(this.props.doctorId);
      this.setState({
         dataProfile: data,
      });
   }

   getDoctorInfo = async (id) => {
      let res = await getProfileDoctorInfoById(id);
      let result = {};
      if (res.code === 0 && res) {
         result = res.data;
      }
      return result;
   };

   async componentDidUpdate(prevProprs, prevStates, snapshot) {
      if (this.props.language !== prevProprs.language) {
      }
      if (this.props.doctorId !== prevProprs.doctorId) {
         let data = await this.getDoctorInfo(this.props.doctorId);
         this.setState({
            dataProfile: data,
         });
      }
   }

   render() {
      let { dataProfile } = this.state;
      let language = this.props.language;
      let nameVi = '',
         nameEn = '';
      if (dataProfile && dataProfile.positionData) {
         nameVi = `${dataProfile.positionData.valueVi}: ${dataProfile.lastName} ${dataProfile.firstName}`;
         nameEn = `${dataProfile.positionData.valueEn}: ${dataProfile.firstName} ${dataProfile.lastName}`;
      }
      return (
         <div className="intro-doctor d-flex mb-3">
            <div className="intro-doctor-left">
               <div
                  className="intro-doctor-image"
                  style={{
                     backgroundImage: `url(${dataProfile.image ? dataProfile.image : ''})`,
                  }}></div>
            </div>
            <div className="intro-doctor-right">
               <div className="info-top">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
               <div className="info-bottom">
                  {dataProfile.markDownData && dataProfile.markDownData.description && (
                     <span>{dataProfile.markDownData.description}</span>
                  )}
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      language: state.app.language,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
