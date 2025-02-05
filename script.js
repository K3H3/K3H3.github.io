document.addEventListener('DOMContentLoaded', async function () {
  const commandInput = document.getElementById('command-input');
  const consoleOutput = document.getElementById('console-output');
  const galleryPopup = document.getElementById('gallery-popup');
  const closeGallery = galleryPopup.querySelector('.close');
  const galleryImages = galleryPopup.querySelectorAll('img');
  let currentImageIndex = 0;
  let typingTimeout;

  const commands = {
    help: () => `
          <p>Available commands:</p><br><strong>home</strong>: Go to the homepage.<br><strong>portfolio</strong>: View my portfolio.<br><strong>gallery</strong>: View the photo gallery.<br><strong>contact</strong>: View contact information.<br><strong>imprint</strong>: View the imprint.
      `,
    home: () => `
          <p>Welcome! Type <strong>help</strong> for available commands.</p>
      `,
    portfolio: () => `
          <p>Portfolio: university projects<br><br>CosmoClick:<br>Wearable IR remotecontrol with gesture recognition realized on M5 Stick C+ realized with M. Frühwirth & F. Pusch<br><br>Hennis:<br>VR Multiplayer game in farmer setting realized in Unity with M. Rathauscher</p>          
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
          <p>Legal information goes here.</p>
      `,
  };

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

  // Function to handle typing text in the terminal-like style
  function typeText(text) {
    return new Promise(resolve => {
      let currentText = '';
      let index = 0;

      function typeCharacter() {
        if (index < text.length) {
          currentText += text[index];
          consoleOutput.lastElementChild.innerHTML = currentText;
          index++;
          consoleOutput.scrollTop = consoleOutput.scrollHeight; // Follow the scrollbar to the bottom
          if (text[index - 1] === '>' || text[index - 1] === '<') {
            typingTimeout = setTimeout(typeCharacter, 0);
          } else {
            typingTimeout = setTimeout(typeCharacter, 5);
          }
        } else {
          resolve();
        }
      }
      typeCharacter();
    });
  }

  // Function to execute a command
  async function executeCommand(command) {
    clearTimeout(typingTimeout); // Stop current text production
    const commandElement = document.createElement('p');
    commandElement.innerHTML = `> ${command}`;
    consoleOutput.appendChild(commandElement);

    if (commands[command]) {
      const outputElement = document.createElement('div');
      consoleOutput.appendChild(outputElement);
      await typeText(commands[command]());
    } else {
      await typeText('<p>Command not found. Type <strong>help</strong> for a list of commands.</p>');
    }

    // Scroll to the bottom of the console output
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
  }

  // Handle user input
  commandInput.addEventListener('keyup', async function (e) {
    if (e.key === 'Enter') {
      const command = commandInput.value.trim().toLowerCase();
      commandInput.value = '';

      if (command) {
        await executeCommand(command);
      }
    }
  });

  // Close gallery popup
  closeGallery.addEventListener('click', () => {
    galleryPopup.classList.remove('active');
  });

  // Trigger "home" on page load
  await executeCommand("home");
});
