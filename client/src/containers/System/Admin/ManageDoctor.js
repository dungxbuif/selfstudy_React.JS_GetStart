import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import 'react-image-lightbox/style.css';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';

const options = [
   {value: 'chocolate', label: 'Chocolate'},
   {value: 'strawberry', label: 'Strawberry'},
   {value: 'vanilla', label: 'Vanilla'},
];
const mdParser = new MarkdownIt();

class ManageTable extends Component {
   constructor(props) {
      super(props);
      this.state = {
         contentMarkDown: '',
         contentHTML: '',
         selectedDoctor: '',
         description: '',
      };
   }

   handleChange = (selectedDoctor) => {
      this.setState({selectedDoctor});
   };

   componentDidMount() {}

   componentDidUpdate(prevProps, prevStates) {}

   handleEditorChange = (html, text) => {
      this.setState({
         contentMarkDown: text,
         contentHTML: html,
      });
   };
   handleSaveContentMarkDown = () => {
      console.log(this.state);
   };
   handleOnChangeTextDesc = (event) => {
      this.setState({
         description: event.target.value,
      });
   };
   render() {
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
                     options={options}
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
                  style={{height: '500px', width: '100%'}}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={this.handleEditorChange}
               />
            </div>
            <div
               className="btn btn-primary mt-4"
               onClick={this.handleSaveContentMarkDown}>
               Lưu thông tin
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {listUsers: state.admin.users};
};

const mapDispatchToProps = (dispatch) => {
   return {
      fetchUserRedux: () => dispatch(actions.fetchALllUsersStart()),
      deleteUser: (id) => dispatch(actions.deleteUser(id)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTable);
