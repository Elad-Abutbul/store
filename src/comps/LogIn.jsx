import React, {  useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import entry from "../styles/logInAndSignUp.module.css";
import axios from "../axiosConfig";

import { contextApi } from "../contextApi";
export default function LogIn() {
  const valContext=useContext(contextApi)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const valid = async () => {
    if (!userName || !password) {
      alert("Field are missing!");
    } else {
      try {
        const res = await axios.post("/login", {
            userName: userName,
            password: password,
          })
        const data = await res.data;
        if (data.msg === 'success') {
          nav('/products')
          valContext.userConnect(data.user)
        } else {
          alert('user or password not found')
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div>
      <form className={entry.form} onSubmit={(e) => e.preventDefault()}>
        <h1>Log In</h1>
        <input
          className={entry.inp}
          type="text"
          placeholder="Enter UserName..."
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className={entry.inp}
          type="password"
          placeholder="Enter Password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={valid} className={entry.btn}>
          Login
        </button>
        <Link to={"/signUp"}>To Sign Up</Link>
      </form>
    </div>
  );
}
