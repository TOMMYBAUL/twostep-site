// Navbar scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Smooth scroll CTAs
document.querySelectorAll('a[href="#contact"]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });
});

// Formspree submit
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn = document.getElementById('submit-btn');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.style.display = 'none';
        formSuccess.style.display = 'block';
      } else {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Je veux être contacté →';
        alert('Une erreur est survenue. Réessaye ou écris-nous à bauland@twostep.fr');
      }
    } catch {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Je veux être contacté →';
      alert('Une erreur est survenue. Réessaye ou écris-nous à bauland@twostep.fr');
    }
  });
}

// Animate on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.step, .stat, .about-inner').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
