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

    static async ffp(path: string) {
        this.path = path
        await this.fadeOut(1000)
        await this.fetch(path)
        await this.play()
    }

    static fetch(path: string) {
        this.path = path

        this.#audio?.pause()
        this.#source?.disconnect()

        return new Promise<void>((resolve) => {
            this.#audio = new Audio(path)
            this.#audio.loop = true

            this.#source = this.#context.createMediaElementSource(this.#audio)
            this.#source.connect(this.#gain)

            if (this.#audio.readyState >= 2) {
                resolve()
            } else {
                this.#audio.oncanplay = () => {
                    resolve()
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

    static async fadeOut(durationMS: number) {
        await this.fade(0.001, durationMS)
        this.pause()
        this.setVolume(this.#volume)
    }

    static fade(volume: number, durationMS: number) {
        this.#gain.gain.cancelScheduledValues(this.#context.currentTime)
        this.#gain.gain.setValueAtTime(this.#volume, this.#context.currentTime)
        this.#gain.gain.linearRampToValueAtTime(volume, this.#context.currentTime + durationMS / 1000)

        return new Promise((resolve) => {
            setTimeout(resolve, durationMS)
        })
    }
}
