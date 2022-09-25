import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { times } from 'lodash';
import { handleLoginApi } from "../../services/userService"
import { userLoginSuccess } from '../../store/actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: 'abc@gmail.com',
            password: '123',
            isShowPassword: false,
            errMessage: '',
        }
    }

    handleOnChangeUser = (event) => {
        this.setState({
            userName: event.target.value,
        })
        console.log(event.target.value);
    }

    handleOnChangePass = (event) => {
        this.setState({
            password: event.target.value
        })
        console.log(event.target.value);
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.userName, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                console.log('check data', data.user)
                this.props.userLoginSuccess(data.user)
                console.log('login thanh cong')
            }


        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log(error.response);
        }

    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin()

        }
    }
    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group input-login'>
                            <label>UserName:</label>
                            <input type='text' className='form-control' placeholder='Enter your username'
                                value={this.state.userName}
                                onChange={(event) => { this.handleOnChangeUser(event) }} />
                        </div>
                        <div className='col-12 form-group input-login'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'} className='form-control' placeholder='Enter your password'
                                    value={this.state.value}
                                    onChange={(event) => this.handleOnChangePass(event)}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                />

                                <span onClick={() => { this.handleShowHidePassword() }}>
                                    <i className={this.state.isShowPassword ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                                </span>

                            </div>

                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => { this.handleLogin() }}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='span-login'>Forgot your password</span>
                        </div>
                        <div className='col-12 text-center mt-2'>
                            <span className='other-login'>Or Login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google google_css"></i>
                            <i className="fab fa-facebook-f facebook_css"></i>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),

        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
