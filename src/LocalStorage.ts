export class LocalStorage {
    static allClear() {
        for (let i = 0; i < 30; i++) {
            this.setData(i, {
                cleared: true,
                leastCleared: false,
            })
        }
    }

    static getData(): Data[] {
        const dataList = localStorage.getItem("data")
        return dataList ? JSON.parse(dataList) : this.#getDefaultData()
    }

    static setData(stageId: number, data: Data) {
        const dataList = this.getData()
        dataList[stageId].cleared ||= data.cleared
        dataList[stageId].leastCleared ||= data.leastCleared

        localStorage.setItem("data", JSON.stringify(dataList))
    }

    static #getDefaultData(): Data[] {
        return Array.from({ length: 6 }, () =>
            Array.from({ length: 5 }, () => ({
                cleared: false,
                leastCleared: false,
            })),
        ).flat()
    }

    static getBGMVolume(): number {
        return +(localStorage.getItem("bgm-volume") ?? "1")
    }

    static setBGMVolume(volume: number) {
        localStorage.setItem("bgm-volume", "" + volume)
    }

    static getSEVolume(): number {
        return +(localStorage.getItem("se-volume") ?? "1")
    }

    static setSEVolume(volume: number) {
        localStorage.setItem("se-volume", "" + volume)
    }
}

type Data = {
    cleared: boolean
    leastCleared: boolean
}

;(window as any).LocalStorage = LocalStorage
