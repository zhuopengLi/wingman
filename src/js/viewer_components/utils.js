import { viewer } from "./viewer";

export const flyCam = (modelIndex, phaseIndex, data) => {
    viewer.cameraFlight.flyTo({
        projection: "perspective",
        eye: data[modelIndex].phases[phaseIndex].cam.eye,
        look: data[modelIndex].phases[phaseIndex].cam.look,
        up: data[modelIndex].phases[phaseIndex].cam.up,
        duration: 0
    })
}