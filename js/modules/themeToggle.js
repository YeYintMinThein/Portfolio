const themeToggler = document.querySelector('#themeToggle');
const themeIcon = document.querySelector('#themeToggleIcon');
const themeBackground = document.querySelector("#themeToggleBackground");
const languageSwitcher = document.querySelector("#languageSwitcher")

themeToggler.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    languageSwitcher.classList.toggle("dark");

    if(document.body.classList.contains("dark"))
        themeBackground.src = "../../assets/videos/night.mp4";
    else
        themeBackground.src = "../../assets/videos/day.mp4";

    themeBackground.play();
});