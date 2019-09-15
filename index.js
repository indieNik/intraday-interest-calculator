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

  // initialPlaceholder.innerHTML = principalAmt;
  // monthlyPlaceholder.innerHTML = monthlyAmt;

  let compoundedAmt = getFinalPrice(noOfDays);
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
    numInWords(compoundedAmt.toFixed(2)) +
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

function numInWords(number) {
  const first = [
    "",
    "one ",
    "two ",
    "three ",
    "four ",
    "five ",
    "six ",
    "seven ",
    "eight ",
    "nine ",
    "ten ",
    "eleven ",
    "twelve ",
    "thirteen ",
    "fourteen ",
    "fifteen ",
    "sixteen ",
    "seventeen ",
    "eighteen ",
    "nineteen "
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety"
  ];
  const mad = ["", "thousand", "million", "billion", "trillion"];
  let word = "";

  for (let i = 0; i < mad.length; i++) {
    let tempNumber = number % (100 * Math.pow(1000, i));
    if (Math.floor(tempNumber / Math.pow(1000, i)) !== 0) {
      if (Math.floor(tempNumber / Math.pow(1000, i)) < 20) {
        word =
          first[Math.floor(tempNumber / Math.pow(1000, i))] +
          mad[i] +
          " " +
          word;
      } else {
        word =
          tens[Math.floor(tempNumber / (10 * Math.pow(1000, i)))] +
          "-" +
          first[Math.floor(tempNumber / Math.pow(1000, i)) % 10] +
          mad[i] +
          " " +
          word;
      }
    }

    tempNumber = number % Math.pow(1000, i + 1);
    if (Math.floor(tempNumber / (100 * Math.pow(1000, i))) !== 0)
      word =
        first[Math.floor(tempNumber / (100 * Math.pow(1000, i)))] +
        "hunderd " +
        word;
  }
  return word
    .toLowerCase()
    .split(" ")
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
}
