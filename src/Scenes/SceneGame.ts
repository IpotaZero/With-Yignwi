import { Cells } from "../game/Cells.js"
import { stages } from "../game/Stage.js"
import { LocalStorage } from "../LocalStorage.js"
import { page } from "../utils/Page.js"
import { Paint } from "../game/Paint.js"
import { BGM } from "../utils/BGM.js"
import { Scene } from "./Scene.js"
import { Scenes } from "./Scenes.js"
import { Awaits } from "../utils/Awaits.js"
import { SE } from "../SE.js"

export class SceneGame extends Scene {
    #cells: Cells
    #stageId: number
    #countDenominator: number
    #count: number = 0

    #dom!: SceneGameDom
    #paint = new Paint()

    ready: Promise<void>

    constructor(stageId: number, paint?: Paint) {
        super()

        this.#stageId = stageId
        const stage = stages[stageId]
        this.#cells = new Cells(stage)
        this.#cells.setBoard(stage)
        // console.log(
        //     this.#cells
        //         .getBoardVector()
        //         .map((n) => -n)
        //         .join("\n"),
        // )

        this.#countDenominator = this.#cells.minStep

        if (paint) {
            this.#paint = paint
            this.#paint.reset()
        }

        this.ready = this.#setup()
    }

    async #playBgm() {
        await Awaits.sleep(1000)

        // console.log({ ...BGM })

        if (BGM.path !== "assets/sounds/野晒しの地獄.mp3") {
            await BGM.fadeOut(1000)
            await BGM.fetch("assets/sounds/野晒しの地獄.mp3")
            await BGM.play()
        }
    }

    async #setup() {
        await this.#loadPage()
        this.#initUI()
        this.#setupPaintButtons()
        this.#setupEventHandlers()

        this.#playBgm()
    }

    async #loadPage() {
        const html = await fetch("pages/game.html", { cache: "no-store" }).then((res) => res.text())
        page(document.getElementById("container")!, "#game", html)

        this.#dom = new SceneGameDom()
    }

    #initUI() {
        this.#dom.middle.appendChild(this.#cells.cells)

        this.#count = 0
        this.#setCount()

        const c = ["零", "一", "二", "三", "四"]

        const chapter = this.#stageId >= 25 ? "最終章" : `第${c[Math.floor(this.#stageId / 5)]}章`

        this.#dom.stageId.textContent = `${chapter} ${c[this.#stageId % 5]}幕`

        const data = LocalStorage.getData()[this.#stageId]
        if (data.leastCleared) {
            this.#dom.stageId.textContent += "★"
        } else if (data.cleared) {
            this.#dom.stageId.textContent += "☆"
        }
    }

    #setupPaintButtons() {
        for (const elm of Object.values(this.#paint.getElements())) {
            this.#dom.container.appendChild(elm)
        }

        const { click, paint, eraser, eraseAll } = this.#dom

        const buttons = [click, paint, eraser]

        click.onclick = () => {
            this.#paint.setMode("untouchable")
            buttons.forEach((b, i) => b.classList.toggle("on", i === 0))
        }

        paint.onclick = () => {
            this.#paint.setMode("paint")
            buttons.forEach((b, i) => b.classList.toggle("on", i === 1))
        }

        eraser.onclick = () => {
            this.#paint.setMode("erase")
            buttons.forEach((b, i) => b.classList.toggle("on", i === 2))
        }

        eraseAll.onclick = () => this.#paint.clear()
    }

    #setupEventHandlers() {
        this.#cells.onclick = () => this.#onCellClick()

        this.#dom.back.onclick = async () => {
            if (this.#cells.getBoardVector().every((c) => c === 0)) {
                setData()
            }

            const { SceneTitle } = await import("./SceneTitle.js")
            await Scenes.goto(() => new SceneTitle("#title #stage-select #chapter" + Math.floor(this.#stageId / 5)))
        }

        this.#dom.reset.onclick = () => {
            new SceneGame(this.#stageId, this.#paint)
        }

        const setData = () => {
            LocalStorage.setData(this.#stageId, {
                cleared: true,
                leastCleared: this.#countDenominator === this.#count,
            })
        }

        this.#dom.next.onclick = async () => {
            setData()
            await Scenes.goto(() => new SceneGame(this.#stageId + 1))
        }

        this.#dom.backChapterSelect.onclick = async () => {
            setData()

            const { SceneTitle } = await import("./SceneTitle.js")
            await Scenes.goto(() => new SceneTitle("#title #stage-select"))
        }

        this.#dom.toStory.onclick = async () => {
            setData()
            const { SceneNovel } = await import("./SceneNovel.js")
            await Scenes.goto(() => new SceneNovel(6, "game"))
        }
    }

    #onCellClick() {
        this.#count++
        this.#setCount()

        if (this.#cells.getBoardVector().every((c) => c === 0)) {
            this.#clearSE()

            this.#cells.cells.classList.add("proof")

            if (this.#stageId === 29) {
                this.#dom.toStory.classList.add("visible")
                return
            }

            if (this.#stageId % 5 === 4) {
                this.#dom.backChapterSelect.classList.add("visible")
                return
            }

            this.#dom.next.classList.add("visible")
        }
    }

    async #clearSE() {
        await BGM.fade(LocalStorage.getBGMVolume() / 4, 100)
        SE.clear.play()
        await Awaits.sleep(600)
        await BGM.fade(LocalStorage.getBGMVolume(), 500)
    }

    #setCount() {
        const d = Number.isFinite(this.#countDenominator) ? this.#countDenominator : "?"
        this.#dom.count.textContent = `${this.#count}/${d}`
    }
}

class SceneGameDom {
    container: HTMLElement

    count: HTMLElement
    stageId: HTMLElement

    back: HTMLElement
    reset: HTMLElement
    next: HTMLElement
    backChapterSelect: HTMLElement
    toStory: HTMLElement

    middle: HTMLElement

    click: HTMLElement
    paint: HTMLElement
    eraser: HTMLElement
    eraseAll: HTMLElement

    constructor() {
        this.container = document.getElementById("container")!
        this.count = this.container.querySelector("#count")!
        this.stageId = this.container.querySelector("#stage-id")!
        this.back = this.container.querySelector(".back")!
        this.reset = this.container.querySelector(".reset")!

        this.next = this.container.querySelector("#next .normal")!
        this.backChapterSelect = this.container.querySelector("#next .chapter-end")!
        this.toStory = this.container.querySelector("#next .to-story")!

        this.middle = this.container.querySelector("#middle")!
        this.click = this.container.querySelector("#click")!
        this.paint = this.container.querySelector("#paint")!
        this.eraser = this.container.querySelector("#eraser")!
        this.eraseAll = this.container.querySelector("#erase-all")!

        this.#check()
    }

    #check() {
        if (!Object.values(this).every(Boolean)) throw new Error("存在確認デキズ")
    }
}
