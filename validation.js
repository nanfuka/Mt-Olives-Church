function Login() {
    var name = document.getElementById("login_name");
    var password = document.getElementById("login_password");

    if (name.value === "admin" && password.value === "Admin1234567") {
        //     // document.location.href = "./templates/user/user_home.html";
        document.location.href = "templates/user/user_home.html";

        //     console .log ("welcome");
    } else {
        document.getElementById('err').innerHTML = "Name and password did not match, try again!"
        //  console.log(name);
    }

}

// // function which converts teh uploaded image to base 64 string and displays what has been uploaded
// function readFile() {

//     if (this.files && this.files[0]) {

//         var FR = new FileReader();
//         FR.readAsDataURL(this.files[0]);

//         FR.onload = function () {
//             document.getElementById("img").src = FR.result;
//             localStorage.setItem('token', FR.result)
//         }
//     }

// }
// document.getElementById("inp").addEventListener("change", readFile);

// // function which sends the input data to the server
// function Register() {
//     token = localStorage.getItem('token');
//     var idnum = document.getElementById("member_id");
//     var name = document.getElementById("recipient_name");
//     var gender = document.getElementById("gender");
//     var dob = document.getElementById("date_of_birth");
//     var mstatus = document.getElementById("marital-status");
//     var cell = document.getElementById("cell");
//     var educ = document.getElementById("education_level");
//     var prof = document.getElementById("profession");
//     var occup = document.getElementById("occupation");
//     var work = document.getElementById("place-of-work");
//     var resid = document.getElementById("residence");
//     var phon = document.getElementById("phone_contact");
//     var email = document.getElementById("email");
//     var dobapt = document.getElementById("date_of_baptism");
//     var pobapt = document.getElementById("place_of_baptism");
//     var baptpr = document.getElementById("baptising_pastor");
//     var formr = document.getElementById("former_religion");
//     var imag = token;
//     // console.log(imag)

//         // if(idnum.value ==""){
//         //     document.getElementById("idErr").innerHTML = "Id must be filled"
//         // }else if(name.value == ""){
//         //     document.getElementById("recnameErr").innerHTML ="Please fill in the Name"
//         // }else if(gender.value == " "){
//         //     document.getElementById("genderr").innerHTML = "Please select gender"
//         // }else if(dob.value ==" "){
//         //     document.getElementById("doberr").innerHTML ="Fill in the date of birth"
//         // }else if(mstatus.value == ""){
//         //     document.getElementById("mserr").innerHTML = "Please select marital status"
//         // }else if(cell.value ==" "){
//         //     document.getElementById("cellerr").innerHTML = "Please fill in the cell name"
//         // }else if(educ.value == ""){
//         //     document.getElementById("educerr").innerHTML = "Please fill in education level"
//         // }else if(prof.value == ""){
//         //     document.getElementById("proferr").innerHTML = "Please provide the profession"
//         // }else if(occup.value == ""){
//         //     document.getElementById("occuperr").innerHTML = "Please fill in the occupation"
//         // }else if(work.value == ""){
//         //     document.getElementById("workerr").innerHTML = "Fill in the place of work"
//         // }else if(resid.value ==""){
//         //     document.getElementById("residerr").innerHTML = "Provide the place of residence" 
//         // }else if(phon.value ==""){
//         //     document.getElementById("phoneerr").innerHTML = "Please fill in the phone number"
//         // }else if(email.value ==""){
//         //     document.getElementById("mailerr").innerHTML = "Please provide the email address"
//         // }else if(dobapt.value ==""){
//         //     document.getElementById("dobpterr").innerHTML = "Provide the date of baptism"
//         // }else if(pobapt.value ==""){
//         //     document.getElementById("placerr").innerHTML = "Provide the place of baptism"
//         // }else if(baptpr.value ==""){
//         //     document.getElementById("cpasterr").innerHTML = "Provide the name of the pastor who baptised"
//         // }else if(formr.value ==""){
//         //     document.getElementById("formerr").innerHTML = "Please fill in the former religion"
//         // }
//         // else {   
//             let datas = {
//                 "idnum": idnum.value,
//                 "name": name.value,
//                 "gender" : gender.value,
//                 "dateofbirth": dob.value,
//                 "maritalstatus": mstatus.value,
//                 "cell":cell.value,
//                 "educationlevel": educ.value,
//                 "profession": prof.value,
//                 "occupation": occup.value,
//                 "placeofwork": work.value,
//                 "residence": resid.value,
//                 "phonecontact": phon.value,
//                 "emailaddres": email.value,
//                 "dateofbaptism": dobapt.value,
//                 "placeofbaptism": pobapt.value,
//                 "baptisingpastor": baptpr.value,
//                 "formerreligion": formr.value,
//                 "image": imag

//             }
//             fetch('http://127.0.0.1:5000/api/v1/auth/register', {
//                 method: 'POST',
//                 headers: {
//                     'Accept': 'application/json, text/plain, */*',

//                     'content_type': 'application/json'
//                 },
//                 body: JSON.stringify(datas)
//             })

//             .then((res) => res.json())
//             .then((data) => {
//                 console.log(data)


//                 // if (data.message === 'thanks for registering with Epic mail') {

//                 //     window.location.replace('/UI/html/user_dash.html')

//                 // } else {

//                 //     document.getElementById("negativeresponse").innerHTML = data.error
//                 //     document.getElementById("negativeresponse").style.display = block
//                 // }
//             })
//     }



// // }

// function Cancel() {
//     document.location.reload(true)
// }

// // function select(){
// //     fetch('http://127.0.0.1:5000/api/v1/members', {
// //                 method: 'GET',
// //                 headers: {
// //                     'Accept': 'application/json, text/plain, */*',

// //                     'content_type': 'application/json'
// //                 },
// //                 // body: JSON.stringify(datas)
// //             })

// //             .then((res) => res.json())
// //             .then((data) => {
// //                 console.log(data)
// // })
// // }
function select() {
    var recieveUrl = 'http://127.0.0.1:5000/api/v1/members';
    token = localStorage.getItem('token');
    fetch(recieveUrl)
    .then(res => res.json())
    .then(response => {
        console.log(response.message)
            var d = response.message;
                    let result = ``;
                     let email = `<table id="allparcels">            <tr>
                
                <th>Name</th>
                <th>Gender</th>
                <th>Cell</th>
            </tr>`;
                    d.forEach((user) => {
                        console.log(user)
                       
                        result +=
                        `<tr><td><a href = "" id = "detail">${user.name}</a></td>
                        <td>${user.gender}</td>
                        <td>${user.cell}</td></tr>`
                      
                        document.getElementById('info').innerHTML = email+result+`</table>`;

        }
    )}
    )}
