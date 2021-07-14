import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';

class HomeHeader extends Component {
   render() {
      return (
         <div className="home-header-container">
            <div className="home-header-content container ">
               <div className="row">
                  <div className="left-content">
                     <i className="fas fa-bars"></i>
                     <div className="header-logo"></div>
                  </div>
                  <div className="center-content">
                     <div className="child-content">
                        <div className="child-title">
                           <b>Chuyên khoa</b>
                        </div>
                        <div className="child-descript">
                           Tìm bác sỹ theo chuyên khoa
                        </div>
                     </div>

                     <div className="child-content">
                        <div className="child-title">
                           <b>Cơ sở y tế</b>
                        </div>
                        <div className="child-descript">
                           Chọn bệnh viện phòng khám
                        </div>
                     </div>

                     <div className="child-content">
                        <div className="child-title">
                           <b>Gói khám</b>
                        </div>
                        <div className="child-descript">
                           Khám sức khỏe tổng quát
                        </div>
                     </div>

                     <div className="child-content">
                        <div className="child-title">
                           <b>Bác sỹ</b>
                        </div>
                        <div className="child-descript">Chọn bác sỹ giỏi</div>
                     </div>
                  </div>
               </div>
               <div className="right-content">
                  <div>
                     <i class="fas fa-question-circle"></i>
                     <span>Hỗ trợ</span>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isLoggedIn: state.user.isLoggedIn,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
