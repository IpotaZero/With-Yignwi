import { SceneTitle } from "./Scenes/SceneTitle.js"
import { getKernel, LU, solverUx, mul } from "./utils/Solver.js"
import { Z } from "./utils/Zn.js"

document.addEventListener("DOMContentLoaded", () => {
    new SceneTitle("#title")
})

document.addEventListener("contextmenu", (e) => {
    e.preventDefault()
})

const Z8 = Z(8)

const A = [
    [0, 1, 2],
    [3, 4, 4],
    [6, 7, 4],
].map((row) => row.map((n) => new Z8(n)))

const { L, U, P } = LU(A)

// const y = [new (Z(8))(0), new (Z(8))(0), new (Z(8))(0)]

// console.log(solverUx(U, y))

const H = getKernel(U)

console.log(A.map((row) => row.map((n) => n.toString()).join("\t")).join("\n"))
console.log(U.map((row) => row.map((n) => n.toString()).join("\t")).join("\n"))
// console.log(L.map((row) => row.map((n) => n.toString()).join("\t")).join("\n"))
// console.log(P)
console.log(H.map((row) => row.map((n) => n.toString()).join("\t")).join("\n"))
console.log(
    mul(U, H[0])
        .map((n) => n.toString())
        .join("\n"),
)
