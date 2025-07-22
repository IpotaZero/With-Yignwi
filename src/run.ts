import { ScenePretitle } from "./Scenes/ScenePretitle.js"
import { Scenes } from "./Scenes/Scenes.js"
import { H, x } from "./test.js"
import { BGM } from "./utils/BGM.js"

document.addEventListener("DOMContentLoaded", () => {
    BGM.init()
    Scenes.init(new ScenePretitle())
})

document.addEventListener("contextmenu", (e) => {
    e.preventDefault()
})

console.log({ x, H })
