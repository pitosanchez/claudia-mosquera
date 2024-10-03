import './style.css'

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.to('.box', {
    scrollTrigger: '.box', // start animation when ".box" enters the viewport
    x: 500
});


gsap.registerPlugin(ScrollTrigger);