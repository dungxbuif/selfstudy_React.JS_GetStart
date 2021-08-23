import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';
class DoctorSchedule extends Component {
   constructor(props) {
      super(props);
      this.state = {
         allDays: [],
         allCalendar: [],
         isOpenModal: false,
         dataSchedule: {},
      };
   }

   componentDidMount() {
      this.setSelectTime();
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

   async setAllCalendar(date) {
      let doctorId = this.props.doctorId;
      let res = await getScheduleDoctorByDate(doctorId, date);
      this.setState({
         allCalendar: res.data,
      });
   }

   setSelectTime = () => {
      let arrDate = [];
      for (let i = 0; i < 7; i++) {
         let obj = {};
         let isLangVi = this.props.language === LANGUAGES.VI;

         if (isLangVi) {
            obj.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            obj.label = obj.label.charAt(0).toUpperCase() + obj.label.slice(1);
         } else {
            obj.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
         }

         obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

         if (i === 0) {
            let WEEKEND_DAY = obj.label.split(' -')[0];
            obj.label = obj.label.replace(WEEKEND_DAY, isLangVi ? 'Hôm nay' : 'Today');
         }

         if (i === 1) {
            let WEEKEND_DAY = obj.label.split(' -')[0];
            obj.label = obj.label.replace(WEEKEND_DAY, isLangVi ? 'Ngày Mai' : 'Tomorrow');
         }

         arrDate.push(obj);
      }

      this.setState({
         allDays: arrDate,
      });
   };

   handleOnChangeSelect = (event) => {
      let date = event.target.value;
      this.setAllCalendar(date);
   };

   handleClickScheduleTime = (item) => {
      this.setState({
         isOpenModal: true,
         dataSchedule: item,
      });
   };

   toggleModal = () => {
      this.setState({
         isOpenModal: !this.state.isOpenModal,
      });
   };

   render() {
      let { allDays, allCalendar } = this.state;
      let { language } = this.props;
      return (
         <>
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
                     <span className="text-uppercase">
                        <i className="fas fa-calendar-alt"></i>{' '}
                        <FormattedMessage id="patient.detail-doctor.schesule" />
                     </span>
                  </div>
                  <div className="time-content py-1">
                     {allCalendar && allCalendar.length
                        ? allCalendar.map((item) => (
                             <button
                                onClick={() => this.handleClickScheduleTime(item)}
                                className={
                                   language === LANGUAGES.VI
                                      ? 'btn btn-calendar mb-1 py-2'
                                      : 'btn btn-calendar mb-1 py-2 en-width'
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

            <BookingModal
               dataSchedule={this.state.dataSchedule}
               toggleModal={this.toggleModal}
               isOpenModal={this.state.isOpenModal}
            />
         </>
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
