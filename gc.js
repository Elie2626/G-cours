// G-Cours — interactions partagées
function toggleNav(){
  const n=document.getElementById('mob-nav'),b=document.getElementById('burger-btn');
  const o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);
}
(function(){
  const dd=document.getElementById('dd');
  if(dd){const b=dd.querySelector('.dd-b'),set=o=>{dd.classList.toggle('open',o);b.setAttribute('aria-expanded',o)};
    b.addEventListener('click',()=>set(!dd.classList.contains('open')));
    document.addEventListener('click',e=>{if(!dd.contains(e.target))set(false)});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')set(false)});}
  const nav=document.getElementById('nav');
  
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.rev').forEach(el=>io.observe(el));

  // spotlight qui suit la souris
  document.querySelectorAll('.spot').forEach(c=>c.addEventListener('pointermove',e=>{
    const r=c.getBoundingClientRect();
    c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px');
  }));

  // compteurs (number ticker)
  const co=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;co.unobserve(e.target);
    const el=e.target,to=parseFloat(el.dataset.count),dec=+el.dataset.dec||0,t0=performance.now();
    (function f(t){const k=Math.min((t-t0)/1600,1),v=to*(1-Math.pow(1-k,4));
      el.textContent=dec?v.toFixed(dec).replace('.',','):Math.round(v).toLocaleString('fr-FR');
      if(k<1)requestAnimationFrame(f)})(t0);
  }),{threshold:.6});
  document.querySelectorAll('[data-count]').forEach(el=>co.observe(el));
})();
