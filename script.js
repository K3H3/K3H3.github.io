function DiscoverMore() {
  // open specified link
  window.open("https://shattereddisk.github.io/rickroll/rickroll.mp4");
}

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
      - <strong>clear</strong>: Clear the console.<br>
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

  contact: () => {
    return `   
    <div class="container">
    <h2>contact</h2>
    <p>Feel free to reach out to me on <a href="www.linkedin.com/in/k3h3" class="color-url">LinkedIn</a> or by
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
  clear: () => {
    content.innerHTML = '';
    return '';
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