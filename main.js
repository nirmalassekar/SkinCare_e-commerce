// ==========================================
//   GLOWGIRL – main.js
// ==========================================

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---- Product filter ----
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    productCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
      if (match) {
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = 'fadeUp 0.4s ease forwards';
      }
    });
  });
});

// ---- Cart Toast ----
const cartToast = document.getElementById('cart-toast');
const cartToastMsg = document.getElementById('cart-toast-msg');
let toastTimeout;

function addToCart(name) {
  cartToastMsg.textContent = `✓ "${name}" added to cart!`;
  cartToast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => cartToast.classList.remove('show'), 3000);
}

// ---- Product Modal Data ----
const modalProducts = [
  {
    name: 'Rose Foam Cleanser',
    category: 'Cleanser',
    price: '₹499',
    oldPrice: '₹699',
    stars: '★★★★★ (1.2k reviews)',
    desc: 'Gentle foaming formula with rose water and aloe vera. Removes impurities without stripping your skin\'s natural moisture barrier. Suitable for all skin types including sensitive skin.',
    img: 'assets/cleanser.png',
    ingredients: ['Rose Water', 'Aloe Vera', 'Glycerin', 'Salicylic Acid 0.5%', 'Chamomile Extract']
  },
  {
    name: 'Glow Vitamin C Serum',
    category: 'Serum',
    price: '₹799',
    oldPrice: '₹1,199',
    stars: '★★★★★ (980 reviews)',
    desc: 'Brightening 15% Vitamin C with hyaluronic acid for a radiant, youthful complexion. Fades dark spots and evens skin tone. Use morning and night for visible results in 2 weeks.',
    img: 'assets/serum.png',
    ingredients: ['Vitamin C 15%', 'Hyaluronic Acid', 'Niacinamide', 'Ferulic Acid', 'Vitamin E']
  },
  {
    name: 'Petal Soft Moisturizer',
    category: 'Moisturizer',
    price: '₹599',
    oldPrice: '₹849',
    stars: '★★★★☆ (756 reviews)',
    desc: '24-hour hydration infused with rose hip oil and shea butter. Lightweight, non-greasy formula that absorbs instantly. Perfect for daily morning and night use.',
    img: 'assets/moisturizer.png',
    ingredients: ['Rose Hip Oil', 'Shea Butter', 'Ceramides', 'Squalane', 'Peptides']
  },
  {
    name: 'Pink Clay Glow Mask',
    category: 'Mask',
    price: '₹649',
    oldPrice: '₹899',
    stars: '★★★★★ (2.1k reviews)',
    desc: 'Detoxifying pink kaolin clay with lavender and rose. Deep-cleanses pores in just 10 minutes. Leaves skin visibly smooth, clear, and glowing every time.',
    img: 'assets/mask.png',
    ingredients: ['Pink Kaolin Clay', 'Lavender Extract', 'Rose Oil', 'Bentonite Clay', 'Zinc']
  },
  {
    name: 'Hyaluronic Hydra Serum',
    category: 'Serum',
    price: '₹749',
    oldPrice: '₹999',
    stars: '★★★★★ (640 reviews)',
    desc: 'Triple-weight hyaluronic acid deeply plumps and hydrates skin at every layer. Perfect for dry and combination skin. Your skin will feel like velvet.',
    img: 'assets/serum.png',
    ingredients: ['HA 3-Weight Complex', 'B5 Panthenol', 'Sodium PCA', 'Allantoin', 'Aquaxyl']
  },
  {
    name: 'Micellar Water Cleanser',
    category: 'Cleanser',
    price: '₹399',
    oldPrice: '₹549',
    stars: '★★★★☆ (520 reviews)',
    desc: 'Effortlessly removes makeup, SPF, and impurities in one gentle sweep. Alcohol-free and fragrance-free formula, gentle on even the most sensitive skin.',
    img: 'assets/cleanser.png',
    ingredients: ['Micelles', 'Rose Water', 'Cucumber Extract', 'Zinc Gluconate', 'Allantoin']
  }
];

let currentModal = 0;

function openModal(index) {
  currentModal = index;
  const p = modalProducts[index];
  document.getElementById('modal-img').src = p.img;
  document.getElementById('modal-img').alt = p.name;
  document.getElementById('modal-category').textContent = p.category;
  document.getElementById('modal-name').textContent = p.name;
  document.getElementById('modal-stars').textContent = p.stars;
  document.getElementById('modal-desc').textContent = p.desc;
  document.getElementById('modal-price').innerHTML = `${p.price} <del>${p.oldPrice}</del>`;
  const ul = document.getElementById('modal-ingredients');
  ul.innerHTML = p.ingredients.map(i => `<li>${i}</li>`).join('');
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ---- Newsletter ----
function handleSubscribe(e) {
  e.preventDefault();
  const email = document.getElementById('email-input').value;
  const msg = document.getElementById('newsletter-msg');
  msg.textContent = `🎉 Welcome! 15% coupon sent to ${email}`;
  document.getElementById('newsletter-form').reset();
  setTimeout(() => { msg.textContent = ''; }, 5000);
}

// ---- Intersection Observer for scroll animations ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.product-card, .platform-card, .testimonial-card, .feature-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
