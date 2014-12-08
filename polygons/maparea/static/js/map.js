$(document).ready(function() {
    var map, poly;
    var polygons = [];
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
        reset();
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