// Job data
const jobs = [
    {"id": 1, "title": "Product Manager", "company": "Stealth Startup", "location": "Remote", "type": "Full-time"},
    {"id": 2, "title": "Software Engineer", "company": "Stealth Startup", "location": "San Francisco", "type": "Full-time"},
    {"id": 3, "title": "Data Scientist", "company": "Stealth Startup", "location": "New York", "type": "Full-time"},
    {"id": 4, "title": "UX Designer", "company": "Stealth Startup", "location": "Remote", "type": "Contract"},
    {"id": 5, "title": "Marketing Lead", "company": "Stealth Startup", "location": "Austin", "type": "Full-time"},
    {"id": 6, "title": "DevOps Engineer", "company": "Stealth Startup", "location": "Remote", "type": "Full-time"}
];

// Global variables
let jobResults, jobSearch, locationFilter, typeFilter, contactForm, mobileMenuToggle, nav;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    jobResults = document.getElementById('job-results');
    jobSearch = document.getElementById('job-search');
    locationFilter = document.getElementById('location-filter');
    typeFilter = document.getElementById('type-filter');
    contactForm = document.getElementById('contact-form');
    mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    nav = document.querySelector('.nav');
    
    // Initialize the app
    if (jobResults) {
        renderJobs(jobs);
    }
    setupEventListeners();
    setupScrollAnimations();
    setupTypewriter();
    setupStatCounters();
});

// Render jobs function
function renderJobs(jobsToRender) {
    if (!jobResults) return;
    
    jobResults.innerHTML = '';
    
    if (jobsToRender.length === 0) {
        const noResults = document.createElement('div');
        noResults.style.cssText = 'text-align: center; color: #6B7280; grid-column: 1 / -1; padding: 2rem;';
        noResults.textContent = 'No jobs found matching your criteria.';
        jobResults.appendChild(noResults);
        return;
    }
    
    jobsToRender.forEach((job, index) => {
        const jobCard = createJobCard(job, index);
        jobResults.appendChild(jobCard);
    });
}

// Create job card element
function createJobCard(job, index) {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const title = document.createElement('h3');
    title.className = 'job-title';
    title.textContent = job.title;
    
    const company = document.createElement('p');
    company.className = 'job-company';
    company.textContent = job.company;
    
    const location = document.createElement('p');
    location.className = 'job-location';
    location.textContent = job.location;
    
    const type = document.createElement('span');
    type.className = 'job-type';
    type.textContent = job.type;
    
    card.appendChild(title);
    card.appendChild(company);
    card.appendChild(location);
    card.appendChild(type);
    
    return card;
}

// Filter jobs function
function filterJobs() {
    if (!jobSearch || !locationFilter || !typeFilter) return;
    
    const searchTerm = jobSearch.value.toLowerCase().trim();
    const selectedLocation = locationFilter.value;
    const selectedType = typeFilter.value;
    
    const filteredJobs = jobs.filter(job => {
        const matchesSearch = !searchTerm || 
                            job.title.toLowerCase().includes(searchTerm) || 
                            job.company.toLowerCase().includes(searchTerm);
        const matchesLocation = !selectedLocation || job.location === selectedLocation;
        const matchesType = !selectedType || job.type === selectedType;
        
        return matchesSearch && matchesLocation && matchesType;
    });
    
    renderJobs(filteredJobs);
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    if (jobSearch) {
        jobSearch.addEventListener('input', filterJobs);
    }
    
    if (locationFilter) {
        locationFilter.addEventListener('change', filterJobs);
    }
    
    if (typeFilter) {
        typeFilter.addEventListener('change', filterJobs);
    }
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Simulate form submission
    alert('Thank you for your message! We\'ll get back to you soon.');
    contactForm.reset();
}

// Toggle mobile menu
function toggleMobileMenu() {
    if (nav) {
        nav.classList.toggle('nav-open');
    }
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Setup typewriter effect
function setupTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    if (!typewriterElement) return;
    
    const text = typewriterElement.getAttribute('data-text');
    if (!text) return;
    
    typewriterElement.textContent = '';
    
    // Start typing animation after a delay
    setTimeout(() => {
        typewriterElement.style.width = '0';
        typewriterElement.style.animation = 'typing 3s steps(30) forwards, blink 1s infinite';
        typewriterElement.textContent = text;
    }, 1000);
}

// Setup stat counters
function setupStatCounters() {
    const statCards = document.querySelectorAll('.stat-card[data-number]');
    
    const animateCounter = (element, target) => {
        const duration = 2000; // 2 seconds
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    };
    
    // Intersection observer for stat counters
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                const targetNumber = parseInt(entry.target.getAttribute('data-number'));
                
                if (statNumber && targetNumber) {
                    animateCounter(statNumber, targetNumber);
                    statObserver.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.5 });
    
    statCards.forEach(card => {
        statObserver.observe(card);
    });
}

// Add ripple effect to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('floating-cta') || e.target.closest('.floating-cta')) {
        const button = e.target.classList.contains('floating-cta') ? e.target : e.target.closest('.floating-cta');
        const ripple = button.querySelector('.btn__ripple');
        
        if (ripple) {
            ripple.style.width = '300px';
            ripple.style.height = '300px';
            
            setTimeout(() => {
                ripple.style.width = '0';
                ripple.style.height = '0';
            }, 600);
        }
    }
});

// Smooth scroll behavior for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = (target) => {
        const targetPosition = target.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;
        
        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        
        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
        
        requestAnimationFrame(animation);
    };
    
    // Override smooth scroll for older browsers
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScrollPolyfill(target);
            }
        });
    });
}
