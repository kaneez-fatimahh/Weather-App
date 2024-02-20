let container = document.getElementById("container");
let input = document.getElementById("input");
let searchBtn = document.getElementById("button-addon2");
let weatherImg = document.getElementById("weather-img");

//weather for lahore
let func = async () => {
  try {
    let url =
      "https://api.openweathermap.org/data/2.5/weather?q=lahore&appid=684788eb847ff0045c56f563fb73853a&units=metric";
    let response = await fetch(url);
    let data = await response.json();
    let weather = data;
    console.log(weather);
    display(data);
    if (weatherImg) {
      console.log(weatherImg);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
func();


//fetch weather of search city
let fetchSearch = async () => {
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=684788eb847ff0045c56f563fb73853a&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    let weather = data;
    console.log(weather);
    container.innerHTML = "";
    display(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  input.value = "";
};


//display fetch data
let display = (data) => {
  if (data.cod == 404) {
    console.log("wrong");
    let msg = document.createElement("h5");
    msg.innerText = "City Not Found";
    container.appendChild(msg);
  } else if (data.cod == 400) {
    let msg = document.createElement("h5");
    msg.innerText = "Enter a City";
    container.appendChild(msg);
  }

  let card = document.createElement("div");
  let weatherImageSrc;

  switch (data.weather[0].main) {
    case "Clouds":
      weatherImageSrc = "images/cloud.png";
      break;
    case "Clear":
      weatherImageSrc = "images/sun.png";
      break;
    case "Rain":
      weatherImageSrc = "images/rain.png";
      break;
    case "Mist":
      weatherImageSrc = "images/mist.png";
      break;
    case "Snow":
      weatherImageSrc = "images/snowfall.png";
      break;
    case "Thunderstorm":
      weatherImageSrc = "images/lightning.png";
      break;
    case "Smoke":
      weatherImageSrc = "images/mist.png";
      break;
    case "Haze":
      weatherImageSrc = "images/clear-sky.png";
      break;
    default:
      weatherImageSrc = "images/sun.png";
      break;
  }
  card.innerHTML = ` <div class="card mx-auto my-5" style="width: 18rem;">
      <img src="${weatherImageSrc}" class="card-img-top weather-img mx-auto mt-3" alt="..." style="max-width: 200px;" id="weather-img">
  
      <div class="card-body text-center">
      <h1>${Math.round(data.main.temp)}°C</h1>
      <h5 class="card-title">${data.weather[0].main} <span>${Math.round(
    data.main.temp_min
  )}/${Math.round(data.main.temp_max)}</span> </h5>
   <h3 class="card-title">${data.name}</h3>
   <div class="row mb-4 mt-4">
   <div class="col-6">
     <div class=""> 
       <i class="fa-solid fa-water"></i>
  <span>${data.main.humidity}%</span> 
  <h6>Humidity</h6>
  </div>
   </div>
   <div class="col-6">
     <div class=""> 
       <i class="fa-solid fa-wind"></i>
       <span>${data.wind.speed}k/hr</span> 
  <h6>Wind Speed</h6>
  </div>
   </div>
  </div>
      </div>
    </div>  `;
  container.appendChild(card);
};
