// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

// Create master timeline for page load
const masterTimeline = gsap.timeline();

// Signature animation timeline
const signatureTimeline = gsap.timeline({
    defaults: { ease: "power2.inOut" }
});

// Animate signature
signatureTimeline
    .set(".signature", { opacity: 1 })
    .fromTo(".signature-path",
        {
            strokeDashoffset: 2000,
            scale: 0.8,
            opacity: 0.5
        },
        {
            strokeDashoffset: 0,
            scale: 1,
            opacity: 1,
            duration: 3,
            ease: "power2.inOut"
        }
    )
    .to(".signature-path", {
        strokeWidth: 4,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
    });

// Hero section animations
const heroTimeline = gsap.timeline();

// Animate hero section
heroTimeline
    .from(".profile-container", {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    })
    .add(signatureTimeline, "-=0.5")
    .from(".animate-text", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "power3.out"
    }, "-=1.5")
    .from(".animate-btn", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out"
    }, "-=0.4");

// Add hero timeline to master timeline
masterTimeline.add(heroTimeline);

// Animate sections on scroll
gsap.utils.toArray('.animate-section').forEach(section => {
    gsap.from(section, {
        y: 60,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Animate job entries
gsap.utils.toArray('.animate-job').forEach((job, index) => {
    gsap.from(job, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        scrollTrigger: {
            trigger: job,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: target,
                offsetY: 70
            },
            ease: 'power3.inOut'
        });
    });
});

// Add floating animation to profile frame
gsap.to('.profile-frame', {
    y: 20,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
});

// Add subtle hover animations to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            scale: 1,
            duration: 0.3,
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