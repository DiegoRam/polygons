$(document).ready(function(){

    function initialize() {
        var mapOptions = {
            center: new google.maps.LatLng(37.708, -122.280),
            zoom: 11
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        //create all the polygons

        $.getJSON('/maparea/polygons/all', function(data){

        });

        _.each([1,2,3,4], function(element, index){
            console.log(element);
        });


        /*var triangleCoords = [
            new google.maps.LatLng(25.774252, -80.190262),
            new google.maps.LatLng(18.466465, -66.118292),
            new google.maps.LatLng(32.321384, -64.75737)
        ];

        var bermudaTriangle = new google.maps.Polygon({
            paths: triangleCoords
        });*/

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
