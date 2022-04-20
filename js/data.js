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

fetch("http://ergast.com/api/f1/drivers/alonso.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });

function getDriverStandings(year) {
  fetch(`http://ergast.com/api/f1/${year}/driverStandings.json`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.MRData);
      console.log(
        data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.nationality
          .toLowerCase()
          .substring(0, 2)
      );
      renderFullllDriverStandings(data);
      renderSmallDriverStandings(data);
    });
}

function renderFullllDriverStandings(data) {
  const $driversFullTbody = document.querySelector(
    ".tbody-full-driver-standings"
  );

  /*
<tr>
              <td>1</td>
              <td>
                <span
                  ><img
                    class="pilot-icon"
                    src="images/pilots/leclerc.png" /></span
                >&nbsp;Charles Leclerc
              </td>
              <td>
                <span
                  ><img
                    class="pilot-nationality-icon"
                    src="images/monaco-2.png" /></span
                >&nbsp;Monegasque
              </td>
              <td>Ferrari</td>
              <td>2</td>
              <td>71</td>
            </tr>
*/

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
    // let $tr = document.createElement("tr");
    // let $td1 = document.createElement("td");
    // $td1.textContent = i + 1;
    // let $td2 = document.createElement("td");
    // $td2.textContent =
    //   data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver
    //     .givenName +
    //   " " +
    //   data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver
    //     .familyName;
    // let $td3 = document.createElement("td");
    // $td3.textContent =
    //   data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].points;
    // $tr.appendChild($td1);
    // $tr.appendChild($td2);
    // $tr.appendChild($td3);
    // $driversTbody.appendChild($tr);
    $driversFullTbody.insertAdjacentHTML("beforeend", html);
  }
}
