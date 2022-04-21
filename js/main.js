/* eslint-disable no-global-assign */

const $leftArrow = document.querySelector(".left-arrow");
const $rightArrow = document.querySelector(".right-arrow");
const $image = document.querySelector(".carousel-image");
const $progressDots = document.querySelectorAll(".ph-circle");
const $dotsContainer = document.querySelector(".progress-dots");
const $circuitInfoContainer = document.querySelector(".circuit-info-container");
const $tableFullDriver = document.querySelector(".table-full-driver");
const $tableFullConstructor = document.querySelector(".table-full-constructor");
const $container = document.querySelector(".container");
const $standingsLink = document.querySelector(".standings-link");
const $driverStandingsLink = document.querySelectorAll(
  ".driver-standings-link"
);
const $constructorStandingsLink = document.querySelectorAll(
  ".constructor-standings-link"
);
const $fullStandingsContainer = document.querySelector(
  ".full-standings-container"
);
const $homeLinks = document.querySelectorAll(".home-link");

$homeLinks.forEach((item) => item.addEventListener("click", showHomePage));

$constructorStandingsLink.forEach((item) =>
  item.addEventListener("click", showConstructorStandings)
);

$driverStandingsLink.forEach((item) =>
  item.addEventListener("click", showDriverStandings)
);

$standingsLink.addEventListener("click", showDriverStandings);

function showConstructorStandings() {
  hideHomePage();
  hideDriverStandings();
  showFullStandingsContainer();
  $tableFullConstructor.classList.remove("hidden");
}

function hideConstructorStandings() {
  $tableFullConstructor.classList.add("hidden");
  hideFullStandingsContainer();
}

function showDriverStandings() {
  hideHomePage();
  hideConstructorStandings();
  showFullStandingsContainer();
  $tableFullDriver.classList.remove("hidden");
}

function hideDriverStandings() {
  $tableFullDriver.classList.add("hidden");
}

function showHomePage() {
  $container.classList.remove("hidden");
  hideFullStandingsContainer();
  hideDriverStandings();
  hideConstructorStandings();
}

function hideHomePage() {
  $container.classList.add("hidden");
}

function showFullStandingsContainer() {
  $fullStandingsContainer.classList.remove("hidden");
}

function hideFullStandingsContainer() {
  $fullStandingsContainer.classList.add("hidden");
}

let curSlide = 1;
const maxSlide = $progressDots.length;

// function getLastRaceId() {
//   fetch(`http://ergast.com/api/f1/current/last.json`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.MRData.RaceTable.round);
//       return data.MRData.RaceTable.round;
//     });
// }

window.addEventListener("DOMContentLoaded", (event) => {
  getCircuitData(1);
  getConstructorStandings(2022);
  getDriverStandings(2022);
});

$dotsContainer.addEventListener("click", function (event) {
  if (event.target.nodeName === "I") {
    curSlide = parseInt(event.target.getAttribute("id"));
    selectDot(curSlide);
    renderImage(curSlide);
    getCircuitData(curSlide);
  }
});

function selectDot(id) {
  for (let i = 0; i < $progressDots.length; i++) {
    $progressDots[i].className = "ph-circle";
  }
  $progressDots[id - 1].classList.add("ph-circle-fill");
  getCircuitData(id);
}

function renderImage(id) {
  $image.setAttribute("src", `images/circuits/${id}.png`);
}

$rightArrow.addEventListener("click", goNextImg);
$leftArrow.addEventListener("click", goPreviousImg);

function goNextImg() {
  if (curSlide === maxSlide) {
    renderImage(1);
    curSlide = 1;
    selectDot(1);
  } else {
    curSlide++;
    renderImage(curSlide);
    selectDot(curSlide);
  }
}

function goPreviousImg() {
  if (curSlide === 1) {
    renderImage(maxSlide);
    curSlide = maxSlide;
    selectDot(curSlide);
  } else {
    curSlide--;
    renderImage(curSlide);
    selectDot(curSlide);
  }
}

function renderCircuitData(data) {
  const $circuitInfoDiv = document.querySelector(".circuit-info");
  const html = `
  <div class="circuit-info">
              <h1>${data.MRData.RaceTable.Races[0].raceName}</h1>
              <p><strong>Circuit</strong>: ${data.MRData.RaceTable.Races[0].Circuit.circuitName}</p>
              <p><strong>Date</strong>: ${data.MRData.RaceTable.Races[0].date}</p>
              <p><strong>Time</strong>: ${data.MRData.RaceTable.Races[0].time}</p>
              <a class="wiki-btn home-btn blue-bkgd" href="${data.MRData.RaceTable.Races[0].Circuit.url}" target="_blank">Wiki Report</a>
            </div>
  `;
  $circuitInfoDiv.remove();
  $circuitInfoContainer.insertAdjacentHTML("afterbegin", html);
}

function renderSmallConstructorStandings(data) {
  const $constructorsTbody = document.querySelector(
    ".constructors-standings-tbody"
  );

  for (let i = 0; i < 5; i++) {
    let $tr = document.createElement("tr");
    let $td1 = document.createElement("td");
    $td1.textContent = i + 1;
    let $td2 = document.createElement("td");
    $td2.textContent =
      data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[
        i
      ].Constructor.name;
    let $td3 = document.createElement("td");
    $td3.textContent =
      data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[
        i
      ].points;
    $tr.appendChild($td1);
    $tr.appendChild($td2);
    $tr.appendChild($td3);
    $constructorsTbody.appendChild($tr);
  }
}

function renderSmallDriverStandings(data) {
  const $driversTbody = document.querySelector(".drivers-standings-tbody");

  for (let i = 0; i < 5; i++) {
    let $tr = document.createElement("tr");
    let $td1 = document.createElement("td");
    $td1.textContent = i + 1;
    let $td2 = document.createElement("td");
    $td2.textContent =
      data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver
        .givenName +
      " " +
      data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver
        .familyName;
    let $td3 = document.createElement("td");
    $td3.textContent =
      data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].points;
    $tr.appendChild($td1);
    $tr.appendChild($td2);
    $tr.appendChild($td3);
    $driversTbody.appendChild($tr);
  }
}
