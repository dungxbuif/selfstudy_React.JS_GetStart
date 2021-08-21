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

   handleChangeDoctor = async (selectedDoctor) => {
      this.setState({ selectedDoctor });

      let res = await getDoctorDetailInfo(selectedDoctor.value);
      if (res && res.code === 0 && res.data && res.data.markDownData) {
         let markdown = res.data.markDownData;
         this.setState({
            contentMarkdown: markdown.contentMarkdown,
            description: markdown.description,
            hasExisted: true,
         });
      } else {
         this.setState({
            contentMarkdown: '',
            description: '',
            hasExisted: false,
         });
      }
      console.log(res);
   };

   componentDidMount() {
      this.props.fetchALllDoctors();
      this.props.getDoctorAllCodes();
   }

   componentDidUpdate(prevProps, prevStates, snapShot) {
      if (prevProps.allDoctors !== this.props.allDoctors) {
         this.convertDataToSelect();
      }
      if (prevProps.dataDoctorRequired !== this.props.dataDoctorRequired) {
         this.convertDataToSelectDoctorInfo();
      }
      if (prevProps.language !== this.props.language) {
         this.convertDataToSelect();
         this.convertDataToSelectDoctorInfo();
      }
   }
   convertDataToSelectDoctorInfo = () => {
      let obj = { ...this.props.dataDoctorRequired };
      let { language } = this.props;

      if (obj.listPrice && obj.listPayment && obj.listProvine) {
         let arr = Object.keys(obj);
         arr.forEach((ele) => {
            obj[ele] = obj[ele].map((item) => ({
               label: language === LANGUAGES.VI ? item.valueVi : item.valueEn,
               value: item.keyMap,
            }));
         });

         this.setState({
            ...obj,
         });
      }
   };

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
      });
   };
   handleOnChangeTextDesc = (event) => {
      this.setState({
         description: event.target.value,
      });
   };
   render() {
      let { hasExisted } = this.state;
      console.log(this.props);
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
                        onChange={this.handleChangeDoctor}
                        options={this.state.listDoctors}
                     />
                     <div className="mt-4 form-groups w-100">
                        <label>Chọn giá khám bệnh</label>
                        <Select value={this.state.selectedPrice} options={this.state.listPrice} />
                     </div>
                  </div>
                  <div className="content-right col-6 px-3">
                     <label>
                        <FormattedMessage id="admin.manage-doctor.doctor-info" />
                     </label>
                     <textarea
                        className="form-control"
                        rows="5"
                        onChange={(e) => this.handleOnChangeTextDesc(e)}
                        value={this.state.description}></textarea>
                  </div>
                  <div className="row col-8">
                     <div className="form-groups col-6">
                        <label>Chọn phương thức thanh toán</label>
                        <Select
                           value={this.state.selectedPayment}
                           options={this.state.listPayment}
                        />
                     </div>
                     <div className="form-groups col-6">
                        <label>Chọn tỉnh thành</label>
                        <Select
                           value={this.state.selectedProvince}
                           options={this.state.listProvine}
                        />
                     </div>
                     <div className="form-groups col-6">
                        <label>Tên phòng khám</label>
                        <input className="form-control" />
                     </div>
                     <div className="form-groups col-6">
                        <label>Địa chỉ phòng khám</label>
                        <input className="form-control" />
                     </div>
                  </div>
                  <div className="form-groups col-4">
                     <label>Ghi chú</label>
                     <textarea className="form-control" rows="3"></textarea>
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
