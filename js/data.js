/* exported getCircuitData */

const $circuitInfoContainer = document.querySelector('.circuit-info-container');

function getCircuitData(circuitId) {
  fetch(`http://ergast.com/api/f1/current/${circuitId}.json`)
    .then(response => response.json())
    .then(data => renderCircuitData(data));
}

function getConstructorStandings(year) {
  fetch(`http://ergast.com/api/f1/${year}/constructorStandings.json`)
    .then(response => response.json())
    .then(data => {
      renderSmallConstructorStandings(data);
    });
}

function getDriverStandings(year) {
  fetch(`http://ergast.com/api/f1/${year}/driverStandings.json`)
    .then(response => response.json())
    .then(data => {
      renderSmallDriverStandings(data);
    });
}

// Devo mettere on window load !!!!!!!!!!!!!!!!!!
getConstructorStandings(2022);
getDriverStandings(2022);

function renderCircuitData(data) {
  const $circuitInfoDiv = document.querySelector('.circuit-info');
  const html = `
  <div class="circuit-info">
              <h1>${data.MRData.RaceTable.Races[0].raceName}</h1>
              <p><strong>Circuit</strong>: ${data.MRData.RaceTable.Races[0].Circuit.circuitName}</p>
              <p><strong>Date</strong>: ${data.MRData.RaceTable.Races[0].date}</p>
              <p><strong>Time</strong>: ${data.MRData.RaceTable.Races[0].time}</p>
              <a class="wiki-btn home-btn blue-bkgd" href="${data.MRData.RaceTable.Races[0].Circuit.url}">Wiki Report</a>
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
