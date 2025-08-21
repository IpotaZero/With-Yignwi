class Sound {
    #audio: HTMLAudioElement

    constructor(path: string) {
        this.#audio = new Audio(path)
    }

    play() {
        this.#audio.currentTime = 0
        this.#audio.play()
    }

    setVolume(volume: number) {
        this.#audio.volume = volume
    }
}

export class SE {
    static clear = new Sound("assets/sounds/clear.mp3")
    static cursor = new Sound("assets/sounds/カーソル移動4.mp3")
    static ok = new Sound("assets/sounds/タイプライターで文字を打つ1.mp3")

    static setVolume(volume: number) {
        Object.values(this).forEach((se) => {
            se.setVolume(volume)
        })
    }
}
