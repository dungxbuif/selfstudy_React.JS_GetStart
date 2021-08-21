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
         allCalendar: [],
      };
   }

   componentDidMount() {
      this.setSelectTime();
   }

   async setAllCalendar(date) {
      let doctorId = this.props.doctorId;
      let res = await getScheduleDoctorByDate(doctorId, date);
      this.setState({
         allCalendar: res.data,
      });
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

         if (i === 0) {
            this.setState({
               selectedCalendar: obj.value,
            });
         }

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
      if (prevProprs.doctorId !== this.props.doctorId) {
         let date = moment().startOf('day').valueOf();
         this.setAllCalendar(date);
      }
   }

   handleOnChangeSelect(event) {
      let date = event.target.value;
      this.setAllCalendar(date);
   }

   render() {
      let { allDays, allCalendar } = this.state;
      let { language } = this.props;
      return (
         <div className="doctor-schedule-container">
            <div className="all-schedule mb-3">
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
            <div className="all-available-time">
               <div className="calendar my-1">
                  <span>
                     <i className="fas fa-calendar-alt"></i> Lịch khám bệnh
                  </span>
               </div>
               <div className="time-content py-1">
                  {allCalendar && allCalendar.length
                     ? allCalendar.map((item) => (
                          <button
                             className={
                                language === LANGUAGES.VI
                                   ? 'btn btn-calendar mb-1'
                                   : 'btn btn-calendar en-width mb-1'
                             }
                             key={item.id}>
                             {language === LANGUAGES.VI
                                ? item.scheduleData.valueVi
                                : item.scheduleData.valueEn}
                          </button>
                       ))
                     : null}
               </div>
            </div>
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