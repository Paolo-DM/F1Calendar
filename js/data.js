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
      renderFullllConstructorStandings(data);
    });
}

function getDriverStandings(year) {
  fetch(`http://ergast.com/api/f1/${year}/driverStandings.json`)
    .then((response) => response.json())
    .then((data) => {
      renderFullllDriverStandings(data);
      renderSmallDriverStandings(data);
    });
}

function renderFullllDriverStandings(data) {
  const $driversFullTbody = document.querySelector(
    ".tbody-full-driver-standings"
  );

  for (let i = 0; i < data.MRData.total; i++) {
    const html = `
      <tr>
        <td><strong>${i + 1}</strong></td>
        <td>
          <span>
            <img class="pilot-icon" src="images/pilots/${data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i]
        .Driver.familyName
      }.png" />
          </span>
          &nbsp;${data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i]
        .Driver.givenName +
      " " +
      data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i]
        .Driver.familyName
      }
        </td>
        <td>
          <span>
            <img class="pilot-nationality-icon" src="images/flags/${data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i]
        .Driver.nationality
      }.svg"  />
          </span>
          &nbsp;${data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i]
        .Driver.nationality
      }
        </td>
        <td>${data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i]
        .Constructors[0].name
      }</td>
        <td>${data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].wins
      }</td>
        <td><strong>${data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].points
      }</strong></td>
      </tr>
    `;
    $driversFullTbody.insertAdjacentHTML("beforeend", html);
  }
}

fetch("http://ergast.com/api/f1/current/constructorStandings.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.MRData);
  });

function renderFullllConstructorStandings(data) {
  const $constructorsFullTbody = document.querySelector(
    ".tbody-full-constructor-standings"
  );

  for (let i = 0; i < data.MRData.total; i++) {
    const html = `
      <tr>
        <td><strong>${i + 1}</strong></td>
        <td>

          ${data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[i]
        .Constructor.name
      }
        </td>
        <td><span>
        <img class="car-icon" src="images/cars/${data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[i]
        .Constructor.constructorId
      }.png" />
      </span></td>
        <td>
          <span>
            <img class="pilot-nationality-icon" src="images/flags/${data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[
        i
      ].Constructor.nationality
      }.svg"  />
          </span>
          &nbsp;${data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[i]
        .Constructor.nationality
      }
        </td>
        <td>${data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[i]
        .wins
      }</td>
        <td><strong>${data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[i]
        .points
      }</strong></td>
      </tr>
    `;
    $constructorsFullTbody.insertAdjacentHTML("beforeend", html);
  }
}
