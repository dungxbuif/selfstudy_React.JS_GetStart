import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class UserRedux extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   componentDidMount() {}

   render() {
      return (
         <div className="user-redux-container">
            <div className="title">Học dùng redux</div>

            <div className="user-redux-body">
               <div className="container">
                  <div className="row">
                     <div className="col-3">
                        <label>Email</label>
                        <input className="form-control" type="email" />
                     </div>
                     <div className="col-3">
                        <label>Password</label>
                        <input className="form-control" type="password" />
                     </div>
                     <div className="col-3">
                        <label>First name</label>
                        <input className="form-control" type="text" />
                     </div>
                     <div className="col-3">
                        <label>Last name</label>
                        <input className="form-control" type="text" />
                     </div>
                     <div className="col-3">
                        <label>Phone numer</label>
                        <input className="form-control" />
                     </div>
                     <div className="col-9">
                        <label>Adress</label>
                        <input className="form-control" />
                     </div>
                     <div className="col-3">
                        <label>Gender</label>
                        <select name="gender" className="form-control">
                           <option value="1">Male</option>
                           <option value="0">Female</option>
                        </select>
                     </div>
                     <div className="input-container col-3">
                        <label>Role</label>
                        <select name="roleId" className="form-control">
                           <option value="R1">Admin</option>
                           <option value="R2">Doctor</option>
                           <option value="R3">Patient</option>
                        </select>
                     </div>
                     <div className="col-3">
                        <label>Image</label>
                        <input className="form-control" type="text" />
                     </div>
                  </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
