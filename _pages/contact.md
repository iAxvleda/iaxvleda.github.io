---
layout: single
title: "Contact"
permalink: /contact/
---

<form action="https://formspree.io/f/xyzz" method="POST">
  <label for="name">Name</label><br>
  <input type="text" name="name" id="name" required><br>
  <label for="email">Email</label><br>
  <input type="email" name="email" id="email" required><br>
  <label for="message">Message</label><br>
  <textarea name="message" id="message" rows="4" required></textarea><br>
  <button type="submit">Send</button>
</form>

<script>
  document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    var form = e.target;
    fetch(form.action, { method: 'POST', body: new FormData(form) })
      .then(() => { alert('Thank you!'); form.reset(); });
  });
</script>
