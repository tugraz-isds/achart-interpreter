import { FileHelper } from "./file-helper";
import { SVGDocument } from "../common/svg-document";
import { Message } from "../common/message";
import { Text } from "../common/text.en";


const { JSDOM } = require("jsdom");
export const { document } = (new JSDOM("<!DOCTYPE html><html><body></body></html>")).window;
export const { Console } = console;



// Main Class

export class AChartSummariser
{
  
  
  // Programme version:
  readonly VERSION = "1.0.0";
  
  // Markdown characters for text output:
  readonly LI_MARKER = "- "
  readonly H1_MARKER = "# ";
  readonly H2_MARKER = "## ";
  readonly H3_MARKER = "### ";
  
  // Command-line arguments:
  input_file = ""
  output_file = ""
  show_statistics = false
  show_datapoints = false
  
  // Output stream, either a text file or stdout:
  output : Console
  
  // Loaded graphics document:
  svg_document : SVGDocument
  
  
  
  // ---
  // Description: Initialises the app
  // ---
  
  constructor()
  {
    
    // Make sure all output is encoded in UTF-8:
    //process.stdout.setEncoding("utf8");
    //process.stderr.setEncoding("utf8");
    
    // Display programme title and version:
    console.info(`${Text.ACHART_SUMMARISER_TITLE} ${Text.VERSION} ${this.VERSION} \n`);
    
    // Get command-line arguments;
    // exit in case of syntax errors, "--help", or "--version" option:
    this.parseCommandLine();
    
    // Open and read the specified SVG file, then call this.processSVG():
    FileHelper.loadFile(this);
  }
  
  
  // ---
  // Description: Analyses the given SVG and outputs its information.
  // svg_root: The root <svg> element of the graphic to analyse.
  // ---
  
  processSVG(svg_root : SVGElement) : void
  {
    // Show message if output is written to file:
    console.info( (this.output_file) ?
        Text.WRITING_TO + this.output_file : "\n"
    );
    
    // Set this.output to an output text file, if specified by the user,
    // otherwise to stdout:
    FileHelper.openOutput(this);
    
    // Main heading:
    this.output.info(this.H1_MARKER + Text.ACHART_SUMMARY +
        this.input_file + "\n\n");
    
    // Parse the SVG, extract chart data etc.:
    this.svg_document = new SVGDocument(svg_root);
    
    // Summary for the graphics document:
    this.output.info(this.LI_MARKER + Message.getSvgSummary(
        this.svg_document.titles[0], this.svg_document.chart_type_counts));
    
    // 1st indentation level (for SVG document):
    this.output.group();
    
    // Show content of <desc> element, if available:
    if (this.svg_document.descriptions[0])
    {
      this.output.info("\n" + this.svg_document.descriptions[0]);
    }
    
    // If the graphic contains no charts, show other possible <desc> elements:
    if (this.svg_document.charts_count === 0)
    {
      let descriptions = Message.getFurtherSvgDescriptions(
          this.svg_document.titles, this.svg_document.descriptions);
      
      for (let index = 0; index < descriptions.length; index++)
      {
        this.output.info(descriptions[index]);
      }
      
    }
    
    this.output.info("");
    
    
    // Iterate over all known chart types incl. "unknown"
    
    for (let chart_type in this.svg_document.charts)
    {
      
      
      // Display all charts of this type
      
      for (let charts_index = 0;
          charts_index < this.svg_document.charts[chart_type].length;
          charts_index++)
      {
        let chart = this.svg_document.charts[chart_type][charts_index];
        
        // Display the chart summary:
        this.output.info(this.LI_MARKER + Message.getChartSummary(
            chart.type, chart.title, chart.datasets.length, true, "datasets",
            charts_index));
        
        // 2nd indentation level (for chart):
        this.output.group();
        
        // If x-axis is present, consider it as names scale, otherwise
        // a possible legend:
        let names_scale = (chart.axes.x) ? <any>chart.axes.x :
            ( (chart.legends) ? <any>chart.legends[0] : undefined );
        let names_scale_data = (names_scale) ?
        {
          min: names_scale.min,
          max: names_scale.max,
          title: names_scale.title
        } : undefined;
        
        // If y-axis is present, consider it as values scale,
        // otherwise consider the first data series:
        let values_scale_title = (chart.axes.y) ? (<any>chart.axes.y).title :
            ( (chart.datasets) ? chart.datasets[0].title : "");
        
        // Display the chart description:
        this.output.info("\n" + Message.getChartDescription(chart.type,
            values_scale_title, names_scale_data) + "\n");
        
        // Show x-axis first:
        if (chart.axes.x)
        {
          this.output.info(this.LI_MARKER + Message.getAxisDescription(
              "x", chart.axes.x.title, chart.axes.x.type,
              chart.axes.x.labels.length, chart.axes.x.min, chart.axes.x.max));
        }
        
        // Show y-axis second:
        if (chart.axes.y)
        {
          this.output.info(this.LI_MARKER + Message.getAxisDescription(
              "y", chart.axes.y.title, chart.axes.y.type,
              chart.axes.y.labels.length, chart.axes.y.min, chart.axes.y.max));
        }
        
        // Last, show all other possible axes:
        for (let axis_index in chart.axes.others)
        {
          let axis = chart.axes.others[axis_index];
          if (axis)
          {
            this.output.info(this.LI_MARKER + Message.getAxisDescription(
                axis.variable, axis.title, axis.type,
                axis.labels.length, axis.min, axis.max));
          }
        }
        
        // Show all legends:
        for (let legend_index in chart.legends)
        {
          let legend = chart.legends[legend_index];
          if (legend)
          {
            this.output.info(this.LI_MARKER +
                Message.getLegendDescription(legend.title,
                legend.labels.length, legend.min, legend.max));
          }
          
        }
        this.output.info("");
        
        
        // Display all data series of the chart
        
        for (let datasets_index = 0; datasets_index < chart.datasets.length;
            datasets_index++)
        {
          let dataset = chart.datasets[datasets_index];
          this.output.info(this.LI_MARKER + Message.getDatasetSummary(
              dataset.title, dataset.datapoints.length,
              (chart.datasets.length !== 1), "datasets", datasets_index));
          
          
          // Display statistics for this data series, if requested
          
          if (this.show_statistics)
          {
            let statistics_list = Message.getStatisticsList(datasets_index, dataset.title,
                dataset.getStatistics(), "datasets");
            
            // 3rd indentation level (for data series):
            this.output.group();
            
            // Heading for statistics:
            this.output.info("\n" + this.H2_MARKER + statistics_list.title);
            
            // Show all the statistical values:
            for (let item in statistics_list.items)
            {
              console.log("item", item);
              if (item[0]){
                this.output.info("\n" + this.H2_MARKER + item);
              }
              for (let data of statistics_list.items[item])
              {
                this.output.info(this.LI_MARKER + data);
              }
            }
            
            // Back to 2nd indentation level (for chart):
            this.output.groupEnd();
          }
          
          
          // Display all the data points, if requested
          
          if (this.show_datapoints)
          {
            // 3rd indentation level (for data series):
            this.output.group();
            
            // Heading for data points:
            this.output.info("\n" + this.H2_MARKER + Text.DATAPOINTS);
            
            // Show each data point:
            let datapoints = dataset.datapoints;
            for (let datapoint of datapoints)
            {
              this.output.info(this.LI_MARKER + Message.getKeyValueItem(
                  datapoint.label_text, datapoint.value_text));
            }
            
            // Back to 2nd indentation level (for chart):
            this.output.groupEnd();
          }
          
          
          if (datasets_index < chart.datasets.length - 1)
          {
            this.output.info("");
          }
          
        }
        
        this.output.info("");
        this.output.groupEnd();
      }
      
    }
    
    this.output.groupEnd();
  }
  
  
  parseCommandLine() : void
  {
    for (let index = 2; index < process.argv.length; index++)
    {
      
      switch (process.argv[index].toLowerCase())
      {
        
        case "--input":
          if ((++index) >= process.argv.length)
          {
            this.syntaxError(Text.NO_SVG_FILE);
          }
          this.input_file = process.argv[index];
          break;
          
        case "--output":
          if ((++index) >= process.argv.length)
          {
            this.syntaxError(Text.NO_OUTPUT_FILE);
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
          console.info(Text.ACHART_SUMMARISER_HELP);
          
        case "--version":
          process.exit(0);
          
        default:
          if (index === process.argv.length - 1)
          {
            this.input_file = process.argv[index];
          }
          else
          {
            this.syntaxError(Text.INVALID_OPTION + ": " + process.argv[index]);
          }
          
      }

    }
    
  }
  
  
  syntaxError(message : string) : void
  {
    console.error(Text.ERROR + message + "\n");
    
    console.info(Text.ACHART_SUMMARISER_HELP);
    
    process.exit(1);
  }
  
}

