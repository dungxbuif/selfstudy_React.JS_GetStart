import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import * as actions from '../../../store/actions';
class UserRedux extends Component {
   initState = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      phonenumber: '',
      image: '',
      gender: 'M',
      roleId: 'R1',
      positionId: 'P0',
   };

   constructor(props) {
      super(props);
      this.state = {
         previewImgURL: '',
         isOpen: false,
         form: {
            ...this.initState,
         },
      };
   }

   checkValidateInput = () => {
      let isValid = true;
      let arrInput = [
         'email',
         'password',
         'firstName',
         'lastName',
         'phonenumber',
         'address',
      ];
      for (let i = 0; i < arrInput.length; i++) {
         if (!this.state.form[arrInput[i]]) {
            isValid = false;
            alert('Missing ' + arrInput[i]);
            break;
         }
      }
      return isValid;
   };

   handleOnChangeImg = (event) => {
      let data = event.target.files;
      let file = data[0];
      let objURL = URL.createObjectURL(file);
      let tmpForm = { ...this.state.form };
      tmpForm.image = file;
      this.setState(
         {
            previewImgURL: objURL,
            form: {
               ...tmpForm,
            },
         },
         () => console.log(this.state.form)
      );
   };
   previewClick = (evevt) => {
      if (this.state.previewImgURL !== '') {
         this.setState({
            isOpen: true,
         });
      }
   };

   handleOnChange = (event, id) => {
      let tmpState = { ...this.state.form };
      tmpState[id] = event.target.value;
      let tmpr;
      this.setState({
         form: { ...tmpState },
      });
   };

   handleSaveUse = () => {
      let isValid = this.checkValidateInput();
      if (!isValid) return;
      let tmpForm = { ...this.state.form };
      tmpForm.image = JSON.stringify(tmpForm.image);
      this.props.createNewUser({
         ...tmpForm,
      });
   };

   componentDidMount() {}

   render() {
      return (
         <div className="user-redux-container">
            <div className="title">Học dùng redux</div>

            <div className="user-redux-body">
               <div className="container">
                  <div className="row">
                     <div className="col-12">
                        <h2>
                           <FormattedMessage id="manage-user.add" />
                        </h2>
                     </div>
                     <div className="col-3">
                        <label>Email</label>
                        <input
                           className="form-control"
                           type="email"
                           onChange={(event) =>
                              this.handleOnChange(event, 'email')
                           }
                           value={this.state.form.email}
                        />
                     </div>
                     <div className="col-3">
                        <label>
                           <FormattedMessage id="manage-user.pass" />
                        </label>
                        <input
                           className="form-control"
                           type="password"
                           onChange={(event) =>
                              this.handleOnChange(event, 'password')
                           }
                           value={this.state.form.password}
                        />
                     </div>
                     <div className="col-3">
                        <label>
                           <FormattedMessage id="manage-user.name" />
                        </label>
                        <input
                           className="form-control"
                           type="text"
                           onChange={(event) =>
                              this.handleOnChange(event, 'firstName')
                           }
                           value={this.state.form.firstName}
                        />
                     </div>
                     <div className="col-3">
                        <label>
                           <FormattedMessage id="manage-user.lastname" />
                        </label>
                        <input
                           className="form-control"
                           type="text"
                           onChange={(event) =>
                              this.handleOnChange(event, 'lastName')
                           }
                           value={this.state.form.lastName}
                        />
                     </div>
                     <div className="col-3">
                        <label>
                           <FormattedMessage id="manage-user.number" />
                        </label>
                        <input
                           className="form-control"
                           onChange={(event) =>
                              this.handleOnChange(event, 'phonenumber')
                           }
                           value={this.state.form.phonenumber}
                        />
                     </div>
                     <div className="col-9">
                        <label>
                           <FormattedMessage id="manage-user.address" />
                        </label>
                        <input
                           className="form-control"
                           onChange={(event) =>
                              this.handleOnChange(event, 'address')
                           }
                           value={this.state.form.address}
                        />
                     </div>
                     <div className="col-3">
                        <label>
                           <FormattedMessage id="manage-user.gender" />
                        </label>
                        <select
                           name="gender"
                           className="form-control"
                           onChange={(event) =>
                              this.handleOnChange(event, 'gender')
                           }
                           value={this.state.form.gender}>
                           <option value="M">Male</option>
                           <option value="F">Female</option>
                           <option value="O">Other</option>
                        </select>
                     </div>
                     <div className="input-container col-3">
                        <label>
                           <FormattedMessage id="manage-user.role" />
                        </label>
                        <select
                           name="roleId"
                           className="form-control"
                           onChange={(event) =>
                              this.handleOnChange(event, 'roleId')
                           }
                           value={this.state.form.roleId}>
                           <option value="R1">Admin</option>
                           <option value="R2">Doctor</option>
                           <option value="R3">Patient</option>
                        </select>
                     </div>
                     <div className="input-container col-3">
                        <label>
                           <FormattedMessage id="manage-user.position" />
                        </label>
                        <select
                           name="position"
                           className="form-control"
                           onChange={(event) =>
                              this.handleOnChange(event, 'positionId')
                           }
                           value={this.state.form.positionId}>
                           <option value="P0">None</option>
                           <option value="P1">Master</option>
                           <option value="P2">Doctor</option>
                           <option value="P3">Associate Professor</option>
                           <option value="P4">Professor</option>
                        </select>
                     </div>
                     <div className="col-3">
                        <label>
                           <FormattedMessage id="manage-user.image" />
                        </label>
                        <div className="image-preview-container">
                           <input
                              id="previewImg"
                              type="file"
                              hidden
                              onChange={this.handleOnChangeImg}
                           />
                           <label
                              htmlFor="previewImg"
                              style={{
                                 cursor: 'pointer',
                              }}>
                              Tải ảnh <i className="fas fa-upload"></i>
                           </label>
                           <div
                              className="image-preview"
                              style={{
                                 backgroundImage: `url(${this.state.previewImgURL})`,
                                 backgroundSize: 'contain',
                                 cursor:
                                    this.state.previewImgURL === ''
                                       ? 'default'
                                       : 'pointer',
                              }}
                              onClick={this.previewClick}></div>
                        </div>
                     </div>
                     <div className="col-12">
                        <button
                           className="btn btn-primary mt-3"
                           onClick={this.handleSaveUse}>
                           <FormattedMessage id="manage-user.save" />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
            {this.state.isOpen && (
               <Lightbox
                  mainSrc={this.state.previewImgURL}
                  onCloseRequest={() => this.setState({ isOpen: false })}
               />
            )}
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return { createNewUser: (data) => dispatch(actions.createNewUser(data)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
