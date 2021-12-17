import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import NumberFormat from 'react-number-format';
import ProfileDoctor from '../ProfileDoctor';
import DatePicker from '../../../../components/Input/DatePicker';
import Select from 'react-select';
import * as actions from '../../../../store/actions';
class BookingModal extends Component {
   constructor(props) {
      super(props);
      this.state = {
         fullName: '',
         phoneNumber: '',
         email: '',
         address: '',
         reason: '',
         birthday: '',
         gender: '',
         doctorId: '',
         selectedGender: '',
      };
   }
   handleOnChange(event, stateKey) {
      let valueInput = event.target.value;
      let tmpState = { ...this.state };
      tmpState[stateKey] = valueInput;
      this.setState({ ...tmpState });
   }

   componentDidMount() {
      this.setState({ gender: this.buildGenderformat() });
   }

   componentDidUpdate(prevProprs, prevStates, snapshot) {
      if (this.props.language !== prevProprs.language) {
         this.setState({ gender: this.buildGenderformat() });
      }
      if (this.props.dataSchedule !== prevProprs.dataSchedule) {
         this.setState({ doctorId: this.props.dataSchedule.doctorId });
      }
   }

   handleOnChangeDatePicker = (date) => {
      this.setState({
         birthday: date[0],
      });
   };

   buildGenderformat = () => {
      let IS_LANG_VI = this.props.language === LANGUAGES.VI;
      let data = [
         {
            keyMap: 'M',
            valueEn: 'Male',
            valueVi: 'Nam',
         },
         {
            keyMap: 'F',
            valueEn: 'Female',
            valueVi: 'Nữ',
         },
      ];
      return data.map((item) => ({
         value: item.keyMap,
         label: IS_LANG_VI ? item.valueVi : item.valueEn,
      }));
   };

   handleChange = (selectedOption) => {
      this.setState({
         selectedGender: selectedOption,
      });
   };

   handleConfirmed = () => {
      console.log(this.state);
   };

   render() {
      const { isOpenModal, toggleModal, dataSchedule } = this.props;
      let IS_LANG_VI = this.props.language === LANGUAGES.VI ? true : false;
      let doctorId =
         dataSchedule && Object.entries(dataSchedule).length ? dataSchedule.doctorId : '';
      let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

      return (
         <>
            <Modal centered isOpen={isOpenModal} className="booking-modal-container" size="lg">
               <div className="booking-modal-content">
                  <div className="booking-modal-header">
                     <span>Thông tin đặt lịch khám bệnh</span>
                     <span>
                        <i onClick={toggleModal} className="fas fa-times"></i>
                     </span>
                  </div>
                  <div className="booking-modal-body">
                     <div className="doctor-info">
                        <ProfileDoctor
                           doctorId={doctorId}
                           iShowProfile={false}
                           dataSchedule={dataSchedule}
                        />
                     </div>
                     {/* <div className="price">
                        <FormattedMessage id="patient.extra-info.medical-price" />
                        {dataSchedule && dataSchedule.priceData && IS_LANG_VI ? (
                           <NumberFormat
                              className="mx-2 font-weight-bold"
                              value={dataSchedule.priceData.valueVi}
                              displayType="text"
                              thousandSeparator={true}
                              suffix=" VND"
                           />
                        ) : dataSchedule && dataSchedule.priceData && !IS_LANG_VI ? (
                           <NumberFormat
                              className="mx-2 font-weight-bold"
                              value={dataSchedule.priceData.valueEn}
                              displayType="text"
                              thousandSeparator={true}
                              suffix=" USD"
                           />
                        ) : null}
                     </div> */}
                     <div className="row">
                        <div className="col-6 form-group">
                           <label>Họ tên</label>
                           <input
                              className=" form-control"
                              value={this.state.fullName}
                              onChange={(event) => this.handleOnChange(event, 'fullName')}
                           />
                        </div>
                        <div className="col-6 form-group">
                           <label>Số đện thoại</label>
                           <input
                              className=" form-control"
                              value={this.state.phoneNumber}
                              onChange={(event) => this.handleOnChange(event, 'phoneNumber')}
                           />
                        </div>
                        <div className="col-6 form-group">
                           <label>Email</label>
                           <input
                              className=" form-control"
                              value={this.state.email}
                              onChange={(event) => this.handleOnChange(event, 'email')}
                           />
                        </div>
                        <div className="col-6 form-group">
                           <label>Địa chỉ liên hệ</label>
                           <input
                              className=" form-control"
                              value={this.state.address}
                              onChange={(event) => this.handleOnChange(event, 'address')}
                           />
                        </div>
                        <div className="col-12 form-group">
                           <label>Lý do khám</label>
                           <input
                              className=" form-control"
                              value={this.state.reason}
                              onChange={(event) => this.handleOnChange(event, 'reason')}
                           />
                        </div>
                        <div className="col-6 form-group">
                           <div>Ngày sinh</div>
                           <DatePicker
                              className=""
                              onChange={() => this.handleOnChangeDatePicker}
                              selected={this.state.currentDate}
                              minDate={yesterday}
                           />
                        </div>
                        <div className="col-6 form-group">
                           <label>Ngày sinh</label>
                           <Select
                              value={this.state.selectedGender}
                              onChange={this.handleChange}
                              options={this.state.gender}
                           />
                        </div>
                     </div>
                  </div>
                  <div className="booking-modal-footer">
                     <button className="btn btn-primary" onClick={() => this.handleConfirmed()}>
                        Xác nhận
                     </button>
                     <button className="btn btn-danger" onClick={toggleModal}>
                        Hủy
                     </button>
                  </div>
               </div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
