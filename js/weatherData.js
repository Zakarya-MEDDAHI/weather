const URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "c104609c911615c3e22122be3dfdef7d";

class Today {
  constructor(searchParams) {
    this.q = searchParams.q;
    this.placeId;
  }

  // get data of today
  async getWeatherData() {
    const url = `${URL}weather?q=${this.q}&units=metric&appid=${API_KEY}`;
    return await fetch(url).then(res => res.json());
  }

  // format the data of Today
  formatCurrentWeather(data) {
    const {
      coord: { lat, lon },
      main: { temp, feels_like, temp_min, temp_max, humidity },
      name,
      dt,
      sys: { country, sunrise, sunset },
      weather,
      wind: { speed: windSpeed },
      id,
      visibility,
    } = data;

    const { main: details, icon } = weather[0];
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString("default");
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString("default");
    const visibilityKm = (visibility / 1000) * 1.6;
    return {
      id,
      lat,
      lon,
      temp,
      feels_like,
      temp_min,
      temp_max,
      humidity,
      name,
      dt,
      country,
      sunriseTime,
      sunsetTime,
      weather,
      windSpeed,
      details,
      icon,
      visibilityKm,
    };
  }

  // retrun id of the specific place
  getPlaceId() {
    return this.placeId;
  }

  async formatData() {
    const currentWeather = await this.getWeatherData().then(data =>
      this.formatCurrentWeather(data)
    );

    // set the id of place
    this.placeId = currentWeather.id;

    return currentWeather;
  }
}

class Forecast {
  constructor(id) {
    this.id = id;
    this.daysData = [];
    this.unformatedData = [];
    this.formatedData = [];
  }

  async getForecastData() {
    const url = `${URL}forecast?id=${this.id}&units=metric&appid=${API_KEY}`;

    await fetch(url)
      .then(res => res.json())
      .then(data => (this.unformatedData = data));
  }

  async getForecastDaysData() {
    await this.getForecastData();
    for (let day = 1; day < 6; day++) {
      var date = new Date();
      date.setDate(date.getDate() + day);

      let newArr = this.unformatedData.list.filter(data =>
        data.dt_txt.includes(date.toISOString().slice(0, 10))
      );

      this.daysData.push(newArr[0]);
    }
  }

  convertTimeStamp(time) {
    let a = new Date(time * 1000);
    let days = [ "Sun" ,"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let dayOfWeek = days[a.getDay()];

    return dayOfWeek;
  }
  async FormatData() {
    await this.getForecastDaysData();

    this.daysData.forEach(e => {
      const {
        main: { feels_like, temp_min, temp_max },
        dt_txt,
      } = e;

      const { icon } = e.weather[0];
      const date = this.convertTimeStamp(e.dt);
      this.formatedData.push({
        dt_txt,
        feels_like,
        temp_min,
        temp_max,
        icon,
        date,
      });
    });
    return this.formatedData;
  }
}

export { Today, Forecast };
