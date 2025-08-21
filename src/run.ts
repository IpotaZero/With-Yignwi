import { Dom } from "./Dom.js"
import { LocalStorage } from "./LocalStorage.js"
import { Scenes } from "./Scenes/Scenes.js"
// import { H, x } from "./test.js"
import { BGM } from "./utils/BGM.js"
// import { result } from "./utils/Solver3.js"
// import { a } from "./utils/Solver2.js"
// result

// console.log(a)

document.addEventListener("DOMContentLoaded", async () => {
    Dom.init()
    BGM.init()

    const { ScenePretitle } = await import("./Scenes/ScenePretitle.js")
    Scenes.init(new ScenePretitle())
})

document.addEventListener("contextmenu", (e) => {
    e.preventDefault()
})

// console.log(
//     x?.map((n) => n.value),
//     H.map((row) => row.map((n) => n.value)),
// )
