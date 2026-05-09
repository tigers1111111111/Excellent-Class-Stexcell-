// Control hero title size
let heroFontSize = 4.5; // Default size multiplier (rem)

function updateHeroSize() {
  const h1 = document.querySelector('#hero-title');
  if (h1) {
    h1.style.fontSize = heroFontSize + 'rem';
  }
}

function increaseHeroSize() {
  heroFontSize += 0.5;
  updateHeroSize();
  console.log('Hero size:', heroFontSize + 'rem');
}

function decreaseHeroSize() {
  heroFontSize = Math.max(2, heroFontSize - 0.5);
  updateHeroSize();
  console.log('Hero size:', heroFontSize + 'rem');
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey) {
    switch(e.key) {
      case '=':
      case '+':
        increaseHeroSize();
        e.preventDefault();
        break;
      case '-':
        decreaseHeroSize();
        e.preventDefault();
        break;
    }
  }
});

// Console commands
window.heroSizeUp = increaseHeroSize;
window.heroSizeDown = decreaseHeroSize;
window.setHeroSize = (size) => {
  heroFontSize = size;
  updateHeroSize();
  console.log('Hero size set to:', size + 'rem');
};

console.log('Hero size control loaded. Use Ctrl +/- or console: heroSizeUp(), heroSizeDown(), setHeroSize(5)');

