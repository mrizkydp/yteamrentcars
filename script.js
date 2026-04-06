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

// Testimonial cards animation
const testimonialCards = document.querySelectorAll('.testimonial-card');

testimonialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// Optional: Add more interactivity or animations as needed
