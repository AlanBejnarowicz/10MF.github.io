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

        // delay before next character
        rand_time = Math.floor(Math.random() * 60) + 20;
        clearInterval(typingInterval);
        typingInterval = setInterval(typeWriter, rand_time);

    }


    typingInterval = setInterval(typeWriter, 50);
  });



  document.addEventListener("DOMContentLoaded", () => {
    const droneGif = document.getElementById('droneGif');
    const droneFinalImg = document.getElementById('droneFinalImg');
  
    setTimeout(() => {
      // Fade out the GIF
      droneGif.classList.add('hidden');
      // Fade in the final image slightly later
      setTimeout(() => {
        droneGif.style.display = 'none';
        droneFinalImg.style.display = 'block';
        droneFinalImg.classList.remove('hidden');
      }, 800); // match transition duration (0.8s)
    }, GIF_DURATION);
  });