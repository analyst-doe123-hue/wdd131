function qs() {
    const params = new URLSearchParams(location.search);
    const obj = {};
    for (const [k, v] of params) {
        if (obj[k]) {
            if (Array.isArray(obj[k])) obj[k].push(v);
            else obj[k] = [obj[k], v];
        } else obj[k] = v;
    }
    return obj;
}

const data = qs();
const summary = document.getElementById("summary");

function findProductNameById(id) {
    const map = {
        "fc-1888": "flux capacitor",
        "fc-2050": "power laces",
        "fs-1987": "time circuits",
        "ac-2000": "low voltage reactor",
        "jj-1969": "warp equalizer"
    };
    return map[id] || id;
}

if (summary) {
    const dl = document.createElement("dl");
    const add = (k, v) => {
        const dt = document.createElement("dt");
        dt.textContent = k;
        const dd = document.createElement("dd");
        dd.textContent = v;
        dl.append(dt, dd);
    };

    add("Product", data.product ? findProductNameById(data.product) : "—");
    add("Rating", data.rating || "—");
    add("Installed", data.installDate || "—");
    add(
        "Features",
        data.features
            ? Array.isArray(data.features)
                ? data.features.join(", ")
                : data.features
            : "None selected"
    );
    add("Review", data.reviewText || "No written review");
    add("Reviewer", data.userName || "Anonymous");

    summary.appendChild(dl);
}

// localStorage counter
const KEY = "wdd131_reviewsCount_v1";
let count = Number(localStorage.getItem(KEY) || 0);
count += 1;
localStorage.setItem(KEY, String(count));

document.getElementById("reviewsCount").textContent = count;
document.getElementById("year2").textContent = new Date().getFullYear();
