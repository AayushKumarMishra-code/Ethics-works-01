// Smooth scroll for buttons and nav links
const scrollButtons = document.querySelectorAll("[data-scroll-to]");

scrollButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const targetSelector = btn.getAttribute("data-scroll-to");
    const target = document.querySelector(targetSelector);
    if (!target) return;
    e.preventDefault();
    const rect = target.getBoundingClientRect();
    const absoluteY = window.scrollY + rect.top - 80;
    window.scrollTo({
      top: absoluteY,
      behavior: "smooth",
    });
  });
});


const navToggle = document.querySelector(".nav-toggle");
const navMobile = document.querySelector(".nav-mobile");

if (navToggle && navMobile) {
  const toggleMenu = () => {
    const isOpen = navMobile.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navMobile.setAttribute("aria-hidden", String(!isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  navToggle.addEventListener("click", toggleMenu);

  navMobile.querySelectorAll("[data-mobile-link]").forEach((link) => {
    link.addEventListener("click", () => {
      toggleMenu();
    });
  });
}


const animatedEls = document.querySelectorAll("[data-animate]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  animatedEls.forEach((el) => observer.observe(el));
} else {
  animatedEls.forEach((el) => el.classList.add("is-visible"));
}

// Light parallax effect on cards / orbit container
const parallaxEls = document.querySelectorAll("[data-parallax]");

const applyParallax = () => {
  const scrollY = window.scrollY || window.pageYOffset;
  parallaxEls.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const offsetTop = rect.top + scrollY;
    const speed = 0.06;
    const distance = (scrollY - offsetTop) * speed;
    el.style.transform = `translateY(${distance}px)`;
  });
};

let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      applyParallax();
      ticking = false;
    });
    ticking = true;
  }
});


const serviceLayer = document.querySelector(".service-detail-layer");
const servicePanels = document.querySelectorAll(".service-detail");
const serviceOpenButtons = document.querySelectorAll("[data-open-service]");

const openServicePanel = (id) => {
  if (!serviceLayer) return;
  serviceLayer.classList.add("is-open");
  servicePanels.forEach((panel) => {
    const active = panel.getAttribute("data-service-panel") === id;
    panel.classList.toggle("is-active", active);
    if (active) {
      const firstFocusable = panel.querySelector("button, [href], input, select, textarea");
      if (firstFocusable) {
        setTimeout(() => firstFocusable.focus(), 240);
      }
    }
  });
};

const closeServicePanel = () => {
  if (!serviceLayer) return;
  serviceLayer.classList.remove("is-open");
  servicePanels.forEach((panel) => panel.classList.remove("is-active"));
};

serviceOpenButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-open-service");
    if (id) openServicePanel(id);
  });
});

if (serviceLayer) {
  serviceLayer.addEventListener("click", (e) => {
    if (e.target.classList.contains("service-detail-backdrop")) {
      closeServicePanel();
    }
  });

  servicePanels.forEach((panel) => {
    const closeBtn = panel.querySelector(".detail-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => closeServicePanel());
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeServicePanel();
    }
  });
}


const contactForms = document.querySelectorAll(".contact-form");

contactForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const confirmation = form.querySelector(".form-confirmation");
    if (!confirmation) return;

    const serviceName = form.getAttribute("data-service-name") || "your enquiry";
    confirmation.textContent = `Thanks — we’ve received your note about ${serviceName}. We’ll reply within one business day.`;
    confirmation.classList.add("is-visible");

    const submitButton = form.querySelector("button[type='submit']");
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sent";
    }

    setTimeout(() => {
      form.reset();
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send enquiry";
        if (form.classList.contains("main-contact")) {
          submitButton.textContent = "Send message";
        }
      }
    }, 1200);
  });
});

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

