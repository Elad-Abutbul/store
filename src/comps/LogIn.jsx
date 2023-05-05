import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import entryCss from "../styles/logInAndSignUp.module.css";
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
    <div className={entryCss.container}>
      <form className={entryCss.form} onSubmit={(e) => e.preventDefault()}>
        <h1 className={entryCss.title}>Log In</h1>
        <div className={entryCss.inputContainer}>
          <input
            className={entryCss.input}
            type="text"
            placeholder="Enter Username..."
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className={entryCss.inputContainer}>
          <input
            className={entryCss.input}
            type="password"
            placeholder="Enter Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={valid} className={entryCss.btn}>
          Log In
        </button>
        <Link to={"/signUp"} className={entryCss.link}>
          Create an Account
        </Link>
      </form>
    </div>
  );
}
  