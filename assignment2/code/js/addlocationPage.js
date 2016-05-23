// Code for the Add Location page.
 
var geocoder;
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {
            lat: -34.397,
            lng: 150.644
        }
    });
    geocoder = new google.maps.Geocoder();

}

document.getElementById('address').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      // code for enter
       newValue(this.value);
        return;
    }
    else
    {    
        return;
    }
});
document.getElementById('saveLocationButton').addEventListener('click', function()
{
   var coordinatesToJSON = JSON.stringify(map.center);
  localStorage.setItem(APP_PREFIX + "-test", coordinatesToJSON);
   var fetchCoordinates = localStorage.getItem(APP_PREFIX + "-test", coordinatesToJSON);
   var parsedCoordinates = JSON.parse(fetchCoordinates);
   var weatherURL = "https://api.forecast.io/forecast/69cea27469ca4329eb512cdec62eda5b/" + parsedCoordinates.lat + "," + parsedCoordinates.lng + "," + new Date().forecastDateString() + "?callback=weatherpls";
  
    var script = document.createElement('script');
        script.src = weatherURL;
        document.body.appendChild(script);
   
});
function weatherpls(weather)
{
    var dailyForecast = weather.daily.data[0].humidity;
    console.log(dailyForecast);
    var currentWeather = weather.currently.humidity;
    console.log(currentWeather);
}




function newValue(value) {
    // Define the address we want to map.
    var address = value;
    // Locate the address using the Geocoder
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        // If the Geocoding was successful
        if (status === google.maps.GeocoderStatus.OK) {
            //set center to new Address
            map.setCenter(results[0].geometry.location);
            //add a marker at the address
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } 
        else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
   
}

