import { Stage } from "./Stage.js"

export class Cells {
    cells: HTMLElement = document.createElement("div")
    onclick = () => {}

    #weight: number[][]

    constructor(stage: Stage) {
        this.#weight = stage.weight()

        this.cells.classList.add("cells")
        this.#createCells(stage)
    }

    setBoard(stage: Stage) {
        stage.clicks.forEach((i) => {
            this.#onClickCell(i)
        })
    }

    getBoardVector() {
        return [...this.cells.children]
            .map((cell) => cell.querySelector<HTMLInputElement>('[name="value"]')!)
            .map((valueElm) => valueElm.value)
            .map(Number)
    }

    setPointerEventsNone() {
        this.cells.style.pointerEvents = "none"
    }

    #createCells(stage: Stage) {
        this.cells.style.gridTemplateRows = `repeat(${stage.rows}, 1fr)`
        this.cells.style.gridTemplateColumns = `repeat(${stage.cols}, 1fr)`

        stage.periods.forEach((period, index) => {
            const cell = document.createElement("span")
            cell.className = "cell"
            cell.innerHTML = `
                <input name="period" value="${period}" />
                <input name="value" value="0" />
            `

            cell.onclick = () => this.#onClickCell(index)
            cell.onmouseover = () => this.#onMouseOver(index)
            cell.ontouchstart = () => this.#onMouseOver(index)
            cell.ontouchmove = () => this.#onMouseOver(index)

            this.cells.appendChild(cell)
        })

        this.cells.onmouseout = () => {
            ;[...this.cells.children].forEach((cell) => cell.removeAttribute("data-hover"))
        }
    }

    #onClickCell(index: number) {
        ;(Array.from(this.cells.children) as HTMLElement[]).forEach((cellElem, i) => {
            const weight = this.#weight[index][i]

            if (weight === 0) return

            const valueElem = cellElem.querySelector<HTMLInputElement>('[name="value"]')!
            const period = +cellElem.querySelector<HTMLInputElement>('[name="period"]')!.value

            let value = parseInt(valueElem.value || "0", 10)
            value = (value + 1) % period

            valueElem.setAttribute("value", value.toString())

            valueElem.classList.remove("fade-in")
            requestAnimationFrame(() => {
                valueElem.classList.add("fade-in")
            })
        })

        this.onclick()
    }

    #onMouseOver(index: number) {
        // まず全てのcellから "hover" クラスを外す
        ;(Array.from(this.cells.children) as HTMLElement[]).forEach((cell) => {
            cell.removeAttribute("data-hover")
        })
        ;(Array.from(this.cells.children) as HTMLElement[]).forEach((cell, i) => {
            const weight = this.#weight[index][i]
            weight !== 0 && (cell.dataset["hover"] = "" + weight)
        })
    }
}
