"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Axis = void 0;
var chart_1 = require("./chart");
var Axis = /** @class */ (function () {
    function Axis(root, variable, role, chart_root) {
        this.type = "";
        this.svg_element = root;
        this.variable = variable;
        this.labels = root.querySelectorAll("[role='axislabel']");
        this.min = root.getAttribute("aria-valuemin");
        if (!this.min) {
            this.min = this.labels[0].textContent.trim();
        }
        this.max = root.getAttribute("aria-valuemax");
        if (!this.max) {
            this.max = this.labels[this.labels.length - 1].textContent.trim();
        }
        this.type = root.getAttribute("aria-axistype") || "";
        this.title = chart_1.Chart.getTitle(root, role, chart_root);
    }
    return Axis;
}());
exports.Axis = Axis;
