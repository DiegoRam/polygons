$(document).ready(function() {
    var map, poly;
    var path = new google.maps.MVCArray;
    var markers = [];

    function initialize() {
        var mapOptions = {
            zoom: 11,
            center: new google.maps.LatLng(37.708, -122.280)
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        poly = new google.maps.Polygon({
            strokeWeight: 3,
            fillColor: '#5555FF'
        });

        poly.setMap(map);
        poly.setPaths(new google.maps.MVCArray([path]));

        //add the preexistent polygons
        console.info("username: " + $('#username').text());
        $.getJSON('/maparea/'+ $('#username').text(), function(data){
            for(var i in data){
                //console.info('polygon array ' + JSON.stringify(data[i]));
                var coords = [];
                for (var j in data[i].locations){
                    console.info("location" + JSON.stringify(data[i].locations[j]));
                    coords.push(new google.maps.LatLng(data[i].locations[j].lat, data[i].locations[j].lng));

                }
                console.log('coords' + coords);
                new google.maps.Polygon({
                    map: map,
                    paths: coords,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                    draggable: true,
                    geodesic: true
                });
            }
        });

    }


    function addEdge(location){
        path.insertAt(path.length, location);

        var marker = new google.maps.Marker({
            position: location,
            map: map,
            draggable: true
        });
        markers.push(marker);
        marker.setTitle("#" + path.length);

        google.maps.event.addListener(marker, 'click', function() {
                marker.setMap(null);
                for (var i = 0, I = markers.length; i < I && markers[i] != marker; ++i);
                markers.splice(i, 1);
                path.removeAt(i);
            }
        );

        google.maps.event.addListener(marker, 'dragend', function() {
                for (var i = 0, I = markers.length; i < I && markers[i] != marker; ++i);
                path.setAt(i, marker.getPosition());
            }
        );

        path.forEach(function(element, index){
            console.log('element' + element);
        });


    }

    google.maps.event.addDomListener(window, 'load', initialize);

    function editMode(){
        $('#create').attr('disabled', 'disabled');
        $('#save').removeAttr('disabled');
        $('#cancel').removeAttr('disabled');
        google.maps.event.addListener(map, 'click', function(event){
            addEdge(event.latLng);
        });

    }

    function reset(){
        $('#save').attr('disabled', 'disabled');
        $('#create').removeAttr('disabled');
        $('#cancel').attr('disabled', 'disabled');

        path = new google.maps.MVCArray;
        poly.setPaths(new google.maps.MVCArray([path]));
        deleteMarkers();
    }

    $('#create').click(function(){
        console.info("start to create");
        editMode();
    });

    $('#cancel').click(function(){
        console.info("canceling");
        reset();
    });

    $('#save').click(function(){
        console.info('saving');
        // TODO save properly using ajax
        console.info('path: ' + path);
        data = [];
        path.forEach(function(element, index){
            console.log('element: ' + element.lat());
            data.push({lat: element.lat(), lng: element.lng()})
        });

        $.post('/maparea/savepolygon', {data: data} , function(result){
            reset();
        });

    });

    function setAllMap(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    function clearMarkers() {
        setAllMap(null);
    }

    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }

});