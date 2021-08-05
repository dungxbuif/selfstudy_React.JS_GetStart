import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {connect} from 'react-redux';
import {emitter} from '../../utils/emitter';
class ModalUser extends Component {
   initState = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      phonenumber: '',
      gender: '1',
      roleId: 'R1',
   };
   constructor(props) {
      super(props);
      this.state = {
         ...this.initState,
      };
      this.listenEmitter();
   }

   componentDidMount() {}
   componentDidUpdate(prevProps) {
      if (this.props.addOrUp === 'update') {
         if (this.props.currentData !== prevProps.currentData) {
            this.setState({...this.props.currentData});
         }
      }
   }

   toggle = () => this.props.toggle();

   checkValidateInput = () => {
      let isValid = true;
      let arrInput = [
         'email',
         'password',
         'firstName',
         'lastName',
         'phonenumber',
         'gender',
         'roleId',
      ];
      for (let i = 0; i < arrInput.length; i++) {
         if (!this.state[arrInput[i]]) {
            if (this.props.addOrUp === 'update' && arrInput[i] === 'password')
               continue;
            isValid = false;
            alert('Missing ' + arrInput[i]);
            break;
         }
      }
      return isValid;
   };

   handleOnChange = (event, id) => {
      let tmpState = {...this.state};
      tmpState[id] = event.target.value;
      this.setState({
         ...tmpState,
      });
   };

   handleAddNewUser = () => {
      let isValid = this.checkValidateInput();
      if (isValid) {
         this.props.createNewUser(this.state);
      }
      return;
   };

   listenEmitter = () => {
      emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
         this.setState({...this.initState});
      });
   };

   handleUpdateUser = () => {
      let isValid = this.checkValidateInput();
      if (isValid) {
         this.props.updateUser(this.state);
      }
      return;
   };

   handleUser = () => {
      if (this.props.addOrUp === 'add') {
         this.handleAddNewUser();
      } else {
         this.handleUpdateUser();
      }
   };

   render() {
      return (
         <div>
            <Modal
               isOpen={this.props.isOpen}
               toggle={() => {
                  this.toggle();
               }}
               size="lg"
               className={'modal-user-container'}>
               <ModalHeader
                  toggle={() => {
                     this.toggle();
                  }}>
                  {this.props.addOrUp === 'add'
                     ? 'Create an user'
                     : 'Update user'}
               </ModalHeader>
               <ModalBody>
                  <div className="formContainer">
                     <div className="input-container">
                        <label>Email</label>
                        <input
                           type="text"
                           onChange={(event) =>
                              this.handleOnChange(event, 'email')
                           }
                           value={this.state.email}
                           disabled={
                              this.props.addOrUp === 'add' ? null : 'disabled'
                           }
                        />
                     </div>
                     {this.props.addOrUp === 'add' ? (
                        <div className="input-container">
                           <label>Password</label>
                           <input
                              type="password"
                              onChange={(event) =>
                                 this.handleOnChange(event, 'password')
                              }
                              value={this.state.password}
                           />
                        </div>
                     ) : null}

                     <div className="input-container">
                        <label>Firstname</label>
                        <input
                           type="text"
                           onChange={(event) =>
                              this.handleOnChange(event, 'firstName')
                           }
                           value={this.state.firstName}
                        />
                     </div>
                     <div className="input-container">
                        <label>Lastname</label>
                        <input
                           type="text"
                           onChange={(event) =>
                              this.handleOnChange(event, 'lastName')
                           }
                           value={this.state.lastName}
                        />
                     </div>
                     <div className="input-container w-100">
                        <label>Address</label>
                        <input
                           type="text"
                           onChange={(event) =>
                              this.handleOnChange(event, 'address')
                           }
                           value={this.state.address}
                        />
                     </div>
                     <div className="input-container w-50">
                        <label>Phone number</label>
                        <input
                           type="number"
                           onChange={(event) =>
                              this.handleOnChange(event, 'phonenumber')
                           }
                           value={this.state.phonenumber}
                        />
                     </div>
                     <div className="input-container w-25">
                        <label>Gender</label>

                        <select
                           name="gender"
                           className="form-control"
                           onChange={(event) =>
                              this.handleOnChange(event, 'gender')
                           }
                           value={this.state.gender.toString()}>
                           <option value="1">Male</option>
                           <option value="0">Female</option>
                        </select>
                     </div>
                     <div className="input-container w-25">
                        <label>Role</label>
                        <select
                           name="roleId"
                           className="form-control"
                           onChange={(event) =>
                              this.handleOnChange(event, 'roleId')
                           }
                           value={this.state.roleId.toString()}>
                           <option value="R1">Admin</option>
                           <option value="R2">Doctor</option>
                           <option value="R3">Patient</option>
                        </select>
                     </div>
                  </div>
               </ModalBody>
               <ModalFooter>
                  <Button
                     color="primary"
                     onClick={() => {
                        this.handleUser();
                     }}
                     className="modal-button">
                     {this.props.addOrUp === 'add' ? 'Add user' : 'Update user'}
                  </Button>
                  <Button
                     color="secondary"
                     onClick={() => {
                        this.toggle();
                     }}
                     className="modal-button">
                     Cancel
                  </Button>
               </ModalFooter>
            </Modal>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
