$( document ).ready(function(){
	var latitude, longitude;
	function geoFindMe() {
		if (!navigator.geolocation){
			alert("Geolocation is not supported by your browser");
			return;
		}
		function success(position) {
			latitude  = position.coords.latitude;
			longitude = position.coords.longitude;
			console.log(longitude + "  " + latitude);
			getWeatgerData(latitude, longitude);
		}
		function error() {
			alert("Unable to retrieve your location");
		}
		navigator.geolocation.getCurrentPosition(success, error);
	}
	geoFindMe();
	function getWeatgerData (latitude, longitude) {
		var urlString = "https://fcc-weather-api.glitch.me/api/current?" + "lat=" + latitude + "&" + "lon=" + longitude;
		console.log(urlString);
		$.ajax({
			// "url" : "https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139",
			"url" : urlString,
			"type" : "GET",
			"success" : function(responce) {
				console.log(responce);
				// console.log(responce.weather[0]);
				// $("body").append("<img src = " + responce.weather[0].icon + "\"" + "</img>");
			},
			"error" : function(error) {
				console.log(error);
			},
			crossDomain: true
		});
			console.log("lat" + latitude + "&" + "lon" +longitude);

	}
});
