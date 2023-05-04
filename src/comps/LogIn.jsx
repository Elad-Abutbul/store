import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import entry from "../styles/logInAndSignUp.module.css";
import axios from "../axiosConfig";
import { contextApi } from "../contextApi";

export default function LogIn() {
  const valContext = useContext(contextApi);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const valid = async () => {
    if (!userName || !password) {
      alert("Fields are missing!");
    } else {
      try {
        const res = await axios.post("/login", {
          userName: userName,
          password: password,
        });
        const data = await res.data;
        if (data.msg === "success") {
          nav("/products");
          valContext.userConnect(data.user);
        } else {
          alert("User or password not found");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className={entry.container}>
      <form className={entry.form} onSubmit={(e) => e.preventDefault()}>
        <h1 className={entry.title}>Log In</h1>
        <div className={entry.inputContainer}>
          <input
            className={entry.input}
            type="text"
            placeholder="Enter Username..."
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className={entry.inputContainer}>
          <input
            className={entry.input}
            type="password"
            placeholder="Enter Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={valid} className={entry.btn}>
          Log In
        </button>
        <Link to={"/signUp"} className={entry.link}>
          Create an Account
        </Link>
      </form>
    </div>
  );
}
  