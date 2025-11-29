const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./SceneGame-C3s0agQJ.js","../run.js","./ScenePretitle-W6XU0Xcf.js","./SceneNovel-qvKQAQGa.js"])))=>i.map(i=>d[i]);
import{D as u,B as p,_ as d,S as m}from"../run.js";import{S as E,p as w}from"./ScenePretitle-W6XU0Xcf.js";class r{static#e="yignwi-data";static#o(){return Array.from({length:6*5},()=>({cleared:!1,leastCleared:!1}))}static#s(){return{stages:this.#o(),bgmVolume:1,seVolume:1}}static#t(){const e=localStorage.getItem(this.#e);return e?JSON.parse(e):this.#s()}static#a(e){localStorage.setItem(this.#e,JSON.stringify(e))}static getStageData(){return this.#t().stages}static setStageData(e,t){const a=this.#t();a.stages[e].cleared||=t.cleared,a.stages[e].leastCleared||=t.leastCleared,this.#a(a)}static getBGMVolume(){return this.#t().bgmVolume}static setBGMVolume(e){const t=this.#t();t.bgmVolume=e,this.#a(t)}static getSEVolume(){return this.#t().seVolume}static setSEVolume(e){const t=this.#t();t.seVolume=e,this.#a(t)}static clear(){localStorage.removeItem(this.#e)}}window.LocalStorage=r;const f=new Image;f.src="assets/images/maple.png";function V(i){const e=document.createElement("style");e.innerHTML=`
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
    `,i.appendChild(e);const t=a=>{const s=Math.random();a.style.left=`${s*100}%`,a.style.scale=""+(Math.random()/2+.8),a.style.animation=`fall ${Math.random()*6+6}s linear infinite`,a.style.animationDelay=`${Math.random()*8}s`};for(let a=0;a<24;a++){const s=f.cloneNode();s.classList.add("falling-particle"),t(s),s.onanimationend=()=>{t(s)},i.appendChild(s)}}function _(i){i.addEventListener("click",e=>{const t=e.target.getBoundingClientRect(),a=e.clientX-t.left,s=e.clientY-t.top;for(let c=0;c<8;c++){const n=f.cloneNode();n.style.position="fixed",n.style.pointerEvents="none",n.style.left=`calc(${t.left+a}px - 4dvh)`,n.style.top=`calc(${t.top+s}px - 4dvh)`,n.style.width="8dvh",n.style.height="8dvh",n.style.scale=""+(Math.random()/2+.8),n.style.opacity=""+Math.random()*.5,n.style.transition="transform 1s ease-out, opacity 1s ease-out",n.style.zIndex="1000",document.body.appendChild(n);const o=Math.PI*2*c/8+Math.random(),l=60+Math.random()*20;requestAnimationFrame(()=>{n.style.transform=`translate(${Math.cos(o)*l/8}dvh, ${Math.sin(o)*l/8}dvh) scale(0.5) rotate(${o/Math.PI*180*(Math.random()-.5)}deg)`,n.style.opacity="0"}),setTimeout(()=>{n.remove()},1e3)}})}class S{#e;constructor(e){this.#e=new Audio(e)}play(){this.#e.currentTime=0,this.#e.play()}setVolume(e){this.#e.volume=e}}class h{static clear=new S("assets/sounds/clear.mp3");static cursor=new S("assets/sounds/カーソル移動4.mp3");static ok=new S("assets/sounds/タイプライターで文字を打つ1.mp3");static setVolume(e){Object.values(this).forEach(t=>{t.setVolume(e)})}}class v extends E{ready;constructor(e){super(),this.#o(),this.ready=this.#e(e)}async#e(e){const t=await fetch("pages/title.html",{cache:"no-store"}).then(a=>a.text());w(u.container,e,t),this.#s(),this.#a(),this.#n(),this.#t()}async#o(){p.setVolume(r.getBGMVolume()),p.ffp("assets/sounds/nontrapezodihedron.mp3",{loopStartS:9.412,loopEndS:65.882})}#s(){const e=u.container;e.querySelectorAll(".page").forEach(_);const t=e.querySelectorAll(".chapter-button");t.forEach((o,l)=>{l!==0&&o.classList.add("hidden")});const a=e.querySelectorAll(".stage-button");a.forEach((o,l)=>{o.onclick=async()=>{const{SceneGame:y}=await d(async()=>{const{SceneGame:g}=await import("./SceneGame-C3s0agQJ.js");return{SceneGame:g}},__vite__mapDeps([0,1,2]),import.meta.url);await m.goto(()=>new y(l))}}),e.querySelectorAll(".story-button").forEach((o,l)=>{o.onclick=async()=>{const{SceneNovel:y}=await d(async()=>{const{SceneNovel:g}=await import("./SceneNovel-qvKQAQGa.js");return{SceneNovel:g}},__vite__mapDeps([3,1,2]),import.meta.url);await m.goto(()=>new y(l))}}),e.querySelectorAll("button").forEach(o=>{o.addEventListener("mouseover",()=>{h.cursor.play()})});const n=r.getStageData();n.forEach((o,l)=>{if(o.leastCleared){a[l].innerHTML+="<br>★";return}o.cleared&&(a[l].innerHTML+="<br>☆")});for(const o of t.keys()){if(n.slice(o*5,o*5+5).every(l=>l.leastCleared)){t[o].innerHTML+="<br>★",t[o+1]?.classList.remove("hidden");continue}n.slice(o*5,o*5+5).every(l=>l.cleared)&&(t[o].innerHTML+="<br>☆",t[o+1]?.classList.remove("hidden"))}e.querySelector("#fullscreen").onclick=()=>{document.fullscreenElement?document.exitFullscreen():document.body.requestFullscreen()},V(e.querySelector("#title"))}#t(){const e=u.container,t=e.querySelector(".volume-bgm");t.oninput=()=>{p.setVolume(+t.value),r.setBGMVolume(+t.value)},t.value=""+r.getBGMVolume();const a=e.querySelector(".volume-se");a.oninput=()=>{h.setVolume(+a.value),h.cursor.play(),r.setSEVolume(+a.value)},a.value=""+r.getSEVolume(),h.setVolume(r.getSEVolume())}#a(){u.container.querySelector("#delete-data").onclick=()=>{window.confirm("ほんとに?")&&(r.clear(),m.goto(()=>new v("#title")))}}#n(){const e=u.container.querySelector("#last-story");e.classList.toggle("hidden",!r.getStageData().every(s=>s.cleared)),e.onclick=async()=>{const{SceneNovel:s}=await d(async()=>{const{SceneNovel:c}=await import("./SceneNovel-qvKQAQGa.js");return{SceneNovel:c}},__vite__mapDeps([3,1,2]),import.meta.url);m.goto(()=>new s(6))};const t=u.container.querySelector("#omake"),a=r.getStageData().every(s=>s.leastCleared);t.classList.toggle("hidden",!a),t.onclick=async()=>{const{SceneNovel:s}=await d(async()=>{const{SceneNovel:c}=await import("./SceneNovel-qvKQAQGa.js");return{SceneNovel:c}},__vite__mapDeps([3,1,2]),import.meta.url);m.goto(()=>new s(7))}}}const L=Object.freeze(Object.defineProperty({__proto__:null,SceneTitle:v},Symbol.toStringTag,{value:"Module"}));export{r as L,h as S,L as a,_ as s};
//# sourceMappingURL=SceneTitle-DNQYrIj0.js.map
