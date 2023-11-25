let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
////////////////window load////////////////
window.addEventListener("load", () => {
  console.log("working");
  getDataApi();
});
//////////////dom select///////////////////
let cityName = null;

let mainData = null;

const searchBox = document.querySelector(".search-box");

const container = document.querySelector("main");

const city = document.querySelector(".city");

const date = document.querySelector(".date");

const temp = document.querySelector(".temp");

const weather = document.querySelector(".weather");

const hiLow = document.querySelector(".hi-low");
/////////////getSearchBoxValue///////////

function getSearchBoxValue() {
  cityName = searchBox.value;
  getDataApi(cityName);
}
/////////////search box///////////////
searchBox.addEventListener("keyup", (event) => {
  console.log(event);
  if (event.code == "Enter") {
    getSearchBoxValue();
  }
});

function getDataApi(cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=7e7855d4a53ab264f3b530d6964889e8`
  )
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      domEdit(data);
    })
    .catch((err) => {
      console.error(err);
    });
}

//////////////////today date code(chat gpt helped)///////////////
function getISOWeek(date) {
  const dayOfWeek = (date.getDay() + 6) % 7; // Adjust for week starting on Monday
  const january4th = new Date(date.getFullYear(), 0, 4);
  const january4thDayOfWeek = (january4th.getDay() + 6) % 7; // Adjust for week starting on Monday
  const daysSinceJanuary4th = (date - january4th) / 86400000; // Milliseconds per day
  const weekOfYear =
    Math.floor((daysSinceJanuary4th + (january4thDayOfWeek - dayOfWeek)) / 7) +
    1;
  return weekOfYear;
}
///////////////dom edit///////////////////
function domEdit(data) {
  city.innerHTML = `${data.name}, ${data.sys.country}`;
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateString = today.toLocaleDateString("en-US", options);

  //////////////////today date  show(dom)///////////////
  date.innerHTML = `${dateString}`;
  /////////////////////temp////////////////////////////
  temp.innerHTML = `${Math.floor(data.main.temp / 10).toString()}`;
  ////////////////////////weather/////////////////////////
  weather.innerHTML = `${data.weather[0].main}`;
  switch (data.weather[0].main) {
    case "Clouds":
      document.querySelector("body").style.backgroundImage =
        "url(https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-cloud-background_41066-1919.jpg)";
      console.log("sssssssssssssssss");
      break;

    default:
      break;
  }
  ///////////////////max/min temp/////////////////////
  hiLow.innerHTML = `${Math.floor(
    data.main.temp_min / 10
  ).toString()}°c / ${Math.floor(data.main.temp_max / 10).toString()}°c`;
}

function loadData(e) {
  console.log("working");
  getDataApi(city);
}
