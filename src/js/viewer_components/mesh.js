import { Mesh, VBOGeometry, buildGridGeometry, PhongMaterial } from "@xeokit/xeokit-sdk";
import { viewer } from "./viewer";

export default new Mesh(viewer.scene, {
    geometry: new VBOGeometry(viewer.scene, buildGridGeometry({
        size: 1500,
        divisions: 150
    })),
    material: new PhongMaterial(viewer.scene, {
        color: [0.0, 0.0, 0.0],
        emissive: [0.4, 0.4, 0.4]
    }),
    position: [0, -5, 0],
    collidable: false
});