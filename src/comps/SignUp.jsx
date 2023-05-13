import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import entryCss from "../styles/logInAndSignUp.module.css";
import axios from "../axiosConfig";
import { contextApi } from "../contextApi";
import { URL } from "../constans/Url";
import { ROUTES } from "../constans/Routes";
import { POST } from "../constans/AxiosPost";
export default function SignUp({ url }) {
  const valContext = useContext(contextApi);
  const [name, setName] = useState(
    url === URL.EDIT ? valContext.userData.name : ""
  );
  const [lastName, setLastName] = useState(
    url === URL.EDIT ? valContext.userData.lastName : ""
  );
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
      if (url !== URL.EDIT) {
        try {
          const res = await axios.post(POST.CREATEUSERS, {
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
      } else {
        const userData = {
          userId: valContext.userData._id,
          name: name,
          lastName: lastName,
          userName: userName,
          password: password,
        };
        try {
          const res = await axios.post(POST.EDITACCOUNT, { userData: userData });
          const data = await res.data;
          if (data === "User not found") {
            alert(data);
          } else {
            alert("Edit complete");
            nav(ROUTES.ENTRY);
            valContext.userDisconnect();
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  return (
    <div className={entryCss.container}>
      <form className={entryCss.form} onSubmit={(e) => e.preventDefault()}>
        <h1 className={entryCss.title}>
          {url === URL.EDIT ? "Edit Account" : "Sign Up"}
        </h1>
        <div className={entryCss.inputContainer}>
          <input
            value={name}
            className={entryCss.input}
            type="text"
            placeholder="Enter Name.."
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={entryCss.inputContainer}>
          <input
            value={lastName}
            className={entryCss.input}
            type="text"
            placeholder="Enter LastName.."
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={entryCss.inputContainer}>
          <input
            value={userName}
            className={entryCss.input}
            type="text"
            placeholder="Enter UserName.."
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className={entryCss.inputContainer}>
          <input
            value={password}
            className={entryCss.input}
            type="password"
            placeholder="Enter Password.."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className={entryCss.btn} onClick={valid}>
          {url === "edit" ? "Edit Account" : "Create Account"}
        </button>
        {url !== "edit" && (
          <Link to={ROUTES.ENTRY} className={entryCss.link}>
          Go To Log In
          </Link>
        )}
      </form>
    </div>
  );
}
