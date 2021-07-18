import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';

import { LANGUAGES } from '../../utils';

class Header extends Component {
   handleChangeLang(lang) {
      this.props.changeLangugeAppRedux(lang);
   }

   render() {
      const { processLogout, language } = this.props;
      return (
         <div className="header-container">
            {/* thanh navigator */}
            <div className="header-tabs-container">
               <Navigator menus={adminMenu} />
            </div>
            {/* nút logout */}
            <div className="languages">
               <span
                  className={
                     language === LANGUAGES.VI
                        ? 'language-vi active '
                        : 'language-vi lang'
                  }
                  onClick={() => this.handleChangeLang(LANGUAGES.VI)}>
                  VN
               </span>
               <span
                  className={
                     language === LANGUAGES.EN
                        ? 'language-en active mx-2'
                        : 'language-en mx-2'
                  }
                  onClick={() => this.handleChangeLang(LANGUAGES.EN)}>
                  EN
               </span>

               <div
                  className="btn btn-logout"
                  onClick={processLogout}
                  title="Log out">
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
