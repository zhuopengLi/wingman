
import { viewer } from "./viewer";
import { models } from "../loader";

var lastEntity = null;
var lastColorize = null;

let data
let properties
let info = document.querySelector("#right-panel")

let metaAachen
let metaDutch
let metaDam
let metaKh

const fetchMeta = async url => {
    let res = await fetch(url)
    return await res.json()
}

fetchMeta("https://wingman-bim--api.cyclic.app/aachen")
    .then(data => {
        metaAachen = data
    })

fetchMeta("https://wingman-bim--api.cyclic.app/schependomlaan")
    .then(data => {
        metaDutch = data
    })

fetchMeta("https://wingman-bim--api.cyclic.app/waterlock")
    .then(data => {
        metaDam = data
    })

fetchMeta("https://wingman-bim--api.cyclic.app/hospital")
    .then(data => {
        metaKh = data
    })

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


