import React, { useContext, useState } from 'react'
import { ChevronRight, Phone, User } from "lucide-react"
import './Login.css'
import { StoreContext } from '../../../context/storeContext'
const Login = () => {
    const {text} = useContext(StoreContext);
    const [loginStatus, setLoginStatus] = useState('Log in');  // 'Join membership' for register
    const [data, setData] = useState({
        email: "",
        password: '',
        name: "",
        studentId: ""

    })
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(prev => ({ ...prev, [name]: value }));
    }
    return (
        <div className='login-register-container'>
            <div className="login-register-contents">
                <div className="top-design-line"></div>
                <div className="login-register-title">
                    <div className="icon">
                    <User className="iconic" size={28} />
                    </div>
                    <h1>{loginStatus} Today ,</h1>
                    <br />
                </div>
                    <div className="design-line"> </div>
                <form action="">
                    <div className="login-register-box-contents">
                        <div className="login-container">
                            {loginStatus === "Join membership" && (
                                <>
                                    <div className='login-form' ><label className="form-label">Full Name :</label><input type="text" name="name" value={data.name} placeholder='full name' onChange={(e) => handleChange(e)} className="form-input" /></div>
                                    <div><label className="form-label">Student Id :</label><input type="text" name="studentId" value={data.studentId} placeholder='20XXXXXXXX' onChange={(e) => handleChange(e)} className="form-input" /></div>
                                </>
                            )}
                            <div><label className="form-label">Email Address :</label><input type="text" name="email" value={data.email} placeholder='example@gmail.com' onChange={(e) => handleChange(e)} className="form-input" /></div>
                            <div><label className="form-label">Password : </label><input type="text" name="password" value={data.password} placeholder='**********' onChange={(e) => handleChange(e)} className="form-input" /></div>
                        </div>
                        <div className="login-register-button">
                            <h1>{loginStatus}</h1>
                            <div className="login-register-icon">
                                <div className="login-icon">
                                <ChevronRight className='icon' size={22} color='#fff' />
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="login-register-options">
                            {
                                loginStatus === "Log in"
                                    ? <> <h2>Are you new user ?</h2> <p onClick={()=> setLoginStatus("Join membership")} >Register Account.</p> </>
                                    : <><h2>Already have an account ?</h2><p onClick={()=> setLoginStatus("Log in")}>Login Account.</p></>
                            }
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login
