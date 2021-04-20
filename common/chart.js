"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chart = void 0;
var dataset_1 = require("./dataset");
var axis_1 = require("./axis");
var legend_1 = require("./legend");
// Class representing a whole chart
var Chart = /** @class */ (function () {
    // ---
    // Description: Extracts all chart data and components.
    // root: Chart root element.
    // ---
    function Chart(root) {
        var _this = this;
        // Chart components
        // Data series:
        this.datasets = [];
        this.axes = {
            x: undefined,
            y: undefined,
            others: new Array(0)
        };
        this.legends = [];
        this.root = root;
        this.type = root.getAttribute("aria-charttype");
        if (this.type) {
            this.type = this.type.toLowerCase().trim();
        }
        this.title = Chart.getTitle(this.root, "chart", this.root);
        var element = root.querySelector("[role='chartarea']");
        if (element) {
            this.x = element.getAttribute("x");
            this.y = element.getAttribute("y");
            this.width = element.getAttribute("width");
            this.height = element.getAttribute("height");
        }
        Chart.extractAll(root, "dataset", function (item) {
            _this.datasets.push(new dataset_1.Dataset(item, _this.root));
        });
        Chart.extractAll(root, "legend", function (item) {
            _this.legends.push(new legend_1.Legend(item, _this.root));
        });
        Chart.extractAll(root, "axis", function (item) {
            var variable = item.getAttribute("aria-variable");
            var axis = new axis_1.Axis(item, variable, "axis", _this.root);
            if ((variable === "x") || (variable === "y")) {
                _this.axes[variable] = axis;
            }
            else {
                _this.axes.others.push(axis);
            }
        });
        // Fallback for Describler axis roles
        if (!this.axes.x) {
            var element_1 = root.querySelector("[role='xaxis']");
            if (element_1) {
                this.axes.x = new axis_1.Axis(element_1, "x", "xaxis", this.root);
            }
        }
        if (!this.axes.y) {
            var element_2 = root.querySelector("[role='yaxis']");
            if (element_2) {
                this.axes.y = new axis_1.Axis(element_2, "y", "yaxis", this.root);
            }
        }
    }
    Chart.extractAll = function (root, type, callback, required_parent_role) {
        var elements = root.querySelectorAll("[role='" + type + "']");
        for (var index = 0; index < elements.length; index++) {
            if ((!required_parent_role) ||
                (Chart.hasParent(elements[index], required_parent_role))) {
                callback(elements[index]);
            }
        }
    };
    Chart.getTitle = function (element, role, root) {
        // First, consider a possible aria-labelledby property
        var label_ids_str = element.getAttribute("aria-labelledby") || "";
        var label_ids = label_ids_str.match(/\S+/g) || [];
        var label = "";
        for (var index = 0; index < label_ids.length; index++) {
            var label_element = root.querySelector("#" + label_ids[index]);
            if ((label_element) && (label_element !== element)) {
                if (label) {
                    label += ", ";
                }
                label += label_element.textContent.trim();
            }
        }
        if (label) {
            return label;
        }
        // If no title has been found this way, search for a child element with ARIA role "heading"
        var title_element = element.querySelector("[role='heading']");
        if ((title_element) && (Chart.hasParent(title_element, role))) {
            return title_element.textContent.trim();
        }
        // If still no title has been found, consider the property "aria-label":
        if (label = element.getAttribute("aria-label")) {
            return label.trim();
        }
        // If still no title has been found, search for a child <title> element
        // without ARIA role:
        title_element = element.querySelector("title");
        if ((title_element) && (!title_element.getAttribute("role"))
            && (Chart.hasParent(title_element, role))) {
            return title_element.textContent.trim();
        }
        // As a last attempt, look fora child <text> element without ARIA role:
        title_element = element.querySelector("text");
        if ((title_element) && (!title_element.getAttribute("role"))
            && (Chart.hasParent(title_element, role))) {
            return title_element.textContent.trim();
        }
        // It seems there is no suitable text at all, so return an empty string:
        return "";
    };
    Chart.hasParent = function (element, role) {
        var parent_role = "", parent_element = element.parentElement;
        // Find the next parent of the given element with any ARIA role:
        while ((parent_element) &&
            !(parent_role = parent_element.getAttribute("role"))) {
            parent_element = parent_element.parentElement;
        }
        // Check if this parent has the required role:
        return (parent_role === role);
    };
    return Chart;
}());
exports.Chart = Chart;
