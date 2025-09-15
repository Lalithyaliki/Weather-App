import './styling/app/app.css';
import image from './image.jpg';
import loading from './loading.jpeg';
import Login from './components/Login.jsx';
import axios from 'axios';

import React, { useEffect, useState } from 'react';

function App() {

  const [showlogin, setlogin] = useState(false);
  const [showlogout, setlogout] = useState(false);
  const [logoutpopup, setlogoutpopup] = useState(false);
  const [popup, setpopup] = useState(false);
  const [loadinglogin, setlodinglogin] = useState(false);

  const [city, setcity] = useState('');
  const [history, sethistory] = useState([]);
  const [weatherDataMap, setWeatherDataMap] = useState({});
  const [showsearch, setShowSearch] = useState(false);
  const [error, seterror] = useState("");

  const [weather, setweather] = useState(null);
  const [searchpopup, setsearchpopup] = useState(false);
  const [imgloading, setimgloading] = useState(false);


  const submitForm = async (e) => {
    e.preventDefault();
    const cityName = city;

    setimgloading(true);

    try {

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setimgloading(false);

      const getWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f63770e8dc91b47dd79e9b768b4d4c98&units=metric`);
      setweather(getWeather.data);
      setWeatherDataMap((prev) => ({ ...prev, [cityName]: getWeather.data }));
      seterror("");
      setcity("");
      if (!history.includes(cityName)) {
        sethistory((prev) => [...prev, cityName]);
      }

      setsearchpopup(true);
      setTimeout(() => {
        setsearchpopup(false);
      }, 3000);
    }

    catch (e) {
      setcity("");
      setweather(null);
      seterror(` No City 
        Found - ${cityName}`);
    }

  }
  const handlesearch = (selectedcity) => {
    setShowSearch(false);
    const citydata = weatherDataMap[selectedcity];
    if (citydata) {
      setweather(citydata);
    }
  }

  const removecity = (citytoremove) => {
    sethistory(history.filter((c) => c !== citytoremove));
  };

  const handlesuccess = async () => {

    setlodinglogin(true);
    setlogin(false);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    setlodinglogin(false);
    setpopup(true);
    setlogout(true);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    setpopup(false);

  }

  const handlelogout = () => {
    setlogoutpopup(true);
  }

  const logout = () => {
    setlogoutpopup(false);
    setlogout(false);
  }

  return (
    <>

      {imgloading && (
        <div className='loading-login'>
          <img src={loading} alt='weather-img'></img></div>
      )}

      {logoutpopup &&
        <div className='logout loading-login'>
          <div className="logout-confirm">
            <button className='back-from-logout' onClick={() => setlogoutpopup(false)}>x</button>
            <h2 className='global-text'>Logout Conformation</h2>
            <p>Do you want to logout from this account</p>
            <div className='btn'>
              <button onClick={() => setlogoutpopup(false)}>cancel</button>
              <button onClick={() => logout()}>Logout</button>
            </div>
          </div>
        </div>}


      <p className={searchpopup ? "pop open" : "pop"}>Added city in search history</p>

      <p className={popup ? "pop open" : "pop"}>
        You logged Successfully!</p>

      {loadinglogin && <div className='loading-login global-text'>
        <div className='loading-message '>
          logging in
          <span className='dots global-text'>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </div>
      </div>}

      <div className='header'>
        <div className='nav'>
          <a href='#' className='global-text'>
            <img src={image} alt='weather-image'></img>
            weather Application
          </a>
          {/* <button type='button' onClick={() => showlogout ? handlelogout() : setlogin(true)}>{showlogout ? "logout" : "login/signup"}</button> */}

          <button
            type="button"
            onClick={() => {
              console.log("Button clicked. showlogout =", showlogout);
              if (showlogout) {
                console.log("Calling handlelogout()");
                handlelogout();
              } else {
                console.log("Opening login popup");
                setlogin(true);
              }
            }}
          >
            {showlogout ? "logout" : "login/signup"}
          </button>

        </div>
      </div>

      <div className='container'>
        <div className='search' >
          <div className='icon' onClick={() => setShowSearch(true)}><i className="bi bi-justify-right"></i></div>

          <div className={showsearch ? "overlays show-overlay" : "overlays"}
            onClick={() => setShowSearch(false)}>
          </div>

          <div className={showsearch ? "search-history show-history" : "search-history"}>
            <div className='history global-text'>
              <h3>Search History</h3>
              <button className="btn" onClick={() => setShowSearch(false)}>x</button>
            </div>
            <p className='clear-history' onClick={() => sethistory([])}>clear history</p>
            {history.length === 0 ? <p className='no-searched-cities global-text'>No search history</p> :
              <ul className='searched-cities global-text'>
                {history.map((cityName, index) => (
                  <li className='cities' onClick={() => handlesearch(cityName)} key={index}>{cityName}
                    <button onClick={(e) => { e.stopPropagation(); removecity(cityName); }} className='btn'>x</button>
                  </li>
                ))}
              </ul>}
          </div>
        </div>

        <div className='input-search'>
          <form onSubmit={submitForm}>
            <input type='text' name='name'
              value={city}
              onChange={(e) => setcity(e.target.value)} placeholder='enter the city...' required />
            <button type='submit'>weather</button>
          </form>
        </div>

        {weather && (
          <div className='weather'>
            <div className='weather-img'>
              <img
                src=
                {`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
            </div>
            <div className='weather-details'>
              <h2 className='global-text'>{weather.name} [{weather.sys.country}]</h2>
              <p><span>Temperature : </span>
                {weather.main.temp}°c/{((weather.main.temp * 9) / 5 + 32).toFixed(2)}°F
              </p>
              <p><span>Description : </span>
                {weather.weather[0].description}
              </p>
              <p><span>Humidity : </span>
                {weather.main.humidity}%
              </p>
              <p><span>Wind Speed : </span>
                {weather.wind.speed} m/s
              </p>
              <p><span>Sun Rise: </span>
                {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
              </p>
              <p><span>Sun Set: </span>
                {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className='not-found'>
            <span className='global-text'>{error}</span>
          </div>
        )}
      </div>

      {showlogin && <Login onclose={() => setlogin(false)} loginsuccess={handlesuccess} />}
    </>
  )
}

export default App
