import { Awaits } from "../utils/Awaits"
import { page } from "../utils/Page"

export class ScenePretitle {
    constructor() {
        const container = document.getElementById("container")!

        page(
            container,
            "#pretitle",
            `
                <div class="page" id="pretitle">
                    <button>提供: 大阪公立大学マイコン研究会</button>
                </div>

                <style>
                    #pretitle button {
                        width: 100%;
                        height: 100%;
                        font-size: 8dvh;
                    }
                </style>
            `,
        )

        container.querySelector("button")!.onclick = async () => {
            const { SceneTitle } = await import("./SceneTitle.js")

            await Awaits.fade(container, () => new SceneTitle("#title").ready)
        }
    }
}
