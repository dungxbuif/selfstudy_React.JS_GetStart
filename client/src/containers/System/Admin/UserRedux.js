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
                     <div className="col-12">
                        <h2>
                           <FormattedMessage id="manage-user.add" />
                        </h2>
                     </div>
                     <div className="col-3">
                        <label>Email</label>
                        <input className="form-control" type="email" />
                     </div>
                     <div className="col-3">
                        <label>
                           <FormattedMessage id="manage-user.pass" />
                        </label>
                        <input className="form-control" type="password" />
                     </div>
                     <div className="col-3">
                        <label>
                           <FormattedMessage id="manage-user.name" />
                        </label>
                        <input className="form-control" type="text" />
                     </div>
                     <div className="col-3">
                        <label>
                           <FormattedMessage id="manage-user.lastname" />
                        </label>
                        <input className="form-control" type="text" />
                     </div>
                     <div className="col-3">
                        <label>
                           <FormattedMessage id="manage-user.number" />
                        </label>
                        <input className="form-control" />
                     </div>
                     <div className="col-9">
                        <label>
                           <FormattedMessage id="manage-user.address" />
                        </label>
                        <input className="form-control" />
                     </div>
                     <div className="col-3">
                        <label>
                           <FormattedMessage id="manage-user.gender" />
                        </label>
                        <select name="gender" className="form-control">
                           <option value="M">Male</option>
                           <option value="F">Female</option>
                           <option value="O">Other</option>
                        </select>
                     </div>
                     <div className="input-container col-3">
                        <label>
                           <FormattedMessage id="manage-user.role" />
                        </label>
                        <select name="roleId" className="form-control">
                           <option value="R1">Admin</option>
                           <option value="R2">Doctor</option>
                           <option value="R3">Patient</option>
                        </select>
                     </div>
                     <div className="input-container col-3">
                        <label>
                           <FormattedMessage id="manage-user.position" />
                        </label>
                        <select name="position" className="form-control">
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
                        <input className="form-control" type="text" />
                     </div>
                     <div className="col-12">
                        <button className="btn btn-primary mt-3">
                           <FormattedMessage id="manage-user.save" />
                        </button>
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
