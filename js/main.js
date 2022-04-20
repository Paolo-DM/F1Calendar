/* eslint-disable no-global-assign */


var $leftArrow = document.querySelector('.left-arrow');
var $rightArrow = document.querySelector('.right-arrow');
var $image = document.querySelector('.carousel-image');
var $progressDots = document.querySelectorAll('.ph-circle');
var $dotsContainer = document.querySelector('.progress-dots');
const $circuitInfoContainer = document.querySelector('.circuit-info-container');

var curSlide = 1;
var maxSlide = $progressDots.length;

// function getLastRaceId() {
//   fetch(`http://ergast.com/api/f1/current/last.json`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.MRData.RaceTable.round);
//       return data.MRData.RaceTable.round;
//     });
// }

window.addEventListener('DOMContentLoaded', event => {
  getCircuitData(1);
  getConstructorStandings(2022);
  getDriverStandings(2022);
});

$dotsContainer.addEventListener('click', function (event) {
  if (event.target.nodeName === 'I') {
    curSlide = parseInt(event.target.getAttribute('id'));
    selectDot(curSlide);
    renderImage(curSlide);
    getCircuitData(curSlide);
  }
});

function selectDot(id) {
  for (var i = 0; i < $progressDots.length; i++) {
    $progressDots[i].className = 'ph-circle';
  }
  $progressDots[id - 1].classList.add('ph-circle-fill');
  getCircuitData(id);
}

function renderImage(id) {
  $image.setAttribute('src', `images/circuits/${id}.png`);
}

$rightArrow.addEventListener('click', goNextImg);
$leftArrow.addEventListener('click', goPreviousImg);

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
  const $circuitInfoDiv = document.querySelector('.circuit-info');
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
  $circuitInfoContainer.insertAdjacentHTML('afterbegin', html);
}

function renderSmallConstructorStandings(data) {
  const $constructorsTbody = document.querySelector(
    '.constructors-standings-tbody'
  );

  for (let i = 0; i < 5; i++) {
    const $tr = document.createElement('tr');
    const $td1 = document.createElement('td');
    $td1.textContent = i + 1;
    const $td2 = document.createElement('td');
    $td2.textContent =
      data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[
        i
      ].Constructor.name;
    const $td3 = document.createElement('td');
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
  const $driversTbody = document.querySelector('.drivers-standings-tbody');

  for (let i = 0; i < 5; i++) {
    const $tr = document.createElement('tr');
    const $td1 = document.createElement('td');
    $td1.textContent = i + 1;
    const $td2 = document.createElement('td');
    $td2.textContent =
      data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver
        .givenName +
      ' ' +
      data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver
        .familyName;
    const $td3 = document.createElement('td');
    $td3.textContent =
      data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].points;
    $tr.appendChild($td1);
    $tr.appendChild($td2);
    $tr.appendChild($td3);
    $driversTbody.appendChild($tr);
  }
}
