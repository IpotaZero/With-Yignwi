const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./SceneTitle-xBULKfKJ.js","../run.js"])))=>i.map(i=>d[i]);
import{_ as y,S as g}from"../run.js";function m(t,l,n){const i=l.split(" ");let a=[];a.push(...i.slice(0,-1)),a.push(i.at(-1)),t.innerHTML=n;const p=t.querySelectorAll(".page"),c=async(e,o)=>{const r=t.querySelector(e);if(!r)throw new Error(`そんなpageは無い: ${e}`);o||(await new Promise(s=>{t.style.transition="opacity 200ms",t.style.opacity="0",t.style.pointerEvents="none",setTimeout(s,200)}),t.style.opacity="1",t.style.pointerEvents=""),p.forEach(s=>{s.classList.toggle("hidden",s!==r)})};c(i.at(-1),!0),t.querySelectorAll("[data-link]").forEach(e=>{const o=e.hasAttribute("data-immediately"),r=e.hasAttribute("data-sever"),s=e.getAttribute("data-link");e.addEventListener("click",()=>{r&&(a=[]),a.push(s),c(s,o)})}),t.querySelectorAll("[data-back]").forEach(e=>{const o=e.hasAttribute("data-immediately"),r=e.getAttribute("data-back"),s=Number.parseInt(r);if(Number.isNaN(s)||s<=0){console.warn("正しくないdata-back！",e);return}e.addEventListener("click",()=>{if(a.length<=s){console.warn("戻る履歴がない",e);return}let d="";for(let u=0;u<s;u++)a.pop(),d=a[a.length-1];c(d,o)})})}class h{}class b extends h{ready=Promise.resolve();constructor(){super();const l=document.getElementById("container");m(l,"#pretitle",`
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
            `),l.querySelector("button").onclick=async()=>{const{SceneTitle:n}=await y(async()=>{const{SceneTitle:i}=await import("./SceneTitle-xBULKfKJ.js").then(a=>a.S);return{SceneTitle:i}},__vite__mapDeps([0,1]),import.meta.url);await g.goto(()=>new n("#title"))}}}const w=Object.freeze(Object.defineProperty({__proto__:null,ScenePretitle:b},Symbol.toStringTag,{value:"Module"}));export{h as S,w as a,m as p};
//# sourceMappingURL=ScenePretitle-CCv7I76j.js.map
