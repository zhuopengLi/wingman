
import { viewer } from "./viewer";
import { models } from "../loader";
import metaAachen from "../../data/metadata/aachen.json"
import metaDutch from "../../data/metadata/schependomlaan.json"
import metaDam from "../../data/metadata/waterlock.json"
import metaKh from "../../data/metadata/westriversidehospital.json"

var lastEntity = null;
var lastColorize = null;

let data
let properties
let info = document.querySelector("#right-panel")

viewer.cameraControl.on("picked", obj => {

    const entity = obj.entity;

    switch (entity.model.id.split("-")[0]) {
        case "aachen":
            data = metaAachen
            break
        case "schependomlaan":
            data = metaDutch
            break
        case "waterlock":
            data = metaDam
            break
        case "hospital":
            data = metaKh
            break
    }


    data.forEach(metas => {
        if (metas.id == entity.model.id.split("-")[1]) {
            metas.meta.forEach(meta => {
                if (meta.id == entity.id) {
                    properties = meta
                }
            })
        }
    })

    let props = "<ul>\n"
    for (const [key, value] of Object.entries(properties)) {
        props += `<li>\n<span>${key}:</span> <span>${value}</span>\n</li>\n`
    }
    props += "\n</ul>"

    if (!lastEntity || entity.id !== lastEntity.id) {
        if (lastEntity) {
            lastEntity.colorize = lastColorize;
            viewer.scene.setObjectsXRayed(viewer.scene.xrayedObjectIds, false);
        }
        lastEntity = obj.entity;
        lastColorize = obj.entity.colorize.slice();
        obj.entity.colorize = [1, 130 / 255, 0];
        viewer.scene.setObjectsXRayed(viewer.scene.xrayedObjectIds, false);

        info.innerHTML = props

    } else if (entity.id == lastEntity.id || models.length == 0) {

        lastEntity = null;
        obj.entity.colorize = lastColorize;
        info.innerHTML = ""
        viewer.scene.setObjectsXRayed(viewer.scene.xrayedObjectIds, false);
    }


});


