import { setupParticle } from "../run"
import { Awaits } from "../utils/Awaits"
import { page } from "../utils/Page"
import { SceneTitle } from "./SceneTitle"

export class SceneNovel {
    ready: Promise<void>

    constructor(index: number) {
        this.ready = this.#loadPage(index)
    }

    async #loadPage(index: number) {
        const container = document.getElementById("container")!

        const html = await fetch("pages/novel.html").then((res) => res.text())
        page(container, "#chapter" + index, html)

        container.querySelectorAll<HTMLElement>(".page").forEach(setupParticle)

        container.querySelectorAll<HTMLElement>(".back").forEach((button) => {
            button.onclick = async () => {
                await Awaits.fadeOut(container)
                new SceneTitle("#title #stage-select #chapter" + index)
            }
        })
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
const stories = [``]
