import { lcm } from "../utils/gcd.js"

export function createChessSquareWeightMatrix(rows: number, cols: number, periods?: number[]) {
    const A: number[][] = []

    const wholePeriod = periods?.reduce((a, b) => lcm(a, b), 1) ?? 1

    const weight = (targetR: number, targetC: number) => {
        return periods ? wholePeriod / periods[targetR * cols + targetC] : 1
    }

    for (const r of Array(rows).keys()) {
        for (const c of Array(cols).keys()) {
            const board = createZeroMatrix(rows, cols)

            for (const dr of Array(3).keys()) {
                for (const dc of Array(3).keys()) {
                    const targetR = r + dr - 1
                    const targetC = c + dc - 1

                    if (board[targetR] && board[targetR][targetC] === 0) {
                        const cellWeight = weight(targetR, targetC) * (-1) ** (targetR + targetC + r + c)
                        board[targetR][targetC] = cellWeight
                    }
                }
            }

            A.push(board.flat(1))
        }
    }

    return transpose(A)
}

export function createSquareWeightMatrix(rows: number, cols: number, periods?: number[], aug?: number[]) {
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
                        const cellWeight = periods ? wholePeriod / periods[targetR * cols + targetC] : 1
                        board[targetR][targetC] = cellWeight
                    }
                }
            }

            A.push(board.flat(1))
        }
    }

    aug && A.push(aug)

    return transpose(A)
}

export function createCrossWeightMatrix(rows: number, cols: number, periods?: number[]) {
    const A: number[][] = []

    const wholePeriod = periods?.reduce((a, b) => lcm(a, b), 1) ?? 1

    const weight = (targetR: number, targetC: number) => {
        return periods ? wholePeriod / periods[targetR * cols + targetC] : 1
    }

    for (const r of Array(rows).keys()) {
        for (const c of Array(cols).keys()) {
            const board = createZeroMatrix(rows, cols)

            board[r][c] = weight(r, c)
            0 <= r - 1 && (board[r - 1][c] = weight(r - 1, c))
            r + 1 < rows && (board[r + 1][c] = weight(r + 1, c))
            0 <= c - 1 && (board[r][c - 1] = weight(r, c - 1))
            c + 1 < cols && (board[r][c + 1] = weight(r, c + 1))

            A.push(board.flat(1))
        }
    }

    return transpose(A)
}

export function createXWeightMatrix(rows: number, cols: number, periods?: number[]) {
    const A: number[][] = []

    const wholePeriod = periods?.reduce((a, b) => lcm(a, b), 1) ?? 1

    // console.log(wholePeriod)

    const weight = (targetR: number, targetC: number) => {
        return periods ? wholePeriod / periods[targetR * cols + targetC] : 1
    }

    for (const r of Array(rows).keys()) {
        for (const c of Array(cols).keys()) {
            const board = createZeroMatrix(rows, cols)

            board[r][c] = weight(r, c)
            0 <= r - 1 && 0 <= c - 1 && (board[r - 1][c - 1] = weight(r - 1, c - 1))
            0 <= r - 1 && c + 1 < cols && (board[r - 1][c + 1] = weight(r - 1, c + 1))
            r + 1 < rows && 0 <= c - 1 && (board[r + 1][c - 1] = weight(r + 1, c - 1))
            r + 1 < rows && c + 1 < cols && (board[r + 1][c + 1] = weight(r + 1, c + 1))

            A.push(board.flat(1))
        }
    }

    return transpose(A)
}

export function createUnitMatrix(rows: number, cols: number): number[][] {
    return Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => (i === j ? 1 : 0)))
}

export function createZeroMatrix(rows: number, cols: number): number[][] {
    return Array.from({ length: rows }, () => Array(cols).fill(0))
}

export const transpose = <T>(a: T[][]) => a[0].map((_, c) => a.map((r) => r[c]))
