"use strict";
function getSettingsGet() {
    console.log("Invoked getSettingsGet()");
    const url = "/settings/get/";
    fetch(url, {
        method: "GET",
    }).then(response => {
        return response.json();
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {
            formatSettingsGet(response);
        }
    });
}

function formatSettingsGet(myJSONArray){
    let dataHTML = "";
    for (let item of myJSONArray) {
        dataHTML += "<tr><td>" + item.settingsID + "<td><td>" + item.settingsStatus + "<tr><td>";
    }
    document.getElementById("LeaderboardTable").innerHTML = dataHTML;
}