import { lcm } from "../utils/gcd.js"

// ほんとは転置をしなきゃいけないけど対称なので
export function createSquareWeightMatrix(rows: number, cols: number, periods?: number[]) {
    const A: number[][] = []

    const wholePeriod = periods?.reduce((a, b) => lcm(a, b), 1) ?? 1

    for (const r of Array(rows).keys()) {
        for (const c of Array(cols).keys()) {
            const board = createZeroMatrix(rows, cols)

            for (const dr of Array(3).keys()) {
                for (const dc of Array(3).keys()) {
                    const targetR = r + dr - 1
                    const targetC = c + dc - 1

                    if (board[targetR] && board[targetR][targetC] === 0) {
                        board[targetR][targetC] = periods ? wholePeriod / periods[targetR * rows + targetC] : 1
                    }
                }
            }

            A.push(board.flat(1))
        }
    }

    return transpose(A)
}

export function createCrossWeightMatrix(rows: number, cols: number) {
    const A: number[][] = []

    for (const r of Array(rows).keys()) {
        for (const c of Array(cols).keys()) {
            const board = createZeroMatrix(rows, cols)

            board[r][c] = 1
            0 <= r - 1 && (board[r - 1][c] = 1)
            r + 1 < rows && (board[r + 1][c] = 1)
            0 <= c - 1 && (board[r][c - 1] = 1)
            c + 1 < cols && (board[r][c + 1] = 1)

            A.push(board.flat(1))
        }
    }

    return A
}

export function createUnitMatrix(rows: number, cols: number): number[][] {
    return Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => (i === j ? 1 : 0)))
}

export function createZeroMatrix(rows: number, cols: number): number[][] {
    return Array.from({ length: rows }, () => Array(cols).fill(0))
}

const transpose = (a: number[][]) => a[0].map((_, c) => a.map((r) => r[c]))
