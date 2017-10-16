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
		console.log(longitude + "  " + latitude);
		getWeatherDataAuto(latitude, longitude);
	}
	function error() {
		// alert("Unable to retrieve your location");
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
	console.log(urlString);
	// console.log("lat" + latitude + "&" + "lon" +longitude);
}

// Get weather data based on search
function getWeatherData(city) {
	var urlString = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&lang=en&APPID=303c4b17f85d64176ffd592811fd1b91";
	getData(urlString);
	console.log(urlString);
	// console.log("lat" + latitude + "&" + "lon" +longitude);
}

// Get weather AJAX
function getData(urlString) {
		$.ajax({
			"url": urlString,
			"type": "GET",
			"success": function(responce) {
				console.log(responce);
				console.log(responce.name);
				console.log("Rise " + transformDate(responce.sys.sunrise));
				console.log("Set " + transformDate(responce.sys.sunset));
				appendData(responce);
			},
			"error": function(error) {
				console.log(error);
			},
			crossDomain: true
	});
}

// Convert Date from ms
// TODO Don`t use library time.js
function transformDate(responce) {
	var timeSunriseSunstet = new Date(responce * 1000);
	return timeSunriseSunstet.toString("HH:mm");
}

// Append data to html
function appendData(responce) {
	var nameCity = responce.name;
	var nameCountry = responce.sys.country;
	var weatherDesc = responce.weather[0].description;
	infoTemp = responce.main.temp;
	var infoHumidity = responce.main.humidity;
	infoPresure = responce.main.pressure;
	infoWind = responce.wind.speed;
	var typeIcon = responce.weather[0].icon;
	$("#city-name").text(nameCity);
	$("#country").text(nameCountry);
	$("#desc").text(weatherDesc);
	$("#temp").text(Math.floor(infoTemp) + String.fromCharCode(176) + "C");
	$("#humidity").text(infoHumidity + String.fromCharCode(37));
	$("#pressure").text(Math.floor(infoPresure * 0.750062));
	$("#pressureUnits").text(pressureUnit);
	$("#wind").text(infoWind);
	$("#windUnits").text(windUnit);
	$("#linkToMap").attr("href", "http://openweathermap.org/find?q=" + nameCity + "," + nameCountry);
	console.log(typeIcon);
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
		default:
			$("#icon-img").attr("src", "img/animated-icons/cloudy.svg");
	}
}

// Convert Celsius to Fahrenheit and vice versa
$("#convertTemp").on("click", function () {
	console.log(infoTemp);
	if(tempUnit === "C") {
		console.log(infoTemp);
		var infoTempF = Math.floor(infoTemp * 9 / 5 + 32);
		tempUnit = "F";
		$("#temp").text(infoTempF + String.fromCharCode(176) + tempUnit);
		console.log(tempUnit);
	} else {
		tempUnit = "C";
		$("#temp").text(Math.floor(infoTemp) + String.fromCharCode(176) + tempUnit);
	}
});

// Convert mm of mercury to hPa
$("#convertPressure").on("click", function () {
	console.log(infoPresure);
	if(pressureUnit === "mm of mercury") {
		$("#pressure").text(Math.floor(infoPresure));
		pressureUnit = "hPa";
		$("#pressureUnits").text(pressureUnit);
		console.log(infoPresure);
	} else {
		$("#pressure").text(Math.floor(infoPresure * 0.750062));
		pressureUnit = "mm of mercury";
		$("#pressureUnits").text(pressureUnit);
	}
});

// Convert m/s to km/h
$("#convertWind").on("click", function () {
	if(windUnit === "m/s") {
		$("#wind").text(Math.floor(infoWind  * 3.6));
		windUnit = "km/h";
		$("#windUnits").text(windUnit);
	} else {
		$("#wind").text(Math.floor(infoWind));
		windUnit = "m/s";
		$("#windUnits").text(windUnit);
	}
});
