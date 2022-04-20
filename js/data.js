function getCircuitData(circuitId) {
  fetch(`http://ergast.com/api/f1/current/${circuitId}.json`)
    .then((response) => response.json())
    .then((data) => renderCircuitData(data));
}

function getConstructorStandings(year) {
  fetch(`http://ergast.com/api/f1/${year}/constructorStandings.json`)
    .then((response) => response.json())
    .then((data) => {
      renderSmallConstructorStandings(data);
    });
}

function getDriverStandings(year) {
  fetch(`http://ergast.com/api/f1/${year}/driverStandings.json`)
    .then((response) => response.json())
    .then((data) => {
      renderSmallDriverStandings(data);
    });
}
