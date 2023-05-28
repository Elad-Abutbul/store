import React, { useContext, useState } from "react";
import cartCss from "../styles/cart.module.css";
import axios from "../axiosConfig";
import { contextApi } from "../contextApi";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constans/Routes";
export default function ChooseCity({ setShowChooseCity }) {
  const [city, setCity] = useState("");
  const valContext = useContext(contextApi);
  const nav = useNavigate();
  const valid = async () => {
    if (!city) return alert("put a city");
    const res = await axios.post("/user/city", {
      city: city,
      userId: valContext.userData._id,
    });
    if (res.data === "complete") {
      alert(res.data);
      valContext.city(city);
      setShowChooseCity(false)
    } else return alert(res.data);
  };
  return (
    <div>
      <h1 className={cartCss.h1}>choose city to deliver</h1>
      <input
        type="text"
        placeholder="choose city to deliver"
        onChange={(e) => setCity(e.target.value)}
      />
      <button className={cartCss.payAllBtn} onClick={valid}>
        sumbit
      </button>
      <h2 onClick={() => setShowChooseCity(false)}>x</h2>
    </div>
  );
}
