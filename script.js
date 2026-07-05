const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============ MOBILE MENU ============ */
const menuBtn = document.getElementById('menuBtn');
const navLinksWrap = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => navLinksWrap.classList.toggle('open'));
document.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', () => navLinksWrap.classList.remove('open')));

/* ============ ACTIVE NAV ON SCROLL ============ */
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinkEls = document.querySelectorAll('.nav-link');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      navLinkEls.forEach(l => l.classList.remove('active'));
      const link = document.querySelector('.nav-link[href="#' + entry.target.id + '"]');
      if(link) link.classList.add('active');
    }
  });
}, { threshold: 0.5, rootMargin: '-72px 0px 0px 0px' });
sections.forEach(s => navObserver.observe(s));

/* ============ SCROLL REVEAL ============ */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if(entry.isIntersecting){
      setTimeout(() => entry.target.classList.add('in'), idx * 50);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

/* ============ SKILL BARS ============ */
const barFills = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.width = entry.target.getAttribute('data-width') + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
barFills.forEach(el => barObserver.observe(el));

/* ============ CERTIFICATES: DATA + RENDER ============ */
const linkedinUrl = "https://www.linkedin.com/in/jay-chandra-pal-6a2582341";
const certs = [
  {
    title: "AI / ML Internship",
    issuer: "Edutech Solutions",
    date: "Apr - May 2026",
    id: "EDU-2026-643",
    img: "assets/certificates/cert-aiml.jpg",
    desc: "Completed a one-month internship program in Artificial Intelligence & Machine Learning, gaining hands-on exposure to core ML concepts and applied problem-solving under guided mentorship."
  },
  {
    title: "Power BI Micro Course",
    issuer: "Skill Course",
    date: "26 Dec 2025",
    id: "SC-B9EB0238B7",
    img: "assets/certificates/cert-powerbi.png",
    desc: "Completed a focused micro-course on Power BI covering report building, data visualization and dashboard design — building directly on Excel skills to create interactive, business-ready reports."
  },
  {
    title: "Cybersecurity Analyst Job Simulation",
    issuer: "Tata (via Forage)",
    date: "14 Sep 2025",
    id: "Forage Job Simulation",
    img: "assets/certificates/cert-cyber.png",
    desc: "Completed a job simulation designed by Tata covering Identity and Access Management (IAM) fundamentals, IAM strategy assessment, custom IAM solution design, and platform integration — a practical look at how organizations secure the data analysts work with."
  }
];

const certGrid = document.getElementById('certGrid');
certs.forEach((c, i) => {
  const card = document.createElement('button');
  card.className = 'cert-card reveal';
  card.innerHTML = `
    <span class="cert-badge">✓ Verified</span>
    <h3>${c.title}</h3>
    <div class="cert-issuer">${c.issuer}</div>
    <div class="cert-date"><span>${c.date}</span><span class="cert-open">Open →</span></div>
  `;
  card.addEventListener('click', () => openModal(i));
  certGrid.appendChild(card);
  revealObserver.observe(card);
});

/* ============ MODAL LOGIC ============ */
const overlay = document.getElementById('modalOverlay');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalIssuer = document.getElementById('modalIssuer');
const modalDesc = document.getElementById('modalDesc');
const modalCred = document.getElementById('modalCred');
const modalLinkedin = document.getElementById('modalLinkedin');
let lastFocused = null;

function openModal(i){
  const c = certs[i];
  modalImg.src = c.img;
  modalImg.alt = c.title + ' certificate';
  modalTitle.textContent = c.title;
  modalIssuer.textContent = c.issuer + ' · ' + c.date;
  modalDesc.textContent = c.desc;
  modalCred.textContent = 'Credential ID: ' + c.id;
  modalLinkedin.href = linkedinUrl;

  lastFocused = document.activeElement;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('modalClose').focus();
}

function closeModal(){
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  if(lastFocused) lastFocused.focus();
}

document.getElementById('modalClose').addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => { if(e.target === overlay) closeModal(); });
document.addEventListener('keydown', (e) => { if(e.key === 'Escape' && overlay.classList.contains('open')) closeModal(); });
