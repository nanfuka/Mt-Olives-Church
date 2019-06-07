"use strict";

(function username(){
    let uname = localStorage.getItem("username");
    document.querySelector('#usernayme').innerHTML = uname;
})();

function cancel(){
    document.querySelector("#parcelForm").reset();
}

// (function openModal(modalId, buttonId, closeId){
//     let modal = document.getElementById(modalId);
//     let button = document.getElementById(buttonId);
//     let close = document.getElementsByClassName(closeId)[0];
//     button.onclick = function() {
//         modal.style.display = "block";
//     };
//     close.onclick = function() {
//         modal.style.display = "none";
//     };
//     window.onclick = function(event) {
//         if (event.target == modal) {
//             modal.style.display = "none";
//         }
//     };
// })();


function createParcel(){
    let description = document.querySelector("#description").value;
    let recipient_name = document.querySelector("#recipient_name").value;
    let recipient_mobile = document.querySelector("#recipient_mobile").value;
    let pickup_location = document.querySelector("#pickup_location").value;
    let destination = document.querySelector("#parcel_destination").value;
    let weight = document.querySelector("#weight").value;

    if (!document.getElementById("recipient_name").checkValidity() || !document.getElementById("recipient_mobile").checkValidity() ||
    !document.getElementById("pickup_location").checkValidity() || !document.querySelector("#parcel_destination").checkValidity() || 
    !document.querySelector("#weight").checkValidity()) {
        document.getElementById("recnameErr").innerHTML = document.getElementById("recipient_name").validationMessage;
        document.getElementById("recmobErr").innerHTML = document.getElementById("recipient_mobile").validationMessage;
        document.getElementById("picklocErr").innerHTML = document.getElementById("pickup_location").validationMessage;
        document.getElementById("destErr").innerHTML = document.getElementById("parcel_destination").validationMessage;
        document.getElementById("wgtErr").innerHTML = document.getElementById("weight").validationMessage;
    }else{
        let parceldata = {
            "description":description,
            "recipient_name":recipient_name,
            "recipient_mobile":recipient_mobile,
            "pickup_location":pickup_location,
            "destination":destination,
            "weight":parseInt(weight)
        };
    
        let token = localStorage.getItem("access_token");
    
        fetch('http://localhost:5000/api/v1/parcels',{
            method: 'post',
            headers: {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*"
            },
            body:JSON.stringify(parceldata)
        })
            .then(response => response.json())
            .then((data) => {
                if((data).message === "Parcel delivery order successfully made"){
                    document.querySelector("#parcelForm").reset();
                    customModal((data).message);
                    location.href = "#sec";
                }else{
                    let errmsg = (data).message;
                    document.getElementById("error").innerHTML = errmsg;
                }
            })
    }
}



function dynamicmap(parcel_id, price, pickupLocation){
    let pres = document.getElementById("loc");
    let autopres = new google.maps.places.Autocomplete(pres);
    let pickup = document.getElementById("pickup_location");

    let defaultVal = localStorage.getItem("picklocc");
    if (defaultVal=='null'){
        pickup.value = '';
    }else{
        pickup.value = localStorage.getItem("picklocc");
    }
    let dest = document.getElementById("parcel_destination");
    let auto1 = new google.maps.places.Autocomplete(pickup);
    let auto = new google.maps.places.Autocomplete(dest);
    let myOptions = {
        zoom: 18,
        center: {
            lat: 0.3476,
            lng: 32.5825
        }
    }

    let bounds = new google.maps.LatLngBounds();

    function addMarker(coords){
        new google.maps.Marker({
            position:coords,
            map:map
        })
    }

    if(!pickup || !dest){
        document.getElementById("error").innerHTML = "Enter the locations";
    }else{
        var map = new google.maps.Map(document.getElementById("googlemap"), myOptions);      
        google.maps.event.addListener(auto1, 'place_changed', function(){
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                'address': pickup.value
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    addMarker(results[0].geometry.location),
                    bounds.extend(results[0].geometry.location);
                    map.fitBounds(bounds);
                } else {
                    console.log("Geocode of " + pickup.value + " failed," + status);
                }
            });
        })
        google.maps.event.addListener(auto, 'place_changed', function(){
            var geocoder2 = new google.maps.Geocoder();
            geocoder2.geocode({
                'address': dest.value
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var marker = new google.maps.Marker({
                        position: results[0].geometry.location,
                        map: map,
                    });
                    bounds.extend(results[0].geometry.location);
                    map.fitBounds(bounds);

                    let dir = new google.maps.DirectionsRenderer();
                    let ser = new google.maps.DirectionsService();
                    dir.setMap(map);
                    let req = {
                        origin:pickup.value,
                        destination:dest.value,
                        travelMode:'DRIVING'
                    }
                    ser.route(req, function(result, status){
                        console.log(result, status);
                        if(status=='OK'){
                            dir.setDirections(result);
                        }
                    })
                    let distservice = new google.maps.DistanceMatrixService();
                    distservice.getDistanceMatrix({
                        origins:[pickup.value],
                        destinations:[dest.value],
                        travelMode:google.maps.TravelMode.DRIVING
                        // traffic_model:google.maps.TrafficModel.PESSIMISTIC
                    }, callback);

                    function callback(response, status) {
                        let dist = document.getElementById("distt"),
                            px = document.getElementById("pxx"),
                            info = document.querySelector(".route"),
                            time = document.getElementById("time");
                        console.log(response, status)
                        if(status=="OK") {
                            info.style.display = "block";
                            let distkm = response.rows[0].elements[0].distance.value/1000;
                            let estpx = distkm * 10000;
                            time.innerHTML = response.rows[0].elements[0].duration.text;
                            dist.innerHTML = response.rows[0].elements[0].distance.text;
                            px.innerHTML =  String(estpx).slice(0,6);
                        } else {
                            alert("Error: " + status);
                        }
                    }
        
                } else {
                    console.log("Geocode of " + dest.value + " failed," + status);
                }
            });
        })
    }

    let newdest = document.getElementById("newdest");
    let autopick = new google.maps.places.Autocomplete(newdest);
    var editmap = new google.maps.Map(document.getElementById("editmap"), myOptions);
    document.getElementById("pickloc").innerHTML = pickupLocation;
    console.log(pickupLocation)
    let pl = pickupLocation;
    var picklocgeocoder = new google.maps.Geocoder();
    picklocgeocoder.geocode({
        'address': pickupLocation
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            new google.maps.Marker({
                position:results[0].geometry.location,
                map:editmap
            }),
            // addMarker(results[0].geometry.location),
            bounds.extend(results[0].geometry.location);
            editmap.fitBounds(bounds);

        } else {
            console.log("Geocode of " + pickupLocation + " failed," + status);
        }
    });

    google.maps.event.addListener(autopick, 'place_changed', function(){
        var destgeocoder = new google.maps.Geocoder();
        destgeocoder.geocode({
            'address': newdest.value
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: editmap,
                });
                bounds.extend(results[0].geometry.location);
                map.fitBounds(bounds);

                let dir = new google.maps.DirectionsRenderer();
                let ser = new google.maps.DirectionsService();
            
                dir.setMap(editmap);
            
                let req = {
                    origin:pickupLocation,
                    destination:newdest.value,
                    travelMode:'DRIVING'
                }
            
                ser.route(req, function(result, status){
                    console.log(result, status);
                    if(status=='OK'){
                        dir.setDirections(result);
                    }
            
                })

                let distservice = new google.maps.DistanceMatrixService();
                distservice.getDistanceMatrix({
                    origins:[pickupLocation],
                    destinations:[newdest.value],
                    travelMode:google.maps.TravelMode.DRIVING
                    // traffic_model:google.maps.TrafficModel.PESSIMISTIC
                }, callback);
            
            
                function callback(response, status) {
                    let dist = document.getElementById("newdist"),
                        px = document.getElementById("newpx"),
                        info = document.querySelector(".newroute"),
                        time = document.getElementById("newtime");
            
                    console.log(response, status)
                
                    if(status=="OK") {
                        info.style.display = "block";
                        let distkm = response.rows[0].elements[0].distance.value/1000;
                        let estpx = distkm * 10000;
                        time.innerHTML = response.rows[0].elements[0].duration.text;
                        dist.innerHTML = response.rows[0].elements[0].distance.text;
                        px.value =  String(estpx + price).slice(0,6);
                    } else {
                        alert("Error: " + status);
                    }
                }
    
            } else {
                console.log("Geocode of " + dest.value + " failed," + status);
            }
        });
    })
}


function viewMap(parcel_id, price, pickup_location, destination, present_location) {
    console.log(parcel_id)
    var myOptions = {
        zoom: 18,
        center: {
            lat: 0,
            lng: 0
        },
    };

    var bounds = new google.maps.LatLngBounds();
    var map = new google.maps.Map(document.getElementById("map"), myOptions);


    //Geodecode locations
    function geocodeLoc(location, geodecoder, info){
        geodecoder.geocode({
            'address': location
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: map,
                });
                bounds.extend(results[0].geometry.location);
                map.fitBounds(bounds);
                let infoWindow = new google.maps.InfoWindow({
                    content: info
                });
                marker.addListener('click', function(){
                    infoWindow.open(map, marker);
                })
            } else {
                console.log("Geocode of " + location + " failed," + status);
            }
        });
    }

    let geocoder = new google.maps.Geocoder();

    geocodeLoc(present_location, geocoder, `<h3>Present Location<h3><br>${present_location}`);
    geocodeLoc(destination, geocoder, '');
    geocodeLoc(pickup_location, geocoder, '');

    //Directions
    let dir = new google.maps.DirectionsRenderer();
    let ser = new google.maps.DirectionsService();

    dir.setMap(map);

    let req = {
        origin:pickup_location,
        destination:destination,
        travelMode:'DRIVING'
    }

    ser.route(req, function(result, status){
        console.log(result, status);
        if(status=='OK'){
            dir.setDirections(result);
        }

    })

    //Calculate distance
    let distservice = new google.maps.DistanceMatrixService();
    distservice.getDistanceMatrix({
        origins:[pickup_location],
        destinations:[destination],
        travelMode:google.maps.TravelMode.DRIVING
        // traffic_model:google.maps.TrafficModel.PESSIMISTIC
    }, callback);


    function callback(response, status) {
        let dist = document.getElementById("dist"),
            px = document.getElementById("px");
        console.log(response, status)
        if(status=="OK") {
            let distkm = response.rows[0].elements[0].distance.value/1000;
            let estpx = distkm * 10000;
            dist.innerHTML = response.rows[0].elements[0].distance.text;
            px.innerHTML =  String(estpx + price).slice(0,6);
        } else {
            alert("Error: " + status);
        }
    }
}

