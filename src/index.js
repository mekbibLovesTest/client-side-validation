import { createCountryOptions, getCountryList } from "./countries";
import inputObjectList from "./inputObjectList";
import "./style.css";
var select = document.querySelector("select");
select.append(...createCountryOptions());
select.addEventListener("change", (e) =>
  changePostalPattern(e, getCountryList()),
);
var changeEvent = new Event("change");
select.dispatchEvent(changeEvent);

var inputList = document.querySelectorAll("input");
inputList.forEach((input) => {
  addEventListenersToInput(input, ["blur", "input"], inputObjectList);
});

var submitButton = document.querySelector("button");
submitButton.addEventListener("click", handleSubmit);

function addEventListenersToInput(input, events, inputObjectList) {
  var inputObject = inputObjectList.find(
    (inputObject) => inputObject.name === input.name,
  );
  events.forEach((event) => {
    input.addEventListener(event, (e) =>
      handleConstraints(e, inputObject.constraints),
    );
  });
}

function handleConstraints(e, constraints) {
  var errorMessage = "";
  Object.keys(constraints).forEach((constraint) => {
    if (!isValid(e.target, constraint, getCountryList())) {
      if (e.target.name === "zip_code" && constraint === "patternMismatch") {
        errorMessage =
          constraints[constraint].errorMessage +
          getPostalFormat(e, getCountryList());
      } else errorMessage = constraints[constraint].errorMessage;
    }
  });
  displayError(e.target, errorMessage);
}

function handleSubmit(e) {
  e.preventDefault();
  var nextElementSibling = e.target.nextElementSibling;
  nextElementSibling.textContent = "Unsuccessful";
  if (checkAllValid()) {
    nextElementSibling.textContent = "Successful";
  } else return;
}

function checkAllValid() {
  var valid = true;
  var inputList = document.querySelectorAll("input");
  inputList.forEach((input) => {
    let event = new Event("input");
    input.dispatchEvent(event);
    if (input.nextElementSibling.textContent !== "") valid = false;
  });
  return valid;
}

function displayError(input, errorMessage) {
  input.nextElementSibling.textContent = errorMessage;
}

function isValid(inputElement, constraint) {
  if (constraint === "notSamePassword") {
    const password = document.querySelector("#password").value;
    const password_confirmation = inputElement.value;
    return password === password_confirmation;
  } else if (inputElement.validity[constraint] === true) {
    return false;
  } else return true;
}

function changePostalPattern(e, countryList) {
  var country = countryList.find(
    (country) => country["Country"] === e.target.value,
  );
  var zipCodeInput = document.querySelector("#zip_code");
  zipCodeInput.setAttribute("pattern", country["Regex"]);
  zipCodeInput.setAttribute("country", country["Country"]);
}

function getPostalFormat(e, countryList) {
  var country = countryList.find(
    (country) => country["Country"] === e.target.getAttribute("country"),
  );
  return country["Format"];
}
