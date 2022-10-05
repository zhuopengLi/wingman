import {Controller} from "../Controller.js";
import {SectionPlanesPlugin} from "@xeokit/xeokit-sdk/src/plugins/SectionPlanesPlugin/SectionPlanesPlugin.js";
import {SectionToolContextMenu} from "./../contextMenus/SectionToolContextMenu.js";
import {math} from "@xeokit/xeokit-sdk/src/viewer/scene/math/math.js";

/** @private */
class SectionTool extends Controller { // XX

    constructor(parent, cfg) {

        super(parent, cfg);

        if (!cfg.buttonElement) {
            throw "Missing config: buttonElement";
        }

        if (!cfg.menuButtonElement) {
            throw "Missing config: menuButtonElement";
        }

        this._buttonElement = cfg.buttonElement;
        this._counterElement = cfg.counterElement;
        this._menuButtonElement = cfg.menuButtonElement;
        this._menuButtonArrowElement = cfg.menuButtonArrowElement;

        this._sectionPlanesPlugin = new SectionPlanesPlugin(this.viewer, {});

        this._sectionToolContextMenu = new SectionToolContextMenu({
            sectionPlanesPlugin: this._sectionPlanesPlugin,
            hideOnMouseDown: false
        });

        this._sectionPlanesPlugin.setOverviewVisible(false);

        this.on("enabled", (enabled) => {
            if (!enabled) {
                this._buttonElement.classList.add("disabled");
                if (this._counterElement) {
                    this._counterElement.classList.add("disabled");
                }
                this._menuButtonElement.classList.add("disabled");
                this._menuButtonArrowElement.classList.add("disabled");
            } else {
                this._buttonElement.classList.remove("disabled");
                if (this._counterElement) {
                    this._counterElement.classList.remove("disabled");
                }
                this._menuButtonElement.classList.remove("disabled");
                this._menuButtonArrowElement.classList.remove("disabled");
            }
        });

        this.on("active", (active) => {
            if (active) {
                this._buttonElement.classList.add("active");
                if (this._counterElement) {
                    this._counterElement.classList.add("active");
                }
                this._menuButtonElement.classList.add("active");
                this._menuButtonArrowElement.classList.add("active");
            } else {
                this._buttonElement.classList.remove("active");
                if (this._counterElement) {
                    this._counterElement.classList.remove("active");
                }
                this._menuButtonElement.classList.remove("active");
                this._menuButtonArrowElement.classList.remove("active");
            }
        });

        this.on("active", (active) => {
            if (!active) {
                this._sectionPlanesPlugin.hideControl();
            }
        });

        this._buttonElement.addEventListener("click", (e) => {
            if (!this.getEnabled()) {
                return;
            }
            if (e.target === this._menuButtonElement || e.target.parentNode === this._menuButtonElement) {
                return;
            }
            const active = this.getActive();
            this.setActive(!active);
            e.preventDefault();
        });

        document.addEventListener("mousedown", (e) => {

            if (e.target.classList.contains("xeokit-context-menu-item")) {
                // Allow click on menu item
                return;
            }

            if (e.target === this._menuButtonElement || e.target.parentNode === this._menuButtonElement) {
                e.preventDefault();
                if (this._sectionToolContextMenu.shown) {
                    this._sectionToolContextMenu.hide();
                } else {
                    this._sectionToolContextMenu.context = {
                        bimViewer: this.bimViewer,
                        viewer: this.viewer,
                        sectionTool: this
                    };

                    const rect = this._menuButtonElement.getBoundingClientRect();

                    this._sectionToolContextMenu.show(rect.left, rect.bottom + 5);
                }
            } else {
                this._sectionToolContextMenu.hide();
            }
        });

        this._sectionToolContextMenu.on("shown", () => {
            this._menuButtonArrowElement.classList.remove("xeokit-arrow-down");
            this._menuButtonArrowElement.classList.add("xeokit-arrow-up");
        });

        this._sectionToolContextMenu.on("hidden", () => {
            this._menuButtonArrowElement.classList.remove("xeokit-arrow-up");
            this._menuButtonArrowElement.classList.add("xeokit-arrow-down");
        });

        this.bimViewer.on("reset", () => {
            this.clear();
            this.setActive(false);
        });

        this._initSectionMode();
    }

    _initSectionMode() {

        this.viewer.scene.input.on("mouseclicked", (coords) => {

            if (!this.getActive() || !this.getEnabled()) {
                return;
            }

            const pickResult = this.viewer.scene.pick({
                canvasPos: coords,
                pickSurface: true  // <<------ This causes picking to find the intersection point on the entity
            });

            if (pickResult) {

                const sectionPlane = this._sectionPlanesPlugin.createSectionPlane({
                    pos: pickResult.worldPos,
                    dir: math.mulVec3Scalar(pickResult.worldNormal, -1)
                });

                sectionPlane.on("destroyed", () => {
                    this._updateSectionPlanesCount();
                });

                this._sectionPlanesPlugin.showControl(sectionPlane.id);

                this._updateSectionPlanesCount();
            }
        });

        this._updateSectionPlanesCount();
    }

    _updateSectionPlanesCount() {
        if (this._counterElement) {
            this._counterElement.innerText = ("" + this.getNumSections());
        }
    }

    getNumSections() {
        return Object.keys(this._sectionPlanesPlugin.sectionPlanes).length;
    }

    clear() {
        this._sectionPlanesPlugin.clear();
        this._updateSectionPlanesCount();
    }

    flipSections() {
        this._sectionPlanesPlugin.flipSectionPlanes();
    }

    destroy() {
        this._sectionPlanesPlugin.destroy();
        this._sectionToolContextMenu.destroy();
        super.destroy();
    }
}

export {SectionTool};