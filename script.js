document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form validation for the contact form with real-time feedback
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = form.querySelector('button');

    const validateInput = (input) => {
        if (input.value.trim() === '') {
            input.classList.add('invalid');
        } else {
            input.classList.remove('invalid');
        }
    };

    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', () => validateInput(input));
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        [nameInput, emailInput, messageInput].forEach(input => validateInput(input));
        if (![nameInput, emailInput, messageInput].some(input => input.classList.contains('invalid'))) {
            alert('Thank you for your message!');
            form.reset();
        } else {
            alert('Please fill in all fields correctly');
        }
    });

    // Image slider for the hero section with controls
    const heroImages = [
        'images/hero-construction.jpg',
        'images/hero-construction2.jpg',
        'images/hero-construction3.jpg'
    ];
    let currentImageIndex = 0;
    const heroSection = document.querySelector('.hero');
    const sliderControls = document.createElement('div');
    sliderControls.classList.add('slider-controls');

    const createSliderControl = (index) => {
        const control = document.createElement('span');
        control.classList.add('slider-control');
        if (index === currentImageIndex) {
            control.classList.add('active');
        }
        control.addEventListener('click', () => {
            currentImageIndex = index;
            updateHeroImage();
        });
        sliderControls.appendChild(control);
    };

    const updateHeroImage = () => {
        heroSection.style.backgroundImage = `url(${heroImages[currentImageIndex]})`;
        document.querySelectorAll('.slider-control').forEach((control, index) => {
            control.classList.toggle('active', index === currentImageIndex);
        });
    };

    if (heroSection) {
        heroSection.appendChild(sliderControls);
        heroImages.forEach((_, index) => createSliderControl(index));
        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;
            updateHeroImage();
        }, 3000);
    }

    // Dynamic message display
    const messageButton = document.getElementById('message-btn');
    const dynamicMessage = document.getElementById('dynamic-message');
    if (messageButton && dynamicMessage) {
        messageButton.addEventListener('click', () => {
            dynamicMessage.style.display = 'block';
            dynamicMessage.textContent = 'Thank you for your interest in our services!';
        });
    }

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Trigger animation on load

    // Lazy load images
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            if (img.getBoundingClientRect().top < window.innerHeight && !img.src) {
                img.src = img.getAttribute('data-src');
            }
        });
    };

    window.addEventListener('scroll', lazyLoadImages);
    lazyLoadImages(); // Trigger lazy loading on load
});
