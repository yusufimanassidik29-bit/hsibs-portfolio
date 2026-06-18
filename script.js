// ===================================
// 1. FUNGSI DARK/LIGHT MODE (DIPERBAIKI)
// ===================================
/* ---- THEME TOGGLE FUNCTIONALITY ---- */
function applyTheme(theme) {
  const themeBtn = document.getElementById('theme-toggle');
  const themeBtnM = document.getElementById('theme-toggle-mobile');
  
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    // Ubah ikon menjadi matahari jika mode gelap aktif
    if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    if (themeBtnM) themeBtnM.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    document.documentElement.classList.remove('dark');
    // Ubah ikon menjadi bulan jika mode terang aktif
    if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    if (themeBtnM) themeBtnM.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
  localStorage.setItem('portfolio-theme', theme);
}

function toggleTheme() {
  const isDark = document.documentElement.classList.contains('dark');
  applyTheme(isDark ? 'light' : 'dark');
}

// Ambil tema yang disimpan sebelumnya, atau gunakan mode 'dark' sebagai default
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
applyTheme(savedTheme);

// Pasang event listener ke tombol setelah DOM selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('theme-toggle');
  const themeBtnM = document.getElementById('theme-toggle-mobile');
  
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  if (themeBtnM) themeBtnM.addEventListener('click', toggleTheme);
});

// ===================================
// 2. HAMBURGER MENU
// ===================================
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburgerMenu');
    if (!navMenu || !hamburger) return;

    const isExpanded = navMenu.classList.toggle('active');
    hamburger.classList.toggle('active'); 
    hamburger.setAttribute('aria-expanded', isExpanded);
}

// ===================================
// 3. TYPING EFFECT
// ===================================
function initializeTypingEffect() {
    const text = ["Santri HSI BOARDING SCHOOL.", "Beradab & Berakhlak mulia.", "Pintar Mengaji dan IT", "Bisa Berbahasa Arab."]; 
    let wordIndex = 0;
    let charIndex = 0;
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    function type() {
        if (wordIndex < text.length) {
            if (charIndex < text[wordIndex].length) {
                typingElement.textContent += text[wordIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, 100); 
            } else {
                setTimeout(erase, 1200); 
            }
        }
    }
    function erase() {
        if (charIndex > 0) {
            typingElement.textContent = text[wordIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 30); 
        } else {
            wordIndex = (wordIndex + 1) % text.length;
            setTimeout(type, 100);
        }
    }
    type(); 
}

// ===================================
// 4. PROJECT FILTER
// ===================================
function initializeProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-item');
    const projectCards = document.querySelectorAll('.project-card');
    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.getAttribute('data-filter');
            projectCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300); 
                }
            });
        });
    });
}

// ===================================
// 5. INITIALIZATION (DOM LOAD)
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Jalankan Theme dari Storage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        updateThemeIcon(false);
    } else {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        updateThemeIcon(true);
    }

    // Pasang Event Listener ke tombol
    const desktopBtn = document.getElementById('theme-toggle-desktop');
    const mobileBtn = document.getElementById('theme-toggle-mobile');
    if (desktopBtn) desktopBtn.onclick = toggleTheme;
    if (mobileBtn) mobileBtn.onclick = toggleTheme;

    initializeTypingEffect();
    initializeProjectFilter();
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.getElementById('navMenu');
        const hamburger = document.getElementById('hamburgerMenu');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const targetID = this.getAttribute("href");
        if (targetID.length > 1) {
            const target = document.querySelector(targetID);
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" });
            }
        }
    });
});