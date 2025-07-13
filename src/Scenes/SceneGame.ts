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
