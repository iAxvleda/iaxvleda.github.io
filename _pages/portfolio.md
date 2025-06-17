---
layout: single
title: "Portfolio"
permalink: /portfolio/
---

<link rel="stylesheet" href="/assets/css/portfolio.css">

<div class="project-grid">
{% for case in site.case-studies %}
  <article class="project-card" tabindex="0" role="button" onclick="location.href='{{ case.url }}'" aria-label="Mehr über {{ case.title }}">
    <img src="https://picsum.photos/seed/{{ forloop.index }}/400/300" alt="{{ case.title }}">
    <div class="project-content">
      <h3>{{ case.title }}</h3>
      <p>{{ case.excerpt }}</p>
      <div class="project-buttons">
        <a href="{{ case.url }}" class="btn" role="button">Mehr erfahren</a>
        <a href="{{ case.repo | default: 'https://github.com/iAxvleda' }}" class="btn" role="button">Live-Demo</a>
      </div>
    </div>
  </article>
{% endfor %}
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.project-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(card => observer.observe(card));
});
</script>
