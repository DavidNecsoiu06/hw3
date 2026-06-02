const form = document.getElementById("projectForm");
const tableBody = document.querySelector("#projectsTable tbody");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    clearErrors();

    let valid = true;

    const projectName = document.getElementById("projectName");
    const description = document.getElementById("description");
    const projectUrl = document.getElementById("projectUrl");
    const technology = document.getElementById("technology");
    const completionDate = document.getElementById("completionDate");
    const imageUrl = document.getElementById("imageUrl");

    if (projectName.value.trim().length < 3) {
        showError("projectNameError", "Project name must contain at least 3 characters.");
        valid = false;
    }

    if (description.value.trim().length < 10) {
        showError("descriptionError", "Description must contain at least 10 characters.");
        valid = false;
    }

    if (!projectUrl.value.startsWith("http")) {
        showError("urlError", "Please enter a valid URL.");
        valid = false;
    }

    if (technology.value === "") {
        showError("technologyError", "Please choose a technology.");
        valid = false;
    }

    if (completionDate.value === "") {
        showError("dateError", "Please choose a completion date.");
        valid = false;
    }

    if (!valid) {
        return;
    }

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${projectName.value}</td>
        <td>${description.value}</td>
        <td>
          <a href="${projectUrl.value}" target="_blank">
            Visit
          </a>
        </td>
        <td>${technology.value}</td>
        <td>
          <img
            src="${imageUrl.value || 'https://via.placeholder.com/80'}"
            alt="Project preview"
            width="80"
            loading="lazy"
          >
        </td>
        <td>${completionDate.value}</td>
    `;

    tableBody.appendChild(row);

    form.reset();
});

function showError(id, message) {
    document.getElementById(id).textContent = message;
}

function clearErrors() {
    const errors = document.querySelectorAll(".error-message");

    errors.forEach(error => {
        error.textContent = "";
    });
}

