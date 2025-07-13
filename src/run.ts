import { SceneTitle } from "./Scenes/SceneTitle.js"
import { getKernel, LU, solveUx, mul, inv, createZeroMatrix, solve } from "./utils/Solver.js"
import { Z } from "./utils/Zn.js"

document.addEventListener("DOMContentLoaded", () => {
    new SceneTitle("#pretitle")
})

document.addEventListener("contextmenu", (e) => {
    e.preventDefault()
})

const Zn = Z(4)

const A = createWeightMatrix(4, 4).map((row) => row.map((n) => new Zn(n)))

const b = [
    [2, 3, 3, 2],
    [3, 1, 1, 3],
    [3, 1, 1, 3],
    [2, 3, 3, 2],
]
    .flat(1)
    .map((n) => new Zn(n))

const { x, H } = solve(A, b)

console.log(
    x?.map((n) => n.value),
    H,
)

const dimKer = H.length

// console.log(
//     [...getAllAnswer().map((n) => n.map((m) => m.value))].toSorted(
//         (a, b) => a.reduce((sum, n) => sum + n) - b.reduce((sum, n) => sum + n),
//     ),
// )

function* getAnswer() {
    if (x) {
    } else {
        return null
    }
}

function* createRecruitmentMap(dimKer: number) {
    for (let i = 0; i < 2 ** dimKer; i++) {
        yield createRecruitment(i, dimKer)
    }
}

function createRecruitment(index: number, length: number) {
    return [...index.toString(2).padStart(length, "0")].map((n) => n === "1")
}

function createWeightMatrix(rows: number, cols: number) {
    const A: number[][] = []

    for (const r of Array(rows).keys()) {
        for (const c of Array(cols).keys()) {
            const board = createZeroMatrix(rows, cols)

            for (const dr of Array(3).keys()) {
                for (const dc of Array(3).keys()) {
                    const targetR = r + dr - 1
                    const targetC = c + dc - 1

                    if (0 <= targetR && targetR < rows && 0 <= targetC && targetC < cols) {
                        board[targetR][targetC] = 1
                    }
                }
            }

            A.push(board.flat(1))
        }
    }

    return A
}

const img = document.createElement("img")
img.src = "assets/images/maple.png"

document.addEventListener("touchstart", (e) => {
    const rect = (e.target as Element).getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const y = e.touches[0].clientY - rect.top

    for (let i = 0; i < 8; i++) {
        const particle = img.cloneNode() as HTMLImageElement
        particle.style.position = "absolute"
        particle.style.pointerEvents = "none"
        particle.style.left = `calc(${rect.left + x}px - 4vh)`
        particle.style.top = `calc(${rect.top + y}px - 4vh)`
        particle.style.width = "8vh"
        particle.style.height = "8vh"
        particle.style.opacity = "" + Math.random() * 0.5
        particle.style.transition = "transform 1s ease-out, opacity 1s ease-out"
        particle.style.zIndex = "1000"
        particle.style.filter = ""
        document.body.appendChild(particle)

        const angle = (Math.PI * 2 * i) / 8 + Math.random()
        const distance = 60 + Math.random() * 20
        requestAnimationFrame(() => {
            particle.style.transform = `translate(${(Math.cos(angle) * distance) / 8}vh, ${
                (Math.sin(angle) * distance) / 8
            }vh) scale(0.5) rotate(${(angle / Math.PI) * 180 * (Math.random() - 0.5)}deg)`
            particle.style.opacity = "0"
        })

        setTimeout(() => {
            particle.remove()
        }, 1000)
    }
})
