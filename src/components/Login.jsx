import '../styling/login/login.css'
import image from '../logo.png'
import React, { useState } from 'react'

function Login({ onclose, loginsuccess }) {

        console.log("Login component mounted");

    const [change, setChange] = useState("login");
    const [password, setpassword] = useState(false);

    const handleclick = (e) => {
        e.preventDefault();

        const a = e.target.email.value.trim();
        const b = e.target.password.value.trim();

        if (a && b) {
            loginsuccess();
        }
    }

    return (
        <>
            <div className="overlay" onClick={onclose}></div>

            <div className='form'>

                <div className='box'>
                    
                    <div className='image'>
                        <img src={image} alt='image'></img>
                        <h1>Welcome . . .</h1>
                        <p className='para'>Login / Signup for better experience </p>
                    </div>

                    <div className="login">
                        <button type='button' onClick={onclose} className='close'>x</button>

                        <div className='signup'>
                            <button className={change === "login" ? "nav-links" : "nav-links links"} onClick={() => setChange("login")}>login</button>
                            <button className={change === "signup" ? "nav-links " : "nav-links links"} onClick={() => setChange("signup")} >signup</button>
                        </div>

                        <div className='content'>
                            <form className='data' autoComplete='off' key={change} onSubmit={handleclick}>
                                {change === "signup" && <input type='text' name='name'
                                    placeholder='Enter username...' required></input>}
                                <input type='email' name='email'
                                    placeholder='Enter email...' required></input>

                                <div className='showdata'>
                                    <input type={password ? "text" : "password"} name='password' placeholder='Enter password...' required></input>
                                    <button type="button" className="show" aria-label='Show password' onClick={() => setpassword((prev) => (!prev))} >{
                                        !password ? "🙈" : "👁️"}
                                    </button>
                                </div>

                                {change === "login" && <button type='submit' className='button'>Login</button>}

                                {change === "signup" && <button type='submit' className='button'>signup</button>}
                            </form>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}
export default Login