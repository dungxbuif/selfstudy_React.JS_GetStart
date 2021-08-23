import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import { getDoctorDetailInfo } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import DoctorSchedule from './DoctorSchedule.js';
import DoctorExtraInfo from './DoctorExtraInfo';
class DetailDoctor extends Component {
   constructor(props) {
      super(props);
      this.state = {
         detailDoctor: {},
      };
   }

   async componentDidMount() {
      if (this.props.match && this.props.match.params && this.props.match.params.id) {
         let doctorID = this.props.match.params.id;
         let res = await getDoctorDetailInfo(doctorID);

         if (res && res.code === 0) {
            this.setState({
               detailDoctor: res.data,
            });
         }
      }
   }

   render() {
      let detailDoctor = this.state.detailDoctor;
      let language = this.props.language;
      let nameVi = '',
         nameEn = '';
      if (detailDoctor && detailDoctor.positionData) {
         nameVi = `${detailDoctor.positionData.valueVi}: ${detailDoctor.lastName} ${detailDoctor.firstName}`;
         nameEn = `${detailDoctor.positionData.valueEn}: ${detailDoctor.firstName} ${detailDoctor.lastName}`;
      }

      return (
         <>
            <HomeHeader isShowBanner={false} />
            <div className="doctor-detail-container">
               <div className="container">
                  <div className="intro-doctor d-flex mb-3">
                     <div className="intro-doctor-left">
                        <div
                           className="intro-doctor-image"
                           style={{
                              backgroundImage: `url(${
                                 detailDoctor.image ? detailDoctor.image : ''
                              })`,
                           }}></div>
                     </div>
                     <div className="intro-doctor-right">
                        <div className="info-top">
                           {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className="info-bottom">
                           {detailDoctor.markDownData && detailDoctor.markDownData.description && (
                              <span>{detailDoctor.markDownData.description}</span>
                           )}
                        </div>
                     </div>
                  </div>
                  <div className="doctor-schedule d-flex">
                     <div className="content-left w-50 py-2">
                        <DoctorSchedule doctorId={detailDoctor.id} />
                     </div>
                     <div className="content-right w-50">
                        <DoctorExtraInfo doctorId={detailDoctor.id} />
                     </div>
                  </div>
               </div>

               <div className="doctor-info-detail">
                  <div className="container">
                     {detailDoctor.markDownData && detailDoctor.markDownData.contentHTML && (
                        <div
                           dangerouslySetInnerHTML={{
                              __html: detailDoctor.markDownData.contentHTML,
                           }}></div>
                     )}
                  </div>
               </div>
               <div className="comment row"></div>
            </div>
         </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
