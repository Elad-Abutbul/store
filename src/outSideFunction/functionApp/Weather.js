import { useContext, useState } from "react";
import { contextApi } from "../../contextApi";
import axios from "../../axiosConfig";
import useCity from "../functionCity/CityPost";
const useWeather = () => {
  const valContext = useContext(contextApi);
  const [infoWeather, setInfoWeather] = useState([]);
  const { cityPost } = useCity();

  const apiWeather = async (setShowChooseCity, boolean) => {
    let url;
    try {
      if (setShowChooseCity !== undefined) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${valContext.selectCity}&APPID=8bbe2224a732eb2a389b79953a4a0ffd&units=metric`;
      } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${valContext.userData.city[0]}&APPID=8bbe2224a732eb2a389b79953a4a0ffd&units=metric`;
      }
      const res = await axios.get(url);
      setInfoWeather([
        {
          name: res.data.name,
          wind: res.data.wind.speed,
          temp: res.data.main.temp,
          desc: res.data.weather[0].description,
        },
      ]);
      if (setShowChooseCity !== undefined && boolean === undefined) {
        cityPost(setShowChooseCity);
      }
    } catch (error) {
      if (error.response.status === 404) {
        alert('not a valid city');
        setInfoWeather(false);
      }
    }
  };
  return { apiWeather, infoWeather, setInfoWeather };
};
export default useWeather;
