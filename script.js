const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbxXcxnE66Zyacuf0XbEkYk7x0OXr-mhABqAsWAK_5jqtsYJ7OVXcA-vJD26ZVHDTBbC/exec';

let applicantsData = [];

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("applicantsTableBody");
  const statusText = document.getElementById("statusText");
  const filterDropdown = document.getElementById("deepamHelpFilter");

  // Fetch data from Google Sheet
  fetch(SHEET_API_URL)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        statusText.textContent = "No data found.";
        return;
      }

      applicantsData = data; // Store full data
      statusText.textContent = "";

      renderTable(applicantsData);
    })
    .catch(error => {
      console.error("Error loading data:", error);
      statusText.textContent = "Error loading data.";
    });

  // Filter dropdown change handler
  if (filterDropdown) {
    filterDropdown.addEventListener("change", () => {
      const selected = filterDropdown.value;
      const filtered = selected
        ? applicantsData.filter(app => (app["Have you received Deepam’s Educational Help?"] || "").trim() === selected)
        : applicantsData;
      renderTable(filtered);
    });
  }

  // Table rendering function
  function renderTable(data) {
    tableBody.innerHTML = "";
    data.forEach((applicant, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td class="border px-2 py-1">${index + 1}</td>
        <td class="border px-2 py-1">${applicant.Timestamp || ''}</td>
        <td class="border px-2 py-1">${applicant.Name || ''}</td>
        <td class="border px-2 py-1">${applicant.Initial || ''}</td>
        <td class="border px-2 py-1">${applicant.Gender || ''}</td>
        <td class="border px-2 py-1">${applicant["Date of Birth"] || ''}</td>
        <td class="border px-2 py-1">${applicant.Age || ''}</td>
        <td class="border px-2 py-1">${applicant["Primary Mobile Number"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Secondary Mobile Number"] || ''}</td>
        <td class="border px-2 py-1">${applicant["WhatsApp Number"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Door No."] || ''}</td>
        <td class="border px-2 py-1">${applicant["Street Name"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Area / Taluk"] || ''}</td>
        <td class="border px-2 py-1">${applicant["City / District"] || ''}</td>
        <td class="border px-2 py-1">${applicant.Pincode || ''}</td>
        <td class="border px-2 py-1">${applicant["Father Name"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Father Occupation"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Father monthly income"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Mother Name"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Mother Occupation"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Mother monthly income"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Parent/Guardian Contact No"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Total Members in Your Family"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Gross Household Income per month"] || ''}</td>
        <td class="border px-2 py-1">${applicant["How much is your monthly household expenditure?"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Are any of your family members disabled or facing health challenges?"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Are you living in a rented house or own house?"] || ''}</td>
        <td class="border px-2 py-1">${applicant["மாத வாடகை?"] || ''}</td>
        <td class="border px-2 py-1">${applicant["SSLC: Year of Passing"] || ''}</td>
        <td class="border px-2 py-1">${applicant["SSLC: Name of the School"] || ''}</td>
        <td class="border px-2 py-1">${applicant["SSLC: Mark"] || ''}</td>
        <td class="border px-2 py-1">${applicant["SSLC: Percentage"] || ''}</td>
        <td class="border px-2 py-1">${applicant["HSC: Year of Passing"] || ''}</td>
        <td class="border px-2 py-1">${applicant["HSC: Name of the School"] || ''}</td>
        <td class="border px-2 py-1">${applicant["HSC: Mark"] || ''}</td>
        <td class="border px-2 py-1">${applicant["HSC: Percentage"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Are you joined/Studying in the college?"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Name of the College"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Academic Period"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Course"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Branch/Department"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Percentage / CCPA"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Current year fees? தற்போதைய வருடத்திற்கான கல்லூரிக் கட்டணம்?"] || ''}</td>
        <td class="border px-2 py-1">${applicant["How much amount paid for current year fees?"] || ''}</td>
        <td class="border px-2 py-1">${applicant["What is your reason for applying for educational aid?"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Request Letter"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Your Recent Passport Size Photo"] || ''}</td>
        <td class="border px-2 py-1">${applicant["SSLC MarkSheet"] || ''}</td>
        <td class="border px-2 py-1">${applicant["HSC Marksheet"] || ''}</td>
        <td class="border px-2 py-1">${applicant["College Marksheets"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Bonafide certificate/ Previous Year Fees receipt"] || ''}</td>
        <td class="border px-2 py-1">${applicant["கீழ்கண்ட எந்த வகையில் முன்னுரிமை கோர விரும்புகிறீர்கள்?"] || ''}</td>
        <td class="border px-2 py-1">${applicant["முன்னுரிமைக்கான ஆதாரம்"] || ''}</td>
        <td class="border px-2 py-1">${applicant["தீபம் கல்வி உதவி பற்றிய விவரங்களை யார் /எதன் மூலம் அறிந்து கொண்டீர்கள்?"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Reference Name"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Do you have any other financial support for your education?"] || ''}</td>
        <td class="border px-2 py-1">${applicant["வங்கியில் கல்விக்கடன் பெற விண்ணப்பம் செய்துள்ளீர்களா?"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Do you work part-time or contribute to family income?"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Have you been involved in any social or community service?"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Do you have access to a computer/internet for studying? படிப்பதற்கு உங்களிடம் கணினி/இணைய வசதி உள்ளதா?"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Have you ever received any awards or recognition for academic/sports achievements?"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Have you received Deepam’s Educational Help?"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Note/Message"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Declaration :"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Email address"] || ''}</td>
        <td class="border px-2 py-1">${applicant["Ration Card / குடும்ப அட்டை"] || ''}</td>
      `;

      tableBody.appendChild(row);
    });
  }
});
