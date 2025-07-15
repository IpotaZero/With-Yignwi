import { ScenePretitle } from "./Scenes/ScenePretitle.js"
import { H, x } from "./test.js"

document.addEventListener("DOMContentLoaded", () => {
    new ScenePretitle()
})

document.addEventListener("contextmenu", (e) => {
    e.preventDefault()
})

console.log({ x, H })

const img = document.createElement("img")
img.src = "assets/images/maple.png"

export function setupParticle(page: HTMLElement) {
    page.addEventListener("click", (e) => {
        const rect = (e.target as Element).getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        for (let i = 0; i < 8; i++) {
            const particle = img.cloneNode() as HTMLImageElement
            particle.style.position = "fixed"
            particle.style.pointerEvents = "none"
            particle.style.left = `calc(${rect.left + x}px - 4vh)`
            particle.style.top = `calc(${rect.top + y}px - 4vh)`
            particle.style.width = "8vh"
            particle.style.height = "8vh"
            particle.style.scale = "" + (Math.random() / 2 + 0.8)
            particle.style.opacity = "" + Math.random() * 0.5
            particle.style.transition = "transform 1s ease-out, opacity 1s ease-out"
            particle.style.zIndex = "1000"
            particle.style.filter = ""
            document.body.appendChild(particle)

            const angle = (Math.PI * 2 * i) / 8 + Math.random()
            const distance = 60 + Math.random() * 20
            requestAnimationFrame(() => {
                particle.style.transform = `translate(${(Math.cos(angle) * distance) / 8}vh, ${
                    (Math.sin(angle) * distance) / 8
                }vh) scale(0.5) rotate(${(angle / Math.PI) * 180 * (Math.random() - 0.5)}deg)`
                particle.style.opacity = "0"
            })

            setTimeout(() => {
                particle.remove()
            }, 1000)
        }
    })
}
