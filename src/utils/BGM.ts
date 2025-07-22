export class BGM {
    static #context: AudioContext
    static #gain: GainNode
    static #audio: HTMLAudioElement | null = null
    static #source: MediaElementAudioSourceNode | null = null

    static path: string = ""

    static #initialized = false
    static init() {
        if (this.#initialized) throw new Error("すでにinitialized!")
        this.#initialized = true

        this.#context = new AudioContext()
        this.#gain = this.#context.createGain()
        this.#gain.connect(this.#context.destination)
    }

    static fetch(path: string) {
        this.#audio?.pause()
        this.#source?.disconnect()

        this.path = path

        return new Promise<void>((resolve) => {
            this.#audio = new Audio(path)
            this.#audio.loop = true

            this.#source = this.#context.createMediaElementSource(this.#audio)
            this.#source.connect(this.#gain)

            if (this.#audio.readyState >= 2) {
                resolve()
                this.setVolume(1)
            } else {
                this.#audio.oncanplay = () => {
                    resolve()
                    this.setVolume(1)
                }
            }
        })
    }

    static async play() {
        await this.#context.resume()
        await this.#audio?.play()
    }

    static pause() {
        this.#audio?.pause()
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

    static setVolume(volume: number) {
        this.#gain.gain.cancelScheduledValues(0)
        this.#gain.gain.value = volume
    }
}
