import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import entryCss from "../styles/logInAndSignUp.module.css";
import axios from "../axiosConfig";
import { contextApi } from "../contextApi";
import { POST } from "../constans/AxiosPost";
import { ROUTES } from "../constans/Routes";
import { LOGIN } from "../constans/hardCoded/login/LoginHardCoded";

export default function LogIn() {
  const valContext = useContext(contextApi);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const valid = async () => {
    if (!userName || !password) {
      alert(LOGIN.FIELDSAREMISSING);
    } else {
        try {
          const res = await axios.post(POST.LOGIN, {
            userName: userName,
            password: password,
          });
          const data = res.data;
          if (data.msg === "success") {
            nav(`${ROUTES.ELADJEWELRY}/${ROUTES.PRODUCTS}`);
            valContext.userConnect(data.user);
          } else {
            alert(data);
          }
        } catch (err) {
          console.log(err);
        }
      
    }
  };
  return (
    <div className={entryCss.container}>
      <form className={entryCss.form} onSubmit={(e) => e.preventDefault()}>
        <h1 className={entryCss.title}>{LOGIN.LOGIN}</h1>
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
          {LOGIN.LOGIN}
        </button>
        <Link to={ROUTES.SIGNUP} className={entryCss.link}>
          {LOGIN.CREATEACCOUNT}
        </Link>
      </form>
    </div>
  );
}
