export class LocalStorage {
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
        return Array.from({ length: 2 }, () =>
            Array.from({ length: 5 }, () => ({
                cleared: false,
                leastCleared: false,
            })),
        ).flat()
    }
}

type Data = {
    cleared: boolean
    leastCleared: boolean
}
