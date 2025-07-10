export function Z<M extends number>(n: M) {
    if (!Number.isInteger(n) || n < 0) {
        throw new TypeError("自然数を入れろ！")
    }

    return class Zn<N extends M> {
        readonly period: N = n as N
        readonly value: number

        constructor(k: number) {
            this.value = k

            if (this.period !== 0) {
                this.value = ((this.value % this.period) + this.period) % this.period
            }
        }

        add(zn: Zn<N>) {
            return new Zn<N>(this.value + zn.value)
        }

        sub(zn: Zn<N>) {
            return new Zn<N>(this.value - zn.value)
        }

        mul(zn: Zn<N>) {
            return new Zn<N>(this.value * zn.value)
        }

        inv(): Zn<N> | null {
            if (this.period === 0 && this.value ** 2 === 1) {
                return null
            }

            if (this.value === 0) {
                return null
            }

            if (this.#gcd(this.value, this.period) !== 1) {
                return null
            }

            return new Zn<N>(this.#getInv(this.period, this.value))
        }

        #getInv(period: number, k: number) {
            let number1 = period
            let number2 = k

            let quotients = []

            while (number2 != 1) {
                let quotient = Math.floor(number1 / number2)
                let remainder = number1 % number2
                number1 = number2 as N
                number2 = remainder
                quotients.push(quotient)
            }

            let lastAnswer = 0
            let answer = 1

            for (let i = 0; i < quotients.length; i++) {
                const buffer = answer
                answer = lastAnswer + answer * quotients[i]
                lastAnswer = buffer
            }

            answer = answer * (-1) ** quotients.length
            answer = ((answer % period) + period) % period

            return answer
        }

        toString(): string {
            return "" + this.value
        }

        #gcd(a: number, b: number): number {
            return a % b ? this.#gcd(b, a % b) : b
        }
    }
}
