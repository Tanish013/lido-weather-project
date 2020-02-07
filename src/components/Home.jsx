import React, { Component } from "react";
import "../css/home.css";
// import { getCurrentData } from "../getWeather";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      currentData: "",
      countryName: {},
      tomdata: [],
      cityName: "",
      today: false,
      hourly: false,
      tomorrow: false
    };
  }
  dateBuilder = d => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  getData = e => {
    if (this.state.cityName !== "") {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.cityName}&units=metric&cnt=10&APPID=566a99d54766a0fc5a545135c8cfab75`
      )
        .then(res => res.json())
        .then(res => {
          if (res.message !== "404") {
            this.setState({
              tomdata: res.list,
              countryName: res.city,
              hourly: true,
              tomorrow: false,
              today: false
            });
          } else {
            alert(res.message);
          }
          //console.log(this.state.tomdata);
        })
        .catch(err => console.log(err));
    } else {
      alert("Please enter a valid city Name");
    }
  };
  getDatatomo = e => {
    if (this.state.cityName !== "") {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.cityName}&units=metric&cnt=10&APPID=566a99d54766a0fc5a545135c8cfab75`
      )
        .then(res => res.json())
        .then(res => {
          if (res.cod !== "404") {
            this.setState({
              tomdata: res.list,
              countryName: res.city,
              tomorrow: true,
              hourly: false,
              today: false
            });
          } else {
            alert(res.message);
          }
          // console.log(this.state.tomdata);
        })
        .catch(err => console.log(err));
    } else {
      alert("Please enter a city name");
    }
  };
  getTodayData = e => {
    if (this.state.cityName !== "") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName}&units=metric&APPID=566a99d54766a0fc5a545135c8cfab75`
      )
        .then(res => res.json())
        .then(res => {
          if (res.cod !== "404") {
            this.setState({
              currentData: res,
              today: true,
              hourly: false,
              tomorrow: false
            });
          } else {
            alert(res.message);
          } //console.log(this.state.currentData);
        })
        .catch(err => console.log(err));
    } else {
      alert("Please enter a city name");
    }
  };

  render() {
    const { cityName, currentData, countryName } = this.state;
    return (
      <div className="background">
        <div className="container">
          <div>
            <h1 className="text-center display-3">Weather App</h1>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter City"
                onChange={this.handleChange("cityName")}
                defaultValue={cityName}
                minLength="3"
                maxLength="30"
              />
              <div className="row mt-4">
                <div className="col-xs">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={e => this.getTodayData()}
                    style={{ margin: "10px" }}
                  >
                    Today's
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={e => this.getDatatomo()}
                    style={{ margin: "10px" }}
                  >
                    Tomorrow
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={e => this.getData()}
                    style={{ margin: "10px" }}
                  >
                    Hourly
                  </button>
                </div>
              </div>
            </div>
          </div>
          {this.state.today ? (
            <div className="text-center">
              <p className="display-3 font-weight-bold">
                {currentData.name}, {currentData.sys.country}
              </p>
              <h4 className="font-italic">{this.dateBuilder(new Date())}</h4>
              <h4 className="font-italic">
                Humidity: {currentData.main.humidity}%
              </h4>
              <h4 className="font-italic">
                Pressure: {currentData.main.pressure}psi
              </h4>
              <h4 className="font-italic">{currentData.weather[0].main}</h4>
              <h4 className="font-italic">Wind: {currentData.wind.speed}mph</h4>
              <h4 id="temp">
                {Math.round(currentData.main.temp)}
                <sup>o</sup>C
              </h4>
            </div>
          ) : (
            ""
          )}
          {this.state.tomorrow
            ? this.state.tomdata.slice(8, 9).map(weather => {
                return (
                  <div className="text-center">
                    <p className="display-3 font-weight-bold">
                      {countryName.name},{countryName.country}
                    </p>
                    <h4 className="font-italic">{weather.dt_txt}</h4>
                    <h4 className="font-italic">
                      Humidity: {weather.main.humidity}%
                    </h4>
                    <h4 className="font-italic">
                      Pressure: {weather.main.pressure}psi
                    </h4>
                    <h4 className="font-italic">{weather.weather[0].main}</h4>
                    <h4 className="font-italic">
                      Wind: {weather.wind.speed}mph
                    </h4>
                    <h4 id="temp">
                      {Math.round(weather.main.temp)}
                      <sup>o</sup>C
                    </h4>
                  </div>
                );
              })
            : ""}
          {this.state.hourly ? (
            <div>
              <p className="text-center display-3 font-weight-bold">
                {countryName.name},{countryName.country}
              </p>
              {this.state.tomdata.map(weather => {
                return (
                  <div className="text-center">
                    <h4 className="font-italic">{weather.dt_txt}</h4>
                    <h4 className="font-italic">
                      Humidity: {weather.main.humidity}%
                    </h4>
                    <h4 className="font-italic">
                      Pressure: {weather.main.pressure}psi
                    </h4>
                    <h4 className="font-italic">{weather.weather[0].main}</h4>
                    <h4 className="font-italic">
                      Wind: {weather.wind.speed}mph
                    </h4>
                    <h4 id="temp">
                      {Math.round(weather.main.temp)}
                      <sup>o</sup>C
                    </h4>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
