"use strict";

(function nots(parcel_id){
    let cancel = document.getElementById("cancelParcel");
    let dropdown = document.getElementById("not");
    cancel.onclick = function(){
        console.log(parcel_id);
        document.getElementById("cancelModal").style.display = 'none';
        document.getElementById("cancelbtn").disabled = true;
        let not = document.getElementById("nots");
        let noT = `<a href="#">Order ${parcel_id} cancelled</a>`;

        not.innerHTML += noT;
        let notss = [];
        notss.forEach(noT =>{
            notss.push(noT);
        })
        console.log(notss.length);
        document.getElementById("number").innerHTML = (notss.length);
        if(noT){
            document.querySelector("#number").style.color = 'white';
        }
    }
    dropdown.onclick = function(){
        document.getElementById("number").style.display = 'none';
    }
})();