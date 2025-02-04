function DiscoverMore() {
  // open specified link
  window.open("https://shattereddisk.github.io/rickroll/rickroll.mp4");
}

const lines = [
  { id: "line1", text: "k3h3" },
  { id: "line2", text: "Vienna based dog loving developer" },
  { id: "line3", text: "Learning fun stuff at <a href='https://informatics.tuwien.ac.at/master/media-and-human-centered-computing/' class='color-url'>TU Wien</a>" },
  { id: "line4", text: "Deeply in love with Pebbles" },
  { id: "line5", text: "To interact use console at the bottom of this site" },
];

let currentLine = 0;
let currentChar = 0;
let tempText = ""; // Stores the progressively built text

function typeWriter() {
  if (currentLine < lines.length) {
    const line = lines[currentLine];
    const element = document.getElementById(line.id);

    if (currentChar < line.text.length) {
      if (line.text[currentChar] === "<") {
        // Detect the start of an HTML tag
        const tagEnd = line.text.indexOf(">", currentChar) + 1;
        if (tagEnd > 0) {
          // Immediately insert the full HTML tag
          tempText += line.text.substring(currentChar, tagEnd);
          currentChar = tagEnd; // Move the cursor past the tag
        }
      } else {
        // Type normal characters one by one
        tempText += line.text[currentChar];
        currentChar++;
      }

      element.innerHTML = tempText; // Re-set innerHTML to render properly
      setTimeout(typeWriter, 50); // Adjust typing speed here
    } else {
      // Move to the next line
      currentLine++;
      currentChar = 0;
      tempText = ""; // Reset tempText for the next line

      setTimeout(typeWriter, 500); // Delay before the next line starts
    }
  }
}
// Start the typewriter effect when the page loads
window.onload = typeWriter;

const content = document.getElementById('content');
const commandInput = document.getElementById('command-input');

const commands = {
  help: () => {
    return `
      Available commands:<br>
      - <strong>home</strong>: Go to the homepage.<br>
      - <strong>portfolio</strong>: View my portfolio.<br>
      - <strong>gallery</strong>: View the photo gallery.<br>
      - <strong>contact</strong>: View contact information.<br>
      - <strong>imprint</strong>: View the imprint.<br>
    `;
  },

  home: () => {
    return `
    <p>Type <strong>help</strong> in the console below to see available commands.</p>
    `;
  },

  portfolio: () => {
    return `
      <div class="container">
        <h2>Portfolio: university projects</h2>
          <p>CosmoClick:</a> Wearable IR remotecontrol with gesture recognition realized on M5 Stick C+<br>realized
              with M. Frühwirth & F. Pusch</p>
          <p>Hennis:</a> VR Multiplayer game in farmer setting<br>realized in Unity with M. Rathauscher</p>
      </div>
    `;
  },

  gallery: () => {
    return `
      <h1>Photo Gallery</h1>
      <p>Here are some photos:</p>
      <div class="gallery">
        <img src="./photos/nils-leonhardt-vMoZvKeZOhw-unsplash.jpg" alt="Photo 1">
        <img src="./photos/riccardo-andolfo-4GPhufVYp-8-unsplash.jpg" alt="Photo 2">
        <img src="./photos/ingmar-h-QNb02C_HyxQ-unsplash.jpg" alt="Photo 3">
      </div>
    `;
  },

  // do not use local reconnect link but absolute one

  contact: () => {
    return `   
    <div class="container">
    <h2>contact</h2>
    
    <p>Feel free to reach out to me on <a href="https://www.linkedin.com/in/k3h3" class="color-url" target="_blank" rel="noopener noreferrer">LinkedIn</a> or by
        <a href="mailto:kx3hx3@gmail.com" class="color-url">Email</a>
    </p>
    </div>
  `;
  },

  imprint: () => {
    return `
      <h1>Imprint</h1>
      <p>Legal information goes here.<br>contact me by <a href="mailto:kx3hx3@gmail.com" class="color-url">Email</a></p>
    `;
  },

};

commandInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    const command = commandInput.value.trim().toLowerCase();
    commandInput.value = '';

    if (commands[command]) {
      content.innerHTML = commands[command]();
    } else {
      content.innerHTML = `<p>Command not found. Type <strong>help</strong> for a list of commands.</p>`;
    }
  }
});