"use strict";

(function(){
    getUserParcels();
    getParcels();
})();

(function username(){
    let uname = localStorage.getItem("username");
    document.querySelector('#usernayme').innerHTML = uname;
})();

function getParcels(){
    let token = localStorage.getItem("access_token");

    fetch('http://localhost:5000/api/v1/parcels',{
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        }
    }).then(response => response.json())
    .then(res => {
        console.log(res);
        if(res.msg == "Token has expired"){
            customModal("Session expired! Login to proceed");
            let ok = document.getElementById("ok");
            ok.onclick = function(){
                location.href = "../../index.html";
            }
        }else{
        let tdata = '';
        let arr = [];
        let myNewArr = [];
        res.parcels.forEach(parcel => {
            if(parcel.status=='intransit' || parcel.status=='pending'){
                tdata += `
                <tr>
                    <td>${parcel.parcel_id}</td>
                    <td>${parcel.status}</td>
                    <td>${parcel.created_by}</td>
                    <td>${parcel.present_location}</td>
                    <td>${parcel.date_created.slice(0,16)}</td>
                    <td>
                        <button onclick="display(${parcel.parcel_id}, ${parcel.total_price}, \'`+parcel.pickup_location+`\', \'`+parcel.destination+`\', \'`+parcel.present_location+`\');"><i class="fa fa-fw fa-eye"></i>View</button>
                        <button id="editLoc" onclick="editl(${parcel.parcel_id});"><i class="fa fa-fw fa-pencil"></i>Edit</button>
                    </td>
                </tr>`;
            }else{
                tdata += `
                <tr>
                    <td>${parcel.parcel_id}</td>
                    <td>${parcel.status}</span>
                    <td>${parcel.created_by}</td>
                    </td>
                    <td>${parcel.present_location}</td>
                    <td>${parcel.date_created.slice(0,16)}</td>
                    <td>
                        <button onclick="display(${parcel.parcel_id}, ${parcel.total_price}, \'`+parcel.pickup_location+`\', \'`+parcel.destination+`\', \'`+parcel.present_location+`\' );"><i class="fa fa-fw fa-eye"></i>View</button>
                        <button id="disabled" disabled onclick="editl(${parcel.parcel_id});"><i class="fa fa-fw fa-pencil"></i>Edit</button>
                    </td>
                </tr>`;
            }
                arr.push(tdata);
                let i = arr.length - 1
                myNewArr = arr[i].split("</tr>");
            });
            loadData(myNewArr, "alparcels");
            document.getElementById("nextpg").onclick = function(){
                nextPage(myNewArr, "alparcels")
            }
            document.getElementById("prevpg").onclick = function(){
                previousPage(myNewArr, "alparcels")
            }
            document.getElementById("list").onclick = function(){
                document.getElementById('alparcels').innerHTML = tdata;
            }
            document.getElementById("firstpg").onclick = function(){
                loadData(myNewArr, "alparcels");
            }

        }
    })
}


function getUserParcels(){

    let token = localStorage.getItem("access_token");
    let playload = JSON.parse(atob(token.split('.')[1]));
    console.log(playload.identity.id);
    let user_id = playload.identity.id;

    fetch(`http://localhost:5000/api/v1/users/${user_id}/parcels`,{
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        }
    }).then(response => response.json())
    .then(res => {
        console.log(res)
        if(res.msg == "Token has expired"){
            customModal("Session expired! Login to proceed");
            let ok = document.getElementById("ok");
            ok.onclick = function(){
                location.href = "../../index.html";
            }
        }else{
            let ttl = document.getElementById("ttl");
            ttl.innerHTML = res.parcels.length;
            let tabledata = '';
            let cancelled = '';
            let arr = [];
            let myNewArr = [];
            let arr1 = [];
            res.parcels.forEach(function(parcel){
                if(parcel.status=='intransit' || parcel.status=='pending'){
                tabledata += `
                <tr>
                    <td>${parcel.parcel_id}</td>
                    <td>${parcel.status}</td>
                    <td>${parcel.present_location}</td>
                    <td>${parcel.destination}</td>
                    <td>${parcel.date_created.slice(0,16)}</td>
                    <td>
                        <button onclick="display(${parcel.parcel_id}, ${parcel.total_price}, \'`+parcel.pickup_location+`\', \'`+parcel.destination+`\', \'`+parcel.present_location+`\' );"><i class="fa fa-fw fa-eye"></i>View</button>
                        <button id="editbtn" onclick="editd(${parcel.parcel_id}, ${parcel.total_price}, \'`+parcel.pickup_location+`\');"><i class="fa fa-fw fa-pencil"></i> Edit</button>
                        <button id="cancelbtn" onclick="cancelParcelModal(${parcel.parcel_id});"><i class="fa fa-fw fa-ban"></i> Cancel</button>
                    </td>
                </tr>`;
                }else{
                    tabledata += `
                    <tr>
                        <td>${parcel.parcel_id}</td>
                        <td>${parcel.status}</td>
                        <td>${parcel.present_location}</td>
                        <td>${parcel.destination}</td>
                        <td>${parcel.date_created.slice(0,16)}</td>
                        <td>
                            <button onclick="display(${parcel.parcel_id}, ${parcel.total_price}, \'`+parcel.pickup_location+`\', \'`+parcel.destination+`\');"><i class="fa fa-fw fa-eye"></i>View</button>
                            <button id="disabled" disabled onclick="editd(${parcel.parcel_id}, ${parcel.total_price}, \'`+parcel.pickup_location+`\');"><i class="fa fa-fw fa-pencil"></i> Edit</button>
                            <button id="disabled" disabled  onclick="cancelParcelModal(${parcel.parcel_id});"><i class="fa fa-fw fa-ban"></i> Cancel</button>
                        </td>
                    </tr>`;
                }
                arr.push(tabledata);
                let i = arr.length - 1
                myNewArr = arr[i].split("</tr>");
            });
            loadData(myNewArr, "myparcels");
            document.getElementById("next").onclick = function(){
                nextPage(myNewArr, "myparcels")
            }
            document.getElementById("prev").onclick = function(){
                previousPage(myNewArr, "myparcels")
            }
            document.getElementById("wholelist").onclick = function(){
                document.getElementById('myparcels').innerHTML = tabledata;
            }
            document.getElementById("first").onclick = function(){
                loadData(myNewArr, "myparcels");
            }

        }
    })
}







