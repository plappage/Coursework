"use strict";
var timesClicked = 0;
function getInventoryLoad(x) {
    timesClicked++;
    if (timesClicked%2===0){
        x = document.getElementById("InventoryButtons");
        x.style.display = "none";
    }else{
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
                if (response.hasOwnProperty("inventory")){
                    let dataHTML = "";
                    for (let item of response.inventory) {
                        if (item.itemID === 4) break;
                        dataHTML += "<p class='items' onclick='inventoryClick("+ item.itemID + ")'>" + item.name + "   " + item.quantity + "</p>";
                    }
                    document.getElementById("InventoryButtons").innerHTML = dataHTML;
                    document.getElementById("InventoryButtons").style.display = "block";
                } else {
                    let dataHTML = "";
                    for (let item of response.inventory) {
                        dataHTML += item.price + " " + item.quantity;
                    }
                    document.getElementById("shop").innerHTML = dataHTML;
                }

            }
        });
    }
}

function formatInventoryLoadForInventory(myJSONArray){

}

function formatInventoryLoadForShop(myJSONArray){

}
function inventoryClick(item){

}