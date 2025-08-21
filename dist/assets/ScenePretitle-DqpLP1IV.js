const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./SceneTitle-Dx5xOrLM.js","../run.js"])))=>i.map(i=>d[i]);
import{_ as y,S as g}from"../run.js";function m(t,n,l){const i=n.split(" ");let a=[];a.push(...i.slice(0,-1)),a.push(i.at(-1)),t.innerHTML=l;const p=t.querySelectorAll(".page"),c=async(e,o)=>{const r=t.querySelector(e);if(!r)throw new Error(`そんなpageは無い: ${e}`);o||(await new Promise(s=>{t.style.transition="opacity 200ms",t.style.opacity="0",t.style.pointerEvents="none",setTimeout(s,200)}),t.style.opacity="1",t.style.pointerEvents=""),p.forEach(s=>{s.classList.toggle("hidden",s!==r)})};c(i.at(-1),!0),t.querySelectorAll("[data-link]").forEach(e=>{const o=e.hasAttribute("data-immediately"),r=e.hasAttribute("data-sever"),s=e.getAttribute("data-link");e.addEventListener("click",()=>{r&&(a=[]),a.push(s),c(s,o)})}),t.querySelectorAll("[data-back]").forEach(e=>{const o=e.hasAttribute("data-immediately"),r=e.getAttribute("data-back"),s=Number.parseInt(r);if(Number.isNaN(s)||s<=0){console.warn("正しくないdata-back！",e);return}e.addEventListener("click",()=>{if(a.length<=s){console.warn("戻る履歴がない",e);return}let d="";for(let u=0;u<s;u++)a.pop(),d=a[a.length-1];c(d,o)})})}class h{async end(){}}class b extends h{ready=Promise.resolve();constructor(){super();const n=document.getElementById("container");m(n,"#pretitle",`
                <div class="page" id="pretitle">
                    <button>提供: 大阪公立大学マイコン研究会</button>
                </div>

                <style>
                    #pretitle button {
                        width: 100%;
                        height: 100%;
                        font-size: 5dvw;
                    }
                </style>
            `),n.querySelector("button").onclick=async()=>{const{SceneTitle:l}=await y(async()=>{const{SceneTitle:i}=await import("./SceneTitle-Dx5xOrLM.js").then(a=>a.a);return{SceneTitle:i}},__vite__mapDeps([0,1]),import.meta.url);await g.goto(()=>new l("#title"))}}}const w=Object.freeze(Object.defineProperty({__proto__:null,ScenePretitle:b},Symbol.toStringTag,{value:"Module"}));export{h as S,w as a,m as p};
//# sourceMappingURL=ScenePretitle-DqpLP1IV.js.map
