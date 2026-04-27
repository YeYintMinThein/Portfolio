const text = "Hi, I'm Ye Yint";
const typingElement = document.getElementById('typing');

let i = 0;

function type() {
  if (i < text.length) {
    typingElement.textContent += text.charAt(i);
    i++;
    setTimeout(type, 50);
  }
}

type();