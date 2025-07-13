export type Stage = {
    rows: number
    cols: number
    periods: number[]
    clicks: number[]
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
    },

    {
        rows: 1,
        cols: 4,
        periods: [[3, 3, 3, 3]].flat(),
        clicks: [0, 0, 3, 3],
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
    },
    {
        rows: 4,
        cols: 4,
        periods: [
            [4, 4, 4, 4],
            [4, 4, 4, 4],
            [4, 4, 4, 4],
            [4, 4, 4, 4],
        ].flat(),
        clicks: [0, 5, 10, 15, 3, 6, 9, 12],
    },

    {
        rows: 1,
        cols: 4,
        periods: [[4, 4, 4, 4]].flat(),
        clicks: [0, 0, 2, 2, 1, 1, 1, 3],
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
    },
]
