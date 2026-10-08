const screens=[...document.querySelectorAll(".screen")];

function show(id){
  screens.forEach(s=>s.classList.toggle("active",s.id===id));
  scrollTo({top:0,behavior:"smooth"});
  burst(window.innerWidth/2,Math.min(window.innerHeight*.55,520),id==="final"?12:6);
}

document.querySelectorAll("[data-next]").forEach(b=>b.onclick=()=>{
  burst(b.getBoundingClientRect().left+b.offsetWidth/2,b.getBoundingClientRect().top+b.offsetHeight/2,5);
  show(b.dataset.next);
});

document.querySelectorAll(".card").forEach(c=>c.onclick=()=>{
  document.querySelectorAll(".card").forEach(x=>x.classList.remove("selected"));
  c.classList.add("selected");
  const note=document.getElementById("note");
  note.textContent=c.dataset.note;
  note.classList.remove("pop");
  void note.offsetWidth;
  note.classList.add("pop");
  const r=c.getBoundingClientRect();
  burst(r.left+r.width/2,r.top+r.height/2,7);
});

const modal=document.getElementById("modal");
document.getElementById("open").onclick=()=>{
  modal.classList.add("open");
  burst(window.innerWidth/2,window.innerHeight/2,14);
};
document.getElementById("close").onclick=()=>modal.classList.remove("open");
modal.onclick=e=>{if(e.target===modal)modal.classList.remove("open")};
document.addEventListener("keydown",e=>{if(e.key==="Escape")modal.classList.remove("open")});
document.getElementById("replay").onclick=()=>show("intro");

function burst(x,y,count=7){
  const symbols=["♡","✦","✧","♥","•"];
  for(let i=0;i<count;i++){
    const el=document.createElement("span");
    el.className="spark-burst";
    el.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    el.style.left=x+"px";
    el.style.top=y+"px";
    const angle=(Math.PI*2*i/count)+(Math.random()-.5)*.5;
    const distance=35+Math.random()*55;
    el.style.setProperty("--dx",Math.cos(angle)*distance+"px");
    el.style.setProperty("--dy",Math.sin(angle)*distance+"px");
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),750);
  }
}
