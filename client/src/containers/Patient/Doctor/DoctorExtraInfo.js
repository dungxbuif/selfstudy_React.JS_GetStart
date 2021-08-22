import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorExtraInfo.scss';

class DoctorExtraInfo extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isShowInfo: false,
      };
   }

   componentDidMount() {}

   togglePriceDetail() {
      this.setState({
         isShowInfo: !this.state.isShowInfo,
      });
   }

   componentDidUpdate(prevProprs, prevStates, snapshot) {
      if (this.props.language !== prevProprs.language) {
      }
   }

   render() {
      return (
         <div className="doctor-extra-info-container p-3">
            <div className="content-top">
               <div className="address-title">Đặt lịch khám</div>
               <div className="clinic-name">Tên phòng khám</div>
               <div className="address">Địa chỉ</div>
            </div>
            <div className="content-down">
               <div className="price-title">
                  Giá khám:{' '}
                  {!this.state.isShowInfo ? (
                     <span className="toggle" onClick={() => this.togglePriceDetail()}>
                        Xem chi tiết
                     </span>
                  ) : null}
               </div>
               {this.state.isShowInfo ? (
                  <>
                     <div className="price-detail">
                        <div>250.000 đ</div>
                        <div>Được ưu tiên khám trước fdafdsfds dfdf dfdfwre s sdf s sfd sd sd</div>
                        <div>Được ưu tiên khám trước fdafdsfds dfdf dfdfwre s sdf s sfd sd sd</div>
                     </div>
                     <div className="toggle" onClick={() => this.togglePriceDetail()}>
                        Ẩn bảng giágit ad
                     </div>
                  </>
               ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
