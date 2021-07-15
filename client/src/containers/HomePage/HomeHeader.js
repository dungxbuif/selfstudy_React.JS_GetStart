import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';

class HomeHeader extends Component {
   render() {
      return (
         <>
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
                              <b>
                                 <FormattedMessage id="home-header.speciality" />
                              </b>
                           </div>
                           <div className="child-descript">
                              <FormattedMessage id="home-header.search-doctor" />
                           </div>
                        </div>

                        <div className="child-content">
                           <div className="child-title">
                              <b>
                                 <FormattedMessage id="home-header.health-facility" />
                              </b>
                           </div>
                           <div className="child-descript">
                              <FormattedMessage id="home-header.choose-hospital" />
                           </div>
                        </div>

                        <div className="child-content">
                           <div className="child-title">
                              <b>
                                 <FormattedMessage id="home-header.medical-combo" />
                              </b>
                           </div>
                           <div className="child-descript">
                              <FormattedMessage id="home-header.health-check" />
                           </div>
                        </div>

                        <div className="child-content">
                           <div className="child-title">
                              <b>
                                 <FormattedMessage id="home-header.doctor" />
                              </b>
                           </div>
                           <div className="child-descript">
                              <FormattedMessage id="home-header.choose-doc" />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="right-content">
                     <div className="row">
                        <i className="fas fa-question-circle"></i>
                        <span>Hỗ trợ</span>
                        <div className="lang-vi">VN</div>
                        <div className="lang-en">EN</div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="home-banner">
               <div className="banner-search">
                  <div className="banner-search-container">
                     <h1>
                        Nền tảng y tế <br></br>
                        <b>chăm sóc sức khỏe toàn diện</b>
                     </h1>
                     <div className="timkiem-form" id="timkiem_form">
                        <div className="timkiem-onhap">
                           <i className="fas fa-search"></i>
                           <input
                              id="timkiem_chung"
                              type="search"
                              placeholder="Tìm gói khám"
                           />
                        </div>
                     </div>
                     <div className="tai-ungdung">
                        <img
                           alt="Tải ứng dụng BookingCare trên Android"
                           src="https://bookingcare.vn//assets/icon/google-play-badge.svg"
                           width="108"
                           height="32"
                        />
                        <img
                           alt="Tải ứng dụng BookingCare trên iOS"
                           src="https://bookingcare.vn//assets/icon/app-store-badge-black.svg"
                           width="108"
                           height="32"
                        />
                     </div>
                  </div>
               </div>
               <div className="luachon">
                  <ul>
                     <li>
                        <div className="dichvu kham-chuyenkhoa luoi-tai"></div>
                        Khám Chuyên khoa
                     </li>
                     <li>
                        <div className="dichvu kham-tuxa luoi-tai"></div>
                        Khám từ xa
                     </li>
                     <li>
                        <div className="dichvu kham-tongquat luoi-tai"></div>
                        Khám tổng quát
                     </li>
                     <li>
                        <div className="dichvu dichvu-xetnghiem luoi-tai"></div>
                        Xét nghiệm y học
                     </li>
                     <li>
                        <div className="dichvu dichvu-xetnghiem luoi-tai"></div>
                        Sức khỏe tinh thần
                     </li>
                     <li>
                        <div className="dichvu kham-nhakhoa luoi-tai"></div>
                        Khám nha khoa
                     </li>
                  </ul>
               </div>
            </div>
         </>
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
