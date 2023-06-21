const apiKey = '6eb1180161eccb06843669dbee0f87b3';
const searchForm = document.getElementById('search-form');
const inputCity = document.getElementById('input_city');

const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const weatherIconElement = document.getElementById('weather-icon');
const errorElement = document.getElementById('error-message');

// search event handling
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const city = inputCity.value.trim();
    if (city === '') {
      displayError('Please enter a city name');
    } else {
      getWeatherData(city);
    }
});

// get weather data from api request
function getWeatherData(city) {  
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // check success code 200 get or not 
      if (data.cod === 200) {
        displayWeatherData(data);
      } else {
        displayError('Location not found');
      }

    }).catch(error => {
      console.log('Error:', error);
      displayError('An error occurred while fetching weather data');
    });
}

// display weather data by arrow function
const displayWeatherData = (data="" /*defult peramiter value is blank */) =>{
  errorElement.textContent = '';
  errorElement.style.display = 'none';
  const location = `${data.name} , ${data.sys.country}`; //use template literal
  const temperature = `${Math.round(data.main.temp)} \u00B0C`; //use template literal
  const description = data.weather[0].description;
  const humidity =  `${data.main.humidity} %`; //template literal
  const icon = data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/w/${icon}.png`; //use here template litaral

  locationElement.textContent = location;
  temperatureElement.textContent = temperature;
  descriptionElement.textContent = description;
  humidityElement.textContent = `Humidity: ${humidity}`; //use here template litaral
  weatherIconElement.src = iconUrl;
}

// for display error message 
function displayError(errorMessage) {
  locationElement.textContent = '';
  temperatureElement.textContent = '';
  descriptionElement.textContent = '';
  weatherIconElement.src = '';
  errorElement.textContent = errorMessage;
  errorElement.style.display = 'block';
}

// for hide error message
function hideError() {
  errorElement.style.display = 'none';
}
  



