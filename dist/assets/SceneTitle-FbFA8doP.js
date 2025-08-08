const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./SceneGame-BnjTOIWX.js","../run.js","./ScenePretitle-CH9zRrVD.js","./SceneNovel-AM4plZvK.js"])))=>i.map(i=>d[i]);
import{D as h,B as i,L as r,_ as f,S as v}from"../run.js";import{S,p as M}from"./ScenePretitle-CH9zRrVD.js";const p=new Image;p.src="assets/images/maple.png";function E(c){const e=document.createElement("style");e.innerHTML=`
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
                opacity: 0.15;
            }

            100% {
                top: 100%;
                opacity: 0;
                transform: rotate(360deg);
            }
        }
    `,c.appendChild(e);const t=n=>{const l=Math.random();n.style.left=`${l*100}%`,n.style.scale=""+(Math.random()/2+.8),n.style.animation=`fall ${Math.random()*6+6}s linear infinite`,n.style.animationDelay=`${Math.random()*8}s`};for(let n=0;n<24;n++){const l=p.cloneNode();l.classList.add("falling-particle"),t(l),l.onanimationend=()=>{t(l)},c.appendChild(l)}}function b(c){c.addEventListener("click",e=>{const t=e.target.getBoundingClientRect(),n=e.clientX-t.left,l=e.clientY-t.top;for(let u=0;u<8;u++){const s=p.cloneNode();s.style.position="fixed",s.style.pointerEvents="none",s.style.left=`calc(${t.left+n}px - 4dvh)`,s.style.top=`calc(${t.top+l}px - 4dvh)`,s.style.width="8dvh",s.style.height="8dvh",s.style.scale=""+(Math.random()/2+.8),s.style.opacity=""+Math.random()*.5,s.style.transition="transform 1s ease-out, opacity 1s ease-out",s.style.zIndex="1000",document.body.appendChild(s);const o=Math.PI*2*u/8+Math.random(),a=60+Math.random()*20;requestAnimationFrame(()=>{s.style.transform=`translate(${Math.cos(o)*a/8}dvh, ${Math.sin(o)*a/8}dvh) scale(0.5) rotate(${o/Math.PI*180*(Math.random()-.5)}deg)`,s.style.opacity="0"}),setTimeout(()=>{s.remove()},1e3)}})}class g{#e;constructor(e){this.#e=new Audio(e)}play(){this.#e.currentTime=0,this.#e.play()}setVolume(e){this.#e.volume=e}}class y{static cursor=new g("assets/sounds/カーソル移動4.mp3");static ok=new g("assets/sounds/タイプライターで文字を打つ1.mp3");static setVolume(e){Object.values(this).forEach(t=>{t.setVolume(e)})}}class w extends S{ready;constructor(e){super(),this.ready=this.#e(e),this.#t()}async#e(e){const t=await fetch("pages/title.html",{cache:"no-store"}).then(n=>n.text());M(h.container,e,t),this.#o(),this.#n()}async#t(){i.setVolume(r.getBGMVolume()),console.log("f"),await i.fadeOut(1e3),console.log("f2"),await i.fetch("./assets/sounds/nontrapezodihedron.mp3"),await i.play()}#o(){const e=h.container;e.querySelectorAll(".page").forEach(b);const t=e.querySelectorAll(".chapter-button");t.forEach((o,a)=>{a!==0&&o.classList.add("hidden")});const n=e.querySelectorAll(".stage-button");n.forEach((o,a)=>{o.onclick=async()=>{const{SceneGame:m}=await f(async()=>{const{SceneGame:d}=await import("./SceneGame-BnjTOIWX.js");return{SceneGame:d}},__vite__mapDeps([0,1,2,3]),import.meta.url);await v.goto(()=>new m(a))}}),e.querySelectorAll(".story-button").forEach((o,a)=>{o.onclick=async()=>{const{SceneNovel:m}=await f(async()=>{const{SceneNovel:d}=await import("./SceneNovel-AM4plZvK.js");return{SceneNovel:d}},__vite__mapDeps([3,1,2]),import.meta.url);await v.goto(()=>new m(a))}}),e.querySelectorAll("button").forEach(o=>{o.onmouseover=()=>{y.cursor.play()}});const s=r.getData();s.forEach((o,a)=>{if(o.leastCleared){n[a].innerHTML+="<br>★";return}o.cleared&&(n[a].innerHTML+="<br>☆")});for(const o of t.keys()){if(s.slice(o*5,o*5+5).every(a=>a.leastCleared)){t[o].innerHTML+="<br>★",t[o+1]?.classList.remove("hidden");continue}s.slice(o*5,o*5+5).every(a=>a.cleared)&&(t[o].innerHTML+="<br>☆",t[o+1]?.classList.remove("hidden"))}e.querySelector("#fullscreen").onclick=()=>{document.fullscreenElement?document.exitFullscreen():document.body.requestFullscreen()},E(e.querySelector("#title"))}#n(){const e=h.container,t=e.querySelector(".volume-bgm");t.oninput=()=>{i.setVolume(+t.value),r.setBGMVolume(+t.value)},t.value=""+r.getBGMVolume();const n=e.querySelector(".volume-se");n.oninput=()=>{y.setVolume(+n.value),r.setSEVolume(+n.value)},n.value=""+r.getSEVolume(),y.setVolume(r.getSEVolume())}}const L=Object.freeze(Object.defineProperty({__proto__:null,SceneTitle:w},Symbol.toStringTag,{value:"Module"}));export{L as S,b as s};
//# sourceMappingURL=SceneTitle-FbFA8doP.js.map
