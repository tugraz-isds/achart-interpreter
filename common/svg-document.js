"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SVGDocument = void 0;
var chart_1 = require("./chart");
var SVGDocument = /** @class */ (function () {
    function SVGDocument(root) {
        this.root = undefined;
        this.charts = {
            bar: new Array(0),
            line: new Array(0),
            pie: new Array(0),
            scatter: new Array(0),
            other: new Array(0)
        };
        this.charts_count = 0;
        this.chart_type_counts = new Array(0);
        this.titles = [];
        this.descriptions = [];
        this.root = root;
        // Get all <title> elements
        var elements = root.querySelectorAll("title");
        var index = 0;
        if ((elements[0]) && (((elements[0].parentNode) === this.root)
            || (elements[0].parentElement.getAttribute("role") === "chart"))) {
            this.titles.push(elements[0].textContent.trim());
            index = 1;
        }
        else {
            this.titles.push("");
        }
        for (; index < elements.length; index++) {
            this.titles.push(elements[index].textContent.trim());
        }
        // Get all <desc> elements
        elements = root.querySelectorAll("desc");
        if ((elements[0]) && ((elements[0].parentNode === this.root)
            || (elements[0].parentElement.getAttribute("role") === "chart"))) {
            this.descriptions.push(elements[0].textContent.trim());
            index = 1;
        }
        else {
            this.descriptions.push("");
            index = 0;
        }
        for (; index < elements.length; index++) {
            this.descriptions.push(elements[index].textContent.trim());
        }
        // Extract all charts
        var chart_roots = root.querySelectorAll("[role='chart']");
        if (chart_roots.length === 0) {
            chart_roots = root.parentNode.querySelectorAll("[role='chart']");
        }
        this.charts_count = chart_roots.length;
        this.all_charts = new Array(this.charts_count);
        for (index = 0; index < chart_roots.length; index++) {
            var chart = new chart_1.Chart(chart_roots[index]);
            if (chart.type in this.charts) {
                this.charts[chart.type].push(chart);
            }
            else {
                this.charts.other.push(chart);
            }
        }
        for (var type in this.charts) {
            if (this.charts[type].length > 0) {
                this.chart_type_counts.push({ type: type, count: this.charts[type].length });
            }
        }
    }
    return SVGDocument;
}());
exports.SVGDocument = SVGDocument;
