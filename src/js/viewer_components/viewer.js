import { Viewer, XKTLoaderPlugin } from "@xeokit/xeokit-sdk";
import { flyCam } from "./utils";
import data from "../../data/projects.json"

export const viewer = new Viewer({
    canvasId: "viewport",
    transparent: true
});

viewer.camera.eye = [25, 150, 75];
viewer.camera.look = [0, 5, 0];
viewer.camera.up = [-0.01, 0.99, 0.039];

viewer.cameraControl.doublePickFlyTo = true;
viewer.cameraControl.panRightClick = true;
viewer.cameraControl.followPointer = true;

viewer.cameraControl.touchDollyRate = 1;
viewer.cameraControl.mouseWheelDollyRate = 60;
viewer.cameraControl.keyboardDollyRate = 20;
viewer.cameraControl.rotationInertia = 0;
viewer.cameraControl.dollyInertia = 0;

export const xktLoader = new XKTLoaderPlugin(viewer);

export const loadModel = (mInd, pInd, xktInd, data) => {
    return xktLoader.load({
        src: data[mInd].phases[pInd].xkt[xktInd].src,
        metaModelSrc: data[mInd].phases[pInd].xkt[xktInd].metaModelSrc,
        id: `${data[mInd].name}-${data[mInd].phases[pInd].xkt[xktInd].name}`,
        edges: true,
    })
}

export const clear = models => {
    if (models.length !== 0) {
        models.forEach(i => i.destroy());
        models.length = 0;
    }
}

export const selectModel = (mInd, pInd, data, models) => {
    let i = 0

    data[mInd].phases[pInd].xkt.map(() => {
        models.push(loadModel(mInd, pInd, i, data))
        i++
    })

    

    if (mInd == 0) {
        flyCam(mInd, pInd, data)
    } else {
        models[0].on("loaded", () => {
            viewer.cameraFlight.flyTo({
                projection: "perspective",
                aabb: viewer.scene.getAABB({}),
                duration: 0
            });
        });
    }
}