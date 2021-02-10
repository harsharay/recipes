import React from "react"
import { Link } from "react-router-dom"

import "./Main.css"

const Main = () => {
    return (
        <>
            <div className="titleDiv">
                <h1>The Recipe Book</h1>
            </div>
            <div className="landingPage-signin">
                <p>Welcome</p>
                <div className="landingPage-signin-buttonGroup">
                    <button className="landingPage-signInButton"><Link to="/login">Sign in</Link></button>
                    <button className="landingPage-registerButton"><Link to="/register">Register</Link></button>
                </div>
            </div>
        </>
    )
}

export default Main;