"use strict";

let pageSize = 2;
let pageNum = 0;

function loadData(data, id) {
    document.getElementById(id).innerHTML = data.slice(pageNum * pageSize, (pageNum + 1) * pageSize);
}

function nextPage(data, id) {
    pageNum++;
    loadData(data, id);
}

function previousPage(data, id) {
    pageNum--;
    loadData(data, id);
}
