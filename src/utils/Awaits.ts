export class Awaits {
    static fade(container: HTMLElement): Promise<void> {
        return new Promise((resolve) => {
            container.style.transition = "opacity 0.2s"
            container.style.opacity = "0"

            setTimeout(() => {
                container.style.opacity = "1"
                resolve()
            }, 200)
        })
    }
}
