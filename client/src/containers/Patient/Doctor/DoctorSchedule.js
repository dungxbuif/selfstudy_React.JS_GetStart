import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';

class DoctorSchedule extends Component {
   constructor(props) {
      super(props);
      this.state = {
         allDays: [],
      };
   }

   componentDidMount() {
      this.setSelectTime();
   }

   setSelectTime() {
      let arrDate = [];
      for (let i = 0; i < 7; i++) {
         let obj = {};

         if (this.props.language === LANGUAGES.VI) {
            obj.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            obj.label = obj.label.charAt(0).toUpperCase() + obj.label.slice(1);
         } else {
            obj.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
         }

         obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

         arrDate.push(obj);
      }

      this.setState({
         allDays: arrDate,
      });
   }

   componentDidUpdate(prevProprs, prevStates, snapshot) {
      if (this.props.language !== prevProprs.language) {
         this.setSelectTime();
      }
   }

   async handleOnChangeSelect(event) {
      let doctorId = this.props.doctorId;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);
      console.log(res);
   }

   render() {
      let { allDays } = this.state;
      return (
         <div className="doctor-schedule-container">
            <div className="all-schedule">
               <select
                  className="form-select"
                  onChange={(event) => this.handleOnChangeSelect(event)}>
                  {allDays &&
                     allDays.length &&
                     allDays.map((item) => (
                        <option key={item.value} value={item.value}>
                           {item.label}
                        </option>
                     ))}
               </select>
            </div>
            <div className="all-available-time"></div>
         </div>
      );
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
