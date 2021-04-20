/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ts/build/js/ts/gui/achart-interpreter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ts/build/js/ts/common/axis.js":
/*!*******************************************!*\
  !*** ./src/ts/build/js/ts/common/axis.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Axis = void 0;
var chart_1 = __webpack_require__(/*! ./chart */ "./src/ts/build/js/ts/common/chart.js");
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


/***/ }),

/***/ "./src/ts/build/js/ts/common/chart.js":
/*!********************************************!*\
  !*** ./src/ts/build/js/ts/common/chart.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Chart = void 0;
var dataset_1 = __webpack_require__(/*! ./dataset */ "./src/ts/build/js/ts/common/dataset.js");
var axis_1 = __webpack_require__(/*! ./axis */ "./src/ts/build/js/ts/common/axis.js");
var legend_1 = __webpack_require__(/*! ./legend */ "./src/ts/build/js/ts/common/legend.js");
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


/***/ }),

/***/ "./src/ts/build/js/ts/common/datapoint.js":
/*!************************************************!*\
  !*** ./src/ts/build/js/ts/common/datapoint.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),

/***/ "./src/ts/build/js/ts/common/dataset.js":
/*!**********************************************!*\
  !*** ./src/ts/build/js/ts/common/dataset.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Dataset = void 0;
var chart_1 = __webpack_require__(/*! ./chart */ "./src/ts/build/js/ts/common/chart.js");
var datapoint_1 = __webpack_require__(/*! ./datapoint */ "./src/ts/build/js/ts/common/datapoint.js");
var interfaces_1 = __webpack_require__(/*! ./interfaces */ "./src/ts/build/js/ts/common/interfaces.js");
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


/***/ }),

/***/ "./src/ts/build/js/ts/common/interfaces.js":
/*!*************************************************!*\
  !*** ./src/ts/build/js/ts/common/interfaces.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Interfaces used throughout model and view
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sorting = void 0;
var Sorting;
(function (Sorting) {
    Sorting[Sorting["DOWNWARDS"] = -1] = "DOWNWARDS";
    Sorting[Sorting["NONE"] = 0] = "NONE";
    Sorting[Sorting["UPWARDS"] = 1] = "UPWARDS";
})(Sorting = exports.Sorting || (exports.Sorting = {}));


/***/ }),

/***/ "./src/ts/build/js/ts/common/legend.js":
/*!*********************************************!*\
  !*** ./src/ts/build/js/ts/common/legend.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Legend = void 0;
var chart_1 = __webpack_require__(/*! ./chart */ "./src/ts/build/js/ts/common/chart.js");
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


/***/ }),

/***/ "./src/ts/build/js/ts/common/message.js":
/*!**********************************************!*\
  !*** ./src/ts/build/js/ts/common/message.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
var text_en_1 = __webpack_require__(/*! ./text.en */ "./src/ts/build/js/ts/common/text.en.js");
var Message = /** @class */ (function () {
    function Message() {
    }
    Message.getSummary = function (type, title, contains, one_of_multiple, index) {
        if (one_of_multiple === void 0) { one_of_multiple = false; }
        var summary = type;
        if (one_of_multiple) {
            summary += " " + (index + 1);
        }
        summary += ": ";
        if (title) {
            summary += "\"" + title + "\", ";
        }
        if (contains.length === 0) {
            return summary;
        }
        summary += text_en_1.Text.CONTAINS + " " + contains[0].count + " "
            + ((contains[0].count === 1) ? contains[0].text_array[1] :
                contains[0].text_array[0]);
        for (var index_1 = 1; index_1 < contains.length; index_1++) {
            summary += " " + text_en_1.Text.AND + " " + contains[index_1].count + " "
                + ((contains[index_1].count === 1) ? contains[index_1].text_array[1] :
                    contains[index_1].text_array[0]);
        }
        return summary + ".";
    };
    Message.getSvgSummary = function (title, contains_charts) {
        var contains = new Array(Math.min(1, contains_charts.length));
        contains[0] = { count: 0, text_array: text_en_1.Text.CHARTS };
        for (var index in contains_charts) {
            contains[index] =
                {
                    count: contains_charts[index].count,
                    text_array: (contains_charts[index].type in text_en_1.Text.CHART_TYPE) ? text_en_1.Text.CHART_TYPE[contains_charts[index].type] : text_en_1.Text.CHART_TYPE.other
                };
        }
        return Message.getSummary(text_en_1.Text.GRAPHIC, title, contains);
    };
    Message.getFurtherSvgDescriptions = function (titles, descriptions) {
        var outputs = [];
        for (var index = 1; index < Math.max(titles.length, descriptions.length); index++) {
            var output = "";
            if (titles[index]) {
                output = titles[index];
                if (descriptions[index]) {
                    output += ": ";
                }
            }
            if (descriptions[index]) {
                output += descriptions[index];
            }
            outputs.push(output);
        }
        return outputs;
    };
    Message.getChartSummary = function (type, title, contains_datasets, one_of_multiple, index) {
        if (one_of_multiple === void 0) { one_of_multiple = false; }
        var type_string = (type in text_en_1.Text.CHART_TYPE) ? text_en_1.Text.CHART_TYPE[type][2] : text_en_1.Text.CHART_TYPE.other[2];
        return Message.getSummary(type_string, title, [{ count: contains_datasets, text_array: text_en_1.Text.DATASETS }], one_of_multiple, index);
    };
    Message.getDatasetSummary = function (title, contains_datapoints, one_of_multiple, index) {
        if (one_of_multiple === void 0) { one_of_multiple = false; }
        return Message.getSummary(((one_of_multiple) ? text_en_1.Text.DATASET : text_en_1.Text.DATA), title, [{ count: contains_datapoints, text_array: text_en_1.Text.ITEMS }], one_of_multiple, index);
    };
    Message.getChartDescription = function (type, values_title, names_scale) {
        // Start the description with the chart type:
        var description = (type in text_en_1.Text.CHART_TYPE) ? text_en_1.Text.CHART_TYPE[type][2] : text_en_1.Text.CHART_TYPE.other[2];
        // Append "showing" and the y-axis or data series title;
        // if none is given, insert "values" as placeholder text instead:
        description += " " + text_en_1.Text.SHOWING + " " + ((values_title) ?
            "\"" + values_title + "\"\n" : text_en_1.Text.SCALE_TITLE_REPLACEMENT + " ");
        // Only append this part if any x-axis or legend data are given:
        if (names_scale) {
            // Append "in relation to" and the x-axis or legend title ;
            // if none is given, insert "values" as placeholder text instead:
            description += text_en_1.Text.RELATED_TO + " " + ((names_scale.title) ?
                "\"" + names_scale.title + "\"\n" : text_en_1.Text.SCALE_TITLE_REPLACEMENT + " ");
            // End with the range of x-axis or legend values:
            description += text_en_1.Text.FROM + " " + names_scale.min + " " +
                (text_en_1.Text.TO + " " + names_scale.max);
        }
        return description + ".";
    };
    Message.getAxisDescription = function (variable, title, type, labels, min, max) {
        var description = variable + "-" + text_en_1.Text.AXIS + ": ";
        if (title) {
            description += "\"" + title + "\",\n  ";
        }
        description += text_en_1.Text.CONTAINS + " " + labels + " " + text_en_1.Text.LABELS + " ";
        type = type.toLowerCase();
        if (type !== "category") {
            description += text_en_1.Text.CONTINUOUSLY + " ";
        }
        description += text_en_1.Text.RANGING + " " + text_en_1.Text.FROM + " " + min + " " + text_en_1.Text.TO + " " + max + ".";
        return description;
    };
    Message.getLegendDescription = function (title, labels, min, max) {
        var description = text_en_1.Text.LEGEND + ": ";
        if (title) {
            description += "\"" + title + "\",\n  ";
        }
        description += text_en_1.Text.CONTAINS + " " + labels + " " + text_en_1.Text.LABELS + " ";
        description += text_en_1.Text.RANGING + " " + text_en_1.Text.FROM + " " + min + " " + text_en_1.Text.TO + " " + max + ".";
        return description;
    };
    Message.getKeyValueItem = function (key, value, index, total) {
        var counter = "";
        if (index) {
            counter = " (" + index;
            if (total) {
                counter += " " + text_en_1.Text.OF + " " + total;
            }
            counter += ")";
        }
        return key + ": " + value + counter;
    };
    Message.getComparisonsList = function (label, comparisons) {
        var comparison_items = [];
        for (var _i = 0, comparisons_1 = comparisons; _i < comparisons_1.length; _i++) {
            var item = comparisons_1[_i];
            comparison_items.push(Message.getKeyValueItem(item.label, ((item.difference === 0) ? text_en_1.Text.EQUAL :
                Math.abs(item.difference) + " "
                    + ((item.difference > 0) ? text_en_1.Text.HIGHER : text_en_1.Text.LOWER) + " ("
                    + item.percentage + " %)")));
        }
        return {
            title: label + " " + text_en_1.Text.COMPARED_TO,
            items: comparison_items
        };
    };
    Message.getStatisticsList = function (index, statistics) {
        var statistics_items = [];
        for (var item in statistics) {
            var description = text_en_1.Text.STATISTICS[item] || "";
            var value = void 0;
            if (statistics[item].length > 1) {
                if (typeof statistics[item][0] === "string") {
                    value = statistics[item][1] + " " + text_en_1.Text.FOR + " \"" + statistics[item][0] + "\"";
                }
                else {
                    value = statistics[item].join(", ");
                }
            }
            else {
                value = statistics[item];
            }
            statistics_items.push(Message.getKeyValueItem(description, value));
        }
        return {
            title: text_en_1.Text.STATISTICS_FOR + " " + text_en_1.Text.DATASET + " " + (index + 1),
            items: statistics_items
        };
    };
    Message.getStatisticsComparisonsList = function (label, comparisons) {
        var comparison_items = new Array(0);
        for (var item in comparisons) {
            var text = void 0;
            switch ((typeof comparisons[item]).toLowerCase()) {
                case "boolean":
                    text = (comparisons[item]) ? text_en_1.Text.YES[item] : text_en_1.Text.NO[item];
                    break;
                case "number":
                    text = Message.getKeyValueItem("Value", comparisons[item]);
                    break;
                case "object":
                    if ((comparisons[item].length === 2)
                        && (comparisons[item].percentage === undefined)) {
                        text = text_en_1.Text.STATISTICS_COMPARISON[item] + " " + (comparisons[item][0] + 1) + "\n                " + text_en_1.Text.OF + " " + comparisons[item][1] + " " + text_en_1.Text.IN_DATASET;
                    }
                    else if (comparisons[item].difference === undefined) {
                        text = comparisons[item].percentage + " % " + text_en_1.Text.OF_THE[item];
                    }
                    else if (comparisons[item].difference === 0) {
                        text = "" + text_en_1.Text.EQUAL_TO[item];
                    }
                    else {
                        text = Math.abs(comparisons[item].difference) + " "
                            + ((comparisons[item].difference < 0) ? text_en_1.Text.LOWER : text_en_1.Text.HIGHER)
                            + (" " + text_en_1.Text.THAN + " " + text_en_1.Text.THE[item] + " ")
                            + ((comparisons[item].label) ? "\"" + comparisons[item].label + "\" " : "")
                            + (" (" + comparisons[item].percentage + " %)");
                    }
                    break;
                default:
            }
            comparison_items.push(text);
        }
        return {
            title: text_en_1.Text.STATISTICS_FOR + " \"" + label + "\"",
            items: comparison_items
        };
    };
    return Message;
}());
exports.Message = Message;


/***/ }),

/***/ "./src/ts/build/js/ts/common/svg-document.js":
/*!***************************************************!*\
  !*** ./src/ts/build/js/ts/common/svg-document.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SVGDocument = void 0;
var chart_1 = __webpack_require__(/*! ./chart */ "./src/ts/build/js/ts/common/chart.js");
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


/***/ }),

/***/ "./src/ts/build/js/ts/common/text.en.js":
/*!**********************************************!*\
  !*** ./src/ts/build/js/ts/common/text.en.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
var Text = /** @class */ (function () {
    function Text() {
    }
    // Strings for AChart Interpreter user Interface
    Text.APP_TITLE = "AChart Interpreter";
    Text.SAMPLE_CHART = "Sample Chart";
    Text.SELECT_SAMPLE_CHART = "Select a sample chart:";
    Text.FILE_UPLOAD = "File Upload";
    Text.ENABLE_SPEECH = "Enable built-in speech";
    Text.DISABLE_SPEECH = "Disable built-in speech";
    Text.NO_SPEECH = "No built-in speech available";
    Text.SPEECH_ENABLED = "Speech enabled!";
    Text.SPEECH_DISABLED = "Speech disabled.";
    Text.SWITCH_TO_APP_MODE = "Switch to Application Mode";
    Text.SWITCH_TO_DOCUMENT_MODE = "Switch to Document Mode";
    Text.HELP = "Help";
    Text.HAMBURGER_MENU_BUTTON = "Menu";
    Text.PLACEHOLDER_TEXT = "Select an SVG chart to get started.";
    Text.REMOVE_SVG = "Remove SVG";
    Text.CONTAINS = "contains";
    Text.GRAPHIC = "Graphic";
    Text.GRAPHIC_PANEL = "Graphic Panel";
    Text.TEXT_PANEL = "Text Panel";
    Text.EXPANDED = "expanded";
    Text.COLLAPSED = "collapsed";
    Text.CHART = "Chart";
    Text.CHARTS = ["charts", "chart"];
    Text.CHART_TYPE = {
        bar: ["bar charts", "bar chart", "Bar chart"],
        line: ["line charts", "line chart", "Line chart"],
        pie: ["pie charts", "pie chart", "Pie chart"],
        scatter: ["scatter plots", "scatter plot", "Scatter plot"],
        other: ["charts of unknown type", "chart of unknown type", "Unknown chart"]
    };
    Text.SHOWING = "showing";
    Text.SCALE_TITLE_REPLACEMENT = "values";
    Text.RELATED_TO = "in relation to";
    Text.BETWEEN = "between";
    Text.AND = "and";
    Text.AXIS = "axis";
    Text.LEGEND = "Legend";
    Text.LABELS = "labels";
    Text.CONTINUOUSLY = "continuously";
    Text.RANGING = "ranging";
    Text.FROM = "from";
    Text.TO = "to";
    Text.DATASET = "Data Series";
    Text.DATA = "Data Series";
    Text.DATASETS = ["data series", "data series"];
    Text.DATAPOINTS = "Data Points";
    Text.ITEMS = ["items", "item"];
    Text.SORT_LABEL = "Sort items";
    Text.SORT_ITEMS = {
        NONE: "in original order",
        UPWARDS: "from lowest to highest value",
        DOWNWARDS: "from highest to lowest value"
    };
    Text.SHOW_DATASET_STATISTICS = "Show statistics for this data series";
    Text.HIGHLIGHTING_TOGGLE = "SVG Highlighting Mode";
    Text.HIGHLIGHTING_BY = "SVG highlighting by ";
    Text.HIGHLIGHTING_CHANGED = "SVG Highlighting Mode changed to ";
    Text.HIGHLIGHTING_MASK = "Fill";
    Text.HIGHLIGHTING_OUTLINE = "Outline";
    Text.CLOSE = "Close";
    Text.STATISTICS_FOR = "Statistics for";
    Text.FOR = "for";
    Text.OF = "of";
    Text.STATISTICS = {
        count: "Number of items",
        min: "Lowest value",
        max: "Highest value",
        range: "Range between highest and lowest value",
        sum: "Sum of all values",
        mean: "Average",
        median: "Median",
        modes: "Modes"
    };
    Text.MENU_ITEM = {
        JUMP_TO_BEGINNING: {
            text: "Jump to first item",
            hotkey: "f"
        },
        JUMP_TO_END: {
            text: "Jump to last item",
            hotkey: "l"
        },
        COMPARE_TO_SAME: {
            text: "Compare to this data series",
            hotkey: "c"
        },
        COMPARE_TO_OTHER: {
            text: "Compare to other data series",
            hotkey: "d"
        },
        SHOW_DATAPOINT_STATISTICS: {
            text: "Show statistics for this item",
            hotkey: "s"
        }
    };
    Text.COMPARED_TO = "compared to";
    Text.STATISTICS_COMPARISON = {
        value: "Value",
        index: "Item"
    };
    Text.IN_DATASET = "in this data series";
    Text.EQUAL = "equal";
    Text.HIGHER = "higher";
    Text.LOWER = "lower";
    Text.THAN = "than";
    Text.THE = {
        min: "the lowest value",
        max: "the highest value",
        mean: "the average",
        median: "the median"
    };
    Text.EQUAL_TO = {
        min: "the lowest value of this data series",
        max: "the highest value of this data series",
        mean: "equal to the average",
        median: "equal to the median"
    };
    Text.OF_THE = {
        sum: "the sum of all values"
    };
    Text.YES = {
        is_mode: "a mode of this data series"
    };
    Text.NO = {
        is_mode: "no mode of this data series"
    };
    Text.HELP_TEXT = {
        TITLE: "Help",
        SECTIONS: [
            {
                HEADING: "Welcome to AChart Interpreter!",
                TEXT: [
                    "AChart Interpreter (standing for \"Accessible Chart Interpreter\") is a screen reader for charts. It gives you a description\n        of charts created in SVG format. The chart needs to contain appropriate\n        WAI-ARIA markup as generated, e.g., by the tool AChart Creator. If you\n        are interested in more details, AChart Interpreter lets you further\n        explore a chart by keyboard navigation in combination with either a\n        built-in speech synthesis or the screen reader of your choice."
                ],
            },
            {
                HEADING: "Usage",
                TEXT: [
                    "To start AChart Interpreter, open the graphic you want to explore.\n        You can either choose a sample chart from the drop-down list or\n        load an SVG file from your computer using the\n        \"File Upload\" button. After opening an SVG file, it will be displayed\n        in the part of the window named \"Graphic panel\". In the \"Text Panel\",\n        the textual information will be shown.",
                    "To move around within AChart Interpreter's windows, use the Tab key\n        or the appropriate cursor of your screen reader (for example, the virtual cursor in JAWS\n        or the cursor of the browse mode in NVDA, both controlled by the Arrow keys).\n        To close any window, you can use the Esc key\n        or the \"Close\" button at the top of the window.",
                    "In the main window of AChart Interpreter, next to the \"File Upload\"\n        button, you find a button to switch the built-in speech synthesis on and off.\n        You can also do this by pressing Alt+S.\n        If the speech is enabled, it reads aloud every element when\n        focusing it. The speech can be interrupted pressing any key or\n        clicking anywhere within AChart Interpreter's window.\n        Note that the integrated speech feature depends on your browser\n        and the voices installed on your local machine\n        and that it is not available in Internet Explorer.",
                    "The next button toggles the list view for the data items to Application Mode and back to Document Mode (<a href=\"#achart_interpreter_app_mode\">see below</a>).",
                    "This help text can be shown again using the \"Help\" button or the F1 key.",
                    "Underneath these buttons, you will find the \"Graphic Panel\" and the \"Text Panel\".\n        In the \"Graphic Panel\", the opened visualisation will be displayed.\n        The button \"Remove SVG\" can be used to close the graphic again.\n        The \"Text Panel\" shows the title and description of the graphic\n        as well as a list of all charts and chart components\n        contained by it. All chart components can be selected using\n        the Tab key. Mouse users can also select any component by a left click\n        either on the graphical object or its textual counterpart. The selected\n        component will be visually highlighted in both the graphical and the\n        textual representation. The style of highlighting for the graphical\n        objects can be chosen from two options by the switch \"Toggle SVG\n        highlighting mode\".",
                    "To hide or unveil the information on a particular chart, select its title and close or\n        open its details, respectively,\n        by pressing Enter or Space or left-click\n        on the triangle symbol.\n        When the details for a chart have been opened, they are displayed right underneath its title.\n        Below, you will find a list of all data series within the chart.\n        To hide or unveil the information on a particular data series,\n        again, select its title and close/open its details by pressing Enter or Space or left-click\n        on the triangle symbol.",
                    "When the details for a data series have been opened, you will find a list of all items\n        (that is, all values, all data points) contained in this data series.\n        Using the combo box above this list, you can choose if the items are displayed\n        either in increasing order (\"from lowest to highest value\") or in decreasing order\n        (\"from highest to lowest value\"). With the default choice \"in original order\",\n        the items are listed in the same order they appear in the SVG source code,\n        that is, in most cases, along the x-axis from left to right.\n        To choose a certain sorting option, open the combo box,\n        select the option by using the Arrow-Up and Arrow-Down keys\n        and then press Enter.",
                    "Once you have reached the list for a data series,\n        use the Arrow-Up and Arrow-Down keys to navigate through it.\n        If no screen reader is running or Application Mode is activated (<a href=\"#achart_interpreter_app_mode\">see below</a>),\n        you can use the following additional navigation keys:\n        The HOME key will move the selection to the first item in the list;\n        the END key will take you to the last item.\n        If there are multiple data series contained in the chart,\n        you can quickly move between their data lists using the Arrow-Left and Arrow-Right keys.",
                    "Moving to an item and pressing the Context-Menu key or right-clicking on it,\n        a context menu will appear offering several options:\n        you can view statistics about the particular item or\n        a list of comparisons of this item to all others in the same data series. "
                        // a list of comparisons to the selected items in all other data series,
                        // or a list of comparisons to the items for the same position (x-value, argument) in all other data series.
                        + "Moreover, you can move to the first or the last item within the data list,\n        which might be helpful in case of longer data series.",
                    "Pressing Tab within the list for a certain data series will take you to the button underneath this data list.\n        Using this button, you can obtain statistics about the whole data series."
                ]
            },
            {
                HEADING: "Application Mode",
                TEXT: [
                    "<div id=\"achart_interpreter_app_mode\">Most screen readers like JAWS and NVDA have their own special keyboard setting for navigating Web pages,\n        which might block the functionality of some of AChart Interpreter's navigation keys (like the Home and End keys).\n        If you are using a screen reader and would like to benefit from all of AChart Interpreter's key commands,\n        switch to Application Mode using the corresponding button at the top of the window or pressing Alt+A.\n        When you move to a data list afterwards, your screen reader should enable a special mode\n        in which all keystrokes are passed through to AChart Interpreter\n        (in JAWS this is also known as Application Mode or Forms Mode,\n        in NVDA it is called Focus Mode).\n        If your screen reader does not activate this mode automatically,\n        try pressing Enter after moving to the data list.\n        Note that after switching to Application Mode, the data lists might look different\n        and that NVDA may announce them as \"Application\".</div>",
                    "Using the same button as before or pressing Alt+A again,\n        you can switch back to AChart Interpreter's standard mode, called Document Mode."
                ]
            },
            {
                HEADING: "Known Issues",
                TEXT: [
                    "AChart Interpreter does not yet support Internet Explorer at the moment.\n        It is recommended to use the current version on Mozilla Firefox.",
                    "On Google Chrome, JAWS might not recognise a context menu correctly after opening it.\n        If so, try using AChart Interpreter's Application Mode or enabling automatic forms mode of JAWS.",
                    "When AChart Interpreter is switched to Application Mode,\n        JAWS might not announce all elements outside the data lists appropriately.\n        If so, try leaving forms mode and enabling the virtual cursor of JAWS manually\n        by pressing Numpad + (desktop keyboard) or JAWS+; (laptop keyboard)."
                    /*`In some cases, activating an element might not be possible by pressing Enter when using JAWS.
                    If so, open the JAWS settings,
                    navigate either to "Web / HTML / PDF", "Other Settings"
                    or to "Virtual Cursor Settings", "General Settings",
                    and change the setting "Link Activation" from "ENTER key simulates mouse click"
                    to "ENTER key sends ENTER key".`*/
                ]
            }
        ]
    };
    // Strings for AChart Summariser (output to terminal)
    Text.ACHART_SUMMARISER_TITLE = "AChart Summariser";
    Text.ACHART_SUMMARY = "AChart Summary for file ";
    Text.DEFAULT_FILE = "Opening a default SVG sample file";
    Text.HELP_OPTION = "Run 'asummarise --help' for details!";
    Text.ERROR = "ERROR: ";
    Text.INVALID_OPTION = "Invalid option";
    Text.NO_SVG_FILE = "No SVG filename specified";
    Text.NO_OUTPUT_FILE = "No output filename specified";
    Text.FILE = "File ";
    Text.LOADED = " loaded";
    Text.CANNOT_OPEN = "Cannot open file ";
    Text.WRITING_TO = "Writing AChart Summary to file ";
    Text.NO_SVG = "No SVG found in file ";
    Text.VERSION = "version";
    Text.ACHART_SUMMARISER_HELP = "AChart Summariser -- Outputs a textual summary of an SVG chart.\n\n\nCommand-line syntax:\n\n  asummarise [--output OUTPUT-FILENAME] [--statistics]\n             [--datapoints] [--version] [--help]\n             [--input] SVG-FILENAME\n\n\nMandatory arguments:\n\n    SVG-FILENAME               Specifies the SVG file to analyse. This argument can be\n                               given either as the last command-line parameter or,\n                               alternatively, at any position prepended by --input.\n             \n             \nOptional arguments:\n    \n    --output OUTPUT-FILENAME   Writes the output to the specified plain text file.\n                               If not specified, output is written to stdout.\n    \n    --statistics               Additionally outputs statistical information on each data series.\n    \n    --datapoints               Additionally outputs all the data points in the chart.\n    \n    --version                  Prints version information and exits.\n    \n    --help                     Prints this help message and exits.\n     \nAll options are case-insensitive. If an argument contains space\ncharacters, it should be enclosed in quotation marks (\"\"). Filenames\nmay contain relative or absolute paths. If no path or relative path\nis given, the current working directory is assumed.";
    return Text;
}());
exports.Text = Text;


/***/ }),

/***/ "./src/ts/build/js/ts/gui/achart-interpreter.js":
/*!******************************************************!*\
  !*** ./src/ts/build/js/ts/gui/achart-interpreter.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AChartInterpreter = void 0;
var svg_document_1 = __webpack_require__(/*! ../common/svg-document */ "./src/ts/build/js/ts/common/svg-document.js");
var user_interface_1 = __webpack_require__(/*! ./user-interface */ "./src/ts/build/js/ts/gui/user-interface.js");
var interfaces_1 = __webpack_require__(/*! ../common/interfaces */ "./src/ts/build/js/ts/common/interfaces.js");
var helper_1 = __webpack_require__(/*! ./helper */ "./src/ts/build/js/ts/gui/helper.js");
var message_1 = __webpack_require__(/*! ../common/message */ "./src/ts/build/js/ts/common/message.js");
var file_loader_1 = __webpack_require__(/*! ./file-loader */ "./src/ts/build/js/ts/gui/file-loader.js");
// Main Class (controller)
var AChartInterpreter = /** @class */ (function () {
    // ---
    // Description: Initialises the app
    // ---
    function AChartInterpreter(svg_root) {
        // Initialise user interface:
        this.user_interface = new user_interface_1.UserInterface(this);
        // Initialise drop-down list for sample SVG files and file upload
        // dialogue functionality:
        file_loader_1.FileLoader.prepareFileChoosing(this);
    }
    // ---
    // Description: Analyses the given SVG and outputs its information.
    // svg_content: The SVG markup of the graphic to analyse.
    // filename: The name of the loaded SVG file.
    // ---
    AChartInterpreter.prototype.interpret = function (svg_content, filename) {
        // Display the SVG in the graphic panel:
        var svg_root = this.user_interface.insertSvg(svg_content, filename);
        // Parse the SVG, extract chart data etc.:
        this.svg_document = new svg_document_1.SVGDocument(svg_root);
        // Initialise text panel with SVG title and summary:
        this.user_interface.initTextPanel(message_1.Message.getSvgSummary(this.svg_document.titles[0], this.svg_document.chart_type_counts), this.svg_document.charts_count, this.svg_document.descriptions[0]);
        // Iterate over all known chart types incl. "unknown"
        // Index of chart independent of its type (for user interface):
        var charts_index = 0;
        for (var chart_type in this.svg_document.charts) {
            // Add all charts of this type to the Web interface
            for (var charts_index_of_type = 0; charts_index_of_type < this.svg_document.charts[chart_type].length; charts_index_of_type++, charts_index++) {
                var chart = this.svg_document.charts[chart_type][charts_index_of_type];
                this.svg_document.all_charts[charts_index] = chart;
                // If x-axis is present, consider it as names scale,
                // otherwise consider a possible legend:
                var names_scale = chart.axes.x ||
                    ((chart.legends) ? chart.legends[0] : undefined);
                var names_scale_data = (names_scale) ?
                    {
                        min: names_scale.min,
                        max: names_scale.max,
                        title: names_scale.title
                    } : undefined;
                // If y-axis is present, consider it as values scale,
                // otherwise consider the first data series:
                var values_scale_title = (chart.axes.y) ? chart.axes.y.title :
                    ((chart.datasets) ? chart.datasets[0].title : "");
                this.user_interface.addChart(charts_index, chart.root, true, chart.datasets.length, message_1.Message.getChartSummary(chart.type, chart.title, chart.datasets.length, true, charts_index_of_type), message_1.Message.getChartDescription(chart.type, values_scale_title, names_scale_data));
                // Add all axes of each chart to the web interface
                // x-axis first:
                if (chart.axes.x) {
                    this.user_interface.addAxis(charts_index, chart.axes.x.svg_element, "x", message_1.Message.getAxisDescription("x", chart.axes.x.title, chart.axes.x.type, chart.axes.x.labels.length, chart.axes.x.min, chart.axes.x.max));
                }
                // y-axis second:
                if (chart.axes.y) {
                    this.user_interface.addAxis(charts_index, chart.axes.y.svg_element, "y", message_1.Message.getAxisDescription("y", chart.axes.y.title, chart.axes.y.type, chart.axes.y.labels.length, chart.axes.y.min, chart.axes.y.max));
                }
                // Last, all other possible axes:
                for (var axis_index in chart.axes.others) {
                    var axis = chart.axes.others[axis_index];
                    if (axis) {
                        this.user_interface.addAxis(charts_index, axis.svg_element, axis.variable, message_1.Message.getAxisDescription(axis.variable, axis.title, axis.type, axis.labels.length, axis.min, axis.max));
                    }
                }
                // Add all legends of each chart to the Web interface
                for (var legends_index = 0; legends_index < chart.legends.length; legends_index++) {
                    var legend = chart.legends[legends_index];
                    this.user_interface.addLegend(charts_index, legends_index, legend.svg_element, message_1.Message.getLegendDescription(legend.title, legend.labels.length, legend.min, legend.max));
                }
                // Add all data series of each chart to the web interface
                for (var datasets_index = 0; datasets_index < chart.datasets.length; datasets_index++) {
                    var dataset = chart.datasets[datasets_index];
                    this.user_interface.addDataset(charts_index, datasets_index, dataset.svg_element, true, dataset.datapoints.length, message_1.Message.getDatasetSummary(dataset.title, dataset.datapoints.length, true, datasets_index));
                    if (dataset.datapoints.length) {
                        this.user_interface.initDataList(charts_index, datasets_index, dataset.title);
                        this.listDatapoints(charts_index, datasets_index, interfaces_1.Sorting.NONE, 0);
                    }
                }
            }
        }
    };
    // ---
    // Description: Adds all data points of the specified data series to the Web interface.
    // chart_index: Index of the chart whose data points shall be added.
    // dataset_index: Index of the data series whose data points shall be added.
    // sort: Specifies the sorting mode of the data points (NONE, UPWARDS, or DOWNWARDS).
    // ---
    AChartInterpreter.prototype.listDatapoints = function (chart_index, dataset_index, sort, focused_datapoint) {
        // Access the data points either in increasing order or in the original order
        // as in the chart, depending on the specified sorting mode:
        var datapoints = (sort !== interfaces_1.Sorting.NONE) ?
            this.svg_document.all_charts[chart_index].datasets[dataset_index]
                .datapoints_sorted_upwards
            : this.svg_document.all_charts[chart_index]
                .datasets[dataset_index].datapoints;
        if (sort === interfaces_1.Sorting.DOWNWARDS) {
            datapoints = datapoints.slice().reverse();
        }
        var datapoint_positions = new Array(datapoints.length);
        for (var datapoints_index = 0; datapoints_index < datapoints.length; datapoints_index++) {
            var datapoint = datapoints[datapoints_index];
            this.user_interface.addDatapoint(chart_index, dataset_index, datapoints_index, datapoint.true_index, datapoint.svg_element, message_1.Message.getKeyValueItem(datapoint.label_text, datapoint.value_text, datapoint.true_index + 1, datapoints.length));
            datapoint_positions[datapoint.true_index] = datapoints_index;
        }
        this.user_interface.selected_datapoint[chart_index][dataset_index] =
            focused_datapoint;
        this.user_interface.selected_list_position[chart_index][dataset_index] =
            datapoint_positions[focused_datapoint];
    };
    // ---
    // Description: Display the statistics for an entire data series.
    // index: The index of the chart and data series whose statistics shall be displayed.
    // ---
    AChartInterpreter.prototype.showDatasetStatistics = function (index) {
        this.user_interface.showDetails(message_1.Message.getStatisticsList(index.dataset, this.svg_document.all_charts[index.chart].datasets[index.dataset]
            .getStatistics()));
    };
    // ---
    // Description: Displays a comparison of the specified data point
    //              to all other data points in the same data series.
    // index: Indices of the data point to be compared.
    // sorting: Specifies how the list view of the data series is sorted.
    // ---
    AChartInterpreter.prototype.compareToRestOfDataset = function (index, sorting) {
        var dataset = this.svg_document.all_charts[index.chart].datasets[index
            .dataset];
        // Get the label of the data point to be compared;
        // if the list of the data series is sorted, access the sorted array of the data points:
        var label = dataset.datapoints[index.datapoint].label_text;
        this.user_interface.showDetails(message_1.Message.getComparisonsList(label, dataset.getComparisonToAll(index.list_position, sorting)));
    };
    // ---
    // Description: Displays a comparison of the specified data point
    //              to the statistics of the corresponding data series.
    // index: Indices of the data point to be compared.
    // sorting: Specifies how the list view of the data series is sorted.
    // ---
    AChartInterpreter.prototype.compareToStatistics = function (index, sorting) {
        var dataset = this.svg_document.all_charts[index.chart].datasets[index
            .dataset];
        // Get the label of the data point to be compared;
        // if the list of the data series is sorted, access the sorted array of the data points:
        var label = dataset.datapoints[index.datapoint].label_text;
        this.user_interface.showDetails(message_1.Message.getStatisticsComparisonsList(label, dataset.getComparisonToStatistics(index.datapoint, sorting)));
    };
    // ---
    // Description: Searches the loaded Web document for SVG documents and adds to them
    //              event listeners for launching the main app.
    // ---
    AChartInterpreter.searchForSVGContent = function () {
        // Search the Web page for embedded SVG
        var svg_documents = document.body.getElementsByTagName("svg");
        for (var index = 0; index < svg_documents.length; index++) {
            this.attachToSvg(svg_documents[index]);
        }
        // Search the Web page for SVG files embedded as <object>
        var svg_files = document.body.getElementsByTagName("object");
        for (var index = 0; index < svg_files.length; index++) {
            var data_root = svg_files[index].contentDocument.firstChild;
            // If the first child of the <object> is an SVG element, attach it
            // an event listener for click, Enter, and Space key opening the app
            if (data_root.nodeName === "svg") {
                this.attachToSvg(data_root);
            }
        }
    };
    // ---
    // Description: Gets the data point that was first clicked before 
    //              the main app text view window was created
    // target: The initial HTML element that was clicked retrieved via
    //         an onclick listener
    // ---
    AChartInterpreter.getFirstClickedDataPoint = function (target) {
        var first_clicked_data_point;
        if (target.parentNode.id == 'dataarea') {
            first_clicked_data_point = target;
        }
        else if (target.parentNode.getAttribute('role') == 'datapoint') {
            first_clicked_data_point = target.parentNode;
        }
        else if (target.getAttribute('role') == 'datapoint') {
            first_clicked_data_point = target;
        }
        return first_clicked_data_point;
    };
    // ---
    // Description: Either focus and read out a data point when opening the text view,
    //              or if another element was clicked, focus and read out the standard first element,
    //              which is the title "AChart Reader".
    //              Also handles collapsed nodes of data points
    // first_clicked_data_point: The data point in question
    // achart_reader: Current instance of the text view
    // ---
    AChartInterpreter.prototype.handleFirstFocus = function (first_clicked_data_point) {
        if (!first_clicked_data_point) {
            // Focus and read 'Graphic' and summary if no data point was activated
            this.user_interface.svg_document.focus();
        }
        else {
            var element_to_focus = this.user_interface
                .getDataPointBasedOnSVGElement(first_clicked_data_point);
            // Have to uncollapse node of data points,
            // which are collapsed if there are multiple data series
            var details = element_to_focus.parentNode.parentNode.parentNode;
            if (!details.getAttribute("open")) {
                details.setAttribute("open", "true");
            }
            element_to_focus.focus();
        }
    };
    // ---
    // Description: Adds event listeners for launching the main app or re-opening
    //              the main app window to the specified SVG.
    // data_root: Root <svg> element of the graphics.
    // ---
    AChartInterpreter.attachToSvg = function (data_root) {
        var _this = this;
        // App object:
        var achart_interpreter = undefined;
        // Make the SVG root focusable:
        data_root.setAttribute("tabindex", "0");
        helper_1.Helper.addActivationListener(data_root, function (event) {
            // Only proceed if no window of the app is open for any SVG doc:
            if (!user_interface_1.UserInterface.is_open) {
                // Get what element was clicked on before the text view was open,
                // to read it out later, but only if it's a data point
                event = event || window.event;
                var target = event.target || event.srcElement;
                var first_clicked_data_point = _this.getFirstClickedDataPoint(target);
                // If the app has not been started for the specified SVG yet, launch it,
                // otherwise re-open its window if it is closed at the moment:
                if (!achart_interpreter) {
                    achart_interpreter = new AChartInterpreter(data_root);
                    achart_interpreter.handleFirstFocus(first_clicked_data_point);
                }
                else if (!achart_interpreter.user_interface.container.parentNode) {
                    achart_interpreter.user_interface.grid_container.appendChild(achart_interpreter.user_interface.container);
                    achart_interpreter.handleFirstFocus(first_clicked_data_point);
                    user_interface_1.UserInterface.is_open = true;
                }
            }
        });
    };
    return AChartInterpreter;
}());
exports.AChartInterpreter = AChartInterpreter;
// Launch the application as soon as the basic HTML
// has completely been loaded
window.addEventListener("DOMContentLoaded", function () {
    var achart_interpreter = new AChartInterpreter();
});


/***/ }),

/***/ "./src/ts/build/js/ts/gui/context-menu.js":
/*!************************************************!*\
  !*** ./src/ts/build/js/ts/gui/context-menu.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMenu = void 0;
var html_template_1 = __webpack_require__(/*! ./html-template */ "./src/ts/build/js/ts/gui/html-template.js");
var text_en_1 = __webpack_require__(/*! ../common/text.en */ "./src/ts/build/js/ts/common/text.en.js");
var helper_1 = __webpack_require__(/*! ./helper */ "./src/ts/build/js/ts/gui/helper.js");
// Context menu for a data point
var ContextMenu = /** @class */ (function () {
    // ---
    // Description: Initialises the menu, creates its container,
    //              and adds all event listeners.
    // user_interface: The object of the main Web interface.
    // ---
    function ContextMenu(user_interface) {
        var _this = this;
        this.is_open = false;
        // Map for menu items and corresponding hotkeys:
        this.items = new Map();
        // Number of menu items:
        this.item_count = 0;
        this.first_item = undefined;
        this.last_item = undefined;
        this.user_interface = user_interface;
        // Create the menu container:
        var dummy = document.createElement("div");
        dummy.innerHTML = html_template_1.HTMLTemplate.MENU;
        this.menu_element = dummy.firstChild;
        // Keyboard navigation within the menu
        this.menu_element.addEventListener("keydown", function (event) {
            event.preventDefault();
            event.stopPropagation();
            if ((event.shiftKey) || (event.altKey) || (event.ctrlKey) || (event.metaKey)) {
                return;
            }
            var key = "";
            if (event.key) {
                key = event.key.toLowerCase();
            }
            switch (key) {
                case "arrowdown":
                    _this.removeSelection();
                    _this.selectItem(_this.selected_item.next_item);
                    _this.user_interface.speech.speak(_this.selected_item.element.textContent);
                    break;
                case "arrowup":
                    _this.removeSelection();
                    _this.selectItem(_this.selected_item.previous_item);
                    _this.user_interface.speech.speak(_this.selected_item.element.textContent);
                    break;
                case "enter":
                    _this.close();
                    _this.selected_item.run();
                    break;
                case "escape":
                    _this.close();
                    _this.user_interface.last_focus.focus();
                    break;
                default:
                    // If the key is among the defined hotkeys, call the function
                    // assigned to the corresponding menu item and close the menu:
                    if (_this.items[key]) {
                        _this.close();
                        _this.items[key].run();
                    }
            }
        });
        // On click, call the appropriate function and close the menu
        this.menu_element.addEventListener("click", function (event) {
            event.stopPropagation();
            _this.close();
            // If the event was not triggered on a particular menu item,
            // call the function of the item currently selected by keyboard navigation,
            // otherwise detect the menu item which received the event and call its function:
            if (event.target === _this.menu_element) {
                _this.selected_item.run();
            }
            else {
                // Derive the function from the shortcut assigned to the item:
                _this.items[event.target.getAttribute("aria-keyshortcuts")].run();
            }
        });
    }
    // ---
    // Description: Adds a menu item to the context menu.
    // text_key: string specifying which text to display for the item and which
    //           hotkey to assign to it.
    // run: The function to call when the item is activated.
    // ---
    ContextMenu.prototype.addItem = function (text_key, run, position, append) {
        if (append === void 0) { append = false; }
        var item = {
            run: run,
            element: helper_1.Helper.appendHTML(this.menu_element, html_template_1.HTMLTemplate.MENU_ITEM),
            previous_item: undefined,
            next_item: undefined
        };
        // If no item has been added yet, set this.first_item to this item
        // and select it as default:
        if (!this.first_item) {
            this.first_item = item;
            this.selectItem(item);
        }
        // Otherwise, link the item with the one previously added:
        else {
            item.previous_item = this.last_item;
            this.last_item.next_item = item;
        }
        // Every new item is the last item of the menu so far:
        item.next_item = this.first_item;
        this.last_item = item;
        this.first_item.previous_item = item;
        this.item_count++;
        // Text (incl. hotkey) displayed for the item:
        item.element.textContent = text_en_1.Text.MENU_ITEM[text_key].text
            + " (" + text_en_1.Text.MENU_ITEM[text_key].hotkey + ")";
        item.element.setAttribute("aria-keyshortcuts", text_en_1.Text.MENU_ITEM[text_key].hotkey);
        // Assign corresponding hotkey to the item:
        this.items[text_en_1.Text.MENU_ITEM[text_key].hotkey] = item;
        return item.element;
    };
    // ---
    // Description: Opens the context menu by appending it to the specified node.
    // parent: The DOM node to append the menu to.
    // ---
    ContextMenu.prototype.open = function (parent) {
        // When opening the menu, the first item should be selected:
        this.selectItem(this.first_item);
        parent.appendChild(this.menu_element);
        this.menu_element.focus();
        this.is_open = true;
        this.user_interface.speech.speak("Menu: " +
            this.selected_item.element.textContent);
    };
    // ---
    // Description: Closes the menu by removing its container.
    // ---
    ContextMenu.prototype.close = function () {
        this.user_interface.speech.speak("Leaving menu");
        this.menu_element.remove();
        this.removeSelection();
        this.is_open = false;
    };
    // ---
    // Marks the specified item as selected.
    // item: The item to select.
    // ---
    ContextMenu.prototype.selectItem = function (item) {
        this.selected_item = item;
        // Set the ARIA attribute so that screen readers recognise the selection:
        this.selected_item.element.id = html_template_1.HTMLTemplate.MENU_ITEM_ID;
        // Add a class for highlighting:
        this.selected_item.element.classList.add("selected");
    };
    // ---
    // Description: Remove the selection marks from the item currently selected.
    // ---
    ContextMenu.prototype.removeSelection = function () {
        this.selected_item.element.id = "";
        this.selected_item.element.classList.remove("selected");
    };
    return ContextMenu;
}());
exports.ContextMenu = ContextMenu;


/***/ }),

/***/ "./src/ts/build/js/ts/gui/file-loader.js":
/*!***********************************************!*\
  !*** ./src/ts/build/js/ts/gui/file-loader.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.FileLoader = void 0;
var helper_1 = __webpack_require__(/*! ./helper */ "./src/ts/build/js/ts/gui/helper.js");
var html_template_1 = __webpack_require__(/*! ./html-template */ "./src/ts/build/js/ts/gui/html-template.js");
// Static class for loading files and inserting them into the testing page
var FileLoader = /** @class */ (function () {
    function FileLoader() {
    }
    // ---
    // Description: Searches the loaded Web page for the controls to choose an SVG file;
    //              if they are found, adds the corresponding input event listeners
    //              and initialises necessary variables.
    // ---
    FileLoader.prepareFileChoosing = function (achart_interpreter) {
        this.achart_interpreter = achart_interpreter;
        // Generate list of sample SVG files to load from the server
        // Automatically get all files from the file containing the list
        // that was generated at build time:
        var sample_files = new Array();
        var request = new XMLHttpRequest();
        // Third argument indicates async false
        request.open("GET", "samples.txt", false);
        var sample_svg_names = "";
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                sample_svg_names = request.responseText;
                sample_files = sample_svg_names.split('\n');
                sample_files.pop();
                FileLoader.listSampleFiles(sample_files);
            }
        };
        request.send();
        // Sample SVG file drop-down list:
        var remote_file_list = this.achart_interpreter.user_interface.remote_file_list;
        if (remote_file_list) {
            helper_1.Helper.addActivationListener(remote_file_list, function () {
                FileLoader.loadRemoteFile();
            });
            remote_file_list.addEventListener("focusin", function () {
                remote_file_list.selectedIndex = 0;
            });
        }
        // Hidden file upload input field:
        var local_file_button = document.getElementById("local_file_button");
        if (local_file_button) {
            local_file_button.addEventListener("change", FileLoader.loadLocalFiles);
            // Visible file upload button:
            if (this.achart_interpreter.user_interface.file_upload_button) {
                this.achart_interpreter.user_interface.file_upload_button.addEventListener("click", function () {
                    local_file_button.click();
                });
            }
        }
    };
    // ---
    // Description: Adds all sample SVG filenames to the drop-down list.
    // sample_files: Names of all sample files found.
    // ---
    FileLoader.listSampleFiles = function (sample_files) {
        for (var _i = 0, sample_files_1 = sample_files; _i < sample_files_1.length; _i++) {
            var filename = sample_files_1[_i];
            var option = helper_1.Helper.appendHTML(this.achart_interpreter.user_interface.remote_file_list, html_template_1.HTMLTemplate.SAMPLE_SVG_OPTION);
            option.setAttribute("value", filename);
            option.textContent = filename;
        }
    };
    // ---
    // Description: Loads a file chosen by the dropdown list from
    //              "./samples/" on the server.
    // filename: The name of the sample SVG file chosen.
    // ---
    FileLoader.loadRemoteFile = function () {
        var _this = this;
        var filename = this.achart_interpreter.user_interface.remote_file_list.value;
        if (filename) {
            var xml_http_request = new XMLHttpRequest();
            xml_http_request.open("GET", "samples/" + filename);
            xml_http_request.addEventListener("load", function (event) {
                _this.insertFile(event.target.response, filename);
                _this.achart_interpreter.user_interface.remote_file_list.blur();
            });
            xml_http_request.send();
        }
    };
    // ---
    // Description: Loads files chosen by the file upload field.
    // event: The "change" event fired when files have been chosen.
    // ---
    FileLoader.loadLocalFiles = function (event) {
        var _loop_1 = function (index) {
            if (event.target.files[index].type === "image/svg+xml") {
                var file_reader = new FileReader();
                file_reader.addEventListener("load", function (load_event) {
                    FileLoader.insertFile(load_event.target.result, event.target.files[index].name);
                });
                file_reader.readAsText(event.target.files[index]);
            }
        };
        // Load all files chosen
        for (var index = 0; index < event.target.files.length; index++) {
            _loop_1(index);
        }
    };
    // ---
    // Description: Passes a loaded SVG document to the controller.
    // svg_content: The graphics content to display.
    // filename: The name of the SVG file loaded.
    // ---
    FileLoader.insertFile = function (svg_content, filename) {
        if (svg_content) {
            // Cut off any prologue before the root <svg> element:
            svg_content = svg_content.substring(svg_content.indexOf("<svg"));
            // Start the interpreter for the loaded SVG:
            this.achart_interpreter.interpret(svg_content, filename);
        }
    };
    return FileLoader;
}());
exports.FileLoader = FileLoader;


/***/ }),

/***/ "./src/ts/build/js/ts/gui/helper.js":
/*!******************************************!*\
  !*** ./src/ts/build/js/ts/gui/helper.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Static class for helper functions
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
var Helper = /** @class */ (function () {
    function Helper() {
    }
    // ---
    // Description: Adds event listeners with the same functionality as well for
    //              click as for "Enter pressed" and "Space pressed" events to the
    //              specified DOM element (used for elements where "click" events
    //              do not fire on Enter/Space key pressing).
    // element: The DOM element to add the event listeners to.
    // callback: The function to call on the events.
    // use_capture: Specifies if the event shall be detected in capture phase
    //              (see Event.addEventListener()).
    // ---
    Helper.addActivationListener = function (element, callback, use_capture) {
        element.addEventListener("click", function (event) {
            callback(event);
        }, use_capture);
        element.addEventListener("keydown", function (event) {
            var key = "";
            if (event.key) {
                key = event.key.toLowerCase();
            }
            if ((key === "enter") || (key === " ")
                && !((event.shiftKey) || (event.altKey) || (event.ctrlKey) || (event.metaKey))) {
                event.preventDefault();
                callback(event);
            }
        }, use_capture);
    };
    // ---
    // Description: Creates a new DOM element out of the specified HTML string, appends it to the Web interface, and returns it.
    // parent: The DOM element to which the new element shall be appended.
    // html_string: The HTML code out of which to create the new DOM element.
    // ---
    Helper.appendHTML = function (parent, html_string) {
        var dummy = document.createElement("div");
        dummy.innerHTML = html_string;
        var html_element = dummy.firstElementChild;
        parent.appendChild(html_element);
        return html_element;
    };
    return Helper;
}());
exports.Helper = Helper;


/***/ }),

/***/ "./src/ts/build/js/ts/gui/html-template.js":
/*!*************************************************!*\
  !*** ./src/ts/build/js/ts/gui/html-template.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLTemplate = void 0;
var text_en_1 = __webpack_require__(/*! ../common/text.en */ "./src/ts/build/js/ts/common/text.en.js");
// Static class for all HTML and CSS code including IDs and ARIA attributes
var HTMLTemplate = /** @class */ (function () {
    function HTMLTemplate() {
    }
    HTMLTemplate.prototype.constructur = function () { };
    // Elements for the testing page (used by class FileLoader)
    // Option of the list of sample SVGs:
    HTMLTemplate.SAMPLE_SVG_OPTION = "<option></option>";
    // CSS grid container
    HTMLTemplate.GRID_CONTAINER = "<div id=\"grid-container\" class=\"grid\"></div>";
    // Container for displaying an SVG document loaded and its controls:
    HTMLTemplate.GRAPHIC_PANEL_CONTENT = "<div hidden=\"true\"></div>";
    // Button for removing an SVG document loaded:
    HTMLTemplate.REMOVE_SVG_BUTTON = "<button class=\"no_highlight\">" + text_en_1.Text.REMOVE_SVG + "</button>";
    // Checkbox button for changing the SVG highlighting mode
    HTMLTemplate.HIGHLIGHTING_BUTTON = "\n    <div id=\"highlighting\">\n      <div>" + text_en_1.Text.HIGHLIGHTING_TOGGLE + ":</div>\n<div aria-hidden=\"true\" class=\"toggle_text\">" + text_en_1.Text.HIGHLIGHTING_MASK + "</div>\n      <label class=\"switch\">\n        <input id=\"highlighting_button\" type=\"checkbox\" checked=\"true\" aria-label=\"" + text_en_1.Text.HIGHLIGHTING_BY + text_en_1.Text.HIGHLIGHTING_OUTLINE + "\">\n        <span class=\"slider round\"></span>\n      </label>\n      <div aria-hidden=\"true\" class=\"toggle_text\">" + text_en_1.Text.HIGHLIGHTING_OUTLINE + "</div>\n    </div>\n  ";
    // Text panel of the app:
    HTMLTemplate.TEXT_PANEL = "<div id=\"reader_panel\" aria-labelledby=\"achart_reader_title\">\n    </div>";
    // Title of the reader panel as heading on level 2; focusable for keyboard-only navigation:
    HTMLTemplate.TEXT_PANEL_TITLE = "<h2 id=\"achart_reader_title\" tabindex=\"0\" class=\"outlinewidth\">" + text_en_1.Text.APP_TITLE + "</h2>";
    // Button for toggling the builtin speech synthesis:
    HTMLTemplate.SPEECH_BUTTON = "<button class=\"header_item_button no_highlight\" aria-keyshortcuts=\"Alt+s\"></button>";
    // Button for toggling the screen reader interaction mode (document or application mode):
    HTMLTemplate.APP_MODE_BUTTON = "<button class=\"header_item_button no_highlight\" \n    aria-keyshortcuts=\"Alt+a\">" + text_en_1.Text.SWITCH_TO_APP_MODE + " (Alt+A)</button>";
    // Button for displaying the help window:
    HTMLTemplate.HELP_BUTTON = "<button class=\"header_item_button no_highlight\" \n    aria-keyshortcuts=\"F1\">" + text_en_1.Text.HELP + " (F1)</button>";
    // Window for all statistics, comparisons, and the help text;
    // should cover parts of the main window of the app:
    HTMLTemplate.DIALOG_WINDOW = "<div role=\"dialog\" class=\"details\" aria-labelledby=\"achart_reader_dialog_title\">\n      <article role=\"document\"></article>\n    </div>";
    // Title for all dialog windows as heading on level 2; focusable for
    // keyboard-only navigation:
    HTMLTemplate.DIALOG_TITLE = "<h2 class=\"outlinewidth\" id=\"achart_reader_dialog_title\" tabindex=\"0\"></h2>";
    HTMLTemplate.SCROLLABLE_CONTAINER = "<div class=\"scrollable_container\" tabindex=\"-1\"></div>";
    // Headings for sections of the help window, focusable for keyboard-only navigation:
    HTMLTemplate.HEADING = "<h3 tabindex=\"0\"></h1>";
    // Standalone text chunks of the GUI, e. g. chart and axis descriptions;
    // focusable for keyboard-only navigation:       
    HTMLTemplate.TEXT = "<div tabindex=\"0\" class=\"outlinewidth\"></div>";
    // Paragraphs of the help text; focusable for keyboard-only navigation:
    HTMLTemplate.PARAGRAPH = "<p tabindex=\"0\"></p>";
    // Combo box for choosing the sorting mode, incl. label:
    HTMLTemplate.SORT_BOX = "<label>" + text_en_1.Text.SORT_LABEL + ":\n    <select aria-label=\"" + text_en_1.Text.SORT_LABEL + "\">\n      <option value=\"NONE\">" + text_en_1.Text.SORT_ITEMS.NONE + "</option>\n      <option value=\"UPWARDS\">" + text_en_1.Text.SORT_ITEMS.UPWARDS + "</option>\n      <option value=\"DOWNWARDS\">" + text_en_1.Text.SORT_ITEMS.DOWNWARDS + "</option>\n    </select>\n  </label>";
    // Container for the list views of the data series; remains when lists are replaced;
    // when focused, the contained list items are focusable by the arrow keys:
    HTMLTemplate.LIST_CONTAINER = "<div tabindex=\"0\" aria-label=\"Data List\"></div>";
    // List view for the data series:
    HTMLTemplate.DATAPOINT_LIST = "<ol class=\"outlinewidth\"></ol>";
    // Data point as clickable list item; focusable by arrow keys:
    HTMLTemplate.DATAPOINT = "<li tabindex=\"-1\" style=\n    \"\n      position: relative;\n      cursor: pointer;\n    \">\n    </li>";
    // Simple list view for comparisons and statistics:
    HTMLTemplate.DETAILS_LIST = "<ul class=\"scrollable_container\" tabindex=\"-1\"></ul>";
    // Simple list item for comparisons and statistics; focusable for keyboard-only navigation:
    HTMLTemplate.ITEM = "<li class=\"outlinewidth\" tabindex=\"0\"></li>";
    // Button for showing the statistics for a data series:
    HTMLTemplate.STATISTICS_BUTTON = "<button>" + text_en_1.Text.SHOW_DATASET_STATISTICS + "</button>";
    // Button for closing a dialog window or the main app window:
    HTMLTemplate.CLOSE_BUTTON = "<button aria-keyshortcuts=\"Escape\" class=\"close_button\">" + text_en_1.Text.CLOSE + " (ESC)</button>";
    // Expandable element for graphics, charts, and data series:
    HTMLTemplate.NODE = "<details open=\"true\"><summary class=\"outlinewidth\"><h3></h3></summary></details>";
    // Prefix for the IDs of the items of the context menu (concatenated with number):
    HTMLTemplate.MENU_ITEM_ID = "achart_reader_menu_item";
    // Container for the context menu:
    HTMLTemplate.MENU = "<div class=\"context_menu\" role=\"menu\" tabindex=\"-1\"\n      aria-activedescendant=\"" + HTMLTemplate.MENU_ITEM_ID + "\"></div>";
    // Item of the context menu:
    HTMLTemplate.MENU_ITEM = "<button class=\"context_menu_item\" role=\"menuitem\"></button>";
    return HTMLTemplate;
}());
exports.HTMLTemplate = HTMLTemplate;


/***/ }),

/***/ "./src/ts/build/js/ts/gui/speech.js":
/*!******************************************!*\
  !*** ./src/ts/build/js/ts/gui/speech.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Speech = void 0;
var text_en_1 = __webpack_require__(/*! ../common/text.en */ "./src/ts/build/js/ts/common/text.en.js");
var Speech = /** @class */ (function () {
    function Speech(language, button) {
        this.language = language;
        this.button = button;
        this.ON_BY_DEFAULT = true;
        this.synthesizer = undefined;
        this.voice = undefined;
        // Initialize speech synthesizer,
        // flow is needed for certain browsers (chromium/electron)
        window.speechSynthesis.getVoices();
        if (window.localStorage) {
            if (!localStorage.getItem('reload_once')) {
                localStorage['reload_once'] = true;
                location.reload(true);
            }
            else {
                localStorage.removeItem('reload_once');
            }
        }
        this.language = language;
        if (!window.speechSynthesis) {
            this.button.textContent = text_en_1.Text.NO_SPEECH;
        }
        else {
            if (this.ON_BY_DEFAULT) {
                this.setSynthesizer();
                this.button.textContent = text_en_1.Text.DISABLE_SPEECH + " (Alt+S)";
                this.speak(text_en_1.Text.APP_TITLE);
            }
            else {
                this.button.textContent = text_en_1.Text.ENABLE_SPEECH + " (Alt+S)";
            }
        }
    }
    Speech.prototype.setSynthesizer = function () {
        this.synthesizer = window.speechSynthesis;
        // Wait for this event in case voices are loaded server-side
        // https://wicg.github.io/speech-api/#dom-speechsynthesis-getvoices
        var speech = this;
        this.synthesizer.addEventListener('voiceschanged', function () {
            if (!speech.voice) {
                speech.setVoice();
            }
        });
        // This event never fires if voices are loaded locally
        // So call setVoice here anyway in case of that
        if (!this.voice) {
            this.setVoice();
        }
    };
    Speech.prototype.setVoice = function (language) {
        // Select appropriate voice
        // Some browsers or installations do not have appropriately tagged languages
        // The language might be 'none'
        // If a voice with the right language is found choose that one
        // Otherwise choose the first available one
        if (language === void 0) { language = ""; }
        language = language ? language : this.language;
        var voices = this.synthesizer.getVoices();
        this.voice = voices[0];
        for (var _i = 0, voices_1 = voices; _i < voices_1.length; _i++) {
            var v = voices_1[_i];
            if (v.lang.startsWith(language)) {
                this.voice = v;
                break;
            }
        }
        // Some synths' voices have missing lang fields
        for (var _a = 0, voices_2 = voices; _a < voices_2.length; _a++) {
            var v = voices_2[_a];
            if (v.lang === "" && v.name.toLowerCase().includes("english")) {
                this.voice = v;
                break;
            }
        }
    };
    Speech.prototype.toggle = function () {
        if (!window.speechSynthesis) {
            return;
        }
        if (!this.synthesizer) {
            this.setSynthesizer();
            this.speak(text_en_1.Text.SPEECH_ENABLED);
            this.button.textContent = text_en_1.Text.DISABLE_SPEECH + " (Alt+S)";
        }
        else {
            this.speak(text_en_1.Text.SPEECH_DISABLED);
            delete this.synthesizer;
            this.button.textContent = text_en_1.Text.ENABLE_SPEECH + " (Alt+S)";
        }
    };
    Speech.prototype.speak = function (text, interrupt, language) {
        if (interrupt === void 0) { interrupt = false; }
        if (language === void 0) { language = ""; }
        if (!this.synthesizer) {
            return;
        }
        if (!this.voice) {
            this.setVoice();
        }
        language = language ? language : this.language;
        if (interrupt) {
            this.stop();
        }
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;
        utterance.voice = this.voice;
        this.synthesizer.speak(utterance);
    };
    Speech.prototype.readElement = function (element, toggled) {
        if (toggled === void 0) { toggled = false; }
        if (!element) {
            return;
        }
        var text = "";
        switch (element.tagName.toLowerCase()) {
            case "select":
                var name_1 = element.getAttribute("aria-label");
                if (name_1) {
                    text = name_1 + " ";
                }
                var value = element.value;
                text += (text_en_1.Text.SORT_ITEMS[value]) ? text_en_1.Text.SORT_ITEMS[value] : value;
                break;
            case "div":
                if ((element.getAttribute("role") !== "menu")
                    && (!element.classList.contains("scrollable_container"))) {
                    text = element.textContent;
                }
                break;
            case "summary":
                text = element.textContent;
                if (!toggled) {
                    text += ", " + ((element.parentElement.getAttribute("open") !== null) ?
                        text_en_1.Text.EXPANDED : text_en_1.Text.COLLAPSED);
                }
                break;
            case "button":
                text = element.getAttribute("aria-label") || element.textContent;
                text += ", button";
                break;
            case "input":
                if (element.id == "highlighting_button") {
                    text = text_en_1.Text.HIGHLIGHTING_TOGGLE;
                }
                break;
            default:
                text = element.textContent;
        }
        this.speak(text);
    };
    Speech.prototype.stop = function () {
        if ((!this.synthesizer) || !((this.synthesizer.pending)
            || (this.synthesizer.speaking))) {
            return;
        }
        this.synthesizer.cancel();
    };
    return Speech;
}());
exports.Speech = Speech;


/***/ }),

/***/ "./src/ts/build/js/ts/gui/user-interface.js":
/*!**************************************************!*\
  !*** ./src/ts/build/js/ts/gui/user-interface.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInterface = void 0;
var speech_1 = __webpack_require__(/*! ./speech */ "./src/ts/build/js/ts/gui/speech.js");
var context_menu_1 = __webpack_require__(/*! ./context-menu */ "./src/ts/build/js/ts/gui/context-menu.js");
var interfaces_1 = __webpack_require__(/*! ../common/interfaces */ "./src/ts/build/js/ts/common/interfaces.js");
var html_template_1 = __webpack_require__(/*! ./html-template */ "./src/ts/build/js/ts/gui/html-template.js");
var text_en_1 = __webpack_require__(/*! ../common/text.en */ "./src/ts/build/js/ts/common/text.en.js");
var helper_1 = __webpack_require__(/*! ./helper */ "./src/ts/build/js/ts/gui/helper.js");
// SVG highlighting modes
var HighlightingMode;
(function (HighlightingMode) {
    HighlightingMode["MASK"] = "mask_highlight";
    HighlightingMode["OUTLINE"] = "outline_highlight";
})(HighlightingMode || (HighlightingMode = {}));
// Class for building and modifying the Web interface (view)
var UserInterface = /** @class */ (function () {
    // ---
    // Description: Initialises the GUI main window.
    // achart_interpreter: App object (controller).
    // ---
    function UserInterface(achart_interpreter) {
        var _this = this;
        // Threshold time for fast consecutive key presses;
        // needed for stable speech output
        this.FAST_KEY_PRESS_INTERVAL = 400;
        // Indicates if a chart tree node has just been opened or closed:
        this.node_toggled = false;
        this.graphic_panel = {
            container: undefined,
            title: undefined,
            content: {
                container: undefined,
                remove_button: undefined,
                svg: undefined,
                // Checkbox for toggling the highlighting mode:
                highlighting_container: undefined
            }
        };
        // Last focused element within a window right before focus moves to a different window:
        this.last_focus = document.body;
        // Graphics element currently highlighted:
        this.current_svg = undefined;
        this.previous_svg = undefined;
        this.previous_svg_id = "";
        // Dialogue windows for comparisons, statistics, and help text:
        this.details = undefined;
        // Data point with focus (currently or the last time that focus has
        // been within a list view of a data series):
        this.datapoint_focus = {
            chart: 0,
            dataset: 0,
            list_position: 0,
            datapoint: 0
        };
        // Current screen reader interaction mode (no visual impact;
        // default: document mode):
        this.app_mode = false;
        this.achart_interpreter = achart_interpreter;
        // Build up the basic structure of the main window
        // Header menu
        this.header_container_buttons = document.getElementById("header_container_buttons");
        this.remote_file_list = document
            .getElementById("remote_file_list");
        this.remote_file_list.setAttribute("aria-label", text_en_1.Text.SELECT_SAMPLE_CHART);
        this.remote_file_list.firstElementChild.textContent = text_en_1.Text.SAMPLE_CHART;
        this.stopPropagationOfKeys(this.remote_file_list);
        this.remote_file_list.addEventListener("change", function () {
            if (_this.speech) {
                _this.speech.speak(_this.remote_file_list.value);
            }
        });
        this.file_upload_button = document.getElementById("local_file_button_proxy");
        this.file_upload_button.textContent = text_en_1.Text.FILE_UPLOAD;
        this.speech_button = helper_1.Helper.appendHTML(this.header_container_buttons, html_template_1.HTMLTemplate.SPEECH_BUTTON);
        this.speech_button.addEventListener("click", function (event) {
            _this.speech.toggle();
        });
        var app_mode_button = helper_1.Helper.appendHTML(this.header_container_buttons, html_template_1.HTMLTemplate.APP_MODE_BUTTON);
        app_mode_button.addEventListener("click", function (event) {
            _this.toggleAppMode(app_mode_button);
        });
        var help_button = helper_1.Helper.appendHTML(this.header_container_buttons, html_template_1.HTMLTemplate.HELP_BUTTON);
        help_button.addEventListener("click", function (event) {
            _this.last_focus = help_button;
            if (!_this.details) {
                _this.showHelp();
            }
            else {
                _this.close();
            }
        });
        this.hamburgerMenu();
        // Placeholder text:
        this.placeholder_text = document.getElementById("placeholder_text");
        this.placeholder_text.innerHTML = text_en_1.Text.PLACEHOLDER_TEXT + " " +
            this.placeholder_text.innerHTML;
        this.grid_container = document.getElementById("grid_container");
        // Initialise the graphic panel
        this.graphic_panel.container = document.getElementById("graphic_panel"),
            this.graphic_panel.title = (this.graphic_panel.container.firstElementChild);
        this.graphic_panel.title.textContent = text_en_1.Text.GRAPHIC_PANEL;
        this.graphic_panel.content.container = helper_1.Helper.appendHTML(this.graphic_panel.container, html_template_1.HTMLTemplate.GRAPHIC_PANEL_CONTENT);
        // Button for removing an SVG document from the page:
        this.graphic_panel.content.remove_button = helper_1.Helper.appendHTML(this.graphic_panel.content.container, html_template_1.HTMLTemplate.REMOVE_SVG_BUTTON);
        this.graphic_panel.content.remove_button.addEventListener("click", function () {
            _this.removeSvg();
        });
        // Highlighting mode button:
        this.graphic_panel.content.highlighting_container =
            this.handleToggleHighlightingButton(this.graphic_panel.content.container);
        // Initialise the text panel
        this.text_panel = document.getElementById("text_panel");
        this.title = this.text_panel.firstElementChild;
        this.title.textContent = text_en_1.Text.TEXT_PANEL;
        this.first_element = this.title;
        this.container = helper_1.Helper.appendHTML(this.text_panel, html_template_1.HTMLTemplate.SCROLLABLE_CONTAINER);
        // Create speech synthesis object:
        this.speech = new speech_1.Speech("en-US", this.speech_button);
        var last_key_press = Date.now(), fast_key_presses = 1, timeout_id;
        document.addEventListener("keydown", function () {
            if (_this.speech) {
                _this.speech.stop();
                last_key_press = Date.now();
            }
            if (Date.now() - last_key_press > _this.FAST_KEY_PRESS_INTERVAL) {
                fast_key_presses = 1;
            }
            else {
                fast_key_presses++;
            }
        }, true);
        document.addEventListener("mousedown", function () {
            if (_this.speech) {
                _this.speech.stop();
            }
        }, true);
        // If the built-in speech is enabled, read every focused element:
        document.body.addEventListener("focusin", function (event) {
            if ((fast_key_presses < 2) && (event.target.tagName !== "summary")) {
                _this.speech.readElement(event.target, _this.node_toggled);
            }
            else {
                if (fast_key_presses > 2) {
                    clearTimeout(timeout_id);
                }
                timeout_id = setTimeout(function () {
                    _this.speech.readElement(document.activeElement);
                    fast_key_presses = 0;
                }, _this.FAST_KEY_PRESS_INTERVAL);
            }
            // Extra handling for highlighting mode toggle button
            // As the inner element is focused when tabbing, but the 
            // outer element should get the outline
            if (event.target.id == "highlighting_button") {
                var checkbox = event.target;
                var parent_container = checkbox.parentElement.parentElement;
                // assert (parent_container.id == "highlighting");
                parent_container.classList.add('outline_highlight', 'outlinewidth');
            }
            if (!_this.details) {
                _this.removeSVGHighlighting();
                _this.previous_svg = null;
            }
        }, true);
        // Handle key commands for the main window
        document.addEventListener("keydown", function (event) {
            event.stopPropagation();
            var key = "";
            if (event.key) {
                key = event.key.toLowerCase();
            }
            switch (key) {
                case "escape":
                    // Ignore if modifyer key(s) is/are pressed:
                    if ((event.shiftKey) || (event.altKey) || (event.ctrlKey) || (event.metaKey)) {
                        return;
                    }
                    event.preventDefault();
                    // Close either the context menu if it is open or otherwise
                    // any current details window:
                    if ((_this.menu) && (_this.menu.is_open)) {
                        _this.menu.close();
                        _this.last_focus.focus();
                    }
                    else {
                        _this.close();
                    }
                    break;
                case "s":
                    // Alt+S:
                    if ((event.altKey) && !((event.ctrlKey) || (event.shiftKey) || (event.metaKey))) {
                        event.preventDefault();
                        _this.speech.toggle();
                    }
                    break;
                case "f1":
                    // Ignore if modifyer key(s) is/are pressed:
                    if ((event.shiftKey) || (event.altKey) || (event.ctrlKey) || (event.metaKey)) {
                        return;
                    }
                    event.preventDefault();
                    if (_this.details) {
                        return;
                    }
                    _this.last_focus = document.activeElement;
                    _this.showHelp();
                    break;
                // Prevent browser default for navigation keys:
                case "arrowdown":
                case "arrowup":
                case "arrowleft":
                case "arrowright":
                case "home":
                case "end":
                case "pageup":
                case "pagedown":
                    event.preventDefault();
                    break;
                case "a":
                    // Alt+A:
                    if ((event.altKey) && !((event.ctrlKey) || (event.shiftKey) || (event.metaKey))) {
                        event.preventDefault();
                        _this.toggleAppMode(app_mode_button);
                    }
                    break;
                default:
            }
        });
        // Initialise the context menu for data points
        this.menu = new context_menu_1.ContextMenu(this);
        this.menu.addItem("JUMP_TO_BEGINNING", function () {
            _this.jumpToBeginning();
        });
        this.menu.addItem("JUMP_TO_END", function () {
            _this.jumpToEnd();
        });
        this.menu.addItem("COMPARE_TO_SAME", function () {
            _this.achart_interpreter.compareToRestOfDataset(_this.datapoint_focus, _this.datapoints_sorted[_this.datapoint_focus.chart][_this.datapoint_focus.dataset]);
        });
        this.menu.addItem("SHOW_DATAPOINT_STATISTICS", function () {
            _this.achart_interpreter.compareToStatistics(_this.datapoint_focus, _this.datapoints_sorted[_this.datapoint_focus.chart][_this.datapoint_focus.dataset]);
        });
        // If the menu is open, close it when clicking anywhere within the
        // Web document
        document.addEventListener("click", function () {
            //event.stopImmediatePropagation();
            if ((_this.menu) && (_this.menu.is_open)) {
                //event.stopImmediatePropagation();
                //event.preventDefault();
                _this.menu.close();
            }
        });
    }
    // ---
    // Description: Fades in and out the about text accordion style when
    //              about button is pressed.
    // ---
    UserInterface.prototype.fadeInAboutTextOnClick = function () {
        var about_button = document.getElementById("about_button");
        var about_text = document.getElementById("about_text");
        about_button.addEventListener("click", function () {
            this.classList.toggle("active");
            if (about_text.style.maxHeight) {
                about_text.style.maxHeight = null;
                about_text.setAttribute("aria-hidden", "true");
            }
            else {
                about_text.style.maxHeight = about_text.scrollHeight + "px";
                about_text.setAttribute("aria-hidden", "false");
            }
        });
        // Initialise last_focus with the first element of the window:
        this.last_focus = about_button;
    };
    // ---
    // Description: Toggle header menu buttons style on media query
    // ---
    UserInterface.prototype.toggleHeaderMenuButtons = function (x) {
        // If media query matches:
        if (x.matches) {
            this.header_container_buttons.classList.remove("show");
            this.header_container_buttons.classList.add("hide");
        }
        else {
            this.header_container_buttons.classList.remove("hide");
            this.header_container_buttons.classList.add("show");
        }
    };
    // ---
    // Description: Handle the header menu and its hamburger button
    // ---
    UserInterface.prototype.hamburgerMenu = function () {
        var _this = this;
        var hamburger_menu_button = document.getElementById("hamburger_menu_button");
        hamburger_menu_button.setAttribute("aria-label", text_en_1.Text.HAMBURGER_MENU_BUTTON);
        hamburger_menu_button.addEventListener("click", function () {
            if (_this.header_container_buttons.classList.contains("show")) {
                _this.header_container_buttons.classList.remove("show");
                _this.header_container_buttons.classList.add("hide");
            }
            else {
                _this.header_container_buttons.classList.remove("hide");
                _this.header_container_buttons.classList.add("show");
            }
        });
        var x = window.matchMedia("(max-width: 43em)");
        this.toggleHeaderMenuButtons(x);
        x.addListener(this.toggleHeaderMenuButtons);
    };
    // ---
    // Description: Initialises the graphic panel  of the app
    //              with the loaded SVG document.
    // ---
    UserInterface.prototype.insertSvg = function (svg_content, filename) {
        var _this = this;
        this.removeSvg();
        this.placeholder_text.style.visibility = "hidden";
        // Build up the graphic panel
        this.graphic_panel.content.svg = helper_1.Helper.appendHTML(this.graphic_panel.content.container, svg_content);
        this.graphic_panel.content.svg.setAttribute("aria-hidden", "true");
        this.graphic_panel.content.svg.addEventListener("mousedown", function (event) {
            event.preventDefault();
            event.stopPropagation();
            _this.svg_document.firstElementChild.focus();
        });
        this.graphic_panel.title.textContent = text_en_1.Text.GRAPHIC_PANEL + ": " + filename;
        this.closeTabCircle(this.title, this.graphic_panel.content.highlighting_container.childNodes[5], true);
        this.graphic_panel.content.container.removeAttribute("hidden");
        this.root_svg = this.graphic_panel.content.svg;
        UserInterface.is_open = true;
        return this.root_svg;
    };
    // ---
    // Description: Initialises the text panel  of the app
    //              with the basic data of the analysed SVG document.
    // charts: Number of charts contained in the SVG.
    // svg_summary: SVG title and number of charts.
    // svg_description (optional): Description for the entire SVG provided
    //                             by the author or charting library.
    // ---
    UserInterface.prototype.initTextPanel = function (svg_summary, charts, svg_description) {
        this.svg_document = this.createNode(this.container, this.root_svg, false, svg_summary, svg_description);
        this.svg_document.classList.add("text_root");
        this.setHighlightPattern(this.root_svg);
        // Initialise arrays:
        this.charts = new Array(charts);
        this.axes = new Array(charts);
        this.legends = new Array(charts);
        this.datasets = new Array(charts);
        this.datapoints_sorted = new Array(charts);
        this.datapoints = new Array(charts);
        this.charts_svg = new Array(charts);
        this.axes_svg = new Array(charts);
        this.legends_svg = new Array(charts);
        this.datasets_svg = new Array(charts);
        this.datapoints_svg = new Array(charts);
        this.selected_list_position = new Array(charts);
        this.selected_datapoint = new Array(charts);
        this.svg_document.firstElementChild.focus();
    };
    // ---
    // Description: Adds a <details> element to the web interface and returns it;
    //              used to represent graphics, charts, and data series.
    // parent: The DOM to which the element shall be appended.
    // one_of_multiple: Indicates whether there are multiple entries of the
    //                  same type (chart, data series);
    //                  if so, the <details> element is left closed, otherwise it is expanded.
    // summary: Text indicating type, index, title, and content of the
    //          graphic, chart, or data series.
    // description (optional): Text describing the graphic, chart, or data series.
    // ---
    UserInterface.prototype.createNode = function (parent, svg_element, one_of_multiple, summary, description) {
        var _this = this;
        var node = helper_1.Helper.appendHTML(parent, html_template_1.HTMLTemplate.NODE);
        node.firstElementChild.firstElementChild.textContent = "" + summary;
        node.firstElementChild.firstElementChild.addEventListener("click", function (event) {
            event.preventDefault();
        });
        if (description) {
            var description_node = helper_1.Helper.appendHTML(node, html_template_1.HTMLTemplate.TEXT);
            description_node.textContent = description;
        }
        node.addEventListener("focusin", function (event) {
            event.stopPropagation();
            _this.setSVGHighlighting(svg_element, false);
        });
        node.firstElementChild.addEventListener("mousedown", function (event) {
            _this.node_toggled = (event.target === node.firstElementChild);
        });
        node.firstElementChild.addEventListener("click", function (event) {
            _this.node_toggled = (event.target === node.firstElementChild);
        });
        node.addEventListener("toggle", function () {
            if ((_this.speech) && (_this.node_toggled)) {
                _this.speech.speak((node.getAttribute("open") !== null) ? text_en_1.Text.EXPANDED : text_en_1.Text.COLLAPSED);
                _this.node_toggled = false;
            }
        });
        return node;
    };
    // ---
    // Description: Adds the representation of a chart to the web interface.
    // index: Index of the chart to be added.
    // one_of_multiple: Indicates whether there are multiple charts;
    //                  if so, the <details> element is left closed, otherwise it is expanded.
    // summary: Text indicating index, title, and the number of contained
    //          data series of the chart.
    // description (optional): Denotes the chart type and content.
    // ---
    UserInterface.prototype.addChart = function (index, root, one_of_multiple, datasets, summary, description) {
        var _this = this;
        // Avoid crash due to variables not initialised:
        if ((!this.svg_document) || (!this.charts) || (this.charts.length <= index)) {
            return;
        }
        this.charts_svg[index] = root;
        this.charts[index] = this.createNode(this.svg_document, root, one_of_multiple, summary, description);
        root.setAttribute("pointer-events", "bounding-box");
        root.addEventListener("mousedown", function (event) {
            event.preventDefault();
            event.stopPropagation();
            _this.svg_document.setAttribute("open", "true");
            _this.charts[index].firstElementChild.focus();
        });
        // Initialise arrays:
        this.axes[index] = [];
        this.legends[index] = [];
        this.datasets[index] = new Array(datasets);
        this.datapoints_sorted[index] = new Array(datasets);
        this.datapoints[index] = new Array(datasets);
        this.axes_svg[index] = [];
        this.legends_svg[index] = [];
        this.datasets_svg[index] = new Array(datasets);
        this.datapoints_svg[index] = new Array(datasets);
        this.selected_list_position[index] = new Array(datasets);
        this.selected_datapoint[index] = new Array(datasets);
    };
    // ---
    // Description: Adds the representation of an axis to the Web interface.
    // index: Index of the chart the axis belongs to.
    // variable: Variable of the axis to be added.
    // description: Denotes the axis title and labels.
    // ---
    UserInterface.prototype.addAxis = function (index, svg_element, variable, description) {
        var _this = this;
        // Avoid crash due to variables not initialised:
        if ((!this.charts) || (!this.charts[index]) || (!this.axes) || (!this.axes[index])) {
            return;
        }
        this.axes_svg[index][variable] = svg_element;
        this.axes[index][variable] = helper_1.Helper.appendHTML(this.charts[index], html_template_1.HTMLTemplate.TEXT);
        this.axes[index][variable].textContent = description;
        this.axes[index][variable].addEventListener("focusin", function (event) {
            event.stopPropagation();
            _this.setSVGHighlighting(svg_element, false);
        });
        this.axes_svg[index][variable].setAttribute("pointer-events", "bounding-box");
        this.axes_svg[index][variable].addEventListener("mousedown", function (event) {
            event.preventDefault();
            event.stopPropagation();
            _this.svg_document.setAttribute("open", "true");
            _this.charts[index].setAttribute("open", "true");
            _this.axes[index][variable].focus();
        });
    };
    // ---
    // Description: Adds the representation of a legend to the web interface.
    // chart_index: Index of the chart the legend belongs to.
    // legend_index: Index of the legend to be added.
    // description: Denotes the legend title and values.
    // ---
    UserInterface.prototype.addLegend = function (chart_index, legend_index, svg_element, description) {
        var _this = this;
        // Avoid crash due to variables not initialised:
        if ((!this.charts) || (!this.charts[chart_index])
            || (!this.legends) || (!this.legends[chart_index])) {
            return;
        }
        this.legends_svg[chart_index][legend_index] = svg_element;
        this.legends[chart_index][legend_index] = helper_1.Helper.appendHTML(this.charts[chart_index], html_template_1.HTMLTemplate.TEXT);
        this.legends[chart_index][legend_index].textContent = description;
        this.legends[chart_index][legend_index].addEventListener("focusin", function (event) {
            event.stopPropagation();
            _this.setSVGHighlighting(svg_element, false);
        });
        this.legends_svg[chart_index][legend_index].setAttribute("pointer-events", "bounding-box");
        this.legends_svg[chart_index][legend_index].addEventListener("mousedown", function (event) {
            event.preventDefault();
            event.stopPropagation();
            _this.svg_document.setAttribute("open", "true");
            _this.charts[chart_index].setAttribute("open", "true");
            _this.legends[chart_index][legend_index].focus();
        });
    };
    // ---
    // Description: Adds the representation of a data series to the web interface.
    // chart_index: Index of the chart the data series belongs to.
    // dataset_index: Index of the data series to be added.
    // one_of_multiple: Indicates whether there are multiple data series in the same chart;
    //                  if so, the <details> element is left closed, otherwise it is opened.
    // datapoints: Number of data points in this data series.
    // summary: Text indicating index, title, and the number of contained
    //          data points of the data series.
    // description (optional): Additional description by the author.
    // ---
    UserInterface.prototype.addDataset = function (chart_index, dataset_index, svg_element, one_of_multiple, datapoints, summary, description) {
        var _this = this;
        // Avoid crash due to variables not initialised:
        if ((!this.charts) || (!this.charts[chart_index]) || (!this.datasets)
            || (!this.datasets[chart_index]) ||
            (this.datasets[chart_index].length <= dataset_index)) {
            return;
        }
        this.datasets_svg[chart_index][dataset_index] = svg_element;
        var dataset = this.createNode(this.charts[chart_index], svg_element, one_of_multiple, summary, description);
        this.datasets[chart_index][dataset_index] = dataset;
        svg_element.setAttribute("pointer-events", "bounding-box");
        svg_element.addEventListener("mousedown", function (event) {
            event.preventDefault();
            event.stopPropagation();
            _this.svg_document.setAttribute("open", "true");
            _this.charts[chart_index].setAttribute("open", "true");
            dataset.firstElementChild.focus();
        });
        // Initialise arrays:
        this.datapoints[chart_index][dataset_index] = [];
        this.datapoints_svg[chart_index][dataset_index] = [];
        this.datapoints_sorted[chart_index][dataset_index] = interfaces_1.Sorting.NONE;
        this.selected_list_position[chart_index][dataset_index] = 0;
        this.selected_datapoint[chart_index][dataset_index] = 0;
    };
    // ---
    // Description: Moves the focus to the first item in the data list view
    //              indicated by this.datapoint_focus;
    //              sets this.datapoint_focus.list_position accordingly.
    // ---
    UserInterface.prototype.jumpToBeginning = function () {
        this.datapoint_focus.list_position = 0;
        this.datapoints[this.datapoint_focus.chart][this.datapoint_focus.dataset][this.datapoint_focus.list_position].focus();
    };
    // ---
    // Description: Moves the focus to the last item in the data list view
    //              indicated by this.datapoint_focus;
    //              sets this.datapoint_focus.list_position accordingly.
    // ---
    UserInterface.prototype.jumpToEnd = function () {
        var datapoints = this.datapoints[this.datapoint_focus.chart][this.datapoint_focus.dataset];
        this.datapoint_focus.list_position = datapoints.length - 1;
        datapoints[this.datapoint_focus.list_position].focus();
    };
    // ---
    // Description: Opens a dialogue window and lists the content of "details";
    //              used for showing comparisons and statistics.
    // details.title: The dialogue title.
    // details.items: Content to be listed, e. g., comparisons or statistics.
    // ---
    UserInterface.prototype.showDetails = function (details) {
        if (this.details) {
            return;
        }
        // HTMLTemplate.DIALOG_WINDOW is defined as 2 nested <div> elements,
        // so the child element has to be used for appending the content:
        var dialogue_window = helper_1.Helper.appendHTML(document.body, html_template_1.HTMLTemplate.DIALOG_WINDOW).childNodes[1];
        var title = helper_1.Helper.appendHTML(dialogue_window, html_template_1.HTMLTemplate.DIALOG_TITLE);
        title.textContent = details.title;
        this.first_element = title;
        this.addCloseButton(dialogue_window);
        var list = helper_1.Helper.appendHTML(dialogue_window, html_template_1.HTMLTemplate.DETAILS_LIST);
        var item;
        for (var detail in details.items) {
            item = helper_1.Helper.appendHTML(list, html_template_1.HTMLTemplate.ITEM);
            item.textContent = details.items[detail];
        }
        this.closeTabCircle(title, item);
        this.details = dialogue_window;
        title.focus();
    };
    // ---
    // Description: Changes the screen reader interaction mode to
    //              "Application Mode" or back to "Document Mode"
    //              by adding or removing the ARIA role "application" to
    //              the container of the data list view
    //              (has no impact on the visual appearance).
    // app_mode_button: The button element used to toggle the mode.
    // ---
    UserInterface.prototype.toggleAppMode = function (app_mode_button) {
        if (this.app_mode) {
            for (var chart in this.datasets) {
                for (var dataset in this.datasets[chart]) {
                    this.datasets[chart][dataset].parentNode.removeAttribute("role");
                }
            }
            app_mode_button.textContent = text_en_1.Text.SWITCH_TO_APP_MODE + " (Alt+A)";
            this.app_mode = false;
        }
        else {
            for (var chart in this.datasets) {
                for (var dataset in this.datasets[chart]) {
                    this.datasets[chart][dataset].parentNode
                        .setAttribute("role", "application");
                }
            }
            app_mode_button.textContent = text_en_1.Text.SWITCH_TO_DOCUMENT_MODE + " (Alt+A)";
            this.app_mode = true;
        }
    };
    // ---
    // Description: Opens a dialogue window and displays the help texts.
    // ---
    UserInterface.prototype.showHelp = function () {
        if (this.details) {
            return;
        }
        // HTMLTemplate.DIALOG_WINDOW is defined as 2 nested <div> elements,
        // so the child element has to be used for appending the content:
        var dialogue_window = helper_1.Helper.appendHTML(document.body, html_template_1.HTMLTemplate.DIALOG_WINDOW).childNodes[1];
        var title = helper_1.Helper.appendHTML(dialogue_window, html_template_1.HTMLTemplate.DIALOG_TITLE);
        title.textContent = text_en_1.Text.APP_TITLE + " - " + text_en_1.Text.HELP_TEXT.TITLE;
        this.first_element = title;
        this.addCloseButton(dialogue_window);
        var container = helper_1.Helper.appendHTML(dialogue_window, html_template_1.HTMLTemplate.SCROLLABLE_CONTAINER);
        // Append all sections of the help text:
        var element;
        for (var _i = 0, _a = text_en_1.Text.HELP_TEXT.SECTIONS; _i < _a.length; _i++) {
            var section = _a[_i];
            element = helper_1.Helper.appendHTML(container, html_template_1.HTMLTemplate.HEADING);
            element.textContent = section.HEADING;
            // Append every paragraph of the section:
            for (var _b = 0, _c = section.TEXT; _b < _c.length; _b++) {
                var paragraph = _c[_b];
                element = helper_1.Helper.appendHTML(container, html_template_1.HTMLTemplate.PARAGRAPH);
                element.innerHTML = paragraph;
            }
        }
        this.details = dialogue_window;
        this.closeTabCircle(title, element);
        title.focus();
    };
    // ---
    // Description: Prepares the list view incl. event listeners for the specified data series.
    // index: Indices of the data series whose list view is to prepare.
    // ---
    UserInterface.prototype.initDataList = function (chart_index, dataset_index, title) {
        var _this = this;
        // Create an object for the indices of the data series:
        var index = {
            chart: chart_index,
            dataset: dataset_index
        };
        // Add the combo box for choosing the sorting mode
        // HTMLTemplate.SORT_BOX is a label with the actual combo box as child
        // element, so the child element has to be used for adding the options
        // and event listeners:
        var sort = helper_1.Helper.appendHTML(this.datasets[index.chart][index.dataset], html_template_1.HTMLTemplate.SORT_BOX)
            .childNodes[1];
        // If speech is enabled, read every selected option element:
        sort.addEventListener("change", function () {
            _this.speech.speak(text_en_1.Text.SORT_ITEMS[sort.value]);
        });
        // On click, pressing Enter, or Space, apply the selected sorting mode:
        helper_1.Helper.addActivationListener(sort, function (event) {
            _this.sortDatapoints(index, sort.value);
        });
        // Just in order to make possible leaving by ESC key in Chrome:
        this.stopPropagationOfKeys(sort);
        // Add the list view for the data series
        // This container remains when the list view is rebuilt for sorting:
        var data_container = helper_1.Helper.appendHTML(this.datasets[index.chart][index.dataset], html_template_1.HTMLTemplate.LIST_CONTAINER);
        if (title) {
            data_container.setAttribute("aria-label", title);
        }
        // The actual list; removed and appended anew when the sorting mode is changed:
        var data_list = helper_1.Helper.appendHTML(data_container, html_template_1.HTMLTemplate.DATAPOINT_LIST);
        var statistics_button = helper_1.Helper.appendHTML(this.datasets[index.chart][index.dataset], html_template_1.HTMLTemplate.STATISTICS_BUTTON);
        statistics_button.addEventListener("click", function (event) {
            _this.last_focus = statistics_button;
            _this.achart_interpreter.showDatasetStatistics(index);
        });
        // Now that the skeleton of the data series representation is created,
        // assign the data list itself to the data series variable so that it
        // can be used for adding data points:
        this.datasets[index.chart][index.dataset] = data_list;
        // Keyboard navigation within a data list view
        data_container.addEventListener("keydown", function (event) {
            var key = "";
            if (event.key) {
                key = event.key.toLowerCase();
            }
            switch (key) {
                case "arrowup":
                    // Move focus to the previous item in the data list view
                    // If the focus is not on the first item, decrement the index
                    // and set the focus on the corresponding data point element:
                    if (_this.datapoint_focus.list_position !== 0) {
                        _this.datapoints[index.chart][index.dataset][--_this.datapoint_focus.list_position].focus();
                    }
                    break;
                case "arrowdown":
                    // Move focus to the next item in the data list view
                    // If the focus is not on the last item, increment the index,
                    // and set the focus on the corresponding data point element:
                    if (_this.datapoint_focus.list_position !==
                        _this.datapoints[index.chart][index.dataset].length - 1) {
                        _this.datapoints[index.chart][index.dataset][++_this.datapoint_focus.list_position].focus();
                    }
                    break;
                case "arrowleft":
                    // Move the focus to the corresponding item in the data list
                    // view of the previous series
                    // If the focus is not on the list view of the first series, decrement the index
                    // and set the focus on the corresponding data point element:
                    if (_this.datapoint_focus.dataset !== 0) {
                        _this.datasets[index.chart][--_this.datapoint_focus.dataset]
                            .parentElement.parentElement.setAttribute("open", "true");
                        _this.datapoints[index.chart][_this.datapoint_focus.dataset][_this.datapoint_focus.list_position].focus();
                    }
                    break;
                case "arrowright":
                    // Move the focus to the corresponding item in the data list
                    // view of the next series
                    // If the focus is not on the list view of the last series, increment the index
                    // and set the focus on the corresponding data point element:
                    if (_this.datapoint_focus.dataset !==
                        _this.datasets[index.chart].length - 1) {
                        _this.datasets[index.chart][++_this.datapoint_focus.dataset]
                            .parentElement.parentElement.setAttribute("open", "true");
                        _this.datapoints[index.chart][_this.datapoint_focus.dataset][_this.datapoint_focus.list_position].focus();
                    }
                    break;
                case "home":
                    _this.jumpToBeginning();
                    break;
                case "end":
                    _this.jumpToEnd();
                    break;
                case "tab":
                    // Shift+TAB:
                    if ((event.shiftKey) && !((event.altKey) || (event.ctrlKey) || (event.metaKey))) {
                        event.preventDefault();
                        sort.focus();
                    }
                    break;
                default:
            }
            //this.selected_list_position[index.chart][this.datapoint_focus.dataset] =
            //    this.datapoint_focus.list_position;
        });
        // If the container of the data list view itself (no child element) receives
        // focus, set the focus on the previously selected data point in this
        // data series (default: first item)
        data_container.addEventListener("focus", function (event) {
            _this.datapoint_focus =
                {
                    chart: chart_index,
                    dataset: dataset_index,
                    list_position: _this.selected_list_position[chart_index][dataset_index]
                };
            _this.datapoints[index.chart][index.dataset][_this.datapoint_focus.list_position].focus();
        });
    };
    // ---
    // Description: Appends the representation of a data point incl.
    //              event listeners to the specified data list view.
    // chart_index: Index of the chart whose data point shall be added.
    // dataset_index: Index of the data series whose data point shall be added.
    // datapoint_index: Index of the data point to be added.
    // datapoint_true_index: Original index of the data point (before sorting)
    // description: Text containing label and value of the data point.
    // ---
    UserInterface.prototype.addDatapoint = function (chart_index, dataset_index, position_index, datapoint_index, svg_element, description) {
        var _this = this;
        // Avoid crash due to variables not initialised:
        if ((!this.datasets) || (!this.datasets[chart_index]) ||
            (!this.datasets[chart_index][dataset_index])
            || (!this.datapoints) || (!this.datapoints[chart_index]) ||
            (!this.datapoints[chart_index][dataset_index])) {
            return;
        }
        // Create an object for the indices of the data point:
        var index = {
            chart: chart_index,
            dataset: dataset_index,
            datapoint: datapoint_index,
            list_position: position_index
        };
        var datapoint = helper_1.Helper.appendHTML(this.datasets[index.chart][index.dataset], html_template_1.HTMLTemplate.DATAPOINT);
        datapoint.textContent = description;
        this.datapoints[index.chart][index.dataset][index.list_position] =
            datapoint;
        this.datapoints_svg[index.chart][index.dataset][index.list_position] =
            svg_element;
        // If a data list item receives focus, set this.datapoint_focus,
        // this.last_focus, this.selected_list_position, and
        // this.selected_datapoint to the corresponding data point
        datapoint.addEventListener("focus", function (event) {
            event.stopPropagation();
            _this.last_focus = datapoint;
            _this.datapoint_focus = Object.assign({}, index);
            _this.selected_list_position[index.chart][index.dataset] =
                index.list_position;
            _this.selected_datapoint[index.chart][index.dataset] = index.datapoint;
        });
        datapoint.addEventListener("focusin", function (event) {
            event.stopPropagation();
            _this.setSVGHighlighting(svg_element, true);
        });
        svg_element.setAttribute("pointer-events", "bounding-box");
        svg_element.addEventListener("mousedown", function (event) {
            event.preventDefault();
            event.stopPropagation();
            // Have to uncollapse node of data points,
            // which are collapsed if there are multiple data series
            _this.svg_document.setAttribute("open", "true");
            _this.charts[index.chart].setAttribute("open", "true");
            var details = datapoint
                .parentNode.parentNode.parentNode;
            details.setAttribute("open", "true");
            datapoint.focus();
        });
        // On right-click or context-menu key on a data list item, open the
        // context menu for the corresponding data point
        datapoint.addEventListener("contextmenu", function (event) {
            if ((_this.menu) && (!_this.menu.is_open)) {
                event.stopImmediatePropagation();
                event.preventDefault();
                _this.last_focus = datapoint;
                _this.datapoint_focus = Object.assign({}, index);
                setTimeout(function () {
                    _this.menu.open(datapoint);
                }, 0);
            }
        });
    };
    // ---
    // Description: Removes the current data list view of the specified data series
    //              and appends a new data list view according to the specified
    //              sorting mode.
    // index: The Indices of the data series to sort.
    // sorting_string: Specifies the sorting mode as "NONE", "UPWARDS", or "DOWNWARDS"
    //                 (according to the enum Sorting).
    // ---
    UserInterface.prototype.sortDatapoints = function (index, sorting_string) {
        var sorting = interfaces_1.Sorting[sorting_string];
        // Avoid crash due to uninitialised variables or invalid sorting specifier:
        if ((!this.datasets[index.chart]) || (!this.datasets[index.chart][index.dataset])
            || (!this.datapoints[index.chart])
            || (sorting < interfaces_1.Sorting.DOWNWARDS) || (sorting > interfaces_1.Sorting.UPWARDS)) {
            return;
        }
        delete this.datapoints[index.chart][index.dataset];
        this.datapoints[index.chart][index.dataset] = [];
        var parent = this.datasets[index.chart][index.dataset].parentElement;
        this.datasets[index.chart][index.dataset].remove();
        this.datasets[index.chart][index.dataset] = helper_1.Helper.appendHTML(parent, html_template_1.HTMLTemplate.DATAPOINT_LIST);
        this.datapoints_sorted[index.chart][index.dataset] = sorting;
        this.achart_interpreter.listDatapoints(index.chart, index.dataset, sorting, this.selected_datapoint[index.chart][index.dataset]);
    };
    UserInterface.prototype.handleToggleHighlightingButton = function (parent) {
        var _this = this;
        var highlighting_container = helper_1.Helper.appendHTML(parent, html_template_1.HTMLTemplate.HIGHLIGHTING_BUTTON);
        this.svg_highlight_option = HighlightingMode.OUTLINE;
        highlighting_container.addEventListener("change", function () {
            _this.svg_highlight_option = (_this.svg_highlight_option === HighlightingMode.MASK) ?
                HighlightingMode.OUTLINE : HighlightingMode.MASK;
            // For read out
            var highlight_string = text_en_1.Text.HIGHLIGHTING_MASK;
            if (_this.svg_highlight_option == HighlightingMode.OUTLINE) {
                highlight_string = text_en_1.Text.HIGHLIGHTING_OUTLINE;
            }
            _this.speech.speak(text_en_1.Text.HIGHLIGHTING_CHANGED + highlight_string);
            // Fix for when statistics is open, which leaves old highlighting visible
            // unless the data point is clicked on again
            if (document.getElementById("achart_reader_dialog_title")) {
                var highlighted_datapoint = void 0;
                if (highlighted_datapoint = document.getElementById("SVG_highlight")) {
                    highlighted_datapoint.classList.remove(HighlightingMode.MASK);
                    highlighted_datapoint.classList.remove(HighlightingMode.OUTLINE);
                }
            }
        });
        highlighting_container.addEventListener("focusout", function () {
            highlighting_container.className = "";
        });
        return highlighting_container;
    };
    // ---
    // Description: Appends a button with event listener calling the method this.close()
    //              to the specified window and returns the DOM element.
    // parent: The DOM element the button shall be appended to.
    // ---
    UserInterface.prototype.addCloseButton = function (parent) {
        var _this = this;
        var close_button = helper_1.Helper.appendHTML(parent, html_template_1.HTMLTemplate.CLOSE_BUTTON);
        close_button.addEventListener("click", function () {
            _this.close();
        });
        return close_button;
    };
    // ---
    // Description: Closes a dialogue window, if open, otherwise the main app window.
    // ---
    UserInterface.prototype.close = function () {
        if (this.details) {
            this.details.parentElement.remove();
            this.details = null;
            this.last_focus.focus();
            this.first_element = this.title;
            this.last_element = this.close_button;
        }
    };
    // ---
    // Description: Add highlight pattern defs to svg
    // ---
    UserInterface.prototype.setHighlightPattern = function (element) {
        var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        var pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
        var pattern_rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        var mask = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
        var mask_rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        pattern.setAttribute("width", "4");
        pattern.setAttribute("height", "4");
        pattern.setAttribute("patternUnits", "userSpaceOnUse");
        pattern.setAttribute("patternTransform", "rotate(135)");
        pattern.setAttribute("height", "4");
        pattern.setAttribute("height", "4");
        pattern.id = "pattern-stripe";
        pattern_rect.setAttribute("width", "2");
        pattern_rect.setAttribute("height", "4");
        pattern_rect.setAttribute("transform", "translate(0,0)");
        pattern_rect.setAttribute("fill", "white");
        mask.id = "mask-stripe";
        mask_rect.setAttribute("x", "0");
        mask_rect.setAttribute("y", "0");
        mask_rect.setAttribute("width", "100%");
        mask_rect.setAttribute("height", "100%");
        mask_rect.setAttribute("fill", "url(#pattern-stripe)");
        pattern.appendChild(pattern_rect);
        defs.appendChild(pattern);
        mask.appendChild(mask_rect);
        defs.appendChild(mask);
        element.appendChild(defs);
    };
    // ---
    // Description: Stops Highlighting previously highlighted SVG element,
    //              Highlights the specified SVG element with a focus box
    //              and sets this.current_svg to the highlighted element.
    // element: The graphics element to highlight.
    // datapoint: Set different svg highlighting for datapoints
    // ---
    UserInterface.prototype.setSVGHighlighting = function (element, datapoint) {
        if (this.previous_svg) {
            this.removeSVGHighlighting();
        }
        this.previous_svg_id = element.id;
        this.updateSVGElementClass(element, true, datapoint);
        this.previous_svg = element;
    };
    // ---
    // Description: Removes the focus box from the SVG element to which 
    //              this.previous_svg points.
    // ---
    UserInterface.prototype.removeSVGHighlighting = function () {
        if (this.previous_svg) {
            this.updateSVGElementClass(this.previous_svg, false, false);
            this.previous_svg = null;
            this.previous_svg_id = "";
        }
    };
    // ---
    // Description: Changes the class attribute of a given SVGElement depending on highlight
    //              highlight = true to highlight SVG element.
    // ---
    UserInterface.prototype.updateSVGElementClass = function (element, highlight, datapoint) {
        var highlight_id = "text_highlight";
        if (datapoint) {
            highlight_id = "SVG_highlight";
        }
        // Set the SVG ID to one that would highlight the element
        var new_id = highlight ? highlight_id : this.previous_svg_id;
        // TODO
        //element.id = new_id;
        if (highlight) {
            element.classList.add((datapoint) ? this.svg_highlight_option : HighlightingMode.OUTLINE);
        }
        else {
            element.classList.remove(HighlightingMode.MASK);
            element.classList.remove(HighlightingMode.OUTLINE);
        }
    };
    // ---
    // Description: Gets the corresponding datapoints list HTML element based 
    //              on an SVG element
    // svg_element: The SVG element in question
    // ---
    UserInterface.prototype.getDataPointBasedOnSVGElement = function (svg_element) {
        for (var i = 0; i < this.datapoints.length; i++) {
            for (var j = 0; j < this.datapoints[i].length; j++) {
                for (var k = 0; k < this.datapoints[i][j].length; k++) {
                    if (this.datapoints_svg[i][j][k] == svg_element) {
                        return this.datapoints[i][j][k];
                    }
                }
            }
        }
        return;
    };
    // ---
    // Description: Unload SVG and all its information.
    // ---
    UserInterface.prototype.removeSvg = function () {
        if (!this.graphic_panel.content.svg) {
            return;
        }
        // Re-enable placeholder text
        this.placeholder_text.style.removeProperty("visibility");
        this.graphic_panel.content.svg.remove();
        this.graphic_panel.content.container.setAttribute("hidden", "true");
        this.graphic_panel.title.textContent = text_en_1.Text.GRAPHIC_PANEL;
        this.svg_document.remove();
        this.title.removeEventListener("keydown", this.after_gap_listener);
        this.graphic_panel.content.highlighting_container.childNodes[5].removeEventListener("keydown", this.before_gap_listener);
        UserInterface.is_open = false;
        // Also remove separately added option buttons from header menu
        /*let option_buttons = Array.from(document.getElementsByClassName("header_item_button"));
        if (option_buttons.length > 3)
        {
          option_buttons = option_buttons.slice(-3);
          for (let option_button of option_buttons)
          {
            option_button.remove();
          }
        }*/
    };
    UserInterface.prototype.stopPropagationOfKeys = function (element) {
        element.addEventListener("keydown", function (event) {
            var key = "";
            if (event.key) {
                key = event.key.toLowerCase();
            }
            switch (key) {
                case "arrowup":
                case "arrowdown":
                case "arrowleft":
                case "arrowright":
                case "home":
                case "end":
                case "pageup":
                case "pagedown":
                case "enter":
                case "escape":
                    event.stopPropagation();
                    break;
                default:
            }
        });
    };
    UserInterface.prototype.closeTabCircle = function (after_gap, before_gap, update_global_listeners) {
        if (update_global_listeners === void 0) { update_global_listeners = false; }
        var after_gap_listener = function (event) {
            if ((event.key) && (event.key.toLowerCase() === "tab") && (event.shiftKey)
                && (!event.ctrlKey) && (!event.altKey) && (!event.metaKey)) {
                event.preventDefault();
                before_gap.focus();
            }
        };
        after_gap.addEventListener("keydown", after_gap_listener);
        var before_gap_listener = function (event) {
            if ((event.key) && (event.key.toLowerCase() === "tab") && (!event.shiftKey)
                && (!event.ctrlKey) && (!event.altKey) && (!event.metaKey)) {
                event.preventDefault();
                after_gap.focus();
            }
        };
        before_gap.addEventListener("keydown", before_gap_listener);
        if (update_global_listeners) {
            this.after_gap_listener = after_gap_listener;
            this.before_gap_listener = before_gap_listener;
        }
    };
    // Indicates if an SVG file is open:
    UserInterface.is_open = false;
    return UserInterface;
}());
exports.UserInterface = UserInterface;


/***/ })

/******/ });
//# sourceMappingURL=achart-interpreter.js.map