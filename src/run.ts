import { ScenePretitle } from "./Scenes/ScenePretitle.js"
import { H, x } from "./test.js"

document.addEventListener("DOMContentLoaded", () => {
    new ScenePretitle()
})

document.addEventListener("contextmenu", (e) => {
    e.preventDefault()
})

console.log({ x, H })
