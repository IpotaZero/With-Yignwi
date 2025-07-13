import { Stage } from "./Stage.js"

export class Cells {
    cells: HTMLElement = document.createElement("div")
    onclick = () => {}

    constructor(stage: Stage) {
        this.cells.classList.add("cells")
        this.#createCells(stage)
    }

    setBoard(stage: Stage) {
        stage.clicks.forEach((i) => {
            this.#onClickCell(i, stage.rows, stage.cols)
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

            cell.onclick = () => this.#onClickCell(index, stage.rows, stage.cols)
            cell.onmouseover = () => this.#onMouseOver(index, stage.rows, stage.cols)
            cell.ontouchstart = () => this.#onMouseOver(index, stage.rows, stage.cols)

            this.cells.appendChild(cell)
        })

        this.cells.onmouseout = () => {
            ;[...this.cells.children].forEach((cell) => cell.removeAttribute("data-hover"))
        }
    }

    #onClickCell(index: number, rows: number, cols: number) {
        const row = Math.floor(index / cols)
        const col = index % cols

        // 周囲三マス（自分＋上下左右）
        const deltas = this.#createDeltas()

        deltas.forEach(([dr, dc]) => {
            const r = row + dr
            const c = col + dc
            if (r >= 0 && r < rows && c >= 0 && c < cols) {
                const idx = r * cols + c
                const cellElem = this.cells.children[idx] as HTMLElement
                const valueElem = cellElem.querySelector<HTMLInputElement>('[name="value"]')!
                const period = +cellElem.querySelector<HTMLInputElement>('[name="period"]')!.value

                let value = parseInt(valueElem.value || "0", 10)
                value = (value + 1) % period

                valueElem.setAttribute("value", value.toString())

                valueElem.classList.remove("fade-in")
                requestAnimationFrame(() => {
                    valueElem.classList.add("fade-in")
                })
            }
        })

        this.onclick()
    }

    #onMouseOver(index: number, rows: number, cols: number) {
        const row = Math.floor(index / cols)
        const col = index % cols

        // 周囲三マス（自分＋上下左右）
        const deltas = this.#createDeltas()

        // まず全てのcellから "hover" クラスを外す
        ;(Array.from(this.cells.children) as HTMLElement[]).forEach((cell) => {
            cell.removeAttribute("data-hover")
        })

        // 周囲三マスだけ "hover" クラスを付与
        deltas.forEach(([dr, dc]) => {
            const r = row + dr
            const c = col + dc
            if (r >= 0 && r < rows && c >= 0 && c < cols) {
                const idx = r * cols + c
                const cellElem = this.cells.children[idx] as HTMLElement
                cellElem.dataset["hover"] = "1"
            }
        })
    }

    #createDeltas() {
        const deltas = []

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                deltas.push([i - 1, j - 1])
            }
        }

        return deltas
    }
}
