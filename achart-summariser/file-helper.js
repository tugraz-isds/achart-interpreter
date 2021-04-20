"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHelper = void 0;
var text_en_1 = require("../common/text.en");
var achart_summariser_1 = require("./achart-summariser");
var achart_summariser_2 = require("./achart-summariser");
var FS = require('fs');
var FileHelper = /** @class */ (function () {
    function FileHelper() {
    }
    FileHelper.openOutput = function (asummariser) {
        var output = ((asummariser.output_file) ?
            FS.createWriteStream(asummariser.output_file, "utf8") :
            process.stdout);
        asummariser.output = new achart_summariser_2.Console(output);
    };
    FileHelper.loadFile = function (achart_summariser) {
        if (!achart_summariser.input_file) {
            achart_summariser.syntaxError(text_en_1.Text.NO_SVG_FILE);
            /*console.info(Text.DEFAULT_FILE);
            console.info(Text.HELP_OPTION + "\n");
            
            achart_summariser.input_file = (FS.existsSync(achart_summariser.DEFAULT_INPUT_FILE)) ?
                "" : "../";
            achart_summariser.input_file += achart_summariser.DEFAULT_INPUT_FILE;
            */
        }
        FS.readFile(achart_summariser.input_file, "utf8", function (err, data) {
            if (err) {
                console.error(text_en_1.Text.ERROR + text_en_1.Text.CANNOT_OPEN + achart_summariser.input_file);
                process.exit(1);
            }
            var start_index = data.indexOf("<svg");
            if (start_index < 0) {
                console.error(text_en_1.Text.ERROR + text_en_1.Text.NO_SVG + achart_summariser.input_file);
                process.exit(2);
            }
            data = data.substring(start_index);
            var temp_node = achart_summariser_1.document.createElement("div");
            temp_node.innerHTML = data;
            var svg_root = temp_node.firstElementChild;
            achart_summariser_1.document.body.appendChild(temp_node);
            console.info(text_en_1.Text.FILE + achart_summariser.input_file + text_en_1.Text.LOADED);
            achart_summariser.processSVG(svg_root);
        });
    };
    return FileHelper;
}());
exports.FileHelper = FileHelper;
