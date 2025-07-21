import { LocalStorage } from "../LocalStorage.js"
import { fall, setupParticle } from "../Particles.js"
import { SE } from "../SE.js"
import { Awaits } from "../utils/Awaits.js"
import { BGM } from "../utils/BGM.js"
import { page } from "../utils/Page.js"
import { SceneGame } from "./SceneGame.js"
import { SceneNovel } from "./SceneNovel.js"

export class SceneTitle {
    ready: Promise<void>

    constructor(pageHistory: string) {
        this.ready = this.#loadPage(pageHistory)
    }

    async #loadPage(pageHistory: string) {
        const container = document.getElementById("container")!

        const html = await fetch("pages/title.html", { cache: "no-store" }).then((response) => response.text())

        page(container, pageHistory, html)

        // fall(container)

        this.#setupButtons()

        await BGM.fetch("./assets/sounds/野晒しの地獄.m4a")
        // await BGM.play()
    }

    #setupButtons() {
        const container = document.getElementById("container")!

        container.querySelectorAll<HTMLElement>(".page").forEach(setupParticle)

        const chapterButtons = container.querySelectorAll<HTMLButtonElement>(".chapter-button")

        chapterButtons.forEach((button, i) => {
            i !== 0 && button.classList.add("hidden")
        })

        const stageButtons = container.querySelectorAll<HTMLButtonElement>(".stage-button")

        stageButtons.forEach((button, index) => {
            button.onclick = async () => {
                await Awaits.fade(container, () => new SceneGame(index).ready)
            }
        })

        const novelButtons = container.querySelectorAll<HTMLButtonElement>(".story-button")

        novelButtons.forEach((button, index) => {
            button.onclick = async () => {
                await Awaits.fadeOut(container)
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
            if (data.leastCleared) {
                stageButtons[i].innerHTML += `<br>★`
                return
            }

            if (data.cleared) {
                stageButtons[i].innerHTML += `<br>☆`
            }
        })

        for (const i of Array(2).keys()) {
            if (stageResults.slice(i * 5, i * 5 + 5).every((stage) => stage.leastCleared)) {
                chapterButtons[i].innerHTML += `<br>★`
                chapterButtons[i + 1]?.classList.remove("hidden")
                continue
            }

            if (stageResults.slice(i * 5, i * 5 + 5).every((stage) => stage.cleared)) {
                chapterButtons[i].innerHTML += `<br>☆`
                chapterButtons[i + 1]?.classList.remove("hidden")
            }
        }

        container.querySelector<HTMLElement>("#fullscreen")!.onclick = () => {
            if (document.fullscreenElement) {
                document.exitFullscreen()
            } else {
                document.body.requestFullscreen()
            }
        }
    }
}
