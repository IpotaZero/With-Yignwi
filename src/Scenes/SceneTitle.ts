import { LocalStorage } from "../LocalStorage.js"
import { fall, setupParticle } from "../Particles.js"
import { SE } from "../SE.js"
import { Awaits } from "../utils/Awaits.js"
import { BGM } from "../utils/BGM.js"
import { page } from "../utils/Page.js"

export class SceneTitle {
    ready: Promise<void>

    constructor(pageHistory: string) {
        this.ready = this.#loadPage(pageHistory)
        this.#playBgm()
    }

    async #loadPage(pageHistory: string) {
        const container = document.getElementById("container")!

        const html = await fetch("pages/title.html", { cache: "no-store" }).then((response) => response.text())

        page(container, pageHistory, html)

        // fall(container)

        this.#setupButtons()
    }

    async #playBgm() {
        await BGM.fadeOut(1000)
        await BGM.fetch("./assets/sounds/nontrapezodihedron.m4a")
        await BGM.play()
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
                const { SceneGame } = await import("./SceneGame.js")
                await Awaits.fade(container, () => new SceneGame(index).ready)
            }
        })

        const novelButtons = container.querySelectorAll<HTMLButtonElement>(".story-button")

        novelButtons.forEach((button, index) => {
            button.onclick = async () => {
                const { SceneNovel } = await import("./SceneNovel.js")
                await Awaits.fade(container, () => new SceneNovel(index).ready)
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

        for (const i of chapterButtons.keys()) {
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

        fall(container.querySelector("#title")!)
    }
}
