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
        this.setMode("untouchable")
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
        this.#ctx.imageSmoothingEnabled = false

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

            this.#ctx.lineWidth = lineWidth
            this.#ctx.strokeStyle = "#111"

            this.#ctx.beginPath()
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

        const down = (e: PointerEvent) => {
            e.preventDefault()

            const pos = getPos(e)
            startDrawing(pos.x, pos.y)
        }

        this.#cvs.addEventListener("pointerdown", down)

        this.#cvs.addEventListener("pointermove", (e: PointerEvent) => {
            if (!drawing) return

            const pos = getPos(e)

            if (this.#mode === "paint") {
                drawLine(pos.x, pos.y, 4)
            } else {
                erase(pos.x, pos.y)
            }
        })

        const stopDrawing = (e: PointerEvent) => {
            drawing = false
        }

        this.#cvs.addEventListener("pointerup", stopDrawing)
        this.#cvs.addEventListener("pointercancel", stopDrawing)
    }
}
