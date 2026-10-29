// Glass Folder : ouverture, parallaxe, entrée au scroll
document.querySelectorAll('.gf').forEach(f=>{
  const hit=f.querySelector('.gf-hit');
  const setOpen=o=>{f.toggleAttribute('data-open',o);hit.setAttribute('aria-expanded',o)};
  hit.addEventListener('click',()=>setOpen(!f.hasAttribute('data-open')));
  document.addEventListener('pointerdown',e=>{if(!f.contains(e.target))setOpen(false)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&f.hasAttribute('data-open')){setOpen(false);hit.focus()}});
  f.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const r=f.getBoundingClientRect();
    f.style.setProperty('--px',((e.clientX-r.left)/r.width*2-1).toFixed(3));f.style.setProperty('--py',((e.clientY-r.top)/r.height*2-1).toFixed(3))});
  f.addEventListener('pointerleave',()=>{f.style.setProperty('--px',0);f.style.setProperty('--py',0)});
  const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();setTimeout(()=>f.setAttribute('data-entered',''),+f.dataset.delay||0)}},{threshold:.25});
  io.observe(f);
});
