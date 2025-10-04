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
    {
        templeName: "Salt Lake City Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 382207,
        imageUrl: "images/salt-lake.jpg"
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
const container = document.querySelector("#temple-gallery");
const pageTitle = document.querySelector("#page-title");
const filterLinks = document.querySelectorAll('a[data-filter]');

// ===========================
// Functions
// ===========================

// Function to display temple cards
function displayTemples(templeList) {
    container.innerHTML = ""; // Clear previous content

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

// ===========================
// Filtering Logic
// ===========================
filterLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = link.getAttribute('data-filter');
        pageTitle.textContent = filter.charAt(0).toUpperCase() + filter.slice(1);

        switch (filter) {
            case 'old':
                displayTemples(temples.filter(t => parseInt(t.dedicated.split(",")[0]) < 1900));
                break;
            case 'new':
                displayTemples(temples.filter(t => parseInt(t.dedicated.split(",")[0]) > 2000));
                break;
            case 'large':
                displayTemples(temples.filter(t => t.area > 90000));
                break;
            case 'small':
                displayTemples(temples.filter(t => t.area < 10000));
                break;
            default:
                displayTemples(temples);
        }
    });
});

// ===========================
// Footer Date Script
// ===========================
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = `Last Modified: ${document.lastModified}`;

// ===========================
// Default Load
// ===========================
displayTemples(temples);
