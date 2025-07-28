import { createSquareWeightMatrix } from "./game/Weight.js"
import { lcm } from "./utils/gcd.js"
import { solve } from "./utils/Solver.js"
import { Z } from "./utils/Zn.js"

const periods = [3, 3, 4, 4]
const wholePeriod = periods.reduce((a, b) => lcm(a, b), 1)

const Zn = Z(wholePeriod)

const A = createSquareWeightMatrix(1, 4, periods).map((row) => row.map((n) => new Zn(n)))

console.log(A.map((row) => row.map((n) => n.value)))

const b = [[0, 2, 0, 3]].flat(1).map((n) => new Zn(-n))

export const { x, H } = solve(A, b)

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
