import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initRevealAnimations() {
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });
}

export function initCounters() {
  gsap.utils.toArray('[data-counter]').forEach((el) => {
    const target = el.getAttribute('data-counter');
    const num = parseInt(target.replace(/\D/g, ''), 10);
    const prefix = target.match(/^\D*/)?.[0] || '';
    const suffix = target.match(/\D*$/)?.[0] || '';
    const obj = { val: 0 };
    gsap.to(obj, {
      val: num,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onUpdate: () => {
        el.textContent = prefix + Math.round(obj.val) + suffix;
      },
    });
  });
}

export function initParallax() {
  gsap.utils.toArray('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
    gsap.to(el, {
      y: () => -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

export function initAllAnimations() {
  initRevealAnimations();
  initCounters();
  initParallax();
}
