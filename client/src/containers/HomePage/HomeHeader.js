import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { changeLangugeApp } from '../../store/actions/appActions';
import image from '../../assets/images/header';
import { withRouter } from 'react-router';
class HomeHeader extends Component {
   changLanguge = (lang) => {
      this.props.changeLangugeAppRedux(lang);
   };

   returnHome = () => {
      if (this.props.history) {
         this.props.history.push('/home');
      }
   };

   render() {
      let language = this.props.language;
      return (
         <>
            <div className="home-header-container">
               <div className="home-header-content container ">
                  <div className="d-flex w-75">
                     <div className="left-content">
                        <i className="fas fa-bars"></i>
                        <div className="header-logo" onClick={() => this.returnHome()}></div>
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
                     <div className="d-flex align-items-center">
                        <i className="fas fa-question-circle"></i>
                        <span>Hỗ trợ</span>
                        <span
                           className={
                              language === LANGUAGES.VI
                                 ? 'language-vi active lang'
                                 : 'language-vi lang'
                           }
                           onClick={() => this.changLanguge(LANGUAGES.VI)}>
                           VN
                        </span>
                        <span
                           className={
                              language === LANGUAGES.EN
                                 ? 'language-en active lang'
                                 : 'language-en lang'
                           }
                           onClick={() => this.changLanguge(LANGUAGES.EN)}>
                           EN
                        </span>
                     </div>
                  </div>
               </div>
            </div>
            {!this.props.isShowBanner ? null : (
               <div className="home-banner">
                  <div className="banner-search ">
                     <div className="banner-search-container">
                        <h1>
                           Nền tảng y tế <br></br>
                           <b>chăm sóc sức khỏe toàn diện</b>
                        </h1>
                        <div className="timkiem-form" id="timkiem_form">
                           <div className="timkiem-onhap">
                              <i className="fas fa-search"></i>
                              <input id="timkiem_chung" type="search" placeholder="Tìm gói khám" />
                           </div>
                        </div>
                        <div className="tai-ungdung">
                           <img
                              alt="Tải ứng dụng BookingCare trên Android"
                              src={image.android}
                              width="108"
                              height="32"
                           />
                           <img
                              alt="Tải ứng dụng BookingCare trên iOS"
                              src={image.ios}
                              width="108"
                              height="32"
                           />
                        </div>
                     </div>
                  </div>
                  <div className="luachon py-2">
                     <ul>
                        <li>
                           <div
                              className="dichvu kham-chuyenkhoa luoi-tai"
                              style={{
                                 backgroundImage: `url(${image.chuyenkhoa})`,
                              }}></div>
                           Khám Chuyên khoa
                        </li>
                        <li>
                           <div
                              className="dichvu kham-tuxa luoi-tai"
                              style={{
                                 backgroundImage: `url(${image.tuxa})`,
                              }}></div>
                           Khám từ xa
                        </li>
                        <li>
                           <div
                              className="dichvu kham-tongquat luoi-tai"
                              style={{
                                 backgroundImage: `url(${image.tongquat})`,
                              }}></div>
                           Khám tổng quát
                        </li>
                        <li>
                           <div
                              className="dichvu dichvu-xetnghiem luoi-tai"
                              style={{
                                 backgroundImage: `url(${image.dichvu})`,
                              }}></div>
                           Xét nghiệm y học
                        </li>
                        <li>
                           <div
                              className="dichvu dichvu-xetnghiem luoi-tai"
                              style={{
                                 backgroundImage: `url(${image.suckhoe})`,
                              }}></div>
                           Sức khỏe tinh thần
                        </li>
                        <li>
                           <div
                              className="dichvu kham-nhakhoa luoi-tai"
                              style={{
                                 backgroundImage: `url(${image.nhakhoa})`,
                              }}></div>
                           Khám nha khoa
                        </li>
                     </ul>
                  </div>
               </div>
            )}
         </>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isLoggedIn: state.user.isLoggedIn,
      language: state.app.language,
   };
};

const mapDispatchToProps = (dispatch) => {
   return { changeLangugeAppRedux: (lang) => dispatch(changeLangugeApp(lang)) };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
