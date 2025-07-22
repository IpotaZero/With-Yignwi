const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./SceneGame-CuFZ8bNv.js","../run.js","./SceneNovel-DJkY5XE1.js"])))=>i.map(i=>d[i]);
import{S as v,p as S,B as i,_ as p,a as g}from"../run.js";class c{static getData(){const e=localStorage.getItem("data");return e?JSON.parse(e):this.#e()}static setData(e,t){const a=this.getData();a[e].cleared||=t.cleared,a[e].leastCleared||=t.leastCleared,localStorage.setItem("data",JSON.stringify(a))}static#e(){return Array.from({length:3},()=>Array.from({length:5},()=>({cleared:!1,leastCleared:!1}))).flat()}static getBGMVolume(){return+(localStorage.getItem("bgm-volume")??"1")}static setBGMVolume(e){localStorage.setItem("bgm-volume",""+e)}static getSEVolume(){return+(localStorage.getItem("se-volume")??"1")}static setSEVolume(e){localStorage.setItem("se-volume",""+e)}}const h=new Image;h.src="assets/images/maple.png";function M(r){const e=document.createElement("style");e.innerHTML=`
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
    `,r.appendChild(e);const t=a=>{const l=Math.random();a.style.left=`${l*100}%`,a.style.scale=""+(Math.random()/2+.8),a.style.animation=`fall ${Math.random()*6+6}s linear infinite`,a.style.animationDelay=`${Math.random()*8}s`};for(let a=0;a<24;a++){const l=h.cloneNode();l.classList.add("falling-particle"),t(l),l.onanimationend=()=>{t(l)},r.appendChild(l)}}function E(r){r.addEventListener("click",e=>{const t=e.target.getBoundingClientRect(),a=e.clientX-t.left,l=e.clientY-t.top;for(let m=0;m<8;m++){const s=h.cloneNode();s.style.position="fixed",s.style.pointerEvents="none",s.style.left=`calc(${t.left+a}px - 4dvh)`,s.style.top=`calc(${t.top+l}px - 4dvh)`,s.style.width="8dvh",s.style.height="8dvh",s.style.scale=""+(Math.random()/2+.8),s.style.opacity=""+Math.random()*.5,s.style.transition="transform 1s ease-out, opacity 1s ease-out",s.style.zIndex="1000",document.body.appendChild(s);const o=Math.PI*2*m/8+Math.random(),n=60+Math.random()*20;requestAnimationFrame(()=>{s.style.transform=`translate(${Math.cos(o)*n/8}dvh, ${Math.sin(o)*n/8}dvh) scale(0.5) rotate(${o/Math.PI*180*(Math.random()-.5)}deg)`,s.style.opacity="0"}),setTimeout(()=>{s.remove()},1e3)}})}class f{#e;constructor(e){this.#e=new Audio(e)}play(){this.#e.currentTime=0,this.#e.play()}setVolume(e){this.#e.volume=e}}class u{static cursor=new f("assets/sounds/カーソル移動4.mp3");static ok=new f("assets/sounds/タイプライターで文字を打つ1.mp3");static setVolume(e){Object.values(this).forEach(t=>{t.setVolume(e)})}}class b extends v{ready;constructor(e){super(),this.ready=this.#e(e),this.#t()}async#e(e){const t=document.getElementById("container"),a=await fetch("pages/title.html",{cache:"no-store"}).then(l=>l.text());S(t,e,a),this.#a(),this.#o()}async#t(){await i.fadeOut(1e3),await i.fetch("./assets/sounds/nontrapezodihedron.m4a"),await i.play()}#a(){const e=document.getElementById("container");e.querySelectorAll(".page").forEach(E);const t=e.querySelectorAll(".chapter-button");t.forEach((o,n)=>{n!==0&&o.classList.add("hidden")});const a=e.querySelectorAll(".stage-button");a.forEach((o,n)=>{o.onclick=async()=>{const{SceneGame:d}=await p(async()=>{const{SceneGame:y}=await import("./SceneGame-CuFZ8bNv.js");return{SceneGame:y}},__vite__mapDeps([0,1]),import.meta.url);await g.goto(()=>new d(n))}}),e.querySelectorAll(".story-button").forEach((o,n)=>{o.onclick=async()=>{const{SceneNovel:d}=await p(async()=>{const{SceneNovel:y}=await import("./SceneNovel-DJkY5XE1.js");return{SceneNovel:y}},__vite__mapDeps([2,1]),import.meta.url);await g.goto(()=>new d(n))}}),e.querySelectorAll("button").forEach(o=>{o.onmouseover=()=>{u.cursor.play()}});const s=c.getData();s.forEach((o,n)=>{if(o.leastCleared){a[n].innerHTML+="<br>★";return}o.cleared&&(a[n].innerHTML+="<br>☆")});for(const o of t.keys()){if(s.slice(o*5,o*5+5).every(n=>n.leastCleared)){t[o].innerHTML+="<br>★",t[o+1]?.classList.remove("hidden");continue}s.slice(o*5,o*5+5).every(n=>n.cleared)&&(t[o].innerHTML+="<br>☆",t[o+1]?.classList.remove("hidden"))}e.querySelector("#fullscreen").onclick=()=>{document.fullscreenElement?document.exitFullscreen():document.body.requestFullscreen()},M(e.querySelector("#title"))}#o(){const e=document.getElementById("container"),t=e.querySelector(".volume-bgm");t.oninput=()=>{i.setVolume(+t.value),u.ok.play(),c.setBGMVolume(+t.value)},t.value=""+c.getBGMVolume(),i.setVolume(c.getBGMVolume());const a=e.querySelector(".volume-se");a.oninput=()=>{u.setVolume(+a.value),u.ok.play(),c.setSEVolume(+a.value)},a.value=""+c.getSEVolume(),u.setVolume(c.getSEVolume())}}const w=Object.freeze(Object.defineProperty({__proto__:null,SceneTitle:b},Symbol.toStringTag,{value:"Module"}));export{c as L,w as S,E as s};
//# sourceMappingURL=SceneTitle-ssMceQGM.js.map
