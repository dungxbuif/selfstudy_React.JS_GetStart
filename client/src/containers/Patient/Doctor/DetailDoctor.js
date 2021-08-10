import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';

class DetailDoctor extends Component {
   render() {
      console.log(this.props.match.params.id);
      return (
         <>
            <HomeHeader isShowBanner={false} />
            <div className="doctor-detail-container container">
               <div className="intro-doctor row">
                  <div className="intro-doctor-left"></div>
                  <div className="intro-doctor-right">
                     <div className="info-top">Phó giáo sư</div>
                     <div className="info-bottom">
                        dfsdf dfg ds s sedfsdfdfds dfdf ds dsfsdf dv d
                     </div>
                  </div>
               </div>
               <div className="doctor-schedule row"></div>
               <div className="doctor-info-detail row"></div>
               <div className="comment row"></div>
            </div>
         </>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      DetailDoctorMenuPath: state.app.DetailDoctorMenuPath,
      isLoggedIn: state.user.isLoggedIn,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
