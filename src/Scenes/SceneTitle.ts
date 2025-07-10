import { LocalStorage } from "../LocalStorage.js"
import { SE } from "../SE.js"
import { Awaits } from "../utils/Awaits.js"
import { page } from "../utils/Page.js"
import { SceneGame } from "./SceneGame.js"

export class SceneTitle {
    constructor(firstPage: string) {
        this.#loadPage(firstPage)
    }

    async #loadPage(firstPage: string) {
        const container = document.getElementById("container")!

        const html = await fetch("pages/title.html").then((response) => response.text())
        page(container, firstPage, html)

        const stageButtons = container.querySelectorAll<HTMLButtonElement>(".stage-button")

        stageButtons.forEach((button, index) => {
            button.onclick = async () => {
                await Awaits.fade(container)
                new SceneGame(index)
            }
        })

        const buttons = container.querySelectorAll("button")

        buttons.forEach((button) => {
            button.onmouseover = () => {
                SE.cursor.currentTime = 0
                SE.cursor.play()
            }
        })

        LocalStorage.getData().forEach((data, i) => {
            data.cleared && (stageButtons[i].innerHTML += `☆`)
            data.leastCleared && (stageButtons[i].innerHTML += `☆`)
        })

        LocalStorage.setData(0, { cleared: true, leastCleared: true })
    }
}
