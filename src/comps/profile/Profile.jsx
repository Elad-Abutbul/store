import React, { useContext, useEffect, useState } from "react";
import profileCss from "../../styles/profile.module.css";
import { Link, Outlet } from "react-router-dom";
import { ROUTES } from "../../constans/Routes";
import { EMPTYSTRING } from "../../constans/EmptyString";
import { PROFILE } from "../../constans/hardCoded/profile/ProfileHardCoded";
import { contextApi } from "../../contextApi";
import { RANKSUSER } from "../../constans/RanksUser";
import axios from "axios";

export default function Profile() {
  const valContext = useContext(contextApi);
  const [selectedComponent, setSelectedComponent] = useState(
    ROUTES.VIEWPURCHASES
  );

  const handleSelectComponent = (component) => {
    setSelectedComponent(component);
  };
  const [name, setName] = useState("");
  const [wind, setWind] = useState("");
  const [temp, setTemp] = useState("");
  const [weatherDesc, setWeatherDesc] = useState("");
  useEffect(() => {
    if (valContext.userData?.city?.length !== 0) {
      const apiWeather = async () => {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${valContext.userData.city[0]}&APPID=8bbe2224a732eb2a389b79953a4a0ffd&units=metric`;
        const res = await axios.get(url);
        setWind(res.data.wind.speed);
        setName(res.data.name);
        setTemp(res.data.main.temp);
        setWeatherDesc(res.data.weather[0].description);
      };
      apiWeather();
    }
  });
  return (
    <>
      <div className={profileCss.container}>
        <h1 className={profileCss.h1}>Profile</h1>
        <div className={profileCss.links}>
          <Link to={ROUTES.EDIT}>
            <button
              className={`${profileCss.btn} ${
                selectedComponent === ROUTES.EDIT
                  ? profileCss.active
                  : EMPTYSTRING.EMPTYSTRING
              }`}
              onClick={() => handleSelectComponent(ROUTES.EDIT)}
            >
              {PROFILE.EDITPROFILE}
            </button>
          </Link>
          <Link to={ROUTES.VIEWPURCHASES}>
            <button
              className={`${profileCss.btn} ${
                selectedComponent === ROUTES.VIEWPURCHASES
                  ? profileCss.active
                  : EMPTYSTRING.EMPTYSTRING
              }`}
              onClick={() => handleSelectComponent(ROUTES.VIEWPURCHASES)}
            >
              {PROFILE.VIEW_PURCHASES}
            </button>
          </Link>
          {valContext.userData.rank !== RANKSUSER.CEO ? (
            <Link to={ROUTES.DELETEACCOUNT}>
              <button
                className={`${profileCss.btn} ${
                  selectedComponent === ROUTES.DELETEACCOUNT
                    ? profileCss.active
                    : EMPTYSTRING.EMPTYSTRING
                }`}
                onClick={() => handleSelectComponent(ROUTES.DELETEACCOUNT)}
              >
                {PROFILE.DELETE_ACCOUNT}
              </button>
            </Link>
          ) : (
            <Link to={PROFILE.DATA.toLowerCase()}>
              <button
                className={`${profileCss.btn} ${
                  selectedComponent === PROFILE.DATA.toLowerCase()
                    ? profileCss.active
                    : EMPTYSTRING.EMPTYSTRING
                }`}
                onClick={() =>
                  handleSelectComponent(PROFILE.DATA.toLowerCase())
                }
              >
                {PROFILE.DATA}
              </button>
            </Link>
          )}
        </div>
        {name !== EMPTYSTRING.EMPTYSTRING && (
          <div className={profileCss.weather}>
            <h4>{name}</h4>
            <p>Celsius: {temp} C° </p>
            <p>wind: {wind} kmh</p>
            <p>weather desc: {weatherDesc} </p>
          </div>
        )}

        <div id={profileCss.outlet}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
