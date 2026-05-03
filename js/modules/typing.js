const typingElement = document.querySelector('[data-i18n="hero_subtitles"]');

let heroSubtitles = [];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;
let typingTimeout;

export function setTypingWords(words) {
    heroSubtitles = words;
    wordIndex = 0;
    charIndex = 0;
    deleting = false;
    clearTimeout(typingTimeout);
    type();
}

function type() {

	if (!heroSubtitles.length) return;

    const currentWord = heroSubtitles[wordIndex];

    if (!deleting) {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        deleting = true;
        typingTimeout = setTimeout(type, 1500);
        return;
      }
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % heroSubtitles.length;
      }
    }

    typingTimeout = setTimeout(
        type,
        deleting ? 50 : 100
    );
}

type();