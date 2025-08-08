import { gcd } from "./gcd"

export class Fraction {
    static readonly one = new Fraction(1)
    static readonly zero = new Fraction(0)

    readonly p: number
    readonly q: number

    constructor(p: number, q?: number) {
        if (!q) {
            this.p = p
            this.q = 1
            return
        }

        if (q === 0) throw new RangeError("分母が0")

        if (p === 0) {
            this.p = 0
            this.q = 1
        } else {
            const g = gcd(p, q)

            this.p = p / g
            this.q = q / g

            if (this.q < 0) {
                this.p *= -1
                this.q *= -1
            }
        }
    }

    isInteger() {
        return this.q === 1
    }

    add(f: Fraction) {
        return new Fraction(this.p * f.q + f.p * this.q, this.q * f.q)
    }

    sub(f: Fraction) {
        return new Fraction(this.p * f.q - f.p * this.q, this.q * f.q)
    }

    mul(f: Fraction) {
        return new Fraction(this.p * f.p, this.q * f.q)
    }

    div(f: Fraction) {
        return this.mul(f.inv())
    }

    inv() {
        return new Fraction(this.q, this.p)
    }

    toString() {
        if (this.q === 1) {
            return `${this.p}`
        }

        return `${this.p}/${this.q}`
    }
}
