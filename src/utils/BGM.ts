export class BGM {
    static #context: AudioContext
    static #gain: GainNode
    static #audio: HTMLAudioElement

    static #initialized = false
    static init() {
        if (this.#initialized) throw new Error("すでにinitialized!")
        this.#initialized = true

        this.#context = new AudioContext()
        this.#gain = this.#context.createGain()
        this.#gain.connect(this.#context.destination)
    }

    static fetch(path: string) {
        this.#gain.gain.cancelScheduledValues(0)
        this.#gain.gain.value = 1
        this.#audio?.pause()

        return new Promise<void>((resolve) => {
            this.#audio = new Audio(path)
            this.#audio.loop = true

            const source = this.#context.createMediaElementSource(this.#audio)
            source.connect(this.#gain)

            if (this.#audio.readyState >= 2) {
                resolve()
            } else {
                this.#audio.oncanplay = () => {
                    resolve()
                }
            }
        })
    }

    static play() {
        return this.#audio.play()
    }

    static pause() {
        this.#audio.pause()
    }

    static fadeOut(ms: number) {
        return new Promise<void>((resolve) => {
            this.#gain.gain.cancelScheduledValues(0)
            this.#gain.gain.exponentialRampToValueAtTime(0.001, this.#context.currentTime + ms / 1000)

            setTimeout(() => {
                resolve()
            }, ms)
        })
    }
}
