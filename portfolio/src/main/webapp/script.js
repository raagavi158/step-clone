// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  fetch('/college-countries').then(response => response.json())
  .then((countStudents) => {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Country');
    data.addColumn('number', 'Number of Students');
    Object.keys(countStudents).forEach((country) => {
      data.addRow([country, countStudents[country]]);
    });

    const options = {
        'title': 'College Countries',
        'width':630,
        'height':800,
        'pieHole': 0.4,
    };

    const chart = new google.visualization.PieChart(
        document.getElementById('chart-container'));
    chart.draw(data, options);
  });
}
/*function genAlbums() {
    fetch('/data').then(response => response.json()).then((albumNames) => {
    var ul = document.getElementById("dynamic-list");
    //ul.innerHTML = "";
    for(var i = 0; i < albumNames.length; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = albumNames[i];
        ul.appendChild(listItem);
    }
    });
}*/

