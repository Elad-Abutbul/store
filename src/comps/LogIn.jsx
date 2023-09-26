import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import entryCss from "../styles/logInAndSignUp.module.css";
import { contextApi } from "../contextApi";
import { ROUTES } from "../constans/Routes";
import { LOGIN } from "../constans/hardCoded/login/LoginHardCoded";
import { JWT } from "../constans/jwtToken";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import useLogin from "../outSideFunction/functionLogin/LoginPost";
export default function LogIn() {
  const valContext = useContext(contextApi);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const { loginPost } = useLogin();
  useEffect(() => {
    let token = Cookies.get(JWT.TOKEN);
   
    if (token) {
      nav(`${ROUTES.ELADJEWELRY}/${ROUTES.PRODUCTS}`);
      const decodToken = jwtDecode(token);
      valContext.userConnect(decodToken);
    } else {
      valContext.userDisconnect();
      Cookies.remove(JWT.TOKEN);
    }
  },[]);
  const valid = async () => {
    if (!userName || !password) {
      alert(LOGIN.FIELDSAREMISSING);
    } else {
      loginPost(userName, password);
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
        <p>{LOGIN.TO_ENTER_CEO} </p>
        <p>{LOGIN.CEO_USER_PASS}</p>
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
