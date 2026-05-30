const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

if (window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top  = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .service-card, .project-card, .skill-group').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
  });
}

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

document.querySelectorAll('.form-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.form-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.form-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(`panel-${tab.dataset.tab}`).classList.add('active');
  });
});

document.getElementById('btnWA').addEventListener('click', () => {
  const nombre = document.getElementById('waNombre').value.trim();
  const msg = document.getElementById('waMsg').value.trim();

  if (!msg) {
    document.getElementById('waMsg').focus();
    return;
  }

  const texto = nombre
    ? `Hola Juan Pablo! Soy ${nombre}. ${msg}`
    : `Hola Juan Pablo! ${msg}`;

  window.open(`https://wa.me/573244083274?text=${encodeURIComponent(texto)}`, '_blank');
});

document.getElementById('btnMail').addEventListener('click', () => {
  const nombre = document.getElementById('mailNombre').value.trim();
  const correo = document.getElementById('mailCorreo').value.trim();
  const msg = document.getElementById('mailMsg').value.trim();

  if (!msg) {
    document.getElementById('mailMsg').focus();
    return;
  }

  const asunto = nombre ? `Contacto de ${nombre} — Portafolio` : 'Contacto desde el portafolio';
  const cuerpo = correo
    ? `${msg}\n\nResponder a: ${correo}`
    : msg;

  window.location.href = `mailto:juanpabzh@gmail.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'var(--gold-mid)'
      : '';
  });
});

const expandBtn = document.getElementById('expandBtn');
const expandPanel = document.getElementById('expandPanel');

expandBtn.addEventListener('click', () => {
  expandBtn.classList.toggle('open');
  expandPanel.classList.toggle('open');
  expandBtn.querySelector('span').textContent =
    expandBtn.classList.contains('open') ? 'Ocultar' : 'Ver qué incluye';
});
