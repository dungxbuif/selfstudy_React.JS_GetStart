import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLangugeApp } from '../../store/actions/appActions';
class HomeFooter extends Component {
   changLanguge = (lang) => {
      this.props.changeLangugeAppRedux(lang);
   };

   render() {
      return (
         <div
            style={{
               background: '#64b9e5',
               height: '100px',
               marginTop: '1000px',
            }}>
            @BuifDungx
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
   return { changeLangugeAppRedux: (lang) => dispatch(changeLangugeApp(lang)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
