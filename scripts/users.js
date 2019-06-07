"use strict";

(function username(){
    let uname = localStorage.getItem("username");
    document.querySelector('#usernayme').innerHTML = uname;
})();

(function getUsers(){
    let token = localStorage.getItem("access_token");

    fetch('http://localhost:5000/api/v1/users',{
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        }
    }).then(response => response.json())
    .then(resdata => {
        console.log(resdata);
        if(resdata.msg == "Token has expired"){
            customModal("Session expired! Login to proceed");
            location.href = "../../index.html";
        }else{
            let userdata = '';
            resdata.users.forEach(user => {
                let acctype = '';
                if(user.admin_status == true){
                    acctype = 'Admin';
                }else{
                    acctype = 'Regular user';
                }
                userdata += `
                <tr>
                    <td>${user.user_id}</td>
                    <td>${user.user_name}</td>
                    <td>${user.user_email}</td>
                    <td>${user.user_mobile}</td>
                    <td>${acctype}</td>
                    <td><button id="editRole" onclick="changeUserRole(${user.user_id});">Change User Role</button></td>
                </tr>`
            });
            document.querySelector('tbody').innerHTML = userdata;
        }
    })
})();

function changeUserRole(user_id){
    let token = localStorage.getItem("access_token");

    fetch(`http://localhost:5000/api/v1/users/${user_id}/role`,{
        method:'put',
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        }
    }).then(response => response.json())
    .then(resdata => {
        customModal(resdata.message);
    })
}