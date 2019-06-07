"use strict";

function getAParcel(parcelid){
    let token = localStorage.getItem("access_token");
    fetch(`http://localhost:5000/api/v1/parcels/${parcelid}`,{
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        }
    }).then(response => response.json())
    .then(resdata => {
        console.log(resdata);
        document.querySelector("#date").innerHTML = resdata.parcel.date_created.slice(0,16);
        document.querySelector("#parcelid").innerHTML = resdata.parcel.parcel_id;
        document.querySelector("#desc").innerHTML = resdata.parcel.description;
        document.querySelector("#rname").innerHTML = resdata.parcel.recipient_name;
        document.querySelector("#rmob").innerHTML = resdata.parcel.recipient_mobile;
        document.querySelector("#stat").innerHTML = resdata.parcel.status;
        document.querySelector("#pick").innerHTML = resdata.parcel.pickup_location;
        document.querySelector("#pres").innerHTML = resdata.parcel.present_location;
        document.querySelector("#dest").innerHTML = resdata.parcel.destination;
        document.querySelector("#wgt").innerHTML = resdata.parcel.weight;
    })
}


function display(parcelId, price, pickup_location, destination, present_location){
    let modal = document.getElementById('maps');
    modal.style.display = "block";
    getAParcel(parcelId);
    viewMap(parcelId, price, pickup_location, destination, present_location);
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
    let cls = document.querySelector(".closeview");
    cls.onclick = function() {
        modal.style.display = "none";
    };
}