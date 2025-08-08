const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./SceneGame-BHCO7H-L.js","../run.js","./ScenePretitle-DPoe-IFn.js","./SceneNovel-BzbBB9Pq.js"])))=>i.map(i=>d[i]);
import{D as h,B as i,_ as g,S as f}from"../run.js";import{S,p as M}from"./ScenePretitle-DPoe-IFn.js";class c{static getData(){const e=localStorage.getItem("data");return e?JSON.parse(e):this.#e()}static setData(e,t){const o=this.getData();o[e].cleared||=t.cleared,o[e].leastCleared||=t.leastCleared,localStorage.setItem("data",JSON.stringify(o))}static#e(){return Array.from({length:6},()=>Array.from({length:5},()=>({cleared:!1,leastCleared:!1}))).flat()}static getBGMVolume(){return+(localStorage.getItem("bgm-volume")??"1")}static setBGMVolume(e){localStorage.setItem("bgm-volume",""+e)}static getSEVolume(){return+(localStorage.getItem("se-volume")??"1")}static setSEVolume(e){localStorage.setItem("se-volume",""+e)}}const p=new Image;p.src="assets/images/maple.png";function E(r){const e=document.createElement("style");e.innerHTML=`
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
    `,r.appendChild(e);const t=o=>{const n=Math.random();o.style.left=`${n*100}%`,o.style.scale=""+(Math.random()/2+.8),o.style.animation=`fall ${Math.random()*6+6}s linear infinite`,o.style.animationDelay=`${Math.random()*8}s`};for(let o=0;o<24;o++){const n=p.cloneNode();n.classList.add("falling-particle"),t(n),n.onanimationend=()=>{t(n)},r.appendChild(n)}}function b(r){r.addEventListener("click",e=>{const t=e.target.getBoundingClientRect(),o=e.clientX-t.left,n=e.clientY-t.top;for(let u=0;u<8;u++){const s=p.cloneNode();s.style.position="fixed",s.style.pointerEvents="none",s.style.left=`calc(${t.left+o}px - 4dvh)`,s.style.top=`calc(${t.top+n}px - 4dvh)`,s.style.width="8dvh",s.style.height="8dvh",s.style.scale=""+(Math.random()/2+.8),s.style.opacity=""+Math.random()*.5,s.style.transition="transform 1s ease-out, opacity 1s ease-out",s.style.zIndex="1000",document.body.appendChild(s);const a=Math.PI*2*u/8+Math.random(),l=60+Math.random()*20;requestAnimationFrame(()=>{s.style.transform=`translate(${Math.cos(a)*l/8}dvh, ${Math.sin(a)*l/8}dvh) scale(0.5) rotate(${a/Math.PI*180*(Math.random()-.5)}deg)`,s.style.opacity="0"}),setTimeout(()=>{s.remove()},1e3)}})}class v{#e;constructor(e){this.#e=new Audio(e)}play(){this.#e.currentTime=0,this.#e.play()}setVolume(e){this.#e.volume=e}}class y{static cursor=new v("assets/sounds/カーソル移動4.mp3");static ok=new v("assets/sounds/タイプライターで文字を打つ1.mp3");static setVolume(e){Object.values(this).forEach(t=>{t.setVolume(e)})}}class V extends S{ready;constructor(e){super(),this.ready=this.#e(e),this.#t()}async#e(e){const t=await fetch("pages/title.html",{cache:"no-store"}).then(o=>o.text());M(h.container,e,t),this.#o(),this.#a()}async#t(){i.setVolume(c.getBGMVolume()),console.log("f"),await i.fadeOut(1e3),console.log("f2"),await i.fetch("./assets/sounds/nontrapezodihedron.mp3"),await i.play()}#o(){const e=h.container;e.querySelectorAll(".page").forEach(b);const t=e.querySelectorAll(".chapter-button");t.forEach((a,l)=>{l!==0&&a.classList.add("hidden")});const o=e.querySelectorAll(".stage-button");o.forEach((a,l)=>{a.onclick=async()=>{const{SceneGame:m}=await g(async()=>{const{SceneGame:d}=await import("./SceneGame-BHCO7H-L.js");return{SceneGame:d}},__vite__mapDeps([0,1,2,3]),import.meta.url);await f.goto(()=>new m(l))}}),e.querySelectorAll(".story-button").forEach((a,l)=>{a.onclick=async()=>{const{SceneNovel:m}=await g(async()=>{const{SceneNovel:d}=await import("./SceneNovel-BzbBB9Pq.js");return{SceneNovel:d}},__vite__mapDeps([3,1,2]),import.meta.url);await f.goto(()=>new m(l))}}),e.querySelectorAll("button").forEach(a=>{a.onmouseover=()=>{y.cursor.play()}});const s=c.getData();s.forEach((a,l)=>{if(a.leastCleared){o[l].innerHTML+="<br>★";return}a.cleared&&(o[l].innerHTML+="<br>☆")});for(const a of t.keys()){if(s.slice(a*5,a*5+5).every(l=>l.leastCleared)){t[a].innerHTML+="<br>★",t[a+1]?.classList.remove("hidden");continue}s.slice(a*5,a*5+5).every(l=>l.cleared)&&(t[a].innerHTML+="<br>☆",t[a+1]?.classList.remove("hidden"))}e.querySelector("#fullscreen").onclick=()=>{document.fullscreenElement?document.exitFullscreen():document.body.requestFullscreen()},E(e.querySelector("#title"))}#a(){const e=h.container,t=e.querySelector(".volume-bgm");t.oninput=()=>{i.setVolume(+t.value),c.setBGMVolume(+t.value)},t.value=""+c.getBGMVolume();const o=e.querySelector(".volume-se");o.oninput=()=>{y.setVolume(+o.value),c.setSEVolume(+o.value)},o.value=""+c.getSEVolume(),y.setVolume(c.getSEVolume())}}const L=Object.freeze(Object.defineProperty({__proto__:null,SceneTitle:V},Symbol.toStringTag,{value:"Module"}));export{c as L,L as S,b as s};
//# sourceMappingURL=SceneTitle-a7HFh_cI.js.map
