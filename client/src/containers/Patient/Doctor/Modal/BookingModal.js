import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
      return (
         <>
            <Modal
               centered
               isOpen={this.props.isOpenModal}
               className="booking-modal-container"
               size="lg">
               <div className="booking-modal-content">
                  <div className="booking-modal-header">
                     <span>Thông tin đặt lịch khám bệnh</span>
                     <span>
                        <i onClick={this.props.toggleModal} className="fas fa-times"></i>
                     </span>
                  </div>
                  <div className="booking-modal-body">
                     <div className="doctor-info"></div>
                     <div className="price">Giá khám 500,000VNĐ</div>
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
                           <div class="form-check form-check-inline">
                              <span>
                                 <input class="form-check-input" type="radio" value="option1" />
                                 Nam
                              </span>
                              <span>
                                 <input class="form-check-input" type="radio" value="option1" />
                                 Nữ
                              </span>
                           </div>
                        </div>
                        <div className="col-6">
                           <div>Đặt cho ai</div>
                           <div class="form-check form-check-inline">
                              <span>
                                 <input class="form-check-input" type="radio" value="option1" />
                                 Nam
                              </span>
                              <span>
                                 <input class="form-check-input" type="radio" value="option1" />
                                 Nữ
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="booking-modal-footer">
                     <button className="btn btn-primary">Xác nhận</button>
                     <button className="btn btn-danger">Hủy</button>
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
