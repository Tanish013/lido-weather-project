import React, { Component } from "react";
import "../css/home.css";
import dateBuilder from "./date";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      currentData: "",
      countryName: {},
      tomdata: [],
      cityName: "",
      error: "",
      today: false,
      hourly: false,
      tomorrow: false,
      count: 1,
      display: false,
      forecast_url:
        process.env.REACT_APP_WEATHER_URL +
        "/forecast?units=metric&cnt=10&APPID=" +
        process.env.REACT_APP_WEATHER_API_KEY +
        "&q=",
      weather_url:
        process.env.REACT_APP_WEATHER_URL +
        "/weather?units=metric&cnt=10&APPID=" +
        process.env.REACT_APP_WEATHER_API_KEY +
        "&q="
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value, error: "", display: false });
  };
  getHourlyData = e => {
    if (this.state.cityName !== "") {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.cityName}&units=metric&cnt=10&APPID=566a99d54766a0fc5a545135c8cfab75`
      ).then(res => {
        if (res.ok) {
          res.json().then(res => {
            this.setState({
              tomdata: res.list,
              countryName: res.city,
              today: false,
              hourly: true,
              tomorrow: false
            });
          });
        } else {
          // alert("Please enter a valid City Name");
          this.setState({
            error: "Enter valid city name",
            display: true,
            today: false,
            hourly: false,
            tomorrow: false
          });
        }
      });
    } else {
      this.setState({
        error: "Enter valid city name",
        display: true,
        today: false,
        hourly: false,
        tomorrow: false
      });
    }
  };
  getTomorrowData = e => {
    if (this.state.cityName !== "") {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.cityName}&units=metric&cnt=10&APPID=566a99d54766a0fc5a545135c8cfab75`
      ).then(res => {
        if (res.ok) {
          res.json().then(res => {
            this.setState({
              tomdata: res.list,
              countryName: res.city,
              today: false,
              hourly: false,
              tomorrow: true
            });
          });
        } else
          this.setState({
            error: "Enter valid city name",
            display: true,
            today: false,
            hourly: false,
            tomorrow: false
          });
      });
    } else {
      this.setState({
        error: "Enter valid city name",
        display: true,
        today: false,
        hourly: false,
        tomorrow: false
      });
    }
  };
  getTodayData = e => {
    if (this.state.cityName !== "") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName}&units=metric&APPID=566a99d54766a0fc5a545135c8cfab75`
      ).then(res => {
        if (res.ok) {
          res.json().then(res => {
            this.setState({
              currentData: res,
              today: true,
              hourly: false,
              tomorrow: false
            });
          });
        } else
          this.setState({
            error: "Enter valid city name",
            display: true,
            today: false,
            hourly: false,
            tomorrow: false
          });
      });
    } else {
      this.setState({
        error: "Enter valid city name",
        display: true,
        today: false,
        hourly: false,
        tomorrow: false
      });
    }
  };

  render() {
    const { cityName, currentData, countryName } = this.state;
    return (
      <div className="container">
        <div>
          <h1 className="text-center font-weight-bold display-3">
            Weather App
          </h1>

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
            <div
              className="jumbotron text center font-weight-bold"
              style={{ display: this.state.error ? "" : "none" }}
            >
              {this.state.error}
            </div>
            <div className="row mt-4">
              <div className="col-xs">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={e => this.getTodayData()}
                  style={{ margin: "10px" }}
                >
                  Today
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={e => this.getTomorrowData()}
                  style={{ margin: "10px" }}
                >
                  Tomorrow
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={e => this.getHourlyData()}
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
            <h4 className="font-italic">{dateBuilder(new Date())}</h4>
            <h4 id="temp">
              {Math.round(currentData.main.temp)}
              <sup>o</sup>C
            </h4>
            <h4 className="font-italic">
              Humidity: {currentData.main.humidity}%
            </h4>
            <h4 className="font-italic">
              Pressure: {currentData.main.pressure}psi
            </h4>
            <h4 className="font-italic">{currentData.weather[0].main}</h4>
            <h4 className="font-italic">Wind: {currentData.wind.speed}mph</h4>
          </div>
        ) : (
          ""
        )}
        {this.state.tomorrow
          ? this.state.tomdata.slice(8, 9).map(weather => {
              return (
                <div
                  className="text-center"
                  key={() => {
                    this.setState({ count: this.state.count + 1 });
                    return this.state.count;
                  }}
                >
                  <p className="display-3 font-weight-bold">
                    {countryName.name},{countryName.country}
                  </p>
                  <h4 className="font-italic">{weather.dt_txt}</h4>
                  <h4 id="temp">
                    {Math.round(weather.main.temp)}
                    <sup>o</sup>C
                  </h4>
                  <h4 className="font-italic">
                    Humidity: {weather.main.humidity}%
                  </h4>
                  <h4 className="font-italic">
                    Pressure: {weather.main.pressure}psi
                  </h4>
                  <h4 className="font-italic">{weather.weather[0].main}</h4>
                  <h4 className="font-italic">Wind: {weather.wind.speed}mph</h4>
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
                <div>
                  <div className="text-center">
                    <h4 className="font-italic">{weather.dt_txt}</h4>
                    <h4 id="temp">
                      {Math.round(weather.main.temp)}
                      <sup>o</sup>C
                    </h4>
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
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
