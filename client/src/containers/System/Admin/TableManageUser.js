import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import 'react-image-lightbox/style.css';
import * as actions from '../../../store/actions';
class TableManageUser extends Component {
   constructor(props) {
      super(props);
      this.state = {
         userRedux: [],
      };
   }

   componentDidMount() {
      this.props.fetchUserRedux();
   }

   componentDidUpdate(prevProps, prevStates) {
      if (prevProps.listUsers !== this.props.listUsers) {
         this.setState({
            userRedux: this.props.listUsers,
         });
      }
   }

   render() {
      let arrUsers = this.state.userRedux;
      return (
         <table className="table table-hover">
            <thead>
               <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Email</th>
                  <th scope="col">First name</th>
                  <th scope="col">Last name</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone number</th>
                  <th scope="col">Role</th>
                  <th scope="col">Position</th>
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
                           <td>{item.gender}</td>
                           <td>{item.address}</td>
                           <td>{item.phonenumber}</td>
                           <td>{item.roleId}</td>
                           <td>{item.positionId}</td>
                           <td className="action-column d-flex">
                              <div className="w-50 px-1">
                                 <button
                                    type="button"
                                    className="btn btn-warning w-100"
                                    // onClick={() => {
                                    //    this.handleModalUser(
                                    //       'update',
                                    //       item
                                    //    );
                                    // }}
                                 >
                                    <i className="fas fa-pencil-alt"></i>
                                 </button>
                              </div>
                              <div className="w-50 px-1">
                                 <button
                                    type="button"
                                    className="btn btn-danger w-100"
                                    // onClick={() => {
                                    //    this.handleDeleteUser(
                                    //       item.id
                                    //    );
                                    // }}
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
      );
   }
}

const mapStateToProps = (state) => {
   return { listUsers: state.admin.users };
};

const mapDispatchToProps = (dispatch) => {
   return { fetchUserRedux: () => dispatch(actions.fetchALllUsersStart()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
