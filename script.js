// script.js

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});


  document.addEventListener("DOMContentLoaded", () => {
    const text = '10"@FPV: Get the 3D Files';  // The text to type
    const typedBtn = document.getElementById('typed-btn');
    let i = 0;                      // Current character index
    let typingInterval;

    function typeWriter() {
      // Show the substring of text up to the current index i
      typedBtn.textContent = text.substring(0, i);
      i++;

      // Check if done typing
      if (i > text.length) {
        clearInterval(typingInterval);
        // Add a class that includes the blinking caret
        typedBtn.classList.add('with-caret');
      }
    }

    // Start typing: call 'typeWriter' every 100ms
    rand_time = Math.floor(Math.random() * 60) + 20;
    typingInterval = setInterval(typeWriter, rand_time);
  });
