import React, { useContext, useEffect, useState } from "react";
import cartCss from "../styles/cart.module.css";
import { contextApi } from "../contextApi";
import { CITY } from "../constans/hardCoded/city/CityHardCoded";
import { PRODUCT } from "../constans/hardCoded/product/ProductHardCoded";
import useWeather from "../outSideFunction/functionApp/Weather";
export default function ChooseCity({ setShowChooseCity }) {
  const valContext = useContext(contextApi);
  const { apiWeather } = useWeather();
  const valid = async () => {
    debugger;
    if (valContext.selectCity === "") return alert("choose a city");
    apiWeather(setShowChooseCity);
  };
  useEffect(() => {
    valContext.setSelectedIteamToPay([]);
  }, []);
  return (
    <div className={cartCss.containerCity}>
      <h1 className={cartCss.h1}>{CITY.CITY_DELIVER}</h1>
      <input
        type="text"
        placeholder="choose city to deliver"
        onChange={(e) => valContext.setSelectCity(e.target.value)}
      />
      <button className={cartCss.btnCity} onClick={valid}>
        {CITY.SUMBIT}
      </button>
      <h2 onClick={() => setShowChooseCity(false)} className={cartCss.xCity}>{PRODUCT.X}</h2>
    </div>
  );
}
