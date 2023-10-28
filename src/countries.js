import countryList from "./postal-codes.json";
export { getCountryList, createCountryOptions };
function createCountryOptions() {
  var countryOptionList = [];
  countryList.forEach((country) => {
    var countryOption = document.createElement("option");
    countryOption.value = country["Country"];
    countryOption.textContent = country["Country"];
    countryOptionList.push(countryOption);
  });

  return countryOptionList;
}
function getCountryList() {
  return countryList;
}
