document.addEventListener('DOMContentLoaded', async function () {
  const consoleText = document.getElementById('console-text');
  const galleryPopup = document.getElementById('gallery-popup');
  const closeGallery = galleryPopup.querySelector('.close');
  const galleryImages = galleryPopup.querySelectorAll('img');
  const responsivePhoto = document.querySelector('.responsive-photo');
  const consoleWindow = document.getElementById('console-window');
  let currentImageIndex = 0;
  let pseudoPath = "Drive:\\OS\\PathToHome\\K3H3\\> ";
  const blinkInterval = 500;

  const commands = {
    help: () => `
          <p><br>Available commands:</p><br><strong>now</strong>: Get info of current projects and interests.<br><strong>portfolio</strong>: View my portfolio built of university projects.<br><strong>gallery</strong>: View the photo gallery. No professional photos, just a gallery showcase.<br><strong>contact</strong>: View contact information.<br><strong>imprint</strong>: View the imprint.
      `,
    now: () => `
            <p>Just published the first Alpha version of a wearable app for <a href="https://apps.garmin.com" class="color-primary">Garmin Connect IQ</a> using <a href="https://developer.garmin.com/connect-iq/monkey-c/" class="color-primary">Monkey C</a> and a lot of API-requests.</p>
            <p>Link to the app <a href="https://github.com/K3H3/CIQVRM" class="color-primary">here</a>.</p>
            <p>Loving dogs, running, bouldering and critical thinking!</p>
            <p>Currently learning more about aviation and aviation radio communication.</p>
            <p>Check out my latest short project <a href="https://k3h3.eu/radarnotes" class="color-primary">Radar Notes</a>.</p>
      `,
    home: () => `
          <p>Welcome! Type <strong>help</strong> for available commands.</p>
      `,
    portfolio: () => `
          <p>Portfolio: university projects<br><br>CosmoClick:<br>Wearable IR remotecontrol with gesture recognition realized on M5 Stick C+ realized with M. Frühwirth & F. Pusch<br><br>Hennis:<br>VR Multiplayer game in farmer setting realized in Unity with M. Rathauscher</p>      
          <p>Sunday afternoon project with API read out and synths: <a href="./radarnotes/index.html" class="color-primary">Radar Notes</a></p>    
      `,
    gallery: () => {
      galleryPopup.classList.add('active');
      showImage(currentImageIndex);
      return '<p>Opening gallery...</p>';
    },
    contact: () => `
          <p>Contact me via <a class="color-primary" href="mailto:kx3hx3@gmail.com">Email</a> or <a class="color-primary" href="https://www.linkedin.com/in/example">LinkedIn</a>.</p>
      `,
    imprint: () => `
          <p>This isn't a commercial website, so no imprint is needed.</p>
          <p>If you want, you can contact me via <a class="color-primary" href="mailto:kx3hx3@gmail.com">Email</a> or <a class="color-primary" href="https://www.linkedin.com/in/example">LinkedIn</a>.</p>
      `,
  };

  // Initialize console with pseudo path + space before the blinking cursor
  consoleText.innerHTML = pseudoPath + " ";

  function showImage(index) {
    galleryImages.forEach((img, i) => {
      img.style.display = i === index ? 'block' : 'none';
    });
  }

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    showImage(currentImageIndex);
  }

  function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage(currentImageIndex);
  }

  galleryPopup.addEventListener('click', (e) => {
    const rect = galleryPopup.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) {
      previousImage();
    } else {
      nextImage();
    }
  });

  // Close gallery popup
  function closeGalleryPopup() {
    galleryPopup.classList.remove('active');
  }

  closeGallery.addEventListener('click', closeGalleryPopup);

  galleryPopup.addEventListener('click', (e) => {
    if (e.target === galleryPopup) {
      closeGalleryPopup();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeGalleryPopup();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'ArrowLeft') {
      previousImage();
    }
  });

  // Function to append text to the console
  function printToConsole(line) {
    consoleText.innerHTML += line + "<br>";
    consoleText.scrollTop = consoleText.scrollHeight;
  }

  // Convert basic HTML tags to line breaks
  function formatCommandOutput(html) {
    return html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<p>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .trim();
  }

  // Function to execute a command
  async function executeCommand(command) {
    if (commands[command]) {
      // Format the command output and print
      const cleanOutput = formatCommandOutput(commands[command]());
      // Add an extra blank line before cleanOutput
      printToConsole("");
      printToConsole(cleanOutput);
      // Ensure cursor is placed at end after printing
      placeCursorAtEnd(consoleText);
    } else {
      printToConsole("Command not recognized. Type 'help' for a list of commands and usage instructions.");
    }
    // Re-append path + space for next input
    consoleText.innerHTML += pseudoPath + " ";
  }

  // Function to place cursor at the end of the input
  function placeCursorAtEnd(target) {
    if (typeof window.getSelection !== "undefined" && typeof document.createRange !== "undefined") {
      const range = document.createRange();
      range.selectNodeContents(target);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  consoleText.addEventListener('mousedown', (e) => {
    consoleText.focus();
    placeCursorAtEnd(consoleText);
  });

  // Handle user input
  consoleText.addEventListener('keydown', async function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      let lines = consoleText.innerText.split("\n");
      let lastLine = lines[lines.length - 1].replace(pseudoPath, "").trim();
      // Add a blank line after user input
      consoleText.innerHTML += "<br>";
      await executeCommand(lastLine);
      // Ensure cursor is placed at end after printing
      placeCursorAtEnd(consoleText);
    }
  });

  consoleText.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'a') {
      e.preventDefault();
      // Open link in a new tab
      window.open(e.target.href, '_blank');
    }
  });

  // Function to check if elements overlap
  function checkOverlap() {
    const photoRect = responsivePhoto.getBoundingClientRect();
    const consoleRect = consoleWindow.getBoundingClientRect();

    if (
      photoRect.right > consoleRect.left &&
      photoRect.left < consoleRect.right &&
      photoRect.bottom > consoleRect.top &&
      photoRect.top < consoleRect.bottom
    ) {
      responsivePhoto.style.display = 'none';
    } else {
      responsivePhoto.style.display = 'block';
    }
  }

  // Check for overlap on window resize
  window.addEventListener('resize', checkOverlap);

  // Initial check for overlap
  checkOverlap();

  // Close gallery popup
  closeGallery.addEventListener('click', () => {
    galleryPopup.classList.remove('active');
  });

  // Trigger "home" and "now" on page load
  await executeCommand("home");
  await executeCommand("now");

  // Focus the console immediately on page load
  consoleText.focus();
});
