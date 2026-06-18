// ===================================
// 1. FUNGSI DARK/LIGHT MODE
// ===================================
function applyTheme(theme) {
  const themeBtn = document.getElementById('theme-toggle');
  const themeBtnM = document.getElementById('theme-toggle-mobile');
  
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    if (themeBtnM) themeBtnM.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    document.documentElement.classList.remove('dark');
    if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    if (themeBtnM) themeBtnM.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
  localStorage.setItem('portfolio-theme', theme);
}

function toggleTheme() {
  const isDark = document.documentElement.classList.contains('dark');
  applyTheme(isDark ? 'light' : 'dark');
}

// Set default theme awal sebelum DOM loading agar tidak flickr
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
applyTheme(savedTheme);

// ===================================
// 2. HAMBURGER MENU
// ===================================
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburgerMenu');
    if (!navMenu || !hamburger) return;

    const isExpanded = navMenu.classList.toggle('active');
    navMenu.classList.toggle('hidden'); // Menampilkan menu mobile Tailwind
    hamburger.classList.toggle('active'); 
    hamburger.setAttribute('aria-expanded', isExpanded);
}

// ===================================
// 3. TYPING EFFECT (DIPERBAIKI)
// ===================================
function initializeTypingEffect() {
    const text = ["Santri HSI BOARDING SCHOOL.", "Beradab & Berakhlak mulia.", "Pintar Mengaji dan IT.", "Bisa Berbahasa Arab."]; 
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    function type() {
        const currentWord = text[wordIndex];
        
        if (isDeleting) {
            // Menghapus karakter
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Mengetik karakter
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Penentuan Kecepatan Ketik
        let typeSpeed = isDeleting ? 40 : 100;

        // Jika selesai mengetik satu kalimat full
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 1500; // Jeda saat teks selesai diketik
            isDeleting = true;
        } 
        // Jika selesai menghapus satu kalimat full
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % text.length; // Lanjut ke kalimat berikutnya
            typeSpeed = 300; // Jeda sebelum mulai mengetik lagi
        }

        setTimeout(type, typeSpeed);
    }
    
    type(); 
}

// ===================================
// 4. PROJECT FILTER (DIPERBAIKI SINKRONISASI CLASS)
// ===================================
function initializeProjectFilter() {
    // Diubah dari .filter-item ke .filter-btn menyesuaikan HTML kamu
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-primary', 'text-white');
                btn.classList.add('bg-lightBg', 'dark:bg-darkBg');
            });
            
            button.classList.add('active', 'bg-primary', 'text-white');
            button.classList.remove('bg-lightBg', 'dark:bg-darkBg');
            
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
    // Pasang Event Listener ke tombol theme switcher
    const themeBtn = document.getElementById('theme-toggle');
    const themeBtnM = document.getElementById('theme-toggle-mobile');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
    if (themeBtnM) themeBtnM.addEventListener('click', toggleTheme);

    // Hamburger Mobile Listener
    const hamburger = document.getElementById('hamburgerMenu');
    if (hamburger) hamburger.addEventListener('click', toggleMenu);

    // Jalankan Efek
    initializeTypingEffect();
    initializeProjectFilter();

    // Auto close menu mobile saat link diklik
    document.querySelectorAll('#navMenu a').forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.getElementById('navMenu');
            const hamburger = document.getElementById('hamburgerMenu');
            if (navMenu && !navMenu.classList.contains('hidden')) {
                navMenu.classList.add('hidden');
                if (hamburger) hamburger.classList.remove('active');
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
});