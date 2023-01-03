import { models } from "../js/loader";
import { clear, selectModel } from "../js/viewer_components/viewer";
import data from "../data/projects.json";

let project = document.querySelector("select");
let phases = [
    document.querySelector("#preBtn"),
    document.querySelector("#conBtn"),
    document.querySelector("#builtBtn")
]

project?.addEventListener("change", () => {
    switch (project?.value) {
        case "aachen":
            clear(models);
            selectModel(0, 0, data, models);
            phases[0].className = "btn btn--muted"
            phases[1].className = "btn btn--transparent"
            phases[2].className = "btn btn--transparent"
            break;
        case "waterlock":
            clear(models);
            selectModel(1, 1, data, models);
            phases[0].className = "btn btn--disabled"
            phases[1].className = "btn btn--muted"
            phases[2].className = "btn btn--disabled"
            break;
        case "schependomlaan":
            clear(models);
            selectModel(2, 2, data, models);
            phases[0].className = "btn btn--disabled"
            phases[1].className = "btn btn--disabled"
            phases[2].className = "btn btn--muted"
            break;
        case "hospital":
            clear(models);
            selectModel(3, 2, data, models);
            phases[0].className = "btn btn--disabled"
            phases[1].className = "btn btn--disabled"
            phases[2].className = "btn btn--muted"
            break;
    }
});

if (project?.value == "aachen") {

    phases[0]?.addEventListener("click", () => {
        if (phases[0].classList.contains("btn--transparent")) {
            clear(models);
            selectModel(0, 0, data, models);
            phases[0].className = "btn btn--muted"
            phases[1].className = "btn btn--transparent"
            phases[2].className = "btn btn--transparent"
        }
    })

    phases[1]?.addEventListener("click", () => {
        if (phases[1].classList.contains("btn--transparent")) {
            clear(models);
            selectModel(0, 1, data, models);
            phases[0].className = "btn btn--transparent"
            phases[1].className = "btn btn--muted"
            phases[2].className = "btn btn--transparent"
        }
    })

    phases[2]?.addEventListener("click", () => {
        if (phases[2].classList.contains("btn--transparent")) {
            clear(models);
            selectModel(0, 2, data, models);
            phases[0].className = "btn btn--transparent"
            phases[1].className = "btn btn--transparent"
            phases[2].className = "btn btn--muted"
        }
    })
}