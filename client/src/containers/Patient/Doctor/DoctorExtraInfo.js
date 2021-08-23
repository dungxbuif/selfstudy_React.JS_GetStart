import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorExtraInfo.scss';
import { getExtraDoctorInfoById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfo extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isShowInfo: false,
         extraInfo: {},
      };
   }

   componentDidMount() {}

   togglePriceDetail() {
      this.setState({
         isShowInfo: !this.state.isShowInfo,
      });
   }

   async componentDidUpdate(prevProprs, prevStates, snapshot) {
      if (this.props.language !== prevProprs.language) {
      }
      if (prevProprs.doctorId !== this.props.doctorId) {
         let data = await getExtraDoctorInfoById(this.props.doctorId);
         console.log(data);
         if (data && data.code === 0) {
            this.setState({
               extraInfo: data.data,
            });
         }
      }
   }

   render() {
      let { isShowInfo, extraInfo } = this.state;
      let IS_LANG_VI = this.props.language === LANGUAGES.VI ? true : false;
      return (
         <div className="doctor-extra-info-container p-3">
            <div className="content-top">
               <div className="address-title">
                  <FormattedMessage id="patient.extra-info.address-title" />
               </div>

               <div className="clinic-name">
                  {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}
               </div>
               <div className="address">
                  {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}
               </div>
            </div>
            <div className="content-down">
               <div className="price-title">
                  <FormattedMessage id="patient.extra-info.medical-price" />
                  {extraInfo && extraInfo.priceData && IS_LANG_VI ? (
                     <NumberFormat
                        className="mx-2 font-weight-bold"
                        value={extraInfo.priceData.valueVi}
                        displayType="text"
                        thousandSeparator={true}
                        suffix=" VND"
                     />
                  ) : extraInfo && extraInfo.priceData && !IS_LANG_VI ? (
                     <NumberFormat
                        className="mx-2 font-weight-bold"
                        value={extraInfo.priceData.valueEn}
                        displayType="text"
                        thousandSeparator={true}
                        suffix=" USD"
                     />
                  ) : null}
                  {!isShowInfo ? (
                     <span className="toggle" onClick={() => this.togglePriceDetail()}>
                        <FormattedMessage id="patient.extra-info.showmore" />
                     </span>
                  ) : null}
               </div>
               {isShowInfo ? (
                  <>
                     <div className="price-detail">
                        <div></div>
                        <div>{extraInfo && extraInfo.note ? extraInfo.note : null}</div>
                        <div>
                           {extraInfo && extraInfo.paymentData && IS_LANG_VI
                              ? `Người bệnh có thể thanh toán bằng hình thức: ${extraInfo.paymentData.valueVi}`
                              : extraInfo && extraInfo.paymentData && !IS_LANG_VI
                              ? `Patients can pay in the form of: ${extraInfo.paymentData.valueEn}`
                              : null}
                        </div>
                     </div>
                     <div className="toggle" onClick={() => this.togglePriceDetail()}>
                        <FormattedMessage id="patient.extra-info.hide" />
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
