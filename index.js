let principalAmt = 0;
let monthlyAmt = 0;
let totalMonthlyAmt = 0;
let noOfDays = 0;
let rate = 0;
let netAmount = 0;

calculateCompounding();

function calculateCompounding() {
  let breakdownDiv = document.getElementById("breakdown");
  // Clearing Breakdown
  breakdownDiv.innerHTML = "";
  if (event) event.preventDefault();
  principalAmt = parseFloat(document.getElementById("principalAmt").value) || 0;
  monthlyAmt = parseFloat(document.getElementById("monthlyAmt").value) || 0;
  noOfDays = parseFloat(document.getElementById("tenure").value) || 1;
  rate = parseFloat(document.getElementById("rate").value) || 0;
  // let initialPlaceholder = document.getElementById("initialPlaceholder");
  // let monthlyPlaceholder = document.getElementById("monthlyPlaceholder");
  let compoundedPlaceholder = document.getElementById("compoundedPlaceholder");
  let profitPlaceholder = document.getElementById("profitPlaceholder");

  // initialPlaceholder.innerHTML = principalAmt;
  // monthlyPlaceholder.innerHTML = monthlyAmt;

  let compoundedAmt = getFinalPrice(noOfDays);
    profitPlaceholder.innerHTML = "Total Profit:  " +
      (compoundedAmt - principalAmt).toFixed(2) +
      " ( " + (compoundedAmt / principalAmt * 100).toFixed(2) + "% )";
    compoundedPlaceholder.innerHTML =
      "The Compounded Amount for an Initial Investment of " +
      principalAmt +
      " and monthly SIP of " +
      monthlyAmt +
      " for " +
      noOfDays +
      " days is <b>" +
      compoundedAmt.toFixed(2) +
      "(Rs. " +
      convertNumberToWords(compoundedAmt.toFixed(2)) +
      ")" +
      "</b> with total SIP value of " +
      totalMonthlyAmt;
}

function getFinalPrice(days) {
  let breakdownDiv = document.getElementById("breakdown");
  let pDiv = document.createElement("p");
  if (days == 1) {
    netAmount = principalAmt * (1 + rate / 100);
    pDiv.innerHTML = "Day 1: " + netAmount.toFixed(2);
    breakdownDiv.appendChild(pDiv);
    return netAmount;
  } else {
    if (days % 20 == 0) {
      // Add monthly investment for every 20 days
      totalMonthlyAmt += monthlyAmt;
      netAmount = (getFinalPrice(days - 1) + monthlyAmt) * (1 + rate / 100);
      pDiv.innerHTML =
        "Day " + days + ": " + netAmount.toFixed(2) + " - (End of Month)";
      breakdownDiv.appendChild(pDiv);
      return netAmount;
    } else {
      netAmount = getFinalPrice(days - 1) * (1 + rate / 100);
      pDiv.innerHTML = "Day " + days + ": " + netAmount.toFixed(2);
      breakdownDiv.appendChild(pDiv);
      return netAmount;
    }
  }
}

function convertNumberToWords(amount) {
  var words = new Array();
  words[0] = '';
  words[1] = 'One';
  words[2] = 'Two';
  words[3] = 'Three';
  words[4] = 'Four';
  words[5] = 'Five';
  words[6] = 'Six';
  words[7] = 'Seven';
  words[8] = 'Eight';
  words[9] = 'Nine';
  words[10] = 'Ten';
  words[11] = 'Eleven';
  words[12] = 'Twelve';
  words[13] = 'Thirteen';
  words[14] = 'Fourteen';
  words[15] = 'Fifteen';
  words[16] = 'Sixteen';
  words[17] = 'Seventeen';
  words[18] = 'Eighteen';
  words[19] = 'Nineteen';
  words[20] = 'Twenty';
  words[30] = 'Thirty';
  words[40] = 'Forty';
  words[50] = 'Fifty';
  words[60] = 'Sixty';
  words[70] = 'Seventy';
  words[80] = 'Eighty';
  words[90] = 'Ninety';
  amount = amount.toString();
  var atemp = amount.split(".");
  var number = atemp[0].split(",").join("");
  var n_length = number.length;
  var words_string = "";
  if (n_length <= 9) {
      var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
      var received_n_array = new Array();
      for (var i = 0; i < n_length; i++) {
          received_n_array[i] = number.substr(i, 1);
      }
      for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
          n_array[i] = received_n_array[j];
      }
      for (var i = 0, j = 1; i < 9; i++, j++) {
          if (i == 0 || i == 2 || i == 4 || i == 7) {
              if (n_array[i] == 1) {
                  n_array[j] = 10 + parseInt(n_array[j]);
                  n_array[i] = 0;
              }
          }
      }
      value = "";
      for (var i = 0; i < 9; i++) {
          if (i == 0 || i == 2 || i == 4 || i == 7) {
              value = n_array[i] * 10;
          } else {
              value = n_array[i];
          }
          if (value != 0) {
              words_string += words[value] + " ";
          }
          if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
              words_string += "Crores ";
          }
          if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
              words_string += "Lakh ";
          }
          if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
              words_string += "Thousand ";
          }
          if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
              words_string += "Hundred and ";
          } else if (i == 6 && value != 0) {
              words_string += "Hundred ";
          }
      }
      words_string = words_string.split("  ").join(" ");
  }
  return words_string;
}

// function numInWords(number) {
//   const first = [
//     "",
//     "one ",
//     "two ",
//     "three ",
//     "four ",
//     "five ",
//     "six ",
//     "seven ",
//     "eight ",
//     "nine ",
//     "ten ",
//     "eleven ",
//     "twelve ",
//     "thirteen ",
//     "fourteen ",
//     "fifteen ",
//     "sixteen ",
//     "seventeen ",
//     "eighteen ",
//     "nineteen "
//   ];
//   const tens = [
//     "",
//     "",
//     "twenty",
//     "thirty",
//     "forty",
//     "fifty",
//     "sixty",
//     "seventy",
//     "eighty",
//     "ninety"
//   ];
//   const mad = ["", "thousand", "million", "billion", "trillion"];
//   let word = "";

//   for (let i = 0; i < mad.length; i++) {
//     let tempNumber = number % (100 * Math.pow(1000, i));
//     if (Math.floor(tempNumber / Math.pow(1000, i)) !== 0) {
//       if (Math.floor(tempNumber / Math.pow(1000, i)) < 20) {
//         word =
//           first[Math.floor(tempNumber / Math.pow(1000, i))] +
//           mad[i] +
//           " " +
//           word;
//       } else {
//         word =
//           tens[Math.floor(tempNumber / (10 * Math.pow(1000, i)))] +
//           "-" +
//           first[Math.floor(tempNumber / Math.pow(1000, i)) % 10] +
//           mad[i] +
//           " " +
//           word;
//       }
//     }

//     tempNumber = number % Math.pow(1000, i + 1);
//     if (Math.floor(tempNumber / (100 * Math.pow(1000, i))) !== 0)
//       word =
//         first[Math.floor(tempNumber / (100 * Math.pow(1000, i)))] +
//         "hunderd " +
//         word;
//   }
//   return word
//     .toLowerCase()
//     .split(" ")
//     .map(s => s.charAt(0).toUpperCase() + s.substring(1))
//     .join(" ");
// }
