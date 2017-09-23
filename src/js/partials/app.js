$(document).ready(function(){
	// getWeatherData();
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

function getWeatherDataAuto(latitude, longitude) {
	var urlString = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric&lang=ru&APPID=303c4b17f85d64176ffd592811fd1b91";
	getData(urlString);
	console.log(urlString);
	// console.log("lat" + latitude + "&" + "lon" +longitude);
}

function getWeatherData(city) {
	var urlString = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&lang=ru&APPID=303c4b17f85d64176ffd592811fd1b91";
	getData(urlString);
	console.log(urlString);
	// console.log("lat" + latitude + "&" + "lon" +longitude);
}

function getData(urlString) {
		$.ajax({
			"url" : urlString,
			"type" : "GET",
			"success" : function(responce) {
				console.log(responce);
				console.log(responce.name);
				console.log("Rise " + transformDate(responce.sys.sunrise));
				console.log("Set " + transformDate(responce.sys.sunset));
				getCityName(responce);
			},
			"error" : function(error) {
				console.log(error);
			},
			crossDomain: true
	});
}

function transformDate(responce) {
	var timeSunriseSunstet = new Date(responce * 1000);
	return timeSunriseSunstet.toString("HH:mm");
}

function getCityName(responce) {
	$("#city-name").text(responce.name);
	$("#country").text(responce.sys.country);
	$("#desc").text(responce.weather[0].description);
	$("#temp").text(Math.floor(responce.main.temp) + String.fromCharCode(176) + "C");
	$("#humidity").text(responce.main.humidity + String.fromCharCode(37));
	$("#pressure").text(Math.floor(responce.main.pressure * 0.750062) + " " + "мм рт.ст");
	$("#wind").text(responce.wind.speed + " " + "м/с");
	console.log(responce.weather[0].icon);
	switch(responce.weather[0].icon) {
		case "01d":
			$("#icon-img").attr("src", "../img/animated-icons/day.svg");
			break;
		case "01n":
			$("#icon-img").attr("src", "../img/animated-icons/night.svg");
			break;
		case "02d":
			$("#icon-img").attr("src", "../img/animated-icons/cloudy-day-2.svg");
			break;
		case "02n":
			$("#icon-img").attr("src", "../img/animated-icons/cloudy-night-2.svg");
			break;
		case "03d":
			$("#icon-img").attr("src", "../img/animated-icons/cloudy-day-3.svg");
			break;
		case "03n":
			$("#icon-img").attr("src", "../img/animated-icons/cloudy-night-3.svg");
			break;
		case "04d":
			$("#icon-img").attr("src", "../img/animated-icons/cloudy.svg");
			break;
		case "04n":
			$("#icon-img").attr("src", "../img/animated-icons/cloudy.svg");
			break;
		case "09d":
			$("#icon-img").attr("src", "../img/animated-icons/rainy-2.svg");
			break;
		case "09n":
			$("#icon-img").attr("src", "../img/animated-icons/rainy-5.svg");
			break;
		case "10d":
			$("#icon-img").attr("src", "../img/animated-icons/rainy-3.svg");
			break;
		case "10n":
			$("#icon-img").attr("src", "../img/animated-icons/rainy-6.svg");
			break;
		case "11d":
			$("#icon-img").attr("src", "../img/animated-icons/thunder.svg");
			break;
		case "11n":
			$("#icon-img").attr("src", "../img/animated-icons/thunder.svg");
			break;
		case "13d":
			$("#icon-img").attr("src", "../img/animated-icons/snowy-2.svg");
			break;
		case "13n":
			$("#icon-img").attr("src", "../img/animated-icons/snowy-6.svg");
			break;
		default:
			$("#icon-img").attr("src", "../img/animated-icons/cloudy.svg");
	}
}

$("#searchCity").on("click", function () {
	event.preventDefault();
	var city = $("#input-city").val();
	getWeatherData(city);
});
