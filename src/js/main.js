$( document ).ready(function(){
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
			latitude  = position.coords.latitude;
			longitude = position.coords.longitude;
			console.log(longitude + "  " + latitude);
			getWeatherDataAuto(latitude, longitude);
		}
		function error() {
			alert("Unable to retrieve your location");
		}
		navigator.geolocation.getCurrentPosition(success, error);
	}

function getWeatherDataAuto(latitude, longitude) {
	var urlString = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&units=metric&lang=ru&APPID=303c4b17f85d64176ffd592811fd1b91";
	getData(urlString);
	console.log(urlString);
	// console.log("lat" + latitude + "&" + "lon" +longitude);
}

function getWeatherData(city) {
	var urlString = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&lang=ru&APPID=303c4b17f85d64176ffd592811fd1b91";
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
			},
			"error" : function(error) {
				console.log(error);
			},
			crossDomain: true
	});
}

$("#searchCity").on("click", function () {
	event.preventDefault();
	var city = $("#input-city").val();
	getWeatherData(city);
});
