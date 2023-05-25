import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import entryCss from "../styles/logInAndSignUp.module.css";
import { contextApi } from "../contextApi";
import { URL } from "../constans/Url";
import { ROUTES } from "../constans/Routes";
import useCreateAccount from "../outSideFunction/functionSignUp/CreateAccount";
import useEditAccount from "../outSideFunction/functionEdit/EditAccount";
import { SIGN_AND_EDIT } from "../constans/hardCoded/signUpAndEdit/SignAndEditHardCoded";
import { EMPTYSTRING } from "../constans/EmptyString";
export default function SignUp({ url }) {
  const valContext = useContext(contextApi);
  const { createAccount } = useCreateAccount();
  const { editAccount } = useEditAccount();
  const [name, setName] = useState(
    url === URL.EDIT ? valContext.userData.name : EMPTYSTRING.EMPTYSTRING
  );
  const [lastName, setLastName] = useState(
    url === URL.EDIT ? valContext.userData.lastName : EMPTYSTRING.EMPTYSTRING
  );
  const [userName, setUserName] = useState(EMPTYSTRING.EMPTYSTRING);
  const [password, setPassword] = useState(EMPTYSTRING.EMPTYSTRING);
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
        await createAccount(name, lastName, userName, password, nav);
        valContext.getAllUserRank();
      } else {
        editAccount(valContext, name, lastName, userName, password, nav);
      }
    }
  };
  return (
    <div className={entryCss.container}>
      <form className={entryCss.form} onSubmit={(e) => e.preventDefault()}>
        <h1 className={entryCss.title}>
          {url === URL.EDIT ? SIGN_AND_EDIT.EDITACCOUNT : SIGN_AND_EDIT.SIGNUP}
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
            className={entryCss.input}
            type="text"
            placeholder="Enter UserName.."
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className={entryCss.inputContainer}>
          <input
            className={entryCss.input}
            type="password"
            placeholder="Enter Password.."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className={entryCss.btn} onClick={valid}>
          {url === ROUTES.EDIT
            ? SIGN_AND_EDIT.EDITACCOUNT
            : SIGN_AND_EDIT.CREATACCOUNT}
        </button>
        {url !== ROUTES.EDIT && (
          <Link to={ROUTES.ENTRY} className={entryCss.link}>
            {SIGN_AND_EDIT.GOTOLOGIN}
          </Link>
        )}
      </form>
    </div>
  );
}
