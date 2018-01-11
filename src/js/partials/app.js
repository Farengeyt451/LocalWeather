var infoTemp,
		tempUnit = "C",
		infoPresure,
		pressureUnit = "mm of mercury",
		inforWind,
		windUnit = "m/s";

$(document).ready(function(){
	geoFindMe();
});

// Get latitude and longitude
function geoFindMe() {
	var latitude, longitude;
	if (!navigator.geolocation){
		alert("Geolocation is not supported by your browser");
		return;
	}
	function success(position) {
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
		getWeatherDataAuto(latitude, longitude);
	}
	function error() {
		getWeatherDataAuto(51.509865, -0.118092);
	}
	navigator.geolocation.getCurrentPosition(success, error);
}

// Search location manually
$("#searchCity").on("click", function () {
	event.preventDefault();
	var city = $("#input-city").val();
	getWeatherData(city);
});

// Get weather data based on latitude and longitude
function getWeatherDataAuto(latitude, longitude) {
	var urlString = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric&lang=en&APPID=303c4b17f85d64176ffd592811fd1b91";
	getData(urlString);
}

// Get weather data based on search
function getWeatherData(city) {
	var urlString = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&lang=en&APPID=303c4b17f85d64176ffd592811fd1b91";
	getData(urlString);
}

// Get weather AJAX
function getData(urlString) {
		$.ajax({
			"url": urlString,
			"type": "GET",
			"success": function(responce) {
				appendData(responce);
			},
			"error": function(error) {
				console.log(error);
			},
			crossDomain: true
	});
}

// Append data to html
function appendData(responce) {
	var nameCity = responce.name;
	var nameCountry = responce.sys.country;
	var weatherDesc = responce.weather[0].description;
	var infoHumidity = responce.main.humidity;
	var typeIcon = responce.weather[0].icon;
	infoPresure = responce.main.pressure;
	infoTemp = responce.main.temp;
	infoWind = responce.wind.speed;
	pressureUnit = "mm of mercury",
	windUnit = "m/s";
	$("#city-name").text(nameCity);
	$("#country").text(nameCountry);
	$("#desc").text(weatherDesc);
	$("#temp").text(Math.round(infoTemp) + String.fromCharCode(176) + "C");
	$("#humidity").text(infoHumidity + String.fromCharCode(37));
	$("#pressure").text(Math.round(infoPresure * 0.750062));
	$("#pressureUnits").text(pressureUnit);
	$("#wind").text(Math.round(infoWind));
	$("#windUnits").text(windUnit);
	$("#linkToMap").attr("href", "http://openweathermap.org/find?q=" + nameCity + "," + nameCountry);
	switch(typeIcon) {
		case "01d":
			$("#icon-img").attr("src", "img/animated-icons/day.svg");
			break;
		case "01n":
			$("#icon-img").attr("src", "img/animated-icons/night.svg");
			break;
		case "02d":
			$("#icon-img").attr("src", "img/animated-icons/cloudy-day-2.svg");
			break;
		case "02n":
			$("#icon-img").attr("src", "img/animated-icons/cloudy-night-2.svg");
			break;
		case "03d":
			$("#icon-img").attr("src", "img/animated-icons/cloudy-day-3.svg");
			break;
		case "03n":
			$("#icon-img").attr("src", "img/animated-icons/cloudy-night-3.svg");
			break;
		case "04d":
			$("#icon-img").attr("src", "img/animated-icons/cloudy.svg");
			break;
		case "04n":
			$("#icon-img").attr("src", "img/animated-icons/cloudy.svg");
			break;
		case "09d":
			$("#icon-img").attr("src", "img/animated-icons/rainy-2.svg");
			break;
		case "09n":
			$("#icon-img").attr("src", "img/animated-icons/rainy-5.svg");
			break;
		case "10d":
			$("#icon-img").attr("src", "img/animated-icons/rainy-3.svg");
			break;
		case "10n":
			$("#icon-img").attr("src", "img/animated-icons/rainy-6.svg");
			break;
		case "11d":
			$("#icon-img").attr("src", "img/animated-icons/thunder.svg");
			break;
		case "11n":
			$("#icon-img").attr("src", "img/animated-icons/thunder.svg");
			break;
		case "13d":
			$("#icon-img").attr("src", "img/animated-icons/snowy-2.svg");
			break;
		case "13n":
			$("#icon-img").attr("src", "img/animated-icons/snowy-6.svg");
			break;
		case "50d":
			$("#icon-img").attr("src", "img/animated-icons/mist-d-n.svg");
			break;
		case "50n":
			$("#icon-img").attr("src", "img/animated-icons/mist-d-n.svg");
			break;
		default:
			$("#icon-img").attr("src", "img/animated-icons/cloudy.svg");
	}
}

// Convert Celsius to Fahrenheit and vice versa
$("#convertTemp").on("click", function () {
	if(tempUnit === "C") {
		var infoTempF = Math.round(infoTemp * 9 / 5 + 32);
		tempUnit = "F";
		$("#temp").text(infoTempF + String.fromCharCode(176) + tempUnit);
	} else {
		tempUnit = "C";
		$("#temp").text(Math.round(infoTemp) + String.fromCharCode(176) + tempUnit);
	}
});

// Convert mm of mercury to hPa
$("#convertPressure").on("click", function () {
	if(pressureUnit === "mm of mercury") {
		$("#pressure").text(Math.round(infoPresure));
		pressureUnit = "hPa";
		$("#pressureUnits").text(pressureUnit);
	} else {
		$("#pressure").text(Math.round(infoPresure * 0.750062));
		pressureUnit = "mm of mercury";
		$("#pressureUnits").text(pressureUnit);
	}
});

// Convert m/s to km/h
$("#convertWind").on("click", function () {
	if(windUnit === "m/s") {
		$("#wind").text(Math.round(infoWind  * 3.6));
		windUnit = "km/h";
		$("#windUnits").text(windUnit);
	} else {
		$("#wind").text(Math.round(infoWind));
		windUnit = "m/s";
		$("#windUnits").text(windUnit);
	}
});
