import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/userService';
class UserManage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arrUsers: [],
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

   render() {
      let arrUsers = this.state.arrUsers;
      return (
         <div className="users-container">
            <div className="title">Mange user with Dũng Bùi </div>
            <div className="users-table mt-4 mx-5">
               <div className="container">
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
                                    <td className="action-column">
                                       <a href={`/edit-crud?id=${item.id}`}>
                                          <button
                                             type="button"
                                             className="btn btn-warning"
                                          >
                                             <i className="fas fa-pencil-alt"></i>
                                          </button>
                                       </a>
                                       <a href={`/delete-crud?id=${item.id}`}>
                                          <button
                                             type="button"
                                             className="btn btn-danger"
                                          >
                                             <i className="fas fa-trash"></i>
                                          </button>
                                       </a>
                                    </td>
                                 </tr>
                              );
                           })}
                     </tbody>
                  </table>
               </div>
            </div>
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
