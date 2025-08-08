export class BGM {
    static #context: AudioContext
    static #gain: GainNode
    static #audio: HTMLAudioElement | null = null
    static #source: MediaElementAudioSourceNode | null = null

    static #volume = 1

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
                this.setVolume(this.#volume)
            } else {
                this.#audio.oncanplay = () => {
                    resolve()
                    this.setVolume(this.#volume)
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

    static setVolume(volume: number) {
        this.#volume = volume

        this.#gain.gain.cancelScheduledValues(this.#context.currentTime)
        this.#gain.gain.value = this.#volume
    }

    static async fadeOut(duration: number) {
        if (!this.#audio || !this.#source || !this.#gain) return

        const currentTime = this.#context.currentTime
        const endTime = currentTime + duration / 1000

        this.#gain.gain.cancelScheduledValues(currentTime)
        this.#gain.gain.setValueAtTime(this.#gain.gain.value, currentTime)
        this.#gain.gain.linearRampToValueAtTime(0, endTime)

        await new Promise((resolve) => setTimeout(resolve, duration))

        this.pause()
    }
}
