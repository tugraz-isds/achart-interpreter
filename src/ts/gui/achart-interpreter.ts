import { SVGDocument } from "../common/svg-document";
import { UserInterface, DataIndex } from "./user-interface";
import { Comparison, Scale, Statistics, Sorting } from "../common/interfaces";
import { Helper } from "./helper";
import { Message } from "../common/message";
import { Text } from "../common/text.en";
import { FileLoader } from "./file-loader";



// Main Class (controller)

export class AChartInterpreter
{
  
  
  // Loaded graphics document:
  svg_document : SVGDocument
  
  // Graphical user interface with graphic and text panel:
  user_interface : UserInterface
  
  
  
  // ---
  // Description: Initialises the app
  // ---
  
  constructor(svg_root ?: SVGElement)
  {
    // Initialise user interface:
    this.user_interface = new UserInterface(this);
    
    // Initialise drop-down list for sample SVG files and file upload
    // dialogue functionality:
    FileLoader.prepareFileChoosing(this);
  }
  
  
  // ---
  // Description: Analyses the given SVG and outputs its information.
  // svg_content: The SVG markup of the graphic to analyse.
  // filename: The name of the loaded SVG file.
  // ---
  
  interpret(svg_content : string, filename : string) : void
  {
    // Display the SVG in the graphic panel:
    let svg_root = this.user_interface.insertSvg(svg_content, filename);
    
    // Parse the SVG, extract chart data etc.:
    this.svg_document = new SVGDocument(svg_root);
    
    // Initialise text panel with SVG title and summary:
    this.user_interface.initTextPanel(Message.getSvgSummary(
        this.svg_document.titles[0], this.svg_document.chart_type_counts),
        this.svg_document.charts_count, this.svg_document.descriptions[0]);
    
    
    // Iterate over all known chart types incl. "unknown"
    
    // Index of chart independent of its type (for user interface):
    let charts_index = 0;
    
    for (let chart_type in this.svg_document.charts)
    {
      
      
      // Add all charts of this type to the Web interface
      
      for (let charts_index_of_type = 0;
          charts_index_of_type < this.svg_document.charts[chart_type].length;
          charts_index_of_type++, charts_index++)
      {
        let chart = this.svg_document.charts[chart_type][charts_index_of_type];
        this.svg_document.all_charts[charts_index] = chart;
        
        // If x-axis is present, consider it as names scale,
        // otherwise consider a possible legend:
        let names_scale = chart.axes.x ||
            ( (chart.legends) ? chart.legends[0] : undefined );
        let names_scale_data : Scale = (names_scale) ?
        {
          min: names_scale.min,
          max: names_scale.max,
          title: names_scale.title
        } : undefined;
        
        // If y-axis is present, consider it as values scale,
        // otherwise consider the first data set:
        let values_scale_title = (chart.axes.y) ? chart.axes.y.title :
            ( (chart.datasets) ? chart.datasets[0].title : "");
        
        this.user_interface.addChart(charts_index,
            chart.root, true, chart.datasets.length,
            chart.datagroups.length,
            Message.getChartSummary(chart.type, chart.title,
            chart.datasets.length, true, "datasets", charts_index_of_type),
            Message.getChartDescription(chart.type, values_scale_title,
            names_scale_data));
        
        
        // Add all axes of each chart to the web interface
        
        // x-axis first:
        if (chart.axes.x)
        {
          this.user_interface.addAxis(charts_index,
              chart.axes.x.svg_element, "x", Message.getAxisDescription(
              "x", chart.axes.x.title, chart.axes.x.type,
              chart.axes.x.labels.length, chart.axes.x.min, chart.axes.x.max));
        }
        
        // y-axis second:
        if (chart.axes.y)
        {
          this.user_interface.addAxis(charts_index, chart.axes.y.svg_element,
              "y", Message.getAxisDescription("y", chart.axes.y.title,
              chart.axes.y.type, chart.axes.y.labels.length, chart.axes.y.min,
              chart.axes.y.max));
        }
        
        // Last, all other possible axes:
        for (let axis_index in chart.axes.others)
        {
          let axis = chart.axes.others[axis_index];
          if (axis)
          {
            this.user_interface.addAxis(charts_index, axis.svg_element, axis.variable,
                Message.getAxisDescription(axis.variable, axis.title,
                axis.type, axis.labels.length, axis.min, axis.max));
          }
        }
        
        
        // Add all legends of each chart to the Web interface
        
        for (let legends_index = 0; legends_index < chart.legends.length; legends_index++)
        {
          let legend = chart.legends[legends_index];
          this.user_interface.addLegend(charts_index, legends_index,
              legend.svg_element, Message.getLegendDescription(legend.title,
              legend.labels.length, legend.min, legend.max));
        }
        
        if (chart.datagroups.length == 0) {
          // Add all data sets of each chart to the web interface
          for (let datasets_index = 0; datasets_index < chart.datasets.length;
            datasets_index++) {
            let dataset = chart.datasets[datasets_index];

            this.user_interface.addDataset(charts_index, datasets_index,
              dataset.svg_element, true,
              dataset.datapoints.length, Message.getDatasetSummary(
                dataset.title, dataset.datapoints.length, true,"datasets",
                datasets_index));

            if (dataset.datapoints.length) {
              this.user_interface.initDataList(charts_index, datasets_index,
                dataset.title);
              this.listDatapoints(charts_index, datasets_index,
                Sorting.NONE, 0);
            }

          }
        } else {
          // Add all data groups of each chart to the web interface
          for (let datagroups_index = 0; datagroups_index < chart.datagroups.length;
            datagroups_index++) {
            let datagroup = chart.datagroups[datagroups_index];

            this.user_interface.addDataset(charts_index, datagroups_index,
              datagroup.svg_element, true,
              datagroup.datapoints.length, Message.getDatasetSummary(
                datagroup.title, datagroup.datapoints.length, true, "datagroups",
                datagroups_index), "datagroups");

            if (datagroup.datapoints.length) {
              this.user_interface.initDataList(charts_index, datagroups_index,
                datagroup.title, "datagroups");
              this.listDatapoints(charts_index, datagroups_index,
                Sorting.NONE, 0, "datagroups");
            }
          }
        }
      }
    }
  }
  
  
  // ---
  // Description: Adds all data points of the specified data series to the Web interface.
  // chart_index: Index of the chart whose data points shall be added.
  // dataset_index: Index of the data series whose data points shall be added.
  // sort: Specifies the sorting mode of the data points (NONE, UPWARDS, or DOWNWARDS).
  // ---
  
  listDatapoints(chart_index : number, dataset_index : number,
      sort : Sorting, focused_datapoint : number, 
      dataset_type : string="datasets") : void
  {
    // Access the data points either in increasing order or in the original order
    // as in the chart, depending on the specified sorting mode:
    let datapoints = (sort !== Sorting.NONE) ?
        this.svg_document.all_charts[chart_index][dataset_type][dataset_index]
            .datapoints_sorted_upwards
            : this.svg_document.all_charts[chart_index]
            [dataset_type][dataset_index].datapoints;
    if (sort === Sorting.DOWNWARDS)
    {
      datapoints = datapoints.slice().reverse();
    }
    
    let datapoint_positions = new Array<number>(datapoints.length);
    
    for (let datapoints_index = 0; datapoints_index < datapoints.length;
        datapoints_index++)
    {
      let datapoint = datapoints[datapoints_index];
      this.user_interface.addDatapoint(chart_index, dataset_index,
          datapoints_index, datapoint.true_index, datapoint.svg_element,
          Message.getKeyValueItem(datapoint.label_text,
          datapoint.value_text, datapoint.true_index+1, datapoints.length), dataset_type);
      datapoint_positions[datapoint.true_index] = datapoints_index;
    }
    
    this.user_interface.selected_datapoint[chart_index][dataset_index] =
        focused_datapoint;
    this.user_interface.selected_list_position[chart_index][dataset_index] =
        datapoint_positions[focused_datapoint];
  }
  
  
  // ---
  // Description: Display the statistics for an entire data series.
  // index: The index of the chart and data series whose statistics shall be displayed.
  // ---
  
  showDatasetStatistics(index : DataIndex, dataset_type : string = "datasets")
  {
    this.user_interface.showDetails( Message.getStatisticsList(index.dataset,
        this.svg_document.all_charts[index.chart][dataset_type][index.dataset]
        .getStatistics(), dataset_type));
  }
  
  
  // ---
  // Description: Displays a comparison of the specified data point
  //              to all other data points in the same data series.
  // index: Indices of the data point to be compared.
  // sorting: Specifies how the list view of the data series is sorted.
  // ---
  
  compareToRestOfDataset(index : DataIndex, sorting : Sorting,
    dataset_type : string="datasets") : void
  {
    let dataset = this.svg_document.all_charts[index.chart][dataset_type][index
        .dataset];
    
    // Get the label of the data point to be compared;
    // if the list of the data series is sorted, access the sorted array of the data points:
    let label = dataset.datapoints[index.datapoint].label_text;
    
    this.user_interface.showDetails(Message.getComparisonsList(label,
        dataset.getComparisonToAll(index.list_position, sorting)));
  }
  
  
  // ---
  // Description: Displays a comparison of the specified data point
  //              to the statistics of the corresponding data series.
  // index: Indices of the data point to be compared.
  // sorting: Specifies how the list view of the data series is sorted.
  // ---
  
  compareToStatistics(index : DataIndex, sorting : Sorting,
    dataset_type : string="datasets") : void
  {
    let dataset = this.svg_document.all_charts[index.chart][dataset_type][index
        .dataset];
    
    // Get the label of the data point to be compared;
    // if the list of the data series is sorted, access the sorted array of the data points:
    let label = dataset.datapoints[index.datapoint].label_text;
    
    this.user_interface.showDetails(Message.getStatisticsComparisonsList(
        label, dataset.getComparisonToStatistics(index.datapoint, sorting)));
  }
  
  
  // ---
  // Description: Searches the loaded Web document for SVG documents and adds to them
  //              event listeners for launching the main app.
  // ---
  
  static searchForSVGContent() : void
  {
    
    // Search the Web page for embedded SVG
    
    let svg_documents = document.body.getElementsByTagName("svg");
    
    for (let index = 0; index < svg_documents.length; index++)
    {
      this.attachToSvg(svg_documents[index]);
    }
    
    
    // Search the Web page for SVG files embedded as <object>
    
    let svg_files = document.body.getElementsByTagName("object");
    
    for (let index = 0; index < svg_files.length; index++)
    {
      let data_root = svg_files[index].contentDocument.firstChild;
      
      // If the first child of the <object> is an SVG element, attach it
      // an event listener for click, Enter, and Space key opening the app
      if (data_root.nodeName === "svg")
      {
        this.attachToSvg(<SVGElement>data_root);
      }
    }
    
  }

  
  // ---
  // Description: Gets the data point that was first clicked before 
  //              the main app text view window was created
  // target: The initial HTML element that was clicked retrieved via
  //         an onclick listener
  // ---
  
  static getFirstClickedDataPoint(target : HTMLElement) : SVGElement
  {
    let first_clicked_data_point : HTMLElement;

    if ((<HTMLElement>target.parentNode).id == 'dataarea')
    {
      first_clicked_data_point = target;
    }
    else if ((<HTMLElement>target.parentNode).getAttribute('role') == 'datapoint')
    {
      first_clicked_data_point = <HTMLElement>target.parentNode;
    }
    else if (target.getAttribute('role') == 'datapoint')
    {
      first_clicked_data_point = target;
    }

    return <SVGElement><unknown>first_clicked_data_point;
  }
  
  
  // ---
  // Description: Either focus and read out a data point when opening the text view,
  //              or if another element was clicked, focus and read out the standard first element,
  //              which is the title "AChart Reader".
  //              Also handles collapsed nodes of data points
  // first_clicked_data_point: The data point in question
  // achart_reader: Current instance of the text view
  // ---
  
  handleFirstFocus(first_clicked_data_point : SVGElement) : void
  {
    if (!first_clicked_data_point)
    {
      // Focus and read 'Graphic' and summary if no data point was activated
      (<HTMLElement>this.user_interface.svg_document).focus();
    }
    else
    {
      let element_to_focus = this.user_interface
          .getDataPointBasedOnSVGElement(first_clicked_data_point);
      
      // Have to uncollapse node of data points,
      // which are collapsed if there are multiple data series
      let details : HTMLElement = <HTMLElement>element_to_focus.parentNode.parentNode.parentNode;
      if (!details.getAttribute("open"))
      {
        details.setAttribute("open", "true");
      }

      element_to_focus.focus();
    }
  }
  
  
  // ---
  // Description: Adds event listeners for launching the main app or re-opening
  //              the main app window to the specified SVG.
  // data_root: Root <svg> element of the graphics.
  // ---
  
  static attachToSvg(data_root : SVGElement) : void
  {
    // App object:
    let achart_interpreter = undefined;
    
    // Make the SVG root focusable:
    data_root.setAttribute("tabindex", "0");

    Helper.addActivationListener(data_root, (event) =>
    {
      // Only proceed if no window of the app is open for any SVG doc:
      if (!UserInterface.is_open)
      {

        // Get what element was clicked on before the text view was open,
        // to read it out later, but only if it's a data point
        event = event || <MouseEvent>window.event;
        let target : HTMLElement = <HTMLElement>event.target || <HTMLElement>event.srcElement;
        let first_clicked_data_point = this.getFirstClickedDataPoint(target);

        // If the app has not been started for the specified SVG yet, launch it,
        // otherwise re-open its window if it is closed at the moment:
        if (!achart_interpreter)
        {
          achart_interpreter = new AChartInterpreter(<SVGElement>data_root);
          achart_interpreter.handleFirstFocus(first_clicked_data_point);
        }
        else if (!achart_interpreter.user_interface.container.parentNode)
        {
          achart_interpreter.user_interface.grid_container.appendChild(
              achart_interpreter.user_interface.container);
          achart_interpreter.handleFirstFocus(first_clicked_data_point);
          UserInterface.is_open = true;
        }
      }
        
    });
    
  }


}



// Launch the application as soon as the basic HTML
// has completely been loaded

window.addEventListener("DOMContentLoaded", function()
{
  let achart_interpreter = new AChartInterpreter();
});
