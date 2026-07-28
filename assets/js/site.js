(() => {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const year = document.querySelector("[data-year]");
  const motionField = document.querySelector("[data-motion-field]");

  if (year) year.textContent = new Date().getFullYear();

  const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 20);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav?.classList.toggle("open", !open);
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle?.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
    });
  });

  const revealTargets = document.querySelectorAll(
    ".experience-heading, .experience-copy, .experience-stats > div, .section-heading, .service-card, .featured-project, .note-card, .approach-intro, .process-list li"
  );
  revealTargets.forEach((element) => element.setAttribute("data-reveal", ""));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach((element) => observer.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add("revealed"));
  }

  if (motionField) {
    const context = motionField.getContext("2d", { alpha: true });
    const hero = motionField.closest(".hero");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0.5, y: 0.5 };
    let particles = [];
    let width = 0;
    let height = 0;
    let frameId = 0;
    let lastFrame = 0;

    const makeParticles = () => {
      const count = Math.max(16, Math.min(36, Math.floor(width / 34)));
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        depth: 0.25 + (index % 5) * 0.13
      }));
    };

    const resizeField = () => {
      const bounds = hero.getBoundingClientRect();
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      const dpr = Math.min(window.devicePixelRatio || 1, width < 720 ? 1 : 1.5);
      motionField.width = Math.round(width * dpr);
      motionField.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeParticles();
    };

    const renderField = (time = 0) => {
      const interval = width < 720 ? 42 : 33;
      if (time - lastFrame < interval && !reducedMotion.matches) {
        frameId = requestAnimationFrame(renderField);
        return;
      }
      lastFrame = time;
      context.clearRect(0, 0, width, height);

      const driftX = (pointer.x - 0.5) * 18;
      const driftY = (pointer.y - 0.5) * 12;

      particles.forEach((particle, index) => {
        if (!reducedMotion.matches) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.x < -20) particle.x = width + 20;
          if (particle.x > width + 20) particle.x = -20;
          if (particle.y < -20) particle.y = height + 20;
          if (particle.y > height + 20) particle.y = -20;
        }

        const x = particle.x + driftX * particle.depth;
        const y = particle.y + driftY * particle.depth;

        for (let next = index + 1; next < particles.length; next += 1) {
          const other = particles[next];
          const ox = other.x + driftX * other.depth;
          const oy = other.y + driftY * other.depth;
          const distance = Math.hypot(x - ox, y - oy);
          if (distance < 145) {
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(ox, oy);
            context.strokeStyle = `rgba(130, 232, 191, ${0.09 * (1 - distance / 145)})`;
            context.lineWidth = 0.7;
            context.stroke();
          }
        }

        context.beginPath();
        context.arc(x, y, 1.2 + particle.depth, 0, Math.PI * 2);
        context.fillStyle = `rgba(201, 255, 98, ${0.18 + particle.depth * 0.2})`;
        context.fill();
      });

      if (!reducedMotion.matches && !document.hidden) {
        frameId = requestAnimationFrame(renderField);
      }
    };

    const startField = () => {
      cancelAnimationFrame(frameId);
      if (!document.hidden) frameId = requestAnimationFrame(renderField);
    };

    hero.addEventListener("pointermove", (event) => {
      const bounds = hero.getBoundingClientRect();
      pointer.x = (event.clientX - bounds.left) / bounds.width;
      pointer.y = (event.clientY - bounds.top) / bounds.height;
    }, { passive: true });
    hero.addEventListener("pointerleave", () => {
      pointer.x = 0.5;
      pointer.y = 0.5;
    }, { passive: true });
    document.addEventListener("visibilitychange", startField);
    reducedMotion.addEventListener("change", startField);

    if ("ResizeObserver" in window) {
      new ResizeObserver(() => {
        resizeField();
        startField();
      }).observe(hero);
    } else {
      window.addEventListener("resize", () => {
        resizeField();
        startField();
      }, { passive: true });
    }

    resizeField();
    if (reducedMotion.matches) renderField();
    else startField();
  }
})();
