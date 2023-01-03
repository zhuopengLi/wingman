
import { ContextMenu } from "@xeokit/xeokit-sdk";
import { viewer } from "./viewer";
import { treeView, treeViewContextMenu } from "./treeView"

export const canvasContextMenu = new ContextMenu({
    enabled: true,
    context: {
        viewer: viewer
    },
    items: [
        [
            {
                title: "Hide All",
                getEnabled: function (context) {
                    return (context.viewer.scene.numVisibleObjects > 0);
                },
                doAction: function (context) {
                    context.viewer.scene.setObjectsVisible(context.viewer.scene.visibleObjectIds, false);
                }
            },
            {
                title: "Show All",
                getEnabled: function (context) {
                    const scene = context.viewer.scene;
                    return (scene.numVisibleObjects < scene.numObjects);
                },
                doAction: function (context) {
                    const scene = context.viewer.scene;
                    scene.setObjectsVisible(scene.objectIds, true);
                    scene.setObjectsXRayed(scene.xrayedObjectIds, false);
                    scene.setObjectsSelected(scene.selectedObjectIds, false);
                }
            }
        ],
        [
            {
                title: "View Fit All",
                doAction: function (context) {
                    context.viewer.cameraFlight.flyTo({
                        aabb: context.viewer.scene.getAABB()
                    });
                }
            }
        ]
    ]
});

export const objectContextMenu = new ContextMenu({
    items: [
        [
            {
                title: "View Fit",
                doAction: function (context) {
                    const viewer = context.viewer;
                    const scene = viewer.scene;
                    const entity = context.entity;
                    viewer.cameraFlight.flyTo({
                        aabb: entity.aabb,
                        duration: 0.5
                    }, () => {
                        setTimeout(function () {
                            scene.setObjectsHighlighted(scene.highlightedObjectIds, false);
                        }, 500);
                    });
                }
            },
            {
                title: "View Fit All",
                doAction: function (context) {
                    const scene = context.viewer.scene;
                    context.viewer.cameraFlight.flyTo({
                        projection: "perspective",
                        aabb: scene.getAABB(),
                        duration: 0.5
                    });
                }
            },
            {
                title: "Show in Tree",
                doAction: function (context) {
                    const objectId = context.entity.id;
                    context.treeViewPlugin.showNode(objectId);
                }
            }
        ],
        [
            {
                title: "X-Ray Others",
                doAction: function (context) {

                    const entity = context.entity;
                    const viewer = context.viewer;
                    const scene = viewer.scene;
                    const metaObject = viewer.metaScene.metaObjects[entity.id];

                    getInfo(metaObject);

                    if (!metaObject) {
                        return;
                    }

                    if (lastEntity != null) {
                        lastEntity.colorize = lastColorize;
                        lastEntity = null;
                        lastColorize = null;
                        stopRefresh(globalRefresh);

                    }
                    if (entity != undefined) {
                        lastEntity = entity;
                        lastColorize = entity.colorize.slice();
                        entity.colorize = [1, 130 / 255, 0];
                    }

                    viewer.cameraFlight.flyTo({
                        aabb: entity.aabb,
                        duration: 0.5
                    });

                    scene.setObjectsVisible(scene.objectIds, true);
                    scene.setObjectsXRayed(scene.objectIds, true);
                    scene.setObjectsSelected(scene.selectedObjectIds, false);
                    scene.setObjectsHighlighted(scene.highlightedObjectIds, false);
                    metaObject.withMetaObjectsInSubtree((metaObject) => {
                        const entity = scene.objects[metaObject.id];
                        if (entity) {
                            entity.xrayed = false;
                        }
                    });
                }
            },
            {
                title: "Reset X-Ray",
                getEnabled: function (context) {
                    return (context.viewer.scene.numXRayedObjects > 0);
                },
                doAction: function (context) {
                    context.viewer.scene.setObjectsXRayed(context.viewer.scene.xrayedObjectIds, false);
                    clearProperty();
                    lastEntity.colorize = lastColorize;
                    lastEntity = null;
                    lastColorize = null;

                }
            }
        ]
    ],
    enabled: true
});

export default viewer.cameraControl.on("rightClick", e => {

    var hit = viewer.scene.pick({
        canvasPos: e.canvasPos
    });

    if (hit && hit.entity.isObject) {

        objectContextMenu.context = {
            viewer: viewer,
            treeViewPlugin: treeView,
            entity: hit.entity
        };

        objectContextMenu.show(e.event.pageX, e.event.pageY);

    } else {

        canvasContextMenu.context = {
            viewer: viewer
        };

        canvasContextMenu.show(e.event.pageX, e.event.pageY);
    }

    e.event.preventDefault();
});