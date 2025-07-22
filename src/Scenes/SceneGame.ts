import { Cells } from "../game/Cells.js"
import { stages } from "../game/Stage.js"
import { LocalStorage } from "../LocalStorage.js"
import { Awaits } from "../utils/Awaits.js"
import { page } from "../utils/Page.js"
import { Paint } from "../game/Paint.js"
import { BGM } from "../utils/BGM.js"

export class SceneGame {
    #cells: Cells
    #stageId: number
    #countDenominator: number
    #count: number = 0

    #dom!: SceneGameDom
    #paint = new Paint()

    ready: Promise<void>

    constructor(stageId: number, paint?: Paint) {
        this.#stageId = stageId
        const stage = stages[stageId]
        this.#cells = new Cells(stage)
        this.#cells.setBoard(stage)
        this.#countDenominator = this.#setupCountDenominator(stage.periods, stage.clicks)

        if (paint) {
            this.#paint = paint
            this.#paint.reset()
        }

        this.ready = this.#setup()

        this.#playBgm()
    }

    #setupCountDenominator(periods: number[], clicks: number[]) {
        const b = Array(periods.length).fill(0)

        clicks.forEach((n) => {
            b[n] += 1
        })

        return b.map((n, i) => (periods[i] - n) % periods[i]).reduce((sum, a) => sum + a)
    }

    async #setup() {
        await this.#loadPage()
        this.#initUI()
        this.#setupPaintButtons()
        this.#setupEventHandlers()
    }

    async #playBgm() {
        if (BGM.path === "./assets/sounds/野晒しの地獄.m4a") return

        await BGM.fadeOut(1000)
        await BGM.fetch("./assets/sounds/野晒しの地獄.m4a")
        await BGM.play()
    }

    async #loadPage() {
        const html = await fetch("pages/game.html", { cache: "no-store" }).then((res) => res.text())
        page(document.getElementById("container")!, "#game", html)

        this.#dom = new SceneGameDom()
    }

    #initUI() {
        this.#dom.middle.appendChild(this.#cells.cells)

        this.#count = 0
        this.#dom.count.textContent = `0/${this.#countDenominator}`

        const c = ["零", "一", "二", "三", "四", "五", "六"]

        this.#dom.stageId.textContent = `
            第${c[Math.floor(this.#stageId / 5)]}章 ${c[this.#stageId % 5]}幕
        `
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
            const { SceneTitle } = await import("./SceneTitle.js")

            await Awaits.fade(
                this.#dom.container,
                () => new SceneTitle("#title #stage-select #chapter" + Math.floor(this.#stageId / 5)).ready,
            )
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

            await Awaits.fade(this.#dom.container, () => new SceneGame(this.#stageId + 1).ready)
        }

        this.#dom.backChapterSelect.onclick = async () => {
            setData()

            const { SceneTitle } = await import("./SceneTitle.js")

            await Awaits.fade(this.#dom.container, () => new SceneTitle("#title #stage-select").ready)
        }
    }

    #onCellClick() {
        if (this.#cells.getBoardVector().every((c) => c === 0)) {
            ;(this.#stageId % 5 === 4 ? this.#dom.backChapterSelect : this.#dom.next).classList.add("visible")
            this.#cells.cells.classList.add("proof")
        }

        this.#count++
        this.#dom.count.textContent = `${this.#count}/${this.#countDenominator}`
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
