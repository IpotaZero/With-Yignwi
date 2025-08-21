import { Dom } from "../Dom.js"
import { setupParticle } from "../Particles.js"
import { Awaits } from "../utils/Awaits.js"
import { BGM } from "../utils/BGM.js"
import { page } from "../utils/Page.js"
import { Scene } from "./Scene.js"
import { Scenes } from "./Scenes.js"

export class SceneNovel extends Scene {
    ready: Promise<void>

    constructor(index: number, from?: string) {
        super()

        this.ready = this.#loadPage(index, from)

        this.#playBgm(index)
    }

    #playBgm(index: number) {
        if (index === 6) {
            this.#lastBgm()
        } else if (index === 7) {
            this.#omakeBgm()
        } else {
            this.#normalBgm()
        }
    }

    async #loadPage(index: number, from?: string) {
        const container = Dom.container

        const html = await fetch("pages/novel.html", { cache: "no-store" }).then((res) => res.text())
        page(container, "#chapter" + index, html)

        container.querySelectorAll<HTMLElement>(".page").forEach(setupParticle)

        container.querySelectorAll<HTMLElement>(".back").forEach((button) => {
            button.onclick = async () => {
                const { SceneTitle } = await import("./SceneTitle.js")

                if (index === 6) {
                    if (from === "game") {
                        await Scenes.goto(() => new SceneTitle("#title"))
                    } else {
                        await Scenes.goto(() => new SceneTitle("#title #stage-select #chapter5"))
                    }
                    return
                }

                if (index === 7) {
                    await Scenes.goto(() => new SceneTitle("#title"))
                    return
                }

                await Scenes.goto(() => new SceneTitle("#title #stage-select #chapter" + index))
            }
        })
    }

    #normalBgm() {
        BGM.ffp("assets/sounds/一切れの諧謔.mp3", { loopStartS: 1.82, loopEndS: 130.625 })
    }

    #lastBgm() {
        BGM.ffp("assets/sounds/ちっぽけな煌めき.mp3", { loopStartS: 0, loopEndS: 70.588, when: 1 })
    }

    #omakeBgm() {
        BGM.ffp("assets/sounds/頽れた星.mp3", { loopStartS: 0, loopEndS: 77.419, when: 1 })
    }
}

// ジャンル：コズミックホラー
// 大正時代
// ある高校生の日記
// 亜米利加からの留学生の「ゆぃぐぬぃ(Yignwi)」との物語
// 高校は男子しかいない→Yignwiは紅一点
// 主人公はYignwiのことが少し気になっているが、話しかけたことはない
// ある日、授業終わりにYignwiが机に紙を忘れていった
// 追いかけて渡そうとしたがすでにいなかった
// 紙には謎解きが書かれてあった
// 主人公はそれを解いて次の日Yignwiにさりげなく渡した
// Yignwiはそれを見て主人公に微笑んだ
// Yignwiが笑うのを見たのは初めてだった
