"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AChartSummariser = exports.Console = exports.document = void 0;
var file_helper_1 = require("./file-helper");
var svg_document_1 = require("../common/svg-document");
var message_1 = require("../common/message");
var text_en_1 = require("../common/text.en");
var JSDOM = require("jsdom").JSDOM;
exports.document = (new JSDOM("<!DOCTYPE html><html><body></body></html>")).window.document;
exports.Console = console.Console;
// Main Class
var AChartSummariser = /** @class */ (function () {
    // ---
    // Description: Initialises the app
    // ---
    function AChartSummariser() {
        // Programme version:
        this.VERSION = "1.0.0";
        // Markdown characters for text output:
        this.LI_MARKER = "- ";
        this.H1_MARKER = "# ";
        this.H2_MARKER = "## ";
        // Command-line arguments:
        this.input_file = "";
        this.output_file = "";
        this.show_statistics = false;
        this.show_datapoints = false;
        // Make sure all output is encoded in UTF-8:
        process.stdout.setEncoding("utf8");
        process.stderr.setEncoding("utf8");
        // Display programme title and version:
        console.info(text_en_1.Text.ACHART_SUMMARISER_TITLE + " " + text_en_1.Text.VERSION + " " + this.VERSION + " \n");
        // Get command-line arguments;
        // exit in case of syntax errors, "--help", or "--version" option:
        this.parseCommandLine();
        // Open and read the specified SVG file, then call this.processSVG():
        file_helper_1.FileHelper.loadFile(this);
    }
    // ---
    // Description: Analyses the given SVG and outputs its information.
    // svg_root: The root <svg> element of the graphic to analyse.
    // ---
    AChartSummariser.prototype.processSVG = function (svg_root) {
        // Show message if output is written to file:
        console.info((this.output_file) ?
            text_en_1.Text.WRITING_TO + this.output_file : "\n");
        // Set this.output to an output text file, if specified by the user,
        // otherwise to stdout:
        file_helper_1.FileHelper.openOutput(this);
        // Main heading:
        this.output.info(this.H1_MARKER + text_en_1.Text.ACHART_SUMMARY +
            this.input_file + "\n\n");
        // Parse the SVG, extract chart data etc.:
        this.svg_document = new svg_document_1.SVGDocument(svg_root);
        // Summary for the graphics document:
        this.output.info(this.LI_MARKER + message_1.Message.getSvgSummary(this.svg_document.titles[0], this.svg_document.chart_type_counts));
        // 1st indentation level (for SVG document):
        this.output.group();
        // Show content of <desc> element, if available:
        if (this.svg_document.descriptions[0]) {
            this.output.info("\n" + this.svg_document.descriptions[0]);
        }
        // If the graphic contains no charts, show other possible <desc> elements:
        if (this.svg_document.charts_count === 0) {
            var descriptions = message_1.Message.getFurtherSvgDescriptions(this.svg_document.titles, this.svg_document.descriptions);
            for (var index = 0; index < descriptions.length; index++) {
                this.output.info(descriptions[index]);
            }
        }
        this.output.info("");
        // Iterate over all known chart types incl. "unknown"
        for (var chart_type in this.svg_document.charts) {
            // Display all charts of this type
            for (var charts_index = 0; charts_index < this.svg_document.charts[chart_type].length; charts_index++) {
                var chart = this.svg_document.charts[chart_type][charts_index];
                // Display the chart summary:
                this.output.info(this.LI_MARKER + message_1.Message.getChartSummary(chart.type, chart.title, chart.datasets.length, true, charts_index));
                // 2nd indentation level (for chart):
                this.output.group();
                // If x-axis is present, consider it as names scale, otherwise
                // a possible legend:
                var names_scale = (chart.axes.x) ? chart.axes.x :
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
                // Display the chart description:
                this.output.info("\n" + message_1.Message.getChartDescription(chart.type, values_scale_title, names_scale_data) + "\n");
                // Show x-axis first:
                if (chart.axes.x) {
                    this.output.info(this.LI_MARKER + message_1.Message.getAxisDescription("x", chart.axes.x.title, chart.axes.x.type, chart.axes.x.labels.length, chart.axes.x.min, chart.axes.x.max));
                }
                // Show y-axis second:
                if (chart.axes.y) {
                    this.output.info(this.LI_MARKER + message_1.Message.getAxisDescription("y", chart.axes.y.title, chart.axes.y.type, chart.axes.y.labels.length, chart.axes.y.min, chart.axes.y.max));
                }
                // Last, show all other possible axes:
                for (var axis_index in chart.axes.others) {
                    var axis = chart.axes.others[axis_index];
                    if (axis) {
                        this.output.info(this.LI_MARKER + message_1.Message.getAxisDescription(axis.variable, axis.title, axis.type, axis.labels.length, axis.min, axis.max));
                    }
                }
                // Show all legends:
                for (var legend_index in chart.legends) {
                    var legend = chart.legends[legend_index];
                    if (legend) {
                        this.output.info(this.LI_MARKER +
                            message_1.Message.getLegendDescription(legend.title, legend.labels.length, legend.min, legend.max));
                    }
                }
                this.output.info("");
                // Display all data series of the chart
                for (var datasets_index = 0; datasets_index < chart.datasets.length; datasets_index++) {
                    var dataset = chart.datasets[datasets_index];
                    this.output.info(this.LI_MARKER + message_1.Message.getDatasetSummary(dataset.title, dataset.datapoints.length, (chart.datasets.length !== 1), datasets_index));
                    // Display statistics for this data series, if requested
                    if (this.show_statistics) {
                        var statistics_list = message_1.Message.getStatisticsList(datasets_index, dataset.getStatistics());
                        // 3rd indentation level (for data series):
                        this.output.group();
                        // Heading for statistics:
                        this.output.info("\n" + this.H2_MARKER + statistics_list.title);
                        // Show all the statistical values:
                        for (var _i = 0, _a = statistics_list.items; _i < _a.length; _i++) {
                            var item = _a[_i];
                            this.output.info(this.LI_MARKER + item);
                        }
                        // Back to 2nd indentation level (for chart):
                        this.output.groupEnd();
                    }
                    // Display all the data points, if requested
                    if (this.show_datapoints) {
                        // 3rd indentation level (for data series):
                        this.output.group();
                        // Heading for data points:
                        this.output.info("\n" + this.H2_MARKER + text_en_1.Text.DATAPOINTS);
                        // Show each data point:
                        var datapoints = dataset.datapoints;
                        for (var _b = 0, datapoints_1 = datapoints; _b < datapoints_1.length; _b++) {
                            var datapoint = datapoints_1[_b];
                            this.output.info(this.LI_MARKER + message_1.Message.getKeyValueItem(datapoint.label_text, datapoint.value_text));
                        }
                        // Back to 2nd indentation level (for chart):
                        this.output.groupEnd();
                    }
                    if (datasets_index < chart.datasets.length - 1) {
                        this.output.info("");
                    }
                }
                this.output.info("");
                this.output.groupEnd();
            }
        }
        this.output.groupEnd();
    };
    AChartSummariser.prototype.parseCommandLine = function () {
        for (var index = 2; index < process.argv.length; index++) {
            switch (process.argv[index].toLowerCase()) {
                case "--input":
                    if ((++index) >= process.argv.length) {
                        this.syntaxError(text_en_1.Text.NO_SVG_FILE);
                    }
                    this.input_file = process.argv[index];
                    break;
                case "--output":
                    if ((++index) >= process.argv.length) {
                        this.syntaxError(text_en_1.Text.NO_OUTPUT_FILE);
                    }
                    this.output_file = process.argv[index];
                    break;
                case "--statistics":
                    this.show_statistics = true;
                    break;
                case "--datapoints":
                    this.show_datapoints = true;
                    break;
                case "--help":
                    console.info(text_en_1.Text.ACHART_SUMMARISER_HELP);
                case "--version":
                    process.exit(0);
                default:
                    if (index === process.argv.length - 1) {
                        this.input_file = process.argv[index];
                    }
                    else {
                        this.syntaxError(text_en_1.Text.INVALID_OPTION + ": " + process.argv[index]);
                    }
            }
        }
    };
    AChartSummariser.prototype.syntaxError = function (message) {
        console.error(text_en_1.Text.ERROR + message + "\n");
        console.info(text_en_1.Text.ACHART_SUMMARISER_HELP);
        process.exit(1);
    };
    return AChartSummariser;
}());
exports.AChartSummariser = AChartSummariser;
