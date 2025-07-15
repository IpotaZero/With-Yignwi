import { Cells } from "../game/Cells.js"
import { stages } from "../game/Stage.js"
import { LocalStorage } from "../LocalStorage.js"
import { Awaits } from "../utils/Awaits.js"
import { page } from "../utils/Page.js"
import { SceneTitle } from "./SceneTitle.js"

export class SceneGame {
    #cells: Cells
    #stageId: number
    #countDenominator: number
    #count: number = 0
    #container: HTMLElement
    #countDiv!: HTMLElement

    #paint = new Paint()

    ready: Promise<void>

    constructor(stageId: number, paint?: Paint) {
        this.#stageId = stageId
        const stage = stages[stageId]

        paint && (this.#paint = paint)

        this.#cells = new Cells(stage)
        this.#cells.setBoard(stage)

        this.#countDenominator = this.#setupCountDenominator(stage.periods, stage.clicks)

        this.#container = document.getElementById("container")!
        this.ready = this.#setup()
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
        this.#cacheElements()
        this.#initUI()
        this.#setupCanvas()
        this.#setupPaintButtons()
        this.#setupEventHandlers()
    }

    async #loadPage() {
        const html = await fetch("pages/game.html").then((res) => res.text())
        page(this.#container, "#game", html)

        const gameElem = this.#container.querySelector("#game #middle")!
        gameElem.appendChild(this.#cells.cells)
    }

    #cacheElements() {
        this.#countDiv = this.#container.querySelector("#count")!
    }

    #initUI() {
        this.#count = 0
        this.#countDiv.textContent = `0/${this.#countDenominator}`
        this.#container.querySelector(".next")?.classList.remove("visible")

        const c = ["零", "一", "二", "三", "四"]

        this.#container.querySelector("#stage-id")!.textContent = `第${c[Math.floor(this.#stageId / 5)]}章 ${
            c[this.#stageId % 5]
        }幕`
    }

    #setupCanvas() {
        this.#container.appendChild(this.#paint.getCvs())
        this.#container.appendChild(this.#paint.eraser)
    }

    #setupPaintButtons() {
        const click = this.#container.querySelector<HTMLElement>("#click")!
        const paint = this.#container.querySelector<HTMLElement>("#paint")!
        const erase = this.#container.querySelector<HTMLElement>("#erase")!
        const eraseAll = this.#container.querySelector<HTMLElement>("#erase-all")!

        const buttons = [click, paint, erase]

        click.onclick = () => {
            this.#paint.getCvs().classList.remove("touchable")
            buttons.forEach((b, i) => b.classList.toggle("on", i === 0))
            this.#paint.eraser.classList.add("hidden")
        }

        paint.onclick = () => {
            this.#paint.getCvs().classList.add("touchable")
            buttons.forEach((b, i) => b.classList.toggle("on", i === 1))
            this.#paint.setMode("paint")
            this.#paint.eraser.classList.add("hidden")
        }

        erase.onclick = () => {
            this.#paint.getCvs().classList.add("touchable")
            buttons.forEach((b, i) => b.classList.toggle("on", i === 2))
            this.#paint.setMode("erase")
            this.#paint.eraser.classList.remove("hidden")
        }

        eraseAll.onclick = () => this.#paint.clear()
    }

    #setupEventHandlers() {
        this.#cells.onclick = () => this.#onCellClick()

        this.#container.querySelector<HTMLElement>(".back")!.onclick = async () => {
            await Awaits.fadeOut(this.#container)
            new SceneTitle("#title #stage-select #chapter" + Math.floor(this.#stageId / 5))
        }

        this.#container.querySelector<HTMLElement>(".reset")!.onclick = () => {
            new SceneGame(this.#stageId, this.#paint)
        }

        this.#container.querySelector<HTMLElement>("#next button")!.onclick = async () => {
            LocalStorage.setData(this.#stageId, {
                cleared: true,
                leastCleared: stages[this.#stageId].clicks.length === this.#count,
            })

            await Awaits.fade(this.#container, () => new SceneGame(this.#stageId + 1).ready)
        }
    }

    #onCellClick() {
        if (this.#cells.getBoardVector().every((c) => c === 0)) {
            this.#container.querySelector("#next")!.classList.add("visible")
            this.#cells.cells.classList.add("proof")
        }

        this.#count++
        this.#countDiv.textContent = `${this.#count}/${this.#countDenominator}`
    }
}

class Paint {
    #cvs = document.createElement("canvas")
    #ctx = this.#cvs.getContext("2d")!

    eraser = document.createElement("span")

    #mode: "paint" | "erase" = "paint"

    constructor() {
        this.#setup()
        this.eraser.classList.add("eraser", "hidden")
    }

    getCvs() {
        return this.#cvs
    }

    clear() {
        this.#ctx.clearRect(0, 0, this.#cvs.width, this.#cvs.height)
    }

    setMode(mode: "paint" | "erase") {
        this.#mode = mode
    }

    #setup() {
        const container = document.getElementById("container")!

        let drawing = false
        let lastX = 0
        let lastY = 0

        const resizeCanvas = () => {
            this.#cvs.width = container.clientWidth
            this.#cvs.height = container.clientHeight
        }

        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        const getPos = (e: PointerEvent) => {
            const rect = this.#cvs.getBoundingClientRect()
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            }
        }

        const startDrawing = (x: number, y: number) => {
            drawing = true
            lastX = x
            lastY = y
        }

        const drawLine = (x: number, y: number, lineWidth: number) => {
            if (!drawing) return
            this.#ctx.beginPath()
            this.#ctx.imageSmoothingEnabled = false
            this.#ctx.lineWidth = lineWidth
            this.#ctx.strokeStyle = "#111"
            this.#ctx.moveTo(lastX, lastY)
            this.#ctx.lineTo(x, y)
            this.#ctx.stroke()
            lastX = x
            lastY = y
        }

        const erase = (x: number, y: number) => {
            if (!drawing) return
            const size = 24
            this.eraser.style.left = `${x - size / 2}px`
            this.eraser.style.top = `${y - size / 2}px`
            this.#ctx.clearRect(x - size / 2, y - size / 2, size, size)
        }

        const stopDrawing = () => {
            drawing = false
        }

        this.#cvs.addEventListener("pointerdown", (e: PointerEvent) => {
            const pos = getPos(e)
            startDrawing(pos.x, pos.y)
            this.#cvs.setPointerCapture(e.pointerId)
        })

        this.#cvs.addEventListener("pointermove", (e: PointerEvent) => {
            if (!drawing) return
            const pos = getPos(e)
            if (this.#mode === "paint") {
                drawLine(pos.x, pos.y, 4)
            } else {
                erase(pos.x, pos.y)
            }
        })

        this.#cvs.addEventListener("pointerup", (e: PointerEvent) => {
            stopDrawing()
            this.#cvs.releasePointerCapture(e.pointerId)
        })

        this.#cvs.addEventListener("pointercancel", (e: PointerEvent) => {
            stopDrawing()
            this.#cvs.releasePointerCapture(e.pointerId)
        })
    }
}
