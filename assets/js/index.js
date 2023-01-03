
// CREATE VIEWER

import { Viewer } from "../../src/viewer/Viewer.js";
import { XKTLoaderPlugin } from "../../src/plugins/XKTLoaderPlugin/XKTLoaderPlugin.js";

// import menu
import { ContextMenu } from "../../src/extras/ContextMenu/ContextMenu.js";
import { TreeViewPlugin } from "../../src/plugins/TreeViewPlugin/TreeViewPlugin.js";

// import nav cube
import { NavCubePlugin } from "../../src/plugins/NavCubePlugin/NavCubePlugin.js";

// import mesh 
import { Mesh } from "../../src/viewer/scene/mesh/Mesh.js";
import { VBOGeometry } from "../../src/viewer/scene/geometry/VBOGeometry.js";
import { buildGridGeometry } from "../../src/viewer/scene/geometry/builders/buildGridGeometry.js";
import { PhongMaterial } from "../../src/viewer/scene/materials/PhongMaterial.js";


const viewer = new Viewer({
    canvasId: "myCanvas"
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

// LOAD MODELS

const xktLoader = new XKTLoaderPlugin(viewer);

var globalModel = [];

var globalCraneRefresh;

var globalCrane;

function clearCanvas() {
    globalModel.forEach(element => element.destroy());
    globalModel.length = 0;
    stopRefresh(globalRefresh);
    stopGeoRefresh();
    lastEntity = null;
    clearProperty();
    document.getElementById("location").innerHTML = "Loading geo data...";
    document.getElementById("weather").innerHTML = "";
}

function enable(i, value) {
    document.getElementsByTagName("button")[i].setAttribute("onclick", value)
    document.getElementsByTagName("button")[i].removeAttribute("disabled")
    document.getElementsByTagName("button")[i].style.backgroundColor = "white";
    document.getElementsByTagName("button")[i].style.fontStyle = "normal";
}

function disable(i) {
    document.getElementsByTagName("button")[i].setAttribute("disabled", "disabled")
    document.getElementsByTagName("button")[i].removeAttribute("onclick")
    document.getElementsByTagName("button")[i].style.backgroundColor = "rgb(161, 161, 161)";
    document.getElementsByTagName("button")[i].style.fontStyle = "normal";
}

function select(i, value) {
    document.getElementsByTagName("button")[i].setAttribute("disabled", "disabled")
    document.getElementsByTagName("button")[i].removeAttribute("onclick")
    document.getElementsByTagName("button")[i].style.backgroundColor = "rgb(220,180,50)";
    document.getElementsByTagName("button")[i].style.fontStyle = "italic";
}

function restoreCamera(i) {
    globalModel[i].on("loaded", () => {
        viewer.cameraFlight.flyTo({
            projection: "perspective",
            aabb: viewer.scene.getAABB({}),
            duration: 0
        });
    });
}

//----------------------------------------------------------------------------------------------------------------------
document.initAachenEarly = function () {

    select(0);
    enable(1, "document.initAachenMid()");
    enable(2, "document.initAachenEnd()");

    if (globalModel != undefined) { clearCanvas(); }

    globalModel.push(xktLoader.load({
        src: "../app/data/projects/Aachen/buildings.xkt",
        metaModelSrc: "../app/data/projects/Aachen/buildings.json",
        edges: true
    }));

    globalModel[0].on("loaded", () => {
        globalModel.push(xktLoader.load({
            src: "../app/data/projects/Aachen/streets.xkt",
            metaModelSrc: "../app/data/projects/Aachen/streets.json",
            edges: true,
        }));

        globalModel[1].on("loaded", () => {
            globalModel.push(xktLoader.load({
                src: "../app/data/projects/Aachen/pipes.xkt",
                metaModelSrc: "../app/data/projects/Aachen/pipes.json",
                edges: true,
            }));

            globalModel[2].on("loaded", () => {
                viewer.cameraFlight.flyTo({
                    projection: "perspective",
                    eye: [25, 150, 75],
                    look: [0, 5, 0],
                    up: [-0.01, 0.99, 0.039],
                    duration: 0
                });
            });
        });
    });

    // loadGeo("https://api.openweathermap.org/data/2.5/weather?id=3247449&appid=164d9c87e52c6093c36d1dc348e167d8");

}

//----------------------------------------------------------------------------------------------------------------------
document.initAachenMid = function () {
    select(1);
    enable(0, "document.initAachenEarly()");
    enable(2, "document.initAachenEnd()");

    clearCanvas()



    globalModel.push(xktLoader.load({
        id: "buildings",
        src: "../app/data/projects/Aachen/buildings.xkt",
        metaModelSrc: "../app/data/projects/Aachen/buildings.json",
        edges: true
    }));

    globalModel[0].on("loaded", () => {
        globalModel.push(xktLoader.load({
            id: "streets",
            src: "../app/data/projects/Aachen/streets.xkt",
            metaModelSrc: "../app/data/projects/Aachen/streets.json",
            edges: true
        }));

        globalModel[1].on("loaded", () => {
            globalModel.push(xktLoader.load({
                id: "pipes",
                src: "../app/data/projects/Aachen/pipes.xkt",
                metaModelSrc: "../app/data/projects/Aachen/pipes.json",
                edges: true
            }));

            globalModel[2].on("loaded", () => {
                globalModel.push(xktLoader.load({
                    id: "sensor",
                    src: "../app/data/projects/Aachen/sensor.xkt",
                    metaModelSrc: "../app/data/projects/Aachen/sensor.json",
                    edges: true
                }));

                globalModel[3].on("loaded", () => {
                    globalModel.push(xktLoader.load({
                        id: "site",
                        src: "../app/data/projects/Aachen/site.xkt",
                        metaModelSrc: "../app/data/projects/Aachen/site.json",
                        edges: true
                    }));

                    globalModel[4].on("loaded", () => {
                        viewer.cameraFlight.flyTo({
                            projection: "perspective",
                            eye: [25, 150, 75],
                            look: [0, 5, 0],
                            up: [-0.01, 0.99, 0.039],
                            duration: 0

                        });
                    });
                });
            });
        });
    });



    // loadGeo("https://api.openweathermap.org/data/2.5/weather?id=3247449&appid=164d9c87e52c6093c36d1dc348e167d8");

}

//----------------------------------------------------------------------------------------------------------------------
document.initAachenEnd = function () {
    select(2);
    enable(0, "document.initAachenEarly()");
    enable(1, "document.initAachenMid()");

    clearCanvas()

    globalModel.push(xktLoader.load({
        src: "../app/data/projects/Aachen/built.xkt",
        metaModelSrc: "../app/data/projects/Aachen/built.json",
        edges: true
    }));

    globalModel[0].on("loaded", () => {
        globalModel.push(xktLoader.load({
            src: "../app/data/projects/Aachen/buildings.xkt",
            metaModelSrc: "../app/data/projects/Aachen/buildings.json",
            edges: true,
        }));

        globalModel[0].on("loaded", () => {
            globalModel.push(xktLoader.load({
                src: "../app/data/projects/Aachen/streets.xkt",
                metaModelSrc: "../app/data/projects/Aachen/streets.json",
                edges: true,
            }));

            globalModel[1].on("loaded", () => {
                globalModel.push(xktLoader.load({
                    src: "../app/data/projects/Aachen/pipes.xkt",
                    metaModelSrc: "../app/data/projects/Aachen/pipes.json",
                    edges: true,
                }));

                globalModel[2].on("loaded", () => {
                    viewer.cameraFlight.flyTo({
                        projection: "perspective",
                        eye: [25, 150, 75],
                        look: [0, 5, 0],
                        up: [-0.01, 0.99, 0.039],
                        duration: 0
                    });
                });
            });
        });
    });

    // loadGeo("https://api.openweathermap.org/data/2.5/weather?id=3247449&appid=164d9c87e52c6093c36d1dc348e167d8");

}

//----------------------------------------------------------------------------------------------------------------------
document.initWaterlock = function () {

    select(1);
    disable(0);
    disable(2);

    clearCanvas();

    globalModel.push(xktLoader.load({
        src: "../app/data/projects/WaterLock/models/design/geometry.xkt",
        metaModelSrc: "../app/data/projects/WaterLock/models/design/metadata.json",
        edges: true
    }));

    // loadGeo("https://api.openweathermap.org/data/2.5/weather?id=2759661&appid=164d9c87e52c6093c36d1dc348e167d8");

    restoreCamera(0);

}

//----------------------------------------------------------------------------------------------------------------------
document.initSchependomlaan = function () {

    select(2);
    disable(0);
    disable(1);

    clearCanvas();

    globalModel.push(xktLoader.load({
        src: "../app/data/projects/Schependomlaan/models/design/geometry.xkt",
        metaModelSrc: "../app/data/projects/Schependomlaan/models/design/metadata.json",
        edges: true
    }));

    restoreCamera(0);

    // loadGeo("https://api.openweathermap.org/data/2.5/weather?id=2750053&appid=164d9c87e52c6093c36d1dc348e167d8");

}


//----------------------------------------------------------------------------------------------------------------------
document.initHospital = function () {

    select(2);
    disable(0);
    disable(1);

    clearCanvas();

    globalModel.push(xktLoader.load({
        src: "../app/data/projects/WestRiversideHospital/models/architectural/geometry.xkt",
        metaModelSrc: "../app/data/projects/WestRiversideHospital/models/architectural/metadata.json",
        edges: true
    }));

    globalModel.push(xktLoader.load({
        src: "../app/data/projects/WestRiversideHospital/models/electrical/geometry.xkt",
        metaModelSrc: "../app/data/projects/WestRiversideHospital/models/electrical/metadata.json",
        edges: true
    }));

    globalModel.push(xktLoader.load({
        src: "../app/data/projects/WestRiversideHospital/models/fireAlarms/geometry.xkt",
        metaModelSrc: "../app/data/projects/WestRiversideHospital/models/fireAlarms/metadata.json",
        edges: true
    }));

    globalModel.push(xktLoader.load({
        src: "../app/data/projects/WestRiversideHospital/models/mechanical/geometry.xkt",
        metaModelSrc: "../app/data/projects/WestRiversideHospital/models/mechanical/metadata.json",
        edges: true
    }));

    globalModel.push(xktLoader.load({
        src: "../app/data/projects/WestRiversideHospital/models/plumbing/geometry.xkt",
        metaModelSrc: "../app/data/projects/WestRiversideHospital/models/plumbing/metadata.json",
        edges: true
    }));

    globalModel.push(xktLoader.load({
        src: "../app/data/projects/WestRiversideHospital/models/sprinklers/geometry.xkt",
        metaModelSrc: "../app/data/projects/WestRiversideHospital/models/sprinklers/metadata.json",
        edges: true
    }));


    globalModel.push(xktLoader.load({
        src: "../app/data/projects/WestRiversideHospital/models/structure/geometry.xkt",
        metaModelSrc: "../app/data/projects/WestRiversideHospital/models/structure/metadata.json",
        edges: true
    }));

    restoreCamera(6);

    // loadGeo("https://api.openweathermap.org/data/2.5/weather?id=5368361&appid=164d9c87e52c6093c36d1dc348e167d8");

}
//------------------------------------------------------------------------------------------------------------------
// Create a mesh with grid
//------------------------------------------------------------------------------------------------------------------


new Mesh(viewer.scene, {
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

//------------------------------------------------------------------------------------------------------------------
// Create a Navigation Cube
//------------------------------------------------------------------------------------------------------------------


// new NavCubePlugin(viewer, {
//     canvasId: "myNavCubeCanvas",
//     visible: true,           // Initially visible (default)
//     size: 200,               // NavCube size in pixels (default is 200)
//     alignment: "topLeft",   // Align NavCube to top-left of Viewer canvas
//     topMargin: 50,          // 170 pixels margin from top of Viewer canvas
//     cameraFly: true,       // Fly camera to each selected axis/diagonal
//     cameraFitFOV: 45,        // How much field-of-view the scene takes once camera has fitted it to view
//     cameraFlyDuration: 0.5, // How long (in seconds) camera takes to fly to each new axis/diagonal
//     color: "#FFFFFF",
//     synchProjection: true
// });