"use strict";

function myFunction() {
    let a = ''; 
    let i = ''; 
    let txtValue = '';
    let input = document.getElementById('myInput');
    let filter = input.value.toUpperCase();
    let tbody = document.querySelector('tbody');
    let tr = tbody.getElementsByTagName('tr');

    for (i = 0; i < tr.length; i++) {
        a = tr[i].getElementsByTagName("td")[3];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

function searchUsers() {
    let a = ''; 
    let i = ''; 
    let txtValue = '';
    let input = document.getElementById('myInput');
    let filter = input.value.toUpperCase();
    let tbody = document.querySelector('tbody');
    let tr = tbody.getElementsByTagName('tr');

    for (i = 0; i < tr.length; i++) {
        a = tr[i].getElementsByTagName("td")[1];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

function filter() {
    let a = ''; 
    let i = ''; 
    let txtValue = '';
    let input = document.getElementById('status').value;
    console.log(input);
    let tbody = document.querySelector('tbody');
    let tr = tbody.getElementsByTagName('tr');

    for (i = 0; i < tr.length; i++) {
        a = tr[i].getElementsByTagName("td")[1];
        txtValue = a.textContent || a.innerText;

        if(input=='all'){
            tr[i].style.display = "";
        }
        else if (txtValue.indexOf(input) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

function filterByDate() {
    let a = ''; 
    let i = ''; 
    let txtValue = '';
    let input = document.getElementById('day').value;
    console.log(input);
    let tbody = document.querySelector('tbody');
    let tr = tbody.getElementsByTagName('tr');

    for (i = 0; i < tr.length; i++) {
        a = tr[i].getElementsByTagName("td")[4];
        txtValue = a.textContent || a.innerText;
        if (txtValue.indexOf(input) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

function filterByYear() {
    let a = ''; 
    let i = ''; 
    let txtValue = '';
    let input = document.getElementById('year').value;
    console.log(input);
    let tbody = document.querySelector('tbody');
    let tr = tbody.getElementsByTagName('tr');

    for (i = 0; i < tr.length; i++) {
        a = tr[i].getElementsByTagName("td")[4];
        txtValue = a.textContent || a.innerText;
        if (txtValue.indexOf(input) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

function filterByMonth() {
    let a = ''; 
    let i = ''; 
    let txtValue = '';
    let input = document.getElementById('month').value;
    console.log(input);
    let tbody = document.querySelector('tbody');
    let tr = tbody.getElementsByTagName('tr');

    for (i = 0; i < tr.length; i++) {
        a = tr[i].getElementsByTagName("td")[4];
        txtValue = a.textContent || a.innerText;
        if (txtValue.indexOf(input) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}