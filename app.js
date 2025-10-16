// Smooth anchors
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); }
  });
}, {threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Counters
const counters = document.querySelectorAll('[data-count]');
const io2 = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    const el = e.target;
    const to = parseInt(el.dataset.count,10);
    let start = null;
    const dur = 1400 + Math.random()*600;
    const step = ts => {
      if(!start) start = ts;
      const p = Math.min((ts-start)/dur, 1);
      el.textContent = Math.floor(to * (0.1 + 0.9*Math.pow(p, 0.85))).toLocaleString('ro-RO');
      if(p<1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    io2.unobserve(el);
  });
},{threshold:.35});
counters.forEach(el=>io2.observe(el));

// Slider simple
(function(){
  const slider = document.querySelector('[data-slider]');
  if(!slider) return;
  const slides = [...slider.querySelectorAll('.slide')];
  const prev = slider.querySelector('.slider__prev');
  const next = slider.querySelector('.slider__next');
  let i = 0;
  const show = idx => slides.forEach((s,j)=> s.classList.toggle('active', j===idx));
  show(i);
  prev.addEventListener('click', ()=>{ i = (i - 1 + slides.length) % slides.length; show(i); });
  next.addEventListener('click', ()=>{ i = (i + 1) % slides.length; show(i); });
  setInterval(()=>{ i = (i + 1) % slides.length; show(i); }, 6000);
})();

// Light parallax on hero image
(function(){
  const hero = document.querySelector('.hero');
  const imgWrap = document.querySelector('.hero__media img');
  if(!imgWrap || !hero) return;

  let y = 0;
  let x = 0;

  window.addEventListener('scroll', () => {
    y = window.scrollY * 0.4;
    updateTransform();
  });

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const percentX = (mouseX / rect.width - 0.5) * 2;
    x = percentX * -10; // Adjust the multiplier for more/less effect
    updateTransform();
  });

  function updateTransform() {
    imgWrap.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
})();
