"use strict";
function getEntryList(){
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
    let i = 0;
    for (let item of myJSONArray) {
        i++
        if (i>10) break;
        dataHTML += "<tr><td><img src='img/linksprite.png' style='height:100px;width:auto;'></td><td>" + i + "." + "</td><td>" + item.name + "</td><td>" + item.time + "</td></tr>";
    }
    document.getElementById("leaderboardTable").innerHTML = dataHTML;
}
