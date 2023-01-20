import { Today, Forecast } from "./weatherData.js";

let todayData = {};
let foreCastDataList = [];

const getTodayData = new Today({ q: "chlef" });

getTodayData.formatData().then(res => {
  todayData = res;

  const forecastData = new Forecast(getTodayData.placeId);

  forecastData.FormatData().then(res => {
    foreCastDataList = res;

    console.log(todayData);
    console.log(foreCastDataList);

    // render

    // render today weather
    const todayWeather = document.querySelector("#degre_number");
    todayWeather.innerHTML = Math.floor(todayData.temp);
    // render date
    const todayDate = document.querySelector("#today_date");
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    console.log(date);
    todayDate.innerHTML = date;
    // render status
    const status_details = document.getElementById("status_details");
    status_details.innerHTML = todayData.details;
    // render place
    const place = document.getElementById("place");
    place.innerHTML = todayData.country + " ," + todayData.name;
    // render wind status
    const windStatus = document.getElementById("wind_status");
    windStatus.innerHTML = todayData.windSpeed;
    // render sunset and sunrise
    const sunset = document.getElementById("sunset");
    sunset.innerHTML = todayData.sunsetTime;
    const sunrise = document.getElementById("sunrise");
    sunrise.innerHTML = todayData.sunriseTime;
    // render visibility
    const visibility = document.getElementById("visibility");
    visibility.innerHTML = Math.round(todayData.visibilityKm);
    // render humidity
    const humidity = document.getElementById("humidity");
    humidity.innerHTML = todayData.humidity / 10;

    // render Forecast
    let weakBoxe = document.querySelector(".week-boxes");
    foreCastDataList.forEach(e => {
      let box = ` <div class="day-box">
      <p>${e.date}</p>
      <img src="weather-condition/sunny.png" alt="">
      <div>${e.feels_like}<span>°</span></div>
      <div>${e.temp_max}<span>°</span></div>
  </div>`;
      console.log(box);
      weakBoxe.innerHTML += box;
    });
  });
});
