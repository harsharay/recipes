import React, { useState, useEffect } from 'react'

import "./Register.css"

const Login = () => {

    const backendUrl = "http://localhost:4999"
    const [userDetails, setUserDetails] = useState({
        email : "",
        password : "",
        confirmPassword: ""
    })
    const [registrationStatus, setRegistrationStatus] = useState("")

    const handleEmailPasswordChange = e => {
        let name = e.target.name
        let value = e.target.value

        setUserDetails(prev => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    const handleRegister = () => {
        let { email, password, confirmPassword } = userDetails

        if(email.length>0 && password.length>=5 && confirmPassword===password) {
            fetch(backendUrl+"/api/registerUser", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }).then(data => data.json())
            .then(json => {
                // setRegistrationStatus(json)
                alert(json)
            })
        } 
    }

    return (
        <div className="register-main">
            <p className="register-header">Register </p>
            <div className="register-form">
                <div className="register-form-component">
                    <p>Email</p>
                    <input type="email" name="email" value={userDetails.email} onChange={handleEmailPasswordChange}/>
                </div>
                <div className="register-form-component">
                    <p>Password</p>
                    <input type="password" name="password" value={userDetails.password} onChange={handleEmailPasswordChange}/>
                </div>
                <div className="register-form-component">
                    <p>Password, again</p>
                    <input type="password" name="confirmPassword" value={userDetails.confirmPassword} onChange={handleEmailPasswordChange}/>
                </div>
                <button onClick={handleRegister}>Click here to Register</button>
            </div>
        </div>
    )
}

export default Login;