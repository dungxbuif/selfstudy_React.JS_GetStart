import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import HomeFooter from './HomeFooter';
class HomePage extends Component {
   render() {
      return (
         <div>
            <HomeHeader />
            <Specialty />
            {/* <div style={{ height: '500px' }}>
               <iframe
                  src="https://www.youtube.com/watch?v=147SkAVXEqM&list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI&index=53&t=133s"
                  title="Youtube test iframe"
                  frameBorder="0"></iframe>
            </div> */}
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
