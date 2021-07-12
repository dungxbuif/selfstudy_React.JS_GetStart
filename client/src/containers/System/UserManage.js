import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/userService';
import ModalUser from './ModalUser';
class UserManage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arrUsers: [],
         isOpenModal: false,
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

   handleAddNewUser = () => {
      this.setState({
         isOpenModal: true,
      });
      console.log('aaa');
   };

   toggleUserModal = () => {
      this.setState({
         isOpenModal: !this.state.isOpenModal,
      });
   };

   render() {
      let arrUsers = this.state.arrUsers;
      return (
         <div className="users-container">
            <div className="title">Mange user with Dũng Bùi </div>
            <div className="users-table mt-4 mx-5">
               <div className="container">
                  <div className=" row mx-1 my-1 w-25">
                     <button className="btn btn-primary px-3 w-50"   
                        onClick={() => this.handleAddNewUser()}
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
                                           <a href={`/edit-crud?id=${item.id}`}>
                                          <button
                                             type="button"
                                             className="btn btn-warning w-100"
                                          >
                                             <i className="fas fa-pencil-alt"></i>
                                          </button>
                                       </a>
                                       </div>
                                       <div className="w-50 px-1">
                                       <a href={`/delete-crud?id=${item.id}`}>
                                          <button
                                             type="button"
                                             className="btn btn-danger w-100"
                                          >
                                             <i className="fas fa-trash"></i>
                                          </button>
                                       </a>
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
