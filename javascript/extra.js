// about me card
document.getElementById('aboutBtn').addEventListener('click', () => {
    document.getElementById('aboutOverlay').classList.add('open');
});

document.getElementById('aboutClose').addEventListener('click', () => {
    document.getElementById('aboutOverlay').classList.remove('open');
});

// close on backdrop click
document.getElementById('aboutOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('aboutOverlay')) {
        document.getElementById('aboutOverlay').classList.remove('open');
    }
});