import createCountryOptions from "./countries";

var dataList = document.querySelector("datalist");
dataList.append(...createCountryOptions());


