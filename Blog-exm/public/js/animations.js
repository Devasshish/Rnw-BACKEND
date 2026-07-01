document.addEventListener("DOMContentLoaded", () => {
  // 1. Smooth Scrolling with Lenis
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 2. Custom cursor removed for better UX consistency

  // 3. GSAP Animations
  gsap.registerPlugin(ScrollTrigger);

  // Setup elements for animation
  gsap.set('.fade-up, .stagger-item, .reveal-text', { autoAlpha: 1 }); // prevent flash

  // Page Title Reveal
  const titles = document.querySelectorAll('.page-title');
  if (titles.length) {
    gsap.fromTo(titles, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }

  // Fade Up Elements
  const fadeUps = document.querySelectorAll('.fade-up');
  fadeUps.forEach(el => {
    gsap.fromTo(el, 
      { y: 40, opacity: 0 },
      { 
        y: 0, opacity: 1, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        }
      }
    );
  });

  // Staggered Cards (Grid)
  const grids = document.querySelectorAll('.grid');
  grids.forEach(grid => {
    const items = grid.querySelectorAll('.stagger-item');
    if (items.length) {
      gsap.fromTo(items, 
        { y: 50, opacity: 0, scale: 0.95 },
        { 
          y: 0, opacity: 1, scale: 1,
          duration: 0.8, 
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: grid,
            start: "top 80%",
          }
        }
      );
    }
  });

  // Navbar animation on load
  gsap.fromTo('.navbar-container', 
    { y: -100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
  );

  // Magnetic Button Effect
  const magneticButtons = document.querySelectorAll('.btn-primary');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const position = btn.getBoundingClientRect();
      const x = e.pageX - position.left - position.width / 2;
      const y = e.pageY - position.top - position.height / 2;
      gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
    });
    btn.addEventListener('mouseleave', function() {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    });
  });
});
