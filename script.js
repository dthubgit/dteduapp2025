const sheetURL = "PASTE_YOUR_DEPLOYED_WEB_APP_URL_HERE"; // Replace with your deployed Google Apps Script URL
const tableContainer = document.getElementById("tableContainer");
const searchInput = document.getElementById("searchInput");
const loader = document.getElementById("loader");
const modal = document.getElementById("detailsModal");
const modalContent = document.getElementById("modalBody");
const closeModalBtn = document.querySelector(".close");

// Fetch data on load
window.onload = function () {
  loader.style.display = "block";
  fetch(sheetURL)
    .then((response) => response.json())
    .then((data) => {
      loader.style.display = "none";
      showApplicants(data);
      searchInput.addEventListener("input", () => filterApplicants(data));
    })
    .catch((error) => {
      loader.style.display = "none";
      tableContainer.innerHTML = "<p style='color:red;'>❌ Error loading data.</p>";
      console.error("Error fetching data:", error);
    });
};

// Render the applicant table
function showApplicants(data) {
  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr>
        <th>S.No</th>
        <th>Name</th>
        <th>Gender</th>
        <th>City</th>
        <th>Course</th>
        <th>Fee</th>
      </tr>
    </thead>
  `;
  const tbody = document.createElement("tbody");

  data.forEach((applicant, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${applicant["Name"] || ""}</td>
      <td>${applicant["Gender"] || ""}</td>
      <td>${applicant["City / District"] || ""}</td>
      <td>${applicant["Course"] || ""}</td>
      <td>${applicant["Current year fees? தற்போதைய வருடத்திற்கான கல்லூரிக் கட்டணம்?"] || ""}</td>
    `;

    // Add click listener for modal popup
    row.addEventListener("click", () => {
      let detailsHtml = `<h3>${applicant["Name"]}</h3><ul>`;
      for (const [key, value] of Object.entries(applicant)) {
        detailsHtml += `<li><strong>${key}</strong>: ${value}</li>`;
      }
      detailsHtml += "</ul>";
      modalContent.innerHTML = detailsHtml;
      modal.style.display = "block";
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  tableContainer.innerHTML = "";
  tableContainer.appendChild(table);
}

// Filter applicants by search input
function filterApplicants(data) {
  const keyword = searchInput.value.toLowerCase();
  const filtered = data.filter(applicant =>
    (applicant["Name"] || "").toLowerCase().includes(keyword) ||
    (applicant["City / District"] || "").toLowerCase().includes(keyword) ||
    (applicant["Course"] || "").toLowerCase().includes(keyword)
  );
  showApplicants(filtered);
}

// Close modal
closeModalBtn.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
