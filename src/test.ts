import { solve, createZeroMatrix } from "./utils/Solver.js"
import { Z } from "./utils/Zn.js"

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
