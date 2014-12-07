$(document).ready(function() {
    var map;

    function initialize() {
        var mapOptions = {
            zoom: 8,
            center: new google.maps.LatLng(37.708, -122.280)
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
    }

    google.maps.event.addDomListener(window, 'load', initialize);
});