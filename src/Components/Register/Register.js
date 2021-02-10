import React from 'react'

import "./Register.css"

const Login = () => {
    return (
        <div className="register-main">
            <p className="register-header">Register </p>
            <div className="register-form">
                <div className="register-form-component">
                    <p>Email</p>
                    <input type="email"/>
                </div>
                <div className="register-form-component">
                    <p>Password</p>
                    <input type="password"/>
                </div>
                <div className="register-form-component">
                    <p>Password, again</p>
                    <input type="password"/>
                </div>
                <button>Click here to Register</button>
            </div>
        </div>
    )
}

export default Login;