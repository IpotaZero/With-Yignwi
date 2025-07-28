export const gcd = (x: number, y: number): number => (x % y ? gcd(y, x % y) : y)
export const lcm = (x: number, y: number) => (x * y) / gcd(x, y)
