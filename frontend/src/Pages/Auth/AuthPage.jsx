import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import classes from "./Auth.module.css";
import { auth } from "../../Utility/firebase";
import { Type } from "../../Utility/action.type.js";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../Component/DataProvider/DataProvider";

const AuthPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const navigate = useNavigate();
    const location = useLocation();
    const [{ user }, dispatch] = useContext(DataContext);
    
    const [loading, setLoading] = useState({
        signIn: false,
        signUp: false
    });

    const redirectPath = location.state?.redirect || "/";

    const authHandler = (e) => {
        e.preventDefault();
        setError("");

        if (e.target.name === "signin") {
            setLoading({ ...loading, signIn: true });
            signInWithEmailAndPassword(auth, email, password)
                .then((userInfo) => {
                    dispatch({
                        type: Type.SET_USER,
                        user: userInfo.user
                    });
                    setLoading({ ...loading, signIn: false });
                    navigate(redirectPath, { replace: true });
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading({ ...loading, signIn: false });
                });
        } else {
            setLoading({ ...loading, signUp: true });
            createUserWithEmailAndPassword(auth, email, password)
                .then((userInfo) => {
                    dispatch({
                        type: Type.SET_USER,
                        user: userInfo.user
                    });
                    setLoading({ ...loading, signUp: false });
                    navigate(redirectPath, { replace: true });
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading({ ...loading, signUp: false });
                });
        }
    };

    return (
        <section className={classes.login}>
            <Link to="/">
                <img 
                    src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" 
                    alt="Amazon Logo" 
                />
            </Link>

            <div className={classes.login_container}>
                <h1>Sign In</h1>
                
                {error && (
                    <small style={{ padding: "5px 0", color: "red", fontWeight: "bold" }}>
                        {error}
                    </small>
                )}

                <form>
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                        />
                    </div>

                    <button 
                        type="submit"
                        onClick={authHandler}
                        name="signin" 
                        className={classes.login_signinButton}
                    >
                        {loading.signIn ? <ClipLoader color="#111" size={15} /> : "Sign In"}
                    </button>
                </form>

                <p>
                    By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
                </p>

                <button 
                    type="button"
                    onClick={authHandler}
                    name="signup"
                    className={classes.login_registerButton}
                >
                    {loading.signUp ? <ClipLoader color="#111" size={15} /> : "Create your Amazon Account"}
                </button>
            </div>
        </section>
    );
};

export default AuthPage;