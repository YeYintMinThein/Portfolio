import { setTypingWords } from "./typing.js"

const languageSwitcher = document.querySelector("#languageSwitcher");
const languageSwitcherBtn = document.querySelector("#languageSwitcherBtn");
const items = document.querySelectorAll(".language-switcher__item");
const languageSwitcherSelected = document.querySelector("#languageSwitcherSelected");

let translations = {};
let currentIndex = 0;

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
        const value = translations[lang][key];
        if (Array.isArray(value)) return;
        element.textContent = value;
    })

    setTypingWords(translations[lang]["hero_subtitles"]);

    localStorage.setItem("lang", lang);

    items.forEach(item => item.classList.toggle("language-switcher__item--active", item.dataset.lang === lang));

    const activeItem = document.querySelector(`[data-lang="${lang}"]`);
    languageSwitcherSelected.innerHTML = activeItem.innerHTML;
}

languageSwitcherBtn.addEventListener("click", () => {
    languageSwitcher.classList.toggle("language-switcher--active");
    
    currentIndex = [...items].findIndex(item =>
        item.classList.contains("language-switcher__item--active")
    );
    updateSelection();
    languageSwitcherBtn.focus();
});

languageSwitcherBtn.addEventListener("keydown", event => {
    if (!languageSwitcher.classList.contains("language-switcher--active")) {
        return;
    }

    if (event.key === "ArrowDown") {
        event.preventDefault();
        currentIndex++;
        if (currentIndex >= items.length) {
            currentIndex = 0;
        }
        updateSelection();
    }

    if (event.key === "ArrowUp") {
        event.preventDefault();
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = items.length - 1;
        }
        updateSelection();
    }

    if (event.key === "Enter") {
        event.preventDefault();
        items[currentIndex].click();
    }

    if (event.key === "Escape") {
        languageSwitcher.classList.remove("language-switcher--active");
    }
})

function updateSelection() {
    items.forEach((item) => {
        item.classList.remove("language-switcher__item--focused");
    });
    items[currentIndex].classList.add("language-switcher__item--focused");
    items[currentIndex].scrollIntoView({
        block: "nearest"
    });
}

function clearFocusedState() {
    items.forEach(item => {
        item.classList.remove("language-switcher__item--focused");
    });
}

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
        clearFocusedState();
    }
});

loadTranslations();