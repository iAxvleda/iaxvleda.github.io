---
layout: single
title: "Software Quality Assurance"
permalink: /
---

<link rel="stylesheet" href="/assets/css/portfolio.css">

<nav>
  <a href="#home">Home</a> |
  <a href="#about">About</a> |
  <a href="#services">Services</a> |
  <a href="#portfolio">Portfolio</a> |
  <a href="#contact">Contact</a>
</nav>

<section id="home">
  <h1>Software Quality Assurance Contractor</h1>
  <p>Welcome to <strong>Software Quality Assurance</strong> contractor services. We help you enhance product quality through systematic QA processes.</p>
</section>

<section id="about">
  <h2>About</h2>
  <p>We specialize in <strong>Software Quality Assurance</strong> for international clients, offering consulting and automation services.</p>
</section>

<section id="services">
  <h2>Services</h2>
  <ul>
    <li>Test Strategy Development</li>
    <li>Automated Testing with Selenium and TestNG</li>
    <li>Code Reviews and Continuous Integration</li>
  </ul>
</section>

<section id="portfolio">
  <h2>Portfolio</h2>
  <div class="project-grid">
{% for case in site.categories['case-studies'] %}
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
</section>

<section id="testimonials">
  <h2>Testimonials</h2>
  <blockquote>"Great QA partner, reduced critical bugs by 45% in 4 weeks." — <strong>Anna Schmidt, CTO, ExampleCorp</strong></blockquote>
  <blockquote>"Their automation approach shortened our release cycle by 30%." — <strong>John Doe, PM, SoftPlus</strong></blockquote>
  <blockquote>"Reliable and thorough testing services." — <strong>Jane Lee, QA Lead, TechSoft</strong></blockquote>
</section>

<section id="contact">
  <h2>Contact</h2>
  <form action="https://formspree.io/f/xyzz" method="POST">
    <label for="name">Name</label><br>
    <input type="text" name="name" id="name" required><br>
    <label for="email">Email</label><br>
    <input type="email" name="email" id="email" required><br>
    <label for="message">Message</label><br>
    <textarea name="message" id="message" rows="4" required></textarea><br>
    <button type="submit">Send</button>
  </form>
</section>

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
