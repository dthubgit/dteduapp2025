const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbxXcxnE66Zyacuf0XbEkYk7x0OXr-mhABqAsWAK_5jqtsYJ7OVXcA-vJD26ZVHDTBbC/exec';

let applicantsData = [];

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("applicantsTableBody");
  const statusText = document.getElementById("statusText");
  const filterDropdown = document.getElementById("deepamHelpFilter");

  fetch(SHEET_API_URL)
    .then(response => response.json())
    .then(data => {
      applicantsData = data;
      statusText.textContent = "";
      renderTable(applicantsData);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      statusText.textContent = "Error loading data.";
    });

  filterDropdown.addEventListener("change", () => {
    const selected = filterDropdown.value;
    const filtered = selected
      ? applicantsData.filter(app => (app["Have you received Deepam’s Educational Help?"] || "").trim() === selected)
      : applicantsData;
    renderTable(filtered);
  });

  function renderTable(data) {
    tableBody.innerHTML = "";
    data.forEach((applicant, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="border px-2 py-1">${index + 1}</td>
        <td class="border px-2 py-1">${applicant.Name || ''}</td>
        <td class="border px-2 py-1">${applicant.Gender || ''}</td>
        <td class="border px-2 py-1">${applicant.Course || ''}</td>
        <td class="border px-2 py-1">${applicant["Have you received Deepam’s Educational Help?"] || ''}</td>
      `;
      tableBody.appendChild(row);
    });
  }
});
