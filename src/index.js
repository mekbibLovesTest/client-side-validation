import { createCountryOptions, getCountryList } from "./countries";
import inputObjectList from "./inputObjectList";

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
  e.target.setCustomValidity(errorMessage);
  e.target.reportValidity();
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
