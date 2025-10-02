// Footer updates
document.getElementById("current-year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

// Wind Chill Function (1 line of code, °C version)
const calculateWindChill = (t, v) => (13.12 + 0.6215 * t - 11.37 * Math.pow(v, 0.16) + 0.3965 * t * Math.pow(v, 0.16)).toFixed(1);

// Apply wind chill only if conditions met
document.addEventListener("DOMContentLoaded", () => {
    const temp = parseFloat(document.getElementById("temperature").textContent);
    const wind = parseFloat(document.getElementById("wind-speed").textContent);
    const chillEl = document.getElementById("wind-chill");

    if (temp <= 10 && wind > 4.8) {
        chillEl.textContent = `${calculateWindChill(temp, wind)}°C`;
    } else {
        chillEl.textContent = "N/A";
    }
});
