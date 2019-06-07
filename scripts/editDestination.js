"use strict";

let presentdestination = '';

function editPresentDestination(parcel_id){
    let newdest = document.getElementById("newdest");
    let autodest = new google.maps.places.Autocomplete(newdest);

    let token = localStorage.getItem("access_token");
    let newDestination = {
        "destination": document.getElementById('newdest').value,
        "total_price": document.getElementById('newpx').value
    }
    if (!document.getElementById("newdest").checkValidity()) {
        document.getElementById("newdestErr").innerHTML = document.getElementById("newdest").validationMessage;
    }else{
        console.log(newDestination)
        fetch(`http://localhost:5000/api/v1/parcels/${parcel_id}/destination`,{
            method: 'put',
            headers: {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*"
            },
            body:JSON.stringify(newDestination)
        }).then(response => response.json())
        .then(resdata => {
            document.getElementById("newdestErr").innerHTML = resdata.message;
        })
    }
}

function editd(parcelId, price, pickup_location){
    let modal = document.getElementById('editdest');
    modal.style.display = "block";
    dynamicmap(parcelId, price, pickup_location);
    // let destination = document.getElementById('dest')
    let p = document.getElementById("saveDestinationChangeButto");
    let w = document.getElementById("cancelDestinationEditButto");
    let id = document.getElementById("id");
    id.innerHTML = parcelId;
    // let presentDestination = presentdestination;
    // destination.value = toString(presentDestination);
    console.log(parcelId)

    let close = document.querySelector(".closeEdit");
    close.onclick = function() {
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    p.onclick = function () {
        editPresentDestination(parcelId);
    }

    w.onclick = function(){
        modal.style.display = "none";
    }
}