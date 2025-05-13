// Sound Control Logic
let isSoundOn = localStorage.getItem('soundOn') !== 'false'; // Default to true
const soundControl = document.getElementById('soundControl');
const soundIcon = document.getElementById('soundIcon');
let celebrationAudio = null;

// Initialize audio
function initializeAudio() {
    if (!celebrationAudio) {
        celebrationAudio = new Audio('celebration-sound.mp3');
        celebrationAudio.volume = 0.3;
        celebrationAudio.onended = () => {
            celebrationAudio.currentTime = 0; // Reset audio to start
        };
    }
}

// SVG paths for sound on/off states
const soundOnPath = "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z";
const soundOffPath = "M16.5 12c0-1.77-1.02-3.29-2.5-4.03v1.79l2.48 2.48c.01-.08.02-.16.02-.24zm-2 5.56v-2.81l-2.48 2.48 2.48.33zm-10-6.56H7l5 5V9.5L7 14.5H4v-3zm0 6h3l3-3v-1.5H4v4.5zM14 3.23v2.06c2.89.86 5 3.54 5 6.71 0 1.38-.34 2.67-.94 3.81l-1.56-1.56c.41-.83.5-1.75.5-2.25 0-2.98-2.01-5.49-4.75-6.24v2.06l-2.48-2.48 2.48-2.05z";

function updateSoundIcon() {
    soundIcon.setAttribute('d', isSoundOn ? soundOnPath : soundOffPath);
}

// Initialize sound state
updateSoundIcon();

soundControl.addEventListener('click', () => {
    isSoundOn = !isSoundOn;
    localStorage.setItem('soundOn', isSoundOn);
    updateSoundIcon();
    if (!isSoundOn && celebrationAudio && !celebrationAudio.paused) {
        celebrationAudio.pause();
        celebrationAudio.currentTime = 0;
    }
});

// Theme Toggle Logic
let isDarkTheme = localStorage.getItem('theme') !== 'light'; // Default to dark
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const darkThemePath = "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 7a5 5 0 100 10 5 5 0 000-10z";
const lightThemePath = "M12 8a4 4 0 100 8 4 4 0 000-8zm0 10a6 6 0 01-5.996-5.775l-.002-.225h-2l.002.225A8 8 0 1012 4v2a6 6 0 010 12z";

function updateThemeIcon() {
    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    themeIcon.setAttribute('d', isDarkTheme ? darkThemePath : lightThemePath);
}

// Initialize theme
updateThemeIcon();

themeToggle.addEventListener('click', () => {
    isDarkTheme = !isDarkTheme;
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    updateThemeIcon();
});

// Share Button Logic
const shareButton = document.getElementById('shareButton');
let currentVerseText = "";
let currentVerseReference = "";

shareButton.addEventListener('click', async () => {
    const textToShare = `${currentVerseText} (${currentVerseReference})`;
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Amharic Bible Verse',
                text: textToShare,
                url: window.location.href
            });
        } catch (error) {
            console.warn("Sharing failed:", error);
        }
    } else {
        // Fallback: Copy to clipboard
        try {
            await navigator.clipboard.writeText(textToShare);
            alert("Verse copied to clipboard!");
        } catch (error) {
            console.warn("Failed to copy:", error);
            alert("Failed to copy verse. Please copy manually: " + textToShare);
        }
    }
});

// Create stars
const starsContainer = document.getElementById('stars');
for (let i = 0; i < 150; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 70}%`;
    const size = Math.random() * 4 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    star.style.animationDelay = `${Math.random() * 3}s`;
    
    starsContainer.appendChild(star);
}

// Celebration effects
const card = document.getElementById('eidCard');
const colors = ['#f5d7a0', '#e7c278', '#b58e4e', '#7a6b4e', '#f7ce70', '#e3a857', '#c98a3e'];
const arabicMessages = ["እግዚአብሔር", "ፀሎት", "ጥበብ", "ቃል", "ፍቅር", "ይቅርታ", "ሰላም", "ፈውስ", "ኢየሱስ ክርስቶስ"];

function triggerCelebration(x, y) {
    createParticles(20, x, y);
    createFloatingMessages(5, x, y);
    
    const lanternLights = document.querySelectorAll('.lantern-light');
    lanternLights.forEach(light => {
        light.style.animation = 'flicker 0.5s';
        light.style.backgroundColor = `rgba(247, 206, 112, ${Math.random() * 0.5 + 0.3})`;
        light.style.boxShadow = `0 0 30px rgba(247, 206, 112, 0.8)`;
        setTimeout(() => {
            light.style.animation = 'flicker 3s infinite alternate';
        }, 1000);
    });

    if (isSoundOn) {
        try {
            initializeAudio();
            celebrationAudio.play();
        } catch (error) {
            console.warn("Failed to play audio:", error);
        }
    }
}

card.addEventListener('click', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    triggerCelebration(x, y);
});

function createParticles(count, x, y) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 20 + 10;
        const angle = Math.random() * Math.PI * 2;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        card.appendChild(particle);
        
        const distance = Math.random() * 100 + 50;
        const duration = Math.random() * 1000 + 500;
        
        particle.animate([
            { transform: `translate(0, 0) scale(0.5)`, opacity: 1 },
            { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(2)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'ease-out'
        });
        
        setTimeout(() => {
            particle.remove();
        }, duration);
    }
}

function createFloatingMessages(count, originX, originY) {
    for (let i = 0; i < count; i++) {
        const message = document.createElement('div');
        message.classList.add('date-floating');
        message.textContent = arabicMessages[Math.floor(Math.random() * arabicMessages.length)];
        
        const x = originX + (Math.random() * 200 - 100);
        const y = originY + (Math.random() * 200 - 100);
        
        message.style.left = `${x}px`;
        message.style.top = `${y}px`;
        
        card.appendChild(message);
        
        const duration = Math.random() * 3000 + 2000;
        
        message.animate([
            { opacity: 0, transform: 'translateY(0) scale(0)' },
            { opacity: 1, transform: 'translateY(-50px) scale(1.2)' },
            { opacity: 0, transform: 'translateY(-120px) scale(0.8)' }
        ], {
            duration: duration,
            easing: 'ease-out'
        });
        
        setTimeout(() => {
            message.remove();
        }, duration);
    }
}

// Auto-fireworks every 10 seconds
setInterval(() => {
    const rect = card.getBoundingClientRect();
    const x = Math.random() * rect.width;
    const y = Math.random() * rect.height * 0.7;
    triggerCelebration(x, y);
}, 10000);

// Verse rotation
const verseReferences = [
    { book: "JHN", chapter: 1, verse: 1 },
    { book: "JHN", chapter: 1, verse: 14 },
    { book: "JHN", chapter: 3, verse: 16 },
    { book: "MAT", chapter: 5, verse: 3 },
    { book: "MAT", chapter: 5, verse: 44 },
    { book: "PSA", chapter: 23, verse: 1 },
    { book: "PSA", chapter: 23, verse: 4 },
    { book: "PRO", chapter: 3, verse: 5 },
    { book: "ISA", chapter: 40, verse: 31 },
    { book: "ROM", chapter: 8, verse: 28 },
    { book: "1CO", chapter: 13, verse: 13 },
    { book: "EPH", chapter: 2, verse: 8 },
    { book: "PHP", chapter: 4, verse: 13 },
    { book: "HEB", chapter: 11, verse: 1 },
    { book: "JAS", chapter: 1, verse: 5 },
    { book: "1PE", chapter: 5, verse: 7 },
    { book: "JER", chapter: 29, verse: 11 },
    { book: "2CO", chapter: 5, verse: 7 },
    { book: "GAL", chapter: 5, verse: 22 },
    { book: "COL", chapter: 3, verse: 23 }
];

async function fetchAmharicVerse(book, chapter, verse) {
    try {
        const response = await fetch('verses.json');
        const data = await response.json();
        const verseData = data.find(v => v.book === book && v.chapter === chapter && v.verse === verse);
        return {
            text: verseData?.text || "Verse not found",
            reference: `${book} ${chapter}:${verse}`
        };
    } catch (error) {
        console.error("Error fetching verse:", error);
        return {
            text: "በመጀመሪያው ቃል ነበረ፥ ቃልም በእግዚአብሔር ዘንድ ነበረ፥ ቃልም እግዚአብሔር ነበረ።",
            reference: "የዮሐንስ ወንጌል 1:1"
        };
    }
}

async function updateVerse() {
    const randomVerse = verseReferences[Math.floor(Math.random() * verseReferences.length)];
    const verseData = await fetchAmharicVerse(randomVerse.book, randomVerse.chapter, randomVerse.verse);
    
    const greetingMessage = document.querySelector(".greeting-message");
    const dateElement = document.querySelector(".date");
    
    greetingMessage.textContent = verseData.text;
    dateElement.textContent = verseData.reference;
    
    // Update shareable text
    currentVerseText = verseData.text;
    currentVerseReference = verseData.reference;
    
    greetingMessage.style.opacity = 0;
    dateElement.style.opacity = 0;
    setTimeout(() => {
        greetingMessage.style.opacity = 1;
        dateElement.style.opacity = 0.8;
        greetingMessage.style.transition = "opacity 1s ease";
        dateElement.style.transition = "opacity 1s ease";
    }, 100);
}

updateVerse();
setInterval(updateVerse, 30000);