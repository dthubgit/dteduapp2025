document.getElementById("querySelect").addEventListener("change", function() {
  const selectedQuery = this.value;
  const resultElem = document.getElementById("queryResult");

  // Clear previous result
  resultElem.textContent = "Calculating...";

  fetch(https://script.google.com/macros/s/AKfycbxXcxnE66Zyacuf0XbEkYk7x0OXr-mhABqAsWAK_5jqtsYJ7OVXcA-vJD26ZVHDTBbC/exec)
    .then(res => res.json())
    .then(data => {
      let count = 0;

      switch(selectedQuery) {
        case "countMale":
          count = data.filter(app => app.Gender?.toLowerCase() === 'male').length;
          resultElem.textContent = `Number of Males: ${count}`;
          break;

        case "countFemale":
          count = data.filter(app => app.Gender?.toLowerCase() === 'female').length;
          resultElem.textContent = `Number of Females: ${count}`;
          break;

        case "lostFather":
          // Assuming you have a field that indicates if father is lost, e.g. "Father Status" = "Deceased"
          count = data.filter(app => app["Father Status"]?.toLowerCase() === 'deceased').length;
          resultElem.textContent = `Applicants who lost Father: ${count}`;
          break;

        case "lostMother":
          // Assuming similar field for mother
          count = data.filter(app => app["Mother Status"]?.toLowerCase() === 'deceased').length;
          resultElem.textContent = `Applicants who lost Mother: ${count}`;
          break;

        case "lostBoth":
          count = data.filter(app => app["Father Status"]?.toLowerCase() === 'deceased' && app["Mother Status"]?.toLowerCase() === 'deceased').length;
          resultElem.textContent = `Applicants who lost both Father and Mother: ${count}`;
          break;

        default:
          resultElem.textContent = "";
      }
    })
    .catch(err => {
      resultElem.textContent = "Error fetching data.";
      console.error(err);
    });
});
