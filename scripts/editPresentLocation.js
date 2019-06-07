"use strict";

function editPresentLocation(parcel_id){
    let token = localStorage.getItem("access_token");
    let newLocation = {"present_location": document.getElementById('loc').value};

    if (!document.getElementById("loc").checkValidity()) {
        document.getElementById("presErr").innerHTML = document.getElementById("loc").validationMessage;
    }else{
        fetch(`http://localhost:5000/api/v1/parcels/${parcel_id}/present_location`,{
        method: 'put',
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        },
        body:JSON.stringify(newLocation)
    }).then(response => response.json())
    .then(resdata => {
        document.getElementById("presErr").innerHTML = resdata.message
    })
    }
}

function editl(parcelId){
    let modal = document.getElementById('editloc');
    modal.style.display = "block";
    let button1 = document.getElementById("saveLocationChangeButto");
    let button2 = document.getElementById("cancelLocationEditButto");
    let id = document.getElementById("id");
    id.innerHTML = parcelId;
    let close = document.querySelector(".closeeditl");
    close.onclick = function() {
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    button1.onclick = function () {
        editPresentLocation(parcelId);
    }

    button2.onclick = function(){
        modal.style.display = "none";
    }
}