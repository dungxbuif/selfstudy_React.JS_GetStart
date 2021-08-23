import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import NumberFormat from 'react-number-format';
import ProfileDoctor from '../ProfileDoctor';

class BookingModal extends Component {
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
      const { isOpenModal, toggleModal, dataSchedule } = this.props;
      let IS_LANG_VI = this.props.language === LANGUAGES.VI ? true : false;
      let doctorId =
         dataSchedule && Object.entries(dataSchedule).length ? dataSchedule.doctorId : '';
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
                        <ProfileDoctor doctorId={doctorId} />
                     </div>
                     <div className="price">
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
                     </div>
                     <div className="row">
                        <div className="col-6 form-group">
                           <label>Họ tên</label>
                           <input className=" form-control" />
                        </div>
                        <div className="col-6 form-group">
                           <label>Số đện thoại</label>
                           <input className=" form-control" />
                        </div>
                        <div className="col-6 form-group">
                           <label>Email</label>
                           <input className=" form-control" />
                        </div>
                        <div className="col-6 form-group">
                           <label>Địa chỉ liên hệ</label>
                           <input className=" form-control" />
                        </div>
                        <div className="col-12 form-group">
                           <label>Lý do khám</label>
                           <input className=" form-control" />
                        </div>
                        <div className="col-6">
                           <div>Đặt cho ai</div>
                           <div className="form-check form-check-inline">
                              <span>
                                 <input className="form-check-input" type="radio" value="option1" />
                                 Nam
                              </span>
                              <span>
                                 <input className="form-check-input" type="radio" value="option1" />
                                 Nữ
                              </span>
                           </div>
                        </div>
                        <div className="col-6">
                           <div>Đặt cho ai</div>
                           <div className="form-check form-check-inline">
                              <span>
                                 <input className="form-check-input" type="radio" value="option1" />
                                 Nam
                              </span>
                              <span>
                                 <input className="form-check-input" type="radio" value="option1" />
                                 Nữ
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="booking-modal-footer">
                     <button className="btn btn-primary">Xác nhận</button>
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
