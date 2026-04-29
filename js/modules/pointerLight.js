const pointerLight = document.querySelector(".pointer-light");

document.addEventListener("mousemove", (event) => {
  if (!document.body.classList.contains("dark")) return;
  const { clientX, clientY } = event;
  pointerLight.style.left = `${clientX}px`;
  pointerLight.style.top = `${clientY}px`;
});

// let mouseX = 0;
// let mouseY = 0;
// let currentX = 0;
// let currentY = 0;

// document.addEventListener("mousemove", event => {
//     if (!document.body.classList.contains("dark")) return;
//     mouseX = event.clientX;
//     mouseY = event.clientY;
// });

// function animate() {
//   currentX += (mouseX - currentX) * 0.1;
//   currentY += (mouseY - currentY) * 0.1;

//   pointerLight.style.left = `${currentX}px`;
//   pointerLight.style.top = `${currentY}px`;

//   requestAnimationFrame(animate);
// }

// animate();