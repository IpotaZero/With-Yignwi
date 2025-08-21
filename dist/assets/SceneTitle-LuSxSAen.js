const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./SceneGame-DP6fWGWh.js","../run.js","./ScenePretitle-C1KJ8nF-.js","./SceneNovel-CxgxcyOq.js"])))=>i.map(i=>d[i]);
import{D as u,B as g,_ as d,S as m}from"../run.js";import{S as E,p as w}from"./ScenePretitle-C1KJ8nF-.js";class r{static allClear(){for(let e=1;e<30;e++)this.setData(e,{cleared:!0,leastCleared:!0})}static getData(){const e=localStorage.getItem("data");return e?JSON.parse(e):this.#e()}static setData(e,t){const o=this.getData();o[e].cleared||=t.cleared,o[e].leastCleared||=t.leastCleared,localStorage.setItem("data",JSON.stringify(o))}static#e(){return Array.from({length:6},()=>Array.from({length:5},()=>({cleared:!1,leastCleared:!1}))).flat()}static getBGMVolume(){return+(localStorage.getItem("bgm-volume")??"1")}static setBGMVolume(e){localStorage.setItem("bgm-volume",""+e)}static getSEVolume(){return+(localStorage.getItem("se-volume")??"1")}static setSEVolume(e){localStorage.setItem("se-volume",""+e)}}window.LocalStorage=r;const S=new Image;S.src="assets/images/maple.png";function M(i){const e=document.createElement("style");e.innerHTML=`
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
    `,i.appendChild(e);const t=o=>{const s=Math.random();o.style.left=`${s*100}%`,o.style.scale=""+(Math.random()/2+.8),o.style.animation=`fall ${Math.random()*6+6}s linear infinite`,o.style.animationDelay=`${Math.random()*8}s`};for(let o=0;o<24;o++){const s=S.cloneNode();s.classList.add("falling-particle"),t(s),s.onanimationend=()=>{t(s)},i.appendChild(s)}}function _(i){i.addEventListener("click",e=>{const t=e.target.getBoundingClientRect(),o=e.clientX-t.left,s=e.clientY-t.top;for(let c=0;c<8;c++){const n=S.cloneNode();n.style.position="fixed",n.style.pointerEvents="none",n.style.left=`calc(${t.left+o}px - 4dvh)`,n.style.top=`calc(${t.top+s}px - 4dvh)`,n.style.width="8dvh",n.style.height="8dvh",n.style.scale=""+(Math.random()/2+.8),n.style.opacity=""+Math.random()*.5,n.style.transition="transform 1s ease-out, opacity 1s ease-out",n.style.zIndex="1000",document.body.appendChild(n);const a=Math.PI*2*c/8+Math.random(),l=60+Math.random()*20;requestAnimationFrame(()=>{n.style.transform=`translate(${Math.cos(a)*l/8}dvh, ${Math.sin(a)*l/8}dvh) scale(0.5) rotate(${a/Math.PI*180*(Math.random()-.5)}deg)`,n.style.opacity="0"}),setTimeout(()=>{n.remove()},1e3)}})}class f{#e;constructor(e){this.#e=new Audio(e)}play(){this.#e.currentTime=0,this.#e.play()}setVolume(e){this.#e.volume=e}}class y{static clear=new f("assets/sounds/clear.mp3");static cursor=new f("assets/sounds/カーソル移動4.mp3");static ok=new f("assets/sounds/タイプライターで文字を打つ1.mp3");static setVolume(e){Object.values(this).forEach(t=>{t.setVolume(e)})}}class v extends E{ready;constructor(e){super(),this.#t(),this.ready=this.#e(e)}async#e(e){const t=await fetch("pages/title.html",{cache:"no-store"}).then(o=>o.text());w(u.container,e,t),this.#o(),this.#s(),this.#n(),this.#a()}async#t(){g.setVolume(r.getBGMVolume()),g.ffp("assets/sounds/nontrapezodihedron.mp3",{loopStartS:9.412,loopEndS:65.882})}#o(){const e=u.container;e.querySelectorAll(".page").forEach(_);const t=e.querySelectorAll(".chapter-button");t.forEach((a,l)=>{l!==0&&a.classList.add("hidden")});const o=e.querySelectorAll(".stage-button");o.forEach((a,l)=>{a.onclick=async()=>{const{SceneGame:h}=await d(async()=>{const{SceneGame:p}=await import("./SceneGame-DP6fWGWh.js");return{SceneGame:p}},__vite__mapDeps([0,1,2]),import.meta.url);await m.goto(()=>new h(l))}}),e.querySelectorAll(".story-button").forEach((a,l)=>{a.onclick=async()=>{const{SceneNovel:h}=await d(async()=>{const{SceneNovel:p}=await import("./SceneNovel-CxgxcyOq.js");return{SceneNovel:p}},__vite__mapDeps([3,1,2]),import.meta.url);await m.goto(()=>new h(l))}}),e.querySelectorAll("button").forEach(a=>{a.addEventListener("mouseover",()=>{y.cursor.play()})});const n=r.getData();n.forEach((a,l)=>{if(a.leastCleared){o[l].innerHTML+="<br>★";return}a.cleared&&(o[l].innerHTML+="<br>☆")});for(const a of t.keys()){if(n.slice(a*5,a*5+5).every(l=>l.leastCleared)){t[a].innerHTML+="<br>★",t[a+1]?.classList.remove("hidden");continue}n.slice(a*5,a*5+5).every(l=>l.cleared)&&(t[a].innerHTML+="<br>☆",t[a+1]?.classList.remove("hidden"))}e.querySelector("#fullscreen").onclick=()=>{document.fullscreenElement?document.exitFullscreen():document.body.requestFullscreen()},M(e.querySelector("#title"))}#a(){const e=u.container,t=e.querySelector(".volume-bgm");t.oninput=()=>{g.setVolume(+t.value),r.setBGMVolume(+t.value)},t.value=""+r.getBGMVolume();const o=e.querySelector(".volume-se");o.oninput=()=>{y.setVolume(+o.value),y.cursor.play(),r.setSEVolume(+o.value)},o.value=""+r.getSEVolume(),y.setVolume(r.getSEVolume())}#s(){u.container.querySelector("#delete-data").onclick=()=>{window.confirm("ほんとに?")&&(localStorage.clear(),m.goto(()=>new v("#title")))}}#n(){const e=u.container.querySelector("#last-story");e.classList.toggle("hidden",!r.getData().every(s=>s.cleared)),e.onclick=async()=>{const{SceneNovel:s}=await d(async()=>{const{SceneNovel:c}=await import("./SceneNovel-CxgxcyOq.js");return{SceneNovel:c}},__vite__mapDeps([3,1,2]),import.meta.url);m.goto(()=>new s(6))};const t=u.container.querySelector("#omake"),o=r.getData().every(s=>s.leastCleared);t.classList.toggle("hidden",!o),t.onclick=async()=>{const{SceneNovel:s}=await d(async()=>{const{SceneNovel:c}=await import("./SceneNovel-CxgxcyOq.js");return{SceneNovel:c}},__vite__mapDeps([3,1,2]),import.meta.url);m.goto(()=>new s(7))}}}const b=Object.freeze(Object.defineProperty({__proto__:null,SceneTitle:v},Symbol.toStringTag,{value:"Module"}));export{r as L,y as S,b as a,_ as s};
//# sourceMappingURL=SceneTitle-LuSxSAen.js.map
