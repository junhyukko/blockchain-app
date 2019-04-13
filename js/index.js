$(document).ready(function(){

let baseAPIurl = "https://api.blockcypher.com/v1/btc/test3";
let myToken = "725b3d8d97c5481088197d6e1732e47b";
  $("#getAddress").on("click", function (e){
    e.preventDefault();

    let searchAddress =$("#searchText").val()
    //ajax
  console.log(searchAddress)

    let addressURL= "/addrs/" + searchAddress + "/balance";

    let APIurl = baseAPIurl + addressURL;

    $.ajax({
      type: 'GET',
      url: APIurl,
      success: function(data){
        $("#result").append("Balance: " + data["balance"]/10**8);
        $("#result").append("</br>");
        $("#result").append("Number of Transactions: " + data["n_tx"]);
        $("#result").append("</br>");
        $("#result").append("Total Sent: " + data["total_sent"]);
        $("#result").append("</br>");
        $("#result").append("Total Received: " + data["total_received"]);
        console.log(data);
      },
      error: function(error){
        console.log("something went wrong oh no :(" ,error)
      }
    })


  })

  $("#transferButton").on("click", function (e){
    // /txs/micro?token=YOURTOKEN

e.preventDefault();
  let addressURL=  "/txs/new"
  let APIurl = baseAPIurl + addressURL;
    let srcAddress = $("#srcAddress").val();
    let destAddress = $("#destAddress").val();

    let satoshiAmount = parseInt($("#transferAmount").val());

    var newtx = {
  inputs: [{addresses: [srcAddress]}],
  outputs: [{addresses: [destAddress], value: satoshiAmount}]
};

    $.ajax({
      type: 'POST',
      url: APIurl,
      // data: JSON.stringify(microtx),
      data: JSON.stringify(newtx),
      success: function(data){
        console.log(data);
        alert("Sent with hash: " + data["tx"]["hash"])
      },
      error: function(error){
        console.log("something went wrong oh no :(" ,error)
      }

    })


  })
})
