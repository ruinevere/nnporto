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

document.addEventListener("DOMContentLoaded", function () {
    const projectsSection = document.querySelector("#projects");
    let angle = 0;

    function animateBackground() {
        // Convert angle to radians
        const x = Math.sin(angle) * 50 + 50; // X-axis oscillates between 0% and 100%
        const y = Math.cos(angle) * 50 + 50; // Y-axis oscillates between 0% and 100%

        // Update background position
        projectsSection.style.backgroundPosition = `${x}% ${y}%`;

        // Increment angle for the next frame
        angle += 0.001; // Adjust this value for speed (smaller = slower)

        // Keep looping the animation
        requestAnimationFrame(animateBackground);
    }

    animateBackground();
});

document.addEventListener("DOMContentLoaded", () => {
    const skillFills = document.querySelectorAll(".skill-fill");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const percent = entry.target.getAttribute("data-percent");
            entry.target.style.width = percent + "%";
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );
  
    skillFills.forEach((fill) => observer.observe(fill));
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const technicalIcon = document.querySelector(".technical-icon");
    const softIcon = document.querySelector(".soft-icon");
  
    // Add hover effect to icons
    technicalIcon.addEventListener("mouseenter", () => {
      technicalIcon.style.transform = "scale(1.2)";
    });
  
    technicalIcon.addEventListener("mouseleave", () => {
      technicalIcon.style.transform = "scale(1)";
    });
  
    softIcon.addEventListener("mouseenter", () => {
      softIcon.style.transform = "scale(1.2)";
    });
  
    softIcon.addEventListener("mouseleave", () => {
      softIcon.style.transform = "scale(1)";
    });
  
    // Fade-in icons on scroll
    const fadeInIcons = () => {
      const technicalPos = technicalIcon.getBoundingClientRect().top;
      const softPos = softIcon.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
  
      if (technicalPos < windowHeight) {
        technicalIcon.style.opacity = "1";
      }
      if (softPos < windowHeight) {
        softIcon.style.opacity = "1";
      }
    };
  
    window.addEventListener("scroll", fadeInIcons);
  
    // Initial state
    technicalIcon.style.opacity = "0";
    softIcon.style.opacity = "0";
  });

  document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("skills-background");
    const ctx = canvas.getContext("2d");
  
    canvas.width = window.innerWidth;
    canvas.height = document.getElementById("skills").offsetHeight;
  
    const particles = [];
    const particleCount = 100;
    const maxDistance = 150;
  
    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = Math.random() * 2 - 1; // Random velocity X
        this.vy = Math.random() * 2 - 1; // Random velocity Y
        this.size = Math.random() * 3 + 1;
      }
  
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "#ff80ab";
        ctx.fill();
      }
  
      update() {
        this.x += this.vx;
        this.y += this.vy;
  
        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
    }
  
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  
    // Draw lines between nearby particles
    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
  
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 128, 171, ${1 - distance / maxDistance})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }
  
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
  
      drawLines();
  
      requestAnimationFrame(animate);
    }
  
    animate();
  
    // Adjust canvas size on window resize
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = document.getElementById("skills").offsetHeight;
    });
  });
  



 