function initializePortfolioScripts() {

  // --- 1. Project Filtering Logic (for projects.html.erb) ---
  const filterButtons = document.querySelectorAll(".filter-btn");
  if (filterButtons.length > 0) {
    const projects = document.querySelectorAll(".project-item");
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        filterButtons.forEach((button) => button.classList.remove("active"));
        btn.classList.add("active");

        projects.forEach((project) => {
          const category = project.dataset.category;
          const shouldShow = filter === "all" || category === filter;

          if (shouldShow) {
            project.style.display = 'block';
          } else {
            project.style.display = 'none';
          }
        });
      });
    });
  }

  // --- 2. Case Study Scrollspy, Tooltips, & Back to Top Logic ---
  const scrollNav = document.querySelector('.scroll-nav');
  if (scrollNav) {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.scroll-nav a');
    const backToTopBtn = document.getElementById('back-to-top-btn');

    const activateNavLink = (id) => {
      navLinks.forEach(link => { link.classList.toggle('active', link.dataset.section === id); });
    };

    const handleScroll = () => {
      let currentSectionId = '';
      const scrollOffset = window.innerHeight * 0.4;
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - scrollOffset) { currentSectionId = section.getAttribute('id'); }
      });
      if (currentSectionId) {
        activateNavLink(currentSectionId);
      } else if (sections.length > 0) {
        activateNavLink(sections[0].getAttribute('id'));
      }

      if (window.scrollY > 300) { backToTopBtn.classList.add('show'); }
      else { backToTopBtn.classList.remove('show'); }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    navLinks.forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) { targetElement.scrollIntoView({ behavior: 'smooth' }); }
      });
    });

    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

document.addEventListener("turbo:load", initializePortfolioScripts);
