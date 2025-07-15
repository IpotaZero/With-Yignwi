import { createZeroMatrix, createUnitMatrix } from "../game/Weight.js"
import { Z } from "./Zn.js" // Adjust the path as needed

type Zn<N extends number> = InstanceType<ReturnType<typeof Z<N>>>

export function solve<N extends number>(A: Zn<N>[][], b: Zn<N>[]) {
    const { L, U, P } = LU(A)

    const invL = inv(L)

    const y = mul(
        invL,
        P.map((i) => b[i]),
    )

    const x = solveUx(U, y)

    const H = getKernel(U)

    return {
        x,
        H,
    }
}

export function LU<N extends number>(A: Zn<N>[][]) {
    const period = A[0][0].period

    /**行数 */
    const m = A.length
    /**列数 */
    const n = A[0].length
    /**単位下三角 */
    const L = createZeroMatrix(m, m).map((row) => row.map((n) => new (Z(period))(n)))
    /**上三角 */
    const U = A.map((row) => row.slice())
    /**pivot */
    const P = [...Array(m).keys()] // Pivot tracking

    let g = 0

    // console.log(A.map((row) => row.join("\t")).join("\n"))

    for (let k = 0; k < n; k++) {
        // console.log(`${k}列目開始`)

        // Find pivot
        // k-g行以降で主成分がある行を探す
        let pivot = U.slice(k - g).findIndex((row) => row[k].inv()) + k - g

        if (pivot === -1 + k - g) {
            pivot = U.slice(k - g).findIndex((row) => row[k].value !== 0) + k - g
        }

        // 見つからなかったら
        if (pivot === -1 + k - g) {
            // console.log(`${k - g}行目以降にpivotを発見できなかったにゃ。。。`)

            g++

            continue
        }

        // console.log(`${pivot}行目${k}列目にpivotを発見`)

        // Swap rows if needed
        if (pivot !== k - g) {
            // console.log(`${k - g}行と${pivot}行を入れ替え`)
            ;[U[k - g], U[pivot]] = [U[pivot], U[k - g]]
            ;[L[k - g], L[pivot]] = [L[pivot], L[k - g]]
            ;[P[k - g], P[pivot]] = [P[pivot], P[k - g]]
        }

        // 簡約化していく
        for (let i = k - g + 1; i < m; i++) {
            // 同じ列で0でないものを持つ行を探す
            if (U[i][k].value === 0) continue

            // console.log(`${i}行目から${k - g}行目を${scalar}倍して引く`)
            if (U[k - g][k].inv()) {
                const scalar = U[i][k].mul(U[k - g][k].inv()!)

                L[i][k - g] = scalar

                const Ukg = U[k - g].map((n) => n.mul(scalar))

                // i行目からk-g行目を引く
                for (let j = k; j < n; j++) {
                    U[i][j] = U[i][j].sub(Ukg[j])
                }
            } else if (U[i][k].value === U[k - g][k].value) {
                const scalar = U[i][k]

                L[i][k - g] = scalar

                const Ukg = U[k - g]

                // i行目からk-g行目を引く
                for (let j = k; j < n; j++) {
                    U[i][j] = U[i][j].sub(Ukg[j])
                }
            }

            // console.log(`U[${i}]:\t` + U[i].join("\t"))
        }
    }

    L.forEach((row, i) => {
        row[i] = new (Z(A[0][0].period))(1)
    })

    // console.assert(this.#checkUpperTri(U), "上三角じゃあないにゃ！", U)
    // console.assert(this.#checkUnitLowerTri(L), "単位下三角じゃあないにゃ！", L)

    // console.log(U.map((row) => row.join("\t")).join("\n"))
    // console.log(L.map((row) => row.join("\t")).join("\n"))
    // console.log(P.join("\t"))

    return { L, U, P }
}

export function solveUx<N extends number>(U: Zn<N>[][], y: Zn<N>[]) {
    const period = U[0][0].period
    const Zn = Z(period)

    const n = y.length
    const x: Zn<N>[] = Array(n).fill(new Zn(0))

    const rows = [...Array(n).keys()].toReversed()

    // 下から見ていく
    for (const m of rows) {
        // console.log(`${m}行目開始`)

        const allZero = U[m].every((n) => !n.inv())

        if (allZero) {
            // console.log(`全て0なのでスキップ`)

            if (y[m].inv()) {
                // 解けない
                return null
            }

            continue
        }

        let g = 0

        while (!U[m][m + g].inv()) {
            g++
        }

        // console.log(`${m + g}列目にpivot発見`)

        const d = dot(U[m].slice(m + g), x.slice(m + g))

        x[m + g] = y[m].sub(d).mul(U[m][m + g].inv()!)
        // console.log(`x[${m + g}]=${x[m + g]}`)
    }

    return x
}

export function mul<N extends number>(A: Zn<N>[][], x: Zn<N>[]) {
    return A.map((row) => dot(row, x))
}

export function inv<N extends number>(L: Zn<N>[][]) {
    const n = L.length

    const period = L[0][0].period

    // 単位行列
    const invL = createUnitMatrix(n, n).map((row) => row.map((n) => new (Z(period))(n)))

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            const sum = dot(
                L[i].slice(j),
                invL.slice(j).map((row) => row[j]),
            )

            invL[i][j] = sum.mul(new (Z(period))(-1))
        }
    }

    return invL
}

function dot<N extends number>(x: Zn<N>[], y: Zn<N>[]) {
    if (x.length !== y.length) {
        throw TypeError("長さを同じにしろ！")
    }

    const period = x[0].period
    return x.reduce((sum, xi, i) => sum.add(xi.mul(y[i])), new (Z(period))(0))
}

export function getKernel<N extends number>(U: Zn<N>[][]): Zn<N>[][] {
    const period = U[0][0].period
    const Zn = Z(period)

    // console.log(U.map((row) => row.join("\t")).join("\n"))

    const rank = U.filter((row) => row.some((n) => n.inv())).length

    // console.log(rank)

    const m = U.length
    const n = U[0].length
    const pivotCols: number[] = []
    const isPivot = Array(n).fill(false)

    // ステップ1: ピボット列を探す
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (U[i][j].inv() && !isPivot[j]) {
                pivotCols.push(j)
                isPivot[j] = true
                break
            }
        }
    }

    // console.log(pivotCols)

    // ステップ2: 自由変数の列インデックスを取得
    const freeCols: number[] = []
    for (let j = 0; j < n; j++) {
        if (!isPivot[j]) freeCols.push(j)
    }

    // ステップ3: 各自由変数に対して基底ベクトルを構成
    const basis: Zn<N>[][] = []

    for (const freeCol of freeCols) {
        const x = Array.from({ length: n }, () => new Zn(0))
        x[freeCol] = new Zn(1)

        // 後退代入
        for (let i = m - 1; i >= 0; i--) {
            let sum = new Zn(0)
            let pivot = -1

            for (let j = 0; j < n; j++) {
                if (U[i][j].inv()) {
                    if (pivot === -1) pivot = j
                    else sum = sum.add(U[i][j].mul(x[j]))
                }
            }

            if (pivot !== -1 && !freeCols.includes(pivot)) {
                x[pivot] = sum.mul(new Zn(-1))
            }
        }

        basis.push(x)
    }

    console.assert(n - basis.length === rank, "次元定理に矛盾するにゃ！")

    return basis
}
