// Language content
const content = {
  en: {
    welcome: "Welcome to Hotel Club de Kipe",
    cta: "Your oasis in Conakry, Guinea",
    about: "[Hotel description coming soon]",
    amenities: {
      rooms: "Rooms: [Details coming soon]",
      restaurant: "Restaurant: Local and international cuisine",
      bar: "Bar: Refreshing drinks and cocktails",
      pool: "Pool: Swim and unwind in our beautiful outdoor pool.",
      wifi: "Wi-Fi: Free high-speed internet throughout the hotel.",
      parking: "Parking: Secure, complimentary parking for all guests."
    },
    availability: "Availability",
    gallery: "Gallery",
    map: "Map",
    booking: "Book via WhatsApp"
  },
  fr: {
    welcome: "Bienvenue à l'Hôtel Club de Kipé",
    cta: "Votre oasis à Conakry, Guinée",
    about: "[Description de l'hôtel à venir]",
    amenities: {
      rooms: "Chambres : [Détails à venir]",
      restaurant: "Restaurant : Cuisine locale et internationale",
      bar: "Bar : Boissons et cocktails rafraîchissants",
      pool: "Piscine : Détendez-vous dans notre belle piscine extérieure.",
      wifi: "Wi-Fi : Internet haut débit gratuit dans tout l'hôtel.",
      parking: "Parking : Parking sécurisé et gratuit pour tous les clients."
    },
    availability: "Disponibilité",
    gallery: "Galerie",
    map: "Carte",
    booking: "Réserver via WhatsApp"
  }
};

const whatsappNumber = ""; // TODO: Add hotel WhatsApp number
const whatsappMessage = {
  en: "Hello, I would like to book a room at Hotel Club de Kipe.",
  fr: "Bonjour, je souhaite réserver une chambre à l'Hôtel Club de Kipé."
};

function setLanguage(lang) {
  document.querySelector('.hero-content h1').textContent = content[lang].welcome;
  document.querySelector('.hero-content p').textContent = content[lang].cta;
  document.querySelector('#about .section-title').textContent = lang === 'en' ? 'About Us' : 'À propos';
  document.querySelector('#amenities .section-title').textContent = lang === 'en' ? 'Amenities' : 'Services';
  document.querySelector('#gallery .section-title').textContent = content[lang].gallery;
  document.querySelector('#map .section-title').textContent = lang === 'en' ? 'Find Us' : 'Nous trouver';
  document.querySelector('#booking .section-title').textContent = lang === 'en' ? 'Book Your Stay' : 'Réservez votre séjour';
  document.querySelector('#contact .section-title').textContent = lang === 'en' ? 'Contact Us' : 'Contact';
  // Amenities
  const amenityCards = document.querySelectorAll('.amenity-card');
  if (amenityCards.length >= 6) {
    amenityCards[0].querySelector('h3').textContent = lang === 'en' ? 'Rooms' : 'Chambres';
    amenityCards[0].querySelector('p').textContent = content[lang].amenities.rooms;
    amenityCards[1].querySelector('h3').textContent = lang === 'en' ? 'Restaurant' : 'Restaurant';
    amenityCards[1].querySelector('p').textContent = content[lang].amenities.restaurant;
    amenityCards[2].querySelector('h3').textContent = lang === 'en' ? 'Bar' : 'Bar';
    amenityCards[2].querySelector('p').textContent = content[lang].amenities.bar;
    amenityCards[3].querySelector('h3').textContent = lang === 'en' ? 'Pool' : 'Piscine';
    amenityCards[3].querySelector('p').textContent = content[lang].amenities.pool;
    amenityCards[4].querySelector('h3').textContent = 'Wi-Fi';
    amenityCards[4].querySelector('p').textContent = content[lang].amenities.wifi;
    amenityCards[5].querySelector('h3').textContent = lang === 'en' ? 'Parking' : 'Parking';
    amenityCards[5].querySelector('p').textContent = content[lang].amenities.parking;
  }
  // Nav links
  const navLinks = document.querySelectorAll('.nav-links a');
  const navTexts = lang === 'en' ? ['About','Amenities','Gallery','Map','Booking','Contact'] : ['À propos','Services','Galerie','Carte','Réservation','Contact'];
  navLinks.forEach((a, i) => a.textContent = navTexts[i]);
}

document.getElementById('en-btn').addEventListener('click', function() {
  setLanguage('en');
  this.classList.add('active');
  document.getElementById('fr-btn').classList.remove('active');
});
document.getElementById('fr-btn').addEventListener('click', function() {
  setLanguage('fr');
  this.classList.add('active');
  document.getElementById('en-btn').classList.remove('active');
});

// WhatsApp booking button
function getWhatsAppLink(lang) {
  if (!whatsappNumber) return '#';
  const msg = encodeURIComponent(whatsappMessage[lang]);
  return `https://wa.me/${whatsappNumber}?text=${msg}`;
}

document.getElementById('booking-btn').addEventListener('click', function() {
  const lang = document.getElementById('en-btn').classList.contains('active') ? 'en' : 'fr';
  window.open(getWhatsAppLink(lang), '_blank');
});
document.getElementById('whatsapp-link').addEventListener('click', function(e) {
  const lang = document.getElementById('en-btn').classList.contains('active') ? 'en' : 'fr';
  this.href = getWhatsAppLink(lang);
});

// Placeholder calendar logic
document.getElementById('calendar').textContent = '[Calendar will be displayed here]';

// Carousel logic
const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentSlide = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateCarousel();
});
nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
});

// Show only the first slide on load
updateCarousel();

// Offset scroll for anchor links so content is not hidden behind fixed nav
function offsetAnchor() {
  if (window.location.hash.length > 0) {
    const el = document.querySelector(window.location.hash);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - document.querySelector('nav').offsetHeight,
        behavior: 'smooth'
      });
    }
  }
}
window.addEventListener('hashchange', offsetAnchor);

// Set default language
document.addEventListener('DOMContentLoaded', function() {
  // List of French-speaking country codes (ISO 3166-1 alpha-2)
  const frenchCountries = [
    'FR','BE','CH','LU','MC','CA','CI','BF','BJ','CM','CF','TD','KM','CG','CD','DJ','GQ','GA','GN','GW','HT','MG','ML','MA','MU','NE','NC','RE','RW','SN','SC','TG','TN','VU','WF','YT'
  ];
  // Try geolocation API
  fetch('https://ipapi.co/json/')
    .then(res => res.json())
    .then(data => {
      const country = data.country;
      if (country === 'GN' || frenchCountries.includes(country)) {
        setLanguage('fr');
        document.getElementById('fr-btn').classList.add('active');
        document.getElementById('en-btn').classList.remove('active');
      } else {
        setLanguage('en');
        document.getElementById('en-btn').classList.add('active');
        document.getElementById('fr-btn').classList.remove('active');
      }
    })
    .catch(() => {
      // Fallback: use browser language
      const lang = navigator.language || navigator.userLanguage;
      if (lang && lang.startsWith('fr')) {
        setLanguage('fr');
        document.getElementById('fr-btn').classList.add('active');
        document.getElementById('en-btn').classList.remove('active');
      } else {
        setLanguage('en');
        document.getElementById('en-btn').classList.add('active');
        document.getElementById('fr-btn').classList.remove('active');
      }
    });
});

// Hamburger menu toggle for mobile
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');
const navOverlay = document.getElementById('nav-overlay');
if (hamburgerBtn && navLinks && navOverlay) {
  function closeMenu() {
    navLinks.classList.remove('open');
    navOverlay.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }
  function openMenu() {
    navLinks.classList.add('open');
    navOverlay.classList.add('open');
    hamburgerBtn.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
  }
  hamburgerBtn.addEventListener('click', function() {
    if (navLinks.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  navOverlay.addEventListener('click', closeMenu);
}
// WhatsApp open logic for Book a Room and Book via WhatsApp
function openWhatsApp(lang) {
  if (!whatsappNumber) {
    alert('WhatsApp number not set yet.');
    return;
  }
  window.open(getWhatsAppLink(lang), '_blank');
}
const bookRoomBtn = document.getElementById('book-room-btn');
if (bookRoomBtn) {
  bookRoomBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const lang = document.getElementById('en-btn').classList.contains('active') ? 'en' : 'fr';
    openWhatsApp(lang);
  });
}
const bookingBtn = document.getElementById('booking-btn');
if (bookingBtn) {
  bookingBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const lang = document.getElementById('en-btn').classList.contains('active') ? 'en' : 'fr';
    openWhatsApp(lang);
  });
} 