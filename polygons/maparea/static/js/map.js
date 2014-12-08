$(document).ready(function() {
    var map;

    function initialize() {
        var mapOptions = {
            zoom: 11,
            center: new google.maps.LatLng(37.708, -122.280)
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        google.maps.event.addListener(map, 'click', function(event){
            createMarker(event.latLng);
        });
    }

    function createMarker(location){
        console.info('creating new markers at ' + location);
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: '/static/img/pin.png'
        });
    }

    google.maps.event.addDomListener(window, 'load', initialize);


});