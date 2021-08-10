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
import { LANGUAGES } from '../../../utils';

const mdParser = new MarkdownIt();

class ManageTable extends Component {
   constructor(props) {
      super(props);
      this.state = {
         contentMarkdown: '',
         contentHTML: '',
         selectedDoctor: '',
         description: '',
         hasExisted: false,
         allDoctors: [],
         listDoctors: [],
      };
   }

   handleChange = async (selectedDoctor) => {
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

   handleEditorChange = (html) => {
      this.setState({
         contentMarkdown: html.text,
         contentHTML: html.html,
      });
   };
   handleSavecontentMarkdown = () => {
      this.props.createDoctorInfo({
         contentMarkdown: this.state.contentMarkdown,
         contentHTML: this.state.contentHTML,
         description: this.state.description,
         doctorId: this.state.selectedDoctor.value,
      });
   };
   handleOnChangeTextDesc = (event) => {
      this.setState({
         description: event.target.value,
      });
   };
   render() {
      let { hasExisted } = this.state;
      return (
         <div className="mange-doctor-container px-3">
            <h2 className="mange-doctor-title my-3  align-center text-center">
               Tạo thêm thông tin doctor
            </h2>
            <div className="more-infor row mb-2">
               <div className="content-left w-50 px-3">
                  <label>Thông tin bác sỹ</label>
                  <Select
                     value={this.state.selectedDoctor}
                     onChange={this.handleChange}
                     options={this.state.listDoctors}
                  />
               </div>
               <div className="content-right w-50 px-3">
                  <label>Thông tin bác sỹ</label>
                  <textarea
                     className="form-control"
                     rows="4"
                     onChange={(e) => this.handleOnChangeTextDesc(e)}
                     value={this.state.description}></textarea>
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
               onClick={this.handleSavecontentMarkdown}>
               {hasExisted ? 'Cập nhật thông tin' : 'Lưu thông tin'}
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
      createDoctorInfo: (data) => dispatch(actions.createDoctorInfo(data)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTable);
