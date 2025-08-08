import { Dom } from "../Dom.js"
import { LocalStorage } from "../LocalStorage.js"
import { fall, setupParticle } from "../Particles.js"
import { SE } from "../SE.js"
import { BGM } from "../utils/BGM.js"
import { page } from "../utils/Page.js"
import { Scene } from "./Scene.js"
import { Scenes } from "./Scenes.js"

export class SceneTitle extends Scene {
    ready: Promise<void>

    constructor(pageHistory: string) {
        super()

        this.ready = this.#loadPage(pageHistory)
        this.#playBgm()
    }

    async #loadPage(pageHistory: string) {
        const html = await fetch("pages/title.html", { cache: "no-store" }).then((response) => response.text())

        page(Dom.container, pageHistory, html)

        // fall(container)

        this.#setupButtons()
        this.#setupVolumeSetting()
    }

    async #playBgm() {
        BGM.setVolume(LocalStorage.getBGMVolume())
        console.log("f")
        await BGM.fadeOut(1000)
        console.log("f2")
        await BGM.fetch("./assets/sounds/nontrapezodihedron.mp3")
        await BGM.play()
    }

    #setupButtons() {
        const container = Dom.container

        container.querySelectorAll<HTMLElement>(".page").forEach(setupParticle)

        const chapterButtons = container.querySelectorAll<HTMLButtonElement>(".chapter-button")

        chapterButtons.forEach((button, i) => {
            i !== 0 && button.classList.add("hidden")
        })

        const stageButtons = container.querySelectorAll<HTMLButtonElement>(".stage-button")

        stageButtons.forEach((button, index) => {
            button.onclick = async () => {
                const { SceneGame } = await import("./SceneGame.js")
                await Scenes.goto(() => new SceneGame(index))
            }
        })

        const novelButtons = container.querySelectorAll<HTMLButtonElement>(".story-button")

        novelButtons.forEach((button, index) => {
            button.onclick = async () => {
                const { SceneNovel } = await import("./SceneNovel.js")
                await Scenes.goto(() => new SceneNovel(index))
            }
        })

        const buttons = container.querySelectorAll("button")

        buttons.forEach((button) => {
            button.onmouseover = () => {
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

    #setupVolumeSetting() {
        const container = Dom.container

        const volumeBGM = container.querySelector<HTMLInputElement>(".volume-bgm")!

        volumeBGM.oninput = () => {
            BGM.setVolume(+volumeBGM.value)
            // SE.ok.play()
            LocalStorage.setBGMVolume(+volumeBGM.value)
        }

        volumeBGM.value = "" + LocalStorage.getBGMVolume()

        const volumeSE = container.querySelector<HTMLInputElement>(".volume-se")!

        volumeSE.oninput = () => {
            SE.setVolume(+volumeSE.value)
            // SE.ok.play()
            LocalStorage.setSEVolume(+volumeSE.value)
        }

        volumeSE.value = "" + LocalStorage.getSEVolume()
        SE.setVolume(LocalStorage.getSEVolume())

        container.querySelector<HTMLButtonElement>("#delete-data")!.onclick = () => {
            const confirmed = window.confirm("ほんとに?")

            if (confirmed) {
                localStorage.clear()
                Scenes.goto(() => new SceneTitle("#title"))
            }
        }
    }
}
