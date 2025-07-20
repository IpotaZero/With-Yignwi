const img = new Image()
img.src = "assets/images/maple.png"

export function fall(container: HTMLElement) {
    const style = document.createElement("style")
    style.innerHTML = `
        .falling-particle {
            position: fixed;
            pointer-events: none;

            width: 12vh;
            height: 12vh;
        }

        @keyframes fall{
            0% {
                top: 0;
                opacity: 0;
                transform: rotate(0);
            }

            50% {
                opacity: 0.05;
            }

            100% {
                top: 100%;
                opacity: 0;
                transform: rotate(360deg);
            }
        }
    `
    container.appendChild(style)

    const changeStyle = (particle: HTMLElement) => {
        const r = Math.random()

        particle.style.left = `${r * 100}%`
        particle.style.scale = "" + (Math.random() / 2 + 0.8)
        particle.style.animation = `fall ${Math.random() * 6 + 6}s linear infinite`
    }

    for (let i = 0; i < 48; i++) {
        const particle = img.cloneNode() as HTMLImageElement
        particle.classList.add("falling-particle")

        changeStyle(particle)

        particle.onanimationend = () => {
            changeStyle(particle)
        }

        container.appendChild(particle)
    }
}

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
