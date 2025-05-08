// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Create master timeline for page load
const masterTimeline = gsap.timeline();

// Get responsive values based on screen size
function getResponsiveValues() {
    const isMobile = window.innerWidth < 576;
    return {
        duration: isMobile ? 0.8 : 1.2,
        scale: isMobile ? 0.9 : 1,
        y: isMobile ? 20 : 30,
        stagger: isMobile ? 0.1 : 0.15,
    };
}

// Animate hero section
function animateHero() {
    const values = getResponsiveValues();

    const heroTimeline = gsap.timeline();

    heroTimeline
        .from(".profile-container", {
            duration: values.duration,
            scale: 0.8,
            opacity: 0,
            ease: "power3.out",
        })
        .from(".overlay", {
            duration: values.duration,
            y: values.y,
            opacity: 0,
            ease: "power3.out",
        }, "-=0.6")
        .from(".animate-text", {
            duration: values.duration * 0.8,
            y: values.y,
            opacity: 0,
            stagger: values.stagger,
            ease: "power3.out",
        }, "-=0.4")
        .from(".animate-btn", {
            duration: values.duration * 0.8,
            y: values.y,
            opacity: 0,
            stagger: values.stagger,
            ease: "power3.out",
        }, "-=0.4");

    return heroTimeline;
}

// Initialize animations
function initAnimations() {
    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Add hero animation to master timeline
    masterTimeline.add(animateHero());

    // Animate sections on scroll
    gsap.utils.toArray(".animate-section").forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power3.out"
        });
    });

    // Animate job entries on scroll
    gsap.utils.toArray(".animate-job").forEach(job => {
        gsap.from(job, {
            scrollTrigger: {
                trigger: job,
                start: "top bottom-=50",
                toggleActions: "play none none reverse"
            },
            duration: 1.5,
            x: -30,
            opacity: 0,
            ease: "power3.out"
        });
    });

    // Add scroll progress indicator
    gsap.to(".scroll-progress", {
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: true
        },
        scaleX: 1,
        transformOrigin: "left",
        ease: "none"
    });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    initAnimations();

    // Add smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 70
                    },
                    ease: "power3.inOut"
                });
            }
        });
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
        button.addEventListener("mouseenter", () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1.05,
                ease: "power2.out"
            });
        });

        button.addEventListener("mouseleave", () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1,
                ease: "power2.out"
            });
        });
    });
});

// Reinitialize animations on resize
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initAnimations();
    }, 250);
});

// Add floating animation to profile frame
gsap.to('.profile-frame', {
    y: window.innerWidth < 576 ? 15 : 20,
    duration: window.innerWidth < 576 ? 1.8 : 2,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
}); 