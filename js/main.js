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
const $homeLinks = document.querySelectorAll(".home-link");
const $calendarLinks = document.querySelectorAll(".calendar-link");
const $calendarContainer = document.querySelector(".calendar-container");
const $driverStandingsLink = document.querySelectorAll(
  ".driver-standings-link"
);
const $constructorStandingsLink = document.querySelectorAll(
  ".constructor-standings-link"
);
const $fullStandingsContainer = document.querySelector(
  ".full-standings-container"
);
const $overlay = document.querySelector(".overlay");
const $closeModal = document.querySelector(".close-modal");
const $modalHeaderTxt = document.querySelector(".modal-header-txt");

const currentYear = new Date().getFullYear();

$homeLinks.forEach((item) => item.addEventListener("click", showHomePage));

$constructorStandingsLink.forEach((item) =>
  item.addEventListener("click", showConstructorStandings)
);

$driverStandingsLink.forEach((item) =>
  item.addEventListener("click", showDriverStandings)
);

$standingsLink.addEventListener("click", showDriverStandings);

$calendarLinks.forEach((link) => link.addEventListener("click", showCalendar));
$closeModal.addEventListener("click", hideModal);

function showCalendar() {
  hideHomePage();
  hideConstructorStandings();
  hideDriverStandings();
  $calendarContainer.classList.remove("hidden");
}

function hideCalendar() {
  $calendarContainer.classList.add("hidden");
}

function showConstructorStandings() {
  hideHomePage();
  hideDriverStandings();
  hideCalendar();
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
  hideCalendar();
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
  hideCalendar();
  hideConstructorStandings();
}

function hideHomePage() {
  $container.classList.add("hidden");
}

function showModal() {
  $overlay.classList.remove("hidden");
}

function hideModal() {
  $overlay.classList.add("hidden");
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
  getConstructorStandings(currentYear);
  getDriverStandings(currentYear);
  populateCalendarYears();
  renderYear(currentYear);
  getCalendar(currentYear);
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

// Calendar Carousel
const calendarYearsArr = [];
const $calendarYear = document.querySelector(".calendar-year");
let curYear = currentYear;
const $nextYearArrow = document.querySelector(".ph-caret-right-fill");
const $nextTenYearArrow = document.querySelector(".ph-caret-double-right-fill");
const $prevYearArrow = document.querySelector(".ph-caret-left-fill");
const $prevTenYearArrow = document.querySelector(".ph-caret-double-left-fill");

function populateCalendarYears() {
  for (let i = 1950; i <= currentYear; i++) {
    calendarYearsArr.push(i);
  }
}

function goNextYear() {
  if (curYear === currentYear) {
    renderYear(1950);
    curYear = 1950;
    getCalendar(1950);
  } else {
    curYear++;
    renderYear(curYear);
    getCalendar(curYear);
  }
}

function goNextTenYears() {
  if (currentYear - curYear < 10) {
    return;
  } else {
    curYear += 10;
    renderYear(curYear);
    getCalendar(curYear);
  }
}

function goPreviousYear() {
  if (curYear === 1950) {
    renderYear(currentYear);
    curYear = currentYear;
    getCalendar(currentYear);
  }
  curYear--;
  renderYear(curYear);
  getCalendar(curYear);
}

function goPreviousTenYears() {
  if (curYear - 1950 < 10) {
    return;
  }
  curYear -= 10;
  renderYear(curYear);
  getCalendar(curYear);
}

function renderYear(year) {
  $calendarYear.textContent = year;
}

$nextYearArrow.addEventListener("click", goNextYear);
$prevYearArrow.addEventListener("click", goPreviousYear);
$nextTenYearArrow.addEventListener("click", goNextTenYears);
$prevTenYearArrow.addEventListener("click", goPreviousTenYears);
