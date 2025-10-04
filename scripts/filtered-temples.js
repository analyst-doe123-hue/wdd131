// ===========================
// Temple Data
// ===========================
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "images/aba-nigeria.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "images/manti-utah.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "images/payson-utah.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "images/yigo-guam.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "images/washington-dc.jpg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "images/lima-peru.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "images/mexico-city.jpg"
    },
    // Added 3 more for variety
    {
        templeName: "Salt Lake City Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 382207,
        imageUrl: "images/salt-lake-city.jpg"
    },
    {
        templeName: "Nairobi Kenya",
        location: "Nairobi, Kenya",
        dedicated: "2022, August, 1",
        area: 15000,
        imageUrl: "images/nairobi-kenya.jpg"
    },
    {
        templeName: "Accra Ghana",
        location: "Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        imageUrl: "images/accra-ghana.jpg"
    }
];

// ===========================
// DOM References
// ===========================
const container = document.querySelector("#temples-container");
const homeBtn = document.querySelector("#home");
const oldBtn = document.querySelector("#old");
const newBtn = document.querySelector("#new");
const largeBtn = document.querySelector("#large");
const smallBtn = document.querySelector("#small");

// ===========================
// Functions
// ===========================

// 1️⃣ Function to display all temple cards
function displayTemples(templeList) {
    container.innerHTML = ""; // clear previous

    templeList.forEach((temple) => {
        const card = document.createElement("section");
        card.classList.add("temple-card");

        const h3 = document.createElement("h3");
        h3.textContent = temple.templeName;

        const loc = document.createElement("p");
        loc.textContent = `Location: ${temple.location}`;

        const ded = document.createElement("p");
        ded.textContent = `Dedicated: ${temple.dedicated}`;

        const area = document.createElement("p");
        area.textContent = `Area: ${temple.area.toLocaleString()} sq ft`;

        const img = document.createElement("img");
        img.src = temple.imageUrl;
        img.alt = `${temple.templeName} Temple`;
        img.loading = "lazy";

        card.append(h3, loc, ded, area, img);
        container.appendChild(card);
    });
}

// 2️⃣ Filtering logic
homeBtn.addEventListener("click", () => displayTemples(temples));
oldBtn.addEventListener("click", () =>
    displayTemples(
        temples.filter((t) => parseInt(t.dedicated.split(",")[0]) < 1900)
    )
);
newBtn.addEventListener("click", () =>
    displayTemples(
        temples.filter((t) => parseInt(t.dedicated.split(",")[0]) > 2000)
    )
);
largeBtn.addEventListener("click", () =>
    displayTemples(temples.filter((t) => t.area > 90000))
);
smallBtn.addEventListener("click", () =>
    displayTemples(temples.filter((t) => t.area < 10000))
);

// 3️⃣ Footer date script
const yearSpan = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModified) lastModified.textContent = document.lastModified;

// ===========================
// Default Load
// ===========================
displayTemples(temples);
