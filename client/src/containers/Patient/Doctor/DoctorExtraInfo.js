import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorExtraInfo.scss';

class DoctorExtraInfo extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   componentDidMount() {}

   componentDidUpdate(prevProprs, prevStates, snapshot) {
      if (this.props.language !== prevProprs.language) {
      }
   }

   render() {
      return <div className="doctor-extra-info-container">Test extra doctor info </div>;
   }
}

const mapStateToProps = (state) => {
   return {
      language: state.app.language,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
