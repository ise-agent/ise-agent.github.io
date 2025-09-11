// ISEA Technical Report JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to current section in navigation
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Add animation on scroll for feature cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and pipeline steps
    document.querySelectorAll('.feature-card, .pipeline-step').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Custom tooltip handling for proper line breaks
    document.querySelectorAll('.tool-item[data-tooltip]').forEach(item => {
        let tooltip;
        
        item.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            
            // Create tooltip element
            tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.innerHTML = tooltipText.replace(/\\n/g, '<br>');
            
            // Style the tooltip
            Object.assign(tooltip.style, {
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#2c3e50',
                color: 'white',
                padding: '0.8rem 1rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                lineHeight: '1.4',
                maxWidth: '350px',
                width: 'max-content',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: '1000',
                textAlign: 'left',
                pointerEvents: 'none'
            });
            
            // Add arrow
            const arrow = document.createElement('div');
            Object.assign(arrow.style, {
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                border: '6px solid transparent',
                borderTopColor: '#2c3e50'
            });
            tooltip.appendChild(arrow);
            
            // Add to DOM
            this.style.position = 'relative';
            this.appendChild(tooltip);
            
            // Animate in
            setTimeout(() => {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateX(-50%) translateY(0)';
            }, 10);
        });
        
        item.addEventListener('mouseleave', function() {
            if (tooltip) {
                tooltip.remove();
                tooltip = null;
            }
        });
    });
});