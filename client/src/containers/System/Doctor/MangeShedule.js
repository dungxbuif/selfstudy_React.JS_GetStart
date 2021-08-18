import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
class ManageSchedule extends Component {
   render() {
      const { isLoggedIn } = this.props;
      return (
         <div className="manage-schedule-container">
            <div className="m-s-title">
               <FormattedMessage id="manage-shedule.title" />
            </div>
         </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
