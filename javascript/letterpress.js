
const output = document.getElementById('output');
const letters = document.querySelectorAll('.letterpress-flex img');
const MAX_CHARS = 20; 

let printed = [];

letters.forEach(img => {
    img.addEventListener('click', () => {
        if(printed.length >= MAX_CHARS) { showLimitBubble(); return; } // prevent overflow
        const letter = img.dataset.letter;
        printed.push(letter);
        renderOutput();
    });
});

document.getElementById('backspace').addEventListener('click', () => {
    printed.pop();
    renderOutput();
});

document.getElementById('spacebar').addEventListener('click', () => {
    if(printed.length >= MAX_CHARS) { showLimitBubble(); return; } // prevent overflow
    printed.push(' ');
    renderOutput();
});

document.getElementById('clear').addEventListener('click', () => {
    printed = [];
    renderOutput();
});

// also let the real keyboard type
document.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') { printed.pop(); renderOutput(); return; }
    if (e.key === ' '){
        if (printed.length >= MAX_CHARS) { showLimitBubble(); return; } // prevent overflow
         printed.push(' '); renderOutput(); return; 
        } 
    const char = e.key.toUpperCase();
    if (/^[A-Z.!]$/.test(char)){ 
        if(printed.length >= MAX_CHARS) { showLimitBubble(); return; }// prevent overflow
        printed.push(char); renderOutput(); 
    }
});

let bubbleTimer = null;

function showLimitBubble() {
    const bubble = document.getElementById('limitBubble');
    bubble.classList.add('show');
    clearTimeout(bubbleTimer); // reset if already showing
    bubbleTimer = setTimeout(() => {
        bubble.classList.remove('show');
    }, 2200); // disappears after 2.2 seconds
}

function renderOutput() {
    output.innerHTML = printed.map(l =>
        `<span class="printed-letter">${l === ' ' ? `<span class="printed-space"></span>` : l}</span>`
    ).join('');

    // press controls hide/show
    if (printed.length > 0) {
        document.getElementById('controls').classList.add('visible');
    } else {
        document.getElementById('controls').classList.remove('visible');
    }

    const atLimit = printed.length >= MAX_CHARS;
    document.querySelectorAll('.letterpress-flex img, #spacebar').forEach(el => {
        el.style.opacity = atLimit ? '0.35' : '1';
    });
}



