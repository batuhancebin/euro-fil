import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useGsap() {
  onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)
  })

  // Fade up — elemanları aşağıdan yukarı çıkartır
  function fadeUp(targets: string | Element | Element[], options = {}) {
    return gsap.from(targets, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.1,
      ...options,
    })
  }

  // Scroll tetiklemeli fade up
  function scrollFadeUp(targets: string | Element | Element[], trigger?: Element | string) {
    return gsap.from(targets, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: trigger ?? (Array.isArray(targets) ? targets[0] : targets),
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  }

  // Soldan sağa giriş
  function slideInLeft(targets: string | Element | Element[], options = {}) {
    return gsap.from(targets, {
      x: -60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      ...options,
    })
  }

  // Sağdan sola giriş
  function slideInRight(targets: string | Element | Element[], options = {}) {
    return gsap.from(targets, {
      x: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      ...options,
    })
  }

  // Scale ile belirme
  function scaleIn(targets: string | Element | Element[], options = {}) {
    return gsap.from(targets, {
      scale: 0.85,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.4)',
      stagger: 0.08,
      ...options,
    })
  }

  return { gsap, ScrollTrigger, fadeUp, scrollFadeUp, slideInLeft, slideInRight, scaleIn }
}
