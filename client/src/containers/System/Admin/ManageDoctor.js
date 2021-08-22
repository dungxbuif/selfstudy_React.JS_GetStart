import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-image-lightbox/style.css';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import { getDoctorDetailInfo } from '../../../services/userService';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import { FormattedMessage } from 'react-intl';

const mdParser = new MarkdownIt();

class ManageTable extends Component {
   constructor(props) {
      super(props);
      this.state = {
         //Save to markdown table
         contentMarkdown: '',
         contentHTML: '',
         selectedDoctor: '',
         description: '',
         hasExisted: false,
         allDoctors: [],
         listDoctors: [],
         // Save to doctor_infos table
         listPrice: [],
         listPayment: [],
         listProvine: [],
         selectedPrice: '',
         selectedPayment: '',
         selectedProvince: '',
         nameClinic: '',
         addressClinic: '',
         note: '',
      };
   }

   // handleChangeDoctor = async (selectedDoctor) => {
   //
   // };

   handleChangeDoctorInfo = async (selectedOption, name) => {
      let stateName = name.name;
      let stateCopy = { ...this.state };
      stateCopy[stateName] = selectedOption;
      console.log(selectedOption);
      this.setState({
         ...stateCopy,
      });

      if (stateName === 'selectedDoctor') {
         let res = await getDoctorDetailInfo(selectedOption.value);
         let markdown = res.data.markDownData;
         let doctorInfoData = res.data.doctorInfoData;
         let CHECK_CONDITION_MARKDOWN = res && res.code === 0 && res.data && res.data.markDownData;
         let CHECK_CONDITION_DOCTOR_INFO =
            res && res.code === 0 && res.data && res.data.doctorInfoData;
         let obj = {};

         obj.contentMarkdown = CHECK_CONDITION_MARKDOWN ? markdown.contentMarkdown : '';
         obj.contentHTML = CHECK_CONDITION_MARKDOWN ? markdown.contentHTML : '';
         obj.description = CHECK_CONDITION_MARKDOWN ? markdown.description : '';
         obj.hasExisted = CHECK_CONDITION_MARKDOWN ? true : false;

         obj.selectedPrice = CHECK_CONDITION_DOCTOR_INFO
            ? this.state.listPrice.find((item) => item.value === doctorInfoData.priceId)
            : '';
         obj.selectedPayment = CHECK_CONDITION_DOCTOR_INFO
            ? this.state.listPayment.find((item) => item.value === doctorInfoData.paymentId)
            : '';
         obj.selectedProvince = CHECK_CONDITION_DOCTOR_INFO
            ? this.state.listProvine.find((item) => item.value === doctorInfoData.provinceId)
            : '';
         obj.nameClinic = CHECK_CONDITION_DOCTOR_INFO ? doctorInfoData.nameClinic : '';
         obj.addressClinic = CHECK_CONDITION_DOCTOR_INFO ? doctorInfoData.addressClinic : '';
         obj.note = CHECK_CONDITION_DOCTOR_INFO ? doctorInfoData.note : '';

         this.setState({ ...obj });
      }
   };

   componentDidMount() {
      this.props.fetchALllDoctors();
      this.props.getDoctorAllCodes();
   }

   componentDidUpdate(prevProps, prevStates, snapShot) {
      if (
         prevProps.dataDoctorRequired !== this.props.dataDoctorRequired ||
         prevProps.language !== this.props.language ||
         prevProps.allDoctors !== this.props.allDoctors
      ) {
         this.convertDataToSelectDoctorInfo();
      }
   }
   convertDataToSelectDoctorInfo = () => {
      let obj = { ...this.props.dataDoctorRequired, listDoctors: this.props.allDoctors };
      let { language } = this.props;

      if (obj.listPrice && obj.listPayment && obj.listProvine && obj.listDoctors) {
         let arr = Object.keys(obj);
         let IS_LANG_VI = language === LANGUAGES.VI;

         arr.forEach((ele) => {
            obj[ele] = obj[ele].map((item) => {
               let label = IS_LANG_VI ? item.valueVi : item.valueEn;
               let value = item.keyMap;

               if (ele === 'listPrice') {
                  label = IS_LANG_VI ? item.valueVi + ' VND' : item.valueEn + ' USD';
               }

               if (ele === 'listDoctors') {
                  label = IS_LANG_VI
                     ? `${item.lastName} ${item.firstName}`
                     : `${item.firstName} ${item.lastName}`;
                  value = item.id;
               }

               return {
                  label,
                  value,
               };
            });
         });
         if (this.state['selectedDoctor'] !== '' && obj[`listDoctors`].length) {
            let selectData = obj[`listDoctors`].find(
               (item) => item.value === this.state['selectedDoctor'].value,
            );
            obj['selectedDoctor'] = selectData;
         }

         if (this.state['selectedPrice'] !== '' && obj[`listPrice`].length) {
            let selectData = obj[`listPrice`].find(
               (item) => item.value === this.state['selectedPrice'].value,
            );
            obj['selectedPrice'] = selectData;
         }

         if (this.state['selectedPayment'] !== '' && obj[`listPayment`].length) {
            let selectData = obj[`listPayment`].find(
               (item) => item.value === this.state['selectedPayment'].value,
            );
            obj['selectedPayment'] = selectData;
         }

         if (this.state['selectedProvince'] !== '' && obj[`listProvine`].length) {
            let selectData = obj[`listProvine`].find(
               (item) => item.value === this.state['selectedProvince'].value,
            );
            obj['selectedProvince'] = selectData;
         }
         this.setState({
            ...obj,
         });
      }
   };

   handleEditorChange = (html) => {
      this.setState({
         contentMarkdown: html.text,
         contentHTML: html.html,
      });
   };
   handleSaveContentMarkdown = () => {
      let { hasExisted } = this.state;
      this.props.createDoctorInfo({
         contentMarkdown: this.state.contentMarkdown,
         contentHTML: this.state.contentHTML,
         description: this.state.description,
         doctorId: this.state.selectedDoctor.value,
         action: hasExisted ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

         selectedPrice: this.state.selectedPrice.value,
         selectedPayment: this.state.selectedPayment.value,
         selectedProvince: this.state.selectedProvince.value,
         nameClinic: this.state.nameClinic,
         addressClinic: this.state.addressClinic,
         note: this.state.note,
      });
   };
   handleOnChangeText = (event, KEY) => {
      this.setState({
         [`${KEY}`]: event.target.value,
      });
   };
   render() {
      let { hasExisted } = this.state;
      return (
         <div className="mange-doctor-container px-3">
            <h2 className="mange-doctor-title my-3  align-center text-center">
               <FormattedMessage id="admin.manage-doctor.title" />
            </h2>
            <div className="mx-5 px-3">
               <div className="more-infor row mb-2">
                  <div className="content-left col-6 px-3">
                     <label>
                        <FormattedMessage id="admin.manage-doctor.choose-doctor" />
                     </label>
                     <Select
                        value={this.state.selectedDoctor}
                        onChange={this.handleChangeDoctorInfo}
                        options={this.state.listDoctors}
                        name="selectedDoctor"
                        placeholder={<FormattedMessage id="admin.manage-doctor.choose-doctor" />}
                     />
                     <div className="mt-4 form-groups w-100">
                        <label>
                           <FormattedMessage id="admin.manage-doctor.price" />
                        </label>
                        <Select
                           value={this.state.selectedPrice}
                           options={this.state.listPrice}
                           onChange={this.handleChangeDoctorInfo}
                           name="selectedPrice"
                           placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                        />
                     </div>
                  </div>
                  <div className="content-right col-6 px-3">
                     <label>
                        <FormattedMessage id="admin.manage-doctor.doctor-info" />
                     </label>
                     <textarea
                        className="form-control"
                        rows="5"
                        onChange={(e) => this.handleOnChangeText(e, 'description')}
                        value={this.state.description}></textarea>
                  </div>
                  <div className="row col-8">
                     <div className="form-groups col-6">
                        <label>
                           <FormattedMessage id="admin.manage-doctor.payment" />
                        </label>
                        <Select
                           value={this.state.selectedPayment}
                           options={this.state.listPayment}
                           onChange={this.handleChangeDoctorInfo}
                           name="selectedPayment"
                           placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                        />
                     </div>
                     <div className="form-groups col-6">
                        <label>
                           <FormattedMessage id="admin.manage-doctor.province" />
                        </label>
                        <Select
                           value={this.state.selectedProvince}
                           options={this.state.listProvine}
                           onChange={this.handleChangeDoctorInfo}
                           name="selectedProvince"
                           placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                        />
                     </div>
                     <div className="form-groups col-6">
                        <label>
                           <FormattedMessage id="admin.manage-doctor.clinic-name" />
                        </label>
                        <input
                           className="form-control"
                           onChange={(e) => this.handleOnChangeText(e, 'nameClinic')}
                           value={this.state.nameClinic}
                        />
                     </div>
                     <div className="form-groups col-6">
                        <label>
                           <FormattedMessage id="admin.manage-doctor.clinic-address" />
                        </label>
                        <input
                           className="form-control"
                           onChange={(e) => this.handleOnChangeText(e, 'addressClinic')}
                           value={this.state.addressClinic}
                        />
                     </div>
                  </div>
                  <div className="form-groups col-4">
                     <label>
                        <FormattedMessage id="admin.manage-doctor.note" />
                     </label>
                     <textarea
                        className="form-control"
                        onChange={(e) => this.handleOnChangeText(e, 'note')}
                        value={this.state.note}
                        rows="3"></textarea>
                  </div>
               </div>
               <div className="mange-doctor-editor">
                  <MdEditor
                     style={{ height: '500px', width: '100%' }}
                     renderHTML={(text) => mdParser.render(text)}
                     onChange={this.handleEditorChange}
                     value={this.state.contentMarkdown}
                  />
               </div>
               <div
                  className={hasExisted ? 'btn btn-info mt-4' : 'btn btn-primary mt-4'}
                  onClick={() => this.handleSaveContentMarkdown()}>
                  {hasExisted ? (
                     <FormattedMessage id="admin.manage-doctor.save" />
                  ) : (
                     <FormattedMessage id="admin.manage-doctor.add" />
                  )}
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
      dataDoctorRequired: state.admin.dataDoctorRequired,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      fetchALllDoctors: () => dispatch(actions.fetchALllDoctors()),
      createDoctorInfo: (data) => dispatch(actions.createDoctorInfo(data)),
      getDoctorAllCodes: () => dispatch(actions.getDoctorAllCodes()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTable);
