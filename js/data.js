function getCircuitData(circuitId) {
  fetch(`https://ergast.com/api/f1/current/${circuitId}.json`)
    .then((response) => response.json())
    .then((data) => renderCircuitData(data));
}

function getCalendar(year) {
  fetch(`https://ergast.com/api/f1/${year}.json`)
    .then((response) => response.json())
    .then((data) => {
      renderFullCalendar(data);
      return fetch(`https://ergast.com/api/f1/${year}/results.json?limit=700`);
    })
    .then((response) => response.json())
    .then((data) => {
      renderWinner(data);
    });
}

function getConstructorStandings(year) {
  fetch(`https://ergast.com/api/f1/${year}/constructorStandings.json`)
    .then((response) => response.json())
    .then((data) => {
      renderSmallConstructorStandings(data);
      renderFullllConstructorStandings(data);
    });
}

function getDriverStandings(year) {
  fetch(`https://ergast.com/api/f1/${year}/driverStandings.json`)
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
        <td class="full-standings-nationality">
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
        <td class="constructor-car"><span>
        <img class="car-icon" src="images/cars/${data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[i]
        .Constructor.constructorId
      }.png" />
      </span></td>
        <td class="full-standings-nationality">
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

function renderFullCalendar(data) {
  const $trElements = document.querySelectorAll(".calendar-tr");
  const $calendarFullTbody = document.querySelector(".tbody-full-calendar");
  if ($calendarFullTbody) {
    $trElements.forEach((tr) => tr.remove());
  }

  const totalRaces = parseInt(data.MRData.total);

  for (let i = 0; i < totalRaces; i++) {
    let raceName = data.MRData.RaceTable.Races[i].raceName;
    let circuitName = data.MRData.RaceTable.Races[i].Circuit.circuitName;
    let country = data.MRData.RaceTable.Races[i].Circuit.Location.country;
    let date = data.MRData.RaceTable.Races[i].date;
    let time = data.MRData.RaceTable.Races[i].time.slice(0, 5) + "Z";

    const html = `
      <tr class="calendar-tr">
        <td><strong>${i + 1}</strong></td>
        <td>
          ${raceName}
        </td>
        <td class="calendar-circuit-name">${circuitName}</td>
        <td class="calendar-country"><span>
        <img class="country-icon" src="https://countryflagsapi.com/png/${country}"  />
      </span>
      &nbsp;${country}</td>
        <td>
        ${date}
        </td>
        <td>${time === undefined ? "N.A." : time}</td>
        <td class="winner-calendar"></td>
      </tr>
    `;

    $calendarFullTbody.insertAdjacentHTML("beforeend", html);

    const $countryIcons = document.querySelectorAll(".country-icon");
    // Handle country name exceptions
    if (country === "UK") {
      $countryIcons[i].setAttribute(
        "src",
        "https://countryflagsapi.com/png/GB"
      );
    } else if (country === "UAE") {
      $countryIcons[i].setAttribute(
        "src",
        "https://countryflagsapi.com/png/ae"
      );
    } else if (country === "Russia") {
      $countryIcons[i].setAttribute(
        "src",
        "https://countryflagsapi.com/png/ru"
      );
    } else if (
      data.MRData.RaceTable.Races[i].Circuit.Location.country === "Korea"
    ) {
      $countryIcons[i].setAttribute(
        "src",
        "https://countryflagsapi.com/png/kr"
      );
    }
  }
}

function renderWinner(data) {
  const $winnersCalendar = document.querySelectorAll(".winner-calendar");

  for (let i = 0; i < data.MRData.RaceTable.Races.length; i++) {
    const winnerFamilyName =
      data.MRData.RaceTable.Races[i].Results[0].Driver.familyName;
    const winnerName =
      data.MRData.RaceTable.Races[i].Results[0].Driver.givenName;
    $winnersCalendar[i].textContent = winnerName[0] + "." + winnerFamilyName;
  }
}
