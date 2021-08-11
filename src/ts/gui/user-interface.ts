import { AChartInterpreter } from "./achart-interpreter";
import { Speech } from "./speech";
import { ContextMenu } from "./context-menu";
import { Comparison, Sorting, Statistics } from "../common/interfaces";
import { HTMLTemplate } from "./html-template";
import { Text } from "../common/text.en";
import { Helper } from "./helper";



// Interface for denoting the indices of a chart, data set, data series, or data point

export interface DataIndex
{
  chart : number
  dataset? : number
  datagroup? : number
  datapoint? : number
  list_position? : number
}


// SVG highlighting modes

enum HighlightingMode
{
  MASK = "mask_highlight",
  OUTLINE = "outline_highlight"
}



// Class for building and modifying the Web interface (view)

export class UserInterface
{
  
  
  // Threshold time for fast consecutive key presses;
  // needed for stable speech output
  
  readonly FAST_KEY_PRESS_INTERVAL = 400;
  
  
  // Indicates if an SVG file is open:
  static is_open : boolean = false
  
  // App object, controller:
  achart_interpreter : AChartInterpreter
  
  // Indicates if a chart tree node has just been opened or closed:
  node_toggled = false
  
  
  // Elements of the Web interface

  // Top header container for the option buttons
  header_container_buttons : HTMLElement
  
  // Controls for opening a file:
  remote_file_list : HTMLSelectElement
  file_upload_button : HTMLElement

  // Text prompting to choose an SVg file:
  placeholder_text : HTMLElement
  
  // CSS grid container
  grid_container : HTMLElement
  
  graphic_panel =
  {
    container: <HTMLElement>undefined,
    title: <HTMLElement>undefined,
    content:
    {
      container: <HTMLElement>undefined,
      remove_button: <HTMLElement>undefined,
      svg: <Element>undefined,
      // Checkbox for toggling the highlighting mode:
      highlighting_container: <HTMLElement>undefined
    }
  }
  
  
  after_gap_listener : EventListener
  before_gap_listener : EventListener
  
  
  // Text panel:
  text_panel : HTMLElement
  
  // scrollable container for the chart tree:
  container : HTMLElement
  
  // Text panel title:
  title : HTMLElement
  
  // Button for closing the app:
  close_button : HTMLElement
  
  // SVG highlighting mode: outline or mask
  svg_highlight_option : string
  
  // First and last element of the tab order:
  first_element : HTMLElement
  last_element : HTMLElement
  
  // Last focused element within a window right before focus moves to a different window:
  last_focus : HTMLElement = document.body
  
  // Button for toggling the builtin speech synthesis:
  speech_button : HTMLElement
  
  // Elements for representing the graphics and chart details and the data:
  svg_document : HTMLElement
  charts : HTMLElement[]
  axes : HTMLElement[][]
  legends : HTMLElement[][]
  datasets : HTMLElement[][]
  datagroups : HTMLElement[][]
  datapoints : HTMLElement[][][]
  
  // SVG elements of the graphic:
  root_svg : SVGElement
  charts_svg : SVGElement[]
  axes_svg : SVGElement[][]
  legends_svg : SVGElement[][]
  datasets_svg : SVGElement[][]
  datagroups_svg : SVGElement[][]
  datapoints_svg : SVGElement[][][]
  
  // Graphics element currently highlighted:
  current_svg : SVGElement = undefined;
  previous_svg : SVGElement = undefined;
  previous_svg_id : string = "";
  
  // Dialogue windows for comparisons, statistics, and help text:
  details : HTMLElement = undefined
  
  
  // Data point with focus (currently or the last time that focus has
  // been within a list view of a data series):
  datapoint_focus : DataIndex =
  {
    chart: 0,
    dataset: 0,
    list_position: 0,
    datapoint: 0
  }
  
  // Indicates the last selected position for each data list;
  // when the focus moves to the list view of a data series, it is set
  // on this position:
  selected_list_position : number[][]
  
  // Indicates the last selected data point index for each data list:
  selected_datapoint : number[][]
  
  // Indicates the sorting modes currently chosen for the list views of each data series:
  datapoints_sorted : Sorting[][]
  
  // Context menu object:
  menu : ContextMenu
  
  // Speech synthesis object:
  speech : Speech
  
  // Current screen reader interaction mode (no visual impact;
  // default: document mode):
  app_mode = false;
  
  
  // ---
  // Description: Initialises the GUI main window.
  // achart_interpreter: App object (controller).
  // ---
  
  constructor(achart_interpreter : AChartInterpreter)
  {
    this.achart_interpreter = achart_interpreter;
    
    
    
    // Build up the basic structure of the main window
    
    
    // Header menu
    
    this.header_container_buttons = document.getElementById(
        "header_container_buttons");
    
    this.remote_file_list = <HTMLSelectElement>document
        .getElementById("remote_file_list");
    this.remote_file_list.setAttribute("aria-label", Text.SELECT_SAMPLE_CHART);
    this.remote_file_list.firstElementChild.textContent = Text.SAMPLE_CHART;
    this.stopPropagationOfKeys(this.remote_file_list);
    
    this.remote_file_list.addEventListener("change", () =>
    {
      if (this.speech)
      {
        this.speech.speak(this.remote_file_list.value);
      }
    });
    
    this.file_upload_button = document.getElementById("local_file_button_proxy");
    this.file_upload_button.textContent = Text.FILE_UPLOAD;
    
    this.speech_button = Helper.appendHTML(this.header_container_buttons,
        HTMLTemplate.SPEECH_BUTTON);
    
    this.speech_button.addEventListener("click", (event : MouseEvent) =>
    {
      this.speech.toggle();
    });
    
    let app_mode_button = Helper.appendHTML(this.header_container_buttons,
        HTMLTemplate.APP_MODE_BUTTON);
    app_mode_button.addEventListener("click", (event: MouseEvent) =>
    {
      this.toggleAppMode(app_mode_button);
    });
    
    let help_button = Helper.appendHTML(this.header_container_buttons,
        HTMLTemplate.HELP_BUTTON);
    help_button.addEventListener("click", (event: MouseEvent) =>
    {
      this.last_focus = help_button;
      if (!this.details)
      {
        this.showHelp();
      }
      else
      {
        this.close();
      }
    });
    
    this.hamburgerMenu();
    
    
    // Placeholder text:
    this.placeholder_text = document.getElementById("placeholder_text");
    this.placeholder_text.innerHTML = Text.PLACEHOLDER_TEXT + " " +
        this.placeholder_text.innerHTML;
    
    
    this.grid_container = document.getElementById("grid_container");

    
    // Initialise the graphic panel
    
    this.graphic_panel.container = document.getElementById("graphic_panel"),
    this.graphic_panel.title = <HTMLElement>(
        this.graphic_panel.container.firstElementChild);
    this.graphic_panel.title.textContent = Text.GRAPHIC_PANEL;
    
    this.graphic_panel.content.container = Helper.appendHTML(
        this.graphic_panel.container, HTMLTemplate.SCROLLABLE_CONTAINER);

    this.graphic_panel.content.container = Helper.appendHTML(
      this.graphic_panel.content.container, HTMLTemplate.GRAPHIC_PANEL_CONTENT);
    
    // Button for removing an SVG document from the page:
    this.graphic_panel.content.remove_button = Helper.appendHTML(
        this.graphic_panel.content.container, HTMLTemplate.REMOVE_SVG_BUTTON);
    this.graphic_panel.content.remove_button.addEventListener("click", () =>
    {
      this.removeSvg();
    });
    
    // Highlighting mode button:
    this.graphic_panel.content.highlighting_container =
        this.handleToggleHighlightingButton(
        this.graphic_panel.content.container);
    
    
    // Initialise the text panel
    
    this.text_panel = document.getElementById("text_panel");
    this.title = <HTMLElement>this.text_panel.firstElementChild;
    this.title.textContent = Text.TEXT_PANEL;
    this.first_element = this.title;
    
    this.container = Helper.appendHTML(this.text_panel, HTMLTemplate.SCROLLABLE_CONTAINER);
    
    
    // Create speech synthesis object:
    this.speech = new Speech("en-US", this.speech_button);
    
    let last_key_press = Date.now(), fast_key_presses = 1, timeout_id;
    document.addEventListener("keydown", () =>
    {
      if (this.speech)
      {
        this.speech.stop();
        last_key_press = Date.now();
      }
      
      if (Date.now() - last_key_press > this.FAST_KEY_PRESS_INTERVAL)
      {
        fast_key_presses = 1;
      }
      else
      {
        fast_key_presses++;
      }
    }, true);
    
    document.addEventListener("mousedown", () =>
    {
      if (this.speech)
      {
        this.speech.stop();
      }
    }, true);
    
    // If the built-in speech is enabled, read every focused element:
    document.body.addEventListener("focusin", (event : FocusEvent) =>
    {
      if ( (fast_key_presses < 2) && ((<HTMLElement>event.target).tagName !== "summary") )
      {
        this.speech.readElement(<HTMLElement>event.target, this.node_toggled);
      }
      else
      {
        if (fast_key_presses > 2)
        {
          clearTimeout(timeout_id);
        }
        
        timeout_id = setTimeout( () =>
        {
          this.speech.readElement(<HTMLElement>document.activeElement);
          fast_key_presses = 0;
        }, this.FAST_KEY_PRESS_INTERVAL);
      }
      
      // Extra handling for highlighting mode toggle button
      // As the inner element is focused when tabbing, but the 
      // outer element should get the outline
      if ((<HTMLElement>event.target).id == "highlighting_button")
      {
        let checkbox = (<HTMLElement>event.target);
        let parent_container = checkbox.parentElement.parentElement;
        // assert (parent_container.id == "highlighting");
        parent_container.classList.add('outline_highlight', 'outlinewidth');
      }

      if (!this.details)
      {
        this.removeSVGHighlighting();
        this.previous_svg = null;
      }
    }, true);
    
    
    // Handle key commands for the main window
    
    document.addEventListener("keydown", (event : KeyboardEvent) =>
    {
      event.stopPropagation();
      
      let key : string = "";
      
      if (event.key)
      {
        key = event.key.toLowerCase();
      }
      
      switch (key)
      {
        
        case "escape":
          // Ignore if modifyer key(s) is/are pressed:
          if ((event.shiftKey) || (event.altKey) || (event.ctrlKey) || (event.metaKey) )
          {
            return;
          }
          
          event.preventDefault();
          
          // Close either the context menu if it is open or otherwise
          // any current details window:
          if ( (this.menu) && (this.menu.is_open) )
          {
            this.menu.close();
            this.last_focus.focus();
          }
          else
          {
            this.close();
          }
          break;
          
        case "s":
          // Alt+S:
          if ( (event.altKey) && !((event.ctrlKey) || (event.shiftKey) || (event.metaKey)) )
          {
            event.preventDefault();
            this.speech.toggle();
          }
          break;
          
        case "f1":
          // Ignore if modifyer key(s) is/are pressed:
          if ((event.shiftKey) || (event.altKey) || (event.ctrlKey) || (event.metaKey) )
          {
            return;
          }
          
          event.preventDefault();
          if (this.details)
          {
            return;
          }
          this.last_focus = <HTMLElement>document.activeElement;
          this.showHelp();
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
          if ( (event.altKey) && !((event.ctrlKey) || (event.shiftKey) || (event.metaKey)) )
          {
            event.preventDefault();
            this.toggleAppMode(app_mode_button);
          }
          break;
          
        default:
          
      }
    });
    
    
    // Initialise the context menu for data points
    
    this.menu = new ContextMenu(this);
    
    this.menu.addItem("JUMP_TO_BEGINNING", () =>
    {
      this.jumpToBeginning();
    });
    
    this.menu.addItem("JUMP_TO_END", () =>
    {
      this.jumpToEnd();
    });
    
    this.menu.addItem("COMPARE_TO_SAME", () =>
    {
      this.achart_interpreter.compareToRestOfDataset(this.datapoint_focus,
          this.datapoints_sorted[this.datapoint_focus.chart]
          [this.datapoint_focus.dataset]);
    });
    
    this.menu.addItem("SHOW_DATAPOINT_STATISTICS", () =>
    {
      this.achart_interpreter.compareToStatistics(this.datapoint_focus,
          this.datapoints_sorted[this.datapoint_focus.chart]
          [this.datapoint_focus.dataset]);
    });
    
    
    // If the menu is open, close it when clicking anywhere within the
    // Web document
    
    document.addEventListener("click", () =>
    {
      //event.stopImmediatePropagation();
      
      if ( (this.menu) && (this.menu.is_open) )
      {
        //event.stopImmediatePropagation();
        //event.preventDefault();
        this.menu.close();
      }
    });
    
    
  }
  
  
  // ---
  // Description: Fades in and out the about text accordion style when
  //              about button is pressed.
  // ---
  
  fadeInAboutTextOnClick() : void
  {
    let about_button = document.getElementById("about_button");
    let about_text = document.getElementById("about_text");
    
    about_button.addEventListener("click", function()
    {
      this.classList.toggle("active");
      if (about_text.style.maxHeight)
      {
        about_text.style.maxHeight = null;
        about_text.setAttribute("aria-hidden", "true");
      }
      else
      {
        about_text.style.maxHeight = about_text.scrollHeight + "px";
        about_text.setAttribute("aria-hidden", "false");
      }
    });
    
    // Initialise last_focus with the first element of the window:
    this.last_focus = about_button;
  }


  // ---
  // Description: Toggle header menu buttons style on media query
  // ---
  
  toggleHeaderMenuButtons(x) : void
  {
    // If media query matches:
    if (x.matches)
    {
      this.header_container_buttons.classList.remove("show");
      this.header_container_buttons.classList.add("hide");
    }
    else
    {
      this.header_container_buttons.classList.remove("hide");
      this.header_container_buttons.classList.add("show");
    }
  }
  
  
  // ---
  // Description: Handle the header menu and its hamburger button
  // ---
  
  hamburgerMenu() : void
  {
    let hamburger_menu_button = document.getElementById("hamburger_menu_button");
    
    hamburger_menu_button.setAttribute("aria-label", Text.HAMBURGER_MENU_BUTTON);
    
    hamburger_menu_button.addEventListener("click", () =>
    {
      if (this.header_container_buttons.classList.contains("show"))
      {
        this.header_container_buttons.classList.remove("show");
        this.header_container_buttons.classList.add("hide");
      }
      else
      {
        this.header_container_buttons.classList.remove("hide");
        this.header_container_buttons.classList.add("show");
      }

    });

    let x = window.matchMedia("(max-width: 43em)");
    this.toggleHeaderMenuButtons(x);
    x.addListener(this.toggleHeaderMenuButtons);
  }
  
  
  // ---
  // Description: Initialises the graphic panel  of the app
  //              with the loaded SVG document.
  // ---
  
  insertSvg(svg_content : string, filename : string) : SVGElement
  {
    
    this.removeSvg();
    
    this.placeholder_text.style.visibility = "hidden";
    
    
    // Build up the graphic panel
    
    this.graphic_panel.content.svg = <Element>Helper.appendHTML(
        this.graphic_panel.content.container, svg_content);
    
    this.graphic_panel.content.svg.setAttribute("aria-hidden", "true");
    this.graphic_panel.content.svg.addEventListener("mousedown", (event : MouseEvent) =>
    {
      event.preventDefault();
      event.stopPropagation();
      (<HTMLElement>this.svg_document.firstElementChild).focus();
    });
    
    this.graphic_panel.title.textContent = Text.GRAPHIC_PANEL + ": " + filename;
    
    this.closeTabCircle(this.title, <HTMLElement>this.graphic_panel.content.highlighting_container.childNodes[5], true);
    
    this.graphic_panel.content.container.removeAttribute("hidden");
    
    this.root_svg = <SVGElement>this.graphic_panel.content.svg;
    
    UserInterface.is_open = true;
    
    return this.root_svg;
  }
  
  
  // ---
  // Description: Initialises the text panel  of the app
  //              with the basic data of the analysed SVG document.
  // charts: Number of charts contained in the SVG.
  // svg_summary: SVG title and number of charts.
  // svg_description (optional): Description for the entire SVG provided
  //                             by the author or charting library.
  // ---
  
  initTextPanel(svg_summary : string, charts : number,
      svg_description? : string) : void
  {
    this.svg_document = this.createNode(this.container, this.root_svg, false,
        svg_summary, svg_description);
    
    this.svg_document.classList.add("text_root");
    
    this.setHighlightPattern(this.root_svg);
    
    // Initialise arrays:
    this.charts = new Array<HTMLElement>(charts);
    this.axes = new Array<HTMLElement[]>(charts);
    this.legends = new Array<HTMLElement[]>(charts);
    this.datasets = new Array<HTMLElement[]>(charts);
    this.datagroups = new Array<HTMLElement[]>(charts);
    this.datapoints_sorted = new Array<Sorting[]>(charts);
    this.datapoints = new Array<HTMLElement[][]>(charts);
    this.charts_svg = new Array<SVGElement>(charts);
    this.axes_svg = new Array<SVGElement[]>(charts);
    this.legends_svg = new Array<SVGElement[]>(charts);
    this.datasets_svg = new Array<SVGElement[]>(charts);
    this.datagroups_svg = new Array<SVGElement[]>(charts);
    this.datapoints_svg = new Array<SVGElement[][]>(charts);
    this.selected_list_position = new Array<number[]>(charts);
    this.selected_datapoint = new Array<number[]>(charts);
    
    
    (<HTMLElement>this.svg_document.firstElementChild).focus();
    
  }
  
  
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
  
  createNode(parent : HTMLElement, svg_element : SVGElement, one_of_multiple : boolean,
      summary : string, description? : string) : HTMLElement
  {
    let node = Helper.appendHTML(parent, HTMLTemplate.NODE);
    node.firstElementChild.firstElementChild.textContent = `${summary}`;
    
    node.firstElementChild.firstElementChild.addEventListener("click", (event : UIEvent) =>
    {
      event.preventDefault();
    });
    
    if (description)
    {
      let description_node = Helper.appendHTML(node, HTMLTemplate.TEXT);
      description_node.textContent = description;
    }
    
    node.addEventListener("focusin", (event : FocusEvent) =>
    {
      event.stopPropagation();
      this.setSVGHighlighting(svg_element, false);
    });
    
    node.firstElementChild.addEventListener("mousedown", (event) =>
    {
      this.node_toggled = (event.target === node.firstElementChild);
    });
    
    node.firstElementChild.addEventListener("click", (event) =>
    {
      this.node_toggled = (event.target === node.firstElementChild);
    });
    
    node.addEventListener("toggle", () =>
    {
      if ( (this.speech) && (this.node_toggled) )
      {
        this.speech.speak(
            (node.getAttribute("open") !== null) ? Text.EXPANDED : Text.COLLAPSED);
this.node_toggled = false;
            }
    });
    
    return node;
  }
  
  
  // ---
  // Description: Adds the representation of a chart to the web interface.
  // index: Index of the chart to be added.
  // one_of_multiple: Indicates whether there are multiple charts;
  //                  if so, the <details> element is left closed, otherwise it is expanded.
  // summary: Text indicating index, title, and the number of contained
  //          data series of the chart.
  // description (optional): Denotes the chart type and content.
  // ---
  
  addChart(index : number, root : SVGElement, one_of_multiple : boolean,
      datasets : number, datagroups : number, 
      summary : string, description? : string) : void
  {
    // Avoid crash due to variables not initialised:
    if ( (!this.svg_document) || (!this.charts) || (this.charts.length <= index) )
    {
      return;
    }
    
    this.charts_svg[index] = root;
    this.charts[index] = this.createNode(this.svg_document, root, one_of_multiple,
        summary, description);
    
    root.setAttribute("pointer-events", "bounding-box");
    root.addEventListener("mousedown", (event : MouseEvent) =>
    {
      event.preventDefault();
      event.stopPropagation();
      
      this.svg_document.setAttribute("open", "true");
      (<HTMLElement>this.charts[index].firstElementChild).focus();
    });


    // Initialise arrays:
    this.axes[index] = [];
    this.legends[index] = [];
    this.datasets[index] = new Array(datasets);
    this.datagroups[index] = new Array(datagroups);
    this.datapoints_sorted[index] = new Array(datasets);
    this.datapoints[index] = new Array(datasets);
    this.axes_svg[index] = [];
    this.legends_svg[index] = [];
    this.datasets_svg[index] = new Array(datasets);
    this.datagroups_svg[index] = new Array(datagroups);
    this.datapoints_svg[index] = new Array(datasets);
    this.selected_list_position[index] = new Array(datasets);
    this.selected_datapoint[index] = new Array(datasets);
  }
  
  
  // ---
  // Description: Adds the representation of an axis to the Web interface.
  // index: Index of the chart the axis belongs to.
  // variable: Variable of the axis to be added.
  // description: Denotes the axis title and labels.
  // ---
  
  addAxis(index : number, svg_element : SVGElement, variable : string,
      description : string) : void
  {
    // Avoid crash due to variables not initialised:
    if ( (!this.charts) || (!this.charts[index]) || (!this.axes) || (!this.axes[index]) )
    {
      return;
    }
    this.axes_svg[index][variable] = svg_element;
    this.axes[index][variable] = Helper.appendHTML(this.charts[index],
        HTMLTemplate.TEXT);
    
    this.axes[index][variable].textContent = description;
    
    this.axes[index][variable].addEventListener("focusin", (event : FocusEvent) =>
    {
      event.stopPropagation();
      this.setSVGHighlighting(svg_element, false);
    });

    this.axes_svg[index][variable].setAttribute("pointer-events", "bounding-box");
    this.axes_svg[index][variable].addEventListener("mousedown", (event : MouseEvent) =>
    {
      event.preventDefault();
      event.stopPropagation();
      
      this.svg_document.setAttribute("open", "true");
      this.charts[index].setAttribute("open", "true");
      this.axes[index][variable].focus();
    });
  }
  
  
  // ---
  // Description: Adds the representation of a legend to the web interface.
  // chart_index: Index of the chart the legend belongs to.
  // legend_index: Index of the legend to be added.
  // description: Denotes the legend title and values.
  // ---
  
  addLegend(chart_index : number, legend_index : number, svg_element : SVGElement, description : string) : void
  {
    // Avoid crash due to variables not initialised:
    if ( (!this.charts) || (!this.charts[chart_index])
        || (!this.legends) || (!this.legends[chart_index]) )
    {
      return;
    }
    
    this.legends_svg[chart_index][legend_index] = svg_element;
    this.legends[chart_index][legend_index] = Helper.appendHTML(this.charts[chart_index],
        HTMLTemplate.TEXT);
    
    this.legends[chart_index][legend_index].textContent = description;
    
    this.legends[chart_index][legend_index].addEventListener("focusin", (event : FocusEvent) =>
    {
      event.stopPropagation();
      this.setSVGHighlighting(svg_element, false);
    });

    this.legends_svg[chart_index][legend_index].setAttribute("pointer-events", "bounding-box");
    this.legends_svg[chart_index][legend_index].addEventListener(
        "mousedown", (event : MouseEvent) =>
    {
      event.preventDefault();
      event.stopPropagation();
      
      this.svg_document.setAttribute("open", "true");
      this.charts[chart_index].setAttribute("open", "true");
      this.legends[chart_index][legend_index].focus();
    });
  }
  
  
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
  
  addDataset(chart_index : number, dataset_index : number,
      svg_element : SVGElement, one_of_multiple : boolean,
      datapoints : number, summary : string,
      dataset_type : string="datasets", description? : string) : void
  {
    // Avoid crash due to variables not initialised:
    if ( (!this.charts) || (!this.charts[chart_index]) || (!this[dataset_type])
        || (!this[dataset_type][chart_index]) ||
        (this[dataset_type][chart_index].length <= dataset_index) )
    {
      return;
    }
    
    this[dataset_type + "_svg"][chart_index][dataset_index] = svg_element;
    let dataset = this.createNode(this.charts[chart_index], svg_element,
        one_of_multiple, summary, description);
    this[dataset_type][chart_index][dataset_index] = dataset;
    
    svg_element.setAttribute("pointer-events", "bounding-box");
    svg_element.addEventListener("mousedown", (event : MouseEvent) =>
    {
      event.preventDefault();
      event.stopPropagation();
      
      this.svg_document.setAttribute("open", "true");
      this.charts[chart_index].setAttribute("open", "true");
      (<HTMLElement>dataset.firstElementChild).focus();
    });
    
    // Initialise arrays:
    this.datapoints[chart_index][dataset_index] = [];
    this.datapoints_svg[chart_index][dataset_index] = [];
    this.datapoints_sorted[chart_index][dataset_index] = Sorting.NONE;
    this.selected_list_position[chart_index][dataset_index] = 0;
    this.selected_datapoint[chart_index][dataset_index] = 0;
  }
  
    
  // ---
  // Description: Moves the focus to the first item in the data list view
  //              indicated by this.datapoint_focus;
  //              sets this.datapoint_focus.list_position accordingly.
  // ---
  
  jumpToBeginning() : void
  {
    this.datapoint_focus.list_position = 0;
    
    this.datapoints[this.datapoint_focus.chart][this.datapoint_focus.dataset]
        [this.datapoint_focus.list_position].focus();
  }
  
  
  // ---
  // Description: Moves the focus to the last item in the data list view
  //              indicated by this.datapoint_focus;
  //              sets this.datapoint_focus.list_position accordingly.
  // ---
  
  jumpToEnd() : void
  {
    const datapoints = this.datapoints[this.datapoint_focus.chart]
        [this.datapoint_focus.dataset];
    
    this.datapoint_focus.list_position = datapoints.length - 1;
    
    datapoints[this.datapoint_focus.list_position].focus();
  }
  
  
  // ---
  // Description: Opens a dialogue window and lists the content of "details";
  //              used for showing comparisons and statistics.
  // details.title: The dialogue title.
  // details.items: Content to be listed, e. g., comparisons or statistics.
  // ---
  
  showDetails(details : {title : string, items : {}}) : void
  {
    if (this.details)
    {
      return;
    }
    
    // HTMLTemplate.DIALOG_WINDOW is defined as 2 nested <div> elements,
    // so the child element has to be used for appending the content:
    let dialogue_window = <HTMLElement>Helper.appendHTML(document.body,
        HTMLTemplate.DIALOG_WINDOW).childNodes[1];
    
    let title = Helper.appendHTML(dialogue_window, HTMLTemplate.DIALOG_TITLE);
    title.textContent = details.title;
    this.first_element = title;
    
    this.addCloseButton(dialogue_window);

    let item : HTMLElement;
    for(let statistic in details.items){
      if (statistic !== "null"){
        let description = Helper.appendHTML(dialogue_window, HTMLTemplate.HEADING);
        description.textContent = statistic;
      }

      let list = Helper.appendHTML(dialogue_window, HTMLTemplate.DETAILS_LIST);

      for (let detail = 0; detail < details.items[statistic].length; detail++)
      {
        item = Helper.appendHTML(list, HTMLTemplate.ITEM);
        item.textContent = details.items[statistic][detail];
      }
    }
    this.closeTabCircle(title, item);
    this.details = dialogue_window;
    
    title.focus();
  }
  
  
  // ---
  // Description: Changes the screen reader interaction mode to
  //              "Application Mode" or back to "Document Mode"
  //              by adding or removing the ARIA role "application" to
  //              the container of the data list view
  //              (has no impact on the visual appearance).
  // app_mode_button: The button element used to toggle the mode.
  // ---
  
  toggleAppMode(app_mode_button : HTMLElement) : void
  {
    if (this.app_mode)
    {
      for (let chart in this.datasets)
      {
        for (let dataset in this.datasets[chart])
        {
          (<HTMLElement>this.datasets[chart][dataset].parentNode).removeAttribute("role");
        }
      }

      // for (let chart in this.datagroups)
      // {
      //   for (let dataset in this.datagroups[chart])
      //   {
      //     (<HTMLElement>this.datagroups[chart][dataset].parentNode).removeAttribute("role");
      //   }
      // }
      
      app_mode_button.textContent = Text.SWITCH_TO_APP_MODE + " (Alt+A)";
      this.app_mode = false;
    }
    else
    {
      for (let chart in this.datasets)
      {
        for (let dataset in this.datasets[chart])
        {
          (<HTMLElement>this.datasets[chart][dataset].parentNode)
              .setAttribute("role", "application");
        }
      }

      // for (let chart in this.datagroups)
      // {
      //   for (let dataset in this.datagroups[chart])
      //   {
      //     (<HTMLElement>this.datagroups[chart][dataset].parentNode)
      //         .setAttribute("role", "application");
      //   }
      // }
      
      app_mode_button.textContent = Text.SWITCH_TO_DOCUMENT_MODE + " (Alt+A)";
      this.app_mode = true;
    }
    
  }
  
  
  // ---
  // Description: Opens a dialogue window and displays the help texts.
  // ---
  
  showHelp() : void
  {
    if (this.details)
    {
      return;
    }
    
    // HTMLTemplate.DIALOG_WINDOW is defined as 2 nested <div> elements,
    // so the child element has to be used for appending the content:
    let dialogue_window = <HTMLElement>Helper.appendHTML(document.body,
        HTMLTemplate.DIALOG_WINDOW).childNodes[1];
    
    let title = Helper.appendHTML(dialogue_window, HTMLTemplate.DIALOG_TITLE);
    title.textContent = Text.APP_TITLE + " - " + Text.HELP_TEXT.TITLE;
    this.first_element = title;
    
    this.addCloseButton(dialogue_window);
    
    let container = Helper.appendHTML(dialogue_window, HTMLTemplate.SCROLLABLE_CONTAINER);
    
    // Append all sections of the help text:
    let element : HTMLElement;
    for (let section of Text.HELP_TEXT.SECTIONS)
    {
      element = Helper.appendHTML(container, HTMLTemplate.HEADING);
      element.textContent = section.HEADING;
      
      // Append every paragraph of the section:
      for (let paragraph of section.TEXT)
      {
        element = Helper.appendHTML(container, HTMLTemplate.PARAGRAPH);
        element.innerHTML = paragraph;
      }
    }
    
    this.details = dialogue_window;
    
    this.closeTabCircle(title, element);
    
    title.focus();
  }
  
  
  // ---
  // Description: Prepares the list view incl. event listeners for the specified data series.
  // index: Indices of the data series whose list view is to prepare.
  // ---
  
  initDataList(chart_index : number, dataset_index : number, title : string,
      dataset_type : string="datasets") : void
  {

    var dataset_type_button = HTMLTemplate.STATISTICS_BUTTON;
    if (dataset_type === "datagroups") {
      dataset_type_button = HTMLTemplate.DATAGROUP_STATISTICS_BUTTON;
    }
    
    // Create an object for the indices of the data series:
    let index : DataIndex =
    {
      chart: chart_index,
      dataset: dataset_index
    };
    
    // Add the combo box for choosing the sorting mode
    
    // HTMLTemplate.SORT_BOX is a label with the actual combo box as child
    // element, so the child element has to be used for adding the options
    // and event listeners:
    let sort = <HTMLSelectElement>Helper.appendHTML(
        this[dataset_type][index.chart][index.dataset], HTMLTemplate.SORT_BOX)
        .childNodes[1];
    
    // If speech is enabled, read every selected option element:
    sort.addEventListener("change", () =>
    {
      this.speech.speak(Text.SORT_ITEMS[sort.value]);
    });
    
    // On click, pressing Enter, or Space, apply the selected sorting mode:
    Helper.addActivationListener(sort, (event : UIEvent) =>
    {
      this.sortDatapoints(index, sort.value, dataset_type);
    });
    
    // Just in order to make possible leaving by ESC key in Chrome:
    this.stopPropagationOfKeys(sort);
    
    // Add the list view for the data series
    
    // This container remains when the list view is rebuilt for sorting:
    let data_container = Helper.appendHTML(
        this[dataset_type][index.chart][index.dataset],
        HTMLTemplate.LIST_CONTAINER);
    if (title)
    {
      data_container.setAttribute("aria-label", title);
    }
    
    // The actual list; removed and appended anew when the sorting mode is changed:
    let data_list = Helper.appendHTML(data_container,
        HTMLTemplate.DATAPOINT_LIST);
    
    let statistics_button = Helper.appendHTML(
        this[dataset_type][index.chart][index.dataset], dataset_type_button);
    statistics_button.addEventListener("click", (event : MouseEvent) =>
    {
      this.last_focus = statistics_button;
      this.achart_interpreter.showDatasetStatistics(index, title, dataset_type);
    });

    // Now that the skeleton of the data series representation is created,
    // assign the data list itself to the data series variable so that it
    // can be used for adding data points:
    this[dataset_type][index.chart][index.dataset] = data_list;
    
    
    // Keyboard navigation within a data list view
    
    data_container.addEventListener("keydown", (event : KeyboardEvent) =>
    {
      
      let key = "";
      if (event.key)
      {
        key = event.key.toLowerCase();
      }
      
      switch (key)
      {
        
        case "arrowup":
          // Move focus to the previous item in the data list view
          
          // If the focus is not on the first item, decrement the index
          // and set the focus on the corresponding data point element:
          if (this.datapoint_focus.list_position !== 0)
          {
            this.datapoints[index.chart][index.dataset]
                [--this.datapoint_focus.list_position].focus();
          }
          break;
          
        case "arrowdown":
          // Move focus to the next item in the data list view
          
          // If the focus is not on the last item, increment the index,
          // and set the focus on the corresponding data point element:
          if (this.datapoint_focus.list_position !==
              this.datapoints[index.chart][index.dataset].length - 1)
          {
            this.datapoints[index.chart][index.dataset]
                [++this.datapoint_focus.list_position].focus();
          }
          break;
          
        case "arrowleft":
          // Move the focus to the corresponding item in the data list
          // view of the previous series
          
          // If the focus is not on the list view of the first series, decrement the index
          // and set the focus on the corresponding data point element:
          if (this.datapoint_focus.dataset !== 0)
          {
            let parent = this[dataset_type][index.chart][--this.datapoint_focus.dataset]
            .parentElement;

            parent.parentElement.setAttribute("open", "true");
            this.datapoints[index.chart][this.datapoint_focus.dataset]
                [this.datapoint_focus.list_position].focus();
            // let datagroup_title = parent.attributes["aria-label"].value;
            // this.speech.speak(datagroup_title);
          }
          break;
          
        case "arrowright":
          // Move the focus to the corresponding item in the data list
          // view of the next series
          
          // If the focus is not on the list view of the last series, increment the index
          // and set the focus on the corresponding data point element:
          if (this.datapoint_focus.dataset !==
              this[dataset_type][index.chart].length - 1)
          {
            let parent = this[dataset_type][index.chart][++this.datapoint_focus.dataset]
            .parentElement;
            // let datagroup_title = parent.attributes["aria-label"].value;
            // this.speech.speak(datagroup_title);
            parent.parentElement.setAttribute("open", "true");
            this.datapoints[index.chart][this.datapoint_focus.dataset]
                [this.datapoint_focus.list_position].focus();
          }
          break;
          
        case "home":
          this.jumpToBeginning();
          break;
          
        case "end":
          this.jumpToEnd();
          break;
          
        case "tab":
          // Shift+TAB:
          if ( (event.shiftKey) && !((event.altKey) || (event.ctrlKey) || (event.metaKey)) )
          {
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
    
    data_container.addEventListener("focus", (event : FocusEvent) =>
    {
      
      this.datapoint_focus =
      {
        chart: chart_index,
        dataset: dataset_index,
        list_position: this.selected_list_position[chart_index][dataset_index]
      };
      this.datapoints[index.chart][index.dataset]
          [this.datapoint_focus.list_position].focus();
    });
    
  }
  
  
  // ---
  // Description: Appends the representation of a data point incl.
  //              event listeners to the specified data list view.
  // chart_index: Index of the chart whose data point shall be added.
  // dataset_index: Index of the data series whose data point shall be added.
  // datapoint_index: Index of the data point to be added.
  // datapoint_true_index: Original index of the data point (before sorting)
  // description: Text containing label and value of the data point.
  // ---
  
  addDatapoint(chart_index : number, dataset_index : number,
      position_index : number, datapoint_index : number,
      svg_element : SVGElement, description : string, 
      dataset_type : string="datasets") : void
  {
    // Avoid crash due to variables not initialised:
    if ( (!this[dataset_type]) || (!this[dataset_type][chart_index]) ||
        (!this[dataset_type][chart_index][dataset_index])
        || (!this.datapoints) || (!this.datapoints[chart_index]) ||
        (!this.datapoints[chart_index][dataset_index]) )
    {
      return;
    }
    
    // Create an object for the indices of the data point:
    let index : DataIndex =
    {
      chart: chart_index,
      dataset: dataset_index,
      datapoint: datapoint_index,
      list_position: position_index
    };
    
    let datapoint = Helper.appendHTML(
        this[dataset_type][index.chart][index.dataset],
        HTMLTemplate.DATAPOINT);
    
    datapoint.textContent = description;
    
    this.datapoints[index.chart][index.dataset][index.list_position] =
        datapoint;
    this.datapoints_svg[index.chart][index.dataset][index.list_position] =
        svg_element;
    
    
    // If a data list item receives focus, set this.datapoint_focus,
    // this.last_focus, this.selected_list_position, and
    // this.selected_datapoint to the corresponding data point
    
    datapoint.addEventListener("focus", (event : FocusEvent) =>
    {
      event.stopPropagation();
      this.last_focus = datapoint;
      this.datapoint_focus = Object.assign({}, index);
      this.selected_list_position[index.chart][index.dataset] =
          index.list_position;
      this.selected_datapoint[index.chart][index.dataset] = index.datapoint;
    });
    
    
    datapoint.addEventListener("focusin", (event : FocusEvent) =>
    {
      event.stopPropagation();
      this.setSVGHighlighting(svg_element, true);

      let parent = this[dataset_type][index.chart][this.datapoint_focus.dataset]
      .parentElement;
      let datagroup_title = parent.attributes["aria-label"].value;
      this.speech.speak(datagroup_title);
    });
    
    svg_element.setAttribute("pointer-events", "bounding-box");
    svg_element.addEventListener("mousedown", (event : MouseEvent) =>
    {
      event.preventDefault();
      event.stopPropagation();
      
      // Have to uncollapse node of data points,
      // which are collapsed if there are multiple data series
      this.svg_document.setAttribute("open", "true");
      this.charts[index.chart].setAttribute("open", "true");
      let details : HTMLElement = <HTMLElement>datapoint
          .parentNode.parentNode.parentNode;
      details.setAttribute("open", "true");
      datapoint.focus();
    });
    
    
    // On right-click or context-menu key on a data list item, open the
    // context menu for the corresponding data point
    
    datapoint.addEventListener("contextmenu", (event : MouseEvent) =>
    {
      
      if ( (this.menu) && (!this.menu.is_open) )
      {
        event.stopImmediatePropagation();
        event.preventDefault();
        this.last_focus = datapoint;
        this.datapoint_focus = Object.assign({}, index);
        
        setTimeout(() =>
        {
          this.menu.open(datapoint);
        }, 0);
      }
    });
    
  }
  
  
  // ---
  // Description: Removes the current data list view of the specified data series
  //              and appends a new data list view according to the specified
  //              sorting mode.
  // index: The Indices of the data series to sort.
  // sorting_string: Specifies the sorting mode as "NONE", "UPWARDS", or "DOWNWARDS"
  //                 (according to the enum Sorting).
  // ---
  
  sortDatapoints(index : DataIndex, sorting_string : string, 
    dataset_type : string="datasets") : void
  {
    let sorting : Sorting = Sorting[sorting_string];
    
    // Avoid crash due to uninitialised variables or invalid sorting specifier:
    if ( (!this[dataset_type][index.chart]) || (!this[dataset_type][index.chart][index.dataset])
        || (!this.datapoints[index.chart])
        || (sorting < Sorting.DOWNWARDS) || (sorting > Sorting.UPWARDS) )
    {
      return;
    }
    
    delete this.datapoints[index.chart][index.dataset];
    this.datapoints[index.chart][index.dataset] = [];
    
    let parent = <HTMLElement>this[dataset_type][index.chart][index.dataset].parentElement;
    this[dataset_type][index.chart][index.dataset].remove();
    this[dataset_type][index.chart][index.dataset] = Helper.appendHTML(
        parent, HTMLTemplate.DATAPOINT_LIST);
    
    this.datapoints_sorted[index.chart][index.dataset] = sorting;
    
    this.achart_interpreter.listDatapoints(index.chart, index.dataset,
        sorting, this.selected_datapoint[index.chart][index.dataset], dataset_type);
    
  }


  handleToggleHighlightingButton(parent : Node) : HTMLElement
  {
    let highlighting_container = Helper.appendHTML(
        parent, HTMLTemplate.HIGHLIGHTING_BUTTON);

    this.svg_highlight_option = HighlightingMode.OUTLINE;

    highlighting_container.addEventListener("change", () =>
    {
      this.svg_highlight_option = (this.svg_highlight_option === HighlightingMode.MASK) ?
        HighlightingMode.OUTLINE : HighlightingMode.MASK;

      // For read out
      let highlight_string = Text.HIGHLIGHTING_MASK;
      if (this.svg_highlight_option == HighlightingMode.OUTLINE)
      {
        highlight_string = Text.HIGHLIGHTING_OUTLINE;
      }

      this.speech.speak(Text.HIGHLIGHTING_CHANGED + highlight_string);

      // Fix for when statistics is open, which leaves old highlighting visible
      // unless the data point is clicked on again
      if (document.getElementById("achart_reader_dialog_title"))
      {
        let highlighted_datapoint : HTMLElement;
        if (highlighted_datapoint = document.getElementById("SVG_highlight"))
        {
          highlighted_datapoint.classList.remove(HighlightingMode.MASK);
          highlighted_datapoint.classList.remove(HighlightingMode.OUTLINE);
        }
      }
    });

    highlighting_container.addEventListener("focusout", () =>
    {
      highlighting_container.className = "";
    });
    
    return highlighting_container;
  }
  
  
  // ---
  // Description: Appends a button with event listener calling the method this.close()
  //              to the specified window and returns the DOM element.
  // parent: The DOM element the button shall be appended to.
  // ---
  
  addCloseButton(parent : HTMLElement) : HTMLElement
  {
    let close_button = Helper.appendHTML(
        parent, HTMLTemplate.CLOSE_BUTTON);
    
    close_button.addEventListener("click", () =>
    {
      this.close();
    });
    
    return close_button;
  }
  
  
  // ---
  // Description: Closes a dialogue window, if open, otherwise the main app window.
  // ---
  
  close()
  {
    
    if (this.details)
    {
      this.details.parentElement.remove();
      this.details = null;
      this.last_focus.focus();
      this.first_element = this.title;
      this.last_element = this.close_button;
    }
  }
  
  
  // ---
  // Description: Add highlight pattern defs to svg
  // ---
  
  setHighlightPattern(element : any) : void
  {
    let defs = document.createElementNS('http://www.w3.org/2000/svg','defs');
    let pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
    let pattern_rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    let mask = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
    let mask_rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

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
  }
  
  
  // ---
  // Description: Stops Highlighting previously highlighted SVG element,
  //              Highlights the specified SVG element with a focus box
  //              and sets this.current_svg to the highlighted element.
  // element: The graphics element to highlight.
  // datapoint: Set different svg highlighting for datapoints
  // ---
  
  setSVGHighlighting(element : SVGElement, datapoint : boolean) : void
  {
    if (this.previous_svg)
    {
   	  this.removeSVGHighlighting();
    }
    this.previous_svg_id = element.id;
    
    this.updateSVGElementClass(element, true, datapoint);
    
    this.previous_svg = element;
  }
  
  
  // ---
  // Description: Removes the focus box from the SVG element to which 
  //              this.previous_svg points.
  // ---
  
  removeSVGHighlighting() : void
  {
    if (this.previous_svg)
    {
      this.updateSVGElementClass(this.previous_svg, false, false);
  	  this.previous_svg = null;
  	  this.previous_svg_id = "";
    }
  }
  
  
  // ---
  // Description: Changes the class attribute of a given SVGElement depending on highlight
  //              highlight = true to highlight SVG element.
  // ---
  
  updateSVGElementClass(element : SVGElement,
      highlight : boolean, datapoint : boolean) : void
  {
    let highlight_id = "text_highlight";
    if (datapoint)
    {
      highlight_id = "SVG_highlight";
    }
    
    // Set the SVG ID to one that would highlight the element
    let new_id = highlight ? highlight_id : this.previous_svg_id;

    // TODO
    //element.id = new_id;
    
    if (highlight)
    {
      element.classList.add( (datapoint) ? this.svg_highlight_option : HighlightingMode.OUTLINE );
    }
    else
    {
      element.classList.remove(HighlightingMode.MASK);
      element.classList.remove(HighlightingMode.OUTLINE);
    }
  }


  // ---
  // Description: Gets the corresponding datapoints list HTML element based 
  //              on an SVG element
  // svg_element: The SVG element in question
  // ---
  
  getDataPointBasedOnSVGElement(svg_element : SVGElement) : HTMLElement
  {
    for (let i = 0; i < this.datapoints.length; i++)
    {
      for (let j = 0; j < this.datapoints[i].length; j++)
      {
        for (let k = 0; k < this.datapoints[i][j].length; k++)
        {
          if (this.datapoints_svg[i][j][k] == svg_element)
          {
            return this.datapoints[i][j][k];
          }
        }
      }
    }
    return;
  }
  
  
  // ---
  // Description: Unload SVG and all its information.
  // ---
  
  removeSvg() : void
  {
    if (!this.graphic_panel.content.svg)
    {
      return;
    }
    
    // Re-enable placeholder text
    this.placeholder_text.style.removeProperty("visibility");
    
    this.graphic_panel.content.svg.remove();
    this.graphic_panel.content.container.setAttribute("hidden", "true");
    this.graphic_panel.title.textContent = Text.GRAPHIC_PANEL;
    
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
    
  }
  
  
  stopPropagationOfKeys(element : HTMLElement) : void
  {
    element.addEventListener("keydown", (event : KeyboardEvent) =>
    {
      let key = "";
      
      if (event.key)
      {
        key = event.key.toLowerCase();
      }
      
      switch (key)
      {
        
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
    
  }
  
  
  private closeTabCircle(after_gap : HTMLElement, before_gap : HTMLElement, update_global_listeners = false) : void
  {
    
    let after_gap_listener = (event : KeyboardEvent) =>
    {
      if ( (event.key) && (event.key.toLowerCase() === "tab") && (event.shiftKey)
          && (!event.ctrlKey) && (!event.altKey) && (!event.metaKey) )
      {
        event.preventDefault();
        before_gap.focus();
      }
    };
    
    after_gap.addEventListener("keydown", after_gap_listener);
    
    let before_gap_listener = (event : KeyboardEvent) =>
    {
      if ( (event.key) && (event.key.toLowerCase() === "tab") && (!event.shiftKey)
          && (!event.ctrlKey) && (!event.altKey) && (!event.metaKey) )
      {
        event.preventDefault();
        after_gap.focus();
      }
    };
    
    before_gap.addEventListener("keydown", before_gap_listener);
    
    if (update_global_listeners)
    {
      this.after_gap_listener = after_gap_listener;
      this.before_gap_listener = before_gap_listener;
    }
    
  }
  
  
}
