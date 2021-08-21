import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import HomeFooter from './HomeFooter';
class HomePage extends Component {
   render() {
      return (
         <div>
            <HomeHeader isShowBanner={true} />
            <Specialty />
            <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
