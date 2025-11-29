type Data = {
    stages: StageData[]
    bgmVolume: number
    seVolume: number
}

export class LocalStorage {
    static readonly #KEY_DATA = "yignwi-data"

    static #getDefaultStageData(): StageData[] {
        return Array.from({ length: 6 * 5 }, () => ({
            cleared: false,
            leastCleared: false,
        }))
    }

    static #createDefaultData(): Data {
        return {
            stages: this.#getDefaultStageData(),
            bgmVolume: 1,
            seVolume: 1,
        }
    }

    static #getData(): Data {
        const data = localStorage.getItem(this.#KEY_DATA)
        return data ? JSON.parse(data) : this.#createDefaultData()
    }

    static #setData(data: Data) {
        localStorage.setItem(this.#KEY_DATA, JSON.stringify(data))
    }

    static getStageData(): StageData[] {
        const data = this.#getData()
        return data.stages
    }

    static setStageData(stageId: number, stageData: StageData) {
        const data = this.#getData()
        data.stages[stageId].cleared ||= stageData.cleared
        data.stages[stageId].leastCleared ||= stageData.leastCleared
        this.#setData(data)
    }

    static getBGMVolume(): number {
        return this.#getData().bgmVolume
    }

    static setBGMVolume(volume: number) {
        const data = this.#getData()
        data.bgmVolume = volume
        this.#setData(data)
    }

    static getSEVolume(): number {
        return this.#getData().seVolume
    }

    static setSEVolume(volume: number) {
        const data = this.#getData()
        data.seVolume = volume
        this.#setData(data)
    }

    static clear() {
        localStorage.removeItem(this.#KEY_DATA)
    }
}

type StageData = {
    cleared: boolean
    leastCleared: boolean
}
;(window as any).LocalStorage = LocalStorage
