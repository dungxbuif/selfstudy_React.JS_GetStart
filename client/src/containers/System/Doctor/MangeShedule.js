import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import * as actions from '../../../store/actions';
import Select from 'react-select';
import { getDoctorDetailInfo, saveBulkDchedule } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import moment, { unix } from 'moment';
class ManageSchedule extends Component {
   constructor(props) {
      super(props);
      this.state = {
         selectedDoctor: '',
         listDoctors: [],
         currentDate: '',
         rangeTime: [],
      };
   }

   componentDidMount() {
      this.props.fetchALllDoctors();
      this.props.fetchAllScheduleHours();
   }

   componentDidUpdate(prevProps, prevStates, snapShot) {
      if (prevProps.allDoctors !== this.props.allDoctors) {
         this.convertDataToSelect();
      }
      if (prevProps.language !== this.props.language) {
         this.convertDataToSelect();
      }
      if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
         let data = this.props.allScheduleTime;
         if (data && data.length) {
            data.forEach((item) => {
               item.isSelected = false;
            });
         }
         this.setState({
            rangeTime: this.props.allScheduleTime,
         });
      }
   }

   convertDataToSelect = () => {
      let arr = [...this.props.allDoctors];
      let { language } = this.props;

      if (this.props.allDoctors && this.props.allDoctors.length > 0) {
         this.setState({
            listDoctors: arr.map((item) => ({
               label:
                  language === LANGUAGES.VI
                     ? `${item.lastName} ${item.firstName}`
                     : `${item.firstName} ${item.lastName}`,
               value: item.id,
            })),
         });
      }
      return [];
   };

   handleChange = async (selectedDoctor) => {
      this.setState({ selectedDoctor });

      let res = await getDoctorDetailInfo(selectedDoctor.value);
      // if (res && res.code === 0 && res.data && res.data.markDownData) {
      //    let markdown = res.data.markDownData;
      //    this.setState({
      //       contentMarkdown: markdown.contentMarkdown,
      //       description: markdown.description,
      //       hasExisted: true,
      //    });
      // } else {
      //    this.setState({
      //       contentMarkdown: '',
      //       description: '',
      //       hasExisted: false,
      //    });
      // }
      console.log(res);
   };

   handleOnChangeDatePicker = (date) => {
      this.setState({
         currentDate: date[0],
      });
      console.log(date);
   };

   handleButtonTime = (index) => {
      let tmp = this.state.rangeTime;
      tmp[index].isSelected = !tmp[index].isSelected;
      this.setState({
         rangeTime: tmp,
      });
   };

   handleSave = async () => {
      let { rangeTime, selectedDoctor, currentDate } = this.state;
      if (!selectedDoctor) {
         toast.error('Please select a doctor');
         return;
      }

      if (!currentDate) {
         toast.error('Please choose a day');
         return;
      }
      // currentDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);

      if (rangeTime && rangeTime.length) {
         let selectedTime = rangeTime.filter((item) => item.isSelected);
         if (!selectedTime.length) {
            toast.error('Please choose at least one time');
            return;
         }

         var result = selectedTime.map((item) => ({
            doctorId: selectedDoctor.value,
            date: new Date(currentDate).getTime(),
            timeType: item.keyMap,
         }));
      }

      let res = await saveBulkDchedule(result);
   };

   render() {
      let { rangeTime } = this.state;
      let { language } = this.props;
      return (
         <div className="manage-schedule-container">
            <div className="m-s-title my-3">
               <FormattedMessage id="manage-shedule.title" />
            </div>
            <div className="container">
               <div className="row">
                  <div className="col-6 form-group">
                     <label>
                        <FormattedMessage id="manage-shedule.choose-doctor" />
                     </label>
                     <Select
                        value={this.state.selectedDoctor}
                        onChange={this.handleChange}
                        options={this.state.listDoctors}
                     />
                  </div>
                  <div className="col-6 form-group">
                     <label>
                        <FormattedMessage id="manage-shedule.choose-date" />
                     </label>
                     <DatePicker
                        className="form-control"
                        onChange={(date) => this.handleOnChangeDatePicker(date)}
                        selected={this.state.currentDate}
                        minDate={new Date()}
                     />
                  </div>
                  <div className="col-12 pick-hour-container y-3">
                     {rangeTime &&
                        rangeTime.length &&
                        rangeTime.map((item, index) => (
                           <button
                              className={item.isSelected ? 'btn btn-warning' : 'btn btn-nomarl'}
                              onClick={() => this.handleButtonTime(index)}
                              key={index}>
                              {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                           </button>
                        ))}
                  </div>
                  <div className="col-12">
                     <button className="btn btn-primary mt-3" onClick={() => this.handleSave()}>
                        <FormattedMessage id="manage-shedule.save" />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      language: state.app.language,
      allDoctors: state.admin.allDoctors,
      allScheduleTime: state.admin.allScheduleTime,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      fetchALllDoctors: () => dispatch(actions.fetchALllDoctors()),
      fetchAllScheduleHours: () => dispatch(actions.fetchAllScheduleHours()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
