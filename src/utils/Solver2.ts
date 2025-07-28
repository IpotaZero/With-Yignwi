// ユークリッドの拡張法：逆元を求める
function extendedGCD(a: number, b: number): [number, number, number] {
    if (b === 0) return [a, 1, 0]
    const [g, x1, y1] = extendedGCD(b, a % b)
    return [g, y1, x1 - Math.floor(a / b) * y1]
}

// a の逆元 mod n を返す（存在しない場合 null）
function modInverse(a: number, n: number): number | null {
    const [g, x] = extendedGCD(a, n)
    if (g !== 1) return null // 逆元が存在しない
    return ((x % n) + n) % n
}

function solveModularSystemGeneral(
    A: number[][],
    b: number[],
    n: number,
): {
    particular: number[]
    homogeneousBasis: number[][]
} {
    const m = A.length
    const k = A[0].length
    const aug = A.map((row, i) => [...row, b[i]])
    const pivots: number[] = []
    const freeVars: number[] = []

    let row = 0
    for (let col = 0; col < k && row < m; col++) {
        let pivot = -1
        for (let i = row; i < m; i++) {
            if (extendedGCD(aug[i][col], n)[0] === 1) {
                pivot = i
                break
            }
        }
        if (pivot === -1) {
            freeVars.push(col)
            continue
        }

        ;[aug[row], aug[pivot]] = [aug[pivot], aug[row]]

        const inv = modInverse(aug[row][col], n)!
        for (let j = col; j <= k; j++) {
            aug[row][j] = (aug[row][j] * inv) % n
        }

        for (let i = 0; i < m; i++) {
            if (i !== row) {
                const f = aug[i][col]
                for (let j = col; j <= k; j++) {
                    aug[i][j] = (aug[i][j] - f * aug[row][j] + n * n) % n
                }
            }
        }

        pivots.push(col)
        row++
    }

    const particular = new Array(k).fill(0)
    for (let i = 0; i < pivots.length; i++) {
        particular[pivots[i]] = aug[i][k]
    }

    // 同次解の基底を構成
    const basis: number[][] = []
    for (const free of freeVars) {
        const vec = new Array(k).fill(0)
        vec[free] = 1
        for (let i = 0; i < pivots.length; i++) {
            const p = pivots[i]
            vec[p] = (-aug[i][free] + n) % n
        }
        basis.push(vec)
    }

    return {
        particular,
        homogeneousBasis: basis,
    }
}

// [-n/2, n/2] に正規化（代表元へ）
function toSymmetric(x: number, n: number): number {
    return ((x + n / 2) % n) - n / 2
}

function norm(v: number[], n: number): number {
    return v.reduce((sum, xi) => {
        const s = toSymmetric(xi, n)
        return sum + s * s
    }, 0)
}

// 全解列挙してノルム最小のものを返す（制限あり）
function findMinimalNormSolution(particular: number[], basis: number[][], n: number, limit = 10): number[] {
    const numFree = basis.length
    const best = {
        sol: particular,
        norm: norm(particular, n),
    }

    const search = (idx: number, coeffs: number[]) => {
        if (idx === numFree) {
            const sol = particular.map((v, i) => {
                let sum = v
                for (let j = 0; j < coeffs.length; j++) {
                    sum = (sum + basis[j][i] * coeffs[j]) % n
                }
                return (sum + n) % n
            })
            const nm = norm(sol, n)
            if (nm < best.norm) {
                best.norm = nm
                best.sol = sol
            }
            return
        }

        for (let i = 0; i < limit; i++) {
            search(idx + 1, [...coeffs, i])
        }
    }

    search(0, [])
    return best.sol
}

const A = [
    [2, 3],
    [4, 2],
]
const b = [0, 2]
const n = 6

const { particular, homogeneousBasis } = solveModularSystemGeneral(A, b, n)
console.log("特解:", particular)
console.log("同次基底:", homogeneousBasis)

const minNorm = findMinimalNormSolution(particular, homogeneousBasis, n)
console.log("ノルム最小解:", minNorm)

export const a = 0
