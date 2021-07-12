import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
class ModalUser extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   componentDidMount() {}

   toggle = () => this.props.toggle();

   render() {
      return (
         <div>
            <Modal
               isOpen={this.props.isOpen}
               toggle={() => {this.toggle();}}
               size="lg"
               className={'modal-user-container'}
            >
               <ModalHeader
                  toggle={() => {this.toggle();}}
               >
                  Create an user
               </ModalHeader>
               <ModalBody>
                  <div className="formContainer">
                     <div className="input-container">
                        <label>Email</label>
                        <input type='text'/>
                     </div>
                     <div className="input-container">
                        <label>Password</label>
                        <input type='password'/>
                     </div>
                     <div className="input-container">
                        <label>Firstname</label>
                        <input type='password'/>
                     </div>
                     <div className="input-container">
                        <label>Lastname</label>
                        <input type='password'/>
                     </div>
                     <div className="input-container w-100">
                        <label>Address</label>
                        <input type='password'/>
                     </div>
                     <div className="input-container w-50">
                        <label>Phone</label>
                        <input type='password'/>
                     </div>
                     <div className="input-container w-25">
                        <label>Sex</label>
                        <input type='password'/>
                     </div>
                     <div className="input-container w-25">
                        <label>Role</label>
                        <input type='password'/>
                     </div>
                  </div>
                  
               </ModalBody>
               <ModalFooter>
                  <Button
                     color="primary"
                     onClick={() => {this.toggle();}}
                     className="modal-button"
                  >
                     Save changes
                  </Button>{' '}
                  <Button
                     color="secondary"
                     onClick={() => {this.toggle();}}
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
