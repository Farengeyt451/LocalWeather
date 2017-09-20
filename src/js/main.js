$( document ).ready(function(){
	// getWeatherData();
	// geoFindMe();
});

// Get latitude and longitude
	function geoFindMe() {
		var latitude, longitude;
		if (!navigator.geolocation){
			alert("Geolocation is not supported by your browser");
			return;
		}
		function success(position) {
			latitude  = position.coords.latitude;
			longitude = position.coords.longitude;
			console.log(longitude + "  " + latitude);
			getWeatherData(latitude, longitude);
		}
		function error() {
			alert("Unable to retrieve your location");
		}
		navigator.geolocation.getCurrentPosition(success, error);
	}

// Get data from FreeCodeCamp API
	// function getWeatherData (latitude, longitude) {
	// 	var urlString = "https://fcc-weather-api.glitch.me/api/current?" + "lat=" + latitude + "&" + "lon=" + longitude;
	// 	console.log(urlString);
	// 	$.ajax({
	// 		"url" : urlString,
	// 		"type" : "GET",
	// 		"success" : function(responce) {
	// 			console.log(responce);
	// 			console.log(responce.weather[0]);
	// 			console.log(responce.weather[0].main);
	// 			$("body").append("<img src = " + responce.weather[0].icon + "\"" + "</img>");
	// 		},
	// 		"error" : function(error) {
	// 			console.log(error);
	// 		},
	// 		crossDomain: true
	// 	});
	// 		console.log("lat" + latitude + "&" + "lon" +longitude);
	// }

function getWeatherData(city) {
	// var urlString = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric&lang=ru&APPID=303c4b17f85d64176ffd592811fd1b91";
	var urlString = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&lang=ru&APPID=303c4b17f85d64176ffd592811fd1b91";
	$.ajax({
			"url" : urlString,
			"type" : "GET",
			"success" : function(responce) {
				console.log(responce.name);
			},
			"error" : function(error) {
				console.log(error);
			},
			crossDomain: true
	});
	console.log(urlString);
	// console.log("lat" + latitude + "&" + "lon" +longitude);
}

$("#searchCity").on("click", function () {
	event.preventDefault();
	// alert($("#input-city").val());
	var city = $("#input-city").val();
	getWeatherData(city);
});
