/* exported getCircuitData */

// function getCircuitData(circuitId) {
//   var xhr = new XMLHttpRequest();
//   xhr.open("GET", `http://ergast.com/api/f1/current/${circuitId}.json`);
//   xhr.responseType = "json";
//   xhr.addEventListener("load", function () {
//     console.log(xhr.status);
//     console.log(xhr.response);
//     const data = xhr.response;
//     // const data = JSON.parse(xhr.responseText);
//     console.log(data);
//     console.log(data.MRData);
//     console.log(data.MRData.RaceTable);
//     console.log(data.MRData.RaceTable.Races);
//     console.log(data.MRData.RaceTable.Races[0]);
//     console.log(data.MRData.RaceTable.Races[0].raceName);
//     console.log(data.MRData.RaceTable.Races[0].Circuit);
//     console.log(data.MRData.RaceTable.Races[0].Circuit.circuitName);
//     console.log(data.MRData.RaceTable.Races[0].Circuit.url);
//   });
//   xhr.send();
// }

// var risposta = getCircuitData("4");

// console.log(risposta);

// const $circuitInfoDiv = document.querySelector(".circuit-info");
const $circuitInfoContainer = document.querySelector('.circuit-info-container');

function getCircuitData(circuitId) {
  fetch(`http://ergast.com/api/f1/current/${circuitId}.json`)
    .then(response => response.json())
    .then(data => renderCircuitData(data));
}

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

  // if ($circuitInfoContainer.children.length > 0) {
  //   // $circuitInfoDiv.parentNode.removeChild($circuitInfoDiv);
  //   // $circuitInfoDiv.remove();
  //   $circuitInfoContainer.removeChild($circuitInfoDiv);
  // }
  $circuitInfoDiv.remove();

  $circuitInfoContainer.insertAdjacentHTML('afterbegin', html);

  // $circuitInfoContainer.replaceChildren(html);
}

// getCircuitData(3);
