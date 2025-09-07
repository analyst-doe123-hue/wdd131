// Get the current year
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Get the last modified date of the document
const lastModified = new Date(document.lastModified);

// Format the date nicely
const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
};
const formattedDate = lastModified.toLocaleString("en-US", options);

// Set the last modified date in the footer
document.getElementById("lastModified").textContent = `Last Modified: ${formattedDate}`;
