import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
// import * as actions from "../store/actions";
import * as actions from '../../store/actions';
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { HighlightSpanKind } from 'typescript';
import { userService } from '../../services/';

class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: '',
         isShowPass: false,
         errMessage: '',
      };
   }

   handleOnChangeInput = (event) => {
      this.setState({
         username: event.target.value,
      });
   };

   handleOnChangePass = (event) => {
      this.setState({
         password: event.target.value,
      });
   };

   handleLogin = async () => {
      this.setState({
         errMessage: '',
      });
      try {
         await userService
            .handleLogin(this.state.username, this.state.password)
            .then((res) => {
               if (res.code !== 0) {
                  this.setState({
                     errMessage: res.message,
                  });
                  return;
               }
               this.props.userLoginSuccess(res.data);
            });
      } catch (e) {
         this.setState({
            errMessage: e.response.data.message,
         });
      }
   };
   handleShowHidePass = () => {
      this.setState({
         isShowPass: !this.state.isShowPass,
      });
   };

   render() {
      return (
         <div className="login-background">
            <div className="login-container">
               <div className="login-content row ">
                  <div className="col-12 text-login">Login</div>
                  <div className="col-12 form-group login-input">
                     <label>Username</label>
                     <input
                        className="form-control"
                        type="text"
                        placeholder="Enter your username"
                        value={this.state.username}
                        onChange={(event) => this.handleOnChangeInput(event)}
                     />
                  </div>
                  <div className="col-12 form-group login-input">
                     <label>Password</label>
                     <div className="custom-password">
                        <input
                           className="form-control"
                           type={this.state.isShowPass ? 'text' : 'password'}
                           placeholder="Enter your password"
                           value={this.state.password}
                           onChange={(event) => this.handleOnChangePass(event)}
                        />
                        <span
                           onClick={() => {
                              this.handleShowHidePass();
                           }}
                        >
                           <i
                              className={
                                 this.state.isShowPass
                                    ? 'far fa-eye-slash'
                                    : 'far fa-eye'
                              }
                           ></i>
                        </span>
                     </div>
                  </div>
                  <div className="col-12" style={{ color: 'red' }}>
                     {this.state.errMessage}
                  </div>
                  <div className="col-12">
                     <button
                        className="btn-login"
                        onClick={() => {
                           this.handleLogin();
                        }}
                     >
                        Login
                     </button>
                  </div>
                  <div className="col-12">
                     <span className="forgot-pass">Forgot your password?</span>
                  </div>
                  <div className="col-12 text-center mt-3">
                     <span className="text-other-login ">Or login with:</span>
                  </div>
                  <div className="col-12 social-login ">
                     <i className="fab fa-google-plus-g google"></i>
                     <i className="fab fa-facebook-f facebook"></i>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      language: state.app.language,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      navigate: (path) => dispatch(push(path)),
      userLoginFail: () => dispatch(actions.userLoginFail()),
      userLoginSuccess: (userInfor) =>
         dispatch(actions.userLoginSuccess(userInfor)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
