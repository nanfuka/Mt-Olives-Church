"use strict";

function signup(){
    let user_name = document.getElementById("user_name").value;
    let user_email = document.getElementById("user_email").value;
    let user_mobile = document.getElementById("user_mobile").value;
    let user_password = document.getElementById("user_password").value;
    let confirm_password = document.getElementById("confirm_user_password").value;

    if (!document.getElementById("user_name").checkValidity() || !document.getElementById("user_email").checkValidity() || 
    !document.getElementById("user_mobile").checkValidity() || !document.getElementById("user_password").checkValidity()) {
        document.getElementById("err1").value = document.getElementById("user_name").validationMessage;
        document.getElementById("err2").innerHTML = document.getElementById("user_email").validationMessage;
        document.getElementById("err3").innerHTML = document.getElementById("user_mobile").validationMessage;
        document.getElementById("err4").innerHTML = document.getElementById("user_password").validationMessage;

    }else if(user_password!==confirm_password){
        document.getElementById("passworderr").innerHTML = "The two passwords do no match";
    }else{
        let formdata = {
            "user_name":user_name,
            "user_email":user_email,
            "user_mobile":user_mobile,
            "user_password":user_password
        }
        console.log(formdata);

        fetch('http://127.0.0.1:5000/api/v1/auth/signup',{
            method: 'post',
            headers: {
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body:JSON.stringify(formdata)
        }).then(response => response.json())
            .then(data => {
                if(data.message === "User " + user_name + " successfully created"){
                    customModal(user_name + ' successfully registered. Login to proceed');
                    let ok = document.getElementById("ok");
                    ok.onclick = function(){
                        let modal = document.querySelector("#popup");
                        modal.style.display = "none";
                        loginContainer();
                        document.getElementById("login_name").value = user_name;
                    }
                }else{
                    let errmsg = data.message;
                    document.getElementById("errs").innerHTML = errmsg;
                    document.querySelector(".tooltiptext").style.display = "inline";
                    document.getElementById("user_email").onkeyup = function () {
                        document.querySelector(".tooltiptext").style.display = "none";
                    }
                }
            })
    }
}

function login() { 
    let username = document.getElementById("login_name").value;
    let password = document.getElementById("login_password").value;
    console.log(username + password);
    let formdata = {
        "user_name":username,
        "user_password":password
    }
    fetch('http://127.0.0.1:5000/api/v1/auth/login',{
        method: 'post',
        headers: {
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body:JSON.stringify(formdata)
    }).then(res => res.json())
        .then((data) => {
            console.log((data))
            if((data).message){
                document.getElementById("err").innerHTML = (data).message;
            }else{
                let access_token = (data).access_token;
                localStorage.setItem("access_token", access_token);
                localStorage.setItem("username", username);
                let playload = JSON.parse(atob(access_token.split('.')[1]));
                console.log(playload.identity.role);
                let role = playload.identity.role;
                if(role == true){
                    location.href = "templates/admin/admin_home.html"
                } else if(role == false){
                    location.href = "templates/user/user_home.html"
                }
            }
        })
}

function loginContainer(){
    document.getElementById("login").style.display = 'block';
    document.getElementById("signup").style.display = 'none';
}

function signupContainer(){
    document.getElementById("login").style.display = 'none';
    document.getElementById("signup").style.display = 'block';
}