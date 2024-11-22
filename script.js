// Smooth scrolling for navbar links
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      window.scrollTo({
        top: targetSection.offsetTop - 50, // Adjust for navbar height
        behavior: 'smooth'
      });
    });
  });
  
  // Add interactivity for image popup
  document.querySelectorAll('.project img').forEach(img => {
    img.addEventListener('click', () => {
      const popup = document.createElement('div');
      popup.style.position = 'fixed';
      popup.style.top = '50%';
      popup.style.left = '50%';
      popup.style.transform = 'translate(-50%, -50%)';
      popup.style.background = 'rgba(0, 0, 0, 0.9)';
      popup.style.padding = '20px';
      popup.style.borderRadius = '10px';
      popup.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.5)';
      popup.innerHTML = `<img src="${img.src}" style="width:100%; height:auto; border-radius:10px;">
                         <p style="color:white; margin-top:10px;">${img.alt}</p>`;
      document.body.appendChild(popup);
  
      popup.addEventListener('click', () => popup.remove());
    });
  });

// Select all project items
const projectItems = document.querySelectorAll('.project-item');

// Function to add "visible" class when element is in view
function handleScroll() {
    projectItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            item.classList.add('visible');
        } else {
            item.classList.remove('visible');
        }
    });
}

// Add event listener to window for scrolling
window.addEventListener('scroll', handleScroll);

// Initial check to reveal elements already in view
handleScroll();

document.addEventListener("DOMContentLoaded", function () {
    const faders = document.querySelectorAll(".fade-in");

    const appearOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add("show");
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.querySelector(".typing-effect");
    const textToType = "Rebecca Elisabeth Mansjhur.";
    let index = 0;

    function typeText() {
        if (index < textToType.length) {
            textElement.textContent += textToType[index];
            index++;
            setTimeout(typeText, 100); // Adjust speed of typing here
        }
    }

    typeText();
});

document.addEventListener("DOMContentLoaded", function () {
    const fadeInContainers = document.querySelectorAll(".fade-in-container");

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function checkVisibility() {
        fadeInContainers.forEach(container => {
            if (isInViewport(container)) {
                container.classList.add("visible");
            }
        });
    }

    // Check visibility on scroll
    window.addEventListener("scroll", checkVisibility);

    // Check visibility on page load
    checkVisibility();
});


