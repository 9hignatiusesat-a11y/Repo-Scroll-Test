// v3 - scroll-driven multi-scene cinematic
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
  // Initialize backgrounds: create video or set image
  document.querySelectorAll('.scene').forEach(scene => {
    const bg = scene.querySelector('.scene-bg');
    const type = bg.dataset.type;
    const src = bg.dataset.src;
    if(type === 'video') {
      const v = document.createElement('video');
      v.src = src;
      v.muted = true;
      v.playsInline = true;
      v.preload = 'auto';
      v.loop = false;
      v.style.width = '100%';
      v.style.height = '100%';
      v.style.objectFit = 'cover';
      if(bg.dataset.poster) {
        // create poster overlay for immediate visual
        bg.style.backgroundImage = `url(${bg.dataset.poster})`;
      }
      bg.appendChild(v);
      bg._video = v;
      try { v.pause(); } catch(e){}
      v.addEventListener('loadedmetadata', ()=>{ v.currentTime = 0; });
    } else {
      // image background
      bg.style.backgroundImage = `url(${src})`;
    }
  });

  // For each scene with a video, create a ScrollTrigger that controls playback (scrub)
  document.querySelectorAll('.scene').forEach(scene => {
    const bg = scene.querySelector('.scene-bg');
    if(!bg) return;
    const v = bg._video;
    if(!v) return; // image scenes skipped
    // Create ScrollTrigger with scrub to control video time
    ScrollTrigger.create({
      trigger: scene,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.4,
      onUpdate: self => {
        const prog = self.progress; // 0..1
        const dur = Math.max(0.1, v.duration || 1);
        const targetTime = prog * dur;
        try { v.currentTime = targetTime; } catch(e) {}
        const translate = (prog - 0.5) * 40; // -20..20
        bg.style.transform = `translateY(${translate}px) scale(${1 + prog*0.03})`;
        bg.style.opacity = 0.95 - Math.abs(prog - 0.5) * 0.8;
      },
      onEnter: () => { /* ensure metadata loaded */ },
    });
  });

  // Smooth reveal of headlines
  gsap.utils.toArray('.scene-inner').forEach((el) => {
    gsap.from(el, {
      y: 40, opacity: 0, duration: 1, ease:'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%' }
    });
  });

  // Preload SVGs
  ['assets/city.svg','assets/character.svg','assets/logo.svg'].forEach(s=>{ const i=new Image(); i.src=s; });
});
