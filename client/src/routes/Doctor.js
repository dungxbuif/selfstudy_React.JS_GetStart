import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import MangeShedule from '../containers/System/Doctor/MangeShedule';
import Header from '../containers/Header/Header';

class Doctor extends Component {
   render() {
      return (
         <>
            {this.props.isLoggedIn && <Header />}
            <div className="system-container">
               <div className="system-list">
                  <Switch>
                     <Route path="/doctor/manage-schedule" component={MangeShedule} />
                  </Switch>
               </div>
            </div>
         </>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      systemMenuPath: state.app.systemMenuPath,
      isLoggedIn: state.user.isLoggedIn,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
