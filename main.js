"use strict";

const form = document.querySelector("form");
const input = document.querySelectorAll("input");
const radioOutline = document.querySelectorAll(".radio-btn");
const radioCircle = document.querySelectorAll(".radiomark");
const radioField = document.querySelectorAll(".input-text");
const checkbox = document.querySelector(".checkbox");
const checkmark = document.querySelector(".checked");
const consentText = document.querySelector(".consent-text");
const errorMsg = document.querySelectorAll("small");
const textArea = document.querySelector("textarea");
const thanksModal = document.querySelector(".thanks");

// radio buttons control

function selected1() {
  radioOutline[0].style.border = "1.6px, solid, hsl(169, 82%, 27%)";
  radioCircle[0].style.opacity = 1;
  radioField[0].style.backgroundColor = "hsl(148, 38%, 91%)";
  radioField[0].style.border = "1.6px, solid, hsl(169, 82%, 27%)";
  radioOutline[1].style.border = "1px solid hsl(186, 15%, 80%)";
  radioCircle[1].style.opacity = 0;
  radioField[1].style.backgroundColor = "transparent";
  radioField[1].style.border = "1px, solid, hsl(186, 15%, 59%)";
}

function selected2() {
  radioOutline[1].style.border = "1.6px, solid, hsl(169, 82%, 27%)";
  radioCircle[1].style.opacity = 1;
  radioField[1].style.backgroundColor = "hsl(148, 38%, 91%)";
  radioField[1].style.border = "1.6px, solid, hsl(169, 82%, 27%)";
  radioOutline[0].style.border = "1px, solid, hsl(186, 15%, 80%)";
  radioCircle[0].style.opacity = 0;
  radioField[0].style.backgroundColor = "transparent";
  radioField[0].style.border = "1px, solid, hsl(186, 15%, 59%)";
}

function clearRadio() {
  radioOutline.forEach((item) => {
    item.style.border = "1px, solid, hsl(186, 15%, 80%)";
  });
  radioCircle.forEach((item) => {
    item.style.opacity = 0;
  });
  radioField.forEach((item) => {
    item.style.backgroundColor = "transparent";
    item.style.border = "1px, solid, hsl(186, 15%, 59%);";
  });
}
let radioSelected = false;

radioOutline.forEach((field) => {
  field.addEventListener("click", (e) => {
    if (e.target == radioOutline[0]) {
      selected1();
      radioSelected = true;
    } else if (e.target == radioOutline[1]) {
      selected2();
      radioSelected = true;
    }
  });
});

radioField.forEach((field) => {
  field.addEventListener("click", (e) => {
    if (e.target == radioField[0]) {
      selected1();
      radioSelected = true;
    } else if (e.target == radioField[1]) {
      selected2();
      radioSelected = true;
    }
  });
});

let checked = false;
checkbox.addEventListener("click", (e) => {
  checkmark.classList.toggle("hidden");
  checked = true;
});

// empty check

const nameField = [input[0], input[1]];

let isEmpty = true;
function emptyCheck() {
  nameField.forEach((item) => {
    if (item.value == "") {
      item.style.border = "1.6px, solid, hsl(0, 66%, 54%)";
      item.nextElementSibling.style.opacity = 1;
      isEmpty = true;
    } else {
      item.style.border = "1px, solid, hsl(186, 15%, 59%)";
      item.nextElementSibling.style.opacity = 0;
      isEmpty = false;
    }
  });
  if (textArea.value == "") {
    textArea.style.border = "1.6px, solid, hsl(0, 66%, 54%)";
    textArea.nextElementSibling.style.opacity = 1;
    isEmpty = true;
  } else {
    textArea.style.border = "1px, solid, hsl(186, 15%, 59%)";
    textArea.nextElementSibling.style.opacity = 0;
    isEmpty = false;
  }
  if (checked == false) {
    errorMsg[5].style.opacity = 1;
  } else {
    errorMsg[5].style.opacity = 0;
  }
  if (radioSelected == false) {
    errorMsg[3].style.opacity = 1;
  } else {
    errorMsg[3].style.opacity = 0;
  }
}

// email validation
let isValidEmail = false;
function emailValidation() {
  const regex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
  if (regex.test(input[2].value)) {
    input[2].nextElementSibling.style.opacity = 0;
    input[2].style.border = "1px, solid, hsl(186, 15%, 59%)";
    isValidEmail = true;
  } else {
    input[2].style.border = "1.6px, solid, hsl(0, 66%, 54%)";
    input[2].nextElementSibling.style.opacity = 1;
    isValidEmail = false;
  }
}

// success state
function success() {
  if (
    isEmpty == false &&
    checked == true &&
    radioSelected == true &&
    isValidEmail == true
  ) {
    thanksModal.style.display = "block";
    consentText.innerHTML = `I hereby consent to being contacted by the team`;
    clearRadio();
    checkmark.classList.add("hidden");
    form.reset();
    radioField[0].style.border = "1px, solid, hsl(186, 15%, 59%)";
    radioField[1].style.border = "1px, solid, hsl(186, 15%, 59%)";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  emptyCheck();
  emailValidation();
  success();
});
