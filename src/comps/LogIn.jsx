import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import entry from "../styles/logInAndSignUp.module.css";

export default function LogIn(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const valid = () => {
    if (!userName || !password) {
      alert("Field are missing!");
    } else if (userName == "elad" && password == "123") {
      nav("/products");
      props.logIn();
    }
  };
  return (
    <div>
      <form className={entry.form}>
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
        <button onClick={valid} className={entry.btn}>Login</button>
        <Link to={"/signUp"}>To Sign Up</Link>
      </form>
    </div>
  );
}
