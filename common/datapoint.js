"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Datapoint = void 0;
var Datapoint = /** @class */ (function () {
    function Datapoint(root, index, chart_root) {
        this.value_text = "";
        this.label_text = "";
        this.svg_element = root;
        this.true_index = index;
        var label_ids_str = root.getAttribute("aria-labelledby");
        var value_element = root.querySelector("[role='datavalue']");
        if (value_element) {
            this.value_text = value_element.textContent.trim();
            this.value = parseFloat(this.value_text.replace(/\,/g, ''));
            if (!label_ids_str) {
                label_ids_str = value_element.getAttribute("aria-labelledby");
            }
        }
        var label_ids = label_ids_str.match(/\S+/g) || [];
        for (var index_1 = 0; index_1 < label_ids.length; index_1++) {
            var label_element = chart_root.querySelector("#" + label_ids[index_1]);
            if ((label_element) && (label_element !== root)
                && (label_element !== value_element)) {
                if (this.label_text) {
                    this.label_text += ", ";
                }
                this.label_text += label_element.textContent.trim();
            }
        }
    }
    Datapoint.prototype.getComparisonTo = function (value, label, difference) {
        if (label === void 0) { label = ""; }
        if (difference === void 0) { difference = true; }
        return {
            label: label,
            difference: (difference) ? Math.round(Datapoint.ROUND_FACTOR
                * (this.value - value)) / Datapoint.ROUND_FACTOR : undefined,
            percentage: Math.round(this.value / value * 100
                * Datapoint.ROUND_FACTOR) / Datapoint.ROUND_FACTOR
        };
    };
    Datapoint.DECIMAL_PRECISION = 2;
    Datapoint.ROUND_FACTOR = Math.pow(10, (Datapoint.DECIMAL_PRECISION));
    return Datapoint;
}());
exports.Datapoint = Datapoint;
