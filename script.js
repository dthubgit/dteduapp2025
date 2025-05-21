const SHEET_API_URL = 'YOUR_WEB_APP_URL_HERE';

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
