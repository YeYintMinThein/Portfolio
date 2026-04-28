const typingElement = document.querySelector('[data-i18n="hero_title"]');

let typingTimeout;

export function startTyping(text) {
  clearTimeout(typingTimeout);

  typingElement.textContent = "";
  let i = 0;

  function type() {
    if (i < text.length) {
      typingElement.textContent += text.charAt(i);
      i++;
      typingTimeout = setTimeout(type, 50);
    }
  }

  type();
}
