import { Fraction } from "./Fraction"
import { lcm } from "./gcd"
import { Z } from "./Zn"

type Zn = InstanceType<ReturnType<typeof Z>>

export class Mat {
    readonly rows
    readonly cols

    readonly period: number
    readonly Zn: ReturnType<typeof Z>

    constructor(period: number, public m: InstanceType<ReturnType<typeof Z>>[][]) {
        this.period = period
        this.Zn = Z(period)

        this.rows = m.length
        this.cols = m[0].length
    }

    getParticularSolution() {
        const p = this.#getPivots()

        const xp: Fraction[] = Array(this.cols - 1).fill(Fraction.zero)

        for (const [row, col] of p.pivots.toReversed()) {
            if (col === this.cols) return null

            const aug = new Fraction(this.m[row][this.cols - 1].value)
            const pivot = new Fraction(this.m[row][col].value)

            const m = this.m[row].slice(col, this.cols - 1).map((n) => new Fraction(n.value))
            const n = xp.slice(col, this.cols - 1)

            // console.log(m, n)

            xp[col] = aug.sub(Mat.dot(m, n)).div(pivot)
        }

        return xp
    }

    getKernelBases() {
        const p = this.#getPivots()

        const bases: Fraction[][] = []

        bases.push(...this.#getArbitrariesBases(p.arbitraries))
        bases.push(...this.#getIrreversibleBases(p.irreversible))

        return bases

        // return bases.map((row) => {
        //     const l = row.reduce((l, n) => lcm(l, n.q), 1)

        //     return row.map((n) => n.mul(new Fraction(l ** 2)).p % this.period)
        // })
    }

    #getIrreversibleBases(irreversible: [number, number][]) {
        const bases: Fraction[][] = []

        irreversible.toReversed().forEach(([rows, col]) => {
            const base: Fraction[] = Array(this.cols).fill(Fraction.zero)

            base[col] = new Fraction(this.period, this.m[rows][col].value)

            // console.log(rows, col)
            // console.log(base.map((n) => n.toString()))

            this.m.toReversed().forEach((row, i) => {
                if (i < this.rows - rows) return

                if (row[col].value === 0) return

                const pivotCol = row.findIndex((n) => n.value !== 0)

                const m = row
                    .slice(pivotCol + 1)
                    .map((n) => n.mul(new this.Zn(-1)))
                    .map((n) => new Fraction(n.value))
                const n = base.slice(pivotCol + 1)

                const dot = Mat.dot(m, n)

                const pivot = new Fraction(row[pivotCol].value)

                base[pivotCol] = dot.mul(pivot.inv())
            })

            bases.push(base)
        })

        return bases
    }

    #getArbitrariesBases(arbitraries: number[]) {
        const bases: Fraction[][] = []

        arbitraries.toReversed().forEach((col) => {
            const base: Fraction[] = Array(this.cols).fill(Fraction.zero)

            base[col] = Fraction.one

            this.m.toReversed().forEach((row) => {
                if (row[col].value === 0) return

                const pivotCol = row.findIndex((n) => n.value !== 0)

                const m = row
                    .slice(pivotCol + 1)
                    .map((n) => n.mul(new this.Zn(-1)))
                    .map((n) => new Fraction(n.value))
                const n = base.slice(pivotCol + 1)

                const dot = Mat.dot(m, n)

                const pivot = new Fraction(row[pivotCol].value)

                base[pivotCol] = dot.mul(pivot.inv())
            })

            bases.push(base)
        })

        return bases
    }

    static dot(a: Fraction[], b: Fraction[]) {
        if (a.length !== b.length) throw TypeError("長さ同じにしろ！")

        const l = a.length

        let sum = Fraction.zero

        for (let i = 0; i < l; i++) {
            const m = a[i].mul(b[i])
            sum = sum.add(m)
        }

        return sum
    }

    #getPivots(): { pivots: [number, number][]; arbitraries: number[]; irreversible: [number, number][] } {
        const pivots: [number, number][] = []
        const irreversible = []

        for (let row = 0; row < this.rows; row++) {
            const p = this.m[row].findIndex((n) => n.value !== 0)

            if (p === -1) break

            if (!this.m[row][p].inv()) {
                irreversible.push([row, p] as [number, number])
            }

            pivots.push([row, p] as [number, number])
        }

        const arbitraries = Array(this.cols)
            .keys()
            .filter((n) => pivots.every(([row, col]) => n !== col))
            .toArray()

        return {
            pivots,
            arbitraries,
            irreversible,
        }
    }

    simplification() {
        for (let col = 0; col < this.cols; col++) {
            // console.log(`\u001b[31m${col}列目開始\u001b[0m`)

            this.methodA(col)
            this.methodB(col)
            this.methodC(col)
        }

        this.#tidy()
    }

    #tidy() {
        for (let col = 0; col < this.rows; col++) {
            if (this.m[col][col].value === 0) {
                const i = this.m.slice(col).findIndex((row) => row[col].value !== 0)

                if (i !== -1) {
                    this.P(col, i + col)
                }
            }
        }

        let g = 0

        for (let row = 0; row < this.rows; row++) {
            if (this.m[row - g].every((n) => n.value === 0)) {
                this.S(row - g)
                g++
            }
        }

        for (let row = 0; row < this.rows; row++) {
            const c = this.m[row].findIndex((n) => n.value !== 0)

            if (c !== -1) {
                const num = this.m[row][c]

                if (num.inv()) {
                    this.Q(row, num.inv()!)
                }
            }
        }
    }

    P(i: number, j: number) {
        // console.log(`${i}行${j}行入れ替え`)
        ;[this.m[i], this.m[j]] = [this.m[j], this.m[i]]

        // console.log(this.toString())

        return this
    }

    Q(i: number, scaler: Zn) {
        // console.log(`${i}行に${scaler.value}を掛ける`)

        if (!scaler.inv()) throw new TypeError("非可逆元を掛けると可逆じゃなくなるぞ!")

        this.m[i] = this.m[i].map((n) => n.mul(scaler))

        // console.log(this.toString())

        return this
    }

    R(i: number, j: number, scaler: Zn) {
        this.m[j] = this.m[j].map((n, c) => n.add(this.m[i][c].mul(scaler)))

        return this
    }

    // i行目を一番下に送る
    S(i: number) {
        // console.log(`${i}行を一番下に送る`)

        const r = this.m.splice(i, 1)

        this.m.push(r[0])

        return this
    }

    safeR(i: number, j: number, scaler: Zn, col: number) {
        // console.log(`${i}行の${scaler.value}倍を${j}行に加える`)

        if (
            this.m[i]
                .map((n) => n.mul(scaler))
                .slice(0, col)
                .every((n) => n.value === 0)
        ) {
            this.R(i, j, scaler)
            // console.log(`成功`)
            // console.log(this.toString())
            return true
        } else {
            // console.log(`失敗`)
            return false
        }
    }

    // 可逆元から1を作ってそれ以外の行を0にする
    methodA(col: number) {
        // 可逆元を探す
        const pivotRow = this.findA(col)

        // 失敗
        if (pivotRow === null) {
            // console.log(`${col}列: 可逆元なし`)
            return
        }

        // console.log(`${col}列: 可逆元あり ${pivotRow}行目`)

        // 成功

        // pivotを1にしている
        const num = this.m[pivotRow][col]
        this.Q(pivotRow, num.inv()!)

        this.deleteOtherRow(col, pivotRow)
    }

    findA(col: number) {
        const p = this.m.findIndex((row) => row[col].inv() !== null)

        if (p === -1) return null

        return p
    }

    // いくつかの行を足して可逆元が作れないか
    methodB(col: number) {
        const p = this.findB(col)

        // 失敗
        if (p.length === 0) {
            // console.log(`${col}列: 2行関係なし`)
            return
        }

        for (const h of p) {
            // console.log(`${col}列: 2行関係あり ${h}`)

            const [i, j, k] = h
            if (!this.safeR(i, j, new this.Zn(k), col)) continue

            this.methodA(col)
        }
    }

    findB(col: number) {
        const p = []

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (i === j) continue

                const m = this.m[j][col]
                const n = this.m[i][col]

                if (m.value === 0 || n.value === 0) continue

                for (let k = 1; k < this.period; k++) {
                    if (n.add(m.mul(new this.Zn(k))).inv()) {
                        p.push([j, i, k])
                    }
                }
            }
        }

        return p
    }

    methodC(col: number) {
        let p = this.findC(col)

        // 失敗
        if (p.length === 0) {
            // console.log(`${col}列: 倍数関係なし`)
            return
        }

        for (const h of p) {
            // console.log(`${col}列: 倍数関係あり ${h}`)

            const [i, j, k] = h

            if (this.safeR(i, j, new this.Zn(k), col)) {
                this.methodC(col)
                break
            }
        }
    }

    // 倍数関係になっているものを探す
    findC(col: number) {
        const p = []

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (i === j) continue

                const m = this.m[i][col]
                const n = this.m[j][col]

                if (m.value === 0 || n.value === 0) continue

                for (let k = 1; k < this.period; k++) {
                    if (0 === n.add(m.mul(new this.Zn(k))).value) {
                        p.push([i, j, k])
                    }
                }
            }
        }

        return p
    }

    // 他の行を消す
    deleteOtherRow(col: number, pivotRow: number) {
        for (let r = 0; r < this.rows; r++) {
            if (r === pivotRow) continue

            if (this.m[r][col].value === 0) {
                continue
            }

            // scaler倍して引く
            const scaler = this.m[r][col].mul(new this.Zn(-1))
            this.safeR(pivotRow, r, scaler, col)
        }

        // 入れ替え
        // this.P(pivotRow, col)
    }

    toNumber() {
        return this.m.map((row) => row.map((n) => n.value))
    }

    toString() {
        return (
            "\t\u001b[31m" +
            [...Array(this.cols).keys()].map((n) => n).join("\t") +
            "\u001b[0m\n" +
            this.toNumber()
                .map((row, i) => "\u001b[31m" + i + "\t\u001b[0m" + row.join("\t"))
                .join("\n")
        )
    }
}
