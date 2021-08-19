import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import * as actions from '../../../store/actions';
import Select from 'react-select';
import { getDoctorDetailInfo } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
class ManageSchedule extends Component {
   constructor(props) {
      super(props);
      this.state = {
         selectedDoctor: '',
         listDoctors: [],
         currentDate: '',
      };
   }

   componentDidMount() {
      this.props.fetchALllDoctors();
   }

   componentDidUpdate(prevProps, prevStates, snapShot) {
      if (prevProps.allDoctors !== this.props.allDoctors) {
         this.convertDataToSelect();
      }
      if (prevProps.language !== this.props.language) {
         this.convertDataToSelect();
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
   };

   render() {
      return (
         <div className="manage-schedule-container">
            <div className="m-s-title my-3">
               <FormattedMessage id="manage-shedule.title" />
            </div>
            <div className="container">
               <div className="row">
                  <div className="col-6 form-group">
                     <label>Chọn bác sỹ</label>
                     <Select
                        value={this.state.selectedDoctor}
                        onChange={this.handleChange}
                        options={this.state.listDoctors}
                     />
                  </div>
                  <div className="col-6 form-group">
                     <label>Chọn ngày</label>
                     <DatePicker
                        className="form-control"
                        onChange={this.handleOnChangeDatePicker}
                        selected={this.state.currentDate}
                        minDate={new Date()}
                     />
                  </div>
                  <div className="col-12 pick-hour-container"></div>
                  <button className="btn btn-primary mt-3">Lưu thông tin</button>
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
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      fetchALllDoctors: () => dispatch(actions.fetchALllDoctors()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
