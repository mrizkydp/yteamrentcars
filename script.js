// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
});

/* =====================
   SELECT ELEMENT
===================== */
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-links'); // menu
const navLinks = document.querySelectorAll('.nav-links li');
const navbar = document.querySelector('nav'); // navbar utama

let lastScroll = 0;

/* =====================
   BURGER MENU
===================== */
burger.addEventListener('click', () => {
    // toggle menu
    navMenu.classList.toggle('nav-active');

    // animasi link
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation =
                `navFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // animasi burger
    burger.classList.toggle('toggle');
});
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('nav-active');
        burger.classList.remove('toggle');

        // reset animasi
        navLinks.forEach(l => l.style.animation = '');
    });
});

/* CLICK OUTSIDE TO CLOSE MENU */
document.addEventListener('click', (e) => {
    const isClickInsideMenu = navMenu.contains(e.target);
    const isClickBurger = burger.contains(e.target);

    if (!isClickInsideMenu && !isClickBurger) {
        navMenu.classList.remove('nav-active');
        burger.classList.remove('toggle');

        navLinks.forEach(link => link.style.animation = '');
    }
});

/* =====================
   SCROLL + PARALLAX
===================== */
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    /* NAVBAR EFFECT */
    if (scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    /* HIDE / SHOW NAVBAR */
    // 👉 jangan hide kalau menu sedang dibuka
    if (!navMenu.classList.contains('nav-active')) {
        if (scrollY > lastScroll && scrollY > 80) {
            navbar.classList.add('hide');
            navbar.classList.remove('show');
        } else {
            navbar.classList.remove('hide');
            navbar.classList.add('show');
        }
    }

    lastScroll = scrollY;

    /* PARALLAX BG POSITION */
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = scrollY * 0.7 + 'px';
    }

    /* PARALLAX SCALE */
    const bg = document.querySelector('.hero-bg');
    if (bg) {
        const scale = 1 + scrollY / 3000;
        bg.style.transform = `scale(${scale})`;
    }
});

// Form Reservation to WhatsApp
document.getElementById('reservationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Mengambil nilai dari form
    var pickupLocation = document.getElementById('pickup-location').value;
    var returnLocation = document.getElementById('return-location').value;
    var pickupDate = document.getElementById('pickup-date').value;
    var returnDate = document.getElementById('return-date').value;
    var carType = document.getElementById('car-type').value;
    var fullName = document.getElementById('full-name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var specialRequests = document.getElementById('special-requests').value;

    // Menyusun pesan
    var message = "Reservasi Baru:\n" +
        "Nama: " + fullName + "\n" +
        "Email: " + email + "\n" +
        "Telepon: " + phone + "\n" +
        "Jenis Mobil: " + carType + "\n" +
        "Lokasi Pengambilan: " + pickupLocation + "\n" +
        "Lokasi Pengembalian: " + returnLocation + "\n" +
        "Tanggal Pengambilan: " + pickupDate + "\n" +
        "Tanggal Pengembalian: " + returnDate + "\n" +
        "Permintaan Khusus: " + specialRequests;

    // Encode pesan untuk URL
    var encodedMessage = encodeURIComponent(message);

    // Nomor WhatsApp yang diberikan
    var whatsappNumber = "6282269500530";

    // Buat URL WhatsApp
    var whatsappURL = "https://wa.me/6282269500530" + whatsappNumber + "?text=" + encodedMessage;

    // Buka WhatsApp di tab baru
    window.open(whatsappURL, '_blank');

    // Reset form
    this.reset();

    // Tampilkan pesan sukses
    alert("Reservasi Anda telah dikirim. Terima kasih!");

    // Scroll ke atas form
    document.getElementById('reservation').scrollIntoView({behavior: 'smooth'});
});

// Optional: Form validation
function validateForm() {
    // Add your form validation logic here
    return true; // Return false if validation fails
}

// Optional: Add a loading animation when form is submitted
document.getElementById('reservationForm').addEventListener('submit', function() {
    if (validateForm()) {
        document.querySelector('.submit-button').innerHTML = 'Mengirim...';
        document.querySelector('.submit-button').disabled = true;
        // You can add more elaborate loading animations here
    }
});


const track = document.querySelector('.testimonial-track');
let cards = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.querySelector('.testimonial-dots');

let index = 0;
let startX = 0;
let autoSlide;

/* ====== CLONE (INFINITE) ====== */
const firstClones = [...cards].slice(0, 3).map(card => card.cloneNode(true));
const lastClones = [...cards].slice(-3).map(card => card.cloneNode(true));

lastClones.forEach(clone => track.prepend(clone));
firstClones.forEach(clone => track.append(clone));

cards = document.querySelectorAll('.testimonial-card');

/* ====== SETTINGS ====== */
function getVisible() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
}

/* ====== DOTS ====== */
function createDots() {
    dotsContainer.innerHTML = '';
    const total = cards.length - (getVisible() * 2);

    for (let i = 0; i < total; i++) {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => {
            index = i;
            updateSlide(true);
        });
        dotsContainer.appendChild(dot);
    }
}

function updateDots() {
    const dots = dotsContainer.querySelectorAll('span');
    dots.forEach(dot => dot.classList.remove('active'));

    let realIndex = index % dots.length;
    if (realIndex < 0) realIndex += dots.length;

    if (dots[realIndex]) {
        dots[realIndex].classList.add('active');
    }
}

/* ====== SLIDE ====== */
function updateSlide(instant = false) {
    const card = document.querySelector('.testimonial-card');
    const gap = parseInt(getComputedStyle(track).gap);

    const width = card.offsetWidth + gap;

    if (instant) {
        track.style.transition = 'none';
    } else {
        track.style.transition = 'transform 0.4s ease';
    }

    track.style.transform = `translateX(-${(index + getVisible()) * width}px)`;

    updateDots();
}

/* ====== INFINITE RESET ====== */
track.addEventListener('transitionend', () => {
    const visible = getVisible();
    const total = cards.length;

    if (index >= total - (visible * 2)) {
        index = 0;
        updateSlide(true);
    }

    if (index < 0) {
        index = total - (visible * 2) - 1;
        updateSlide(true);
    }
});

/* ====== AUTO SLIDE ====== */
function startAuto() {
    autoSlide = setInterval(() => {
        index++;
        updateSlide();
    }, 4000);
}

function stopAuto() {
    clearInterval(autoSlide);
}

/* ====== SWIPE ====== */
track.addEventListener('touchstart', (e) => {
    stopAuto();
    startX = e.touches[0].clientX;
});

track.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (diff > 50) index++;
    if (diff < -50) index--;

    updateSlide();
    startAuto();
});

/* ====== INIT ====== */
createDots();
updateSlide(true);
startAuto();

window.addEventListener('resize', () => {
    updateSlide(true);
    createDots();
});
// Optional: Add more interactivity or animations as needed
