// Background Music Control
document.addEventListener('DOMContentLoaded', function() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    let isMusicPlaying = false;
    let userInteracted = false;
    
    // Initialize music control
    function initMusic() {
        // Set initial volume
        if (backgroundMusic) {
            backgroundMusic.volume = 0.3;
        }
        
        // Try to play music on first user interaction
        if (!userInteracted) {
            userInteracted = true;
            playMusic();
        }
    }
    
    // Play music function
    function playMusic() {
        if (backgroundMusic) {
            backgroundMusic.play()
                .then(() => {
                    isMusicPlaying = true;
                    musicToggle.classList.add('playing');
                    musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                })
                .catch(error => {
                    console.log('Autoplay prevented:', error);
                    isMusicPlaying = false;
                    musicToggle.classList.remove('playing');
                    musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
                });
        }
    }
    
    // Pause music function
    function pauseMusic() {
        if (backgroundMusic) {
            backgroundMusic.pause();
            isMusicPlaying = false;
            musicToggle.classList.remove('playing');
            musicToggle.classList.add('muted');
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    }
    
    // Toggle music on button click
    if (musicToggle) {
        musicToggle.addEventListener('click', function() {
            if (!userInteracted) {
                userInteracted = true;
            }
            
            if (isMusicPlaying) {
                pauseMusic();
            } else {
                playMusic();
                musicToggle.classList.remove('muted');
            }
        });
    }
    
    // Try to play music on any user interaction
    document.addEventListener('click', function() {
        if (!userInteracted) {
            initMusic();
        }
    }, { once: true });
    
    // Also try on keypress
    document.addEventListener('keypress', function() {
        if (!userInteracted) {
            initMusic();
        }
    }, { once: true });

    // Check authentication
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    
    if (!isLoggedIn || isLoggedIn !== 'true') {
        // Redirect to login page if not logged in
        window.location.href = 'login.html';
        return;
    }
    
    console.log('PT Kalventis Sinergi Farma - Vaccine Portfolio Loaded!');
    console.log('🎵 Background music: Vivaldi');
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Smooth scroll for navigation
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu if open
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mainNav.classList.contains('active') && 
            !mainNav.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            mainNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
    
    // Add scroll effect to header
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.padding = '1rem 9%';
            header.style.boxShadow = '0 6px 25px rgba(255, 140, 66, 0.4)';
        } else {
            header.style.padding = '1.5rem 9%';
            header.style.boxShadow = '0 4px 20px rgba(255, 140, 66, 0.3)';
        }
        
        // Update active nav link based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = currentScroll + 200;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        // Special handling for footer/contact section
        const footer = document.querySelector('footer');
        if (footer) {
            const footerTop = footer.offsetTop;
            const footerHeight = footer.offsetHeight;
            
            if (scrollPosition >= footerTop && scrollPosition < footerTop + footerHeight) {
                currentSection = 'contact';
            }
        }
        
        // Update nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href').substring(1);
            
            if (linkHref === currentSection) {
                link.classList.add('active');
            }
        });
        
        lastScroll = currentScroll;
    });
    
    // Animate product cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe vademecum card
    const vademecumCard = document.querySelector('.vademecum-card');
    if (vademecumCard) {
        vademecumCard.style.opacity = '0';
        vademecumCard.style.transform = 'translateY(50px)';
        vademecumCard.style.transition = 'all 0.8s ease';
        observer.observe(vademecumCard);
    }
    
    // Observe hub cards
    const hubCards = document.querySelectorAll('.hub-card');
    hubCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Read More functionality
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.previousElementSibling;
            content.classList.toggle('active');
            
            if (content.classList.contains('active')) {
                this.textContent = 'Tutup';
            } else {
                this.textContent = 'Baca Selengkapnya';
            }
        });
    });
    
    // Document Categories Toggle
    const docCategoryCards = document.querySelectorAll('.doc-category-card');
    
    docCategoryCards.forEach(card => {
        const header = card.querySelector('.doc-category-header');
        
        header.addEventListener('click', () => {
            // Close other cards
            docCategoryCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active');
                }
            });
            
            // Toggle current card
            card.classList.toggle('active');
        });
    });
    
    // Vaccine Hub Toggle
    const hubCardElements = document.querySelectorAll('.hub-card');
    
    hubCardElements.forEach(card => {
        const header = card.querySelector('.hub-header');
        
        header.addEventListener('click', () => {
            // Close other hub cards
            hubCardElements.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active');
                }
            });
            
            // Toggle current hub card
            card.classList.toggle('active');
        });
    });
    
    // Travel Subsection Dropdown Toggle (NEW)
    const subsectionDropdowns = document.querySelectorAll('.travel-subsection-dropdown');
    
    subsectionDropdowns.forEach(dropdown => {
        const header = dropdown.querySelector('.subsection-dropdown-header');
        
        header.addEventListener('click', () => {
            // Toggle current dropdown
            dropdown.classList.toggle('active');
            
            // Add smooth animation
            const content = dropdown.querySelector('.subsection-dropdown-content');
            if (dropdown.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });
    
    // Add click animation to buttons
    const buttons = document.querySelectorAll('.btn-buy, .contact-btn, .read-more-btn, .hub-btn, .inaproc-link');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Scale animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Lazy load images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Console messages
    console.log('💉 Portofolio Vaccines PT Kalventis Sinergi Farma');
    console.log('📞 Contact: +62 812 1333 066');
    console.log('📧 Email: vaccineshelppprotectus@gmail.com');
    console.log('🌐 Website: www.kalventis.co.id');
    console.log('✨ Responsive design optimized for all devices!');
    console.log('🔐 Authenticated access for medical professionals');
    console.log('🏥 Vaccine Hub section added with comprehensive information!');
    console.log('🎯 New dropdown menus for Influenza, Haji Umroh, Study Abroad, Travel, and Army & Police!');
});

// Add ripple effect CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);