(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const gs = window.gsap;
  if (!gs || !window.ScrollTrigger) return;
  gs.registerPlugin(ScrollTrigger);
  gs.config({ nullTargetWarn: false });
  ScrollTrigger.config({ ignoreMobileResize: true });
  const services = [...document.querySelectorAll('.craft-wheel div')];
  const craft = document.querySelector('.craft');
  const stage = document.querySelector('.craft-stage');
  if (craft && stage) {
    const labels = services.map(el => el.textContent);
    stage.setAttribute('tabindex', '0');
    stage.setAttribute('aria-label', 'Services. Use arrow keys to browse.');
    const readout = document.createElement('p');
    readout.className = 'service-readout';
    stage.append(readout);
    let selected = 0, craftProgress = 0;
    function arrange(position) {
      const current = Math.max(0, Math.min(services.length - 1, position));
      selected = Math.round(current);
      const mobile = innerWidth < 800;
      const radius = Math.min(stage.clientHeight * (mobile ? .30 : .32), mobile ? 235 : 230);
      services.forEach((el, i) => {
        const distance = i - current;
        const absD = Math.abs(distance);
        const angle = distance * (mobile ? .56 : .52);
        const y = Math.sin(angle) * radius;
        const z = (Math.cos(angle) - 1) * radius;
        const scale = Math.max(.58, 1 - absD * .12);
        el.style.transform = 'translate3d(0,' + y + 'px,' + z + 'px) rotateX(' + (-angle * 38) + 'deg) scale(' + scale + ')';
        el.style.opacity = String(Math.max(.12, 1 - absD * .34));
        el.style.color = absD < .45 ? '#ff6b5a' : absD < 1.35 ? '#ff3b30' : '#8e221b';
        el.style.visibility = absD > 2.25 ? 'hidden' : 'visible';
        el.style.translate = 'none';
        el.classList.toggle('selected', i === selected);
        el.setAttribute('aria-hidden', String(i !== selected));
      });
      readout.textContent = ['I','II','III','IV','V','VI','VII'][selected] + ' / VII — ' + labels[selected];
    }
    arrange(0);
    if (reduced.matches) {
      services.forEach(el => {
        el.style.transform = 'none';
        el.style.translate = 'none';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        el.setAttribute('aria-hidden', 'false');
      });
      readout.textContent = 'Seven capabilities';
    }
    stage.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); arrange(selected + 1); }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); arrange(selected - 1); }
    });
    if (!reduced.matches) {
      const manifesto = craft.querySelector('.manifesto');
      const metrics = craft.querySelector('.metrics');
      const craftPreHeight = () => manifesto
        ? manifesto.offsetTop + manifesto.offsetHeight + parseFloat(getComputedStyle(manifesto).marginBottom || '0')
        : stage.offsetTop;
      const craftSpan = () => metrics ? parseFloat(getComputedStyle(metrics).marginTop || '0') : innerHeight * .95;
      ScrollTrigger.create({
        trigger: craft,
        start: () => innerWidth < 800
          ? 'top+=' + Math.max(0, craftPreHeight() - Math.round(innerHeight * .12)) + ' top'
          : 'top top',
        end: () => innerWidth < 800
          ? 'top+=' + Math.max(400, craftPreHeight() + craftSpan()) + ' top'
          : 'bottom bottom',
        invalidateOnRefresh: true,
        onUpdate: self => { craftProgress = self.progress; arrange(craftProgress * (services.length - 1)); }
      });
      addEventListener('resize', () => arrange(craftProgress * (services.length - 1)));
    }
  }
  const cards = [...document.querySelectorAll('.work-card')];
  const work = document.querySelector('.work');
  const workStage = document.querySelector('.work-stage');
  if (work && workStage && cards.length) {
    workStage.querySelectorAll('[data-work-step]').forEach(button => button.addEventListener('click', () => { const current = Number(document.querySelector('.work-count').dataset.index); window.setWorkActive((current + Number(button.dataset.workStep) + cards.length) % cards.length); }));
    cards.forEach((card, i) => {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-haspopup', 'dialog');
      card.addEventListener('focus', () => window.setWorkActive(i));
    });

    const projects = [
      { desc: 'Travel that feels exciting before departure.', brief: 'Make tours easy to explore and enquiries easy to start.', build: 'Destination pages, trip details, and direct WhatsApp planning.', image: 'assets/clients/vandana-mobile.jpg', url: 'https://shreevandanatoursandtravels.com' },
      { desc: 'One product. A clear path to purchase.', brief: 'Explain a detailed wellness formula without losing the buyer.', build: 'Product storytelling, ingredient detail, and a focused storefront.', image: 'assets/clients/inovexa-mobile.jpg', url: 'https://inovexaaa.vercel.app' },
      { desc: 'Demand generation with a sharper point of view.', brief: 'Make the offer clear and the strategy call worth taking.', build: 'Service paths, case-study routes, and a direct call to action.', image: 'assets/clients/twodots-mobile.jpg', url: 'https://stagging.twodotsmedia.in' },
      { desc: 'Engineering expertise, clearly presented.', brief: 'Help clients navigate BIM and engineering services.', build: 'Division gateway, service paths, projects, and direct enquiries.', image: 'assets/clients/vadsoft-mobile.jpg', url: 'https://vadsoft.tech' },
      { desc: 'A clear digital home for design and build.', brief: 'Make the construction offer easy to understand.', build: 'Project-led pages, service routes, and a direct enquiry path.', image: 'assets/clients/build-mobile.jpg', url: 'https://build.vadsoft.tech' },
      { desc: 'The studio’s space for useful experiments.', brief: 'Explore repeatable ways to make creative production faster.', build: 'AI video workflows, dynamic PDF production, media editing, and automation prototypes.', image: '', url: '' }
    ];
    const dialog = document.createElement('dialog');
    dialog.className = 'work-dialog';
    dialog.innerHTML = '<button type="button" class="work-dialog-close" aria-label="Close project details">Close</button><div class="work-dialog-layout"><div class="work-dialog-visual"><picture><source media="(max-width: 700px)"><img class="work-dialog-image" alt="" loading="eager"></picture></div><div class="work-dialog-copy"><div class="work-dialog-kicker"><span class="work-dialog-index"></span><p class="work-dialog-type"></p></div><h2 id="work-dialog-title"></h2><p class="work-dialog-description" id="work-dialog-description"></p><div class="work-dialog-facts"><div><small>The brief</small><p class="work-dialog-brief"></p></div><div><small>The build</small><p class="work-dialog-build"></p></div></div></div></div><a class="work-dialog-link" target="_blank" rel="noopener noreferrer">Visit live site ↗</a>';
    dialog.setAttribute('aria-labelledby', 'work-dialog-title');
    dialog.setAttribute('aria-describedby', 'work-dialog-description');
    work.append(dialog);
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    async function openProject(index) {
      const p = projects[index];
      dialog.querySelector('h2').textContent = cards[index].querySelector('footer strong').textContent;
      dialog.querySelector('.work-dialog-type').textContent = cards[index].querySelector('footer span:last-child').textContent;
      dialog.querySelector('.work-dialog-description').textContent = p.desc;
      dialog.querySelector('.work-dialog-brief').textContent = p.brief;
      dialog.querySelector('.work-dialog-build').textContent = p.build;
      const image = dialog.querySelector('.work-dialog-image');
      const mobileSource = dialog.querySelector('.work-dialog-visual source');
      dialog.classList.toggle('no-preview', !p.image);
      dialog.querySelector('.work-dialog-index').textContent = ['I','II','III','IV','V','VI'][index] + ' / VI';
      if (p.image) { mobileSource.srcset = p.image.replace('-mobile.jpg', '-hero.jpg'); image.src = p.image; image.alt = cards[index].querySelector('footer strong').textContent + ' website preview'; image.hidden = false; }
      else { mobileSource.removeAttribute('srcset'); image.removeAttribute('src'); image.hidden = true; }
      const link = dialog.querySelector('.work-dialog-link');
      if (p.url) { link.href = p.url; link.style.display = 'inline-block'; } else { link.removeAttribute('href'); link.style.display = 'none'; }
      if (p.image) await image.decode().catch(() => {});
      dialog.showModal();
    }
    workStage.addEventListener('click', event => {
      const card = event.target.closest('.work-card');
      if (card) { window.setWorkActive(cards.indexOf(card)); openProject(cards.indexOf(card)); }
    }, true);
    workStage.addEventListener('keydown', event => {
      if ((event.key === 'Enter' || event.key === ' ') && document.activeElement.matches('.work-card')) {
        event.preventDefault(); openProject(cards.indexOf(document.activeElement));
      }
    });
    if (!reduced.matches) ScrollTrigger.create({
      trigger: work, start: 'top top', end: 'bottom bottom', invalidateOnRefresh: true,
      onUpdate: self => window.setWorkActive(Math.round(self.progress * (cards.length - 1)))
    });
  }
  const process = document.querySelector('.process');
  const track = document.querySelector('.process-track');
  if (process && track && !reduced.matches) {
    const indicator = process.querySelector('.process-progress');
    let tween, lastWidth = innerWidth;
    const update = () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
      gs.set(track, {x: 0});
      const extra = innerWidth < 800 ? 0 : 64;
      const distance = Math.max(0, track.scrollWidth - process.clientWidth + extra);
      if (!distance) return;
      tween = gs.to(track, {
        x: -distance, ease: 'none',
        scrollTrigger: {trigger: process, start: 'top top', end: () => '+=' + distance,
          pin: true, scrub: .6, invalidateOnRefresh: true,
          onUpdate: self => { indicator.style.setProperty('--progress', String(self.progress)); indicator.setAttribute('aria-valuenow', String(Math.round(self.progress * 100))); }}
      });
      ScrollTrigger.refresh();
    };
    addEventListener('resize', () => {
      if (innerWidth < 800 && innerWidth === lastWidth) return;
      lastWidth = innerWidth;
      update();
    });
    document.fonts.ready.then(update);
    update();
  }
})();

