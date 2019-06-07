"use strict";

(function username(){
    let uname = localStorage.getItem("username");
    document.querySelector('#usernayme').innerHTML = uname;
})();

(function() {
    editProfile();
})();

(function userProfile(){
    let token = localStorage.getItem("access_token");
    let user_name = localStorage.getItem("username");

    fetch(`http://127.0.0.1:5000/api/v1/users/${user_name}`, {
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        }
    }).then(response => response.json())
    .then(userinfo => {
        let acctype = '';
        if(userinfo.message){
            console.log(userinfo.message)
        }else{
            localStorage.setItem("picklocc",userinfo.user.default_pickup_loc)
            if(userinfo.user.admin_status == true){
                acctype = 'Admininistrator Account';
            }else{
                acctype = 'Regular Account';
            }
            document.getElementById("name").innerHTML = userinfo.user.user_name;
            document.getElementById("uname").innerHTML = userinfo.user.user_name;
            document.getElementById("userid").innerHTML = userinfo.user.user_id;
            document.getElementById("mobile").innerHTML = userinfo.user.user_mobile;
            document.getElementById("email").innerHTML = userinfo.user.user_email;
            document.getElementById("role").innerHTML = acctype;
            // if(userinfo.user.default_pickup_loc!=null){
            //     document.getElementById("defaultpl").innerHTML = userinfo.user.default_pickup_loc;
            // }else{
            //     document.getElementById("defaultpl").innerHTML = "ji";
            // }
            // // document.getElementById("default").innerHTML = userinfo.user.default_pickup_loc

            document.getElementById("edit").onclick = function(){
                editProfile(userinfo.user.user_id, userinfo.user.user_name, userinfo.user.user_email, userinfo.user.user_mobile, acctype, userinfo.user.default_pickup_loc)
            }
        }
    })
})();

function editProfile(userid, username, usermail, usermobile, status, defaultloc){
    document.getElementById("edit").onclick = function(){
        document.getElementById("userform").style.display = "block";
        location.href = "#userform";
        document.getElementById("usersid").value = userid;
        document.getElementById("usersname").value = username;
        document.getElementById("usersmail").value = usermail;
        document.getElementById("usersmobile").value = usermobile;
        document.getElementById("usersstatus").value = status;
        document.getElementById("defaultloc").value = defaultloc;
    }
}

function cancelEdit(){
    document.querySelector("#userform").style.display = "none";
}

(function totalNoOfUserParcels(){
    let token = localStorage.getItem("access_token");
    let user_name = localStorage.getItem("username");

    fetch(`http://127.0.0.1:5000/api/v1/users/${user_name}/parcels`, {
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        }
    }).then(response => response.json())
    .then(userinfo => {
        console.log(userinfo.number[0]);
        let ttl = `
        ${userinfo.number[0]}
        `
    document.getElementById('total').innerHTML = ttl;
    })
})();

(function totalNoOfCancelledUserParcels(){
    let token = localStorage.getItem("access_token");
    let user_name = localStorage.getItem("username");

    fetch(`http://127.0.0.1:5000/api/v1/users/${user_name}/parcels/cancelled`, {
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        }
    }).then(response => response.json())
    .then(userinfo => {
        console.log(userinfo.number[0]);
        let ttl = `
        ${userinfo.number[0]}
        `
    document.getElementById('cancelled').innerHTML = ttl;
    })
})();

(function totalNoOfPendingUserParcels(){
    let token = localStorage.getItem("access_token");
    let user_name = localStorage.getItem("username");

    fetch(`http://127.0.0.1:5000/api/v1/users/${user_name}/parcels/pending`, {
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        }
    }).then(response => response.json())
    .then(userinfo => {
        console.log(userinfo.number[0]);
        let ttl = `
        ${userinfo.number[0]}
        `
    document.getElementById('pending').innerHTML = ttl;
    })
})();

(function totalNoOfDeliveredUserParcels(){
    let token = localStorage.getItem("access_token");
    let user_name = localStorage.getItem("username");

    fetch(`http://127.0.0.1:5000/api/v1/users/${user_name}/parcels/delivered`, {
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        }
    }).then(response => response.json())
    .then(userinfo => {
        console.log(userinfo.number[0]);
        let ttl = `
        ${userinfo.number[0]}
        `
    document.getElementById('delivered').innerHTML = ttl;
    })
})();

(function totalNoOfIntransitUserParcels(){
    let token = localStorage.getItem("access_token");
    let user_name = localStorage.getItem("username");

    fetch(`http://127.0.0.1:5000/api/v1/users/${user_name}/parcels/intransit`, {
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        }
    }).then(response => response.json())
    .then(userinfo => {
        console.log(userinfo.number[0]);
        let ttl = `
        ${userinfo.number[0]}
        `
    document.getElementById('intransit').innerHTML = ttl;
    })
})();

function defaultlocation(){
    let defaultloc = document.getElementById("defaultloc");
    new google.maps.places.Autocomplete(defaultloc);
}


// function openTab(evt, tabName) {
//     let tabcontent = document.getElementsByClassName("tabcontent");
//     for (let i = 0; i < tabcontent.length; i++) {
//       tabcontent[i].style.display = "none";
//     }
//     let tablinks = document.getElementsByClassName("tablinks");
//     for (let i = 0; i < tablinks.length; i++) {
//       tablinks[i].className = tablinks[i].className.replace(" active", "");
//     }
//     document.getElementById(tabName).style.display = "block";
//     evt.currentTarget.className += " active";
// }


function editUserInfo(){
    let token = localStorage.getItem("access_token");
    let user_name = localStorage.getItem("username");


    let user_email = document.getElementById("usersmail").value;
    let user_mobile = document.getElementById("usersmobile").value;
    let default_pickup_location = document.getElementById("defaultloc").value;

    if (!document.getElementById("usersmail").checkValidity() || !document.getElementById("usersmobile").checkValidity() ||
    !document.getElementById("defaultloc").checkValidity()) {
        document.getElementById("mailErr").innerHTML = document.getElementById("usersmail").validationMessage;
        document.getElementById("mobErr").innerHTML = document.getElementById("usersmobile").validationMessage;
        document.getElementById("locErr").innerHTML = document.getElementById("defaultloc").validationMessage;
    }else{
        console.log(user_mobile +"" + user_email + ""+ default_pickup_location);

    let formdata = {
        "user_email":user_email,
        "user_mobile":user_mobile,
        "default_pickup_location":default_pickup_location
    }
    console.log(formdata);

    fetch(`http://127.0.0.1:5000/api/v1/users/${user_name}/edit`,{
        method: 'put',
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
        },
        body:JSON.stringify(formdata)
    }).then(response => response.json())
        .then(data => {
            if(data.message === "Your details have successfully been updated"){
                customModal(data.message);
            }else{
                let errmsg = data.message;
                document.getElementById("serverErr").innerHTML = errmsg;
            }
        })
    }
}