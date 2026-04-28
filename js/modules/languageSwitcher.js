import { startTyping } from "./typing.js"

const languageSwitcher = document.getElementById("languageSwitcher");
const languageSwitcherBtn = document.getElementById("languageSwitcherBtn");
const items = document.querySelectorAll(".language-switcher__item");
const languageSwitcherSelected = document.getElementById("languageSwitcherSelected");

let translations = {};

async function loadTranslations() {
    const response = await fetch("../../data/lang.json");
    translations = await response.json();

    const savedLang = localStorage.getItem("lang") || "en";
    applyLanguage(savedLang);
}

function applyLanguage(lang) {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(element => {
        const key = element.getAttribute("data-i18n");
        
        if (key === "hero_title")
            startTyping(translations[lang][key]);
        else
            element.textContent = translations[lang][key];
    })

    localStorage.setItem("lang", lang);

    items.forEach(item => item.classList.toggle("language-switcher__item--active", item.dataset.lang === lang));

    const activeItem = document.querySelector(`[data-lang="${lang}"]`);
    languageSwitcherSelected.innerHTML = activeItem.innerHTML;
}

languageSwitcherBtn.addEventListener("click", () => {
    languageSwitcher.classList.toggle("language-switcher--active");
});

items.forEach(item => {
    item.addEventListener("click", () => {
        const lang = item.dataset.lang;
        applyLanguage(lang);
        languageSwitcher.classList.remove("language-switcher--active");
    });
});

document.addEventListener("click", (e) => {
    if (!languageSwitcher.contains(e.target)) {
        languageSwitcher.classList.remove("language-switcher--active");
    }
});

loadTranslations();