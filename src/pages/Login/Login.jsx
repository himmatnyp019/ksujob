import React, { useContext, useState } from 'react'
import { ChevronRight, User } from "lucide-react"
import './Login.css'
import { StoreContext } from '../../../context/storeContent.jsx'

// 🔥 Firebase imports
import { auth, db } from '../../../src/firebase.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

const Login = () => {
    const { text } = useContext(StoreContext);
    const [loginStatus, setLoginStatus] = useState('Log in'); // or 'Join membership'
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: '',
        name: "",
        studentId: ""
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (loginStatus === "Join membership") {
                // --- REGISTER LOGIC ---
                const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
                const user = userCredential.user;

                // Prepare user profile data
                const userData = {
                    name: data.name,
                    phone: '', // not in form now
                    email: data.email,
                    major: '',
                    gender: '',
                    studentId: data.studentId || '',
                    nationality: '',
                    selfIntroduction: '',
                    skills: '',
                    interests: '',
                    profileImage: '',
                    education: [],
                    experience: [],
                    certificates: {
                        driving: false,
                        ielts: false,
                        kiip: false,
                        topik: false,
                        cooking: false,
                        computer: false,
                    },
                    attachedFiles: [],
                };

                // Store in Firestore
                await setDoc(doc(db, "users", user.uid), userData);

                alert("Account created successfully!");
                setLoginStatus("Log in");
                setData({ email: "", password: "", name: "", studentId: "" });
            } else {
                // --- LOGIN LOGIC ---
                await signInWithEmailAndPassword(auth, data.email, data.password);
                alert("Logged in successfully!");
            }
        } catch (err) {
            console.error(err);
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

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

                {/* 🔥 Added onSubmit */}
                <form onSubmit={handleSubmit}>
                    <div className="login-register-box-contents">
                        <div className="login-container">
                            {loginStatus === "Join membership" && (
                                <>
                                    <div className='login-form'>
                                        <label className="form-label">Full Name :</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            placeholder='full name'
                                            onChange={handleChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="form-label">Student Id :</label>
                                        <input
                                            type="text"
                                            name="studentId"
                                            value={data.studentId}
                                            placeholder='20XXXXXXXX'
                                            onChange={handleChange}
                                            className="form-input"
                                        />
                                    </div>
                                </>
                            )}

                            <div>
                                <label className="form-label">Email Address :</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    placeholder='example@gmail.com'
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>
                            <div>
                                <label className="form-label">Password : </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    placeholder='**********'
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

                        {/* 🔥 Added type=submit and loading indicator */}
                        <button type="submit" className="login-register-button" disabled={loading}>
                            <h1>{loading ? "Please wait..." : loginStatus}</h1>
                            <div className="login-register-icon">
                                <div className="login-icon">
                                    <ChevronRight className='icon' size={22} color='#fff' />
                                </div>
                            </div>
                        </button>

                        <br />
                        <div className="login-register-options">
                            {loginStatus === "Log in" ? (
                                <>
                                    <h2>Are you new user ?</h2>
                                    <p onClick={() => setLoginStatus("Join membership")}>Register Account.</p>
                                </>
                            ) : (
                                <>
                                    <h2>Already have an account ?</h2>
                                    <p onClick={() => setLoginStatus("Log in")}>Login Account.</p>
                                </>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
