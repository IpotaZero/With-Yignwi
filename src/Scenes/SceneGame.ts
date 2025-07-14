import { Cells } from "../game/Cells.js"
import { stages } from "../game/Stage.js"
import { LocalStorage } from "../LocalStorage.js"
import { Awaits } from "../utils/Awaits.js"
import { page } from "../utils/Page.js"
import { SceneTitle } from "./SceneTitle.js"

export class SceneGame {
    #sample: Cells
    #cells: Cells
    #stageId: number
    #countDenominator: number
    #count: number = 0
    #container: HTMLElement
    #countDiv!: HTMLElement
    #answer!: string
    #cvs = document.createElement("canvas")
    #ctx = this.#cvs.getContext("2d")!

    constructor(stageId: number) {
        this.#stageId = stageId
        const stage = stages[stageId]

        this.#sample = new Cells(stage)
        this.#cells = new Cells(stage)

        this.#sample.setPointerEventsNone()
        this.#sample.setBoard(stage)

        this.#countDenominator = stage.clicks.length

        this.#container = document.getElementById("container")!
        this.#setup()
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
        gameElem.appendChild(this.#sample.cells)
        gameElem.appendChild(this.#cells.cells)
    }

    #cacheElements() {
        this.#countDiv = this.#container.querySelector("#count")!
        this.#answer = this.#sample.getBoardVector().join(",")
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
        this.#container.appendChild(this.#cvs)

        let drawing = false
        let lastX = 0
        let lastY = 0

        const resizeCanvas = () => {
            this.#cvs.width = this.#container.clientWidth
            this.#cvs.height = this.#container.clientHeight
        }

        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        const getPos = (e: MouseEvent | TouchEvent) => {
            const rect = this.#cvs.getBoundingClientRect()
            if (e instanceof TouchEvent) {
                const touch = e.touches[0] || e.changedTouches[0]
                return {
                    x: touch.clientX - rect.left,
                    y: touch.clientY - rect.top,
                }
            } else {
                return {
                    x: (e as MouseEvent).clientX - rect.left,
                    y: (e as MouseEvent).clientY - rect.top,
                }
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

        const stopDrawing = () => {
            drawing = false
        }

        // Mouse events
        this.#cvs.addEventListener("mousedown", (e) => {
            const pos = getPos(e)
            startDrawing(pos.x, pos.y)
        })

        this.#cvs.addEventListener("mousemove", (e) => {
            const pos = getPos(e)
            drawLine(pos.x, pos.y, 4)
        })

        this.#cvs.addEventListener("mouseup", stopDrawing)
        this.#cvs.addEventListener("mouseleave", stopDrawing)

        // Touch events
        this.#cvs.addEventListener(
            "touchstart",
            (e) => {
                const pos = getPos(e)
                startDrawing(pos.x, pos.y)
            },
            { passive: false },
        )

        this.#cvs.addEventListener(
            "touchmove",
            (e) => {
                if (!drawing) return
                e.preventDefault()
                const pos = getPos(e)
                drawLine(pos.x, pos.y, 3)
            },
            { passive: false },
        )

        this.#cvs.addEventListener("touchend", stopDrawing)
        this.#cvs.addEventListener("touchcancel", stopDrawing)
    }

    #setupPaintButtons() {
        const paint = this.#container.querySelector<HTMLElement>("#paint")!
        const click = this.#container.querySelector<HTMLElement>("#click")!
        const erase = this.#container.querySelector<HTMLElement>("#erase")!

        const toggle = () => {
            this.#cvs.classList.toggle("touchable")
            paint.classList.toggle("hidden")
            click.classList.toggle("hidden")
        }

        paint.onclick = toggle
        click.onclick = toggle

        erase.onclick = () => this.#ctx.clearRect(0, 0, this.#cvs.width, this.#cvs.height)
    }

    #setupEventHandlers() {
        this.#cells.onclick = () => this.#onCellClick()

        this.#container.querySelector<HTMLElement>(".back")!.onclick = async () => {
            await Awaits.fade(this.#container)
            new SceneTitle("#title #stage-select #chapter" + Math.floor(this.#stageId / 5))
        }

        this.#container.querySelector<HTMLElement>(".reset")!.onclick = () => {
            new SceneGame(this.#stageId)
        }

        this.#container.querySelector<HTMLElement>("#next button")!.onclick = async () => {
            LocalStorage.setData(this.#stageId, {
                cleared: true,
                leastCleared: stages[this.#stageId].clicks.length === this.#count,
            })
            await Awaits.fade(this.#container)
            new SceneGame(this.#stageId + 1)
        }
    }

    #onCellClick() {
        if (this.#cells.getBoardVector().join(",") === this.#answer) {
            this.#container.querySelector("#next")!.classList.add("visible")
        }

        this.#count++
        this.#countDiv.textContent = `${this.#count}/${this.#countDenominator}`
    }
}
