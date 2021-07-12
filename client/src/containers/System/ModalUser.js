import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
class ModalUser extends Component {
   constructor(props) {
      super(props);
      this.state = {
         email: '',
         password: '',
         firstName: '',
         lastName: '',
         address: '',
         phonenumber: '',
         gender: '',
         roleId: '',
      };
   }

   componentDidMount() {}

   toggle = () => this.props.toggle();

   handleOnChange = (event, id) => {
      let tmpState = { ...this.state };
      tmpState[id] = event.target.value;
      this.setState({
         ...tmpState,
      });
   };

   handleAddNewUser = () => {};

   render() {
      return (
         <div>
            <Modal
               isOpen={this.props.isOpen}
               toggle={() => {
                  this.toggle();
               }}
               size="lg"
               className={'modal-user-container'}
            >
               <ModalHeader
                  toggle={() => {
                     this.toggle();
                  }}
               >
                  Create an user
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
                        />
                     </div>
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
                        <label>Sex</label>

                        <select
                           name="gender"
                           className="form-control"
                           onChange={(event) =>
                              this.handleOnChange(event, 'gender')
                           }
                           value={this.state.gender}
                        >
                           <option defaultValue value="1">
                              Male
                           </option>
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
                           value={this.state.roleId}
                        >
                           <option defaultValue value="1">
                              Admin
                           </option>
                           <option value="2">Doctor</option>
                           <option value="3">Patient</option>
                        </select>
                     </div>
                  </div>
               </ModalBody>
               <ModalFooter>
                  <Button
                     color="primary"
                     onClick={() => {
                        this.handleAddNewUser();
                     }}
                     className="modal-button"
                  >
                     Add name
                  </Button>
                  <Button
                     color="secondary"
                     onClick={() => {
                        this.toggle();
                     }}
                     className="modal-button"
                  >
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
