export class Awaits {
    static fadeOut(container: HTMLElement): Promise<void> {
        return new Promise((resolve) => {
            container.style.transition = "opacity 0.2s"
            container.style.opacity = "0"

            setTimeout(() => {
                resolve()
            }, 200)
        })
    }

    static fadeIn(container: HTMLElement) {
        container.style.transition = "opacity 0.2s"
        container.style.opacity = "1"
    }

    static async fade(container: HTMLElement, promise: () => Promise<void>) {
        await this.fadeOut(container)
        await promise()
        this.fadeIn(container)
    }
}
