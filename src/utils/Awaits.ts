export class Awaits {
    static fadeOut(container: HTMLElement): Promise<void> {
        container.style.transition = "opacity 0.11s"
        container.style.opacity = "0"
        container.style.pointerEvents = "none"

        return this.sleep(110)
    }

    static async fadeIn(container: HTMLElement) {
        await this.sleep(110)

        container.style.transition = "opacity 0.11s"
        container.style.opacity = "1"
        container.style.pointerEvents = "all"
    }

    static async fade(
        container: HTMLElement,
        promise: () => Promise<void>,
        {
            showLoading = this.#showLoading,
            hideLoading = this.#hideLoading,
        }: { showLoading?: () => void; hideLoading?: () => void } = {},
    ) {
        await this.fadeOut(container)

        let done = false
        let showed = false

        // 1秒タイマーを並行実行
        this.sleep(1000).then(() => {
            if (!done) {
                showLoading() // ローディング画面表示
                showed = true
            }
        })

        await promise() // メイン処理実行
        done = true // 1秒以内に終わればローディングは表示されない

        if (showed) {
            hideLoading()
        }

        await this.fadeIn(container)
    }

    static sleep(ms: number) {
        return new Promise<void>((resolve) => {
            setTimeout(resolve, ms)
        })
    }

    static #showLoading() {
        const p = document.createElement("p")
        p.textContent = "Loading..."
        p.classList.add("loading")
        document.body.appendChild(p)
    }

    static #hideLoading() {
        document.querySelectorAll(".loading").forEach((e) => e.remove())
    }
}
