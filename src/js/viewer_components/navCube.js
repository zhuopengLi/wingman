import { NavCubePlugin } from "@xeokit/xeokit-sdk";
import { viewer } from "./viewer";

export default new NavCubePlugin(viewer, {
    canvasId: "navCube",
    visible: true,           // Initially visible (default)
    size: 200,               // NavCube size in pixels (default is 200)
    alignment: "topLeft",   // Align NavCube to top-left of Viewer canvas
    topMargin: 50,          // 170 pixels margin from top of Viewer canvas
    cameraFly: true,       // Fly camera to each selected axis/diagonal
    cameraFitFOV: 45,        // How much field-of-view the scene takes once camera has fitted it to view
    cameraFlyDuration: 0.5, // How long (in seconds) camera takes to fly to each new axis/diagonal
    color: "#FFFFFF",
    synchProjection: true
});