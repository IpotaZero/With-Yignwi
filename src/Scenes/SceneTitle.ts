import { LocalStorage } from "../LocalStorage.js"
import { SE } from "../SE.js"
import { Awaits } from "../utils/Awaits.js"
import { page } from "../utils/Page.js"
import { SceneGame } from "./SceneGame.js"
import { SceneNovel } from "./SceneNovel.js"

export class SceneTitle {
    constructor(pageHistory: string) {
        this.#loadPage(pageHistory)
    }

    async #loadPage(pageHistory: string) {
        const container = document.getElementById("container")!

        const html = await fetch("pages/title.html").then((response) => response.text())

        page(container, pageHistory, html)

        this.#setupButtons()
    }

    #setupButtons() {
        const container = document.getElementById("container")!

        const chapterButtons = container.querySelectorAll<HTMLButtonElement>(".chapter-button")

        const stageButtons = container.querySelectorAll<HTMLButtonElement>(".stage-button")

        stageButtons.forEach((button, index) => {
            button.onclick = async () => {
                await Awaits.fade(container)
                new SceneGame(index)
            }
        })

        const novelButtons = container.querySelectorAll<HTMLButtonElement>(".story-button")

        novelButtons.forEach((button, index) => {
            button.onclick = async () => {
                await Awaits.fade(container)
                new SceneNovel(index)
            }
        })

        const buttons = container.querySelectorAll("button")

        buttons.forEach((button) => {
            button.onmouseover = () => {
                SE.cursor.currentTime = 0
                SE.cursor.play()
            }
        })

        const stageResults = LocalStorage.getData()

        stageResults.forEach((data, i) => {
            data.cleared && (stageButtons[i].innerHTML += `☆`)
            data.leastCleared && (stageButtons[i].innerHTML += `☆`)
        })

        for (const i of Array(2).keys()) {
            if (stageResults.slice(i * 5, i * 5 + 5).every((stage) => stage.cleared)) {
                chapterButtons[i].innerHTML += `☆`
            }

            if (stageResults.slice(i * 5, i * 5 + 5).every((stage) => stage.leastCleared)) {
                chapterButtons[i].innerHTML += `☆`
            }
        }
    }
}
