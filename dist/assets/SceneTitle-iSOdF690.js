const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./SceneGame-CqTAHxGE.js","../run.js","./SceneNovel-DDPd8a2L.js"])))=>i.map(i=>d[i]);
import{p,B as u,_ as m,A as h}from"../run.js";class g{static getData(){const e=localStorage.getItem("data");return e?JSON.parse(e):this.#e()}static setData(e,a){const n=this.getData();n[e].cleared||=a.cleared,n[e].leastCleared||=a.leastCleared,localStorage.setItem("data",JSON.stringify(n))}static#e(){return Array.from({length:3},()=>Array.from({length:5},()=>({cleared:!1,leastCleared:!1}))).flat()}}const y=new Image;y.src="assets/images/maple.png";function v(l){const e=document.createElement("style");e.innerHTML=`
        .falling-particle {
            position: fixed;
            pointer-events: none;

            width: 12dvh;
            height: 12dvh;

            mix-blend-mode: overlay;

            opacity: 0;
        }

        @keyframes fall{
            0% {
                top: 0;
                opacity: 0;
                transform: rotate(0);
            }

            25% {
                opacity: 0.1;
            }

            100% {
                top: 100%;
                opacity: 0;
                transform: rotate(360deg);
            }
        }
    `,l.appendChild(e);const a=n=>{const r=Math.random();n.style.left=`${r*100}%`,n.style.scale=""+(Math.random()/2+.8),n.style.animation=`fall ${Math.random()*6+6}s linear infinite`,n.style.animationDelay=`${Math.random()*8}s`};for(let n=0;n<24;n++){const r=y.cloneNode();r.classList.add("falling-particle"),a(r),r.onanimationend=()=>{a(r)},l.appendChild(r)}}function S(l){l.addEventListener("click",e=>{const a=e.target.getBoundingClientRect(),n=e.clientX-a.left,r=e.clientY-a.top;for(let c=0;c<8;c++){const o=y.cloneNode();o.style.position="fixed",o.style.pointerEvents="none",o.style.left=`calc(${a.left+n}px - 4dvh)`,o.style.top=`calc(${a.top+r}px - 4dvh)`,o.style.width="8dvh",o.style.height="8dvh",o.style.scale=""+(Math.random()/2+.8),o.style.opacity=""+Math.random()*.5,o.style.transition="transform 1s ease-out, opacity 1s ease-out",o.style.zIndex="1000",document.body.appendChild(o);const t=Math.PI*2*c/8+Math.random(),s=60+Math.random()*20;requestAnimationFrame(()=>{o.style.transform=`translate(${Math.cos(t)*s/8}dvh, ${Math.sin(t)*s/8}dvh) scale(0.5) rotate(${t/Math.PI*180*(Math.random()-.5)}deg)`,o.style.opacity="0"}),setTimeout(()=>{o.remove()},1e3)}})}const f={cursor:new Audio("assets/sounds/カーソル移動4.mp3")};class M{ready;constructor(e){this.ready=this.#e(e),this.#t()}async#e(e){const a=document.getElementById("container"),n=await fetch("pages/title.html",{cache:"no-store"}).then(r=>r.text());p(a,e,n),this.#a()}async#t(){await u.fadeOut(1e3),await u.fetch("./assets/sounds/nontrapezodihedron.m4a"),await u.play()}#a(){const e=document.getElementById("container");e.querySelectorAll(".page").forEach(S);const a=e.querySelectorAll(".chapter-button");a.forEach((t,s)=>{s!==0&&t.classList.add("hidden")});const n=e.querySelectorAll(".stage-button");n.forEach((t,s)=>{t.onclick=async()=>{const{SceneGame:i}=await m(async()=>{const{SceneGame:d}=await import("./SceneGame-CqTAHxGE.js");return{SceneGame:d}},__vite__mapDeps([0,1]),import.meta.url);await h.fade(e,()=>new i(s).ready)}}),e.querySelectorAll(".story-button").forEach((t,s)=>{t.onclick=async()=>{const{SceneNovel:i}=await m(async()=>{const{SceneNovel:d}=await import("./SceneNovel-DDPd8a2L.js");return{SceneNovel:d}},__vite__mapDeps([2,1]),import.meta.url);await h.fade(e,()=>new i(s).ready)}}),e.querySelectorAll("button").forEach(t=>{t.onmouseover=()=>{f.cursor.currentTime=0,f.cursor.play()}});const o=g.getData();o.forEach((t,s)=>{if(t.leastCleared){n[s].innerHTML+="<br>★";return}t.cleared&&(n[s].innerHTML+="<br>☆")});for(const t of a.keys()){if(o.slice(t*5,t*5+5).every(s=>s.leastCleared)){a[t].innerHTML+="<br>★",a[t+1]?.classList.remove("hidden");continue}o.slice(t*5,t*5+5).every(s=>s.cleared)&&(a[t].innerHTML+="<br>☆",a[t+1]?.classList.remove("hidden"))}e.querySelector("#fullscreen").onclick=()=>{document.fullscreenElement?document.exitFullscreen():document.body.requestFullscreen()},v(e.querySelector("#title"))}}const E=Object.freeze(Object.defineProperty({__proto__:null,SceneTitle:M},Symbol.toStringTag,{value:"Module"}));export{g as L,E as S,S as s};
//# sourceMappingURL=SceneTitle-iSOdF690.js.map
