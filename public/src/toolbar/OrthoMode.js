import {Controller} from "../Controller.js";
import {math} from "@xeokit/xeokit-sdk/src/viewer/scene/math/math.js";

/** @private */
class OrthoMode extends Controller {

    constructor(parent, cfg) {

        super(parent, cfg);

        if (!cfg.buttonElement) {
            throw "Missing config: buttonElement";
        }

        this._buttonElement = cfg.buttonElement;

        this.on("enabled", (enabled) => {
            if (!enabled) {
                this._buttonElement.classList.add("disabled");
            } else {
                this._buttonElement.classList.remove("disabled");
            }
        });

        this._buttonElement.addEventListener("click", (event) => {
            this.setActive(!this.getActive());
            event.preventDefault();
        });

        this.bimViewer.on("reset", ()=>{
            this.setActive(false);
        });
    }

    setActive(active, done) {
        if (this._active === active) {
            if (done) {
                done();
            }
            return;
        }
        this._active = active;
        if (active) {
            this._buttonElement.classList.add("active");
            if (done) {
                this._enterOrthoMode(() => {
                    this.fire("active", this._active);
                    done();
                });
            } else {
                this._enterOrthoMode();
                this.fire("active", this._active);
            }
        } else {
            this._buttonElement.classList.remove("active");
            if (done) {
                this._exitOrthoMode(() => {
                    this.fire("active", this._active);
                    done();
                });
            } else {
                this._exitOrthoMode();
                this.fire("active", this._active);
            }
        }
    }

    _enterOrthoMode(done) {
        this.viewer.cameraFlight.flyTo({projection: "ortho", duration: 0.5}, done);
    }

    _exitOrthoMode(done) {
        this.viewer.cameraFlight.flyTo({projection: "perspective", duration: 0.5}, done);
    }
}

export {OrthoMode};