import { createSquareWeightMatrix } from "./Weight.js"

export type Stage = {
    rows: number
    cols: number
    periods: number[]
    clicks: number[]
    weight: () => number[][]
}

export const stages: Stage[] = [
    {
        rows: 4,
        cols: 4,
        periods: [
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
        ].flat(),
        clicks: [0, 15],
        weight: () => createSquareWeightMatrix(4, 4),
    },
    {
        rows: 4,
        cols: 4,
        periods: [
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
        ].flat(),
        clicks: [1, 3, 7],
        weight: () => createSquareWeightMatrix(4, 4),
    },
    {
        rows: 4,
        cols: 4,
        periods: [
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
        ].flat(),
        clicks: [0, 6, 8, 13],
        weight: () => createSquareWeightMatrix(4, 4),
    },
    {
        rows: 4,
        cols: 4,
        periods: [
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
        ].flat(),
        clicks: [7, 9, 12, 15, 8],
        weight: () => createSquareWeightMatrix(4, 4),
    },
    {
        rows: 5,
        cols: 5,
        periods: [
            [2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2],
        ].flat(),
        clicks: [4, 6, 11, 22],
        weight: () => createSquareWeightMatrix(5, 5),
    },

    {
        rows: 1,
        cols: 4,
        periods: [[3, 3, 3, 3]].flat(),
        clicks: [0, 3],
        weight: () => createSquareWeightMatrix(1, 4),
    },
    {
        rows: 4,
        cols: 4,
        periods: [
            [3, 3, 3, 3],
            [3, 3, 3, 3],
            [3, 3, 3, 3],
            [3, 3, 3, 3],
        ].flat(),
        clicks: [8, 9, 1, 10, 8, 1],
        weight: () => createSquareWeightMatrix(4, 4),
    },

    {
        rows: 4,
        cols: 4,
        periods: [
            [3, 3, 3, 3],
            [3, 3, 3, 3],
            [3, 3, 3, 3],
            [3, 3, 3, 3],
        ].flat(),
        clicks: [8, 3, 11, 14, 8],
        weight: () => createSquareWeightMatrix(4, 4),
    },
    {
        rows: 4,
        cols: 4,
        periods: [
            [3, 3, 3, 3],
            [3, 3, 3, 3],
            [3, 3, 3, 3],
            [3, 3, 3, 3],
        ].flat(),
        clicks: [4, 9, 13, 7],
        weight: () => createSquareWeightMatrix(4, 4),
    },
    {
        rows: 4,
        cols: 4,
        periods: [
            [3, 3, 3, 3],
            [3, 3, 3, 3],
            [3, 3, 3, 3],
            [3, 3, 3, 3],
        ].flat(),
        clicks: [0, 11, 5, 15, 7, 13],
        weight: () => createSquareWeightMatrix(4, 4),
    },

    {
        rows: 1,
        cols: 4,
        periods: [[3, 3, 4, 4]].flat(),
        clicks: [0, 0, 2, 2, 1, 3],
        weight: () => createSquareWeightMatrix(1, 4),
    },
    {
        rows: 4,
        cols: 4,
        periods: [
            [3, 3, 3, 4],
            [3, 3, 3, 4],
            [3, 3, 3, 4],
            [4, 4, 4, 4],
        ].flat(),
        clicks: [4, 6, 9, 2, 13, 6, 8],
        weight: () => createSquareWeightMatrix(4, 4),
    },
    {
        rows: 4,
        cols: 4,
        periods: [
            [1, 2, 2, 1],
            [2, 3, 3, 2],
            [2, 3, 3, 2],
            [1, 2, 2, 1],
        ].flat(),
        clicks: [4, 6, 9, 2, 13, 6, 8],
        weight: () => createSquareWeightMatrix(4, 4),
    },
    {
        rows: 4,
        cols: 4,
        periods: [
            [2, 2, 2, 4],
            [2, 2, 2, 4],
            [3, 3, 3, 4],
            [3, 3, 3, 4],
        ].flat(),
        clicks: [13, 3, 11, 6, 0, 3, 9],
        weight: () => createSquareWeightMatrix(4, 4),
    },
    {
        rows: 4,
        cols: 4,
        periods: [
            [2, 2, 2, 4],
            [2, 2, 2, 4],
            [3, 3, 3, 4],
            [3, 3, 3, 4],
        ].flat(),
        clicks: [],
        weight: () => createSquareWeightMatrix(4, 4),
    },
]
