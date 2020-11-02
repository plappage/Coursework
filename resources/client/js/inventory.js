"use strict";
function getInventoryLoad() {
    console.log("Invoked getInventoryLoad()");
    const url = "/inventory/load/";
    fetch(url, {
        method: "GET",
    }).then(response => {
        return response.json();
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {
            formatInventoryLoad(response);
        }
    });
}

function formatInventoryLoad(myJSONArray){
    let dataHTML = "";
    for (let item of myJSONArray) {
        dataHTML += "<tr><td>" + item.itemID + "<td><td>" + item.price + "<td><td>" + item.quantity + "<tr><td>";
    }
    document.getElementById("InventoryTable").innerHTML = dataHTML;
}