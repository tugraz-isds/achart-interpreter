"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dataset = void 0;
var chart_1 = require("./chart");
var datapoint_1 = require("./datapoint");
var interfaces_1 = require("./interfaces");
var Dataset = /** @class */ (function () {
    function Dataset(root, chart_root) {
        var _this = this;
        this.title = "";
        this.datapoints = Array(0);
        this.datapoints_sorted_upwards = Array(0);
        this.sum = 0;
        this.svg_element = root;
        this.title = chart_1.Chart.getTitle(root, "dataset", chart_root);
        var datapoints_index = 0;
        chart_1.Chart.extractAll(root, "datapoint", function (element) {
            var datapoint = new datapoint_1.Datapoint(element, datapoints_index++, chart_root);
            _this.datapoints.push(datapoint);
            _this.datapoints_sorted_upwards.push(datapoint);
        });
        this.datapoints_sorted_upwards.sort(function (a, b) {
            return a.value - b.value;
        });
        for (var _i = 0, _a = this.datapoints; _i < _a.length; _i++) {
            var datapoint = _a[_i];
            this.sum += datapoint.value;
        }
        if (this.datapoints_sorted_upwards.length) {
            this.min = [this.datapoints_sorted_upwards[0].label_text,
                this.datapoints_sorted_upwards[0].value];
            this.max = [this.datapoints_sorted_upwards[this.datapoints_sorted_upwards.length - 1].label_text,
                this.datapoints_sorted_upwards[this.datapoints_sorted_upwards.length - 1].value];
            this.range = Math.round(datapoint_1.Datapoint.ROUND_FACTOR * (this.max[1]
                - this.min[1])) / datapoint_1.Datapoint.ROUND_FACTOR;
            this.mean = Math.round(datapoint_1.Datapoint.ROUND_FACTOR
                * this.sum / this.datapoints_sorted_upwards.length) / datapoint_1.Datapoint.ROUND_FACTOR;
            this.median = this.calculateMedian();
            this.sum = Math.round(datapoint_1.Datapoint.ROUND_FACTOR * this.sum) / datapoint_1.Datapoint.ROUND_FACTOR;
        }
    }
    Dataset.prototype.calculateMedian = function () {
        var median_index = Math.floor(this.datapoints_sorted_upwards.length / 2);
        return (this.datapoints_sorted_upwards.length % 2) ?
            this.datapoints_sorted_upwards[median_index].value :
            (this.datapoints_sorted_upwards[median_index - 1].value
                + this.datapoints_sorted_upwards[median_index].value) / 2;
    };
    Dataset.prototype.getComparisonToAll = function (datapoint_index, sorting) {
        var datapoints = (sorting === interfaces_1.Sorting.NONE) ? this.datapoints
            : this.datapoints_sorted_upwards;
        if (sorting === interfaces_1.Sorting.DOWNWARDS) {
            datapoints = datapoints.slice().reverse();
        }
        var datapoints_to_compare = datapoints.slice(0, datapoint_index)
            .concat(datapoints.slice(datapoint_index + 1));
        var comparisons = Array(datapoints_to_compare.length);
        for (var index = 0; index < datapoints_to_compare.length; index++) {
            var datapoint = datapoints_to_compare[index];
            comparisons[index] = datapoints[datapoint_index]
                .getComparisonTo(datapoint.value, datapoint.label_text);
        }
        return comparisons;
    };
    Dataset.prototype.getComparisonToStatistics = function (datapoint_index, sorting) {
        var datapoint = this.datapoints[datapoint_index];
        var comparisons = {
            index: [datapoint.true_index, this.datapoints.length],
            value: datapoint.value,
            min: datapoint.getComparisonTo(this.min[1], this.min[0]),
            max: datapoint.getComparisonTo(this.max[1], this.max[0]),
            mean: datapoint.getComparisonTo(this.mean),
            median: datapoint.getComparisonTo(this.median),
            sum: datapoint.getComparisonTo(this.sum, "", false),
        };
        return comparisons;
    };
    Dataset.prototype.getStatistics = function () {
        return {
            count: this.datapoints.length,
            min: this.min,
            max: this.max,
            range: this.range,
            sum: this.sum,
            mean: this.mean,
            median: this.median,
        };
    };
    return Dataset;
}());
exports.Dataset = Dataset;
