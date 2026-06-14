//this file will create a lightbox type gallery for all images on the art-dump page

//collect images into an array at run time
const artImages = [];
document.querySelectorAll('.art-panel').forEach(panel => {
    const img = panel.querySelector('img');
    const caption = panel.querySelector('.art-caption');

    if(img) {
        artImages.push({
            src: img.src,
            caption: caption ? caption.textContent.trim() : ''
            // condition ? value_if_true : value_if_false
        });
    }
});

let currentIndex = 0;

// build lightbox dom in js
const overlay = document.createElement('div');
overlay.id = 'lightbox-overlay';

const backdrop = document.createElement('div');
backdrop.id = 'lightbox-backdrop';
backdrop.onclick = closeLightbox;

const box = document.createElement('div');
box.id = 'lightbox-box';

const imgEl = document.createElement('img');
imgEl.id = 'lightbox-img';

const captionEl = document.createElement('p');
captionEl.id = 'lightbox-caption';

const closeBtn = document.createElement('button');
closeBtn.id = 'lightbox-close';
closeBtn.textContent = 'x';
closeBtn.onclick = closeLightbox;

const prevBtn = document.createElement('button');
prevBtn.id = 'lightbox-prev';
prevBtn.textContent = '<';
prevBtn.onclick = () => navigate(-1);

const nextBtn = document.createElement('button');
nextBtn.id = 'lightbox-next';
nextBtn.textContent = '>';
nextBtn.onclick = () => navigate(1);

const counter = document.createElement('span');
counter.id = 'lightbox-counter';

//add everything to the box/overlay
box.append(closeBtn, prevBtn, imgEl, nextBtn, captionEl, counter);
overlay.append(backdrop, box);
document.body.appendChild(overlay);

//wire up clicks on each art panel img
document.querySelectorAll('.art-panel').forEach((panel, i) => {
    panel.style.cursor = 'pointer';
    panel.onclick = () => openLightbox(i);
});

function isMobile() {
    return window.matchMedia('(max-width: 900px)').matches;
}

//logic functions
function openLightbox(index) {
    if (isMobile()){
        return;
    }
    
    currentIndex = index;
    updateLightbox();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

function navigate(dir) {
    currentIndex = (currentIndex + dir + artImages.length) % artImages.length;
    updateLightbox();
}

function updateLightbox() {
    const { src, caption } = artImages[currentIndex];
    imgEl.src = src;
    captionEl.textContent = caption;
    counter.textContent = `${currentIndex + 1} / ${artImages.length}`;
}

//keyboard support
document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'ArrowRight') navigate(1);
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'Escape') closeLightbox();
});