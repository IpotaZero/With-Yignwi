export function page(container: HTMLElement, currentPageSelector: string, html: string) {
    let history = [currentPageSelector]

    container.style.opacity = "0"
    container.innerHTML = html

    const pages = container.querySelectorAll(".page")

    const changePage = async (pageSelector: string, immediately: boolean) => {
        const targetPage = container.querySelector(pageSelector)

        if (!targetPage) {
            throw new Error(`そんなpageは無い: ${pageSelector}`)
        }

        if (!immediately) {
            await new Promise((resolve) => {
                container.style.transition = "opacity 200ms"
                container.style.opacity = "0"
                container.style.pointerEvents = "none"

                setTimeout(resolve, 200)
            })
        }

        pages.forEach((page) => {
            page.classList.toggle("hidden", page !== targetPage)
        })

        container.style.opacity = "1"
        container.style.pointerEvents = ""
    }

    changePage(currentPageSelector, true)

    const linkButtons = container.querySelectorAll("[data-link]")

    linkButtons.forEach((linkButton) => {
        const immediately = linkButton.hasAttribute("data-immediately")
        const sever = linkButton.hasAttribute("data-sever")
        const targetPageId = linkButton.getAttribute("data-link")!

        linkButton.addEventListener("click", () => {
            if (sever) history = []

            history.push(targetPageId)

            changePage(targetPageId, immediately)
        })
    })

    const backButtons = container.querySelectorAll("[data-back]")

    backButtons.forEach((backButton) => {
        const immediately = backButton.hasAttribute("data-immediately")
        const backAttr = backButton.getAttribute("data-back")!

        const backDepth = Number.parseInt(backAttr)

        if (Number.isNaN(backDepth) || backDepth <= 0) {
            console.warn("正しくないdata-back！", backButton)
            return
        }

        backButton.addEventListener("click", () => {
            if (history.length <= backDepth) {
                console.warn("戻る履歴がない", backButton)
                return
            }

            let previousPageId = ""

            for (let i = 0; i < backDepth; i++) {
                history.pop()
                previousPageId = history[history.length - 1]
            }

            changePage(previousPageId, immediately)
        })
    })
}
