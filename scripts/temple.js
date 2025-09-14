// temples.js
document.addEventListener("DOMContentLoaded", () => {
    const yearEl = document.getElementById("year");
    const lastEl = document.getElementById("last-modified");

    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (lastEl) lastEl.textContent = "Last modified: " + document.lastModified;

    const hamburger = document.getElementById("hamburger");
    const nav = document.getElementById("main-nav");

    if (hamburger && nav) {
        hamburger.addEventListener("click", () => {
            const expanded = hamburger.getAttribute("aria-expanded") === "true";
            hamburger.setAttribute("aria-expanded", String(!expanded));
            nav.classList.toggle("open");
            hamburger.setAttribute(
                "aria-label",
                expanded ? "Open navigation" : "Close navigation"
            );
        });

        // Close nav when clicking a link (mobile)
        nav.addEventListener("click", (e) => {
            if (e.target.tagName === "A" && nav.classList.contains("open")) {
                nav.classList.remove("open");
                hamburger.setAttribute("aria-expanded", "false");
                hamburger.setAttribute("aria-label", "Open navigation");
            }
        });
    }
});
