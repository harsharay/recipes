import React, { useState, useEffect } from 'react'

import "./Login.css"

const Login = (props) => {

    const backendUrl = "http://localhost:4999"
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    })
    const [attemptLogin, setAttemptLogin] = useState(false)
    const [loginResponse, setLoginResponse] = useState("")

    useEffect(() => {
        if(loginResponse==="successfull") {
            props.history.push({
                pathname: '/home',
                viaLogin: true
            })
        } else if(loginResponse === 'unsuccessfull'){
            alert("Wrong username/ password")
        }
    },[loginResponse])

    const handleEmailPasswordLogin = e => {
        let name = e.target.name
        let value = e.target.value

        setUserDetails(prev => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    const handleLogin = () => {
        let { email, password } = userDetails

        fetch(backendUrl+"/api/login", {
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
            setLoginResponse(json)
            setAttemptLogin(true)
        })
        setAttemptLogin(false)
    }

    return (
        <div className="login-main">
            <p className="login-header">Login </p>
            <div className="login-form">
                <div className="login-form-component">
                    <p>Email</p>
                    <input type="email" value={userDetails.email} name="email" onChange={handleEmailPasswordLogin}/>
                </div>
                <div className="login-form-component">
                    <p>Password</p>
                    <input type="password" value={userDetails.password} name="password" onChange={handleEmailPasswordLogin}/>
                </div>
                <button onClick={handleLogin}>Click here to Login</button>
            </div>
        </div>
    )
}

export default Login;