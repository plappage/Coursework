"use strict";
function getInventoryLoad(x) {
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
            if (x === "Inventory"){
                formatInventoryLoadForInventory(response);
            } else {
                formatInventoryLoadForShop(response);
            }

        }
    });
}

function formatInventoryLoadForInventory(myJSONArray){
    let dataHTML = "";
    for (let item of myJSONArray) {
        if (item.itemID === 4) break;
        dataHTML += "<a>" + item.quantity + "</a>";
    }
    document.getElementById("InventoryButtons").innerHTML = dataHTML;
    document.getElementById("InventoryButtons").style.display = "block";
}

function formatInventoryLoadForShop(myJSONArray){
    let dataHTML = "";
    for (let item of myJSONArray) {
        dataHTML += "<tr><td>" + item.price + "</td><td>" + item.quantity + "</td></tr>";
    }
    document.getElementById("InventoryTable").innerHTML = dataHTML;
}
