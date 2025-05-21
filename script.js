const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbxXcxnE66Zyacuf0XbEkYk7x0OXr-mhABqAsWAK_5jqtsYJ7OVXcA-vJD26ZVHDTBbC/exec';

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("applicantsTableBody");
  const statusText = document.getElementById("statusText");

  fetch(SHEET_API_URL)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        statusText.textContent = "No data found.";
        return;
      }

      // Clear "Loading..." text
      statusText.textContent = "";

      data.forEach((applicant, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td class="border px-2 py-1">${index + 1}</td>
          <td class="border px-2 py-1">${applicant.Name || ''}</td>
          <td class="border px-2 py-1">${applicant["Gender"] || ''}</td>
          <td class="border px-2 py-1">${applicant["City / District"] || ''}</td>
          <td class="border px-2 py-1">${applicant["Course"] || ''}</td>
          <td class="border px-2 py-1">${applicant["Current year fees? தற்போதைய வருடத்திற்கான கல்லூரிக் கட்டணம்?"] || ''}</td>
        `;

        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error("Error loading data:", error);
      statusText.textContent = "Error loading data.";
    });
});
