import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';

import { LANGUAGES, USER_ROLE } from '../../utils';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';

class Header extends Component {
   constructor(props) {
      super(props);
      this.state = {
         menuApp: [],
      };
   }

   handleChangeLang(lang) {
      this.props.changeLangugeAppRedux(lang);
   }

   componentDidMount() {
      let { userInfo } = this.props;
      let menu = [];
      if (userInfo && !_.isEmpty(userInfo)) {
         let role = userInfo.roleId;
         if (role === USER_ROLE.ADMIN) {
            menu = adminMenu;
         }

         if (role === USER_ROLE.DOCTOR) {
            menu = doctorMenu;
         }
      }
      this.setState({ menuApp: menu });
   }

   render() {
      const { processLogout, language, userInfo } = this.props;
      return (
         <div className="header-container">
            {/* thanh navigator */}
            <div className="header-tabs-container">
               <Navigator menus={this.state.menuApp} />
            </div>
            {/* nút logout */}
            <div className="languages">
               <span className="welcome">
                  <FormattedMessage id="home-header.welcome" />
                  {userInfo && userInfo.username ? userInfo.username : ''}
               </span>
               <span
                  className={language === LANGUAGES.VI ? 'language-vi active ' : 'language-vi lang'}
                  onClick={() => this.handleChangeLang(LANGUAGES.VI)}>
                  VN
               </span>
               <span
                  className={
                     language === LANGUAGES.EN ? 'language-en active mx-2' : 'language-en mx-2'
                  }
                  onClick={() => this.handleChangeLang(LANGUAGES.EN)}>
                  EN
               </span>

               <div className="btn btn-logout" onClick={processLogout} title="Log out">
                  <i className="fas fa-sign-out-alt"></i>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isLoggedIn: state.user.isLoggedIn,
      userInfo: state.user.userInfo,
      language: state.app.language,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      processLogout: () => dispatch(actions.processLogout()),
      changeLangugeAppRedux: (lang) => dispatch(actions.changeLangugeApp(lang)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
