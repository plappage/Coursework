"use strict";
function getEntryList() {
    console.log("Invoked getEntryList()");
    const url = "/entry/list/";
    fetch(url, {
        method: "GET",
    }).then(response => {
        return response.json();
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {
            formatEntryList(response);
        }
    });
}

function formatEntryList(myJSONArray){
    let dataHTML = "";
    for (let item of myJSONArray) {
        dataHTML += "<tr><td>" + item.entryID + "<td><td>" + item.name + "<td><td>" + item.time + "<tr><td>";
    }
    document.getElementById("LeaderboardTable").innerHTML = dataHTML;
}
