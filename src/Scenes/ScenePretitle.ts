import { Awaits } from "../utils/Awaits"
import { page } from "../utils/Page"
import { SceneTitle } from "./SceneTitle"

export class ScenePretitle {
    constructor() {
        const container = document.getElementById("container")!

        page(
            container,
            "#pretitle",
            `
                <div class="page" id="pretitle">
                    <button>Presented by MCR</button>
                </div>

                <style>
                    #pretitle button {
                        width: 100%;
                        height: 100%;
                        font-size: 12vh;
                    }
                </style>
            `,
        )

        container.querySelector("button")!.onclick = async () => {
            await Awaits.fade(container)
            new SceneTitle("#title")
        }
    }
}
