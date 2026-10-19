import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import { Type } from "../../Utility/action.type.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../Component/DataProvider/DataProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useContext(DataContext)[1];

  const [loading, setLoading] = useState({ signIn: false, signUp: false });
  const redirectPath = location.state?.redirect || "/";

  const authHandler = (e) => {
    e.preventDefault();
    setError("");

    if (e.target.name === "signin") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({ type: Type.SET_USER, user: userInfo.user });
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
          dispatch({ type: Type.SET_USER, user: userInfo.user });
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
    <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', background: 'white' }}>
      <Link to="/">
        <img style={{ margin: '20px auto', width: '100px', objectFit: 'contain' }} src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon Logo" />
      </Link>
      <div style={{ width: '350px', display: 'flex', flexDirection: 'column', padding: '20px', border: '1px solid lightgray', borderRadius: '4px' }}>
        <h1>Sign In</h1>
        {error && <small style={{ color: "red", fontWeight: "bold", paddingBottom: "10px" }}>{error}</small>}
        <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>
            <label htmlFor="email">E-mail</label>
            <input style={{ width: '100%', padding: '8px', border: '1px solid gray', borderRadius: '3px' }} value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input style={{ width: '100%', padding: '8px', border: '1px solid gray', borderRadius: '3px' }} value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" />
          </div>
          <button type='submit' onClick={authHandler} name='signin' style={{ background: '#f0c14b', border: '1px solid #a88734', borderRadius: '3px', width: '100%', height: '32px', cursor: 'pointer', fontWeight: '500' }}>
            {loading.signIn ? <ClipLoader color="#111" size={15} /> : "Sign In"}
          </button>
        </form>
        <p style={{ fontSize: '12px', padding: '15px 0' }}>By continuing, you agree to Amazon Conditions of Use and Privacy Notice.</p>
        <button type='button' onClick={authHandler} name='signup' style={{ background: '#e7e9ec', border: '1px solid #adb1b8', borderRadius: '3px', width: '100%', height: '32px', cursor: 'pointer', fontWeight: '500' }}>
          {loading.signUp ? <ClipLoader color="#111" size={15} /> : "Create your Amazon Account"}
        </button>
      </div>
    </section>
  );
};

export default Login;