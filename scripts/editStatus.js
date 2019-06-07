"use strict";

function editstatus(parcel_id){
    let token = localStorage.getItem("access_token");
    fetch(`http://localhost:5000/api/v1/parcels/${parcel_id}/status`,{
        method: 'put',
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        }
    }).then(response => response.json())
    .then(resdata => {
        customModal(resdata.message);
        if(resdata.message == `Parcel ${parcel_id} has been cancelled`){
            document.getElementById('cancelbtn').display = false;
        }
    })
}

function cancelParcelModal(parcel_id){
    let id = document.getElementById("pid");
    id.innerHTML = parcel_id;
    let modal = document.getElementById('cancelModal');
    let closeModal = document.getElementsByClassName("closeCancel")[0];
    modal.style.display = "block";
    closeModal.onclick = function(){
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
    let cancelstatus = document.getElementById("cancelParcel");
    cancelstatus.onclick = function(){
        editstatus(parcel_id);
        console.log(parcel_id);
    }
    let cancelbutton = document.getElementById("cancelcancel");
    cancelbutton.onclick = function(){
        modal.style.display = "none";
    }

}