"use strict";

function customModal(msg){
    let modal = document.querySelector("#popup");
    let content = document.querySelector("#msg");
    modal.style.display = "block";
    content.innerHTML = msg;
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

function closeModal(){
    let modal = document.querySelector("#popup");
    modal.style.display = "none";
    window.location.reload();
}