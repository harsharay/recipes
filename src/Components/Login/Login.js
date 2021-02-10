import React from 'react'

import "./Login.css"

const Login = () => {
    return (
        <div className="login-main">
            <p className="login-header">Login </p>
            <div className="login-form">
                <div className="login-form-component">
                    <p>Email</p>
                    <input type="email"/>
                </div>
                <div className="login-form-component">
                    <p>Password</p>
                    <input type="password"/>
                </div>
                <button>Click here to Login</button>
            </div>
        </div>
    )
}

export default Login;