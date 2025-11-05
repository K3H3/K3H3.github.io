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
    help: () => `<p><br>Available commands:</p><br><strong>now</strong>: Get info of current projects and interests.<br><strong>portfolio</strong>: View my portfolio built of university projects.<br><strong>gallery</strong>: View the photo gallery. No professional photos, just a gallery showcase.<br><strong>contact</strong>: View contact information.<br><strong>imprint</strong>: View the imprint.`,
    now: () => `<p>Just published the first Alpha version of a wearable app for <a href="https://apps.garmin.com" class="color-primary">Garmin Connect IQ</a> using <a href="https://developer.garmin.com/connect-iq/monkey-c/" class="color-primary">Monkey C</a> and a lot of API-requests.</p>
            <p>Link to the app <a href="https://github.com/K3H3/CIQVRM" class="color-primary">here</a>.</p>
            <p>Loving dogs, outdoor sports and the bavarian card game Schafkopf!<br>Currently I'm learning more about aviation and aviation radio communication.</p>
            <p>Check out my latest short project <a href="https://k3h3.eu/radarnotes" class="color-primary">Radar Notes</a>.</p>`,
    home: () => `<p>Hi! We are K. Hessdoerfer :)</p><p>Currently I'm finishing my master's degree of Media and Human-Centered Computing at TU Wien.</p><p>Although I'm currently living in Erlangen my heart belongs to Vienna.</p><p>Tip: You can type commands directly into this console window.</p>
          <p>Type "help" for available commands.</p>`,
    portfolio: () => `<p>Portfolio: university projects<br><br>CosmoClick:<br>Wearable IR remotecontrol with gesture recognition realized on M5 Stick C+ realized with M. Frühwirth & F. Pusch<br><br>Hennis:<br>VR Multiplayer game in farmer setting realized in Unity with M. Rathauscher</p><p>Sunday afternoon project with API read out and synths: <a href="./radarnotes/index.html" class="color-primary">Radar Notes</a></p>`,
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
      const rawHtml = commands[command]();
      const cleanOutput = formatCommandOutput(rawHtml);

      // Add an extra blank line before output
      printToConsole("");

      // Animate the 'home' output (letter-by-letter), then print the real HTML
      if (command === 'home') {
        await animatePlainText(cleanOutput, 28);
        // After animation, print the HTML version so links are clickable
        printToConsole(rawHtml);
      } else {
        // Default behavior: print the formatted output directly
        printToConsole(cleanOutput);
      }

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
      // Make input case-insensitive by using a lowercased key for command lookup
      const cmdKey = lastLine.toLowerCase();
      await executeCommand(cmdKey);
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
    // If there's no responsive photo element present, nothing to check.
    if (!responsivePhoto) return;

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

  // Small helper sleep
  function sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  // Type a command slowly (after the pseudoPath) and then simulate Enter
  async function typeAndEnter(command, charDelay = 160, postDelay = 300) {
    // Ensure focus and cursor at the end
    consoleText.focus();
    placeCursorAtEnd(consoleText);

    // Type each character as a text node so HTML stays intact
    for (const ch of command) {
      const tn = document.createTextNode(ch);
      consoleText.appendChild(tn);
      consoleText.scrollTop = consoleText.scrollHeight;
      placeCursorAtEnd(consoleText);
      await sleep(charDelay);
    }

    // slight pause, then simulate Enter (add break and execute)
    await sleep(postDelay);
    consoleText.innerHTML += "<br>";
    await executeCommand(command);
  }

  // Animate plain text (with newlines) into the console letter-by-letter
  async function animatePlainText(plainText, charDelay = 24) {
    // Create a temporary container for the animated text so we don't break HTML
    const container = document.createElement('span');
    container.className = 'animating-output';
    consoleText.appendChild(container);

    for (const ch of plainText) {
      if (ch === '\n') {
        container.appendChild(document.createElement('br'));
      } else {
        container.appendChild(document.createTextNode(ch));
      }
      consoleText.scrollTop = consoleText.scrollHeight;
      await sleep(charDelay);
    }

    // small pause after finishing
    await sleep(120);

    // Remove animated placeholder (we will print the real HTML output next)
    container.remove();
  }

  // Start-up sequence: show home output quickly, then type 'now' super-slowly.
  await executeCommand("home");

  await sleep(400);

  await typeAndEnter("now", 350, 500);

  // Ensure caret is placed at the very end after 'now' output finishes
  placeCursorAtEnd(consoleText);

  

  // Ensure there is a fresh prompt line for input. executeCommand usually
  // appends the pseudoPath, but depending on timing it might not be present
  // yet — check the last visible line and only append if missing.
  const lines = consoleText.innerText.split("\n");
  const lastLine = (lines[lines.length - 1] || "").trim();
  if (lastLine !== pseudoPath.trim()) {
    // Add a blank line and the prompt
    consoleText.innerHTML += "<br>" + pseudoPath + " ";
  }

  // Put the caret in the best spot for input (at the end of the prompt)
  placeCursorAtEnd(consoleText);
});
