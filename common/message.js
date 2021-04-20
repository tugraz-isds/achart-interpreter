"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
var text_en_1 = require("./text.en");
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
