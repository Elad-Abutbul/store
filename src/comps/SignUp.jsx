import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import entryCss from "../styles/logInAndSignUp.module.css";
import axios from "../axiosConfig";
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
        const res = await axios.post("/createUsers", {
          name: name,
          lastName: lastName,
          userName: userName,
          password: password,
        });
        if (res.data === "exixt") {
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
    <div className={entryCss.container}>
      <form
        className={entryCss.form}
        onSubmit={(e) => e.preventDefault()}
        className={entryCss.form}
      >
        <h1 className={entryCss.title}>Sign Up</h1>
        <div className={entryCss.inputContainer}>
          <input
            className={entryCss.input}
            type="text"
            placeholder="Enter Name.."
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={entryCss.inputContainer}>
          <input
            className={entryCss.input}
            type="text"
            placeholder="Enter LastName.."
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={entryCss.inputContainer}>
          <input
            className={entryCss.input}
            type="text"
            placeholder="Enter UserName.."
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className={entryCss.inputContainer}>
          {" "}
          <input
            className={entryCss.input}
            type="password"
            placeholder="Enter Password.."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className={entryCss.btn} onClick={valid}>
          create account
        </button>
        <Link to={"/"} className={entryCss.link}>Go To LogIn</Link>
      </form>
    </div>
  );
}
