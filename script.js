const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbzRWnkguLEW5N--3Qg-VB22W7D7SG53K5UhIY5pinA/dev';

window.onload = () => {
  fetch(SHEET_API_URL)
    .then(res => res.json())
    .then(applicants => {
      const container = document.getElementById("tableContainer");
      if (!applicants || applicants.length === 0) {
        container.innerText = "No data found.";
        return;
      }

      const table = document.createElement("table");
      const headers = Object.keys(applicants[0]);

      const thead = document.createElement("thead");
      const headRow = document.createElement("tr");
      headers.forEach(h => {
        const th = document.createElement("th");
        th.textContent = h;
        headRow.appendChild(th);
      });
      thead.appendChild(headRow);
      table.appendChild(thead);

      const tbody = document.createElement("tbody");
      applicants.forEach(app => {
        const row = document.createElement("tr");
        headers.forEach(h => {
          const td = document.createElement("td");
          td.textContent = app[h];
          row.appendChild(td);
        });
        tbody.appendChild(row);
      });

      table.appendChild(tbody);
      container.innerHTML = '';
      container.appendChild(table);
    });
};
