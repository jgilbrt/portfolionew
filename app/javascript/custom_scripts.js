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

          // Use a simple show/hide which is more robust with Turbo
          if (shouldShow) {
            project.style.display = 'block';
          } else {
            project.style.display = 'none';
          }
        });
      });
    });
  }

  // --- 2. AI Summarizer Logic (for case study pages with the button) ---
  const summarizeBtn = document.getElementById('summarize-btn');
  if (summarizeBtn) {
    const contentToSummarize = document.getElementById('case-study-content');
    const modalBody = document.getElementById('summary-modal-body');
    const summaryModal = new bootstrap.Modal(document.getElementById('summaryModal'));
    const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");

    summarizeBtn.addEventListener('click', async () => {
      summarizeBtn.disabled = true;
      summarizeBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Summarising...';
      modalBody.innerHTML = '<p>Generating summary...</p>';
      summaryModal.show();
      try {
        const response = await fetch('/summarize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
          body: JSON.stringify({ text: contentToSummarize.innerText })
        });
        if (!response.ok) { throw new Error('Network response was not ok'); }
        const data = await response.json();
        modalBody.innerHTML = data.summary.replace(/\n/g, '<br>');
      } catch (error) {
        modalBody.innerHTML = '<p class="text-danger">Sorry, there was an error generating the summary.</p>';
      } finally {
        summarizeBtn.disabled = false;
        summarizeBtn.innerHTML = '<i class="bi bi-sparkles"></i> Summarise with AI';
      }
    });
  }

  // --- 3. Case Study Scrollspy, Tooltips, & Back to Top Logic ---
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
        // Activate the first link if we are at the top
        activateNavLink(sections[0].getAttribute('id'));
      }

      if (window.scrollY > 300) { backToTopBtn.classList.add('show'); }
      else { backToTopBtn.classList.remove('show'); }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Trigger scroll handler on load to set initial state
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

// Listen for Turbo to load a new page, ensuring scripts re-run on navigation
document.addEventListener("turbo:load", initializePortfolioScripts);
