$(document).ready(function(){

    var polygons = [];

    function initialize() {
        var mapOptions = {
            center: new google.maps.LatLng(37.708, -122.280),
            zoom: 11
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        $.getJSON('/maparea/polygons/all', function(data){
            if (data){
                _.each(data, function(element){
                    var coords = [];
                    _.each(element.locations, function(location){
                        coords.push(new google.maps.LatLng(location.lat, location.lng));
                    });
                    draw = new google.maps.Polygon({
                        paths: coords
                    });
                    polygons.push({username: element.username,polygon: draw});
                });
            }
            console.log('polygons count: ' + polygons.length);
        });

        google.maps.event.addListener(map, 'click', function(e){
            var result = {};
            _.each(polygons, function(element, index){
                console.log('user:' + element.username);
                console.log('location: ' + JSON.stringify(element.polygon));
                if(google.maps.geometry.poly.containsLocation(e.latLng, element.polygon)){
                    result.color = 'red';
                    result.content = element.username + ' area service.';

                } else {
                    result.color = 'green';
                    result.content = 'Free area service.';
                }
            });

            console.log('result: ' + result.content);
            var newMarker = new google.maps.Marker({
                position: e.latLng,
                map: map
            });

            var infoWindow = new google.maps.InfoWindow({
                content: result.content
            });

            google.maps.event.addListener(newMarker, 'click', function() {
                infoWindow.open(map,newMarker);
            });
        });
    }

    google.maps.event.addDomListener(window, 'load', initialize);
});
