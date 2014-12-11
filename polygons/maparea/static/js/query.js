$(document).ready(function(){

    var polygons = [];

    function initialize() {
        var mapOptions = {
            center: new google.maps.LatLng(37.708, -122.280),
            zoom: 11
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        //create all the polygons

        $.getJSON('/maparea/polygons/all', function(data){
            if (data){
                _.each(data, function(element){
                    var coords = [];
                    _.each(element.locations, function(location){
                        coords.push(new google.maps.LatLng(location.lat, location.lng));
                    });
                    polygons.push(new google.maps.Polygon({
                        paths: coords
                    }));
                });
            }

        });

        google.maps.event.addListener(map, 'click', function(e) {
            var result;
            if (google.maps.geometry.poly.containsLocation(e.latLng, bermudaTriangle)) {
                result = 'red';
            } else {
                result = 'green';
            }

            var circle = {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: result,
                fillOpacity: .2,
                strokeColor: 'white',
                strokeWeight: .5,
                scale: 5
            };

            new google.maps.Marker({
                position: e.latLng,
                map: map,
                icon: circle
            })
        });
    }

    google.maps.event.addDomListener(window, 'load', initialize);
});
