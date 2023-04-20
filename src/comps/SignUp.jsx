import React from "react";
import { Link } from "react-router-dom";
import entry from "../styles/logInAndSignUp.module.css";

export default function SignUp() {
  return (
    <div>
      <form className={entry.form}>
        <h1>Sign Up</h1>
        <div >
          <input type="text" placeholder="Enter Name.." className={entry.inp} />
          <input type="text" placeholder="Enter LastName.." className={entry.inp}/>
        </div>
        <input type="text" placeholder="Enter UserName.." className={entry.inp}/>
        <input type="password" placeholder="Enter Password.." className={entry.inp}/>
        <button className={entry.btn}>create account</button>
        <Link to={'/'}>Go To LogIn</Link>
      </form>
    </div>
  );
}
