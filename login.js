document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const errorMessage = document.getElementById('errorMessage');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    const CORRECT_PASSWORD = 'Aventis123';
    
    // Music control state
    let isMusicPlaying = false;
    let userInteracted = false;
    
    // Initialize music control
    function initMusic() {
        // Set initial volume
        backgroundMusic.volume = 0.3;
        
        // Try to play music on first user interaction
        if (!userInteracted) {
            userInteracted = true;
            playMusic();
        }
    }
    
    // Play music function
    function playMusic() {
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
    
    // Pause music function
    function pauseMusic() {
        backgroundMusic.pause();
        isMusicPlaying = false;
        musicToggle.classList.remove('playing');
        musicToggle.classList.add('muted');
        musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
    
    // Toggle music on button click
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
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle icon
        const icon = this.querySelector('i');
        if (type === 'text') {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
            this.classList.add('active');
        } else {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
            this.classList.remove('active');
        }
    });
    
    // Handle form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const enteredPassword = passwordInput.value;
        
        if (enteredPassword === CORRECT_PASSWORD) {
            // Store login status
            sessionStorage.setItem('isLoggedIn', 'true');
            
            // Success animation
            const btnLogin = this.querySelector('.btn-login');
            btnLogin.innerHTML = '<i class="fas fa-check-circle"></i> Berhasil!';
            btnLogin.style.background = 'linear-gradient(135deg, #27AE60 0%, #229954 100%)';
            
            // Fade out music before redirect
            let volume = backgroundMusic.volume;
            const fadeOut = setInterval(() => {
                if (volume > 0.05) {
                    volume -= 0.05;
                    backgroundMusic.volume = volume;
                } else {
                    clearInterval(fadeOut);
                    backgroundMusic.pause();
                }
            }, 50);
            
            // Redirect to main page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 800);
        } else {
            // Show error message
            errorMessage.classList.add('show');
            passwordInput.value = '';
            passwordInput.focus();
            
            // Shake animation for input
            passwordInput.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                passwordInput.style.animation = '';
            }, 500);
            
            // Hide error message after 3 seconds
            setTimeout(() => {
                errorMessage.classList.remove('show');
            }, 3000);
        }
    });
    
    // Hide error message when user starts typing
    passwordInput.addEventListener('input', function() {
        if (errorMessage.classList.contains('show')) {
            errorMessage.classList.remove('show');
        }
    });
    
    // Prevent zoom on input focus for iOS devices
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
            viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        }
    }
    
    // Console messages
    console.log('🔐 Login Page - PT Kalventis Sinergi Farma');
    console.log('💉 Portofolio Vaccines');
    console.log('✨ Secure access for medical professionals only');
    console.log('🎵 Background music: Swan Lake');
});