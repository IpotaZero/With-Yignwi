export const loop = (periods: number[], handler: (x: number[]) => void) => {
    let x = Array(periods.length).fill(0)

    const l = periods.length

    let i = 0
    while (periods.join() !== x.join() && i++ < 100) {

        handler(x)

        x[0]++

        for (let i = 0; i < l - 1; i++) {
            if (x[i] === periods[i]) {
                x[i] = 0
                x[i + 1]++
            }
        }
    }
}
