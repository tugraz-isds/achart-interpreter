"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Legend = void 0;
var chart_1 = require("./chart");
var Legend = /** @class */ (function () {
    function Legend(root, chart_root) {
        this.title = "";
        this.min = "";
        this.max = "";
        this.svg_element = root;
        this.title = chart_1.Chart.getTitle(this.svg_element, "legend", chart_root);
        this.labels = root.querySelectorAll("[role='legenditem']");
        this.min = root.getAttribute("aria-valuemin");
        if (!this.min) {
            this.min = this.labels[0].textContent.trim();
        }
        this.max = root.getAttribute("aria-valuemax");
        if (!this.max) {
            this.max = this.labels[this.labels.length - 1].textContent.trim();
        }
    }
    return Legend;
}());
exports.Legend = Legend;
