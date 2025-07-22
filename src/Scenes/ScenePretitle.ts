import { page } from "../utils/Page.js"
import { Scene } from "./Scene.js"
import { Scenes } from "./Scenes.js"

export class ScenePretitle extends Scene {
    ready: Promise<void> = Promise.resolve()

    constructor() {
        super()

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
            await Scenes.goto(() => new SceneTitle("#title"))
        }
    }
}
