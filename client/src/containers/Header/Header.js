import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';

import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';

class Header extends Component {
   handleChangeLang(lang) {
      this.props.changeLangugeAppRedux(lang);
   }

   componentDidMount() {}

   render() {
      const { processLogout, language, userInfo } = this.props;
      return (
         <div className='header-container'>
            {/* thanh navigator */}
            <div className='header-tabs-container'>
               <Navigator menus={adminMenu} />
            </div>
            {/* nút logout */}
            <div className='languages'>
               <span className='welcome'>
                  <FormattedMessage id='home-header.welcome' />
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

               <div className='btn btn-logout' onClick={processLogout} title='Log out'>
                  <i className='fas fa-sign-out-alt'></i>
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
