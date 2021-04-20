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
