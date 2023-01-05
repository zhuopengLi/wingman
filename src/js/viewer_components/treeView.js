import { ContextMenu, TreeViewPlugin } from "@xeokit/xeokit-sdk";
import { viewer } from "./viewer";

export const treeView = new TreeViewPlugin(viewer, {
    containerElement: document.getElementById("left-panel"),
    autoExpandDepth: 0,
    hierarchy: "containment"
});

export const treeViewContextMenu = new ContextMenu({

    items: [
        [
            {
                title: "View Fit",
                doAction: context => {
                    const scene = context.viewer.scene;
                    const objectIds = [];
                    context.treeViewPlugin.withNodeTree(context.treeViewNode, (treeViewNode) => {
                        if (treeViewNode.objectId) {
                            objectIds.push(treeViewNode.objectId);
                        }
                    });
                    scene.setObjectsVisible(objectIds, true);
                    scene.setObjectsHighlighted(objectIds, true);
                    context.viewer.cameraFlight.flyTo({
                        projection: "perspective",
                        aabb: scene.getAABB(objectIds),
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
                doAction: context => {
                    const scene = context.viewer.scene;
                    context.viewer.cameraFlight.flyTo({
                        projection: "perspective",
                        aabb: scene.getAABB({}),
                        duration: 0.5
                    });
                }
            }
        ],
        [
            {
                title: "X-Ray Others",
                doAction: context => {
                    var entity = context.treeViewNode;
                    const viewer = context.viewer;
                    const scene = viewer.scene;
                    const metaObject = viewer.metaScene.metaObjects[entity.objectId];

                    //console.log(viewer.metaScene.metaObjects)
                    getInfo(metaObject);

                    if (lastEntity != null) {
                        lastEntity.colorize = lastColorize;
                        lastEntity = null;
                        lastColorize = null;
                        stopRefresh(globalRefresh);

                    }
                    if (context.entity != undefined) {
                        lastEntity = context.entity;
                        lastColorize = context.entity.colorize.slice();
                        context.entity.colorize = [1, 130 / 255, 0];
                    }
                    context.viewer.cameraFlight.flyTo({
                        projection: "perspective",
                        aabb: scene.getAABB(entity.objectId),
                        duration: 0.5
                    });

                    scene.setObjectsVisible(scene.objectIds, true);
                    scene.setObjectsXRayed(scene.objectIds, true);
                    scene.setObjectsSelected(scene.selectedObjectIds, false);
                    scene.setObjectsHighlighted(scene.highlightedObjectIds, false);
                    context.treeViewPlugin.withNodeTree(context.treeViewNode, (treeViewNode) => {
                        if (treeViewNode.objectId) {
                            const entity = scene.objects[treeViewNode.objectId];
                            if (entity) {
                                entity.xrayed = false;
                            }
                        }
                    });
                }
            },
            {
                title: "Reset X-Ray",
                getEnabled: context => {
                    return (context.viewer.scene.numXRayedObjects > 0);
                },
                doAction: context => {
                    context.viewer.scene.setObjectsXRayed(context.viewer.scene.xrayedObjectIds, false);
                    clearProperty();
                    lastEntity.colorize = lastColorize;
                    lastEntity = null;
                    lastColorize = null;

                }
            }
        ]
    ]
});

// Right-clicking on a tree node shows the context menu for that node

treeView.on("contextmenu", e => {

    treeViewContextMenu.context = { // Must set context before opening menu
        viewer: e.viewer,
        treeViewPlugin: e.treeViewPlugin,
        treeViewNode: e.treeViewNode,
        entity: e.viewer.scene.objects[e.treeViewNode.objectId] // Only defined if tree node is a leaf node
    };

    treeViewContextMenu.show(e.event.pageX, e.event.pageY);
});

// Left-clicking on a tree node isolates that object in the 3D view

treeView.on("nodeTitleClicked", e => {
    const scene = viewer.scene;
    const entity = e.viewer.scene.objects[e.treeViewNode.objectId];
    const objectIds = [];

    e.treeViewPlugin.withNodeTree(e.treeViewNode, (treeViewNode) => {
        if (treeViewNode.objectId) {
            objectIds.push(treeViewNode.objectId);
        }

    });
    e.treeViewPlugin.unShowNode();

    const metaObject = e.viewer.metaScene.metaObjects[objectIds[0]];

    scene.setObjectsXRayed(scene.objectIds, true);
    scene.setObjectsVisible(scene.objectIds, true);
    scene.setObjectsXRayed(objectIds, false);
    viewer.cameraFlight.flyTo({
        aabb: scene.getAABB(objectIds),
        duration: 0.5
    }, () => {
        setTimeout(function () {
            scene.setObjectsVisible(scene.xrayedObjectIds, true);
            scene.setObjectsXRayed(scene.xrayedObjectIds, true);
        }, 500);
    });


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

    getInfo(metaObject);

});