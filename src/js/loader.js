
import { viewer, xktLoader, loadModel, selectModel } from "./viewer_components/viewer";
import * as mesh from "./viewer_components/mesh"
import * as navCube from "./viewer_components/navCube"
import { flyCam } from "./viewer_components/utils";
import data from "../data/projects.json"
import { treeView } from "./viewer_components/treeView";
import { canvasContextMenu, objectContextMenu } from "./viewer_components/contextMenu";

export let models = [];

selectModel(0, 0, data, models)