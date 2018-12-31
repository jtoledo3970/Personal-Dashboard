$(document).ready(function() {
  var ethBalance = 22.22;
  var iotaBalance = 650.8;
  var d = new Date();
  // JSON Functions
   $.getJSON('https://min-api.cryptocompare.com/data/price?fsym=IOT&tsyms=USD', function(jd) {
       // $('#stage').html('<p> Name: ' + jd.USD + '</p>');
       $("#iota").text(function () {
         return $(this).text().replace("IOTA", "$" + jd.USD);
       });
       $("#iotaTotal").text(function () {
         return $(this).text().replace("iotaTotal", "$" + Math.floor((jd.USD * iotaBalance) * 10) / 10).toLocaleString();
       });
    });
   $.getJSON('http://toledo.ethosdistro.com/?json=yes', function(jd) {
       // $('#stage').html('<p> Name: ' + jd.USD + '</p>');
       $("#gpuCount").text(function () {
        return $(this).text().replace("gpuCount", jd.alive_gpus + "/" + jd.total_gpus);
      });
      $("#hashRate").text(function () {
       return $(this).text().replace("hashRate", jd.total_hash);
     });
     // Rig Boot
     var secBoottime = jd.rigs.d09299.uptime;
     var hourBoottime = secBoottime * 0.000277778;
     var boot = 0;
     if (hourBoottime >= 24) {
       var temp = hourBoottime/ 24;
       boot = temp.toFixed() + "D";
     } else {
       boot = hourBoottime.toFixed() + "H";
     }
     console.log(boot);
     $("#rigBoot").text(function () {
       return $(this).text().replace("rigBoot", boot);
     });
     // Miner Uptime
     var secMinetime = jd.rigs.d09299.miner_secs;
     var hourMinetime = secMinetime * 0.000277778;
     var mine = 0;
     if (hourMinetime >= 24) {
       var temp = hourMinetime/ 24;
       mine = temp.toFixed() + "D";
     } else {
       mine = hourMinetime.toFixed() + "H";
     }
     console.log(boot);
     $("#rigMine").text(function () {
       return $(this).text().replace("rigMine", mine);
     });
     var rx = jd.rigs.d09299.rx_kbps;
     var tx = jd.rigs.d09299.tx_kbps;
     $("#rx").text(function () {
       return $(this).text().replace("rx", Math.round(rx * 10) / 10);
     });
     $("#tx").text(function () {
       return $(this).text().replace("tx", Math.round(tx * 10) / 10);
     });
     var gpuTempString = jd.rigs.d09299.temp;
     var gpuTempArray = gpuTempString.split(" ");
     $("#gpu1").text(function () {
       return $(this).text().replace("gpu1", Math.trunc(gpuTempArray[0]));
     });
     $("#gpu2").text(function () {
       return $(this).text().replace("gpu2", Math.trunc(gpuTempArray[1]));
     });
     $("#gpu3").text(function () {
       return $(this).text().replace("gpu3", Math.trunc(gpuTempArray[2]));
     });
     $("#gpu4").text(function () {
       return $(this).text().replace("gpu4", Math.trunc(gpuTempArray[3]));
     });
     $("#gpu5").text(function () {
       return $(this).text().replace("gpu5", Math.trunc(gpuTempArray[4]));
     });
     $("#gpu6").text(function () {
       return $(this).text().replace("gpu6", Math.trunc(gpuTempArray[5]));
     });
   });
   $.getJSON('https://api.ethermine.org/miner/0x53d5f654f14213AEf4d71583e79d6b72561541c3/dashboard', function(jd) {
      $("#unpaidBalance").text(function () {
       return $(this).text().replace("unpaidBalance", Math.round((jd.data.currentStatistics.unpaid/1000000000000000000) * 1000) / 1000);
     });
     $("#activeWorkers").text(function () {
       return $(this).text().replace("activeWorkers", jd.data.currentStatistics.activeWorkers);
     });
   });
   $.getJSON('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD', function(jd) {
       // $('#stage').html('<p> Name: ' + jd.USD + '</p>');
       $("#eth").text(function () {
        return $(this).text().replace("ETH", "$" + jd.USD);
      });
      $("#ethTotal").text(function () {
       return $(this).text().replace("ethTotal", "$" + Math.floor((jd.USD * ethBalance) * 10) / 10);
     });
   });
   $.getJSON('https://api.etherscan.io/api?module=account&action=balance&address=0x53d5f654f14213AEf4d71583e79d6b72561541c3&tag=latest&apikey=T8XR9YG437WRGWQ51KQJGUAMQB2GX7I13Y', function(jd) {
     // Eth Replace
     ethBalance = jd.result/1000000000000000000
     $("#ethBal").text(function() {
       return $(this).text().replace("ethBal", Math.round(ethBalance * 100) / 100 + " ETH");
     });
   });
   // Payout Table
   $.getJSON("https://api.ethermine.org/miner/53d5f654f14213AEf4d71583e79d6b72561541c3/payouts", function(data) {
       var tr = data.data
       for (var i = 0; i < data.data.length; i++) {
         // Payout Options
         var tempPayout = data.data[i].amount / 1000000000000000000;
         var tempRound = tempPayout.toFixed(2);
         // Date Options
         var options = {year: '2-digit', month: 'numeric', day: 'numeric' };
         var myDate = new Date(data.data[i].paidOn * 1000);
         var finalDate = myDate.toLocaleDateString('en-US', options)
         // link
         var link = "<a href='https://www.etherchain.org/tx/" + data.data[i].txHash + "'>";
         var tr = $('<tr/>');
         $(tr).append("<td>" + finalDate + "</td>");
         $(tr).append("<td>" + tempRound + "</td>");
         $(tr).append("<td>" + link + data.data[i].txHash + "</a></td>");
         $('.table1').append(tr);
       }
   });
   // Date
   $("#date").text(function() {
     return $(this).text().replace("date", Date().toLocaleString());
   });
   // IOTA Replace
   $("#iotaBal").text(function() {
     return $(this).text().replace("iotaBal", iotaBalance + " IOTA");
   });
});
