import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss';
import {
   getAllUsers,
   createNewUserService,
   deleteUserService,
   updateUserService,
} from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
class UserManage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arrUsers: [],
         isOpenModal: false,
         addOrUp: 'add',
         currentData: {},
      };
   }

   async componentDidMount() {
      let res = await getAllUsers('ALL');
      if (res && res.code === 0) {
         this.setState({
            arrUsers: res.data,
         });
      }
   }

   getAllUsersFromReact = async () => {
      let res = await getAllUsers('ALL');
      if (res && res.code === 0) {
         this.setState({
            arrUsers: res.data,
         });
      }
   };

   handleAddNewUser = () => {
      emitter.emit('EVENT_CLEAR_MODAL_DATA');
      this.setState({
         isOpenModal: true,
         addOrUp: 'add',
      });
   };

   handleUpdateUser = (data) => {
      this.setState({
         isOpenModal: true,
         addOrUp: 'update',
         currentData: data,
      });
   };

   toggleUserModal = () => {
      this.setState({
         isOpenModal: !this.state.isOpenModal,
      });
   };

   createNewUser = async (data) => {
      try {
         let res = await createNewUserService(data);
         if (res && res.code !== 0) {
            alert(res.message);
         } else {
            await this.getAllUsersFromReact();
            this.setState({
               isOpenModal: false,
            });
            emitter.emit('EVENT_CLEAR_MODAL_DATA', { data });
         }
      } catch (e) {
         console.log(e);
      }
   };

   updateUser = async (data) => {
      try {
         let res = await updateUserService(data);
         console.log(res);
         if (res && res.code !== 0) {
            alert(res.message);
         } else {
            await this.getAllUsersFromReact();
            this.setState({
               isOpenModal: false,
            });
            emitter.emit('EVENT_CLEAR_MODAL_DATA', { data });
         }
      } catch (e) {
         console.log(e);
      }
   };

   handleDeleteUser = async (id) => {
      try {
         let res = await deleteUserService(id);
         if (res && res.code === 0) {
            await this.getAllUsersFromReact();
         } else {
            alert(res.message);
         }
      } catch (e) {
         console.log(e);
      }
   };

   handleModalUser = (type, data) => {
      if (type === 'add') {
         this.handleAddNewUser();
      } else {
         this.handleUpdateUser(data);
      }
   };

   render() {
      let arrUsers = this.state.arrUsers;
      return (
         <div className="users-container">
            <div className="title">Mange user with Dũng Bùi </div>
            <div className="users-table mt-4 mx-5">
               <div className="container">
                  <div className=" px-1 my-1">
                     <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleModalUser('add')}
                     >
                        <i className="fas fa-plus"></i> Add new user
                     </button>
                  </div>
                  <table className="table table-hover">
                     <thead>
                        <tr>
                           <th scope="col">ID</th>
                           <th scope="col">Email</th>
                           <th scope="col">First name</th>
                           <th scope="col">Last name</th>
                           <th scope="col">Address</th>
                           <th scope="col">Role</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {arrUsers &&
                           arrUsers.map((item, index) => {
                              return (
                                 <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>{item.roleId}</td>
                                    <td className="action-column d-flex">
                                       <div className="w-50 px-1">
                                          <button
                                             type="button"
                                             className="btn btn-warning w-100"
                                             onClick={() => {
                                                this.handleModalUser(
                                                   'update',
                                                   item
                                                );
                                             }}
                                          >
                                             <i className="fas fa-pencil-alt"></i>
                                          </button>
                                       </div>
                                       <div className="w-50 px-1">
                                          <button
                                             type="button"
                                             className="btn btn-danger w-100"
                                             onClick={() => {
                                                this.handleDeleteUser(item.id);
                                             }}
                                          >
                                             <i className="fas fa-trash"></i>
                                          </button>
                                       </div>
                                    </td>
                                 </tr>
                              );
                           })}
                     </tbody>
                  </table>
               </div>
            </div>
            <ModalUser
               isOpen={this.state.isOpenModal}
               toggle={this.toggleUserModal}
               createNewUser={this.createNewUser}
               updateUser={this.updateUser}
               addOrUp={this.state.addOrUp}
               currentData={this.state.currentData}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
