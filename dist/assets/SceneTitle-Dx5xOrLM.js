const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./SceneGame-BWruovEr.js","../run.js","./ScenePretitle-DqpLP1IV.js","./SceneNovel-CT0pRqU9.js"])))=>i.map(i=>d[i]);
import{D as u,B as m,_ as y,S as d}from"../run.js";import{S as w,p as E}from"./ScenePretitle-DqpLP1IV.js";class r{static allClear(){for(let e=1;e<30;e++)this.setData(e,{cleared:!0,leastCleared:!0})}static getData(){const e=localStorage.getItem("data");return e?JSON.parse(e):this.#e()}static setData(e,t){const a=this.getData();a[e].cleared||=t.cleared,a[e].leastCleared||=t.leastCleared,localStorage.setItem("data",JSON.stringify(a))}static#e(){return Array.from({length:6},()=>Array.from({length:5},()=>({cleared:!1,leastCleared:!1}))).flat()}static getBGMVolume(){return+(localStorage.getItem("bgm-volume")??"1")}static setBGMVolume(e){localStorage.setItem("bgm-volume",""+e)}static getSEVolume(){return+(localStorage.getItem("se-volume")??"1")}static setSEVolume(e){localStorage.setItem("se-volume",""+e)}}window.LocalStorage=r;const v=new Image;v.src="assets/images/maple.png";function M(i){const e=document.createElement("style");e.innerHTML=`
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
    `,i.appendChild(e);const t=a=>{const s=Math.random();a.style.left=`${s*100}%`,a.style.scale=""+(Math.random()/2+.8),a.style.animation=`fall ${Math.random()*6+6}s linear infinite`,a.style.animationDelay=`${Math.random()*8}s`};for(let a=0;a<24;a++){const s=v.cloneNode();s.classList.add("falling-particle"),t(s),s.onanimationend=()=>{t(s)},i.appendChild(s)}}function _(i){i.addEventListener("click",e=>{const t=e.target.getBoundingClientRect(),a=e.clientX-t.left,s=e.clientY-t.top;for(let c=0;c<8;c++){const n=v.cloneNode();n.style.position="fixed",n.style.pointerEvents="none",n.style.left=`calc(${t.left+a}px - 4dvh)`,n.style.top=`calc(${t.top+s}px - 4dvh)`,n.style.width="8dvh",n.style.height="8dvh",n.style.scale=""+(Math.random()/2+.8),n.style.opacity=""+Math.random()*.5,n.style.transition="transform 1s ease-out, opacity 1s ease-out",n.style.zIndex="1000",document.body.appendChild(n);const o=Math.PI*2*c/8+Math.random(),l=60+Math.random()*20;requestAnimationFrame(()=>{n.style.transform=`translate(${Math.cos(o)*l/8}dvh, ${Math.sin(o)*l/8}dvh) scale(0.5) rotate(${o/Math.PI*180*(Math.random()-.5)}deg)`,n.style.opacity="0"}),setTimeout(()=>{n.remove()},1e3)}})}class g{#e;constructor(e){this.#e=new Audio(e)}play(){this.#e.currentTime=0,this.#e.play()}setVolume(e){this.#e.volume=e}}class f{static clear=new g("assets/sounds/clear.mp3");static cursor=new g("assets/sounds/カーソル移動4.mp3");static ok=new g("assets/sounds/タイプライターで文字を打つ1.mp3");static setVolume(e){Object.values(this).forEach(t=>{t.setVolume(e)})}}class S extends w{ready;constructor(e){super(),this.#t(),this.ready=this.#e(e)}async#e(e){const t=await fetch("pages/title.html",{cache:"no-store"}).then(a=>a.text());E(u.container,e,t),this.#a(),this.#s(),this.#n(),this.#o()}async#t(){m.setVolume(r.getBGMVolume()),await m.fadeOut(1e3),await m.fetch("assets/sounds/nontrapezodihedron.mp3"),await m.play()}#a(){const e=u.container;e.querySelectorAll(".page").forEach(_);const t=e.querySelectorAll(".chapter-button");t.forEach((o,l)=>{l!==0&&o.classList.add("hidden")});const a=e.querySelectorAll(".stage-button");a.forEach((o,l)=>{o.onclick=async()=>{const{SceneGame:h}=await y(async()=>{const{SceneGame:p}=await import("./SceneGame-BWruovEr.js");return{SceneGame:p}},__vite__mapDeps([0,1,2]),import.meta.url);await d.goto(()=>new h(l))}}),e.querySelectorAll(".story-button").forEach((o,l)=>{o.onclick=async()=>{const{SceneNovel:h}=await y(async()=>{const{SceneNovel:p}=await import("./SceneNovel-CT0pRqU9.js");return{SceneNovel:p}},__vite__mapDeps([3,1,2]),import.meta.url);await d.goto(()=>new h(l))}}),e.querySelectorAll("button").forEach(o=>{o.addEventListener("mouseover",()=>{f.cursor.play()})});const n=r.getData();n.forEach((o,l)=>{if(o.leastCleared){a[l].innerHTML+="<br>★";return}o.cleared&&(a[l].innerHTML+="<br>☆")});for(const o of t.keys()){if(n.slice(o*5,o*5+5).every(l=>l.leastCleared)){t[o].innerHTML+="<br>★",t[o+1]?.classList.remove("hidden");continue}n.slice(o*5,o*5+5).every(l=>l.cleared)&&(t[o].innerHTML+="<br>☆",t[o+1]?.classList.remove("hidden"))}e.querySelector("#fullscreen").onclick=()=>{document.fullscreenElement?document.exitFullscreen():document.body.requestFullscreen()},M(e.querySelector("#title"))}#o(){const e=u.container,t=e.querySelector(".volume-bgm");t.oninput=()=>{m.setVolume(+t.value),r.setBGMVolume(+t.value)},t.value=""+r.getBGMVolume();const a=e.querySelector(".volume-se");a.oninput=()=>{f.setVolume(+a.value),r.setSEVolume(+a.value)},a.value=""+r.getSEVolume(),f.setVolume(r.getSEVolume())}#s(){u.container.querySelector("#delete-data").onclick=()=>{window.confirm("ほんとに?")&&(localStorage.clear(),d.goto(()=>new S("#title")))}}#n(){const e=u.container.querySelector("#last-story");e.classList.toggle("hidden",!r.getData().every(s=>s.cleared)),e.onclick=async()=>{const{SceneNovel:s}=await y(async()=>{const{SceneNovel:c}=await import("./SceneNovel-CT0pRqU9.js");return{SceneNovel:c}},__vite__mapDeps([3,1,2]),import.meta.url);d.goto(()=>new s(6))};const t=u.container.querySelector("#omake"),a=r.getData().every(s=>s.leastCleared);t.classList.toggle("hidden",!a),t.onclick=async()=>{const{SceneNovel:s}=await y(async()=>{const{SceneNovel:c}=await import("./SceneNovel-CT0pRqU9.js");return{SceneNovel:c}},__vite__mapDeps([3,1,2]),import.meta.url);d.goto(()=>new s(7))}}}const b=Object.freeze(Object.defineProperty({__proto__:null,SceneTitle:S},Symbol.toStringTag,{value:"Module"}));export{r as L,f as S,b as a,_ as s};
//# sourceMappingURL=SceneTitle-Dx5xOrLM.js.map
