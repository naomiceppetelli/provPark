'use strict';

var parkApp = {};

parkApp.searchedState = 'OH';
parkApp.searchedCity = 'Columbus';

parkApp.displayList = function () {
	parkApp.parks.forEach(function (park) {
		var option = '\n\t\t\t<option value="' + park.Name + '">' + park.Name + '</option>\t\t\t\t\t\n\t\t';
		$('#provParks').append(option);
	});
};

parkApp.config = function () {

	var config = {
		apiKey: "AIzaSyD20JLqE4tFouRUW8KXOLzTe_8nSwBOVg4",
		authDomain: "provincialparks-12adb.firebaseapp.com",
		databaseURL: "https://provincialparks-12adb.firebaseio.com",
		projectId: "provincialparks-12adb",
		storageBucket: "provincialparks-12adb.appspot.com",
		messagingSenderId: "552178127869"
	};
	firebase.initializeApp(config);

	var parkAppFirebaseRef = firebase.app().database().ref();
	parkAppFirebaseRef.once('value').then(function (snap) {
		parkApp.parks = snap.val();
		console.log(parkApp.parks);
		// call the next function here
		parkApp.displayList();
	});

	//on change of input select grab(save as variable) park that is selected 

	//call loadmap and loadweather with pseudo state variables 

	// parkApp.database = firebase.database();

	// const parksRef = parkApp.database.ref('/provincialparks-12adb/parks');

	// parksRef.on('value', function(snap) {
	// 	console.log(snap.val());
	// })

	// parkApp.parks = parkApp.database.ref(`/provincialparks-12adb/parks`).on('value', (res) => {
	// 	const data = res.val();
	// 	const parks = [];
	// 	console.log(data);

	// });
	// console.log(parkApp.parks);
};
// Define all variables, name, lat, lng, classification, opening day, closing day, notes, address, all from selected option

// //map over that array return array.name 
// //forEach array.name new array return as a new select 
// 	//create option tag and push to select input that will already live in html 


parkApp.loadMap = function () {
	var lat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 43.6565336;
	var lng = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -79.3910906;

	var key = 'AIzaSyCom9HKRym0JF3t_GxjLXQJIJzfqTQ5mfs';
	var mapOptions = {
		center: {
			//enhaced object literal
			lat: lat,
			lng: lng
		},
		zoom: 13

		// const mapDiv = document.getElementById('map');	
	};var mapDiv = $('.map')[0];
	console.log(mapDiv);
	parkApp.map = new google.maps.Map(mapDiv, mapOptions);
};

parkApp.displayWeather = function (temp, icon, iconDes) {
	$('#weather').html('\n\t\t<h2>feels like ' + temp + '\xB0</h2>\n\t\t<img src="' + icon + '" alt="' + iconDes + '" />\n\t\t');
};

parkApp.getWeather = function () {
	$.ajax({
		url: 'http://api.wunderground.com/api/7df53cd529eab04d/conditions/q/43.6565336,-79.3910906.json',
		method: 'GET',
		dataType: 'json'
	}).then(function (res) {
		console.log(res);
		var feels = res.current_observation.feelslike_c;
		var icon = res.current_observation.icon_url;
		var iconDes = res.current_observation.icon;
		parkApp.displayWeather(feels, icon, iconDes);
	});
};

parkApp.init = function () {
	console.log('hey');
	parkApp.config();
	parkApp.loadMap();
	parkApp.getWeather();
	parkApp.displayWeather();
};

$(function () {
	parkApp.init();
});