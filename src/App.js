import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [input, setInput] = useState("Kiev");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("");

  useEffect(() => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=0ce22d00c19b43c9a22110034220502&q=${input}&aqi=no`
    )
      .then((resp) => resp.json())
      .then((result) => {
        if (result.error) {
          setError(result.error);
          setIsLoaded(true);
        } else {
          setCity(result);
          setIsLoaded(true);
        }
      });
  }, [input]);

  // if (error) {
  //   return <div>Ошибка: {error.message}</div>;
  // } else
  if (!isLoaded) {
    return <div>Loading.....</div>;
  } else {
    return (
      <div className="App">
        <input value={input} placeholder={'Search..'} className="search" onInput={(e) => setInput(e.target.value)} />
        <header className="App__header">
          <div className="header__city">{city.location.name}</div>
          <div className="header__time">{city.location.localtime}</div>
        </header>
        <div className="App__content">
          <img
            src={city.current.condition.icon}
            alt="weather"
            className="content__icon"
          />
          <p className="content__discription">{city.current.condition.text}</p>
        </div>
        <div className="App__details">
          <div className="details__items">
            <p className="details__item">{city.current.wind_kph} km/h</p>
            <p className="details__item">{city.current.humidity}%</p>
            <p className="details__item">{city.current.feelslike_c}°</p>
          </div>
          <div className="details__degrees">{city.current.temp_c}°</div>
        </div>
      </div>
    );
  }
}

export default App;
