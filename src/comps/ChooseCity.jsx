import React, { useContext, useState } from "react";
import cartCss from "../styles/cart.module.css";
import axios from "../axiosConfig";
import { contextApi } from "../contextApi";
import { CITY } from "../constans/hardCoded/city/CityHardCoded";
import { POST } from "../constans/AxiosPost";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constans/Routes";
import { JWT } from "../constans/jwtToken";
import Cookies from "js-cookie";
import { PRODUCT } from "../constans/hardCoded/product/ProductHardCoded";
export default function ChooseCity({ setShowChooseCity }) {
  const [city, setCity] = useState("");
  const valContext = useContext(contextApi);
  const nav = useNavigate();
  const valid = async () => {
    if (!city) return alert("put a city");
    const token = Cookies.get(JWT.TOKEN);
    const res = await axios.post(
      POST.CITY,
      {
        city: city,
        userId: valContext.userData._id,
      },
      {
        headers: {
          authorization: `${JWT.BEARER} ${token}`,
        },
      }
    );
    if (res.data.msg === "complete") {
      alert(res.data.msg);
      valContext.city(city);
      setShowChooseCity(false);
      Cookies.set(JWT.TOKEN, res.data.token, { expires: 10 / (24 * 60) });
    } else {
      alert(res.data);
      nav(ROUTES.ENTRY);
      Cookies.remove(JWT.TOKEN);
    }
  };
  return (
    <div>
      <h1 className={cartCss.h1}>{CITY.CITY_DELIVER}</h1>
      <input
        type="text"
        placeholder="choose city to deliver"
        onChange={(e) => setCity(e.target.value)}
      />
      <button className={cartCss.payAllBtn} onClick={valid}>
        {CITY.SUMBIT}
      </button>
      <h2 onClick={() => setShowChooseCity(false)}>{PRODUCT.X}</h2>
    </div>
  );
}
