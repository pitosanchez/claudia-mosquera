// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

// Create master timeline for page load
const masterTimeline = gsap.timeline();

// Function to get animation values based on screen size
const getResponsiveValues = () => {
    const width = window.innerWidth;
    return {
        signature: {
            duration: width < 576 ? 2 : 3,
            scale: width < 576 ? 0.9 : 0.8,
            strokeWidth: width < 576 ? 3 : 4
        },
        profile: {
            scale: width < 576 ? 0.9 : 0.8,
            duration: width < 576 ? 1 : 1.2
        },
        text: {
            y: width < 576 ? 20 : 30,
            duration: width < 576 ? 0.6 : 0.8
        },
        button: {
            y: width < 576 ? 15 : 20,
            duration: width < 576 ? 0.4 : 0.6
        }
    };
};

// Signature animation timeline
const signatureTimeline = gsap.timeline({
    defaults: { ease: "power2.inOut" }
});

// Animate signature
const animateSignature = () => {
    const values = getResponsiveValues();
    signatureTimeline
        .set(".signature", { opacity: 1 })
        .fromTo(".signature-path",
            {
                strokeDashoffset: 2000,
                scale: values.signature.scale,
                opacity: 0.5
            },
            {
                strokeDashoffset: 0,
                scale: 1,
                opacity: 1,
                duration: values.signature.duration,
                ease: "power2.inOut"
            }
        )
        .to(".signature-path", {
            strokeWidth: values.signature.strokeWidth,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
        });
};

// Hero section animations
const heroTimeline = gsap.timeline();

// Animate hero section
const animateHero = () => {
    const values = getResponsiveValues();
    heroTimeline
        .from(".profile-container", {
            scale: values.profile.scale,
            opacity: 0,
            duration: values.profile.duration,
            ease: "power3.out"
        })
        .add(signatureTimeline, "-=0.5")
        .from(".animate-text", {
            y: values.text.y,
            opacity: 0,
            duration: values.text.duration,
            stagger: 0.3,
            ease: "power3.out"
        }, "-=1.5")
        .from(".animate-btn", {
            y: values.button.y,
            opacity: 0,
            duration: values.button.duration,
            stagger: 0.15,
            ease: "power3.out"
        }, "-=0.4");
};

// Initialize animations
const initAnimations = () => {
    // Clear existing timelines
    masterTimeline.clear();
    signatureTimeline.clear();
    heroTimeline.clear();

    // Create new animations
    animateSignature();
    animateHero();
    masterTimeline.add(heroTimeline);

    // Set initial states for sections
    gsap.set('.animate-section', {
        opacity: 0,
        y: 50
    });

    gsap.set('.animate-job', {
        opacity: 0,
        x: -30
    });

    // Animate sections on scroll
    gsap.utils.toArray('.animate-section').forEach(section => {
        gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse",
                markers: false
            }
        });
    });

    // Animate job entries
    gsap.utils.toArray('.animate-job').forEach((job, index) => {
        gsap.to(job, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: job,
                start: "top 85%",
                toggleActions: "play none none reverse",
                markers: false
            }
        });
    });
};

// Initialize animations on load
initAnimations();

// Reinitialize animations on resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initAnimations, 250);
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        gsap.to(window, {
            duration: window.innerWidth < 576 ? 0.8 : 1,
            scrollTo: {
                y: target,
                offsetY: window.innerWidth < 576 ? 50 : 70
            },
            ease: 'power3.inOut'
        });
    });
});

// Add floating animation to profile frame
gsap.to('.profile-frame', {
    y: window.innerWidth < 576 ? 15 : 20,
    duration: window.innerWidth < 576 ? 1.8 : 2,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
});

// Add subtle hover animations to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
            scale: 1.05,
            duration: window.innerWidth < 576 ? 0.2 : 0.3,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            scale: 1,
            duration: window.innerWidth < 576 ? 0.2 : 0.3,
            ease: 'power2.out'
        });
    });
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

gsap.to(progressBar, {
    scaleX: 1,
    transformOrigin: 'left',
    ease: 'none',
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
    }
}); 