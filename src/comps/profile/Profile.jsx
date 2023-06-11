import React, { useContext, useEffect, useState } from "react";
import profileCss from "../../styles/profile.module.css";
import { Link, Outlet } from "react-router-dom";
import { ROUTES } from "../../constans/Routes";
import { EMPTYSTRING } from "../../constans/EmptyString";
import { PROFILE } from "../../constans/hardCoded/profile/ProfileHardCoded";
import { contextApi } from "../../contextApi";
import { RANKSUSER } from "../../constans/RanksUser";
import useWeather from "../../outSideFunction/functionApp/Weather";

export default function Profile() {
  const valContext = useContext(contextApi);
  const [selectedComponent, setSelectedComponent] = useState(
    ROUTES.VIEWPURCHASES
  );
  const { apiWeather, infoWeather } = useWeather();

  const handleSelectComponent = (component) => {
    setSelectedComponent(component);
  };
  useEffect(() => {
    valContext.userData?.city[0] && apiWeather();
  }, []);
  return (
    <>
      <div className={profileCss.container}>
        <h1 className={profileCss.h1}>{PROFILE.PROFILE}</h1>
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
                  selectedComponent === PROFILE.DATA
                    ? profileCss.active
                    : EMPTYSTRING.EMPTYSTRING
                }`}
                onClick={() =>
                  handleSelectComponent(PROFILE.DATA)
                }
              >
                {PROFILE.DATA}
              </button>
            </Link>
          )}
        </div>
        {infoWeather?.map((valWeather) => {
          return (
            <div className={profileCss.weather}>
              <h3>{valWeather.name}</h3>
              <p>
                {PROFILE.CELSIUS} {valWeather.temp}
                {PROFILE.SIGN_CELSIUS}
              </p>
              <p>
                {PROFILE.WEATHER_DESC} {valWeather.desc}
              </p>
              <p>
                {PROFILE.WIND} {valWeather.wind}
                {PROFILE.KMH}
              </p>
            </div>
          );
        })}

        <div id={profileCss.outlet}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
