import { createSquareWeightMatrix, transpose } from "../game/Weight"
import { Fraction } from "./Fraction"
import { gcd, lcm } from "./gcd"
import { loop } from "./Loop"
import { Mat } from "./Mat"
import { Z } from "./Zn"

const period = 12
const Zn = Z(period)

type Z = InstanceType<typeof Zn>

const mat = createSquareWeightMatrix(4, 4, [1, 2, 2, 1, 2, 3, 3, 2, 2, 3, 3, 2, 1, 2, 2, 1])
// const mat = createSquareWeightMatrix(1, 4, [3, 3, 4, 4])

const A = new Mat(
    period,
    mat.map((row) => row.map((n) => new Zn(n))),
)

A.simplification()

const mat2 = createSquareWeightMatrix(
    4,
    4,
    [1, 2, 2, 1, 2, 3, 3, 2, 2, 3, 3, 2, 1, 2, 2, 1],
    [0, 0, 3, 0, 3, 0, 4, 3, 0, 0, 4, 0, 0, 3, 0, 0],
)

// const mat2 = createSquareWeightMatrix(1, 4, [3, 3, 4, 4], [0, 4, 0, 3])

const B = new Mat(
    period,
    mat2.map((row) => row.map((n) => new Zn(n))),
)

console.log("元の行列:")
console.log(B.toString())

B.simplification()
// B.simplification()
// B.simplification()

console.log("簡約化後:")
console.log(B.toString())
;(window as any).B = B

const ker = A.getKernelBases()

console.log(ker.map((row) => row.map((n) => n.toString()).join("\t")).join("\n"))
console.log(ker.map((row) => row.map((n) => n.p % period).join("\t")).join("\n"))

const xp = B.getParticularSolution()
console.log(xp?.map((n) => n.toString())?.join("\t"))

// const xp = [0, 1, 5, 0, 2, 2, 4, 0, 5, 2, 0, 0, 0, 0, 0, 0].map((n) => new Zn(n))

// const periods = ker.map((base) => {
//     const l = base.filter((n) => n.p !== 0).reduce((l, b) => gcd(l, b.p), period)
//     return period / l
// })

// console.log(periods)

// let min = xp
// let minNorm = Infinity

// loop(periods, (x) => {
//     const sum = ker.reduce((s, base, i) => {
//         const b2 = base.map((n) => new Zn(n.p).mul(new Zn(x[i])))
//         s.map((n, i) => n.add(b2[i]))

//         return s
//     }, xp)

//     const norm = sum.reduce((s, n) => s + n.value, 0)

//     if (minNorm > norm) {
//         minNorm = norm
//         min = sum
//     }
// })

export const result = A.toString()
// console.log(result)
