import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import entry from "../styles/logInAndSignUp.module.css";
import axios from "axios";
export default function SignUp() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const valid = async () => {
    if (name.length < 2) {
      alert("Enter a name above 2 charcters");
    } else if (lastName.length < 2) {
      alert("Enter a lastName above 2 charcters");
    } else if (/^\s/.test(userName)) {
      alert("Enter a userName without spaces");
    } else if (password.length < 5) {
      alert("Enter a password above 5 charcters");
    } else {
        try {
          const res = await axios.post("http://localhost:3001/createUsers", {
            name: name,
            lastName: lastName,
            userName: userName,
            password: password,
          });
          if (res.data == "exixt") {
            alert("UserName Exixt.");
          } else {
            nav("/");
          }
        } catch (err) {
          console.log(err);
        }
    }
  };
  return (
    <div>
      <form className={entry.form} onSubmit={(e) => e.preventDefault()}>
        <h1>Sign Up</h1>
        <input
          type="text"
          placeholder="Enter Name.."
          className={entry.inp}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter LastName.."
          className={entry.inp}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter UserName.."
          className={entry.inp}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password.."
          className={entry.inp}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={entry.btn} onClick={valid}>
          create account
        </button>
        <Link to={"/"}>Go To LogIn</Link>
      </form>
    </div>
  );
}
