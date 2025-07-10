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
        clicks: [4, 6, 10, 14, 22, 13],
    },
    {
        rows: 1,
        cols: 4,
        periods: [[4, 4, 4, 4]].flat(),
        clicks: [0, 0, 0, 3, 3, 3],
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
