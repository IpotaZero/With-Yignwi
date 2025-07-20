export class Paint {
    readonly #cvs = document.createElement("canvas")
    readonly #ctx = this.#cvs.getContext("2d")!

    readonly #eraser = document.createElement("span")

    #mode: "paint" | "erase" | "untouchable" = "untouchable"

    constructor() {
        this.#setup()
        this.reset()
    }

    reset() {
        this.#mode = "untouchable"
        this.#eraser.classList.add("eraser", "hidden")
        this.#cvs.classList.add("untouchable")
    }

    getElements() {
        return { cvs: this.#cvs, eraser: this.#eraser }
    }

    clear() {
        this.#ctx.clearRect(0, 0, this.#cvs.width, this.#cvs.height)
    }

    setMode(mode: "paint" | "erase" | "untouchable") {
        this.#mode = mode
        this.#eraser.classList.toggle("hidden", mode !== "erase")
        this.#cvs.classList.toggle("untouchable", mode === "untouchable")
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
            this.#eraser.style.left = `${x - size / 2}px`
            this.#eraser.style.top = `${y - size / 2}px`
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
