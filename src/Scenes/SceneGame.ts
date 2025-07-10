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

    constructor(stageId: number) {
        this.#stageId = stageId

        const stage = stages[stageId]

        this.#sample = new Cells(stage)
        this.#cells = new Cells(stage)

        this.#sample.setPointerEventsNone()
        this.#sample.setBoard(stage)

        this.#countDenominator = stage.clicks.length

        this.#setup()
    }

    async #setup() {
        await this.#loadPage()
        await this.#setupButtons()
    }

    async #loadPage() {
        const container = document.getElementById("container")!

        const html = await fetch("pages/game.html").then((response) => response.text())
        page(container, "#game", html)

        container.querySelector("#game")!.appendChild(this.#sample.cells)
        container.querySelector("#game")!.appendChild(this.#cells.cells)
    }

    async #setupButtons() {
        const container = document.getElementById("container")!

        const answer = this.#sample.getBoardVector().join(",")

        const countDiv = container.querySelector("#count")!
        countDiv.textContent = `0/${this.#countDenominator}`

        let count = 0

        this.#cells.onclick = () => {
            if (this.#cells.getBoardVector().join(",") === answer) {
                container.querySelector(".next")!.classList.add("visible")
            }

            count++
            countDiv.textContent = `${count}/${this.#countDenominator}`
        }

        container.querySelector<HTMLElement>(".back")!.onclick = async () => {
            await Awaits.fade(container)
            new SceneTitle("#title")
        }

        container.querySelector<HTMLElement>(".reset")!.onclick = () => {
            new SceneGame(this.#stageId)
        }

        container.querySelector<HTMLElement>(".next")!.onclick = async () => {
            LocalStorage.setData(this.#stageId, {
                cleared: true,
                leastCleared: stages[this.#stageId].clicks.length === count,
            })

            await Awaits.fade(container)
            new SceneGame(this.#stageId + 1)
        }
    }
}
