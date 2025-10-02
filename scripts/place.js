// ================================
// Wind Chill Calculation + Footer
// ================================

function calculateWindChill(tempC, windKmh) {
  // Formula only applies if temp <= 10°C and wind > 4.8 km/h
  if (tempC <= 10 && windKmh > 4.8) {
    // Convert °C to °F
    const tempF = (tempC * 9/5) + 32;
    // Convert km/h to mph
    const windMph = windKmh / 1.609;
    // Wind chill formula (°F)
    const chillF = 35.74 + (0.6215 * tempF) - (35.75 * Math.pow(windMph, 0.16)) + (0.4275 * tempF * Math.pow(windMph, 0.16));
    // Convert back to °C
    const chillC = (chillF - 32) * 5/9;
    return chillC.toFixed(1);
  } else {
    return "N/A";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Wind chill
  const tempElement = document.getElementById("temperature");
  const windElement = document.getElementById("wind-speed");
  const chillElement = document.getElementById("wind-chill");

  if (tempElement && windElement && chillElement) {
    const tempC = parseFloat(tempElement.textContent);
    const windKmh = parseFloat(windElement.textContent);

    const chill = calculateWindChill(tempC, windKmh);
    chillElement.textContent = chill;
  }

  // Footer current year
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Footer last modified
  const modifiedElement = document.getElementById("last-modified");
  if (modifiedElement) {
    modifiedElement.textContent = document.lastModified;
  }
});
