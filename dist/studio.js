(() => {
  const studio = document.querySelector('.studio');
  if (!studio) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const letters = n => ['I','II','III'][n];
  const wrap = (n, length) => (n % length + length) % length;
  const oldArc = studio.querySelector('.role-arc');
  const disciplines = [...oldArc.children].map((card,i) => [
    ['design-engineering','seo-distribution','systems-pipelines'][i],card.querySelector('h3').textContent,card.querySelector('p').textContent
  ]);
  function createGallery(items, mode, label, initial) {
    const gallery = document.createElement('div');
    gallery.className = 'ot-gallery ot-' + mode;
    gallery.setAttribute('role','region');
    gallery.setAttribute('aria-roledescription','carousel');
    gallery.setAttribute('aria-label',label);
    gallery.innerHTML = '<div class="ot-stage" tabindex="0"></div><div class="ot-controls"><button type="button" data-step="-1" aria-label="Previous slide">‹</button><span aria-live="polite" aria-atomic="true"></span><button type="button" data-step="1" aria-label="Next slide">›</button></div>';
    const stage = gallery.querySelector('.ot-stage');
    stage.setAttribute('aria-label',label + '. Drag or use left and right arrow keys.');
    const status = gallery.querySelector('.ot-controls span');
    const n = items.length;
    const cards = items.map(([file,title,detail],i) => {
      const figure = document.createElement('figure');
      figure.className = 'ot-slide';
      figure.setAttribute('role','group');
      figure.setAttribute('aria-roledescription','slide');
      figure.setAttribute('aria-label', (i+1) + ' of ' + n + ', ' + title);
      figure.innerHTML = '<img loading="lazy" decoding="async" draggable="false" width="576" height="720"><figcaption><strong></strong><small></small></figcaption>';
      const img = figure.querySelector('img');
      img.src = 'assets/studio/' + file + '.svg';
      img.alt = title + ' illustration';
      figure.querySelector('strong').textContent = title;
      figure.querySelector('small').textContent = detail;
      stage.append(figure);
      return figure;
    });
    let position=initial, target=initial, frame=0, lastTime=0, selected=-1, drag=null;
    let stageWidth=0, cardWidth=0;
    function draw() {
      const centre = wrap(Math.round(position),n);
      if (selected !== centre) {
        selected = centre;
        status.textContent = letters(centre) + ' / ' + letters(n-1) + ' · ' + items[centre][1];
        cards.forEach((card,i)=>card.setAttribute('aria-hidden',String(i!==centre)));
      }
      const step = mode === 'arc' ? .88 : Math.PI*2/n;
      const radius = mode === 'arc' ? cardWidth*1.34 : cardWidth*.87;
      cards.forEach((card,i) => {
        const offset = wrap(i-position+n/2,n)-n/2;
        const angle = offset*step;
        const depth = Math.cos(angle);
        const x = Math.sin(angle)*radius;
        const z = (depth-1)*cardWidth*.58;
        const y = mode==='arc' ? (1-depth)*35 : 0;
        card.style.transform = 'translate(-50%,-50%) translate3d('+x+'px,'+y+'px,'+z+'px) rotateY('+(-angle*180/Math.PI*.56)+'deg)';
        card.style.zIndex = String(Math.round((depth+1)*100));
        card.style.filter = 'brightness(' + (.57+.43*(depth+1)/2) + ')';
        // The arc has open ends. Hide the wrapped slide while it crosses the back.
        card.style.opacity = mode==='arc' ? String(Math.min(1,(n/2-Math.abs(offset))*3)) : '1';
        card.classList.toggle('ot-centre',i===centre);
      });
    }
    function measure() {
      stageWidth = stage.clientWidth;
      cardWidth = cards[0].offsetWidth;
      draw();
    }
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    function advance(now) {
      frame=0;
      const dt=Math.min(64,now-lastTime);
      lastTime=now;
      position += (target-position)*(1-Math.exp(-dt/94));
      const done=Math.abs(target-position)<.001;
      if(done) position=target;
      draw();
      if(!done) frame=requestAnimationFrame(advance);
    }
    function settle(value) {
      target = Math.round(value);
      if (motion.matches) {
        cancelAnimationFrame(frame);
        frame=0;position=target;draw();
      } else if (!frame) {
        lastTime=performance.now(); frame=requestAnimationFrame(advance);
      }
    }
    gallery.querySelectorAll('[data-step]').forEach(button=>button.addEventListener('click',()=>settle(target+Number(button.dataset.step))));
    stage.addEventListener('keydown', e=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
      e.preventDefault();
      if(e.key==='Home'||e.key==='End') settle(target-wrap(target,n)+(e.key==='End'?n-1:0));
      else settle(target+(e.key==='ArrowRight'?1:-1));
    });
    stage.addEventListener('pointerdown',e=>{
      if(!e.isPrimary || e.button!==0) return;
      cancelAnimationFrame(frame);frame=0;
      drag={id:e.pointerId, x:e.clientX, y:e.clientY, position,lastX:e.clientX,time:e.timeStamp, speed:0,moved:false};
      if(e.pointerType!=='touch') stage.setPointerCapture(e.pointerId);
      stage.classList.add('ot-held');
    });
    stage.addEventListener('pointermove',e=>{
      if(!drag || drag.id!==e.pointerId) return;
      const dx=e.clientX-drag.x, dy=e.clientY-drag.y;
      if(!drag.moved){
        if(e.pointerType==='touch' && Math.abs(dy)>10 && Math.abs(dy)>Math.abs(dx)){
          drag=null; stage.classList.remove('ot-held'); return;
        }
        if(Math.abs(dx)<6) return;
        drag.moved=true;
        if(e.pointerType==='touch') stage.setPointerCapture(e.pointerId);
      }
      const unit=Math.max(110,Math.min(stageWidth*.36,cardWidth*.89));
      const elapsed=Math.max(8,e.timeStamp-drag.time);
      const velocity=(e.clientX-drag.lastX)/elapsed;
      drag.speed=.65*velocity+.35*drag.speed;
      position=drag.position-dx/unit;
      drag.lastX=e.clientX;drag.time=e.timeStamp;draw();
    });
    function release(e) {
      if(!drag || drag.id!==e.pointerId) return;
      const offset=e.type==='pointerup'&&e.timeStamp-drag.time<90 && !motion.matches ? Math.max(-.8,Math.min(.8,-drag.speed*.48)) : 0;
      let dest=position+offset;
      if(!drag.moved && e.type==='pointerup') {
        const card=document.elementFromPoint(e.clientX,e.clientY)?.closest('.ot-slide');
        const index=cards.indexOf(card);
        if(index!==-1) dest=position+wrap(index-position+n/2,n)-n/2;
      }
      drag=null;
      stage.classList.remove('ot-held');
      settle(dest);
    }
    ['pointerup','pointercancel','lostpointercapture'].forEach(type=>stage.addEventListener(type,release));
    motion.addEventListener('change',()=>settle(target));
    draw();
    return gallery;
  }
  oldArc.replaceWith(createGallery(disciplines,'arc','Studio disciplines',1));
  const engagements=document.querySelector('.engagements');
  engagements.querySelector('.chosen em')?.remove();
  const faq=document.querySelector('.faq');faq.id='faq';
  const contact=document.querySelector('.contact');
  const field=document.createElement('div');
  field.className='ot-type-field';field.setAttribute('aria-hidden','true');
  for(let i=0;i<15;i++){
    const line=document.createElement('b');
    line.textContent='OUT THERE';
    const col=i%5,row=Math.floor(i/5);
    line.style.left=(col*25+(row%2?4:-6))+'%';
    line.style.top=(7+row*34+(col%2?8:0))+'%';
    line.style.setProperty('--turn', ((i*13)%31-15)+'deg');
    line.style.setProperty('--depth',(i%4+1)/4);
    field.append(line);
  }
  contact.prepend(field);
  const button=contact.querySelector('.contact-button');
  const face=document.createElement('span');
  face.className='contact-button-face';
  face.textContent=button.textContent;
  button.replaceChildren(face);
  const copyButton=contact.querySelector('.contact-copy');
  const copyStatus=contact.querySelector('.contact-copy-status');
  copyButton?.addEventListener('click',async()=>{
    let copied=false;
    try{
      await navigator.clipboard.writeText(copyButton.dataset.email);
      copied=true;
    }catch{
      const field=document.createElement('textarea');
      field.value=copyButton.dataset.email;
      field.style.position='fixed';
      field.style.opacity='0';
      document.body.append(field);
      field.select();
      copied=document.execCommand('copy');
      field.remove();
    }
    copyStatus.textContent=copied?'Email address copied.':'Could not copy the email address.';
    if(copied)copyButton.textContent='Email copied ✓';
  });
  let frame=0;
  let fieldX=0,fieldY=0,magnetX=0,magnetY=0;
  function paint(){
    frame=0;
    field.style.setProperty('--fx',fieldX+'px');
    field.style.setProperty('--fy',fieldY+'px');
    face.style.setProperty('--mx',magnetX+'px');
    face.style.setProperty('--my',magnetY+'px');
  }
  function queue(){if(!frame) frame=requestAnimationFrame(paint)}
  function reset(){fieldX=fieldY=magnetX=magnetY=0;queue()}
  contact.addEventListener('pointermove',e=>{
    if(motion.matches || e.pointerType==='touch') return;
    const r=contact.getBoundingClientRect(),b=button.getBoundingClientRect();
    fieldX=((e.clientX-r.left)/r.width-.5)*80;
    fieldY=((e.clientY-r.top)/r.height-.5)*60;
    field.querySelectorAll('b').forEach(line=>{
      const rect=line.getBoundingClientRect();
      const distance=Math.hypot(e.clientX-rect.left-rect.width/2,e.clientY-rect.top-rect.height/2);
      const falloff=Math.max(0,1-distance/380);
      line.style.setProperty('--local-x',Math.round(fieldX*falloff)+'px');
      line.style.setProperty('--local-y',Math.round(fieldY*falloff)+'px');
    });
    const x=e.clientX-b.left-b.width/2,y=e.clientY-b.top-b.height/2;
    const near=Math.abs(x)<b.width*.8 && Math.abs(y)<b.height;
    magnetX=near?x*.15:0;magnetY=near?y*.19:0;
    queue();
  },{passive:true});
  contact.addEventListener('pointerleave',reset);
  motion.addEventListener('change',reset);
  if(window.gsap && window.ScrollTrigger && !motion.matches){
    ScrollTrigger.create({
      trigger:contact, start:'top bottom', end:'bottom top',
      onUpdate:self=>{
        const shift=(self.progress-.5)*60;
        field.querySelectorAll('b').forEach((line,i)=>{
          const dir=i%2?1:-1, depth=(i%4+1)/4;
          line.style.setProperty('--scroll-x',Math.round(shift*dir*depth)+'px');
          line.style.setProperty('--scroll-y',Math.round(-shift*.55*depth)+'px');
        });
      }
    });
  }
})();
