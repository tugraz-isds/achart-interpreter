export class Text
{
  
  
  
  // Strings for AChart Interpreter user Interface
  
  static readonly APP_TITLE = `AChart Interpreter`;
  
  static readonly SAMPLE_CHART = `Sample Chart`;
  static readonly SELECT_SAMPLE_CHART = `Select a sample chart:`;
  static readonly FILE_UPLOAD = `File Upload`;
  
  static readonly ENABLE_SPEECH = `Enable built-in speech`;
  static readonly DISABLE_SPEECH = `Disable built-in speech`;
  static readonly NO_SPEECH = `No built-in speech available`;
  static readonly SPEECH_ENABLED = `Speech enabled!`;
  static readonly SPEECH_DISABLED = `Speech disabled.`;
  
  static readonly SWITCH_TO_APP_MODE = `Switch to Application Mode`;
  static readonly SWITCH_TO_DOCUMENT_MODE = `Switch to Document Mode`;
  
  static readonly HELP = `Help`;
  
  static readonly HAMBURGER_MENU_BUTTON = `Menu`;
  
  static readonly PLACEHOLDER_TEXT = `Select an SVG chart to get started.`;
  
  static readonly REMOVE_SVG = `Remove SVG`;
  
  
  static readonly CONTAINS = `contains`;
  
  static readonly GRAPHIC = `Graphic`;
  
  static readonly GRAPHIC_PANEL = `Graphic Panel`;
  
  static readonly TEXT_PANEL = `Text Panel`;
  
  static readonly EXPANDED = `expanded`;
  static readonly COLLAPSED = `collapsed`;
  
  static readonly CHART = `Chart`;
  static readonly CHARTS = [`charts`, `chart`];
  
  static readonly CHART_TYPE =
  {
    bar: [`bar charts`, `bar chart`, `Bar chart`],
    bargrouped: [`grouped bar charts`, `grouped bar chart`, `Grouped bar chart`],
    line: [`line charts`, `line chart`, `Line chart`],
    pie: [`pie charts`, `pie chart`, `Pie chart`],
    scatter: [`scatter plots`, `scatter plot`, `Scatter plot`],
    other: [`charts of unknown type`, `chart of unknown type`, `Unknown chart`]
  };
  
  static readonly SHOWING = `showing`;
  static readonly SCALE_TITLE_REPLACEMENT = `values`;
  static readonly RELATED_TO = `in relation to`;
  static readonly BETWEEN = `between`;
  static readonly AND = `and`;
  
  static readonly AXIS = `axis`;
  static readonly LEGEND = `Legend`;
  static readonly LABELS = `labels`;
  static readonly CONTINUOUSLY = `continuously`;
  static readonly RANGING = `ranging`;
  static readonly FROM = `from`;
  static readonly TO = `to`;
  
  static readonly DATASET = `Data Set`;
  static readonly DATAGROUP = `Data Group`;
  static readonly DATA = `Data Series`;
  static readonly DATASETS = [`data series`, `data series`];
  static readonly DATAGROUPS = [`data groups`, `data groups`];

  static readonly DATAPOINTS = `Data Points`;
  static readonly ITEMS = [`items`, `item`];
  
  static readonly SORT_LABEL = `Sort items`;
  static readonly SORT_ITEMS =
  {
    NONE: `in original order`,
    UPWARDS: `from lowest to highest value`,
    DOWNWARDS: `from highest to lowest value`
  };
  
  static readonly SHOW_DATASET_STATISTICS = `Show statistics for this data series`;
  static readonly HIGHLIGHTING_TOGGLE = `SVG Highlighting Mode`;
  static readonly HIGHLIGHTING_BY = `SVG highlighting by `;
  static readonly HIGHLIGHTING_CHANGED = `SVG Highlighting Mode changed to `;
  static readonly HIGHLIGHTING_MASK = `Fill`;
  static readonly HIGHLIGHTING_OUTLINE = `Outline`;
  static readonly CLOSE = `Close`;
  
  static readonly STATISTICS_FOR = `Statistics for`;
  
  static readonly FOR = `for`;
  
  static readonly OF = `of`;
  
  static readonly STATISTICS =
  {
    count: `Number of items`,
    min: `Lowest value`,
    max: `Highest value`,
    range: `Range between highest and lowest value`,
    sum: `Sum of all values`,
    mean: `Average`,
    median: `Median`,
    modes: `Modes`
  };
  
  static readonly MENU_ITEM =
  {
    JUMP_TO_BEGINNING:
    {
      text: `Jump to first item`,
      hotkey: `f`
    },
    JUMP_TO_END:
    {
      text: `Jump to last item`,
      hotkey: `l`
    },
    COMPARE_TO_SAME:
    {
      text: `Compare to this data series`,
      hotkey: `c`
    },
    COMPARE_TO_OTHER:
    {
      text: `Compare to other data series`,
      hotkey: `d`
    },
    SHOW_DATAPOINT_STATISTICS:
    {
      text: `Show statistics for this item`,
      hotkey: `s`
    }
  }
  
  
  static readonly COMPARED_TO = `compared to`;
  
  static readonly STATISTICS_COMPARISON =
  {
    value: `Value`,
    index: `Item`
  };
  
  static readonly IN_DATASET = `in this data series`;
  
  static readonly EQUAL = `equal`;
  static readonly HIGHER = `higher`;
  static readonly LOWER = `lower`;
  
  static readonly THAN = `than`;
  
  static readonly THE =
  {
    min: `the lowest value`,
    max: `the highest value`,
    mean: `the average`,
    median: `the median`
  };
  
  static readonly EQUAL_TO =
  {
    min: `the lowest value of this data series`,
    max: `the highest value of this data series`,
    mean: `equal to the average`,
    median: `equal to the median`
  };
  
  static readonly OF_THE =
  {
    sum: `the sum of all values`
  };
  
  static readonly YES =
  {
    is_mode: `a mode of this data series`
  };
  
  static readonly NO =
  {
    is_mode: `no mode of this data series`
  };
  
  
  static readonly HELP_TEXT =
  {
    TITLE: `Help`,
    SECTIONS:
    [
    {
      HEADING: `Welcome to AChart Interpreter!`,
      TEXT: [
        `AChart Interpreter (standing for "Accessible Chart Interpreter") is a screen reader for charts. It gives you a description
        of charts created in SVG format. The chart needs to contain appropriate
        WAI-ARIA markup as generated, e.g., by the tool AChart Creator. If you
        are interested in more details, AChart Interpreter lets you further
        explore a chart by keyboard navigation in combination with either a
        built-in speech synthesis or the screen reader of your choice.`],
    },
    
    {
      HEADING: `Usage`,
      TEXT:
      [
        `To start AChart Interpreter, open the graphic you want to explore.
        You can either choose a sample chart from the drop-down list or
        load an SVG file from your computer using the
        "File Upload" button. After opening an SVG file, it will be displayed
        in the part of the window named "Graphic panel". In the "Text Panel",
        the textual information will be shown.`,
        `To move around within AChart Interpreter's windows, use the Tab key
        or the appropriate cursor of your screen reader (for example, the virtual cursor in JAWS
        or the cursor of the browse mode in NVDA, both controlled by the Arrow keys).
        To close any window, you can use the Esc key
        or the "Close" button at the top of the window.`,
        `In the main window of AChart Interpreter, next to the "File Upload"
        button, you find a button to switch the built-in speech synthesis on and off.
        You can also do this by pressing Alt+S.
        If the speech is enabled, it reads aloud every element when
        focusing it. The speech can be interrupted pressing any key or
        clicking anywhere within AChart Interpreter's window.
        Note that the integrated speech feature depends on your browser
        and the voices installed on your local machine
        and that it is not available in Internet Explorer.`,
        `The next button toggles the list view for the data items to Application Mode and back to Document Mode (<a href="#achart_interpreter_app_mode">see below</a>).`,
        `This help text can be shown again using the "Help" button or the F1 key.`,
        `Underneath these buttons, you will find the "Graphic Panel" and the "Text Panel".
        In the "Graphic Panel", the opened visualisation will be displayed.
        The button "Remove SVG" can be used to close the graphic again.
        The "Text Panel" shows the title and description of the graphic
        as well as a list of all charts and chart components
        contained by it. All chart components can be selected using
        the Tab key. Mouse users can also select any component by a left click
        either on the graphical object or its textual counterpart. The selected
        component will be visually highlighted in both the graphical and the
        textual representation. The style of highlighting for the graphical
        objects can be chosen from two options by the switch "Toggle SVG
        highlighting mode".`,
        `To hide or unveil the information on a particular chart, select its title and close or
        open its details, respectively,
        by pressing Enter or Space or left-click
        on the triangle symbol.
        When the details for a chart have been opened, they are displayed right underneath its title.
        Below, you will find a list of all data series within the chart.
        To hide or unveil the information on a particular data series,
        again, select its title and close/open its details by pressing Enter or Space or left-click
        on the triangle symbol.`,
        `When the details for a data series have been opened, you will find a list of all items
        (that is, all values, all data points) contained in this data series.
        Using the combo box above this list, you can choose if the items are displayed
        either in increasing order ("from lowest to highest value") or in decreasing order
        ("from highest to lowest value"). With the default choice "in original order",
        the items are listed in the same order they appear in the SVG source code,
        that is, in most cases, along the x-axis from left to right.
        To choose a certain sorting option, open the combo box,
        select the option by using the Arrow-Up and Arrow-Down keys
        and then press Enter.`,
        `Once you have reached the list for a data series,
        use the Arrow-Up and Arrow-Down keys to navigate through it.
        If no screen reader is running or Application Mode is activated (<a href="#achart_interpreter_app_mode">see below</a>),
        you can use the following additional navigation keys:
        The HOME key will move the selection to the first item in the list;
        the END key will take you to the last item.
        If there are multiple data series contained in the chart,
        you can quickly move between their data lists using the Arrow-Left and Arrow-Right keys.`,
        `Moving to an item and pressing the Context-Menu key or right-clicking on it,
        a context menu will appear offering several options:
        you can view statistics about the particular item or
        a list of comparisons of this item to all others in the same data series. `
        // a list of comparisons to the selected items in all other data series,
        // or a list of comparisons to the items for the same position (x-value, argument) in all other data series.
        + `Moreover, you can move to the first or the last item within the data list,
        which might be helpful in case of longer data series.`,
        `Pressing Tab within the list for a certain data series will take you to the button underneath this data list.
        Using this button, you can obtain statistics about the whole data series.`
      ]
    },
    {
      HEADING: `Application Mode`,
      TEXT:
      [
        `<div id="achart_interpreter_app_mode">Most screen readers like JAWS and NVDA have their own special keyboard setting for navigating Web pages,
        which might block the functionality of some of AChart Interpreter's navigation keys (like the Home and End keys).
        If you are using a screen reader and would like to benefit from all of AChart Interpreter's key commands,
        switch to Application Mode using the corresponding button at the top of the window or pressing Alt+A.
        When you move to a data list afterwards, your screen reader should enable a special mode
        in which all keystrokes are passed through to AChart Interpreter
        (in JAWS this is also known as Application Mode or Forms Mode,
        in NVDA it is called Focus Mode).
        If your screen reader does not activate this mode automatically,
        try pressing Enter after moving to the data list.
        Note that after switching to Application Mode, the data lists might look different
        and that NVDA may announce them as "Application".</div>`,
        `Using the same button as before or pressing Alt+A again,
        you can switch back to AChart Interpreter's standard mode, called Document Mode.`
      ]
    },
    {
      HEADING: `Known Issues`,
      TEXT:
      [
        `AChart Interpreter does not yet support Internet Explorer at the moment.
        It is recommended to use the current version on Mozilla Firefox.`,
        `On Google Chrome, JAWS might not recognise a context menu correctly after opening it.
        If so, try using AChart Interpreter's Application Mode or enabling automatic forms mode of JAWS.`,
        `When AChart Interpreter is switched to Application Mode,
        JAWS might not announce all elements outside the data lists appropriately.
        If so, try leaving forms mode and enabling the virtual cursor of JAWS manually
        by pressing Numpad + (desktop keyboard) or JAWS+; (laptop keyboard).`
        /*`In some cases, activating an element might not be possible by pressing Enter when using JAWS.
        If so, open the JAWS settings,
        navigate either to "Web / HTML / PDF", "Other Settings"
        or to "Virtual Cursor Settings", "General Settings",
        and change the setting "Link Activation" from "ENTER key simulates mouse click"
        to "ENTER key sends ENTER key".`*/
      ]
    }
    ]
  }
  
  
  
  
  // Strings for AChart Summariser (output to terminal)
  
  static readonly ACHART_SUMMARISER_TITLE = `AChart Summariser`;
  
  static readonly ACHART_SUMMARY = `AChart Summary for file `;
  
  static readonly DEFAULT_FILE = `Opening a default SVG sample file`;
  
  static readonly HELP_OPTION = `Run 'asummarise --help' for details!`;
  
  static readonly ERROR = `ERROR: `;
  
  static readonly INVALID_OPTION = `Invalid option`;
  
  static readonly NO_SVG_FILE = `No SVG filename specified`;
  
  static readonly NO_OUTPUT_FILE = `No output filename specified`;
  
  static readonly FILE = `File `;
  
  static readonly LOADED = ` loaded`;
  
  static readonly CANNOT_OPEN = `Cannot open file `;
  
  static readonly WRITING_TO = `Writing AChart Summary to file `;
  
  static readonly NO_SVG = `No SVG found in file `;
  
  static readonly VERSION = `version`;
  
  static readonly ACHART_SUMMARISER_HELP =
`AChart Summariser -- Outputs a textual summary of an SVG chart.


Command-line syntax:

  asummarise [--output OUTPUT-FILENAME] [--statistics]
             [--datapoints] [--version] [--help]
             [--input] SVG-FILENAME


Mandatory arguments:

    SVG-FILENAME               Specifies the SVG file to analyse. This argument can be
                               given either as the last command-line parameter or,
                               alternatively, at any position prepended by --input.
             
             
Optional arguments:
    
    --output OUTPUT-FILENAME   Writes the output to the specified plain text file.
                               If not specified, output is written to stdout.
    
    --statistics               Additionally outputs statistical information on each data series.
    
    --datapoints               Additionally outputs all the data points in the chart.
    
    --version                  Prints version information and exits.
    
    --help                     Prints this help message and exits.
     
All options are case-insensitive. If an argument contains space
characters, it should be enclosed in quotation marks (""). Filenames
may contain relative or absolute paths. If no path or relative path
is given, the current working directory is assumed.`;
     
}
